import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, addDays } from "date-fns";
import { motion } from "framer-motion";
import { CheckCircle, CheckCircle2, Car, Shield, Wrench, Calendar as CalendarIcon, MapPin, Info } from "lucide-react";

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
const CITIES = ["Mumbai", "Pune", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad"];
const SERVICE_CENTERS = [
  "Excel Autocare - Main Workshop (West)",
  "Excel Autocare - Sector 5 Hub (East)",
  "Excel Autocare - Prime Plaza Station (South)",
  "Excel Autocare - Express Care Center (North)"
];

const bookingSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  city: z.string().min(1, "Please select an outlet city"),
  serviceCenter: z.string().min(1, "Please select a service center"),
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

export default function Booking() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
  const hasInitialized = useRef(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      customerName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      serviceCenter: "",
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
  
  const { data: slots, isLoading: isSlotsLoading } = useGetAvailableSlots(
    { date: formattedDate || "" },
    { query: { enabled: !!formattedDate, queryKey: getGetAvailableSlotsQueryKey({ date: formattedDate || "" }) } }
  );

  const createBooking = useCreateBooking();

  // Watch fields for road progress calculation
  const customerName = form.watch("customerName");
  const phone = form.watch("phone");
  const carModel = form.watch("carModel");
  const carYear = form.watch("carYear");
  const serviceIds = form.watch("serviceIds");
  const slotId = form.watch("slotId");

  const isStep1Done = customerName && customerName.length >= 2 && phone && phone.length >= 10;
  const isStep2Done = isStep1Done && carModel && carYear && serviceIds && serviceIds.length > 0;
  const isStep3Done = isStep2Done && selectedDate && slotId && slotId !== "";

  let progressHeight = 0;
  if (isStep3Done) progressHeight = 100;
  else if (isStep2Done) progressHeight = 66;
  else if (isStep1Done) progressHeight = 33;

  // Pre-select service package from URL - runs only once when categories first loads
  useEffect(() => {
    if (categories && categories.length > 0 && !hasInitialized.current) {
      hasInitialized.current = true;
      const params = new URLSearchParams(window.location.search);
      const serviceParam = params.get("service");
      if (serviceParam) {
        const srvId = parseInt(serviceParam, 10);
        if (!isNaN(srvId)) {
          form.setValue("serviceIds", [srvId]);
          // Match category index to select dropdown
          const catIdx = categories.findIndex(c => c.services?.some(s => s.id === srvId));
          if (catIdx !== -1) {
            setSelectedCategoryIndex(catIdx);
          }
        }
      }
    }
  }, [categories]);

  const onSubmit = (data: BookingFormValues) => {
    // Resolve service names for display & sheet export
    const resolvedServiceNames: string[] = [];
    if (categories) {
      categories.forEach(cat => {
        cat.services?.forEach(srv => {
          if (data.serviceIds.includes(srv.id)) resolvedServiceNames.push(srv.name);
        });
      });
    }

    // Resolve slot time for sheet export
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
        notes: `Address: ${data.address || "N/A"}. City: ${data.city}. Center: ${data.serviceCenter}. Reg: ${data.registrationNo || "N/A"}. Kms: ${data.kilometers || "N/A"}. Pickup: ${data.pickupRequired}. ${data.notes || ""}`,
      }
    }, {
      onSuccess: (res) => {
        const ref = `EXC-${res.id.toString().padStart(5, '0')}`;
        setBookingRef(ref);
        setIsSuccess(true);

        // ── Send to Google Sheets (async, never blocks UI) ────────────
        sendBookingToSheets({
          bookingRef:      ref,
          submittedAt:     new Date().toISOString(),
          // Customer details
          customerName:    data.customerName,
          phone:           data.phone,
          email:           data.email || "",
          address:         data.address || "",
          city:            data.city,
          // Vehicle details
          carModel:        data.carModel,
          carYear:         String(data.carYear),
          fuelType:        data.fuelType,
          registrationNo:  data.registrationNo || "",
          kilometers:      data.kilometers || "",
          // Service details
          serviceCenter:   data.serviceCenter,
          serviceNames:    resolvedServiceNames.join(", "),
          requestDate:     format(data.date, "yyyy-MM-dd"),
          appointmentSlot: resolvedSlotTime,
          pickupRequired:  data.pickupRequired === "yes" ? "Yes" : "No",
          customerNotes:   data.notes || "",
          // ── Staff-side columns (pre-filled, staff updates in sheet) ──
          staffStatus:     "Pending",   // staff will change to Confirmed / In Progress / Completed / Cancelled
          staffRemarks:    "",          // staff fills this after review
        });
      }
    });
  };

  const getSelectedServiceNames = () => {
    const ids = form.getValues("serviceIds");
    if (!categories || !ids) return [];
    const names: string[] = [];
    categories.forEach(cat => {
      cat.services?.forEach(srv => {
        if (ids.includes(srv.id)) names.push(srv.name);
      });
    });
    return names;
  };

  const getSelectedSlotTime = () => {
    const id = form.getValues("slotId");
    if (!slots || !id) return "";
    return slots.find(s => s.id === id)?.time || "";
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#f8fafc] pt-32 pb-24 flex items-center justify-center px-4 font-sans text-[#0c2340]">
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
          <Button className="w-full font-bold bg-[#0c2340] hover:bg-[#0c2340]/90 text-white rounded-none border-0 px-6 py-3 cursor-pointer" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-24 text-[#0c2340]">
      {/* Header */}
      <section className="pt-32 pb-12 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="text-[#0056b3] uppercase tracking-[0.2em] text-xs font-black bg-[#f0f7ff] px-3.5 py-1 rounded-none border border-[#0056b3]/20 inline-block mb-3">
            Service Booking Portal
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#0c2340] mb-4">Book Your Service</h1>
          <p className="text-sm text-slate-500 max-w-lg mx-auto font-normal">
            Fill out the form below to lock in your appointment. Track your completion progress in real-time.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl mt-12">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Animated Tracker Column (Left Sidebar on Desktop) */}
          <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-28">
            <div className="bg-[#0c2340] text-white p-8 border border-slate-200/10 rounded-none shadow-md">
              <span className="text-[#8ab4f8] uppercase tracking-widest text-[9px] font-black block mb-4">
                Booking Status Track
              </span>
              
              <div className="relative pl-8 space-y-8 min-h-[180px]">
                {/* Road Base track */}
                <div className="absolute left-[7px] top-1.5 bottom-1.5 w-[2px] bg-white/10"></div>
                
                {/* Road Active track highlight */}
                <div 
                  className="absolute left-[7px] top-1.5 w-[2px] bg-[#0056b3] transition-all duration-500 ease-out"
                  style={{ height: `${progressHeight}%` }}
                ></div>

                {/* Driving Car Animation */}
                <div 
                  className="absolute left-[8px] -translate-x-1/2 transition-all duration-500 ease-out z-20"
                  style={{ top: `calc(${progressHeight}% - 4px)` }}
                >
                  <div className="bg-[#0056b3] border border-white/40 p-1 rounded-none car-bounce text-white flex items-center justify-center">
                    <Car size={12} className="rotate-90" />
                  </div>
                </div>

                {/* Checkpoints */}
                <div className="relative flex items-center gap-3">
                  <div className={cn(
                    "w-4 h-4 rounded-none border flex items-center justify-center transition-all bg-[#0c2340] text-[9px] font-bold z-10",
                    isStep1Done ? "border-[#0056b3] text-[#0056b3] bg-white" : "border-white/20 text-white/40"
                  )}>
                    {isStep1Done ? "✓" : "1"}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider">Contact Info</h4>
                    <p className="text-[9px] text-slate-400 font-medium">Personal details</p>
                  </div>
                </div>

                <div className="relative flex items-center gap-3">
                  <div className={cn(
                    "w-4 h-4 rounded-none border flex items-center justify-center transition-all bg-[#0c2340] text-[9px] font-bold z-10",
                    isStep2Done ? "border-[#0056b3] text-[#0056b3] bg-white" : "border-white/20 text-white/40"
                  )}>
                    {isStep2Done ? "✓" : "2"}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider">Vehicle & Spares</h4>
                    <p className="text-[9px] text-slate-400 font-medium">Model and services</p>
                  </div>
                </div>

                <div className="relative flex items-center gap-3">
                  <div className={cn(
                    "w-4 h-4 rounded-none border flex items-center justify-center transition-all bg-[#0c2340] text-[9px] font-bold z-10",
                    isStep3Done ? "border-[#0056b3] text-[#0056b3] bg-white" : "border-white/20 text-white/40"
                  )}>
                    {isStep3Done ? "✓" : "3"}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider">Schedule locked</h4>
                    <p className="text-[9px] text-slate-400 font-medium">Date & time slot</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Helper Panel */}
            <div className="bg-white border border-slate-200 p-6 rounded-none shadow-sm hidden lg:block">
              <h4 className="text-xs font-bold uppercase text-[#0c2340] tracking-wide mb-3 flex items-center gap-2">
                <Info size={14} className="text-[#0056b3]" /> Need Assistance?
              </h4>
              <p className="text-[11px] leading-relaxed text-slate-500 font-normal">
                Our support team is online from 9:00 AM to 6:00 PM. Estimates are processed and verified within 1 hour.
              </p>
            </div>
          </div>

          {/* Form Container (Right Side) */}
          <div className="lg:col-span-9">
            <div className="bg-white border border-slate-200 border-t-4 border-t-[#0c2340] rounded-none p-8 shadow-sm">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  
                  {/* Personal Details Section */}
                  <div className="space-y-4">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-[#0c2340] pb-2 border-b border-slate-100 flex items-center gap-2">
                      <MapPin size={16} className="text-[#0056b3]" /> Personal Details :
                    </h2>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <FormField control={form.control} name="customerName" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Name *</FormLabel>
                          <FormControl>
                            <Input className="bg-[#f8fafc] border-slate-200 text-slate-800 focus-visible:ring-[#0056b3] rounded-none font-medium text-sm h-11" placeholder="Your Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Mobile No *</FormLabel>
                          <FormControl>
                            <Input className="bg-[#f8fafc] border-slate-200 text-slate-800 focus-visible:ring-[#0056b3] rounded-none font-medium text-sm h-11" placeholder="Mobile No" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Email</FormLabel>
                          <FormControl>
                            <Input className="bg-[#f8fafc] border-slate-200 text-slate-800 focus-visible:ring-[#0056b3] rounded-none font-medium text-sm h-11" type="email" placeholder="Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <FormField control={form.control} name="address" render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Customer Address</FormLabel>
                          <FormControl>
                            <Input className="bg-[#f8fafc] border-slate-200 text-slate-800 focus-visible:ring-[#0056b3] rounded-none font-medium text-sm h-11" placeholder="Address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">City *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white border-slate-200 text-slate-800 focus:ring-[#0056b3] rounded-none h-11">
                                <SelectValue placeholder="Select Outlet City" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border-slate-200 rounded-none">
                              {CITIES.map(c => (
                                <SelectItem key={c} value={c.toLowerCase()} className="rounded-none">{c}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  </div>

                  {/* Service Details Section */}
                  <div className="space-y-6 pt-4">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-[#0c2340] pb-2 border-b border-slate-100 flex items-center gap-2">
                      <Wrench size={16} className="text-[#0056b3]" /> Service Details ::
                    </h2>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <FormField control={form.control} name="serviceCenter" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Service Center *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white border-slate-200 text-slate-800 focus:ring-[#0056b3] rounded-none h-11">
                                <SelectValue placeholder="Select Service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border-slate-200 rounded-none">
                              {SERVICE_CENTERS.map(sc => (
                                <SelectItem key={sc} value={sc} className="rounded-none text-xs">{sc}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="carModel" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Model *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white border-slate-200 text-slate-800 focus:ring-[#0056b3] rounded-none h-11">
                                <SelectValue placeholder="Select Model" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border-slate-200 rounded-none">
                              {MODELS.map(m => (
                                <SelectItem key={m} value={m} className="rounded-none">{m}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="registrationNo" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Registration No</FormLabel>
                          <FormControl>
                            <Input className="bg-[#f8fafc] border-slate-200 text-slate-800 focus-visible:ring-[#0056b3] rounded-none font-medium text-sm h-11" placeholder="Registration No" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <FormField control={form.control} name="kilometers" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Kilometers</FormLabel>
                          <FormControl>
                            <Input className="bg-[#f8fafc] border-slate-200 text-slate-800 focus-visible:ring-[#0056b3] rounded-none font-medium text-sm h-11" placeholder="Kilometers" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="carYear" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Manufacturing Year *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                            <FormControl>
                              <SelectTrigger className="bg-white border-slate-200 text-slate-800 focus:ring-[#0056b3] rounded-none h-11">
                                <SelectValue placeholder="Select Year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border-slate-200 rounded-none">
                              {YEARS.map(y => (
                                <SelectItem key={y} value={y.toString()} className="rounded-none">{y}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="fuelType" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Fuel Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white border-slate-200 text-slate-800 focus:ring-[#0056b3] rounded-none h-11">
                                <SelectValue placeholder="Select Fuel Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border-slate-200 rounded-none">
                              <SelectItem value="petrol" className="rounded-none">Petrol</SelectItem>
                              <SelectItem value="diesel" className="rounded-none">Diesel</SelectItem>
                              <SelectItem value="cng" className="rounded-none">CNG</SelectItem>
                              <SelectItem value="hybrid" className="rounded-none">Hybrid</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 items-end">
                      {/* Service Type category selection */}
                      {categories && categories.length > 0 && (
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Service Type *</label>
                          <Select 
                            value={selectedCategoryIndex.toString()} 
                            onValueChange={(val) => {
                              const idx = parseInt(val, 10);
                              setSelectedCategoryIndex(idx);
                              // Auto-select first service from this category
                              const firstSrv = categories[idx]?.services?.[0];
                              if (firstSrv) {
                                form.setValue("serviceIds", [firstSrv.id], { shouldValidate: true });
                              }
                            }}
                          >
                            <SelectTrigger className="bg-white border-slate-200 text-slate-800 focus:ring-[#0056b3] rounded-none h-11">
                              <SelectValue placeholder="Select Service Type" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-slate-200 rounded-none">
                              {categories.map((cat, idx) => (
                                <SelectItem key={cat.id} value={idx.toString()} className="rounded-none">{cat.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {/* Request Date Datepicker */}
                      <FormField control={form.control} name="date" render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Request Date *</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full h-11 pl-3 text-left font-medium border-slate-200 bg-white hover:bg-slate-50 text-slate-800 rounded-none focus-visible:ring-[#0056b3]",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>MM/DD/YYYY</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 rounded-none border-slate-200 bg-white" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(date) => {
                                  field.onChange(date);
                                  form.setValue("slotId", ""); // Reset slot on date change
                                }}
                                disabled={(date) => date < new Date() || date > addDays(new Date(), 14)}
                                initialFocus
                                className="rounded-none"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )} />

                      {/* Appointment Time Slot select */}
                      <FormField control={form.control} name="slotId" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Appointment Time *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value} disabled={!formattedDate || isSlotsLoading}>
                            <FormControl>
                              <SelectTrigger className="bg-white border-slate-200 text-slate-800 focus:ring-[#0056b3] rounded-none h-11">
                                <SelectValue placeholder={isSlotsLoading ? "Loading Slots..." : "Appointment Time"} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border-slate-200 rounded-none">
                              {slots && slots.length > 0 ? (
                                slots.map(slot => (
                                  <SelectItem key={slot.id} value={slot.id} disabled={!slot.available} className="rounded-none text-xs">
                                    {slot.time} {!slot.available && "(Booked)"}
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem value="no-slots" disabled className="rounded-none text-xs">
                                  {formattedDate ? "No Slots Available" : "Select Date First"}
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    {/* Specific Service Items Checklist (Sub-selection based on active Service Type) */}
                    {categories && categories[selectedCategoryIndex] && (
                      <div className="space-y-3 p-5 bg-[#f8fafc] border border-slate-200/60 rounded-none">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#0056b3] block mb-2">
                          Configure Checklist Services for: {categories[selectedCategoryIndex].name}
                        </label>
                        <div className="grid md:grid-cols-2 gap-3">
                          {categories[selectedCategoryIndex].services?.map(srv => (
                            <FormField key={srv.id} control={form.control} name="serviceIds" render={({ field }) => {
                              const isSelected = field.value?.includes(srv.id);
                              return (
                                <div 
                                  onClick={() => {
                                    if (isSelected) {
                                      // Don't allow empty list if this is the only one selected
                                      if (field.value.length > 1) {
                                        field.onChange(field.value.filter(v => v !== srv.id));
                                      }
                                    } else {
                                      field.onChange([...field.value, srv.id]);
                                    }
                                  }}
                                  className={cn(
                                    "flex items-start gap-3 p-3 border cursor-pointer select-none bg-white transition-all duration-200 rounded-none",
                                    isSelected ? "border-[#0056b3] bg-blue-50/20" : "border-slate-200 hover:border-slate-300"
                                  )}
                                >
                                  <Checkbox
                                    className="mt-0.5 rounded-none border-slate-300"
                                    checked={isSelected}
                                    onCheckedChange={(c) => {
                                      if (c) {
                                        field.onChange([...field.value, srv.id]);
                                      } else if (field.value.length > 1) {
                                        field.onChange(field.value.filter(v => v !== srv.id));
                                      }
                                    }}
                                  />
                                  <div className="flex-1">
                                    <span className="text-xs font-bold text-[#0c2340] leading-snug">{srv.name}</span>
                                    <p className="text-[10px] text-slate-500 leading-normal mt-0.5">{srv.description}</p>
                                  </div>
                                </div>
                              );
                            }} />
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid md:grid-cols-3 gap-6 items-center pt-2">
                      {/* Pick Up Required */}
                      <FormField control={form.control} name="pickupRequired" render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Pick Up Required</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="pickup-yes" className="border-slate-300 text-[#0056b3] focus:ring-[#0056b3]" />
                                <label htmlFor="pickup-yes" className="text-xs font-semibold text-[#0c2340] cursor-pointer">Yes</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="pickup-no" className="border-slate-300 text-[#0056b3] focus:ring-[#0056b3]" />
                                <label htmlFor="pickup-no" className="text-xs font-semibold text-[#0c2340] cursor-pointer">No</label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                      {/* Additional Notes input */}
                      <FormField control={form.control} name="notes" render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">Additional Instructions</FormLabel>
                          <FormControl>
                            <Input className="bg-[#f8fafc] border-slate-200 text-slate-800 focus-visible:ring-[#0056b3] rounded-none font-medium text-xs h-11" placeholder="Any specific issues or requests?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  </div>

                  {/* Summary & Confirm Panel */}
                  {isStep2Done && (
                    <div className="bg-[#f8fafc] border border-slate-200 p-6 rounded-none space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#0c2340] pb-2 border-b border-slate-200 flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-[#0056b3]" /> Selected Services Summary:
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4 text-xs font-medium text-slate-600">
                        <div>
                          <p className="font-bold text-[#0c2340]">{form.getValues("carModel")} ({form.getValues("carYear")})</p>
                          <p className="text-[10px] text-slate-500 uppercase font-black tracking-wide mt-1">Car Model</p>
                        </div>
                        {selectedDate && slotId && (
                          <div>
                            <p className="font-bold text-[#0c2340]">{format(selectedDate, "PP")} at {getSelectedSlotTime()}</p>
                            <p className="text-[10px] text-slate-500 uppercase font-black tracking-wide mt-1">Date & Time</p>
                          </div>
                        )}
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <ul className="grid sm:grid-cols-2 gap-2 text-xs font-bold text-[#0c2340] uppercase tracking-wide">
                          {getSelectedServiceNames().map((name, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-[#0056b3] shrink-0"></span>
                              {name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                    <div></div>
                    <Button 
                      type="submit" 
                      disabled={createBooking.isPending || !form.formState.isValid} 
                      className="hover-beam bg-[#0056b3] hover:bg-[#0056b3]/95 text-white font-bold rounded-none text-xs uppercase tracking-wider px-8 py-3.5 h-auto cursor-pointer border-0 shadow-md"
                    >
                      {createBooking.isPending ? "Booking Service..." : "Book Service"}
                    </Button>
                  </div>

                </form>
              </Form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
