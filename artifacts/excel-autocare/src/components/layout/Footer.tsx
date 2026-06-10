import { Link } from "wouter";
import { Phone, MapPin, Clock, ShieldCheck, ArrowUp, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07111f] text-white pt-24 pb-10 border-t border-accent/30 relative overflow-hidden font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2 group inline-flex">
              <div className="bg-accent text-white p-2.5 rounded-lg shadow-[0_0_15px_rgba(0,163,255,0.3)]">
                <span className="font-bold text-2xl tracking-tighter">EXCEL</span>
              </div>
              <span className="font-bold text-2xl text-white group-hover:text-accent transition-colors">Autocare</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Your Trusted Maruti Suzuki Care Experts. Delivering mechanical precision and local trust with dealer-grade diagnostics and genuine spare parts.
            </p>
            <div className="inline-flex items-center gap-3 glass-card-blue neon-border px-4 py-3 rounded-xl mt-2">
              <ShieldCheck className="h-5 w-5 text-accent" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-white">Authorized Service Center</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold mb-6 text-white uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Our Services', 'Book a Service', 'Contact Us'].map((item, i) => (
                <li key={i}>
                  <Link href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/ /g, '-').replace('our-', '').replace('a-', '')}`} 
                        className="text-muted-foreground hover:text-accent transition-colors text-sm font-medium flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-accent/50 group-hover:bg-accent transition-colors"></span> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold mb-6 text-white uppercase tracking-widest">Premium Services</h3>
            <ul className="space-y-4 text-sm font-medium text-muted-foreground">
              {['Periodic Maintenance', 'Car Body Works', 'Premium Paint Jobs', 'Mechanical Workshop', 'Genuine Spare Parts'].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-white/20"></span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold mb-6 text-white uppercase tracking-widest">Contact Info</h3>
            <ul className="space-y-6 text-sm text-muted-foreground font-medium">
              <li className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="leading-relaxed">Excel Autocare, 123 Tech Park Road, Industrial Area, Mumbai 400001</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors text-lg font-bold text-white tracking-wider">+91 98765 43210</a>
              </li>
              <li className="flex items-start gap-4">
                <Clock className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="flex justify-between w-40"><span className="text-slate-400">Mon-Sat</span> <span className="text-white">9AM - 7PM</span></p>
                  <p className="flex justify-between w-40"><span className="text-slate-400">Sunday</span> <span className="text-white">10AM - 3PM</span></p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            &copy; {new Date().getFullYear()} Excel Autocare. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:bg-accent hover:border-accent hover:text-white transition-all">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:bg-accent hover:border-accent hover:text-white transition-all">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:bg-accent hover:border-accent hover:text-white transition-all">
              <Youtube className="w-4 h-4" />
            </a>
          </div>

          <div className="flex gap-6 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <Button 
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full pulse-glow bg-accent hover:bg-accent/90 shadow-[0_0_20px_rgba(0,163,255,0.4)] hidden md:flex items-center justify-center text-white z-50 p-0"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
    </footer>
  );
}
