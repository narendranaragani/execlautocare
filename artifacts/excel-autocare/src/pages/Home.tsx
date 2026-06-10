import { useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useGetStats, getGetStatsQueryKey } from "@workspace/api-client-react";
import { Wrench, Droplet, Settings, Calendar, Shield, ChevronLeft, ChevronRight, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export function HeroTicker() {
  return (
    <div className="w-full bg-primary text-white py-2.5 overflow-hidden border-b border-accent/20 relative z-10">
      <div className="flex whitespace-nowrap animate-ticker">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center">
            <span className="text-xs font-semibold mx-4 uppercase tracking-widest">Genuine Parts</span>
            <span className="text-accent">&#8226;</span>
            <span className="text-xs font-semibold mx-4 uppercase tracking-widest text-accent/80">Expert Mechanics</span>
            <span className="text-accent">&#8226;</span>
            <span className="text-xs font-semibold mx-4 uppercase tracking-widest">Transparent Pricing</span>
            <span className="text-accent">&#8226;</span>
            <span className="text-xs font-semibold mx-4 uppercase tracking-widest text-accent/80">Quick Turnaround</span>
            <span className="text-accent">&#8226;</span>
            <span className="text-xs font-semibold mx-4 uppercase tracking-widest">Advanced Diagnostics</span>
            <span className="text-accent">&#8226;</span>
            <span className="text-xs font-semibold mx-4 uppercase tracking-widest text-accent/80">Authorized Maruti Suzuki Center</span>
            <span className="text-accent">&#8226;</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center bg-primary text-white overflow-hidden pt-20">
      <div className="absolute inset-0 opacity-[0.04] z-0" 
        style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }}>
      </div>
      
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent opacity-15 transform rotate-12 translate-x-1/4 scale-150 z-0"></div>

      <div className="container relative z-10 px-4 py-20 mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide shadow-sm">
                Official Maruti Suzuki Authorized Workshop
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1]">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
                  className="block"
                >Your Trusted</motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
                  className="block text-blue-400 gradient-text"
                >Maruti Suzuki</motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
                  className="block"
                >Care Experts</motion.span>
              </h1>
              
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
                className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed"
              >
                Mechanical precision meets local trust. Dealer-grade diagnostics, genuine spare parts, and showroom-quality paint jobs with the warmth of a neighborhood garage.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Button size="lg" asChild className="hover-beam bg-accent hover:bg-accent/90 text-white px-8 h-14 text-lg shadow-[0_0_30px_rgba(0,86,179,0.4)]">
                  <Link href="/booking">Book Service Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white/20 hover:bg-white/10 text-white h-14 px-8 text-lg backdrop-blur-sm">
                  <a href="tel:+919876543210">Call Now</a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-5 hidden lg:block relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              <div className="glass-card rounded-2xl p-8 border border-accent/30 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent"></div>
                <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  <path d="M 50 140 L 40 100 C 40 100, 45 80, 70 70 L 120 60 C 130 50, 150 40, 180 40 L 260 40 C 290 40, 310 50, 320 70 L 360 90 C 370 100, 380 110, 380 140 Z" stroke="white" strokeWidth="4" strokeLinejoin="round" />
                  <path d="M 40 100 L 380 100" stroke="white" strokeWidth="2" opacity="0.5" />
                  <circle cx="100" cy="140" r="24" stroke="white" strokeWidth="4" />
                  <circle cx="310" cy="140" r="24" stroke="white" strokeWidth="4" />
                  <path d="M 170 40 L 150 100" stroke="white" strokeWidth="3" />
                  <path d="M 260 40 L 270 100" stroke="white" strokeWidth="3" />
                </svg>
              </div>

              {/* Floating Badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 glass-card px-4 py-2 rounded-full border border-white/20 shadow-lg flex items-center gap-2"
              >
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-white">Genuine Parts</span>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -left-12 glass-card px-4 py-2 rounded-full border border-white/20 shadow-lg flex items-center gap-2"
              >
                <Settings className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-white">OBD Diagnostics</span>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-6 right-10 glass-card px-4 py-2 rounded-full border border-white/20 shadow-lg flex items-center gap-2"
              >
                <Star className="w-4 h-4 text-accent" fill="currentColor" />
                <span className="text-sm font-semibold text-white">12+ Years</span>
              </motion.div>
            </motion.div>
          </div>
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
        { opacity: 0, y: 40 },
        { 
          opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 75%", once: true }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="flex flex-col lg:flex-row min-h-[600px]">
      <div className="lg:w-1/2 bg-primary text-white p-12 lg:p-24 flex flex-col justify-center">
        <div className="max-w-xl mx-auto lg:mx-0 gsap-reveal-about">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block">About Excel Autocare</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Where Precision Meets Trust</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            We operate on a simple philosophy: dealership-level technology combined with transparent, honest pricing. No hidden fees, no unnecessary replacements—just expert care for your Maruti Suzuki.
          </p>
          <Button variant="link" asChild className="text-white hover:text-accent p-0 h-auto text-lg font-semibold flex items-center gap-2 group">
            <Link href="/about">
              Learn More <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </Button>
        </div>
      </div>
      <div className="lg:w-1/2 bg-slate-50 p-12 lg:p-24 flex items-center">
        <div className="grid sm:grid-cols-2 gap-6 w-full">
          {[
            { icon: <Settings className="w-6 h-6"/>, title: "10-Bay Facility", desc: "State-of-the-art lifts and tools" },
            { icon: <Shield className="w-6 h-6"/>, title: "OBD Diagnostics", desc: "Computerized error scanning" },
            { icon: <Droplet className="w-6 h-6"/>, title: "Thermal Baking Booth", desc: "Showroom-finish paint jobs" },
            { icon: <Wrench className="w-6 h-6"/>, title: "Genuine Parts Only", desc: "100% Maruti Genuine Parts" }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-border gsap-reveal-about">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
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
        { opacity: 0, y: 50 },
        { 
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%", once: true }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const services = [
    { title: "Body Repair", icon: <Wrench />, desc: "Laser-guided chassis alignment and dent removal." },
    { title: "Paint Services", icon: <Droplet />, desc: "Computerized color matching and clear-coat repair." },
    { title: "Mechanical Works", icon: <Settings />, desc: "Advanced engine diagnostics and component repair." },
    { title: "Periodic Maintenance", icon: <Calendar />, desc: "Comprehensive fluid, filter, and multi-point checks." },
    { title: "Genuine Parts", icon: <Shield />, desc: "100% OEM parts for durability and factory safety." },
  ];

  return (
    <section ref={containerRef} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Complete Car Care Solutions</h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mb-6"></div>
          <p className="text-muted-foreground text-lg">From routine oil changes to complex structural repairs, our facility is equipped for every requirement.</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6">
          {services.map((service, i) => (
            <div key={i} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-slate-50 border border-border rounded-2xl p-8 service-card-lift gsap-reveal-service">
              <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center text-white mb-6 shadow-lg shadow-accent/20">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-primary mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{service.desc}</p>
              <Link href="/services" className="text-accent font-semibold flex items-center gap-2 group">
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

  return <span ref={ref}>{count.toLocaleString()}</span>;
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
    <section className="py-20 bg-primary border-t border-accent relative overflow-hidden">
      <div className="absolute inset-0 bg-accent/5"></div>
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Cars Serviced", value: displayStats.totalCarsServiced, suffix: "+" },
            { label: "Years Experience", value: displayStats.yearsInOperation, suffix: "" },
            { label: "Certified Techs", value: displayStats.certifiedTechnicians, suffix: "" },
            { label: "Satisfaction Rate", value: displayStats.customerSatisfaction, suffix: "%" },
          ].map((stat, i) => (
            <div key={i} className="space-y-3">
              <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                <Counter end={stat.value} />{stat.suffix}
              </h3>
              <p className="text-accent font-semibold tracking-wide uppercase text-sm">{stat.label}</p>
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
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-24 bg-gradient-to-b from-primary to-[#0a1e38] text-white overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16">What Our Customers Say</h2>
        
        <div className="max-w-4xl mx-auto relative h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-8 md:p-12 rounded-3xl absolute w-full"
            >
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-xl md:text-2xl text-slate-200 leading-relaxed font-medium italic mb-8">
                "{testimonials[current].quote}"
              </p>
              <div>
                <p className="font-bold text-white text-lg">{testimonials[current].author}</p>
                <p className="text-accent">{testimonials[current].car}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" size="icon" className="rounded-full border-white/20 text-white hover:bg-white/10" onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-accent w-8" : "bg-white/30 hover:bg-white/50"}`}
              />
            ))}
          </div>
          <Button variant="outline" size="icon" className="rounded-full border-white/20 text-white hover:bg-white/10" onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}>
            <ChevronRight className="w-5 h-5" />
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
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%", once: true }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-20 bg-primary overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-accent/20 to-transparent transform -skew-x-12"></div>
      
      <div className="container relative z-10 mx-auto px-4 gsap-reveal-cta">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Book Your Service Today</h2>
            <p className="text-slate-300 text-lg max-w-xl">Genuine parts. Expert technicians. Transparent pricing. Drop your car — we'll handle the rest.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <Button size="lg" asChild className="hover-beam bg-accent hover:bg-accent/90 text-white h-16 px-10 text-lg w-full sm:w-auto shadow-xl">
              <Link href="/booking">Book Service Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/30 hover:bg-white/10 text-white h-16 px-10 text-lg w-full sm:w-auto">
              <a href="tel:+919876543210">Call Now</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}