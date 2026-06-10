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
    <div className="min-h-screen bg-[#07111f] font-sans pb-32">
      {/* Header */}
      <section className="pt-36 pb-24 text-white relative border-b border-white/5 bg-[#07111f]">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "60px 60px" }}></div>
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <span className="text-accent font-bold tracking-widest uppercase text-xs mb-4 block">Reach Out</span>
          <h1 className="text-5xl md:text-6xl font-heading font-black mb-6 uppercase tracking-tight">Contact Us</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Have a question about your car? Need a repair estimate? Our team of experts is ready to help you.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Contact Info Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card neon-border p-10 rounded-3xl h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full blur-xl pointer-events-none"></div>
              
              <div className="flex items-center justify-between mb-10 relative z-10">
                <h2 className="text-2xl font-heading font-bold text-white">Get in Touch</h2>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${isOpen ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                  {isOpen ? "Currently Open" : "Currently Closed"}
                </div>
              </div>
              
              <div className="space-y-10 flex-grow relative z-10">
                <div className="flex items-start gap-5">
                  <div className="bg-accent/10 border border-accent/20 p-4 rounded-2xl text-accent shrink-0 headlight-glow-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white mb-2 font-heading">Visit Workshop</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      Excel Autocare<br />
                      123 Tech Park Road, Industrial Area<br />
                      Mumbai, India 400001
                    </p>
                    <Button variant="outline" size="sm" asChild className="rounded-full text-white border-white/20 hover:bg-white/10 hover:text-white text-xs font-bold uppercase tracking-wider">
                      <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                        <Navigation className="w-3 h-3" /> Get Directions
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-accent/10 border border-accent/20 p-4 rounded-2xl text-accent shrink-0 headlight-glow-sm">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white mb-2 font-heading">Call Us</h3>
                    <p className="text-muted-foreground text-sm mb-3">Immediate assistance available.</p>
                    <a href="tel:+919876543210" className="text-accent font-bold text-xl hover:text-white transition-colors tracking-widest">+91 98765 43210</a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-accent/10 border border-accent/20 p-4 rounded-2xl text-accent shrink-0 headlight-glow-sm">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div className="w-full">
                    <h3 className="font-bold text-lg text-white mb-3 font-heading">Operating Hours</h3>
                    <table className="w-full text-muted-foreground text-sm">
                      <tbody>
                        <tr className="border-b border-white/10">
                          <td className="py-3 font-bold text-slate-300">Mon - Sat</td>
                          <td className="py-3 text-right text-white">9:00 AM - 7:00 PM</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-bold text-slate-300">Sunday</td>
                          <td className="py-3 text-right text-white">10:00 AM - 3:00 PM</td>
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
            <div className="glass-card neon-border p-2 rounded-3xl h-full min-h-[600px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15082.351659978713!2d72.82772555!3d19.08182745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '1.25rem', minHeight: '600px', filter: 'invert(90%) hue-rotate(180deg)' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Action Bar (Mobile Only) */}
      <div className="fixed bottom-0 left-0 w-full glass-card border-t border-white/10 p-4 z-40 md:hidden flex gap-4 backdrop-blur-xl bg-[#07111f]/80">
        <Button size="lg" asChild className="flex-1 bg-white hover:bg-white/90 text-[#07111f] h-14 rounded-xl text-sm font-bold uppercase tracking-wider">
          <a href="tel:+919876543210"><Phone className="w-5 h-5 mr-2" /> Call</a>
        </Button>
        <Button size="lg" asChild className="flex-1 hover-beam bg-[#25D366] hover:bg-[#20bd5a] text-white h-14 rounded-xl text-sm font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(37,211,102,0.4)]">
          <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"><MessageCircle className="w-5 h-5 mr-2" /> WhatsApp</a>
        </Button>
      </div>
    </div>
  );
}
