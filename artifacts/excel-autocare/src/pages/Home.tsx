import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useGetStats, getGetStatsQueryKey } from "@workspace/api-client-react";
import { Wrench, Droplet, Settings, Calendar, Shield, ChevronLeft, ChevronRight, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroTicker() {
  return (
    <div className="w-full bg-white text-primary py-2 overflow-hidden border-b border-border relative z-10">
      <div className="flex whitespace-nowrap animate-ticker" style={{ animationDuration: '20s' }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center">
            <span className="text-xs font-bold mx-4 uppercase tracking-widest text-primary">Genuine Parts</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
            <span className="text-xs font-bold mx-4 uppercase tracking-widest text-primary">Expert Mechanics</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
            <span className="text-xs font-bold mx-4 uppercase tracking-widest text-primary">Transparent Pricing</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
            <span className="text-xs font-bold mx-4 uppercase tracking-widest text-primary">Quick Turnaround</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
            <span className="text-xs font-bold mx-4 uppercase tracking-widest text-primary">Advanced Diagnostics</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
            <span className="text-xs font-bold mx-4 uppercase tracking-widest text-primary">Authorized Maruti Suzuki Center</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden pt-20">
      <img
        src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&q=80"
        alt="car"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 img-overlay-dark" />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-xl">
          <span className="text-white/60 uppercase tracking-widest text-xs font-medium mb-4 block">Official Maruti Suzuki Authorized Workshop</span>
          <h1 className="text-white font-bold mb-5 leading-tight">
            Your Trusted<br/>
            <span className="italic text-blue-200">Maruti Suzuki</span><br/>
            Care Experts
          </h1>
          <p className="text-white/75 mb-8 leading-relaxed text-sm max-w-sm">
            Dealer-grade diagnostics, genuine spare parts, and showroom-quality paint jobs — with the warmth of a neighborhood workshop.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Button size="default" asChild className="hover-beam bg-white text-primary hover:bg-white/90 shadow-lg font-semibold">
              <Link href="/booking">Book a Service</Link>
            </Button>
            <Button size="default" variant="outline" asChild className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
              <a href="tel:+919876543210">Call Now</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute right-8 top-1/3 hidden lg:flex flex-col gap-3 z-10">
        <div className="float-badge-1 glass-card rounded-full px-4 py-2 flex items-center gap-2 text-sm text-primary font-medium shadow-sm">
          <Shield size={14} className="text-accent" /> Genuine Parts
        </div>
        <div className="float-badge-2 glass-card rounded-full px-4 py-2 flex items-center gap-2 text-sm text-primary font-medium shadow-sm">
          <Settings size={14} className="text-accent" /> OBD Diagnostics
        </div>
        <div className="float-badge-3 glass-card rounded-full px-4 py-2 flex items-center gap-2 text-sm text-primary font-medium shadow-sm">
          <Star size={14} fill="currentColor" className="text-yellow-500"/> 12+ Years
        </div>
      </div>
    </section>
  );
}

export function AboutPreview() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".gsap-reveal-about", 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 75%", once: true }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="flex flex-col lg:flex-row min-h-[600px] border-b border-border">
      <div className="lg:w-1/2 relative flex flex-col justify-center min-h-[400px]">
        <img src="https://images.unsplash.com/photo-1517524285303-d6fc683dddf8?w=800&q=80" alt="workshop" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 img-overlay-mid" />
        <div className="relative z-10 p-12 lg:p-24 max-w-xl mx-auto lg:mx-0 gsap-reveal-about">
          <span className="text-white/60 uppercase tracking-widest text-xs font-medium mb-4 block">About Excel Autocare</span>
          <h2 className="text-white text-3xl mb-6">Where Precision Meets Trust</h2>
          <p className="text-white/80 text-sm leading-relaxed mb-8">
            We operate on a simple philosophy: dealership-level technology combined with transparent, honest pricing. No hidden fees, no unnecessary replacements—just expert care for your Maruti Suzuki.
          </p>
          <Button variant="link" asChild className="text-white hover:text-white/80 p-0 h-auto text-sm font-semibold flex items-center gap-2 group">
            <Link href="/about">
              Learn More <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </Button>
        </div>
      </div>
      <div className="lg:w-1/2 bg-white p-12 lg:p-24 flex items-center">
        <div className="grid sm:grid-cols-2 gap-8 w-full">
          {[
            { icon: <Settings size={18}/>, title: "10-Bay Facility", desc: "State-of-the-art lifts and tools" },
            { icon: <Shield size={18}/>, title: "OBD Diagnostics", desc: "Computerized error scanning" },
            { icon: <Droplet size={18}/>, title: "Thermal Baking", desc: "Showroom-finish paint jobs" },
            { icon: <Wrench size={18}/>, title: "Genuine Parts", desc: "100% Maruti Genuine Parts" }
          ].map((feature, i) => (
            <div key={i} className="gsap-reveal-about border-l-2 border-accent pl-4">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-accent mb-3">
                {feature.icon}
              </div>
              <h3 className="text-primary font-semibold text-base mb-1">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesOverview() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".gsap-reveal-service", 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%", once: true }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const services = [
    { title: "Body Repair", icon: <Wrench size={16} />, desc: "Laser-guided chassis alignment and dent removal." },
    { title: "Paint Services", icon: <Droplet size={16} />, desc: "Computerized color matching and clear-coat repair." },
    { title: "Mechanical", icon: <Settings size={16} />, desc: "Advanced engine diagnostics and component repair." },
    { title: "Maintenance", icon: <Calendar size={16} />, desc: "Comprehensive fluid, filter, and multi-point checks." },
    { title: "Genuine Parts", icon: <Shield size={16} />, desc: "100% OEM parts for durability and factory safety." },
  ];

  return (
    <section ref={containerRef} className="py-24 bg-white border-b border-border">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-muted-foreground uppercase tracking-widest text-xs font-medium mb-3 block">Premium Services</span>
          <h2 className="text-primary text-3xl mb-4">Complete Car Care</h2>
          <div className="heading-underline mb-6"></div>
          <p className="text-muted-foreground text-sm">From routine oil changes to complex structural repairs, our facility is equipped for every requirement.</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6">
          {services.map((service, i) => (
            <div key={i} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-card border border-border rounded-xl p-6 service-card-lift gsap-reveal-service">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-accent mb-4">
                {service.icon}
              </div>
              <h3 className="text-primary font-semibold text-lg mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{service.desc}</p>
              <Link href="/services" className="text-accent text-xs font-bold uppercase tracking-wider flex items-center gap-1 group">
                Learn More <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ end, duration = 2 }: { end: number, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="inline-block">
      {count.toLocaleString()}
    </span>
  );
}

export function Stats() {
  const { data: stats } = useGetStats({ query: { queryKey: getGetStatsQueryKey() } });

  const displayStats = stats || {
    totalCarsServiced: 15400,
    yearsInOperation: 12,
    certifiedTechnicians: 45,
    customerSatisfaction: 98
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <img src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1920&q=80" alt="stats bg" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 img-overlay-dark" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Cars Serviced", value: displayStats.totalCarsServiced, suffix: "+" },
            { label: "Years Experience", value: displayStats.yearsInOperation, suffix: "" },
            { label: "Certified Techs", value: displayStats.certifiedTechnicians, suffix: "" },
            { label: "Satisfaction Rate", value: displayStats.customerSatisfaction, suffix: "%" },
          ].map((stat, i) => (
            <div key={i} className="space-y-2 py-4">
              <h3 className="text-3xl md:text-4xl text-white font-bold">
                <Counter end={stat.value} />{stat.suffix}
              </h3>
              <p className="text-white/70 text-xs uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const testimonials = [
    {
      quote: "The team at Excel Autocare diagnosed an issue two other workshops missed. Transparent pricing and genuine parts every time. My Baleno runs like new.",
      author: "Rajesh M.",
      car: "Baleno 2021"
    },
    {
      quote: "Booked online, dropped the car, got updates on WhatsApp. Zero surprises on the bill. This is how every service center should operate.",
      author: "Priya K.",
      car: "Brezza 2022"
    },
    {
      quote: "Professional facility, courteous staff, and they actually showed me the replaced parts. I've been bringing my Swift here for 4 years.",
      author: "Amir S.",
      car: "Swift 2019"
    },
    {
      quote: "The paint job they did after my accident is flawless. You literally can't tell where the damage was. Worth every rupee.",
      author: "Deepa R.",
      car: "Dzire 2020"
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-24 bg-secondary border-b border-border">
      <div className="container mx-auto px-4 text-center">
        <span className="text-muted-foreground uppercase tracking-widest text-xs font-medium mb-3 block">Client Stories</span>
        <h2 className="text-primary text-3xl mb-12">What Drivers Say</h2>
        
        <div className="max-w-3xl mx-auto relative h-[250px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-xl shadow-sm absolute w-full border border-border"
            >
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                ))}
              </div>
              <p className="text-base text-primary leading-relaxed font-sans italic mb-6">
                "{testimonials[current].quote}"
              </p>
              <div>
                <p className="font-bold text-primary text-sm tracking-wide">{testimonials[current].author}</p>
                <p className="text-muted-foreground text-xs mt-1">{testimonials[current].car}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <Button variant="outline" size="icon" className="rounded-full bg-white border-border text-primary hover:bg-secondary hover:text-accent" onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2 mx-2">
            {testimonials.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "bg-accent w-6" : "bg-border w-2 hover:bg-muted-foreground/30"}`}
              />
            ))}
          </div>
          <Button variant="outline" size="icon" className="rounded-full bg-white border-border text-primary hover:bg-secondary hover:text-accent" onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export function CTABanner() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".gsap-reveal-cta", 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, y: 0, duration: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%", once: true }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-primary relative overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 gsap-reveal-cta">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 max-w-4xl mx-auto text-center lg:text-left">
          <div>
            <h2 className="text-3xl text-white mb-3">Ready for Service?</h2>
            <p className="text-white/70 text-sm max-w-lg font-sans">Genuine parts. Expert technicians. Transparent pricing. Drop your car — we'll handle the rest.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto">
            <Button size="lg" asChild className="hover-beam bg-white text-primary hover:bg-white/90 font-semibold shadow-sm">
              <Link href="/booking">Book Service Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm font-semibold">
              <a href="tel:+919876543210">Call Now</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
