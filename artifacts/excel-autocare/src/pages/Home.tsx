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
  const slides = [
    {
      id: 1,
      image: "https://res.cloudinary.com/dlgqnmuhd/image/upload/v1781502371/prem1_rtmxhs.jpg",
      title: "Dealer-Grade Diagnostics",
      subtitle: "Precision matters."
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/dlgqnmuhd/image/upload/v1781501638/hm2_hpg7lj.jpg",
      title: "Professional Mechanics",
      subtitle: "Expertise you can trust."
    },
    {
      id: 3,
      image: "https://res.cloudinary.com/dlgqnmuhd/image/upload/v1781501770/body_yisc3v.jpg",
      title: "Showroom-Quality Paint",
      subtitle: "Flawless finish every time."
    },
    {
      id: 4,
      image: "https://i.pinimg.com/736x/ab/f0/17/abf01783ff63ff5840863ce8eee57ddf.jpg",
      title: "Genuine Spare Parts",
      subtitle: "Uncompromised durability."
    },
    {
      id: 5,
      image: "https://res.cloudinary.com/dlgqnmuhd/image/upload/v1781501565/hm1_fkairl.jpg ",
      title: "Premium Service",
      subtitle: "The care your car deserves."
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[#0c2340]">
      {/* Background Carousel */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slides[currentSlide].image}
            alt="Automotive Service"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark Overlay with Navy Blue / Black Gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0c2340]/95 via-[#0c2340]/80 to-black/60" />

      {/* Subtle Headlight Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 mt-16 pointer-events-none">
        <div className="max-w-2xl ml-0 md:ml-8 lg:ml-12 pointer-events-auto">
          <div>
            <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-x-2.5 gap-y-1.5 px-4 py-2.5 sm:py-1.5 mb-6 rounded-2xl sm:rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-[#00e5ff] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-xs font-bold shadow-lg max-w-[95vw] sm:max-w-full text-center">
              <span>Official Maruti Suzuki</span>
              <div className="flex items-center gap-1.5 my-0.5 sm:my-0">
                <img src="/arena1.png" className="h-[18px] sm:h-[22px] w-auto object-contain select-none rounded-sm" alt="Maruti Suzuki Arena" />
                <img src="/nexa.png" className="h-[18px] sm:h-[22px] w-auto object-contain select-none rounded-sm" alt="Maruti Suzuki Nexa" />
              </div>
              <span>Authorized Wo rkshop</span>
            </div>

            <h1 className="text-white font-serif font-black mb-6 leading-[1.1] text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight drop-shadow-2xl">
              Your Trusted
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Maruti Suzuki</span>
              <br />
              Care Experts
            </h1>

            <p className="text-white/80 mb-10 leading-relaxed text-base md:text-lg max-w-lg font-medium drop-shadow-md border-l-2 border-[#00e5ff] pl-4 transition-all duration-300">
              {slides[currentSlide].title} — {slides[currentSlide].subtitle}
            </p>

            <div className="flex gap-4 flex-wrap items-center">
              <Button
                size="lg"
                asChild
                className="hover-beam bg-[#00e5ff] text-[#0c2340] hover:bg-[#00b8cc] font-black uppercase tracking-widest rounded-none px-8 h-14 shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all duration-300"
              >
                <Link href="/booking">Book Service Now</Link>
              </Button>

              <div className="flex items-center gap-4 ml-4 hidden sm:flex">
                <div className="flex -space-x-3">
                  <img src="https://i.pravatar.cc/100?img=11" className="w-10 h-10 rounded-full border-2 border-[#0c2340]" alt="Customer" />
                  <img src="https://i.pravatar.cc/100?img=32" className="w-10 h-10 rounded-full border-2 border-[#0c2340]" alt="Customer" />
                  <img src="https://i.pravatar.cc/100?img=15" className="w-10 h-10 rounded-full border-2 border-[#0c2340]" alt="Customer" />
                </div>
                <div className="text-xs text-white/80 font-medium">
                  <span className="text-[#00e5ff] font-bold block text-sm">4.9/5</span>
                  from 2,500+ reviews
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30 hidden lg:flex">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="w-12 h-12 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="w-12 h-12 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-4 md:left-12 lg:left-20 flex items-center gap-3 z-30">
        <div className="w-5 h-8 border border-white/30 rounded-full flex items-center justify-center mr-4 hidden sm:flex">
          <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
        </div>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={cn(
                "h-1.5 transition-all duration-300 rounded-full",
                currentSlide === i ? "w-8 bg-[#00e5ff]" : "w-2 bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
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
          {/* Left Column: Overlapping Collage of Repair Images */}
          <div className="lg:col-span-5 relative min-h-[350px] sm:min-h-[420px] lg:min-h-[460px] gsap-reveal-about">
            {/* First Main Image */}
            <div className="w-[82%] aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 p-2 bg-white">
              <img
                src="https://i.pinimg.com/736x/5f/5a/94/5f5a94210862f36b7bd2bf765ec7d676.jpg"
                alt="Mechanic repairing car engine under the hood"
                className="w-full h-full object-cover rounded-xl transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Second Overlapping Image */}
            <div className="absolute right-0 bottom-4 w-[65%] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white p-1.5 bg-white z-10 transition-all duration-300 hover:scale-[1.03]">
              <img
                src="https://i.pinimg.com/1200x/41/f5/c6/41f5c68e06005373c8922f47aad22edc.jpg"
                alt="Car on a hydraulic lift undergoing repair"
                className="w-full h-full object-cover rounded-xl"
              />
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
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%", once: true }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: "Body Repair",
      icon: <Wrench size={18} />,
      desc: "Laser-guided chassis alignment and dent removal.",
      image: "https://res.cloudinary.com/dlgqnmuhd/image/upload/v1781501887/repair_jphioj.jpg",
    },
    {
      title: "Paint Services",
      icon: <Droplet size={18} />,
      desc: "Computerized color matching and clear-coat repair.",
      image: "https://res.cloudinary.com/dlgqnmuhd/image/upload/v1781502667/paint_ufzksz.jpg",
    },
    {
      title: "Mechanical",
      icon: <Settings size={18} />,
      desc: "Advanced engine diagnostics and repair.",
      image: "https://i.pinimg.com/736x/27/a0/b4/27a0b4ccdf8fd4986b9154dad244a8f0.jpg",
    },
    {
      title: "Maintenance",
      icon: <Calendar size={18} />,
      desc: "Comprehensive fluid, filter, and multi-point checks.",
      image: "https://i.pinimg.com/736x/d7/db/26/d7db2644cbb05d4d4383d2dcae63d127.jpg",
    },
    {
      title: "Genuine Parts",
      icon: <Shield size={18} />,
      desc: "100% OEM parts for durability and factory safety.",
      image: "https://res.cloudinary.com/dlgqnmuhd/image/upload/v1781501273/par_jebjdr.jpg",
    },
  ];

  return (
    <section ref={containerRef} className="py-16 md:py-20 bg-[#f8fafc] border-b border-neutral-200">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="mb-10 text-center md:text-left md:flex md:justify-between md:items-end">
          <div className="max-w-2xl">
            <span className="text-[#0056b3] uppercase tracking-wider text-xs font-bold mb-2 block">Premium Services</span>
            <h2 className="text-[#0c2340] text-3xl md:text-4xl font-bold tracking-tight uppercase">
              Our Services
            </h2>
            <div className="w-12 h-1 bg-[#e63946] mt-3 mx-auto md:mx-0" />
            <p className="text-neutral-600 text-sm mt-4 leading-relaxed max-w-xl mx-auto md:mx-0">
              From routine oil changes to complex structural repairs, our facility is equipped with dealership-level technology for every requirement.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[#0056b3] hover:text-[#0c2340] text-xs font-bold uppercase tracking-widest transition-colors"
            >
              View All Services <span>→</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {services.map((service, i) => (
            <div
              key={i}
              className="group bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col gsap-reveal-service"
            >
              {/* Image Header */}
              <div className="h-32 overflow-hidden relative bg-neutral-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content Box */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-[#0056b3]">
                    {service.icon}
                  </div>
                  <h3 className="text-[#0c2340] font-bold text-base leading-tight">
                    {service.title}
                  </h3>
                </div>

                <p className="text-neutral-600 text-xs leading-relaxed mb-4 flex-1">
                  {service.desc}
                </p>

                <Link
                  href="/services"
                  className="text-[#e63946] hover:text-[#c92a37] text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors mt-auto w-fit"
                >
                  Learn more <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
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
  const statsData = [
    { label: "Cars Serviced", value: 100, suffix: "K+" },
    { label: "Years Experience", value: 35, suffix: "+" },
    { label: "Certified Techs", value: 45, suffix: "+" },
    { label: "Satisfaction Rate", value: 98, suffix: "%" },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1920&q=80"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 img-overlay-dark" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {statsData.map((stat, i) => (
            <div key={i} className="space-y-2 py-4">
              <div className="text-3xl md:text-4xl text-white font-bold">
                <Counter end={stat.value} />
                {stat.suffix}
              </div>
              <p className="text-white/70 text-xs uppercase tracking-wider">
                {stat.label}
              </p>
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
        alt=""
        aria-hidden="true"
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
              <a href="tel:+919398328874">Call Now</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
