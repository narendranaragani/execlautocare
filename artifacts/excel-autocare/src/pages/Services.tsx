import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useListServices, getListServicesQueryKey } from "@workspace/api-client-react";
import { Wrench, Shield, Droplet, Settings, Calendar, CheckCircle2, XCircle, ChevronRight } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState(0);
  const { data: categoriesData } = useListServices({ query: { queryKey: getListServicesQueryKey() } });

  const categories = categoriesData && categoriesData.length > 0 ? categoriesData : FALLBACK_CATEGORIES;
  const activeCategory = categories[activeTab] || categories[0] || FALLBACK_CATEGORIES[0];
  const activeImageUrl = getCategoryImageUrl(activeCategory.name);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".gsap-service-card",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [activeTab, categories]);

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
      {/* Header */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <img src="https://i.pinimg.com/736x/85/27/34/852734884cae8a18ab0de459c46c3b3f.jpg" alt="services bg" className="absolute inset-0 w-full h-full object-cover" />
        <img src="" alt="services bg" className="absolute inset-0 w-full h-full object-cover" />
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

      {/* Services List Layout */}
      <section className="py-24 bg-[#f8fafc] border-b border-slate-200" ref={containerRef}>
        <div className="container mx-auto px-4 max-w-7xl">

          {/* Mobile Tabs (Grid of buttons instead of horizontal scroll) */}
          <div className="lg:hidden grid grid-cols-2 gap-3 mb-8">
            {categories.map((category, index) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(index)}
                  className={`p-4 border font-bold text-[10px] uppercase tracking-wider transition-all flex flex-col items-center justify-center text-center gap-2 cursor-pointer rounded-none ${isActive
                    ? "bg-[#0c2340] border-[#0c2340] text-white shadow-sm"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    } ${index === categories.length - 1 ? "col-span-2" : ""}`}
                >
                  <span className={isActive ? "text-[#8ab4f8]" : "text-[#0056b3]"}>
                    {getCategoryIcon(index)}
                  </span>
                  <span className="truncate w-full">{category.name}</span>
                </button>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">

            {/* Desktop Left Sidebar Tabs (Hidden on mobile) */}
            <div className="hidden lg:block lg:col-span-4 space-y-6 sticky top-28">
              <div className="space-y-3">
                <span className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold block mb-4 px-2">
                  Service Categories
                </span>
                {categories.map((category, index) => {
                  const isActive = activeTab === index;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveTab(index)}
                      className={`w-full text-left p-5 border transition-all duration-300 flex items-center gap-4 cursor-pointer rounded-none ${isActive
                        ? "bg-[#0c2340] border-[#0c2340] text-white shadow-md translate-x-1"
                        : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700 hover:border-slate-300"
                        }`}
                    >
                      <div className={`w-10 h-10 flex items-center justify-center shrink-0 transition-colors rounded-none ${isActive ? "bg-white/10 text-[#8ab4f8]" : "bg-[#f8fafc] text-[#0056b3]"
                        }`}>
                        {getCategoryIcon(index)}
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-xs font-bold uppercase tracking-wide leading-normal ${isActive ? "text-white" : "text-[#0c2340]"}`}>
                          {category.name}
                        </h3>
                        <p className={`text-[10px] mt-1 line-clamp-1 ${isActive ? "text-slate-300" : "text-muted-foreground"}`}>
                          {category.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Ready for Service? CTA Card */}
              <div className="relative overflow-hidden bg-[#0c2340] p-8 text-white shadow-md border border-slate-200/15 rounded-none">
                <div className="relative z-10">
                  <span className="inline-flex items-center bg-white/10 px-3 py-1 text-[10px] font-semibold text-white/90 border border-white/10 rounded-none">
                    Premium Support
                  </span>
                  <h3 className="mt-4 text-xl font-bold tracking-tight uppercase">
                    Ready for Service?
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-slate-300">
                    Schedule your vehicle service online to avoid waiting. Enjoy transparent pricing and OEM-standard diagnostics.
                  </p>
                  <Button
                    size="lg"
                    className="mt-6 w-full hover-beam bg-[#0056b3] hover:bg-[#0056b3]/90 text-white font-bold shadow-md cursor-pointer border-0 rounded-none"
                    asChild
                  >
                    <Link href="/booking">
                      Book Service Now
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Content Area (Selected Category & Grid of Service Cards) */}
            <div className="lg:col-span-8 space-y-6">

              {/* Active Category Header Card with Dynamic Category Image */}
              <div className="relative min-h-[220px] flex flex-col justify-end p-8 text-white border border-slate-200/10 rounded-none shadow-md overflow-hidden">
                <img src={activeImageUrl} alt={activeCategory.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-slate-950/75 z-0" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 bg-white/10 flex items-center justify-center text-[#8ab4f8] shadow-inner rounded-none">
                      {getCategoryIcon(activeTab)}
                    </div>
                    <span className="text-[#8ab4f8] uppercase tracking-widest text-[10px] font-black">
                      Selected Category
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase leading-snug">
                    {activeCategory.name}
                  </h2>
                  <p className="text-xs md:text-sm text-slate-300 mt-2 max-w-xl font-normal leading-relaxed">
                    {activeCategory.description}
                  </p>
                </div>
              </div>

              {/* Services Grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                {activeCategory.services?.map((service) => (
                  <Link
                    key={service.id}
                    href={`/booking?service=${service.id}`}
                    className="block gsap-service-card select-none group"
                  >
                    <div className="bg-white border border-slate-200 border-l-4 border-l-transparent group-hover:border-l-[#0056b3] p-6 shadow-sm group-hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full rounded-none cursor-pointer">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-sm font-bold text-[#0c2340] group-hover:text-[#0056b3] uppercase tracking-wide leading-snug transition-colors">
                            {service.name}
                          </h3>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="bg-[#f0f7ff] border border-[#0056b3]/15 text-[#0056b3] text-[9px] font-bold uppercase px-2 py-0.5 rounded-none">
                              MGP SPARES
                            </span>
                            <ChevronRight size={14} className="text-slate-400 group-hover:text-[#0056b3] group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                        <p className="text-xs text-neutral-600 mt-3 leading-relaxed font-normal">
                          {service.description}
                        </p>

                        {/* Feature Checklist */}
                        <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                          <li className="flex items-center gap-2 text-[11px] text-neutral-600 font-medium">
                            <CheckCircle2 size={13} className="text-green-600 shrink-0" />
                            <span>Maruti Authorized Standard</span>
                          </li>
                          <li className="flex items-center gap-2 text-[11px] text-neutral-600 font-medium">
                            <CheckCircle2 size={13} className="text-green-600 shrink-0" />
                            <span>Certified Mechanics Only</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground font-semibold">
                          Est: 2-4 Hours
                        </span>
                        <span className="text-[10px] text-[#0056b3] font-bold uppercase tracking-wider group-hover:underline flex items-center gap-0.5">
                          Book Now
                          <ChevronRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Ready for Service? CTA Card for Mobile View (Hidden on desktop) */}
              <div className="lg:hidden relative overflow-hidden bg-[#0c2340] p-8 text-white shadow-md mt-8 border border-slate-200/15 rounded-none">
                <div className="relative z-10">
                  <span className="inline-flex items-center bg-white/10 px-3 py-1 text-[10px] font-semibold text-white/90 border border-white/10 rounded-none">
                    Premium Support
                  </span>
                  <h3 className="mt-4 text-xl font-bold tracking-tight uppercase">
                    Ready for Service?
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-slate-300">
                    Schedule your vehicle service online to avoid waiting. Enjoy transparent pricing and OEM-standard diagnostics.
                  </p>
                  <Button
                    size="lg"
                    className="mt-6 w-full hover-beam bg-[#0056b3] hover:bg-[#0056b3]/90 text-white font-bold shadow-md cursor-pointer border-0 rounded-none"
                    asChild
                  >
                    <Link href="/booking">
                      Book Service Now
                    </Link>
                  </Button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
