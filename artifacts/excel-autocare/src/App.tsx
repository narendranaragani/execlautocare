import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";

import HomePage from "@/pages/HomePage";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import Booking from "@/pages/Booking";

const queryClient = new QueryClient();

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...props}>
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.488 1.449 5.421 1.45 5.539 0 10.047-4.496 10.05-10.039.002-2.684-1.04-5.207-2.93-7.098C17.299 1.577 14.78 1.535 12.01 1.535c-5.54 0-10.046 4.498-10.05 10.043-.001 1.93.504 3.812 1.465 5.416l-.999 3.65 3.734-.978zm11.238-6.938c-.3-.15-1.772-.875-2.046-.975-.276-.1-.476-.15-.676.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-1.045-.525-1.815-1.1-2.545-2.355-.18-.3-.18-.6-.48-.9.3-.35.65-.75.8-1 .15-.25.075-.475-.038-.725-.112-.25-.975-2.35-1.338-3.225-.353-.85-.712-.734-.975-.75-.25-.013-.538-.014-.825-.014-.288 0-.75.108-1.137.525-.388.412-1.488 1.45-1.488 3.533 0 2.083 1.525 4.1 1.738 4.387.212.287 3.013 4.6 7.3 6.45 1.02.44 1.815.7 2.438.897 1.025.325 1.956.28 2.694.17.825-.125 1.772-.725 2.022-1.387.25-.662.25-1.225.175-1.388-.075-.162-.275-.262-.575-.412z" />
    </svg>
  );
}

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    // Reset window scroll position to the top on every route change
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PageTransition locationKey={location}>
          <Switch location={location}>
            <Route path="/" component={HomePage} />
            <Route path="/about" component={About} />
            <Route path="/services" component={Services} />
            <Route path="/booking" component={Booking} />
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </PageTransition>
      </main>
      <Footer />
      
      {/* Floating WhatsApp Chat Button */}
      <a
        href="https://wa.me/919398328874"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-20 right-6 lg:bottom-8 lg:right-8 z-40 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:bg-[#20bd5a] hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7" />
        
        {/* Tooltip */}
        <span className="absolute right-16 scale-0 group-hover:scale-100 transition-all duration-200 origin-right bg-[#0c2340] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap">
          Chat with us
        </span>
        
        {/* Pulsing effect */}
        <span className="absolute inset-0 rounded-full border border-[#25D366] animate-ping opacity-75 pointer-events-none" />
      </a>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
