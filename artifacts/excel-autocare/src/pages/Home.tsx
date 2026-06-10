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
    <div className="w-full bg-[#07111f] text-white py-3 overflow-hidden border-b border-accent/20 relative z-10">
      <div className="flex whitespace-nowrap animate-ticker" style={{ animationDuration: '20s' }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center">
            <span className="text-xs font-bold mx-4 uppercase tracking-widest text-accent">Genuine Parts</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,163,255,0.8)]"></span>
            <span className="text-xs font-bold mx-4 uppercase tracking-widest text-white">Expert Mechanics</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,163,255,0.8)]"></span>
            <span className="text-xs font-bold mx-4 uppercase tracking-widest text-accent">Transparent Pricing</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,163,255,0.8)]"></span>
            <span className="text-xs font-bold mx-4 uppercase tracking-widest text-white">Quick Turnaround</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,163,255,0.8)]"></span>
            <span className="text-xs font-bold mx-4 uppercase tracking-widest text-accent">Advanced Diagnostics</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,163,255,0.8)]"></span>
            <span className="text-xs font-bold mx-4 uppercase tracking-widest text-white">Authorized Maruti Suzuki Center</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,163,255,0.8)]"></span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center bg-[#07111f] text-white overflow-hidden pt-20">
      {/* Deep radial gradient glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-accent opacity-5 rounded-full blur-[120px] pointer-events-none"></div>
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "60px 60px" }}>
      </div>

      <div className="container relative z-10 px-4 py-20 mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-block bg-accent/10 border border-accent/20 text-accent px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,163,255,0.2)]">
                Official Maruti Suzuki Authorized Workshop
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-black leading-[1.1] uppercase tracking-tight">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
                  className="block text-white"
                >Your Trusted</motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
                  className="block gradient-text-blue"
                >Maruti Suzuki</motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
                  className="block text-white"
                >Care Experts</motion.span>
              </h1>
              
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed font-sans"
              >
                Mechanical precision meets local trust. Dealer-grade diagnostics, genuine spare parts, and showroom-quality paint jobs with the warmth of a neighborhood garage.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.6 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Button size="lg" asChild className="hover-beam bg-accent pulse-glow text-white px-8 h-14 text-sm font-bold uppercase tracking-wide">
                  <Link href="/booking">Book Service Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white/20 hover:bg-white/5 text-white h-14 px-8 text-sm font-bold uppercase tracking-wide backdrop-blur-sm">
                  <a href="tel:+919876543210">Call Now</a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-5 hidden lg:block relative h-[400px]">
            {/* Ground reflection */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-[20px] bg-accent/30 blur-xl rounded-full"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 500 260" className="w-full h-auto text-white headlight-glow drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                {/* Body outline */}
                <path d="M 60 165 L 55 120 C 55 110, 70 90, 100 78 L 160 60 C 175 45, 200 38, 235 38 L 310 38 C 345 38, 365 48, 380 65 L 430 105 C 445 115, 455 130, 455 165 Z" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" fill="none"/>
                {/* Windshield */}
                <path d="M 160 60 L 145 120" stroke="currentColor" strokeWidth="3.5" opacity="0.7"/>
                {/* Rear window */}
                <path d="M 310 38 L 325 110" stroke="currentColor" strokeWidth="3.5" opacity="0.7"/>
                {/* Door line */}
                <line x1="220" y1="42" x2="210" y2="120" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
                {/* Roof rack detail */}
                <line x1="175" y1="42" x2="305" y2="40" stroke="currentColor" strokeWidth="2" opacity="0.5"/>

                {/* Rear Wheel Group */}
                <motion.g 
                  style={{ transformOrigin: '120px 170px' }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                >
                  <circle cx="120" cy="170" r="35" stroke="currentColor" strokeWidth="5" fill="#07111f"/>
                  <circle cx="120" cy="170" r="10" fill="currentColor"/>
                  <line x1="120" y1="135" x2="120" y2="205" stroke="currentColor" strokeWidth="3" opacity="0.5" />
                  <line x1="85" y1="170" x2="155" y2="170" stroke="currentColor" strokeWidth="3" opacity="0.5" />
                </motion.g>

                {/* Front Wheel Group */}
                <motion.g 
                  style={{ transformOrigin: '390px 170px' }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                >
                  <circle cx="390" cy="170" r="35" stroke="currentColor" strokeWidth="5" fill="#07111f"/>
                  <circle cx="390" cy="170" r="10" fill="currentColor"/>
                  <line x1="390" y1="135" x2="390" y2="205" stroke="currentColor" strokeWidth="3" opacity="0.5" />
                  <line x1="355" y1="170" x2="425" y2="170" stroke="currentColor" strokeWidth="3" opacity="0.5" />
                </motion.g>
              </svg>
            </div>

            {/* Floating Badges */}
            <div className="absolute top-[10%] -right-4 glass-card-blue px-4 py-2 flex items-center gap-2 float-badge-1 neon-border rounded-xl">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Genuine Parts</span>
            </div>
            
            <div className="absolute top-[40%] -left-10 glass-card-blue px-4 py-2 flex items-center gap-2 float-badge-2 neon-border rounded-xl">
              <Settings className="w-4 h-4 text-accent" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Diagnostics</span>
            </div>
            
            <div className="absolute bottom-[10%] right-[10%] glass-card-blue px-4 py-2 flex items-center gap-2 float-badge-3 neon-border rounded-xl">
              <Star className="w-4 h-4 text-accent" fill="currentColor" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">12+ Years</span>
            </div>
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
    <section ref={containerRef} className="flex flex-col lg:flex-row min-h-[600px] border-b border-white/5">
      <div className="lg:w-1/2 bg-[#07111f] text-white p-12 lg:p-24 flex flex-col justify-center">
        <div className="max-w-xl mx-auto lg:mx-0 gsap-reveal-about">
          <span className="text-accent font-bold tracking-widest uppercase text-xs mb-4 block">About Excel Autocare</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">Where Precision Meets Trust</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            We operate on a simple philosophy: dealership-level technology combined with transparent, honest pricing. No hidden fees, no unnecessary replacements—just expert care for your Maruti Suzuki.
          </p>
          <Button variant="link" asChild className="text-accent hover:text-white p-0 h-auto text-sm font-bold uppercase tracking-wider flex items-center gap-2 group">
            <Link href="/about">
              Learn More <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </Button>
        </div>
      </div>
      <div className="lg:w-1/2 bg-[#0d1b2a] p-12 lg:p-24 flex items-center border-l border-white/5">
        <div className="grid sm:grid-cols-2 gap-6 w-full">
          {[
            { icon: <Settings className="w-6 h-6"/>, title: "10-Bay Facility", desc: "State-of-the-art lifts and tools" },
            { icon: <Shield className="w-6 h-6"/>, title: "OBD Diagnostics", desc: "Computerized error scanning" },
            { icon: <Droplet className="w-6 h-6"/>, title: "Thermal Baking", desc: "Showroom-finish paint jobs" },
            { icon: <Wrench className="w-6 h-6"/>, title: "Genuine Parts", desc: "100% Maruti Genuine Parts" }
          ].map((feature, i) => (
            <div key={i} className="glass-card neon-border p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 gsap-reveal-about">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-6 headlight-glow-sm">
                {feature.icon}
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
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
    { title: "Mechanical", icon: <Settings />, desc: "Advanced engine diagnostics and component repair." },
    { title: "Maintenance", icon: <Calendar />, desc: "Comprehensive fluid, filter, and multi-point checks." },
    { title: "Genuine Parts", icon: <Shield />, desc: "100% OEM parts for durability and factory safety." },
  ];

  return (
    <section ref={containerRef} className="py-32 bg-[#0d1b2a] border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-bold tracking-widest uppercase text-xs mb-4 block">Premium Services</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8">Complete Car Care</h2>
          <div className="section-speed-divider mx-auto w-32 mb-8"></div>
          <p className="text-muted-foreground text-lg">From routine oil changes to complex structural repairs, our facility is equipped for every requirement.</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6">
          {services.map((service, i) => (
            <div key={i} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] glass-card neon-border rounded-2xl p-8 service-card-lift gsap-reveal-service">
              <div className="w-14 h-14 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center text-accent mb-6 headlight-glow-sm">
                {service.icon}
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3">{service.title}</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{service.desc}</p>
              <Link href="/services" className="text-accent text-xs font-bold uppercase tracking-wider flex items-center gap-2 group">
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
    <motion.span 
      key={count} 
      initial={{ y: 5, opacity: 0.8 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.1 }}
      className="inline-block"
      ref={ref}
    >
      {count.toLocaleString()}
    </motion.span>
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
    <section className="py-24 bg-[#07111f] relative overflow-hidden border-b border-white/5">
      {/* Horizontal accent stripe */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-accent/20 shadow-[0_0_20px_rgba(0,163,255,0.5)] z-0"></div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Cars Serviced", value: displayStats.totalCarsServiced, suffix: "+" },
            { label: "Years Experience", value: displayStats.yearsInOperation, suffix: "" },
            { label: "Certified Techs", value: displayStats.certifiedTechnicians, suffix: "" },
            { label: "Satisfaction Rate", value: displayStats.customerSatisfaction, suffix: "%" },
          ].map((stat, i) => (
            <div key={i} className="space-y-4 bg-[#07111f] py-4">
              <h3 className="text-4xl md:text-6xl font-heading font-black text-white tracking-tight">
                <Counter end={stat.value} />{stat.suffix}
              </h3>
              <p className="text-accent font-bold tracking-widest uppercase text-xs">{stat.label}</p>
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
    <section className="py-32 bg-[#07111f] text-white overflow-hidden border-b border-white/5 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d1b2a]"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <span className="text-accent font-bold tracking-widest uppercase text-xs mb-4 block">Client Stories</span>
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-16">What Drivers Say</h2>
        
        <div className="max-w-4xl mx-auto relative h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="glass-card neon-border p-8 md:p-12 rounded-2xl absolute w-full"
            >
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-lg md:text-xl text-white leading-relaxed font-sans italic mb-8">
                "{testimonials[current].quote}"
              </p>
              <div>
                <p className="font-bold text-white text-base tracking-wide uppercase">{testimonials[current].author}</p>
                <p className="text-muted-foreground text-sm mt-1">{testimonials[current].car}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" size="icon" className="rounded-full border-white/20 text-white hover:bg-white/10 hover:text-accent" onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3 mx-4">
            {testimonials.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "bg-accent w-8" : "bg-white/20 w-2 hover:bg-white/50"}`}
              />
            ))}
          </div>
          <Button variant="outline" size="icon" className="rounded-full border-white/20 text-white hover:bg-white/10 hover:text-accent" onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}>
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
    <section ref={containerRef} className="relative py-24 bg-[#07111f] overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-accent/10 to-transparent transform -skew-x-12 scale-150"></div>
      
      <div className="container relative z-10 mx-auto px-4 gsap-reveal-cta">
        <div className="glass-card neon-border rounded-3xl p-12 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-4 uppercase tracking-tight">Ready for Service?</h2>
            <p className="text-muted-foreground text-lg max-w-xl font-sans">Genuine parts. Expert technicians. Transparent pricing. Drop your car — we'll handle the rest.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
            <Button size="lg" asChild className="hover-beam bg-accent pulse-glow hover:bg-accent/90 text-white h-14 px-10 text-sm font-bold uppercase tracking-wide w-full sm:w-auto">
              <Link href="/booking">Book Service Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/20 hover:bg-white/5 text-white h-14 px-10 text-sm font-bold uppercase tracking-wide w-full sm:w-auto">
              <a href="tel:+919876543210">Call Now</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
