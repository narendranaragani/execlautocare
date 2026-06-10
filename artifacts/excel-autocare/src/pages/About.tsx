import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, Wrench, Zap, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".timeline-item");
      items.forEach((item: any) => {
        gsap.fromTo(item,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              once: true
            }
          }
        );
      });
    }, timelineRef);
    return () => ctx.revert();
  }, []);

  const timeline = [
    { year: "2012", title: "Foundation", desc: "Started as a small 2-bay workshop with a commitment to honest pricing." },
    { year: "2015", title: "Maruti Authorization", desc: "Became an official Maruti Suzuki Authorized Service Station." },
    { year: "2018", title: "Expansion", desc: "Upgraded to a 10-bay facility with state-of-the-art diagnostic equipment." },
    { year: "2021", title: "OBD Diagnostic Suite", desc: "Integrated dealer-grade computerized scanning and diagnostics." },
    { year: "2023", title: "Premium Paint Booth", desc: "Added thermal baking booths for showroom-quality paint restoration." }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="bg-primary pt-36 pb-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <span className="text-accent font-semibold tracking-widest uppercase text-sm mb-4 block">About Excel Autocare</span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Redefining Automotive Care</h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            We bring dealership-level technology to a neighborhood setting. Honest pricing, genuine parts, and absolute transparency.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <div className="bg-primary text-white p-12 rounded-3xl shadow-2xl relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-20 rounded-bl-full"></div>
                <h3 className="text-4xl font-bold mb-8">By The Numbers</h3>
                <div className="space-y-8">
                  <div>
                    <div className="text-5xl font-bold text-accent mb-2">12+</div>
                    <div className="text-slate-300 font-medium">Years of Excellence</div>
                  </div>
                  <div className="h-px w-full bg-white/10"></div>
                  <div>
                    <div className="text-5xl font-bold text-accent mb-2">15k+</div>
                    <div className="text-slate-300 font-medium">Cars Serviced</div>
                  </div>
                  <div className="h-px w-full bg-white/10"></div>
                  <div>
                    <div className="text-5xl font-bold text-accent mb-2">45</div>
                    <div className="text-slate-300 font-medium">Certified Technicians</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-4xl font-bold text-primary">Our Mission & Vision</h2>
              <div className="w-20 h-1 bg-accent rounded-full"></div>
              <p className="text-lg text-muted-foreground leading-relaxed pt-4">
                Excel Autocare was founded on a very simple premise: getting your vehicle serviced should not be stressful, confusing, or unnecessarily expensive. For over a decade, we have been bridging the gap between the high technical standards of an official dealership and the personal touch of a local mechanic.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                As an Authorized Maruti Suzuki Service Center, we hold ourselves to rigorous factory standards. Every bolt tightened, every drop of oil poured, and every diagnostic scan run is performed exactly as the manufacturer intended. We don't guess; we know.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Our Core Values</h2>
            <p className="text-muted-foreground text-lg">The principles that guide every repair and every customer interaction.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-border service-card-lift">
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-8">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Absolute Transparency</h3>
              <p className="text-muted-foreground leading-relaxed">We show you the replaced parts. We explain the bill line by line. No hidden charges, no unnecessary upselling. You approve every repair before we begin.</p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-border service-card-lift">
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-8">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Genuine Parts Only</h3>
              <p className="text-muted-foreground leading-relaxed">We strictly use 100% Maruti Suzuki Genuine Parts (MGP). This ensures your factory warranty remains completely intact and your car performs optimally.</p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-border service-card-lift">
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-8">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Technical Mastery</h3>
              <p className="text-muted-foreground leading-relaxed">Our mechanics undergo continuous training on the latest Maruti Suzuki diagnostic protocols. We invest heavily in state-of-the-art tools and technology.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Animated Timeline */}
      <section className="py-32 bg-white overflow-hidden" ref={timelineRef}>
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl font-bold text-primary text-center mb-24">Our Journey</h2>
          
          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-accent/20 transform md:-translate-x-1/2"></div>
            
            <div className="space-y-16 md:space-y-24">
              {timeline.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div key={item.year} className="timeline-item relative flex flex-col md:flex-row items-center justify-between w-full">
                    
                    {/* Center Dot */}
                    <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-accent ring-4 ring-white ring-offset-0 transform -translate-x-1/2 z-10 mt-6 md:mt-0 shadow-md"></div>
                    
                    {/* Content Left */}
                    <div className={`w-full md:w-[45%] pl-14 md:pl-0 ${isLeft ? "md:pr-12 md:text-right" : "md:order-last md:pl-12 text-left"}`}>
                      <div className="bg-slate-50 p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                        <div className={`text-4xl font-black text-accent/20 mb-2 ${isLeft ? "md:text-right" : "text-left"}`}>{item.year}</div>
                        <h4 className="text-2xl font-bold text-primary mb-3">{item.title}</h4>
                        <p className="text-muted-foreground text-lg leading-relaxed">{item.desc}</p>
                      </div>
                    </div>

                    {/* Empty Space for the other side on Desktop */}
                    <div className="hidden md:block w-[45%]"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Workshop Certifications</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "Authorized Maruti Suzuki",
              "ISO 9001:2015 Quality",
              "Factory Trained Technicians",
              "Genuine Parts Assured"
            ].map((cert, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl text-center flex flex-col items-center justify-center gap-4">
                <Shield className="w-10 h-10 text-accent" />
                <span className="font-semibold">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-slate-50 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary mb-8">Ready to Experience the Difference?</h2>
          <Button size="lg" asChild className="hover-beam bg-accent hover:bg-accent/90 text-white h-16 px-12 text-lg shadow-xl">
            <Link href="/booking">Book Your Next Service</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}