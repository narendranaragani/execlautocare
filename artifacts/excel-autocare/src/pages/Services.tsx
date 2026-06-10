import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useListServices, getListServicesQueryKey } from "@workspace/api-client-react";
import { Wrench, Shield, Droplet, Settings, Calendar, CheckCircle2, XCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const containerRef = useRef(null);
  const { data: categoriesData } = useListServices({ query: { queryKey: getListServicesQueryKey() } });
  
  const categories = categoriesData && categoriesData.length > 0 ? categoriesData : FALLBACK_CATEGORIES;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".gsap-service-card", 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%", once: true }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [categories]);

  const getCategoryIcon = (index: number) => {
    switch(index) {
      case 0: return <Wrench size={16} />;
      case 1: return <Droplet size={16} />;
      case 2: return <Settings size={16} />;
      case 3: return <Calendar size={16} />;
      default: return <Shield size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans pb-24">
      {/* Header */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1920&q=80" alt="services bg" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 img-overlay-dark" />
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <span className="text-white/60 uppercase tracking-widest text-xs font-medium mb-3 block">Expertise</span>
          <h1 className="text-3xl md:text-4xl text-white mb-4">Our Services</h1>
          <p className="text-sm text-white/80 leading-relaxed max-w-xl mx-auto">
            From routine maintenance to complex structural repairs, our authorized facility is equipped for every requirement.
          </p>
        </div>
      </section>

      {/* Genuine vs Duplicate Parts */}
      <section className="py-24 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl text-primary font-semibold mb-3">Why Genuine Parts Matter</h2>
            <p className="text-muted-foreground text-sm">We refuse to compromise on your safety. Here's why we strictly use MGP.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border border-l-4 border-l-green-500 rounded-xl p-8 shadow-sm">
              <h3 className="text-lg text-primary font-semibold mb-4 flex items-center gap-2">
                <Shield className="text-green-500" size={18} /> Genuine Parts
              </h3>
              <ul className="space-y-3">
                {[
                  "Factory warranty remains intact",
                  "OEM-grade quality",
                  "Precise fit engineered for your model",
                  "Long lifespan and reliability",
                  "Rigorous safety testing approved"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border border-l-4 border-l-red-500 rounded-xl p-8 shadow-sm">
              <h3 className="text-lg text-primary font-semibold mb-4 flex items-center gap-2">
                <XCircle className="text-red-500" size={18} /> Duplicate Parts
              </h3>
              <ul className="space-y-3">
                {[
                  "Voids manufacturer warranty",
                  "Lower quality materials",
                  "Improper fit leading to wear",
                  "Shorter lifespan",
                  "Not certified for high-speed safety"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-secondary border-b border-border">
        <div className="container mx-auto px-4" ref={containerRef}>
          <div className="grid lg:grid-cols-12 gap-10">
            
            <div className="lg:col-span-8 space-y-6">
              {categories.map((category, index) => (
                <div key={category.id} className="gsap-service-card bg-white border border-border rounded-xl overflow-hidden shadow-sm">
                  <div className="p-6 border-b border-border flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-accent">
                      {getCategoryIcon(index)}
                    </div>
                    <div>
                      <h2 className="text-lg text-primary font-semibold">{category.name}</h2>
                      <p className="text-muted-foreground text-xs">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="px-6 py-2">
                    <Accordion type="multiple" className="w-full">
                      {category.services?.map((service) => (
                        <AccordionItem key={service.id} value={`service-${service.id}`} className="border-b-border last:border-0">
                          <AccordionTrigger className="hover:no-underline hover:text-primary text-primary font-medium text-sm py-4">
                            <div className="flex items-center gap-2 text-left">
                              {service.name}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground pt-1 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <span className="text-sm leading-relaxed">{service.description}</span>
                            <Button size="sm" asChild className="shrink-0 font-semibold bg-secondary text-primary hover:bg-accent hover:text-white transition-colors">
                              <Link href={`/booking?service=${service.id}`}>Book</Link>
                            </Button>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                <div className="bg-primary p-8 rounded-xl text-white shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">Ready for Service?</h3>
                  <p className="text-white/80 mb-6 text-sm leading-relaxed">
                    Book your appointment online and skip the queue. We guarantee transparent pricing.
                  </p>
                  <Button size="default" className="w-full bg-white text-primary hover:bg-white/90 font-semibold shadow-sm" asChild>
                    <Link href="/booking">Book Service Now</Link>
                  </Button>
                </div>

                <div className="bg-white border border-border p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-secondary p-2 rounded-full text-accent">
                      <Shield size={16} />
                    </div>
                    <h4 className="text-base font-semibold text-primary">Certified Center</h4>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    As an authorized workshop, all our repairs strictly comply with Maruti Suzuki factory standards.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
