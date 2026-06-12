import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, addDays } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Car, Calendar as CalendarIcon, User, Wrench, ChevronRight, ChevronLeft, MapPin } from "lucide-react";
import { SEO } from "@/components/layout/SEO";

const bookingPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://excelautocare.in/booking/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://excelautocare.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Book Service",
          "item": "https://excelautocare.in/booking"
        }
      ]
    }
  ]
};


import { useListServices, getListServicesQueryKey, useGetAvailableSlots, getGetAvailableSlotsQueryKey, useCreateBooking } from "@workspace/api-client-react";
import { BookingInputFuelType } from "@workspace/api-client-react/src/generated/api.schemas";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { sendBookingToSheets } from "@/lib/sheets";

const MODELS = ["Swift", "Baleno", "Brezza", "WagonR", "Alto K10", "Dzire", "Ertiga", "XL6", "Ciaz", "S-Presso", "Celerio", "Fronx", "Jimny", "Grand Vitara", "Ignis"];
const YEARS = Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - i);

const bookingSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  carModel: z.string().min(1, "Please select a car model"),
  carYear: z.coerce.number().min(2000, "Please select a manufacturing year"),
  fuelType: z.enum(["petrol", "diesel", "cng", "hybrid"], { required_error: "Please select fuel type" }),
  registrationNo: z.string().optional().or(z.literal("")),
  kilometers: z.string().optional().or(z.literal("")),
  serviceIds: z.array(z.number()).min(1, "Please select at least one service"),
  date: z.date({ required_error: "Please select a request date" }),
  slotId: z.string().min(1, "Please select an appointment time slot"),
  pickupRequired: z.enum(["yes", "no"]).default("no"),
  notes: z.string().optional().or(z.literal(""))
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const STEPS = [
  { id: 1, title: "Vehicle", icon: Car },
  { id: 2, title: "Services", icon: Wrench },
  { id: 3, title: "Schedule", icon: CalendarIcon },
  { id: 4, title: "Details", icon: User }
];

export default function Booking() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const hasInitialized = useRef(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      customerName: "",
      phone: "",
      email: "",
      address: "",
      carModel: "",
      carYear: undefined,
      fuelType: undefined,
      registrationNo: "",
      kilometers: "",
      serviceIds: [],
      date: undefined,
      slotId: "",
      pickupRequired: "no",
      notes: ""
    },
    mode: "onChange"
  });

  const { data: categories } = useListServices({ query: { queryKey: getListServicesQueryKey() } });
  
  const selectedDate = form.watch("date");
  const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined;
  
  const currentServiceIds = form.watch("serviceIds") || [];
  
  const { data: slots, isLoading: isSlotsLoading } = useGetAvailableSlots(
    { date: formattedDate || "" },
    { query: { enabled: !!formattedDate, queryKey: getGetAvailableSlotsQueryKey({ date: formattedDate || "" }) } }
  );

  const createBooking = useCreateBooking();

  // Pre-select service package from URL - runs only once
  useEffect(() => {
    if (categories && categories.length > 0 && !hasInitialized.current) {
      hasInitialized.current = true;
      const params = new URLSearchParams(window.location.search);
      const serviceParam = params.get("service");
      if (serviceParam) {
        const srvId = parseInt(serviceParam, 10);
        if (!isNaN(srvId)) {
          form.setValue("serviceIds", [srvId]);
        }
      }
    }
  }, [categories, form]);

  const onSubmit = (data: BookingFormValues) => {
    const resolvedServiceNames: string[] = [];
    if (categories) {
      categories.forEach(cat => {
        cat.services?.forEach(srv => {
          if (data.serviceIds.includes(srv.id)) resolvedServiceNames.push(srv.name);
        });
      });
    }

    const resolvedSlotTime = slots?.find(s => s.id === data.slotId)?.time || data.slotId;

    createBooking.mutate({
      data: {
        customerName: data.customerName,
        phone: data.phone,
        email: data.email || null,
        carModel: data.carModel,
        carYear: data.carYear,
        fuelType: data.fuelType as BookingInputFuelType,
        serviceIds: data.serviceIds,
        date: format(data.date, "yyyy-MM-dd"),
        slotId: data.slotId,
        notes: `Address: ${data.address || "N/A"}. Pickup: ${data.pickupRequired}. ${data.notes || ""}`,
      }
    }, {
      onSuccess: (res) => {
        const ref = `EXC-${res.id.toString().padStart(5, '0')}`;
        setBookingRef(ref);
        setIsSuccess(true);

        sendBookingToSheets({
          bookingRef:      ref,
          submittedAt:     new Date().toISOString(),
          customerName:    data.customerName,
          phone:           data.phone,
          email:           data.email || "",
          address:         data.address || "",
          city:            "",
          carModel:        data.carModel,
          carYear:         String(data.carYear),
          fuelType:        data.fuelType,
          registrationNo:  data.registrationNo || "",
          kilometers:      data.kilometers || "",
          serviceCenter:   "",
          serviceNames:    resolvedServiceNames.join(", "),
          requestDate:     format(data.date, "yyyy-MM-dd"),
          appointmentSlot: resolvedSlotTime,
          pickupRequired:  data.pickupRequired === "yes" ? "Yes" : "No",
          customerNotes:   data.notes || "",
          staffStatus:     "Pending",
          staffRemarks:    "",
        });
      }
    });
  };

  const handleNext = async (fieldsToValidate: (keyof BookingFormValues)[]) => {
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#f8fafc] pt-32 pb-24 flex items-center justify-center px-4 font-sans text-[#0c2340]">
        <SEO
          title="Booking Confirmed | Excel Autocare"
          description="Your Maruti Suzuki service appointment has been successfully scheduled. We look forward to servicing your vehicle."
          canonicalUrl="https://excelautocare.in/booking"
          schemaMarkup={bookingPageSchema}
        />
        <div className="bg-white border border-slate-200 p-10 rounded-none text-center max-w-md w-full shadow-md">
          <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-none flex items-center justify-center text-green-600 mx-auto mb-6">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-extrabold uppercase tracking-tight mb-3">Booking Confirmed</h2>
          <p className="text-neutral-600 text-sm mb-6 leading-relaxed font-normal">
            Your service appointment has been successfully scheduled. We look forward to servicing your vehicle.
          </p>
          <div className="bg-[#f8fafc] border border-slate-200 rounded-none p-5 mb-8">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Booking Reference</p>
            <p className="text-xl font-bold text-[#0c2340]">{bookingRef}</p>
          </div>
          <Button className="w-full font-bold bg-[#0c2340] hover:bg-[#0c2340]/90 text-white rounded-none border-0 px-6 py-3 cursor-pointer uppercase tracking-widest" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const slideVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-24 text-[#0c2340]">
      <SEO
        title="Book Your Service | Excel Autocare Authorized Maruti Station"
        description="Schedule your Maruti Suzuki service appointment online. Complete our 4-step booking form to secure your diagnostic check, mechanical repair, or denting painting slot."
        keywords="car service booking online, schedule Maruti repair, auto service appointment, authorized garage slot"
        canonicalUrl="https://excelautocare.in/booking"
        schemaMarkup={bookingPageSchema}
      />
      {/* Header */}
      <section className="pt-32 pb-10 bg-[#0c2340] border-b border-slate-800 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="text-[#8ab4f8] uppercase tracking-[0.2em] text-[10px] font-black bg-white/10 px-3 py-1 rounded-none border border-white/10 inline-block mb-3">
            Express Scheduling
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight mb-4">Book Your Service</h1>
          <p className="text-sm text-slate-300 max-w-lg mx-auto font-normal leading-relaxed">
            Complete our frictionless 4-step process to secure your appointment instantly. No registration required.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl mt-[-2rem] relative z-10">
        
        {/* Stepper Header */}
        <div className="bg-white shadow-lg border border-slate-200 p-4 md:p-6 mb-8 flex items-center justify-between">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div key={step.id} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 group relative">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-10",
                    isActive ? "bg-[#0056b3] text-white shadow-md scale-110" : 
                    isCompleted ? "bg-[#e6f0fa] text-[#0056b3]" : "bg-slate-100 text-slate-400"
                  )}>
                    <Icon size={16} className={isCompleted && !isActive ? "opacity-70" : ""} />
                  </div>
                  <div className="hidden md:block">
                    <p className={cn(
                      "text-[10px] uppercase font-black tracking-widest transition-colors",
                      isActive ? "text-[#0056b3]" : "text-slate-400"
                    )}>
                      Step 0{step.id}
                    </p>
                    <p className={cn(
                      "text-xs font-bold transition-colors",
                      isActive ? "text-[#0c2340]" : "text-slate-500"
                    )}>
                      {step.title}
                    </p>
                  </div>
                </div>
                {index < STEPS.length - 1 && (
                  <div className="flex-1 mx-2 md:mx-6 h-px bg-slate-200 relative">
                    <div 
                      className="absolute left-0 top-0 bottom-0 bg-[#0056b3] transition-all duration-500 ease-out" 
                      style={{ width: isCompleted ? "100%" : "0%" }} 
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Wizard Form */}
        <div className="bg-white border border-slate-200 shadow-sm p-6 md:p-10 overflow-hidden relative min-h-[400px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">

                {/* STEP 1: VEHICLE & LOCATION */}
                {currentStep === 1 && (
                  <motion.div key="step1" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                    <div className="mb-8">
                      <h2 className="text-xl font-extrabold uppercase text-[#0c2340] flex items-center gap-2">
                        <Car className="text-[#0056b3]" size={20} /> Car Detail Entry
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">Select your vehicle details.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <FormField control={form.control} name="carModel" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Car Model</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-[#f8fafc] border-slate-200 text-slate-800 focus:ring-[#0056b3] rounded-none h-12">
                                <SelectValue placeholder="Select Model" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-none">
                              {MODELS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="carYear" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Year</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                            <FormControl>
                              <SelectTrigger className="bg-[#f8fafc] border-slate-200 text-slate-800 focus:ring-[#0056b3] rounded-none h-12">
                                <SelectValue placeholder="Select Year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-none">
                              {YEARS.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="fuelType" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Fuel Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-[#f8fafc] border-slate-200 text-slate-800 focus:ring-[#0056b3] rounded-none h-12">
                                <SelectValue placeholder="Select Fuel" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-none">
                              <SelectItem value="petrol">Petrol</SelectItem>
                              <SelectItem value="diesel">Diesel</SelectItem>
                              <SelectItem value="cng">CNG</SelectItem>
                              <SelectItem value="hybrid">Hybrid</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )} />
                    </div>

                    <div className="pt-8 flex justify-end">
                      <Button 
                        type="button" 
                        onClick={() => handleNext(['carModel', 'carYear', 'fuelType'])}
                        className="bg-[#0056b3] hover:bg-[#0056b3]/90 text-white rounded-none px-8 py-6 uppercase font-bold tracking-widest"
                      >
                        Next Step <ChevronRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: SERVICE SELECTION */}
                {currentStep === 2 && (
                  <motion.div key="step2" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                    <div className="mb-8">
                      <h2 className="text-xl font-extrabold uppercase text-[#0c2340] flex items-center gap-2">
                        <Wrench className="text-[#0056b3]" size={20} /> Service Bucket Selection
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">Select one or more services required for your vehicle.</p>
                      
                      {form.formState.errors.serviceIds && (
                        <div className="mt-2">
                          <p className="text-[11px] bg-red-50 text-red-600 p-2 inline-block border border-red-100">
                            {form.formState.errors.serviceIds.message}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-8">
                      {categories?.map((cat) => (
                        <div key={cat.id} className="space-y-4">
                          <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-[#0056b3] border-b border-slate-100 pb-2">
                            {cat.name}
                          </h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {cat.services?.map(srv => {
                              const isSelected = currentServiceIds.includes(srv.id);
                              
                              return (
                                <label 
                                  key={srv.id}
                                  htmlFor={`service-${srv.id}`}
                                  className={cn(
                                    "flex items-start gap-4 p-4 border-2 cursor-pointer transition-all duration-200 rounded-none",
                                    isSelected ? "border-[#0056b3] bg-[#f0f7ff]" : "border-slate-100 hover:border-[#8ab4f8] bg-white"
                                  )}
                                >
                                  <Checkbox
                                    id={`service-${srv.id}`}
                                    className="mt-1 rounded-none border-slate-300 data-[state=checked]:bg-[#0056b3] data-[state=checked]:border-[#0056b3]"
                                    checked={isSelected}
                                    onCheckedChange={(checked) => {
                                      const updated = checked 
                                        ? [...currentServiceIds, srv.id] 
                                        : currentServiceIds.filter(id => id !== srv.id);
                                      form.setValue("serviceIds", updated, { shouldValidate: true });
                                    }}
                                  />
                                  <div>
                                    <p className="text-sm font-bold text-[#0c2340]">{srv.name}</p>
                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{srv.description}</p>
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-8 flex justify-between">
                      <Button type="button" variant="outline" onClick={handleBack} className="rounded-none px-6 py-6 border-slate-300 uppercase font-bold text-slate-600">
                        <ChevronLeft size={16} className="mr-2" /> Back
                      </Button>
                      <Button 
                        type="button" 
                        onClick={() => handleNext(['serviceIds'])}
                        className="bg-[#0056b3] hover:bg-[#0056b3]/90 text-white rounded-none px-8 py-6 uppercase font-bold tracking-widest"
                      >
                        Next Step <ChevronRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: SCHEDULE */}
                {currentStep === 3 && (
                  <motion.div key="step3" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                    <div className="mb-8">
                      <h2 className="text-xl font-extrabold uppercase text-[#0c2340] flex items-center gap-2">
                        <CalendarIcon className="text-[#0056b3]" size={20} /> Calendar & Timeslot Picker
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">Select your preferred date to view real-time slot availability.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                      <div>
                        <FormField control={form.control} name="date" render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Select Date</FormLabel>
                            <div className="border border-slate-200 bg-white p-2">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(date) => {
                                  field.onChange(date);
                                  form.setValue("slotId", ""); 
                                }}
                                disabled={(date) => date < new Date() || date > addDays(new Date(), 14)}
                                initialFocus
                                className="w-full"
                              />
                            </div>
                            <FormMessage className="text-[10px]" />
                          </FormItem>
                        )} />
                      </div>

                      <div>
                        <FormField control={form.control} name="slotId" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Available Timeslots</FormLabel>
                            <div className="grid grid-cols-2 gap-3 mt-2">
                              {!formattedDate ? (
                                <div className="col-span-2 p-8 border border-dashed border-slate-200 text-center text-xs text-slate-400 font-medium">
                                  Please select a date from the calendar to view slots.
                                </div>
                              ) : isSlotsLoading ? (
                                <div className="col-span-2 p-8 text-center text-xs text-[#0056b3] font-medium flex justify-center items-center gap-2">
                                  <div className="w-4 h-4 border-2 border-[#0056b3] border-t-transparent rounded-full animate-spin"></div> Loading slots...
                                </div>
                              ) : slots && slots.length > 0 ? (
                                slots.map(slot => {
                                  const isSelected = field.value === slot.id;
                                  return (
                                    <div 
                                      key={slot.id}
                                      onClick={() => slot.available && field.onChange(slot.id)}
                                      className={cn(
                                        "p-3 border text-center text-xs font-bold uppercase tracking-wider transition-all duration-200 rounded-none",
                                        !slot.available ? "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed" :
                                        isSelected ? "bg-[#0056b3] border-[#0056b3] text-white shadow-md" :
                                        "bg-white border-slate-200 text-[#0c2340] hover:border-[#0056b3] cursor-pointer"
                                      )}
                                    >
                                      {slot.time}
                                    </div>
                                  );
                                })
                              ) : (
                                <div className="col-span-2 p-4 text-center text-xs text-red-500 bg-red-50 border border-red-100">
                                  No slots available on this date.
                                </div>
                              )}
                            </div>
                            <FormMessage className="text-[10px]" />
                          </FormItem>
                        )} />
                      </div>
                    </div>

                    <div className="pt-8 flex justify-between">
                      <Button type="button" variant="outline" onClick={handleBack} className="rounded-none px-6 py-6 border-slate-300 uppercase font-bold text-slate-600">
                        <ChevronLeft size={16} className="mr-2" /> Back
                      </Button>
                      <Button 
                        type="button" 
                        onClick={() => handleNext(['date', 'slotId'])}
                        className="bg-[#0056b3] hover:bg-[#0056b3]/90 text-white rounded-none px-8 py-6 uppercase font-bold tracking-widest"
                      >
                        Next Step <ChevronRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: CONTACT & CONFIRM */}
                {currentStep === 4 && (
                  <motion.div key="step4" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                    <div className="mb-8">
                      <h2 className="text-xl font-extrabold uppercase text-[#0c2340] flex items-center gap-2">
                        <User className="text-[#0056b3]" size={20} /> Contact & Confirmation
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">Provide your contact info to receive SMS/WhatsApp updates.</p>
                    </div>

                    <div className="bg-[#f0f7ff] p-5 border border-[#8ab4f8]/30 mb-8 grid md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <p className="text-[10px] uppercase font-black tracking-widest text-[#0056b3] mb-1">Selected Vehicle</p>
                        <p className="font-bold text-[#0c2340]">{form.getValues("carModel")} ({form.getValues("carYear")})</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-black tracking-widest text-[#0056b3] mb-1">Appointment</p>
                        <p className="font-bold text-[#0c2340]">{form.getValues("date") ? format(form.getValues("date"), "MMM do, yyyy") : ""} at {slots?.find(s => s.id === form.getValues("slotId"))?.time}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-black tracking-widest text-[#0056b3] mb-1">Services</p>
                        <p className="font-bold text-[#0c2340]">{form.getValues("serviceIds").length} items selected</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="customerName" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Full Name</FormLabel>
                          <FormControl>
                            <Input className="bg-[#f8fafc] border-slate-200 text-slate-800 focus-visible:ring-[#0056b3] rounded-none h-12" placeholder="Your Name" {...field} />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Phone Number <span className="text-[#0056b3] normal-case tracking-normal ml-1">(For WhatsApp updates)</span></FormLabel>
                          <FormControl>
                            <Input className="bg-[#f8fafc] border-slate-200 text-slate-800 focus-visible:ring-[#0056b3] rounded-none h-12" placeholder="Mobile Number" {...field} />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 pt-2">
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Email (Optional)</FormLabel>
                          <FormControl>
                            <Input className="bg-[#f8fafc] border-slate-200 text-slate-800 focus-visible:ring-[#0056b3] rounded-none h-12" type="email" placeholder="Email Address" {...field} />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="pickupRequired" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Pick Up Required?</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6 pt-3">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="pickup-yes" className="border-slate-300 text-[#0056b3]" />
                                <label htmlFor="pickup-yes" className="text-xs font-bold text-[#0c2340] cursor-pointer">Yes, pick up my car</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="pickup-no" className="border-slate-300 text-[#0056b3]" />
                                <label htmlFor="pickup-no" className="text-xs font-bold text-[#0c2340] cursor-pointer">No, I'll drop it</label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )} />
                    </div>

                    <FormField control={form.control} name="notes" render={({ field }) => (
                      <FormItem className="pt-2">
                        <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Optional Comments / Issues</FormLabel>
                        <FormControl>
                          <Textarea className="bg-[#f8fafc] border-slate-200 text-slate-800 focus-visible:ring-[#0056b3] rounded-none min-h-[100px] resize-none" placeholder="Any specific issues or requests?" {...field} />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )} />

                    <div className="pt-8 flex justify-between items-center border-t border-slate-100 mt-6">
                      <Button type="button" variant="ghost" onClick={handleBack} className="rounded-none px-4 py-4 uppercase font-bold text-slate-500 hover:bg-slate-50">
                        <ChevronLeft size={16} className="mr-1" /> Edit previous
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={createBooking.isPending} 
                        className="bg-[#0c2340] hover:bg-[#0c2340]/90 text-white rounded-none px-10 py-7 uppercase font-black tracking-widest shadow-xl shadow-blue-900/10 hover:-translate-y-0.5 transition-all"
                      >
                        {createBooking.isPending ? "Confirming..." : "Confirm Booking"}
                      </Button>
                    </div>
                  </motion.div>
                )}
                
              </AnimatePresence>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
