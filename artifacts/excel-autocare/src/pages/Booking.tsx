import { useState } from "react";
import { Link } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, addDays } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowLeft, CheckCircle } from "lucide-react";

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

  // Helper for summary
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
      <div className="min-h-screen bg-slate-50 pt-36 pb-24 flex items-center justify-center px-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-3xl shadow-xl border border-border text-center max-w-lg w-full"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-8">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-bold text-primary mb-4">Booking Confirmed!</h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Your service appointment has been successfully scheduled. We look forward to seeing you.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Booking Reference</p>
            <p className="text-3xl font-bold text-primary tracking-wider">{bookingRef}</p>
          </div>
          <Button className="w-full bg-accent hover:bg-accent/90 h-14 text-lg rounded-xl shadow-lg" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  const steps = ["Vehicle", "Services", "Time", "Details", "Summary"];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <section className="bg-primary pt-36 pb-20 text-white mb-10">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-10">Book a Service</h1>
          
          {/* Step Indicator */}
          <div className="flex items-center justify-between max-w-2xl mx-auto relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 -z-10 rounded-full"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-accent -z-10 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 4) * 100}%` }}></div>
            
            {steps.map((label, i) => {
              const num = i + 1;
              const isActive = step === num;
              const isCompleted = step > num;
              return (
                <div key={label} className="flex flex-col items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300",
                    isActive ? "bg-accent text-white ring-4 ring-white/20" : 
                    isCompleted ? "bg-white text-primary" : "bg-primary-foreground/20 text-white/50"
                  )}>
                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : num}
                  </div>
                  <span className={cn(
                    "text-xs md:text-sm font-medium hidden sm:block",
                    isActive || isCompleted ? "text-white" : "text-white/50"
                  )}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-3xl shadow-lg border border-border overflow-hidden">
          <div className="p-8 md:p-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <div className="border-b pb-6">
                        <h2 className="text-3xl font-bold text-primary">Vehicle Details</h2>
                        <p className="text-muted-foreground mt-2">Tell us about your Maruti Suzuki.</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-8">
                        <FormField control={form.control} name="carModel" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">Car Model</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-14 text-lg"><SelectValue placeholder="Select model" /></SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {MODELS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="carYear" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">Manufacturing Year</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                              <FormControl>
                                <SelectTrigger className="h-14 text-lg"><SelectValue placeholder="Select year" /></SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {YEARS.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="fuelType" render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="text-base">Fuel Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-14 text-lg"><SelectValue placeholder="Select fuel type" /></SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="petrol">Petrol</SelectItem>
                                <SelectItem value="diesel">Diesel</SelectItem>
                                <SelectItem value="cng">CNG</SelectItem>
                                <SelectItem value="hybrid">Hybrid</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <div className="border-b pb-6">
                        <h2 className="text-3xl font-bold text-primary">Select Services</h2>
                        <p className="text-muted-foreground mt-2">Choose what your car needs today.</p>
                      </div>
                      <FormField control={form.control} name="serviceIds" render={() => (
                        <FormItem>
                          <div className="space-y-10">
                            {categories?.map((cat) => (
                              <div key={cat.id} className="space-y-5">
                                <h3 className="font-bold text-xl text-primary bg-slate-50 py-3 px-5 rounded-lg border">{cat.name}</h3>
                                <div className="grid gap-4">
                                  {cat.services?.map(srv => (
                                    <FormField key={srv.id} control={form.control} name="serviceIds" render={({ field }) => (
                                      <FormItem className="flex flex-row items-start space-x-4 space-y-0 p-5 border-2 rounded-2xl hover:border-accent hover:bg-slate-50 cursor-pointer transition-colors">
                                        <FormControl>
                                          <Checkbox
                                            className="mt-1 w-5 h-5"
                                            checked={field.value?.includes(srv.id)}
                                            onCheckedChange={(c) => c ? field.onChange([...field.value, srv.id]) : field.onChange(field.value?.filter((v) => v !== srv.id))}
                                          />
                                        </FormControl>
                                        <div className="space-y-2 flex-1">
                                          <FormLabel className="font-bold text-lg cursor-pointer block">{srv.name}</FormLabel>
                                          <p className="text-base text-muted-foreground">{srv.description}</p>
                                        </div>
                                      </FormItem>
                                    )} />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                          <FormMessage className="mt-4" />
                        </FormItem>
                      )} />
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <div className="border-b pb-6">
                        <h2 className="text-3xl font-bold text-primary">Date & Time</h2>
                        <p className="text-muted-foreground mt-2">When would you like to bring it in?</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-10">
                        <FormField control={form.control} name="date" render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-base">Preferred Date</FormLabel>
                            <div className="border-2 rounded-2xl p-4 bg-white self-start shadow-sm">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(date) => { field.onChange(date); form.setValue("slotId", ""); }}
                                disabled={(date) => date < new Date() || date > addDays(new Date(), 14)}
                                initialFocus
                              />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )} />

                        <FormField control={form.control} name="slotId" render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-base">Available Time Slots</FormLabel>
                            <div className="space-y-4">
                              {!formattedDate ? (
                                <div className="text-muted-foreground p-8 border-2 rounded-2xl border-dashed bg-slate-50 text-center">
                                  Please select a date first
                                </div>
                              ) : isSlotsLoading ? (
                                <div className="text-muted-foreground p-8 text-center animate-pulse">Loading slots...</div>
                              ) : slots?.length === 0 ? (
                                <div className="text-muted-foreground p-8 border-2 rounded-2xl border-dashed bg-slate-50 text-center">
                                  No slots available. Try another day.
                                </div>
                              ) : (
                                <div className="grid grid-cols-2 gap-3">
                                  {slots?.map(slot => (
                                    <div
                                      key={slot.id}
                                      onClick={() => slot.available && field.onChange(slot.id)}
                                      className={cn(
                                        "p-4 rounded-xl border-2 text-center transition-all cursor-pointer font-bold",
                                        !slot.available ? "opacity-50 bg-slate-50 border-border cursor-not-allowed text-muted-foreground" :
                                        field.value === slot.id ? "bg-primary text-white border-primary shadow-md" : "hover:border-accent hover:text-accent border-border text-foreground"
                                      )}
                                    >
                                      {slot.time}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <div className="border-b pb-6">
                        <h2 className="text-3xl font-bold text-primary">Contact Details</h2>
                        <p className="text-muted-foreground mt-2">How can we reach you?</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-8">
                        <FormField control={form.control} name="customerName" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">Full Name</FormLabel>
                            <FormControl><Input className="h-14 text-lg" placeholder="John Doe" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">Phone Number</FormLabel>
                            <FormControl><Input className="h-14 text-lg" placeholder="9876543210" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="text-base">Email Address (Optional)</FormLabel>
                            <FormControl><Input className="h-14 text-lg" type="email" placeholder="john@example.com" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="notes" render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="text-base">Additional Notes (Optional)</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Any specific issues?" className="resize-none min-h-[120px] text-lg" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                    </motion.div>
                  )}

                  {step === 5 && (
                    <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <div className="border-b pb-6">
                        <h2 className="text-3xl font-bold text-primary">Booking Summary</h2>
                        <p className="text-muted-foreground mt-2">Please review your details before confirming.</p>
                      </div>
                      
                      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <p className="text-sm font-semibold text-slate-500 uppercase">Vehicle</p>
                            <p className="text-lg font-bold text-primary">{form.getValues("carModel")} ({form.getValues("carYear")})</p>
                            <p className="text-muted-foreground capitalize">{form.getValues("fuelType")}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-500 uppercase">Date & Time</p>
                            <p className="text-lg font-bold text-primary">{formattedDate}</p>
                            <p className="text-muted-foreground">{getSelectedSlotTime()}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-500 uppercase">Customer</p>
                            <p className="text-lg font-bold text-primary">{form.getValues("customerName")}</p>
                            <p className="text-muted-foreground">{form.getValues("phone")}</p>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-slate-200">
                          <p className="text-sm font-semibold text-slate-500 uppercase mb-3">Selected Services</p>
                          <ul className="space-y-2">
                            {getSelectedServiceNames().map((name, i) => (
                              <li key={i} className="flex items-center gap-2 text-primary font-medium">
                                <CheckCircle className="w-4 h-4 text-accent" /> {name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between pt-8 border-t mt-12">
                  <Button type="button" variant="outline" size="lg" onClick={prevStep} disabled={step === 1 || createBooking.isPending} className="h-14 px-8 text-lg rounded-xl">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back
                  </Button>
                  
                  {step < 5 ? (
                    <Button type="button" size="lg" onClick={nextStep} className="bg-accent hover:bg-accent/90 h-14 px-10 text-lg rounded-xl shadow-lg">
                      Continue <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  ) : (
                    <Button type="submit" size="lg" disabled={createBooking.isPending} className="bg-primary hover:bg-primary/90 h-14 px-12 text-lg rounded-xl shadow-xl min-w-[200px]">
                      {createBooking.isPending ? "Confirming..." : "Confirm & Submit"}
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