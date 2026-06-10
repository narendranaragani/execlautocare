import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/booking", label: "Book a Service" },
    { href: "/contact", label: "Contact" },
  ];

  const transparent = !isScrolled;

  return (
    <header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        transparent 
          ? "bg-transparent border-transparent py-4" 
          : "bg-[#07111f]/95 backdrop-blur-xl border-b border-accent/20 py-2"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-accent text-white p-2 rounded-md transition-colors shadow-[0_0_15px_rgba(0,163,255,0.4)]">
                <span className="font-bold text-xl tracking-tighter">EXCEL</span>
              </div>
              <span className="font-bold text-xl hidden sm:inline-block text-white">Autocare</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = location === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={cn(
                    "text-sm font-semibold transition-colors hover:text-accent relative py-2 uppercase tracking-wide",
                    active ? "text-accent" : "text-white/80"
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full shadow-[0_0_8px_rgba(0,163,255,0.8)]" />
                  )}
                </Link>
              );
            })}
            
            <div className="flex items-center gap-6 ml-2 pl-6 border-l border-white/10">
              <a href="tel:+919876543210" className="flex items-center gap-2 text-white hover:text-accent transition-colors">
                <div className="bg-accent/20 p-2 rounded-full headlight-glow-sm">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <span className="text-sm font-bold tracking-wider">+91 98765 43210</span>
              </a>
              <Button asChild className="hover-beam bg-accent pulse-glow hover:bg-accent/90 text-white rounded-md px-6 font-bold uppercase tracking-wide text-xs h-11">
                <Link href="/booking">Book Service</Link>
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              className="text-white hover:bg-white/10"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "lg:hidden absolute top-full left-0 w-full bg-[#07111f] border-b border-accent/20 shadow-2xl transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="space-y-1 px-4 pb-6 pt-2">
          {navLinks.map((link) => {
            const active = location === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-4 py-3 rounded-md text-sm font-bold tracking-wide uppercase transition-colors",
                  active 
                    ? "bg-accent/10 text-accent border-l-2 border-accent" 
                    : "text-white/80 hover:bg-white/5 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-4">
            <a href="tel:+919876543210" className="flex items-center justify-center gap-2 text-white hover:text-accent transition-colors py-2">
              <Phone className="w-5 h-5 text-accent" />
              <span className="text-lg font-bold tracking-wider">+91 98765 43210</span>
            </a>
            <Button asChild size="lg" className="w-full hover-beam pulse-glow bg-accent hover:bg-accent/90 text-white font-bold uppercase tracking-wide">
              <Link href="/booking">Book Service Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
