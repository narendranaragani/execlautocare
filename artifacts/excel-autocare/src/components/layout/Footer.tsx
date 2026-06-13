import { Link } from "wouter";
import { Phone, MapPin, Clock, ShieldCheck, Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-8 border-t border-primary relative overflow-hidden font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          
          {/* Brand */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-2 group inline-flex">
              <span className="font-bold text-2xl tracking-tight text-white">EXCEL</span>
              <span className="font-bold text-2xl text-white/80 group-hover:text-white transition-colors">Autocare</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Your Trusted Maruti Suzuki Care Experts. Delivering mechanical precision and local trust with dealer-grade diagnostics and genuine spare parts.
            </p>
            <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-3 py-2 rounded-lg mt-2">
              <ShieldCheck className="h-4 w-4 text-white/80" />
              <span className="text-[10px] font-semibold tracking-wider uppercase text-white/90">Authorized Service Center</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="hidden md:block lg:col-span-2">
            <h3 className="text-xs font-semibold mb-5 text-white/90 uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Our Services', 'Book a Service', 'Contact Us'].map((item, i) => (
                <li key={i}>
                  <Link href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/ /g, '-').replace('our-', '').replace('a-', '')}`} 
                        className="text-white/60 hover:text-white transition-colors text-sm font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="hidden md:block lg:col-span-3">
            <h3 className="text-xs font-semibold mb-5 text-white/90 uppercase tracking-widest">Premium Services</h3>
            <ul className="space-y-3 text-sm font-medium text-white/60">
              {['Periodic Maintenance', 'Car Body Works', 'Premium Paint Jobs', 'Mechanical Workshop', 'Genuine Spare Parts'].map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>


          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold mb-5 text-white/90 uppercase tracking-widest">Contact Info</h3>
            <ul className="space-y-4 text-sm text-white/60 font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-white/40 shrink-0 mt-0.5" />
                <span className="leading-relaxed">Excel Autocare, 11-10-825, 16-A-1, Raprathi nagar, Khammam, Telangana 507001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-white/40 shrink-0" />
                <a href="tel:+919398328874" className="hover:text-white transition-colors">+91 93983 28874</a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-white/40 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="flex justify-between w-40"><span>Mon-Sat</span> <span>9AM - 7PM</span></p>
                  <p className="flex justify-between w-40"><span>Sunday</span> <span>10AM - 3PM</span></p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-medium text-white/40">
            &copy; {new Date().getFullYear()} Excel Autocare. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-2">
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-colors">
              <Facebook size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-colors">
              <Instagram size={14} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-colors">
              <Youtube size={14} />
            </a>
          </div>

          <div className="flex gap-4 text-xs font-medium text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
