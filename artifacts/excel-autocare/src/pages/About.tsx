import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, Wrench, Zap, CheckCircle2, Car } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SEO } from "@/components/layout/SEO";

gsap.registerPlugin(ScrollTrigger);

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://excelautocare.in/#organization",
      "name": "Excel Auto Care",
      "url": "https://excelautocare.in/",
      "logo": "https://excelautocare.in/logo.png",
      "telephone": "+919876543210",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Wyra Road, Near bypass",
        "addressLocality": "Khammam",
        "addressRegion": "Telangana",
        "postalCode": "507001",
        "addressCountry": "IN"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://excelautocare.in/about/#breadcrumb",
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
          "name": "About Us",
          "item": "https://excelautocare.in/about"
        }
      ]
    }
  ]
};

export default function About() {
  const timelineRef = useRef(null);
  const [activeValue, setActiveValue] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-triggered car driving animation down the line
      gsap.fromTo(".timeline-car",
        { top: "0%" },
        {
          top: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-track",
            start: "top 25%",
            end: "bottom 75%",
            scrub: 1
          }
        }
      );
    }, timelineRef);
    return () => ctx.revert();
  }, []);

  const timeline = [
    {
      year: "1991",
      title: "Established in Khammam",
      desc: "The first Maruti Suzuki authorised workshop in Khammam was established at Mayuri Centre."
    },
    {
      year: "2008",
      title: "Workshop Modernisation",
      desc: "The workshop was upgraded and relocated to Raparthi Nagar, Khammam."
    },
    {
      year: "2016",
      title: "NEXA Standard Upgrade",
      desc: "The workshop was upgraded to meet NEXA standards and received official NEXA authorisation."
    },
    {
      year: "2025",
      title: "Body Shop Expansion",
      desc: "The workshop facility was expanded to twice its previous size, including a fully equipped state-of-the-art body shop facility."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[#0c2340]">
      <SEO
        title="About Us | Excel Auto Care Authorized Maruti Service"
        description="Learn more about Excel Auto Care, Khammam's first Maruti Suzuki Authorized Service Station established in 1991. Offering professional mechanics, genuine parts, and accidental bodyshop repairs."
        keywords="Maruti Suzuki mechanics, car workshop history, authorized car garage, certified auto technicians"
        canonicalUrl="https://excelautocare.in/about"
        schemaMarkup={aboutPageSchema}
      />
      {/* Page Header with Premium Diagnostic Bay Image */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <img
          src="https://i.pinimg.com/1200x/5e/91/72/5e9172640c492f0221ea1d5fdde99817.jpg"
          alt="Premium luxury vehicle workshop diagnostic bay"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0c2340]/85 z-0" />
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <span className="text-[#8ab4f8] uppercase tracking-[0.25em] text-xs font-black bg-white/5 border border-white/10 px-3.5 py-1 rounded-full inline-block mb-4">
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight uppercase leading-tight">
            Redefining Automotive Care
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mx-auto max-w-xl font-normal">
            We bring dealership-level technology to a neighborhood setting. Honest pricing, genuine parts, and absolute transparency.
          </p>
        </div>
      </section>

      {/* Company Story (Middle Repairing Car Image + Stats Card) */}
      <section className="py-24 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column: Text & Features (Grid span 7) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[#0056b3] uppercase tracking-[0.2em] text-xs font-black bg-[#f0f7ff] px-3.5 py-1 rounded-full border border-[#0056b3]/20 inline-block">
                Established in 1991
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0c2340] tracking-tight">
                Khammam's First Authorized Maruti Suzuki Station
              </h2>
              <div className="w-16 h-1 bg-[#0056b3] rounded-full"></div>

              <div className="space-y-4 text-sm md:text-base text-neutral-600 leading-relaxed font-normal">
                <p>
                  <strong>Excel Auto Care</strong> is a long-standing institution and the <strong>First Maruti Suzuki Authorized Service Station in Khammam</strong>, established in 1991. We have dedicated over three decades to providing professional vehicle maintenance and repairs using factory-trained technicians, genuine parts, and manufacturer-approved equipment.
                </p>
                <p>
                  Our commitment is to ensure your vehicle is serviced strictly according to official standards. This helps preserve your car's factory warranty, optimal performance, and safety on the road.
                </p>
                <p>
                  We offer a comprehensive range of services—from regular scheduled maintenance to complex mechanical repairs and complete accidental collision repair. Excel Auto Care stands as the most secure, reliable, and trustworthy option for car owners in Khammam.
                </p>
              </div>

              {/* Key Features Grid */}
              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-xs uppercase tracking-wider font-extrabold text-[#0c2340] mb-4">
                  Key Features & Benefits
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { title: "Skilled Technicians", desc: "Factory-trained mechanics certified by Maruti Suzuki.", icon: Wrench },
                    { title: "Genuine Parts", desc: "Strict use of 100% Maruti Genuine Parts (MGP).", icon: Shield },
                    { title: "State of the Art Equipment", desc: "Manufacturer-approved advanced diagnostic scanner.", icon: Zap },
                    { title: "Convenient Location", desc: "Centrally located on Wyra Road, Khammam.", icon: Car },
                    { title: "Cashless Claim Body Shop", desc: "Bodyshop cashless facility for all major insurance companies.", icon: CheckCircle2 }
                  ].map((feat, idx) => {
                    const Icon = feat.icon;
                    return (
                      <div key={idx} className="flex gap-3 items-start p-3 bg-[#f8fafc] border border-slate-100 rounded-xl hover:shadow-sm transition-all duration-300">
                        <div className="w-8 h-8 rounded-lg bg-[#f0f7ff] text-[#0056b3] flex items-center justify-center shrink-0">
                          <Icon size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-[#0c2340]">{feat.title}</h4>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{feat.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Image & Stats (Grid span 5) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="relative overflow-hidden rounded-2xl shadow-xl border border-slate-200/80 p-2 bg-white">
                <img
                  src="https://i.pinimg.com/1200x/0d/59/a6/0d59a6f5f12fa3f13087a749f2156a69.jpg"
                  alt="Certified technician performing OBD diagnostic test"
                  className="w-full aspect-[4/3] object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Key Stats Card */}
              <div className="bg-[#f8fafc] p-8 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-black text-[#0c2340] mb-6 uppercase tracking-wider">By The Numbers</h3>
                <div className="grid grid-cols-3 gap-4 text-center md:text-left">
                  <div>
                    <div className="text-3xl font-black text-[#0056b3]">35+</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-1">Years Exp</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-[#0056b3]">100K+</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-1">Cars Serviced</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-[#0056b3]">45+</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-1">Techs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="py-24 bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-muted-foreground uppercase tracking-widest text-xs font-bold mb-3 block">Principles</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0c2340] tracking-tight">Our Core Values</h2>
            <div className="w-12 h-1 bg-[#0056b3] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Value 1 */}
            <div
              onClick={() => setActiveValue(activeValue === 0 ? null : 0)}
              onMouseEnter={() => setActiveValue(0)}
              onMouseLeave={() => setActiveValue(null)}
              className={`relative overflow-hidden border p-8 rounded-2xl service-card-lift group cursor-pointer transition-all duration-300 ${activeValue === 0
                ? "bg-[#0c2340] border-[#0c2340] translate-y-[-6px] shadow-xl"
                : "bg-[#f8fafc] border-slate-100"
                }`}
            >
              <div className={`absolute inset-0 bg-[#0c2340] transition-transform duration-500 ease-out z-0 ${activeValue === 0 ? "translate-y-0" : "translate-y-full"
                }`} />

              <div className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm mb-6 transition-all duration-300 ${activeValue === 0
                ? "bg-white/10 text-[#8ab4f8]"
                : "bg-white text-[#0056b3]"
                }`}>
                <Shield size={18} />
              </div>
              <h3 className={`relative z-10 text-lg font-black uppercase tracking-wide mb-3 transition-colors duration-300 ${activeValue === 0 ? "text-white" : "text-[#0c2340]"
                }`}>
                Absolute Transparency
              </h3>
              <p className={`relative z-10 text-sm leading-relaxed font-normal transition-colors duration-300 ${activeValue === 0 ? "text-slate-200" : "text-neutral-600"
                }`}>
                We show you the replaced parts. We explain the bill line by line. No hidden charges, no unnecessary upselling. You approve every repair before we begin.
              </p>
            </div>

            {/* Value 2 */}
            <div
              onClick={() => setActiveValue(activeValue === 1 ? null : 1)}
              onMouseEnter={() => setActiveValue(1)}
              onMouseLeave={() => setActiveValue(null)}
              className={`relative overflow-hidden border p-8 rounded-2xl service-card-lift group cursor-pointer transition-all duration-300 ${activeValue === 1
                ? "bg-[#0c2340] border-[#0c2340] translate-y-[-6px] shadow-xl"
                : "bg-[#f8fafc] border-slate-100"
                }`}
            >
              <div className={`absolute inset-0 bg-[#0c2340] transition-transform duration-500 ease-out z-0 ${activeValue === 1 ? "translate-y-0" : "translate-y-full"
                }`} />

              <div className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm mb-6 transition-all duration-300 ${activeValue === 1
                ? "bg-white/10 text-[#8ab4f8]"
                : "bg-white text-[#0056b3]"
                }`}>
                <Wrench size={18} />
              </div>
              <h3 className={`relative z-10 text-lg font-black uppercase tracking-wide mb-3 transition-colors duration-300 ${activeValue === 1 ? "text-white" : "text-[#0c2340]"
                }`}>
                Genuine Parts Only
              </h3>
              <p className={`relative z-10 text-sm leading-relaxed font-normal transition-colors duration-300 ${activeValue === 1 ? "text-slate-200" : "text-neutral-600"
                }`}>
                We strictly use 100% Maruti Suzuki Genuine Parts (MGP). This ensures your factory warranty remains completely intact and your car performs optimally.
              </p>
            </div>

            {/* Value 3 */}
            <div
              onClick={() => setActiveValue(activeValue === 2 ? null : 2)}
              onMouseEnter={() => setActiveValue(2)}
              onMouseLeave={() => setActiveValue(null)}
              className={`relative overflow-hidden border p-8 rounded-2xl service-card-lift group cursor-pointer transition-all duration-300 ${activeValue === 2
                ? "bg-[#0c2340] border-[#0c2340] translate-y-[-6px] shadow-xl"
                : "bg-[#f8fafc] border-slate-100"
                }`}
            >
              <div className={`absolute inset-0 bg-[#0c2340] transition-transform duration-500 ease-out z-0 ${activeValue === 2 ? "translate-y-0" : "translate-y-full"
                }`} />

              <div className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm mb-6 transition-all duration-300 ${activeValue === 2
                ? "bg-white/10 text-[#8ab4f8]"
                : "bg-white text-[#0056b3]"
                }`}>
                <Zap size={18} />
              </div>
              <h3 className={`relative z-10 text-lg font-black uppercase tracking-wide mb-3 transition-colors duration-300 ${activeValue === 2 ? "text-white" : "text-[#0c2340]"
                }`}>
                Technical Mastery
              </h3>
              <p className={`relative z-10 text-sm leading-relaxed font-normal transition-colors duration-300 ${activeValue === 2 ? "text-slate-200" : "text-neutral-600"
                }`}>
                Our mechanics undergo continuous training on the latest Maruti Suzuki diagnostic protocols. We invest heavily in state-of-the-art tools and technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Zig-Zag Scroll-Driven Car Timeline */}
      <section className="relative py-24 overflow-hidden border-b border-border" ref={timelineRef}>
        {/* Fixed Background Image */}
        <div
          className="absolute inset-0 z-0 bg-fixed bg-cover bg-center"
          style={{ backgroundImage: 'url("https://i.pinimg.com/1200x/cf/3c/fd/cf3cfd962152ddd08d349d9f7c36069e.jpg")' }}
        />
        {/* Black Overlay Shade */}
        <div className="absolute inset-0 bg-black/85 z-0" />

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="text-center mb-20">
            <span className="text-white/70 uppercase tracking-widest text-xs font-bold mb-3 block">History</span>
            <h2 className="text-4xl font-extrabold text-white tracking-tight">Our Journey</h2>
            <div className="w-12 h-1 bg-[#8ab4f8] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="relative timeline-track space-y-16">
            {/* The vertical track line (centered on desktop, left-aligned on mobile) */}
            <div className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 top-2 bottom-2 w-[2px] bg-white/20" />

            {/* The driving car marker */}
            <div className="timeline-car absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-[#8ab4f8] border-2 border-white shadow-xl flex items-center justify-center z-20 text-[#0c2340]">
              <Car size={14} className="rotate-90" />
            </div>

            {timeline.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={item.year} className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start timeline-item group">
                  {/* Alternating Center Dot Indicator */}
                  <div className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 w-6 h-6 rounded-full border-2 border-[#8ab4f8] bg-black/50 z-10 flex items-center justify-center transition-all duration-300 group-hover:bg-[#8ab4f8] group-hover:border-white mt-1">
                    <div className="w-2 h-2 rounded-full bg-[#8ab4f8] group-hover:bg-[#0c2340]" />
                  </div>

                  {/* Left Column content: rendered on Even indices on desktop */}
                  <div className="hidden md:flex flex-col items-end text-right">
                    {isEven && (
                      <div className="w-full max-w-md space-y-2 group-hover:translate-x-[-8px] transition-transform duration-300 pr-4">
                        <div className="text-3xl font-black text-[#8ab4f8] tracking-wider drop-shadow-md">
                          {item.year}
                        </div>
                        <h4 className="text-lg text-white font-black uppercase tracking-wide">{item.title}</h4>
                        <p className="text-sm text-white/80 leading-relaxed font-normal">{item.desc}</p>
                      </div>
                    )}
                  </div>

                  {/* Right Column content: rendered on Odd indices on desktop, and all items on mobile */}
                  <div className="pl-10 md:pl-12 flex flex-col items-start text-left">
                    <div className={`w-full max-w-md space-y-2 group-hover:translate-x-[8px] transition-transform duration-300 ${isEven ? "block md:hidden" : "block"}`}>
                      <div className="text-3xl font-black text-[#8ab4f8] tracking-wider drop-shadow-md">
                        {item.year}
                      </div>
                      <h4 className="text-lg text-white font-black uppercase tracking-wide">{item.title}</h4>
                      <p className="text-sm text-white/80 leading-relaxed font-normal">{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0c2340] tracking-tight mb-6 uppercase">
            Ready to Experience the Difference?
          </h2>
          <Button size="lg" asChild className="hover-beam bg-[#0c2340] text-white hover:bg-[#0c2340]/90 font-bold shadow-lg rounded-xl px-8 py-6 h-auto text-base border-0 cursor-pointer">
            <Link href="/booking">Book Your Next Service</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
