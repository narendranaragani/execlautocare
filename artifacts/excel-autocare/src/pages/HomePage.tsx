import { useGetStats } from "@workspace/api-client-react";
import { Hero, Stats } from "./Home"; // using the previously defined ones
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Stats />
      
      {/* Featured Services Teaser */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Complete Car Care</h2>
            <p className="text-muted-foreground text-lg">Everything your Maruti Suzuki needs to keep running like new.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-border rounded-xl p-8 bg-slate-50 service-card-lift">
              <h3 className="text-xl font-bold text-primary mb-3">Periodic Maintenance</h3>
              <p className="text-muted-foreground mb-6">Comprehensive multi-point checks, fluid top-ups, and filter replacements.</p>
              <Link href="/services" className="text-accent font-semibold hover:underline">Learn more &rarr;</Link>
            </div>
            <div className="border border-border rounded-xl p-8 bg-slate-50 service-card-lift">
              <h3 className="text-xl font-bold text-primary mb-3">Denting & Painting</h3>
              <p className="text-muted-foreground mb-6">Laser-guided chassis alignment and computerized color matching.</p>
              <Link href="/services" className="text-accent font-semibold hover:underline">Learn more &rarr;</Link>
            </div>
            <div className="border border-border rounded-xl p-8 bg-slate-50 service-card-lift">
              <h3 className="text-xl font-bold text-primary mb-3">Mechanical Repairs</h3>
              <p className="text-muted-foreground mb-6">Advanced engine diagnostics and authentic Maruti spare parts.</p>
              <Link href="/services" className="text-accent font-semibold hover:underline">Learn more &rarr;</Link>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="outline" asChild size="lg" className="border-primary text-primary hover:bg-primary/5">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
