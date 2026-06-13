import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Home, Users, Layers, CalendarCheck, Mail } from "lucide-react";
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
            {/* Left side: Excel Autocare Logo */}
            <div className="flex items-center lg:flex-1 lg:justify-start lg:min-w-[240px]">
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

            {/* Desktop Navigation Links (Middle) */}
            <nav className="hidden lg:flex items-center justify-center gap-8 lg:flex-1">
              {navLinks.map((link) => {
                const active = location === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-sm font-semibold transition-colors relative py-2 whitespace-nowrap",
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
            </nav>

            {/* Right side: Maruti Suzuki / NEXA Image */}
            <div className="flex items-center justify-end lg:flex-1 lg:min-w-[240px]">
              <div className="flex flex-col items-center">
                <img
                  src="/mr.png"
                  alt="Maruti Suzuki Nexa"
                  className={cn(
                    "h-10 md:h-10 w-auto object-contain transition-all duration-300",
                    transparent && "brightness-0 invert"
                  )}
                />
              </div>
            </div>
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
