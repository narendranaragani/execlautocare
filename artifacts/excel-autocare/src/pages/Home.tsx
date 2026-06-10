import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useGetStats, getGetStatsQueryKey } from "@workspace/api-client-react";

export function HeroTicker() {
  return (
    <div className="w-full bg-primary text-white py-3 overflow-hidden border-b border-accent/30 relative">
      <div className="flex whitespace-nowrap animate-ticker">
        <span className="text-sm font-medium mx-4 uppercase tracking-wider">Genuine Parts &bull;</span>
        <span className="text-sm font-medium mx-4 uppercase tracking-wider text-accent/80">Expert Mechanics &bull;</span>
        <span className="text-sm font-medium mx-4 uppercase tracking-wider">Transparent Pricing &bull;</span>
        <span className="text-sm font-medium mx-4 uppercase tracking-wider text-accent/80">Authorized Maruti Suzuki Center &bull;</span>
        <span className="text-sm font-medium mx-4 uppercase tracking-wider">Genuine Parts &bull;</span>
        <span className="text-sm font-medium mx-4 uppercase tracking-wider text-accent/80">Expert Mechanics &bull;</span>
        <span className="text-sm font-medium mx-4 uppercase tracking-wider">Transparent Pricing &bull;</span>
        <span className="text-sm font-medium mx-4 uppercase tracking-wider text-accent/80">Authorized Maruti Suzuki Center &bull;</span>
      </div>
    </div>
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
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
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
    <section className="py-20 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <h3 className="text-4xl md:text-5xl font-bold text-primary">
              <Counter end={displayStats.totalCarsServiced} />+
            </h3>
            <p className="text-muted-foreground font-medium">Cars Serviced</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl md:text-5xl font-bold text-primary">
              <Counter end={displayStats.yearsInOperation} />
            </h3>
            <p className="text-muted-foreground font-medium">Years Experience</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl md:text-5xl font-bold text-primary">
              <Counter end={displayStats.certifiedTechnicians} />
            </h3>
            <p className="text-muted-foreground font-medium">Certified Techs</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl md:text-5xl font-bold text-primary">
              <Counter end={displayStats.customerSatisfaction} />%
            </h3>
            <p className="text-muted-foreground font-medium">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Hero() {
  return (
    <>
      <HeroTicker />
      <section className="relative min-h-[80vh] flex items-center bg-slate-900 text-white overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-primary/95 z-0"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] z-0" 
          style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }}>
        </div>

        <div className="container relative z-10 px-4 py-20 mx-auto">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block bg-accent/20 border border-accent/50 text-accent-foreground px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6">
                Official Maruti Suzuki Authorized Workshop
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                Your Trusted <br/>
                <span className="text-accent">Maruti Suzuki</span> <br/>
                Care Experts
              </h1>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
                Mechanical precision meets local trust. Dealer-grade diagnostics, genuine spare parts, and showroom-quality paint jobs with the warmth of a neighborhood garage.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="hover-beam bg-accent hover:bg-accent/90 text-white px-8 h-14 text-lg">
                  <Link href="/booking">Book Service Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white/20 hover:bg-white/10 text-white h-14 px-8 text-lg">
                  <Link href="/services">Explore Services</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
