import { Link } from "wouter";
import { Phone, MapPin, Clock, ShieldCheck, ArrowUp, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08182b] text-white pt-20 pb-10 border-t-4 border-accent relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2 group inline-flex">
              <div className="bg-white text-primary p-2.5 rounded-lg">
                <span className="font-bold text-2xl tracking-tighter">EXCEL</span>
              </div>
              <span className="font-bold text-2xl text-white group-hover:text-accent transition-colors">Autocare</span>
            </Link>
            <p className="text-slate-400 text-base leading-relaxed max-w-sm">
              Your Trusted Maruti Suzuki Care Experts. Delivering mechanical precision and local trust with dealer-grade diagnostics and genuine spare parts.
            </p>
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl mt-2">
              <ShieldCheck className="h-6 w-6 text-accent" />
              <span className="text-sm font-bold tracking-wide uppercase">Authorized Service Center</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-6 text-white tracking-wide">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Our Services', 'Book a Service', 'Contact Us'].map((item, i) => (
                <li key={i}>
                  <Link href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/ /g, '-').replace('our-', '').replace('a-', '')}`} 
                        className="text-slate-400 hover:text-accent transition-colors text-base font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50"></span> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-xl font-bold mb-6 text-white tracking-wide">Premium Services</h3>
            <ul className="space-y-4 text-base font-medium text-slate-400">
              {['Periodic Maintenance', 'Car Body Works', 'Premium Paint Jobs', 'Mechanical Workshop', 'Genuine Spare Parts'].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/50"></span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-xl font-bold mb-6 text-white tracking-wide">Contact Info</h3>
            <ul className="space-y-5 text-base text-slate-400 font-medium">
              <li className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-accent shrink-0" />
                <span className="leading-relaxed">Excel Autocare, 123 Tech Park Road, Industrial Area, Mumbai 400001</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-accent shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors text-lg font-bold text-white">+91 98765 43210</a>
              </li>
              <li className="flex items-start gap-4">
                <Clock className="h-6 w-6 text-accent shrink-0" />
                <div className="space-y-1">
                  <p>Mon-Sat: <span className="text-white">9:00 AM - 7:00 PM</span></p>
                  <p>Sunday: <span className="text-white">10:00 AM - 3:00 PM</span></p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-medium text-slate-500">
            &copy; {new Date().getFullYear()} Excel Autocare. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-accent hover:text-white transition-all">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-accent hover:text-white transition-all">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-accent hover:text-white transition-all">
              <Youtube className="w-5 h-5" />
            </a>
          </div>

          <div className="flex gap-6 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <Button 
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-accent hover:bg-accent/90 shadow-xl hidden md:flex items-center justify-center text-white z-50 p-0 border-2 border-white/20"
        aria-label="Back to top"
      >
        <ArrowUp className="w-6 h-6" />
      </Button>
    </footer>
  );
}