import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Phone, Home, Users, Layers, CalendarCheck, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Add padding to body for mobile bottom nav to prevent content from being hidden
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        document.body.style.paddingBottom = '4rem';
      } else {
        document.body.style.paddingBottom = '0px';
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.paddingBottom = '0px';
    };
  }, []);

  const navLinks = [
    { href: "/", label: "Home", mobileLabel: "Home", icon: Home },
    { href: "/about", label: "About Us", mobileLabel: "About", icon: Users },
    { href: "/services", label: "Services", mobileLabel: "Services", icon: Layers },
    { href: "/booking", label: "Book a Service", mobileLabel: "Book", icon: CalendarCheck },
    { href: "/contact", label: "Contact", mobileLabel: "Contact", icon: Mail },
  ];

  const isHeroPage = location === "/";
  const transparent = isHeroPage && !isScrolled;

  return (
    <>
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
                <img
                  src="/logo.png"
                  alt="Excel Autocare"
                  className={cn(
                    "h-25 mt-4 w-auto object-contain transition-all duration-300",
                    transparent && "brightness-0 invert"
                  )}
                />
              </Link>
            </div>

            {/* Mobile Actions (Visible on mobile/tablet only) */}
            <div className="flex lg:hidden items-center gap-3">
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={cn(
                  "p-2 rounded-full transition-colors flex items-center justify-center", 
                  transparent ? "text-white hover:bg-white/10" : "text-[#25D366] hover:bg-emerald-50"
                )}
                aria-label="Chat on WhatsApp"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 2.022 14.1 1 11.993 1 6.558 1 2.13 5.371 2.127 10.8c-.001 1.714.453 3.39 1.317 4.888L2.435 20.5l5.03-1.317c-.208.113-.538.286-.818.171z" />
                  <path d="M17.387 14.16c-.29-.145-1.72-.848-1.986-.944-.266-.097-.46-.145-.654.145-.193.29-.75.944-.919 1.138-.17.194-.339.218-.63.073-.29-.145-1.223-.45-2.33-1.437-.86-.767-1.44-1.716-1.61-2.006-.17-.29-.018-.446.127-.59.13-.13.29-.339.436-.508.145-.17.194-.29.29-.484.097-.193.048-.363-.024-.508-.073-.145-.654-1.573-.896-2.153-.235-.568-.475-.49-.654-.49-.17 0-.363-.024-.556-.024-.193 0-.508.073-.774.363-.266.29-1.016.992-1.016 2.42 0 1.427 1.04 2.809 1.185 3.002.145.193 2.046 3.125 4.957 4.38.692.298 1.233.477 1.655.61.696.222 1.329.19 1.83.115.558-.084 1.72-.702 1.962-1.38.242-.678.242-1.258.17-1.38-.072-.122-.266-.194-.556-.34z" />
                </svg>
              </a>
              <Button asChild size="sm" className={cn("hover-beam font-semibold text-xs py-1.5 px-3 rounded-lg shadow-sm border-0", transparent ? "bg-white text-primary hover:bg-white/90" : "bg-primary text-white hover:bg-primary/90")}>
                <Link href="/booking">Book Now</Link>
              </Button>
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
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-border shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          {navLinks.map((link) => {
            const active = location === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "inline-flex flex-col items-center justify-center px-1 transition-colors",
                  active ? "text-primary" : "text-foreground/60 hover:bg-secondary/50 hover:text-foreground"
                )}
              >
                <Icon className={cn("w-6 h-6 mb-1 transition-all", active && "scale-110")} strokeWidth={active ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{link.mobileLabel}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
