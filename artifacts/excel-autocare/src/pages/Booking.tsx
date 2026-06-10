import { useState } from "react";
import { Link } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, addDays } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowLeft, CheckCircle, CheckCircle2 } from "lucide-react";

import { useListServices, getListServicesQueryKey, useGetAvailableSlots, getGetAvailableSlotsQueryKey, useCreateBooking } from "@workspace/api-client-react";
import { BookingInputFuelType } from "@workspace/api-client-react/src/generated/api.schemas";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const MODELS = ["Swift", "Baleno", "Brezza", "WagonR", "Alto K10", "Dzire", "Ertiga", "XL6", "Ciaz", "S-Presso", "Celerio", "Fronx", "Jimny", "Grand Vitara", "Ignis"];
const YEARS = Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - i);

const bookingSchema = z.object({
  carModel: z.string().min(1, "Please select a car model"),
  carYear: z.coerce.number().min(2000, "Please select a valid year"),
  fuelType: z.enum(["petrol", "diesel", "cng", "hybrid"], { required_error: "Please select fuel type" }),
  serviceIds: z.array(z.number()).min(1, "Please select at least one service"),
  date: z.date({ required_error: "Please select a date" }),
  slotId: z.string().min(1, "Please select a time slot"),
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  notes: z.string().optional()
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function Booking() {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceIds: [],
      notes: "",
      email: "",
      customerName: "",
      phone: ""
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

  const onSubmit = (data: BookingFormValues) => {
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
        notes: data.notes || null,
      }
    }, {
      onSuccess: (res) => {
        setBookingRef(`EXC-${res.id.toString().padStart(5, '0')}`);
        setIsSuccess(true);
      }
    });
  };

  const nextStep = async () => {
    let isValid = false;
    if (step === 1) isValid = await form.trigger(["carModel", "carYear", "fuelType"]);
    else if (step === 2) isValid = await form.trigger(["serviceIds"]);
    else if (step === 3) isValid = await form.trigger(["date", "slotId"]);
    else if (step === 4) isValid = await form.trigger(["customerName", "phone", "email"]);
    
    if (isValid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

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
      <div className="min-h-screen bg-[#07111f] pt-36 pb-24 flex items-center justify-center px-4 font-sans">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card neon-border p-12 rounded-3xl text-center max-w-lg w-full relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-accent/20 blur-[60px] pointer-events-none"></div>
          <div className="w-20 h-20 bg-accent/10 border border-accent/30 rounded-full flex items-center justify-center text-accent mx-auto mb-8 relative z-10 headlight-glow">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-white mb-4 relative z-10">Booking Confirmed</h2>
          <p className="text-muted-foreground text-sm mb-8 leading-relaxed relative z-10">
            Your service appointment has been successfully scheduled. We look forward to seeing you.
          </p>
          <div className="bg-[#0d1b2a] border border-white/10 rounded-2xl p-6 mb-8 relative z-10">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Booking Reference</p>
            <p className="text-3xl font-heading font-black text-accent tracking-widest">{bookingRef}</p>
          </div>
          <Button className="w-full bg-white text-[#07111f] hover:bg-white/90 h-14 text-sm font-bold uppercase tracking-wide rounded-xl relative z-10" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  const steps = ["Vehicle", "Services", "Time", "Details", "Summary"];

  return (
    <div className="min-h-screen bg-[#07111f] font-sans pb-32">
      {/* Header */}
      <section className="pt-36 pb-16 text-white relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "60px 60px" }}></div>
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-heading font-black mb-12 uppercase tracking-tight">Book a Service</h1>
          
          {/* Step Indicator */}
          <div className="flex items-center justify-between max-w-2xl mx-auto relative">
            <div className="absolute left-0 top-5 -translate-y-1/2 w-full h-0.5 bg-white/10 -z-10 rounded-full"></div>
            <div className="absolute left-0 top-5 -translate-y-1/2 h-0.5 bg-accent -z-10 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(0,163,255,0.8)]" style={{ width: `${((step - 1) / 4) * 100}%` }}></div>
            
            {steps.map((label, i) => {
              const num = i + 1;
              const isActive = step === num;
              const isCompleted = step > num;
              return (
                <div key={label} className="flex flex-col items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300",
                    isActive ? "bg-accent text-white shadow-[0_0_15px_rgba(0,163,255,0.6)] border-2 border-accent" : 
                    isCompleted ? "bg-white text-[#07111f] border-2 border-white" : "bg-[#0d1b2a] text-white/30 border-2 border-white/10"
                  )}>
                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : num}
                  </div>
                  <span className={cn(
                    "text-[10px] md:text-xs font-bold uppercase tracking-widest hidden sm:block transition-colors",
                    isActive || isCompleted ? "text-white" : "text-white/30"
                  )}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-3xl">
        <div className="glass-card neon-border rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 md:p-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <div className="border-b border-white/10 pb-6">
                        <h2 className="text-2xl font-heading font-bold text-white">Vehicle Details</h2>
                        <p className="text-muted-foreground mt-2 text-sm">Tell us about your Maruti Suzuki.</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-8">
                        <FormField control={form.control} name="carModel" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-300">Car Model</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-14 bg-[#0d1b2a] border-white/10 text-white focus:border-accent focus:ring-accent/20"><SelectValue placeholder="Select model" /></SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-[#0d1b2a] border-white/10 text-white">
                                {MODELS.map(m => <SelectItem key={m} value={m} className="focus:bg-white/10 focus:text-white">{m}</SelectItem>)}
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="carYear" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-300">Manufacturing Year</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                              <FormControl>
                                <SelectTrigger className="h-14 bg-[#0d1b2a] border-white/10 text-white focus:border-accent focus:ring-accent/20"><SelectValue placeholder="Select year" /></SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-[#0d1b2a] border-white/10 text-white">
                                {YEARS.map(y => <SelectItem key={y} value={y.toString()} className="focus:bg-white/10 focus:text-white">{y}</SelectItem>)}
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="fuelType" render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-300">Fuel Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-14 bg-[#0d1b2a] border-white/10 text-white focus:border-accent focus:ring-accent/20"><SelectValue placeholder="Select fuel type" /></SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-[#0d1b2a] border-white/10 text-white">
                                <SelectItem value="petrol" className="focus:bg-white/10 focus:text-white">Petrol</SelectItem>
                                <SelectItem value="diesel" className="focus:bg-white/10 focus:text-white">Diesel</SelectItem>
                                <SelectItem value="cng" className="focus:bg-white/10 focus:text-white">CNG</SelectItem>
                                <SelectItem value="hybrid" className="focus:bg-white/10 focus:text-white">Hybrid</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )} />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <div className="border-b border-white/10 pb-6">
                        <h2 className="text-2xl font-heading font-bold text-white">Select Services</h2>
                        <p className="text-muted-foreground mt-2 text-sm">Choose what your car needs today.</p>
                      </div>
                      <FormField control={form.control} name="serviceIds" render={() => (
                        <FormItem>
                          <div className="space-y-8">
                            {categories?.map((cat) => (
                              <div key={cat.id} className="space-y-4">
                                <h3 className="font-heading font-bold text-sm tracking-wider uppercase text-white bg-white/5 py-3 px-5 rounded-lg border border-white/10">{cat.name}</h3>
                                <div className="grid gap-3">
                                  {cat.services?.map(srv => (
                                    <FormField key={srv.id} control={form.control} name="serviceIds" render={({ field }) => {
                                      const isSelected = field.value?.includes(srv.id);
                                      return (
                                        <FormItem className={cn(
                                          "flex flex-row items-start space-x-4 space-y-0 p-5 border rounded-2xl cursor-pointer transition-all",
                                          isSelected ? "border-accent bg-accent/5 shadow-[0_0_15px_rgba(0,163,255,0.1)]" : "border-white/10 bg-[#0d1b2a] hover:border-white/30"
                                        )}>
                                          <FormControl>
                                            <Checkbox
                                              className={cn("mt-1 w-5 h-5 rounded border-white/30", isSelected && "border-accent bg-accent text-white")}
                                              checked={isSelected}
                                              onCheckedChange={(c) => c ? field.onChange([...field.value, srv.id]) : field.onChange(field.value?.filter((v) => v !== srv.id))}
                                            />
                                          </FormControl>
                                          <div className="space-y-1.5 flex-1">
                                            <FormLabel className={cn("font-bold text-base cursor-pointer block transition-colors", isSelected ? "text-accent" : "text-white")}>{srv.name}</FormLabel>
                                            <p className="text-sm text-muted-foreground">{srv.description}</p>
                                          </div>
                                        </FormItem>
                                      );
                                    }} />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                          <FormMessage className="mt-4 text-red-400" />
                        </FormItem>
                      )} />
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <div className="border-b border-white/10 pb-6">
                        <h2 className="text-2xl font-heading font-bold text-white">Date & Time</h2>
                        <p className="text-muted-foreground mt-2 text-sm">When would you like to bring it in?</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-10">
                        <FormField control={form.control} name="date" render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-300">Preferred Date</FormLabel>
                            <div className="border border-white/10 rounded-2xl p-4 bg-[#0d1b2a] self-start shadow-inner">
                              {/* Dark Calendar styling overridden via className and tailwind in components/ui if needed, using dark mode basics */}
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(date) => { field.onChange(date); form.setValue("slotId", ""); }}
                                disabled={(date) => date < new Date() || date > addDays(new Date(), 14)}
                                initialFocus
                                className="text-white dark"
                              />
                            </div>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )} />

                        <FormField control={form.control} name="slotId" render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-300">Available Time Slots</FormLabel>
                            <div className="space-y-4">
                              {!formattedDate ? (
                                <div className="text-muted-foreground text-sm p-8 border border-white/10 rounded-2xl border-dashed bg-[#0d1b2a] text-center">
                                  Please select a date first
                                </div>
                              ) : isSlotsLoading ? (
                                <div className="text-accent text-sm font-bold uppercase tracking-widest p-8 text-center animate-pulse">Loading slots...</div>
                              ) : slots?.length === 0 ? (
                                <div className="text-muted-foreground text-sm p-8 border border-white/10 rounded-2xl border-dashed bg-[#0d1b2a] text-center">
                                  No slots available. Try another day.
                                </div>
                              ) : (
                                <div className="grid grid-cols-2 gap-3">
                                  {slots?.map(slot => (
                                    <div
                                      key={slot.id}
                                      onClick={() => slot.available && field.onChange(slot.id)}
                                      className={cn(
                                        "p-4 rounded-xl border text-center transition-all cursor-pointer font-bold text-sm",
                                        !slot.available ? "opacity-30 bg-[#0d1b2a] border-white/5 cursor-not-allowed text-white" :
                                        field.value === slot.id ? "bg-accent text-white border-accent shadow-[0_0_15px_rgba(0,163,255,0.4)]" : "hover:border-accent/50 hover:bg-white/5 border-white/10 text-white"
                                      )}
                                    >
                                      {slot.time}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )} />
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <div className="border-b border-white/10 pb-6">
                        <h2 className="text-2xl font-heading font-bold text-white">Contact Details</h2>
                        <p className="text-muted-foreground mt-2 text-sm">How can we reach you?</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-8">
                        <FormField control={form.control} name="customerName" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-300">Full Name</FormLabel>
                            <FormControl><Input className="h-14 bg-[#0d1b2a] border-white/10 text-white focus-visible:ring-accent" placeholder="John Doe" {...field} /></FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-300">Phone Number</FormLabel>
                            <FormControl><Input className="h-14 bg-[#0d1b2a] border-white/10 text-white focus-visible:ring-accent" placeholder="9876543210" {...field} /></FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-300">Email Address (Optional)</FormLabel>
                            <FormControl><Input className="h-14 bg-[#0d1b2a] border-white/10 text-white focus-visible:ring-accent" type="email" placeholder="john@example.com" {...field} /></FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="notes" render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-300">Additional Notes (Optional)</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Any specific issues?" className="resize-none min-h-[120px] bg-[#0d1b2a] border-white/10 text-white focus-visible:ring-accent" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )} />
                      </div>
                    </motion.div>
                  )}

                  {step === 5 && (
                    <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <div className="border-b border-white/10 pb-6">
                        <h2 className="text-2xl font-heading font-bold text-white">Booking Summary</h2>
                        <p className="text-muted-foreground mt-2 text-sm">Please review your details before confirming.</p>
                      </div>
                      
                      <div className="bg-[#0d1b2a] rounded-2xl p-8 border border-white/10 space-y-8">
                        <div className="grid sm:grid-cols-3 gap-6">
                          <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Vehicle</p>
                            <p className="text-base font-bold text-white">{form.getValues("carModel")} ({form.getValues("carYear")})</p>
                            <p className="text-muted-foreground text-sm capitalize">{form.getValues("fuelType")}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Date & Time</p>
                            <p className="text-base font-bold text-white">{formattedDate}</p>
                            <p className="text-muted-foreground text-sm">{getSelectedSlotTime()}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Customer</p>
                            <p className="text-base font-bold text-white">{form.getValues("customerName")}</p>
                            <p className="text-muted-foreground text-sm">{form.getValues("phone")}</p>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-white/10">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Selected Services</p>
                          <ul className="space-y-3">
                            {getSelectedServiceNames().map((name, i) => (
                              <li key={i} className="flex items-center gap-3 text-white font-medium text-sm">
                                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" /> {name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between pt-8 border-t border-white/10 mt-12">
                  <Button type="button" variant="outline" size="lg" onClick={prevStep} disabled={step === 1 || createBooking.isPending} className="h-14 px-8 text-sm font-bold uppercase tracking-wider rounded-xl border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  
                  {step < 5 ? (
                     <Button type="button" size="lg" onClick={nextStep} className="bg-white text-[#07111f] hover:bg-white/90 h-14 px-10 text-sm font-bold uppercase tracking-wider rounded-xl">
                      Next Step <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button type="submit" size="lg" disabled={createBooking.isPending} className="hover-beam bg-accent pulse-glow hover:bg-accent/90 text-white h-14 px-10 text-sm font-bold uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(0,163,255,0.4)]">
                      {createBooking.isPending ? "Confirming..." : "Confirm Booking"}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
