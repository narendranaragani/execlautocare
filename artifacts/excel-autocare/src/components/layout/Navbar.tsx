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
      setIsScrolled(window.scrollY > 10);
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
          ? "bg-transparent border-transparent py-4" 
          : "bg-white/95 backdrop-blur-md shadow-sm border-b border-border py-2"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <span className={cn("font-bold text-xl tracking-tight transition-colors", transparent ? "text-white" : "text-primary")}>
                EXCEL
              </span>
              <span className={cn("font-bold text-xl hidden sm:inline-block transition-colors", transparent ? "text-white/90" : "text-accent")}>
                Autocare
              </span>
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
                    "text-sm font-semibold transition-colors relative py-2",
                    active ? (transparent ? "text-white" : "text-primary") : (transparent ? "text-white/80 hover:text-white" : "text-foreground/70 hover:text-primary")
                  )}
                >
                  {link.label}
                  {active && (
                    <span className={cn("absolute bottom-0 left-0 w-full h-0.5 rounded-full", transparent ? "bg-white" : "bg-accent")} />
                  )}
                </Link>
              );
            })}
            
            <div className={cn("flex items-center gap-6 ml-2 pl-6 border-l", transparent ? "border-white/20" : "border-border")}>
              <a href="tel:+919876543210" className={cn("flex items-center gap-2 transition-colors", transparent ? "text-white hover:text-white/80" : "text-primary hover:text-accent")}>
                <Phone className="w-4 h-4" />
                <span className="text-sm font-bold tracking-wide">+91 98765 43210</span>
              </a>
              <Button asChild className={cn("hover-beam font-semibold", transparent ? "bg-white text-primary hover:bg-white/90 shadow-lg" : "bg-primary text-white hover:bg-primary/90")}>
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
              className={transparent ? "text-white hover:bg-white/10" : "text-primary hover:bg-secondary"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "lg:hidden absolute top-full left-0 w-full bg-white border-b border-border shadow-md transition-all duration-300 overflow-hidden",
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
                  "block px-4 py-3 rounded-md text-sm font-semibold transition-colors",
                  active 
                    ? "bg-secondary text-primary border-l-2 border-accent" 
                    : "text-foreground/70 hover:bg-secondary hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="mt-6 pt-6 border-t border-border flex flex-col gap-4">
            <a href="tel:+919876543210" className="flex items-center justify-center gap-2 text-primary hover:text-accent transition-colors py-2">
              <Phone className="w-5 h-5 text-accent" />
              <span className="text-lg font-bold">+91 98765 43210</span>
            </a>
            <Button asChild size="lg" className="w-full hover-beam bg-primary hover:bg-primary/90 text-white font-bold">
              <Link href="/booking">Book Service Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
