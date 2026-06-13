import { useState, useEffect } from "react";
import { MapPin, Phone, Clock, MessageCircle, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/layout/SEO";

const contactPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://excelautocare.in/contact/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://excelautocare.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Contact Us",
          "item": "https://excelautocare.in/contact"
        }
      ]
    },
    {
      "@type": "AutoRepair",
      "@id": "https://excelautocare.in/#autorepair",
      "name": "Excel Auto Care",
      "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
      "telephone": "+919398328874",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "11-10-825, 16-A-1, Raprathi nagar",
        "addressLocality": "Khammam",
        "addressRegion": "Telangana",
        "postalCode": "507001",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 17.2473,
        "longitude": 80.1514
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "19:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "opens": "10:00",
          "closes": "15:00"
        }
      ]
    }
  ]
};

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
    <div className="min-h-screen bg-white font-sans pb-24">
      <SEO
        title="Contact Us | Excel Auto Care Maruti Suzuki Workshop Location"
        description="Get in touch with Excel Auto Care. Contact our Maruti Suzuki authorized workshop in Khammam. View map directions, opening hours, phone number, and WhatsApp links."
        keywords="Maruti Suzuki service contact, car workshop address, car mechanic phone number, garage opening hours"
        canonicalUrl="https://excelautocare.in/contact"
        schemaMarkup={contactPageSchema}
      />
      {/* Header */}

      <section className="pt-32 pb-20 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80" alt="contact bg" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 img-overlay-dark" />
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <span className="text-white/60 uppercase tracking-widest text-xs font-medium mb-3 block">Reach Out</span>
          <h1 className="text-3xl md:text-4xl text-white mb-4">Contact Us</h1>
          <p className="text-sm text-white/80 leading-relaxed mx-auto max-w-xl">
            Have a question about your car? Need a repair estimate? Our team of experts is ready to help you.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Contact Info Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card border border-border p-8 rounded-2xl shadow-sm h-full flex flex-col relative overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl text-primary font-semibold">Get in Touch</h2>
                <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${isOpen ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                  {isOpen ? "Currently Open" : "Currently Closed"}
                </div>
              </div>
              
              <div className="space-y-8 flex-grow">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary p-3 rounded-full text-accent shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1 text-sm">Visit Workshop</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-3">
                      Excel Auto Care<br />
                      11-10-825, 16-A-1, Raprathi nagar<br />
                      Khammam, Telangana 507001
                    </p>
                    <Button variant="outline" size="sm" asChild className="rounded-md border-border text-primary hover:bg-secondary text-[11px] font-bold uppercase tracking-wider h-8">
                      <a href="https://maps.google.com/?q=Excel+Auto+Care+Raparthi+Nagar+Khammam" target="_blank" rel="noreferrer" className="flex items-center gap-1.5">
                        <Navigation size={12} /> Get Directions
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secondary p-3 rounded-full text-accent shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1 text-sm">Call Us</h3>
                    <p className="text-muted-foreground text-xs mb-2">Immediate assistance available.</p>
                    <a href="tel:+919398328874" className="text-primary font-bold text-base hover:text-accent transition-colors">+91 93983 28874</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secondary p-3 rounded-full text-accent shrink-0">
                    <Clock size={18} />
                  </div>
                  <div className="w-full">
                    <h3 className="font-semibold text-primary mb-2 text-sm">Operating Hours</h3>
                    <table className="w-full text-muted-foreground text-xs">
                      <tbody>
                        <tr className="border-b border-border">
                          <td className="py-2 font-medium">Mon - Sat</td>
                          <td className="py-2 text-right">9:00 AM - 7:00 PM</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Sunday</td>
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
            <div className="bg-card border border-border p-2 rounded-2xl h-full min-h-[500px] shadow-sm">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15215.811659978713!2d80.1417!3d17.2473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3520dfdfdf!2sKhammam%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '0.75rem', minHeight: '500px' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Action Bar (Mobile Only) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-border p-3 z-40 md:hidden flex gap-3 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <Button size="default" asChild className="flex-1 bg-secondary hover:bg-secondary/80 text-primary font-semibold">
          <a href="tel:+919398328874"><Phone size={16} className="mr-2" /> Call</a>
        </Button>
        <Button size="default" asChild className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold shadow-sm">
          <a href="https://wa.me/919398328874" target="_blank" rel="noreferrer"><MessageCircle size={16} className="mr-2" /> WhatsApp</a>
        </Button>
      </div>
    </div>
  );
}
