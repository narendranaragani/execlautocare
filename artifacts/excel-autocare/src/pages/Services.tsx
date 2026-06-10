import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useListServices, getListServicesQueryKey } from "@workspace/api-client-react";
import { Wrench, Shield, Droplet, Zap, CheckCircle2 } from "lucide-react";

const FALLBACK_CATEGORIES = [
  {
    id: 1, name: "Car Body Works & Accident Repair", description: "Precision structural and body repairs.",
    services: [
      { id: 101, name: "Chassis Realignment", description: "Laser-guided structural repairs to factory specs." },
      { id: 102, name: "Dent Removal", description: "Paintless PDR + deep scratch extraction." },
      { id: 103, name: "Panel Replacement", description: "Doors, bumpers, fenders, and side-panels." }
    ]
  },
  {
    id: 2, name: "Premium Paint Jobs", description: "Showroom finish paint and coatings.",
    services: [
      { id: 201, name: "Full-Body Overhaul", description: "Dust-free thermal baking booths." },
      { id: 202, name: "Color Matching", description: "Computerized colorimetry, Maruti paint codes." },
      { id: 203, name: "Scratch & Clear-Coat Repair", description: "Localized spot painting and blending." }
    ]
  },
  {
    id: 3, name: "Mechanical Workshop", description: "Advanced diagnostics and component repair.",
    services: [
      { id: 301, name: "Engine Diagnostics", description: "OBD scanner and fault isolation." },
      { id: 302, name: "Brake & Clutch Overhaul", description: "Pad upgrades, disc resurfacing, hydraulic bleeding." },
      { id: 303, name: "Suspension Tuning", description: "Shock absorber replacement and alignment." }
    ]
  },
  {
    id: 4, name: "Scheduled Periodic Maintenance", description: "Keep your car running smoothly.",
    services: [
      { id: 401, name: "Fluid & Filter Package", description: "Oil, air/fuel filters, coolant, wipers." },
      { id: 402, name: "Electrical Assessment", description: "Alternator, battery CCA check, fuse check." },
      { id: 403, name: "Tyre & Wheel Care", description: "3D alignment, balancing, wear check." }
    ]
  },
  {
    id: 5, name: "Genuine Spare Parts", description: "100% OEM parts for durability and safety.",
    services: [
      { id: 501, name: "Replacement Parts", description: "Air filters, spark plugs, gaskets, engine mounts." }
    ]
  }
];

export default function Services() {
  const { data: categoriesData, isLoading } = useListServices({ query: { queryKey: getListServicesQueryKey() } });
  
  const categories = categoriesData && categoriesData.length > 0 ? categoriesData : FALLBACK_CATEGORIES;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <section className="bg-primary py-24 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            From routine maintenance to complex structural repairs, our authorized facility is equipped for every requirement.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-10">
        <div className="grid md:grid-cols-12 gap-8">
          
          <div className="md:col-span-8 space-y-8">
            {categories.map((category, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                key={category.id} 
                className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden"
              >
                <div className="p-6 md:p-8 border-b border-border bg-slate-50/50">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-accent/10 p-3 rounded-xl text-accent">
                      {index === 0 ? <Wrench /> : index === 1 ? <Droplet /> : index === 2 ? <Zap /> : <Shield />}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-2">{category.name}</h2>
                      <p className="text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 md:p-8">
                  <Accordion type="multiple" className="w-full">
                    {category.services?.map((service) => (
                      <AccordionItem key={service.id} value={`service-${service.id}`}>
                        <AccordionTrigger className="hover:no-underline hover:text-accent font-semibold text-primary">
                          <div className="flex items-center gap-3 text-left">
                            <CheckCircle2 className="w-4 h-4 text-accent/70 shrink-0" />
                            {service.name}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pt-2 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <span>{service.description}</span>
                          <Button size="sm" asChild className="shrink-0 hover-beam">
                            <Link href={`/booking?service=${service.id}`}>Book This</Link>
                          </Button>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="md:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-primary text-white p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">Ready for Service?</h3>
                <p className="text-primary-foreground/80 mb-6">
                  Book your appointment online and skip the queue. We guarantee transparent pricing.
                </p>
                <Button size="lg" className="w-full bg-accent hover:bg-accent/90 hover-beam" asChild>
                  <Link href="/booking">Book Service Now</Link>
                </Button>
              </div>

              <div className="bg-white border border-border p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="text-accent w-6 h-6" />
                  <h4 className="font-bold text-primary">Maruti Genuine Parts</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  We strictly use MGP for all replacements to ensure your vehicle's longevity and warranty compliance.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
