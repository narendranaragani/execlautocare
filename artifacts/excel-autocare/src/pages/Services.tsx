import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useListServices, getListServicesQueryKey } from "@workspace/api-client-react";
import { Wrench, Shield, Droplet, Settings, Calendar, CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SEO } from "@/components/layout/SEO";

const servicesPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://excelautocare.in/services/#breadcrumb",
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
          "name": "Services",
          "item": "https://excelautocare.in/services"
        }
      ]
    },
    {
      "@type": "Service",
      "name": "Periodic Car Maintenance",
      "provider": {
        "@type": "AutoRepair",
        "name": "Excel Autocare"
      },
      "description": "Authorized Maruti Suzuki periodic maintenance checks including oil change, filter changes, electrical assessment, and tyre care."
    },
    {
      "@type": "Service",
      "name": "Body Repair & Denting Painting",
      "provider": {
        "@type": "AutoRepair",
        "name": "Excel Autocare"
      },
      "description": "Laser-guided chassis realignment, paintless dent removal (PDR), thermal paint baking booth services."
    },
    {
      "@type": "FAQPage",
      "@id": "https://excelautocare.in/services/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Does servicing at Excel Autocare void my Maruti Suzuki warranty?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Excel Autocare is an Authorized Maruti Suzuki Service Station. We use 100% Maruti Suzuki Genuine Parts (MGP) and strictly follow the factory diagnostic and repair protocols, meaning your warranty remains fully intact."
          }
        },
        {
          "@type": "Question",
          "name": "What parts are used for replacements?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We use 100% Maruti Genuine Parts (MGP) sourced directly from Maruti Suzuki's authorized channels. We refuse to use cheap duplicates or uncertified aftermarket components."
          }
        }
      ]
    }
  ]
};


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

const getCategoryImageUrl = (categoryName: string) => {
  const name = categoryName.toLowerCase();
  if (name.includes("body") || name.includes("accident")) {
    return "https://i.pinimg.com/736x/b1/de/a6/b1dea6d5e92b6b1c31994742336e8b40.jpg";
  }
  if (name.includes("paint")) {
    return "https://i.pinimg.com/1200x/9b/fb/9a/9bfb9a9d3ce1857c25134a459f36daee.jpg";
  }
  if (name.includes("mechanical") || name.includes("diagnostics") || name.includes("workshop")) {
    return "https://i.pinimg.com/1200x/9f/b3/72/9fb372f9c4d180cb74325e081f306bd8.jpg";
  }
  if (name.includes("maintenance") || name.includes("periodic")) {
    return "https://i.pinimg.com/1200x/99/0a/56/990a5677dbb220d09da472b2b01d74d6.jpg";
  }
  return "https://i.pinimg.com/1200x/04/e5/10/04e5103abfbf7b25b3904fe6a36082ec.jpg";
};

export default function Services() {
  const containerRef = useRef(null);
  const { data: categoriesData } = useListServices({ query: { queryKey: getListServicesQueryKey() } });

  const categories = categoriesData && categoriesData.length > 0 ? categoriesData : FALLBACK_CATEGORIES;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards as they scroll into view
      gsap.utils.toArray('.gsap-service-card').forEach((card: any) => {
        gsap.fromTo(card,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=50",
              toggleActions: "play none none none"
            }
          }
        );
      });
      
      // Animate category headers
      gsap.utils.toArray('.gsap-category-header').forEach((header: any) => {
        gsap.fromTo(header,
          { opacity: 0, scale: 0.98 },
          { 
            opacity: 1, 
            scale: 1,
            duration: 0.8, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: header,
              start: "top bottom-=100",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, [categories]);

  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0: return <Wrench size={16} />;
      case 1: return <Droplet size={16} />;
      case 2: return <Settings size={16} />;
      case 3: return <Calendar size={16} />;
      default: return <Shield size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-24 text-[#0c2340]">
      <SEO
        title="Services | Excel Autocare Authorized Maruti Service"
        description="Explore our specialized Maruti Suzuki services. From denting and painting in thermal baking booths to engine diagnostics, periodic maintenance, and wheel alignment."
        keywords="Maruti Suzuki denting painting, car bumper replacement, OBD engine scanning, periodic car maintenance service"
        canonicalUrl="https://excelautocare.in/services"
        schemaMarkup={servicesPageSchema}
      />
      {/* Header */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <img src="https://i.pinimg.com/736x/85/27/34/852734884cae8a18ab0de459c46c3b3f.jpg" alt="services bg" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 img-overlay-dark" />
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <span className="text-white/60 uppercase tracking-widest text-xs font-medium mb-3 block">Expertise</span>
          <h1 className="text-3xl md:text-4xl text-white mb-4 uppercase font-extrabold tracking-tight">Our Services</h1>
          <p className="text-sm text-white/80 leading-relaxed max-w-xl mx-auto font-normal">
            From routine maintenance to complex structural repairs, our authorized facility is equipped for every requirement.
          </p>
        </div>
      </section>

      {/* Genuine vs Duplicate Parts */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-[#0056b3] uppercase tracking-[0.2em] text-xs font-black bg-[#f0f7ff] px-3.5 py-1 rounded-none border border-[#0056b3]/20 inline-block mb-3">
              Standard Assurance
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0c2340] tracking-tight">Why Genuine Parts Matter</h2>
            <div className="w-12 h-0.5 bg-[#0056b3] mx-auto mt-4"></div>
            <p className="text-neutral-600 text-sm mt-4">We refuse to compromise on your safety. Here's why we strictly use MGP.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#f8fafc] border border-slate-200 border-l-4 border-l-green-600 rounded-none p-8 shadow-sm">
              <h3 className="text-base font-bold text-[#0c2340] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Shield className="text-green-600" size={18} /> Genuine Parts
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
                    <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" />
                    <span className="text-neutral-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#f8fafc] border border-slate-200 border-l-4 border-l-red-600 rounded-none p-8 shadow-sm">
              <h3 className="text-base font-bold text-[#0c2340] uppercase tracking-wider mb-4 flex items-center gap-2">
                <XCircle className="text-red-600" size={18} /> Duplicate Parts
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
                    <XCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
                    <span className="text-neutral-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stacked Services Layout */}
      <section className="py-24 bg-[#f8fafc] border-b border-slate-200" ref={containerRef}>
        <div className="container mx-auto px-4 max-w-5xl space-y-24">
          
          {categories.map((category: any, index: number) => {
            const imageUrl = getCategoryImageUrl(category.name);
            return (
              <div key={category.id} className="space-y-8">
                {/* Category Header Card */}
                <div className="gsap-category-header relative min-h-[260px] flex flex-col justify-end p-8 md:p-12 text-white border border-slate-200/10 rounded-none shadow-md overflow-hidden group">
                  <img src={imageUrl} alt={category.name} className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-slate-950/75 z-0 transition-opacity duration-500 group-hover:bg-slate-950/80" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-white/10 flex items-center justify-center text-[#8ab4f8] shadow-inner rounded-none backdrop-blur-sm">
                        {getCategoryIcon(index)}
                      </div>
                      <span className="text-[#8ab4f8] uppercase tracking-[0.2em] text-xs font-black">
                        Category 0{index + 1}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase leading-snug">
                      {category.name}
                    </h2>
                    <p className="text-sm text-slate-300 mt-3 max-w-2xl font-normal leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Services Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services?.map((service: any) => (
                    <Link
                      key={service.id}
                      href={`/booking?service=${service.id}`}
                      className="block gsap-service-card select-none group h-full"
                    >
                      <div className="bg-white border border-slate-200 border-t-4 border-t-transparent group-hover:border-t-[#0056b3] p-6 shadow-sm group-hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full rounded-none cursor-pointer">
                        <div>
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <h3 className="text-sm font-bold text-[#0c2340] group-hover:text-[#0056b3] uppercase tracking-wide leading-snug transition-colors">
                              {service.name}
                            </h3>
                            <ChevronRight size={16} className="text-slate-400 group-hover:text-[#0056b3] group-hover:translate-x-1 transition-all shrink-0" />
                          </div>
                          
                          <span className="inline-block bg-[#f0f7ff] border border-[#0056b3]/15 text-[#0056b3] text-[9px] font-bold uppercase px-2 py-0.5 rounded-none mb-3">
                            MGP SPARES
                          </span>
                          
                          <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                            {service.description}
                          </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] text-muted-foreground font-semibold">
                            Est: 2-4 Hours
                          </span>
                          <span className="text-[10px] text-[#0056b3] font-bold uppercase tracking-wider flex items-center gap-1 group-hover:underline">
                            Book Now
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Ready for Service CTA */}
          <div className="relative overflow-hidden bg-[#0c2340] p-10 md:p-16 text-white shadow-xl mt-12 border border-slate-200/15 rounded-none text-center">
            <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: "radial-gradient(circle at center, #ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <span className="inline-flex items-center bg-white/10 px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase text-white/90 border border-white/10 rounded-none mb-6">
                Premium Support
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase">
                Ready for Service?
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                Schedule your vehicle service online to avoid waiting. Enjoy transparent pricing and OEM-standard diagnostics from certified Maruti technicians.
              </p>
              <Button
                size="lg"
                className="mt-8 w-full sm:w-auto px-12 hover-beam bg-[#0056b3] hover:bg-[#0056b3]/90 text-white font-bold shadow-md cursor-pointer border-0 rounded-none uppercase tracking-widest"
                asChild
              >
                <Link href="/booking">
                  Book Service Now
                </Link>
              </Button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
