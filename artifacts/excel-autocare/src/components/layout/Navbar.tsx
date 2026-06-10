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

  const isHeroPage = location === "/";
  const transparent = isHeroPage && !isScrolled;

  return (
    <header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        transparent 
          ? "bg-transparent border-transparent py-2" 
          : "bg-primary/95 backdrop-blur-md border-b border-white/10 py-0"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary text-white p-2 rounded-md border border-white/20 group-hover:bg-accent transition-colors">
                <span className="font-bold text-xl tracking-tighter">EXCEL</span>
              </div>
              <span className={cn(
                "font-bold text-xl hidden sm:inline-block transition-colors",
                transparent ? "text-white" : "text-white"
              )}>Autocare</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = location === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-accent relative py-2",
                    transparent ? "text-white/90 hover:text-white" : "text-white/80 hover:text-white",
                    active && "text-white"
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full" />
                  )}
                </Link>
              );
            })}
            
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/20">
              <a href="tel:+919876543210" className="flex items-center gap-2 text-white hover:text-accent transition-colors">
                <div className="bg-accent/20 p-2 rounded-full">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold">+91 98765 43210</span>
              </a>
              <Button asChild className="hover-beam bg-accent hover:bg-accent/90 text-white rounded-md px-6 shadow-[0_0_20px_rgba(0,86,179,0.3)]">
                <Link href="/booking">Book Service Now</Link>
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
              className={cn(transparent ? "text-white hover:bg-white/10" : "text-white hover:bg-white/10")}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "lg:hidden absolute top-full left-0 w-full bg-primary border-b border-white/10 shadow-2xl transition-all duration-300 overflow-hidden",
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
                  "block px-4 py-3 rounded-md text-base font-medium transition-colors",
                  active 
                    ? "bg-accent/20 text-white border-l-4 border-accent" 
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
              <span className="text-lg font-bold">+91 98765 43210</span>
            </a>
            <Button asChild size="lg" className="w-full hover-beam bg-accent hover:bg-accent/90 text-white shadow-[0_0_20px_rgba(0,86,179,0.3)]">
              <Link href="/booking">Book Service Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}