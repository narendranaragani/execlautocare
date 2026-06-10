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
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%", once: true }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [categories]);

  const getCategoryIcon = (index: number) => {
    switch(index) {
      case 0: return <Wrench className="w-8 h-8" />;
      case 1: return <Droplet className="w-8 h-8" />;
      case 2: return <Settings className="w-8 h-8" />;
      case 3: return <Calendar className="w-8 h-8" />;
      default: return <Shield className="w-8 h-8" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <section className="bg-primary pt-36 pb-24 text-white relative">
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-primary-foreground/80 leading-relaxed">
            From routine maintenance to complex structural repairs, our authorized facility is equipped for every requirement.
          </p>
        </div>
      </section>

      {/* Genuine vs Duplicate Parts */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Why Genuine Parts Matter</h2>
            <p className="text-muted-foreground text-lg">We refuse to compromise on your safety. Here's why we strictly use MGP.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-2 border-green-500 rounded-3xl p-8 bg-green-50/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 rounded-bl-xl font-bold text-sm">WE USE THIS</div>
              <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                <Shield className="text-green-500" /> Genuine Parts (MGP)
              </h3>
              <ul className="space-y-4">
                {[
                  "Factory warranty remains 100% intact",
                  "OEM-grade quality and manufacturing",
                  "Precise fit engineered for your specific model",
                  "Long lifespan and reliability guaranteed",
                  "Rigorous safety testing approved"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-2 border-slate-200 rounded-3xl p-8 bg-slate-50 relative">
              <h3 className="text-2xl font-bold text-slate-600 mb-6 flex items-center gap-3">
                <XCircle className="text-red-500" /> Duplicate Parts
              </h3>
              <ul className="space-y-4">
                {[
                  "Immediately voids your manufacturer warranty",
                  "Lower quality materials and weak construction",
                  "Improper fit leading to rattles and wear",
                  "Shorter lifespan requiring frequent replacement",
                  "Not certified for high-speed safety"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-6 h-6 text-red-400 shrink-0" />
                    <span className="text-slate-500">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <div className="container mx-auto px-4 mt-16" ref={containerRef}>
        <div className="grid lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8 space-y-8">
            {categories.map((category, index) => (
              <div 
                key={category.id} 
                className="gsap-service-card bg-white rounded-3xl shadow-sm border border-border overflow-hidden"
              >
                <div className="p-8 border-b border-border bg-gradient-to-r from-slate-50 to-white flex items-center gap-6">
                  <div className="bg-primary text-white p-4 rounded-2xl shadow-md">
                    {getCategoryIcon(index)}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-primary mb-2">{category.name}</h2>
                    <p className="text-muted-foreground text-lg">{category.description}</p>
                  </div>
                </div>
                
                <div className="p-8">
                  <Accordion type="multiple" className="w-full">
                    {category.services?.map((service) => (
                      <AccordionItem key={service.id} value={`service-${service.id}`} className="border-b-slate-100">
                        <AccordionTrigger className="hover:no-underline hover:text-accent font-bold text-primary text-lg py-4">
                          <div className="flex items-center gap-3 text-left">
                            <div className="w-2 h-2 rounded-full bg-accent/60"></div>
                            {service.name}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pt-2 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                          <span className="text-base leading-relaxed max-w-xl">{service.description}</span>
                          <Button asChild className="shrink-0 hover-beam bg-accent text-white rounded-full px-6">
                            <Link href={`/booking?service=${service.id}`}>Book This</Link>
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
            <div className="sticky top-32 space-y-6">
              <div className="bg-primary text-white p-10 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-bl-full"></div>
                <h3 className="text-3xl font-bold mb-4 relative z-10">Ready for Service?</h3>
                <p className="text-primary-foreground/80 mb-8 text-lg relative z-10">
                  Book your appointment online and skip the queue. We guarantee transparent pricing.
                </p>
                <Button size="lg" className="w-full bg-accent hover:bg-accent/90 hover-beam text-lg h-14 relative z-10 shadow-[0_0_20px_rgba(0,86,179,0.3)]" asChild>
                  <Link href="/booking">Book Service Now</Link>
                </Button>
              </div>

              <div className="bg-white border border-border p-8 rounded-3xl shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-accent/10 p-3 rounded-full">
                    <Shield className="text-accent w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-primary">Certified Center</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  As an authorized workshop, all our repairs strictly comply with Maruti Suzuki factory standards.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}