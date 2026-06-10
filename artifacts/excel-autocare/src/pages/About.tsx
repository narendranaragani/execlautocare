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
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.5, ease: "power2.out",
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
    <div className="min-h-screen bg-white font-sans">
      {/* Page Header */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1517524285303-d6fc683dddf8?w=1920&q=80" alt="workshop" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 img-overlay-dark" />
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <span className="text-white/60 uppercase tracking-widest text-xs font-medium mb-3 block">Our Story</span>
          <h1 className="text-3xl md:text-4xl text-white mb-4">Redefining Automotive Care</h1>
          <p className="text-sm text-white/80 leading-relaxed mx-auto max-w-xl">
            We bring dealership-level technology to a neighborhood setting. Honest pricing, genuine parts, and absolute transparency.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-secondary p-10 rounded-2xl">
                <h3 className="text-2xl text-primary mb-8 font-semibold">By The Numbers</h3>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-3xl font-bold text-accent mb-1">12+</div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent mb-1">15k+</div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cars Serviced</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent mb-1">45</div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Certified Techs</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl text-primary font-semibold">Our Mission & Vision</h2>
              <div className="w-12 h-0.5 bg-accent"></div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Excel Autocare was founded on a very simple premise: getting your vehicle serviced should not be stressful, confusing, or unnecessarily expensive. For over a decade, we have been bridging the gap between the high technical standards of an official dealership and the personal touch of a local mechanic.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                As an Authorized Maruti Suzuki Service Center, we hold ourselves to rigorous factory standards. Every bolt tightened, every drop of oil poured, and every diagnostic scan run is performed exactly as the manufacturer intended. We don't guess; we know.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-muted-foreground uppercase tracking-widest text-xs font-medium mb-3 block">Principles</span>
            <h2 className="text-3xl text-primary mb-4">Our Core Values</h2>
            <div className="heading-underline mx-auto mb-4"></div>
            <p className="text-muted-foreground text-sm">The principles that guide every repair and every customer interaction.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border border-l-2 border-l-accent p-8 rounded-xl service-card-lift">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-accent mb-6">
                <Shield size={16} />
              </div>
              <h3 className="text-lg text-primary font-semibold mb-3">Absolute Transparency</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">We show you the replaced parts. We explain the bill line by line. No hidden charges, no unnecessary upselling. You approve every repair before we begin.</p>
            </div>
            <div className="bg-card border border-border border-l-2 border-l-accent p-8 rounded-xl service-card-lift">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-accent mb-6">
                <CheckCircle2 size={16} />
              </div>
              <h3 className="text-lg text-primary font-semibold mb-3">Genuine Parts Only</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">We strictly use 100% Maruti Suzuki Genuine Parts (MGP). This ensures your factory warranty remains completely intact and your car performs optimally.</p>
            </div>
            <div className="bg-card border border-border border-l-2 border-l-accent p-8 rounded-xl service-card-lift">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-accent mb-6">
                <Zap size={16} />
              </div>
              <h3 className="text-lg text-primary font-semibold mb-3">Technical Mastery</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Our mechanics undergo continuous training on the latest Maruti Suzuki diagnostic protocols. We invest heavily in state-of-the-art tools and technology.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Animated Timeline */}
      <section className="py-24 bg-secondary overflow-hidden border-b border-border" ref={timelineRef}>
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <span className="text-muted-foreground uppercase tracking-widest text-xs font-medium mb-3 block">History</span>
            <h2 className="text-3xl text-primary font-semibold">Our Journey</h2>
          </div>
          
          <div className="space-y-12">
            {timeline.map((item) => (
              <div key={item.year} className="timeline-item flex items-start gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-accent mt-1.5"></div>
                  <div className="w-px h-full bg-border mt-3"></div>
                </div>
                <div className="pb-8">
                  <div className="text-sm font-bold text-accent mb-1">{item.year}</div>
                  <h4 className="text-lg text-primary font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-primary font-semibold mb-6">Ready to Experience the Difference?</h2>
          <Button size="default" asChild className="hover-beam bg-primary text-white hover:bg-primary/90 font-semibold shadow-sm">
            <Link href="/booking">Book Your Next Service</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
