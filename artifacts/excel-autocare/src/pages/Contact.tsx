import { useState } from "react";
import { Link } from "wouter";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <section className="bg-primary py-24 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            Have a question about your car? Need an estimate? Our team is ready to help.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-10">
        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border h-full">
              <h2 className="text-2xl font-bold text-primary mb-8">Get in Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-full text-accent shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-1">Visit Workshop</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Excel Autocare<br />
                      123 Tech Park Road, Industrial Area<br />
                      Mumbai, India 400001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-full text-accent shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-1">Call Us</h3>
                    <p className="text-muted-foreground text-sm mb-3">Immediate assistance available.</p>
                    <a href="tel:+919876543210" className="text-accent font-semibold hover:underline block text-lg">+91 98765 43210</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-full text-accent shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-1">Operating Hours</h3>
                    <div className="text-muted-foreground text-sm space-y-1">
                      <p className="flex justify-between"><span className="font-medium text-primary">Mon - Sat:</span> 9:00 AM - 7:00 PM</p>
                      <p className="flex justify-between"><span className="font-medium text-primary">Sunday:</span> 10:00 AM - 3:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-border">
                <Button className="w-full hover-beam bg-[#25D366] hover:bg-[#20bd5a] text-white" asChild>
                  <a href="https://wa.me/919876543210?text=Hi,%20I'd%20like%20to%20book%20a%20service" target="_blank" rel="noreferrer">
                    Message on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-border h-full min-h-[500px]">
              {/* Google Maps Embed */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15082.351659978713!2d72.82772555!3d19.08182745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
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
    </div>
  );
}
