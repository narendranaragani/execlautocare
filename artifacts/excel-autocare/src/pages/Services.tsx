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
      case 0: return <Wrench className="w-6 h-6" />;
      case 1: return <Droplet className="w-6 h-6" />;
      case 2: return <Settings className="w-6 h-6" />;
      case 3: return <Calendar className="w-6 h-6" />;
      default: return <Shield className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07111f] font-sans pb-32">
      {/* Header */}
      <section className="pt-36 pb-24 text-white relative border-b border-white/5 bg-[#07111f]">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "60px 60px" }}></div>
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <span className="text-accent font-bold tracking-widest uppercase text-xs mb-4 block">Expertise</span>
          <h1 className="text-5xl md:text-6xl font-heading font-black mb-6 uppercase tracking-tight">Our Services</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From routine maintenance to complex structural repairs, our authorized facility is equipped for every requirement.
          </p>
        </div>
      </section>

      {/* Genuine vs Duplicate Parts */}
      <section className="py-24 bg-[#0d1b2a] border-b border-white/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Why Genuine Parts Matter</h2>
            <p className="text-muted-foreground text-lg">We refuse to compromise on your safety. Here's why we strictly use MGP.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-green-500/50 rounded-3xl p-10 bg-green-500/5 relative overflow-hidden shadow-[0_0_30px_rgba(34,197,94,0.1)]">
              <div className="absolute top-0 right-0 bg-green-500/20 border-b border-l border-green-500/30 text-green-400 px-4 py-1.5 rounded-bl-xl font-bold text-xs uppercase tracking-wider">WE USE THIS</div>
              <h3 className="text-2xl font-heading font-bold text-white mb-8 flex items-center gap-3">
                <Shield className="text-green-400 w-6 h-6" /> Genuine Parts (MGP)
              </h3>
              <ul className="space-y-5">
                {[
                  "Factory warranty remains 100% intact",
                  "OEM-grade quality and manufacturing",
                  "Precise fit engineered for your specific model",
                  "Long lifespan and reliability guaranteed",
                  "Rigorous safety testing approved"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-red-500/30 rounded-3xl p-10 bg-red-500/5 relative">
              <h3 className="text-2xl font-heading font-bold text-white mb-8 flex items-center gap-3">
                <XCircle className="text-red-400 w-6 h-6" /> Duplicate Parts
              </h3>
              <ul className="space-y-5">
                {[
                  "Immediately voids your manufacturer warranty",
                  "Lower quality materials and weak construction",
                  "Improper fit leading to rattles and wear",
                  "Shorter lifespan requiring frequent replacement",
                  "Not certified for high-speed safety"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-slate-400 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <div className="container mx-auto px-4 mt-24" ref={containerRef}>
        <div className="grid lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8 space-y-8">
            {categories.map((category, index) => (
              <div 
                key={category.id} 
                className="gsap-service-card glass-card neon-border rounded-3xl overflow-hidden"
              >
                <div className="p-8 border-b border-white/10 bg-white/5 flex items-center gap-6">
                  <div className="bg-accent/10 border border-accent/20 text-accent p-4 rounded-2xl headlight-glow-sm">
                    {getCategoryIcon(index)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-white mb-2">{category.name}</h2>
                    <p className="text-muted-foreground text-sm">{category.description}</p>
                  </div>
                </div>
                
                <div className="p-4 sm:p-8">
                  <Accordion type="multiple" className="w-full">
                    {category.services?.map((service) => (
                      <AccordionItem key={service.id} value={`service-${service.id}`} className="border-b-white/5">
                        <AccordionTrigger className="hover:no-underline hover:text-accent font-heading font-bold text-white text-lg py-4">
                          <div className="flex items-center gap-3 text-left">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                            {service.name}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pt-2 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pl-4">
                          <span className="text-sm leading-relaxed max-w-xl">{service.description}</span>
                          <Button asChild className="shrink-0 hover-beam bg-white/10 hover:bg-accent text-white rounded-full px-6 border border-white/10 text-xs font-bold uppercase tracking-wider transition-colors">
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
              <div className="glass-card-blue neon-border p-10 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-bl-full blur-xl"></div>
                <h3 className="text-2xl font-heading font-bold text-white mb-4 relative z-10">Ready for Service?</h3>
                <p className="text-muted-foreground mb-8 text-sm relative z-10 leading-relaxed">
                  Book your appointment online and skip the queue. We guarantee transparent pricing.
                </p>
                <Button size="lg" className="w-full bg-accent hover:bg-accent/90 hover-beam text-sm font-bold uppercase tracking-wide h-14 relative z-10 pulse-glow" asChild>
                  <Link href="/booking">Book Service Now</Link>
                </Button>
              </div>

              <div className="glass-card border border-white/10 p-8 rounded-3xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-accent/10 border border-accent/20 p-3 rounded-2xl headlight-glow-sm">
                    <Shield className="text-accent w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-heading font-bold text-white">Certified Center</h4>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
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
