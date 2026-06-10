import { useState, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, addDays } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowLeft, CheckCircle2 } from "lucide-react";

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
import { cn } from "@/lib/utils";

const MODELS = ["Swift", "Baleno", "Brezza", "WagonR", "Alto K10", "Dzire", "Ertiga", "XL6", "Ciaz", "S-Presso", "Celerio", "Fronx", "Jimny", "Grand Vitara", "Ignis"];
const YEARS = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

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
  const [, setLocation] = useLocation();

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
      onSuccess: () => {
        setIsSuccess(true);
      }
    });
  };

  const nextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await form.trigger(["carModel", "carYear", "fuelType"]);
    } else if (step === 2) {
      isValid = await form.trigger(["serviceIds"]);
    } else if (step === 3) {
      isValid = await form.trigger(["date", "slotId"]);
    }
    
    if (isValid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-border text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-4">Booking Confirmed!</h2>
          <p className="text-muted-foreground mb-8">
            Your service appointment has been successfully scheduled. We will send you a confirmation message shortly.
          </p>
          <Button className="w-full bg-accent hover:bg-accent/90" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <section className="bg-primary py-16 text-white mb-10">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Book a Service</h1>
          <div className="flex items-center justify-center gap-2 md:gap-4 text-sm md:text-base font-medium">
            <span className={cn("transition-colors", step >= 1 ? "text-accent" : "text-white/50")}>Vehicle</span>
            <ChevronRight className="w-4 h-4 text-white/30" />
            <span className={cn("transition-colors", step >= 2 ? "text-accent" : "text-white/50")}>Services</span>
            <ChevronRight className="w-4 h-4 text-white/30" />
            <span className={cn("transition-colors", step >= 3 ? "text-accent" : "text-white/50")}>Date & Time</span>
            <ChevronRight className="w-4 h-4 text-white/30" />
            <span className={cn("transition-colors", step >= 4 ? "text-accent" : "text-white/50")}>Details</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
          <div className="p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold text-primary mb-6">Vehicle Details</h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="carModel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Car Model</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger><SelectValue placeholder="Select model" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {MODELS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="carYear"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Manufacturing Year</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                                <FormControl>
                                  <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {YEARS.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="fuelType"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Fuel Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger><SelectValue placeholder="Select fuel type" /></SelectTrigger>
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
                          )}
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold text-primary mb-6">Select Services</h2>
                      <FormField
                        control={form.control}
                        name="serviceIds"
                        render={() => (
                          <FormItem>
                            <div className="space-y-8">
                              {categories?.map((cat) => (
                                <div key={cat.id} className="space-y-4">
                                  <h3 className="font-semibold text-lg border-b pb-2">{cat.name}</h3>
                                  <div className="grid gap-3">
                                    {cat.services?.map(srv => (
                                      <FormField
                                        key={srv.id}
                                        control={form.control}
                                        name="serviceIds"
                                        render={({ field }) => {
                                          return (
                                            <FormItem
                                              key={srv.id}
                                              className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                                            >
                                              <FormControl>
                                                <Checkbox
                                                  checked={field.value?.includes(srv.id)}
                                                  onCheckedChange={(checked) => {
                                                    return checked
                                                      ? field.onChange([...field.value, srv.id])
                                                      : field.onChange(field.value?.filter((value) => value !== srv.id))
                                                  }}
                                                />
                                              </FormControl>
                                              <div className="space-y-1 leading-none flex-1">
                                                <FormLabel className="font-medium cursor-pointer block">{srv.name}</FormLabel>
                                                <p className="text-sm text-muted-foreground">{srv.description}</p>
                                              </div>
                                            </FormItem>
                                          )
                                        }}
                                      />
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <FormMessage className="mt-4" />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold text-primary mb-6">Date & Time</h2>
                      <div className="grid md:grid-cols-2 gap-8">
                        
                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Preferred Date</FormLabel>
                              <div className="border rounded-md p-3 bg-white self-start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={(date) => {
                                    field.onChange(date);
                                    form.setValue("slotId", ""); // Reset slot when date changes
                                  }}
                                  disabled={(date) => date < new Date() || date > addDays(new Date(), 14)}
                                  initialFocus
                                />
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="slotId"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Available Time Slots</FormLabel>
                              <div className="space-y-4">
                                {!formattedDate ? (
                                  <div className="text-muted-foreground text-sm p-4 border rounded-md border-dashed bg-slate-50 text-center">
                                    Please select a date first
                                  </div>
                                ) : isSlotsLoading ? (
                                  <div className="text-muted-foreground text-sm p-4 text-center animate-pulse">
                                    Loading slots...
                                  </div>
                                ) : slots?.length === 0 ? (
                                  <div className="text-muted-foreground text-sm p-4 border rounded-md border-dashed bg-slate-50 text-center">
                                    No slots available for this date. Please try another day.
                                  </div>
                                ) : (
                                  <div className="grid grid-cols-2 gap-2">
                                    {slots?.map(slot => (
                                      <div
                                        key={slot.id}
                                        onClick={() => slot.available && field.onChange(slot.id)}
                                        className={cn(
                                          "p-3 rounded-md border text-center transition-all cursor-pointer text-sm font-medium",
                                          !slot.available ? "opacity-50 bg-slate-50 cursor-not-allowed text-muted-foreground" :
                                          field.value === slot.id ? "bg-primary text-white border-primary shadow-sm" : "hover:border-primary hover:bg-slate-50 text-foreground"
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
                          )}
                        />

                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold text-primary mb-6">Contact Details</h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="customerName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="9876543210" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Email Address (Optional)</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="notes"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Additional Notes (Optional)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Any specific issues you'd like us to look into?" 
                                  className="resize-none" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between pt-6 border-t mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={step === 1 || createBooking.isPending}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  
                  {step < 4 ? (
                    <Button type="button" onClick={nextStep} className="bg-accent hover:bg-accent/90">
                      Continue <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={createBooking.isPending} className="bg-primary hover:bg-primary/90 min-w-[150px]">
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
