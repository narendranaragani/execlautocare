import { useState, useEffect } from "react";
import { Link } from "wouter";
import { MapPin, Phone, Clock, MessageCircle, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    const day = new Date().getDay();
    // Mon-Sat (1-6) 9 AM to 7 PM (19), Sun (0) 10 AM to 3 PM (15)
    if (day === 0) {
      setIsOpen(hour >= 10 && hour < 15);
    } else {
      setIsOpen(hour >= 9 && hour < 19);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Header */}
      <section className="bg-primary pt-36 pb-24 text-white relative">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-primary-foreground/80 leading-relaxed">
            Have a question about your car? Need a repair estimate? Our team of experts is ready to help you.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Contact Info Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-border h-full flex flex-col">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-bold text-primary">Get in Touch</h2>
                <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {isOpen ? "Currently Open" : "Currently Closed"}
                </div>
              </div>
              
              <div className="space-y-10 flex-grow">
                <div className="flex items-start gap-5">
                  <div className="bg-accent/10 p-4 rounded-2xl text-accent shrink-0">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-primary mb-2">Visit Workshop</h3>
                    <p className="text-muted-foreground text-base leading-relaxed mb-4">
                      Excel Autocare<br />
                      123 Tech Park Road, Industrial Area<br />
                      Mumbai, India 400001
                    </p>
                    <Button variant="outline" size="sm" asChild className="rounded-full text-primary border-primary/20 hover:bg-primary/5">
                      <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                        <Navigation className="w-4 h-4" /> Get Directions
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-accent/10 p-4 rounded-2xl text-accent shrink-0">
                    <Phone className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-primary mb-2">Call Us</h3>
                    <p className="text-muted-foreground text-base mb-2">Immediate assistance available.</p>
                    <a href="tel:+919876543210" className="text-accent font-bold text-2xl hover:underline">+91 98765 43210</a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-accent/10 p-4 rounded-2xl text-accent shrink-0">
                    <Clock className="w-7 h-7" />
                  </div>
                  <div className="w-full">
                    <h3 className="font-bold text-xl text-primary mb-3">Operating Hours</h3>
                    <table className="w-full text-muted-foreground text-base">
                      <tbody>
                        <tr className="border-b border-slate-100">
                          <td className="py-2 font-medium text-slate-700">Mon - Sat</td>
                          <td className="py-2 text-right">9:00 AM - 7:00 PM</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium text-slate-700">Sunday</td>
                          <td className="py-2 text-right">10:00 AM - 3:00 PM</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Column */}
          <div className="lg:col-span-2">
            <div className="bg-white p-3 rounded-3xl shadow-lg border border-border h-full min-h-[600px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15082.351659978713!2d72.82772555!3d19.08182745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '1.25rem', minHeight: '600px' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Action Bar (Mobile Only) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-40 md:hidden flex gap-4">
        <Button size="lg" asChild className="flex-1 bg-primary hover:bg-primary/90 h-14 rounded-xl text-lg">
          <a href="tel:+919876543210"><Phone className="w-5 h-5 mr-2" /> Call</a>
        </Button>
        <Button size="lg" asChild className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white h-14 rounded-xl text-lg">
          <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"><MessageCircle className="w-5 h-5 mr-2" /> WhatsApp</a>
        </Button>
      </div>
    </div>
  );
}