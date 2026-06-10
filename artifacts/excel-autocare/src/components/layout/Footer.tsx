import { Link } from "wouter";
import { Phone, MapPin, Mail, Clock, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8 border-t-4 border-accent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-white text-primary p-2 rounded-md inline-block">
                <span className="font-bold text-xl tracking-tighter">EXCEL</span>
              </div>
              <span className="font-bold text-xl text-white">Autocare</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm mt-4 leading-relaxed">
              Your Trusted Maruti Suzuki Care Experts. Delivering mechanical precision and local trust with dealer-grade diagnostics and genuine spare parts.
            </p>
            <div className="flex items-center gap-2 text-accent mt-4">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-sm font-semibold text-white">Authorized Service Center</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">Our Services</Link>
              </li>
              <li>
                <Link href="/booking" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">Book a Service</Link>
              </li>
              <li>
                <Link href="/contact" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Our Services</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li>Periodic Maintenance</li>
              <li>Car Body Works</li>
              <li>Premium Paint Jobs</li>
              <li>Mechanical Workshop</li>
              <li>Genuine Spare Parts</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Info</h3>
            <ul className="space-y-4 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0" />
                <span>Excel Autocare, 123 Tech Park Road, Industrial Area, Mumbai, India 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <a href="tel:+919876543210" className="hover:text-accent transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-accent shrink-0" />
                <div>
                  <p>Mon-Sat: 9:00 AM - 7:00 PM</p>
                  <p>Sunday: 10:00 AM - 3:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-primary-foreground/20 text-center md:flex md:justify-between md:items-center">
          <p className="text-sm text-primary-foreground/60">
            &copy; {new Date().getFullYear()} Excel Autocare. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 space-x-4 text-sm text-primary-foreground/60">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
