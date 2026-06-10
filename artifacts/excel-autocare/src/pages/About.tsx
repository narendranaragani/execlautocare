import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function About() {
  const timeline = [
    { year: "2012", title: "Foundation", desc: "Started as a small 2-bay workshop with a commitment to honest pricing." },
    { year: "2015", title: "Maruti Authorization", desc: "Became an official Maruti Suzuki Authorized Service Station." },
    { year: "2018", title: "Expansion", desc: "Upgraded to a 10-bay facility with state-of-the-art diagnostic equipment." },
    { year: "2023", title: "Premium Paint Booth", desc: "Added thermal baking booths for showroom-quality paint restoration." }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary py-24 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            Excel Autocare was born from a simple idea: that getting your car serviced shouldn't feel like a negotiation. We bring dealership-level technology to a neighborhood setting.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4 p-8 bg-secondary rounded-2xl service-card-lift">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 className="text-xl font-bold text-primary">Absolute Transparency</h3>
              <p className="text-muted-foreground leading-relaxed">We show you the replaced parts. We explain the bill. No hidden charges, ever.</p>
            </div>
            <div className="space-y-4 p-8 bg-secondary rounded-2xl service-card-lift">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <h3 className="text-xl font-bold text-primary">Genuine Parts Only</h3>
              <p className="text-muted-foreground leading-relaxed">100% Maruti Suzuki Genuine Parts (MGP). Your factory warranty stays completely intact.</p>
            </div>
            <div className="space-y-4 p-8 bg-secondary rounded-2xl service-card-lift">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              </div>
              <h3 className="text-xl font-bold text-primary">Technical Mastery</h3>
              <p className="text-muted-foreground leading-relaxed">Our mechanics are continuously trained on the latest Maruti Suzuki diagnostic protocols.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-primary text-center mb-16">A Decade of Excellence</h2>
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                key={item.year} 
                className={`flex flex-col md:flex-row gap-6 md:gap-12 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={`md:w-1/2 flex ${index % 2 !== 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                  <div className="text-4xl font-bold text-accent">{item.year}</div>
                </div>
                <div className="hidden md:flex w-4 h-4 bg-primary rounded-full relative z-10 ring-4 ring-white"></div>
                <div className="md:w-1/2 p-6 bg-white rounded-2xl shadow-sm border border-border">
                  <h4 className="text-xl font-bold text-primary mb-2">{item.title}</h4>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-6">Experience the Difference</h2>
          <Button size="lg" asChild className="hover-beam bg-accent hover:bg-accent/90 text-white">
            <Link href="/booking">Book Your Next Service</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
