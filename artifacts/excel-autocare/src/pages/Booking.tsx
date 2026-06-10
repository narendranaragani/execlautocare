import { useState } from "react";
import { Link } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, addDays } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, CheckCircle2 } from "lucide-react";

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
      <div className="min-h-screen bg-white pt-32 pb-24 flex items-center justify-center px-4 font-sans">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card border border-border p-10 rounded-2xl text-center max-w-md w-full shadow-sm"
        >
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-accent mx-auto mb-6">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl text-primary font-semibold mb-3">Booking Confirmed</h2>
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
            Your service appointment has been successfully scheduled. We look forward to seeing you.
          </p>
          <div className="bg-white border border-border rounded-xl p-5 mb-8">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Booking Reference</p>
            <p className="text-xl font-bold text-primary">{bookingRef}</p>
          </div>
          <Button className="w-full font-semibold" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  const steps = ["Vehicle", "Services", "Time", "Details", "Summary"];

  return (
    <div className="min-h-screen bg-white font-sans pb-24">
      {/* Header */}
      <section className="pt-32 pb-12 bg-secondary border-b border-border">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-3xl md:text-4xl text-primary mb-10">Book a Service</h1>
          
          {/* Step Indicator */}
          <div className="flex items-center justify-between max-w-xl mx-auto relative">
            <div className="absolute left-0 top-4 -translate-y-1/2 w-full h-[2px] bg-border -z-10 rounded-full"></div>
            <div className="absolute left-0 top-4 -translate-y-1/2 h-[2px] bg-accent -z-10 rounded-full transition-all duration-300" style={{ width: `${((step - 1) / 4) * 100}%` }}></div>
            
            {steps.map((label, i) => {
              const num = i + 1;
              const isActive = step === num;
              const isCompleted = step > num;
              return (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors",
                    isActive ? "bg-accent text-white" : 
                    isCompleted ? "bg-white text-primary border-2 border-border" : "bg-white text-muted-foreground border-2 border-border"
                  )}>
                    {isCompleted ? <CheckCircle size={14} /> : num}
                  </div>
                  <span className={cn(
                    "text-[10px] font-semibold uppercase tracking-wider hidden sm:block",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-2xl mt-12">
        <div className="bg-card border border-border rounded-2xl shadow-sm">
          <div className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                      <div>
                        <h2 className="text-xl text-primary font-semibold mb-1">Vehicle Details</h2>
                        <p className="text-muted-foreground text-sm">Tell us about your Maruti Suzuki.</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="carModel" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Car Model</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-white border-border text-primary focus:ring-accent"><SelectValue placeholder="Select model" /></SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white border-border">
                                {MODELS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="carYear" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Manufacturing Year</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                              <FormControl>
                                <SelectTrigger className="bg-white border-border text-primary focus:ring-accent"><SelectValue placeholder="Select year" /></SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white border-border">
                                {YEARS.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="fuelType" render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Fuel Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-white border-border text-primary focus:ring-accent"><SelectValue placeholder="Select fuel type" /></SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white border-border">
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
                    <motion.div key="step2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                      <div>
                        <h2 className="text-xl text-primary font-semibold mb-1">Select Services</h2>
                        <p className="text-muted-foreground text-sm">Choose what your car needs today.</p>
                      </div>
                      <FormField control={form.control} name="serviceIds" render={() => (
                        <FormItem>
                          <div className="space-y-6">
                            {categories?.map((cat) => (
                              <div key={cat.id} className="space-y-3">
                                <h3 className="font-semibold text-sm tracking-wide text-primary bg-secondary py-2 px-3 rounded-md">{cat.name}</h3>
                                <div className="grid gap-2">
                                  {cat.services?.map(srv => (
                                    <FormField key={srv.id} control={form.control} name="serviceIds" render={({ field }) => {
                                      const isSelected = field.value?.includes(srv.id);
                                      return (
                                        <FormItem className={cn(
                                          "flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-xl cursor-pointer transition-colors",
                                          isSelected ? "border-accent bg-accent/5" : "border-border bg-white hover:border-border/80"
                                        )}>
                                          <FormControl>
                                            <Checkbox
                                              className={cn("mt-0.5 w-4 h-4 rounded border-border", isSelected && "border-accent bg-accent text-white")}
                                              checked={isSelected}
                                              onCheckedChange={(c) => c ? field.onChange([...field.value, srv.id]) : field.onChange(field.value?.filter((v) => v !== srv.id))}
                                            />
                                          </FormControl>
                                          <div className="space-y-1 flex-1">
                                            <FormLabel className={cn("font-medium text-sm cursor-pointer block", isSelected ? "text-primary" : "text-primary")}>{srv.name}</FormLabel>
                                            <p className="text-xs text-muted-foreground">{srv.description}</p>
                                          </div>
                                        </FormItem>
                                      );
                                    }} />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                      <div>
                        <h2 className="text-xl text-primary font-semibold mb-1">Date & Time</h2>
                        <p className="text-muted-foreground text-sm">When would you like to bring it in?</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-8">
                        <FormField control={form.control} name="date" render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Preferred Date</FormLabel>
                            <div className="border border-border rounded-xl p-3 bg-white self-start shadow-sm">
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
                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Available Time Slots</FormLabel>
                            <div className="space-y-3">
                              {!formattedDate ? (
                                <div className="text-muted-foreground text-sm p-6 border border-border rounded-xl border-dashed bg-secondary text-center">
                                  Please select a date first
                                </div>
                              ) : isSlotsLoading ? (
                                <div className="text-accent text-sm font-semibold p-6 text-center animate-pulse">Loading slots...</div>
                              ) : slots?.length === 0 ? (
                                <div className="text-muted-foreground text-sm p-6 border border-border rounded-xl border-dashed bg-secondary text-center">
                                  No slots available. Try another day.
                                </div>
                              ) : (
                                <div className="grid grid-cols-2 gap-2">
                                  {slots?.map(slot => (
                                    <div
                                      key={slot.id}
                                      onClick={() => slot.available && field.onChange(slot.id)}
                                      className={cn(
                                        "p-3 rounded-lg border text-center transition-colors cursor-pointer font-medium text-xs",
                                        !slot.available ? "opacity-40 bg-secondary border-border cursor-not-allowed text-primary" :
                                        field.value === slot.id ? "bg-accent text-white border-accent" : "hover:bg-secondary bg-white border-border text-primary"
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
                    <motion.div key="step4" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                      <div>
                        <h2 className="text-xl text-primary font-semibold mb-1">Contact Details</h2>
                        <p className="text-muted-foreground text-sm">How can we reach you?</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="customerName" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</FormLabel>
                            <FormControl><Input className="bg-white border-border text-primary focus-visible:ring-accent" placeholder="John Doe" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone Number</FormLabel>
                            <FormControl><Input className="bg-white border-border text-primary focus-visible:ring-accent" placeholder="9876543210" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address (Optional)</FormLabel>
                            <FormControl><Input className="bg-white border-border text-primary focus-visible:ring-accent" type="email" placeholder="john@example.com" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="notes" render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Additional Notes (Optional)</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Any specific issues?" className="resize-none min-h-[100px] bg-white border-border text-primary focus-visible:ring-accent" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                    </motion.div>
                  )}

                  {step === 5 && (
                    <motion.div key="step5" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                      <div>
                        <h2 className="text-xl text-primary font-semibold mb-1">Confirm Booking</h2>
                        <p className="text-muted-foreground text-sm">Please review your details.</p>
                      </div>
                      <div className="bg-secondary rounded-xl p-6 space-y-6 border border-border">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Vehicle</p>
                            <p className="font-medium text-primary text-sm">{form.getValues("carYear")} {form.getValues("carModel")} ({form.getValues("fuelType")})</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Date & Time</p>
                            <p className="font-medium text-primary text-sm">{formattedDate ? format(form.getValues("date"), "PP") : ""} at {getSelectedSlotTime()}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Contact</p>
                            <p className="font-medium text-primary text-sm">{form.getValues("customerName")}<br/>{form.getValues("phone")}</p>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-border">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Selected Services</p>
                          <ul className="space-y-1.5">
                            {getSelectedServiceNames().map((name, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                                <span className="text-sm font-medium text-primary">{name}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center justify-between pt-6 border-t border-border mt-8">
                  {step > 1 ? (
                    <Button type="button" variant="outline" onClick={prevStep} className="border-border text-primary hover:bg-secondary">
                      Back
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  {step < 5 ? (
                    <Button type="button" onClick={nextStep} className="bg-primary text-white hover:bg-primary/90 font-semibold">
                      Continue
                    </Button>
                  ) : (
                    <Button type="submit" disabled={createBooking.isPending} className="hover-beam bg-accent text-white hover:bg-accent/90 font-semibold">
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
