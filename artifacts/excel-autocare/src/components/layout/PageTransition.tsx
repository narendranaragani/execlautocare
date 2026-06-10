import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export function PageTransition({ children, locationKey }: { children: React.ReactNode, locationKey: string }) {
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={locationKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CarTransitionMask key={`mask-${locationKey}`} />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function CarTransitionMask() {
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: "200%" }}
      exit={{ x: "200%" }} // Already offscreen on exit
      transition={{ 
        duration: 0.8, 
        ease: "easeInOut" 
      }}
      className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-primary"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
      }}
    >
      <svg 
        width="200" 
        height="80" 
        viewBox="0 0 200 80" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
      >
        {/* Simple Car Silhouette */}
        <path d="M 20 60 L 20 40 L 40 25 L 100 25 L 140 40 L 180 40 L 180 60 Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
        <circle cx="50" cy="60" r="12" fill="currentColor" />
        <circle cx="150" cy="60" r="12" fill="currentColor" />
        {/* Motion lines */}
        <line x1="0" y1="40" x2="10" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        <line x1="5" y1="50" x2="15" y2="50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
      </svg>
    </motion.div>
  );
}
