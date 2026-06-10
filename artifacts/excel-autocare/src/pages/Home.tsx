import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetStats, getGetStatsQueryKey } from "@workspace/api-client-react";
import { Wrench, Droplet, Settings, Calendar, Shield, ChevronLeft, ChevronRight, Star, User, Quote, ArrowRight } from "lucide-react";
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
        src="https://i.pinimg.com/1200x/7c/29/20/7c29202fbe5b8dfd320a1a553a9571f1.jpg"
        alt="car"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ objectPosition: "center 60%" }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-xl ml-6 md:ml-10 lg:ml-16">
          <span className="text-white uppercase tracking-widest text-xs font-medium mb-4 block">
            Official Maruti Suzuki Authorized Workshop
          </span>

          <h1 className="text-white font-bold mb-5 leading-tight">
            Your Trusted
            <br />
            <span className="italic text-blue-200">Maruti Suzuki</span>
            <br />
            Care Experts
          </h1>

          <p className="text-white mb-8 leading-relaxed text-sm max-w-sm">
            Dealer-grade diagnostics, genuine spare parts, and showroom-quality
            paint jobs — with the warmth of a neighborhood workshop.
          </p>

          <div className="flex gap-3 flex-wrap">
            <Button
              size="default"
              asChild
              className="hover-beam bg-white text-primary hover:bg-white/90 shadow-lg font-semibold"
            >
              <Link href="/booking">Book a Service</Link>
            </Button>

            <Button
              size="default"
              variant="outline"
              asChild
              className="border-white text-white hover:bg-white/10 backdrop-blur-sm"
            >
              <a href="tel:+919876543210">Call Now</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute right-8 top-1/3 hidden lg:flex flex-col gap-3 z-10">
        <div className="float-badge-1 glass-card rounded-full px-4 py-2 flex items-center gap-2 text-sm text-primary font-medium shadow-sm">
          <Shield size={14} className="text-accent" />
          Genuine Parts
        </div>

        <div className="float-badge-2 glass-card rounded-full px-4 py-2 flex items-center gap-2 text-sm text-primary font-medium shadow-sm">
          <Settings size={14} className="text-accent" />
          OBD Diagnostics
        </div>

        <div className="float-badge-3 glass-card rounded-full px-4 py-2 flex items-center gap-2 text-sm text-primary font-medium shadow-sm">
          <Star
            size={14}
            fill="currentColor"
            className="text-yellow-500"
          />
          12+ Years
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
    <section
      ref={containerRef}
      className="relative py-20 lg:py-28 bg-[#f8fafc] text-primary border-b border-border overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Framed Image */}
          <div className="lg:col-span-5 gsap-reveal-about">
            <div className="relative overflow-hidden rounded-2xl shadow-xl p-4 bg-white border border-[#e2e8f0]">
              <div className="relative overflow-hidden rounded-xl aspect-[4/3] lg:aspect-square">
                <img
                  src="https://i.pinimg.com/736x/a1/b0/9b/a1b09b46d804c7fc2541750b28d780a8.jpg"
                  alt="workshop"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Tagline */}
            <div className="flex items-center gap-3 mb-4 gsap-reveal-about">
              <span className="w-8 h-[2px] bg-[#e63946]" />
              <span className="text-[#e63946] uppercase tracking-[0.2em] text-xs font-bold">
                About Excel Autocare
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-['Bebas_Neue'] text-5xl md:text-6xl tracking-wide mb-6 uppercase gsap-reveal-about leading-none text-[#1a2e4a]">
              Where Precision Meets Trust
            </h2>

            {/* Description */}
            <p className="text-sm leading-relaxed mb-6 gsap-reveal-about font-normal text-neutral-600">
              We operate on a simple philosophy: dealership-level technology combined with transparent, honest pricing. No hidden fees, no unnecessary replacements—just expert care for your Maruti Suzuki.
            </p>

            {/* Blockquote with red border */}
            <div className="border-l-4 border-[#e63946] pl-4 italic mb-8 gsap-reveal-about text-sm font-medium text-neutral-800">
              "We treat every vehicle's service like it's our own — because your car deserves dealership-level precision with a neighborhood touch."
            </div>

            {/* Features (Original data preserved) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 gsap-reveal-about">
              {[
                { icon: <Settings size={16} />, title: "10-Bay Facility", desc: "State-of-the-art lifts and tools" },
                { icon: <Shield size={16} />, title: "OBD Diagnostics", desc: "Computerized error scanning" },
                { icon: <Droplet size={16} />, title: "Thermal Baking", desc: "Showroom-finish paint jobs" },
                { icon: <Wrench size={16} />, title: "Genuine Parts", desc: "100% Maruti Genuine Parts" }
              ].map((feature, i) => (
                <div key={i} className="border-l-2 border-[#e63946]/30 pl-4 flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#e63946]">
                      {feature.icon}
                    </span>
                    <h3 className="font-semibold text-sm tracking-wide text-primary">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-xs leading-normal text-muted-foreground">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Learn More Link */}
            <div className="gsap-reveal-about">
              <Link
                href="/about"
                className="text-[#e63946] hover:text-[#ff5261] font-bold text-xs uppercase tracking-widest flex items-center gap-2 group transition-colors"
              >
                Learn More <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </Link>
            </div>
          </div>
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
    { title: "Body Repair", icon: <Wrench size={32} className="stroke-[1.25]" />, desc: "Laser-guided chassis alignment and dent removal." },
    { title: "Paint Services", icon: <Droplet size={32} className="stroke-[1.25]" />, desc: "Computerized color matching and clear-coat repair." },
    { title: "Mechanical", icon: <Settings size={32} className="stroke-[1.25]" />, desc: "Advanced engine diagnostics and component repair." },
    { title: "Maintenance", icon: <Calendar size={32} className="stroke-[1.25]" />, desc: "Comprehensive fluid, filter, and multi-point checks." },
    { title: "Genuine Parts", icon: <Shield size={32} className="stroke-[1.25]" />, desc: "100% OEM parts for durability and factory safety." },
  ];

  return (
    <section ref={containerRef} className="py-24 bg-[#f8fafc] border-b border-border">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-muted-foreground uppercase tracking-widest text-xs font-semibold mb-3 block">Premium Services</span>
          <h2 className="text-[#0c2340] text-3xl font-bold tracking-tight uppercase">
            Our Services
          </h2>
          <div className="flex flex-col items-center gap-1 mt-3">
            <div className="w-16 h-[2.5px] bg-[#0056b3] rounded-full" />
            <div className="w-10 h-[2px] bg-[#e63946] rounded-full" />
          </div>
          <p className="text-neutral-600 text-sm mt-6 leading-relaxed">
            From routine oil changes to complex structural repairs, our facility is equipped for every requirement.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)] bg-white border border-neutral-200 rounded-xl p-8 flex flex-col items-center text-center relative overflow-hidden transition-all duration-300 group hover:bg-[#0c2340] hover:border-[#0c2340] hover:shadow-2xl hover:-translate-y-2 min-h-[300px] gsap-reveal-service"
            >
              {/* Centered Icon Container */}
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-[#e63946] mb-6 transition-colors duration-300 bg-[#f8fafc] group-hover:bg-white/10 group-hover:text-[#e63946]">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-[#0c2340] font-bold text-lg mb-3 transition-colors duration-300 group-hover:text-white">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-neutral-600 text-sm mb-6 leading-relaxed transition-colors duration-300 group-hover:text-neutral-300 font-normal">
                {service.desc}
              </p>

              {/* Link CTA */}
              <div className="mt-auto">
                <Link
                  href="/services"
                  className="text-[#0056b3] hover:underline group-hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1 group/link transition-colors duration-300"
                >
                  Read more <span className="group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>

              {/* Hover bottom Accent Blue bar */}
              <div className="absolute bottom-0 left-0 w-full h-[6px] bg-[#0056b3] transform translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
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
      car: "Baleno 2021",
      initials: "RM"
    },
    {
      quote: "Booked online, dropped the car, got updates on WhatsApp. Zero surprises on the bill. This is how every service center should operate.",
      author: "Priya K.",
      car: "Brezza 2022",
      initials: "PK"
    },
    {
      quote: "Professional facility, courteous staff, and they actually showed me the replaced parts. I've been bringing my Swift here for 4 years.",
      author: "Amir S.",
      car: "Swift 2019",
      initials: "AS"
    },
    {
      quote: "The paint job they did after my accident is flawless. You literally can't tell where the damage was. Worth every rupee.",
      author: "Deepa R.",
      car: "Dzire 2020",
      initials: "DR"
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [current, testimonials.length]);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setCurrent(index);
  };

  return (
    <section
      className="py-24 relative overflow-hidden border-b border-border bg-cover bg-center"
      style={{ backgroundImage: "url('/client-stories-bg.png')" }}
    >
      {/* Light semi-transparent overlay to ensure text is fully legible while showing the car background */}
      <div className="absolute inset-0 bg-slate-50/75 z-0" />

      {/* Subtle Transparent Car Watermark in the background */}
      <img
        src="/car-watermark.png"
        alt="Car blueprint"
        className="absolute right-4 bottom-4 w-96 h-auto opacity-[0.06] pointer-events-none select-none z-0"
      />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-[#0056b3] uppercase tracking-widest text-xs font-semibold mb-3 block">Client Stories</span>
          <h2 className="text-[#0c2340] font-['Bebas_Neue'] text-5xl md:text-6xl tracking-wide uppercase">
            Testimonials
          </h2>
          <div className="flex flex-col items-center gap-1 mt-3">
            <div className="w-16 h-[2.5px] bg-[#0056b3] rounded-full" />
            <div className="w-10 h-[2px] bg-[#e63946] rounded-full" />
          </div>
        </div>

        {/* Carousel Container with true sliding track */}
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${current * 100}%` }}
            transition={{ type: "spring", stiffness: 180, damping: 24 }}
          >
            {testimonials.map((testimonial, i) => (
              <div key={i} className="w-full shrink-0 px-4 md:px-12">
                <div className="relative bg-white border border-slate-100 rounded-2xl p-8 md:p-12 shadow-xl hover:shadow-2xl hover:border-[#0056b3]/30 transition-all duration-300 flex flex-col md:flex-row gap-8 items-center md:items-start min-h-[280px]">
                  {/* Left Side: Avatar, Name, Car Badge, Rating */}
                  <div className="flex flex-col items-center md:items-start gap-3 shrink-0">
                    <div className="w-16 h-16 rounded-full border-2 border-[#0056b3] bg-[#0c2340] flex items-center justify-center text-white shadow-md font-bold text-lg">
                      {testimonial.initials}
                    </div>
                    <div className="text-center md:text-left mt-2">
                      <p className="font-bold text-[#0c2340] text-base tracking-wide">
                        {testimonial.author}
                      </p>
                      <span className="inline-block px-2.5 py-0.5 mt-1 bg-[#f0f7ff] border border-[#0056b3]/20 rounded-full text-[#0056b3] text-xs font-semibold uppercase tracking-wider">
                        {testimonial.car}
                      </span>
                    </div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 mt-2">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star key={idx} size={14} fill="currentColor" className="text-yellow-500 stroke-yellow-500" />
                      ))}
                    </div>
                  </div>

                  {/* Vertical Divider (desktop) */}
                  <div className="hidden md:block w-[1px] h-32 bg-slate-100 shrink-0 self-center" />

                  {/* Right Side: Quote and Details */}
                  <div className="flex-1 flex flex-col justify-between h-full relative w-full">
                    {/* Large Background Quote Symbol */}
                    <Quote size={48} className="text-slate-100 absolute -top-4 -right-2 stroke-[1.5]" />

                    <p className="text-[#475569] text-base md:text-lg leading-relaxed italic font-medium pt-2 relative z-10">
                      "{testimonial.quote}"
                    </p>

                    <div className="mt-8 flex items-center gap-2 text-[#0056b3] text-xs font-bold tracking-wider uppercase">
                      <span className="w-6 h-[1.5px] bg-[#0056b3]" />
                      Verified Customer Review
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-6 mt-12 text-slate-700">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white border-slate-200 text-slate-700 hover:bg-[#0056b3] hover:text-white hover:border-[#0056b3] transition-all duration-300 cursor-pointer shadow-md h-10 w-10"
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === current ? "bg-[#0056b3] w-6" : "bg-slate-300 w-2 hover:bg-[#0056b3]/50"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white border-slate-200 text-slate-700 hover:bg-[#0056b3] hover:text-white hover:border-[#0056b3] transition-all duration-300 cursor-pointer shadow-md h-10 w-10"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
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
    <section ref={containerRef} className="py-24 bg-gradient-to-br from-[#0c2340] via-[#091b30] to-[#05101d] relative overflow-hidden border-t border-white/5">
      {/* Decorative top border line with subtle glow */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#0056b3]/50 to-transparent" />
      
      {/* Ambient background glows */}
      <div className="absolute -left-16 -top-16 w-[350px] h-[350px] bg-[#0056b3]/15 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute -right-16 -bottom-16 w-[350px] h-[350px] bg-[#8ab4f8]/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="container relative z-10 mx-auto px-4 gsap-reveal-cta">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 max-w-5xl mx-auto text-center lg:text-left">
          <div className="space-y-4">
            <span className="inline-block text-[#8ab4f8] text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              Hassle-Free Care
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ready for <span className="text-[#8ab4f8] italic">Service?</span>
            </h2>
            <p className="text-slate-300 text-base md:text-lg max-w-xl font-normal leading-relaxed">
              Genuine parts. Expert technicians. Transparent pricing. Drop your car — we'll handle the rest.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto items-center justify-center">
            <Button size="lg" asChild className="hover-beam bg-white text-[#0c2340] hover:bg-white/95 font-bold shadow-lg rounded-xl px-8 py-6 h-auto text-base border-0 w-full sm:w-auto cursor-pointer transition-all duration-300">
              <Link href="/booking">Book Service Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 backdrop-blur-sm font-bold shadow-md rounded-xl px-8 py-6 h-auto text-base w-full sm:w-auto cursor-pointer transition-all duration-300">
              <a href="tel:+919876543210">Call Now</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
