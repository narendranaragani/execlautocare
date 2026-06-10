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
        transition={{ duration: 0.4, delay: 0.2 }}
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
      exit={{ x: "200%" }}
      transition={{ 
        duration: 0.6, 
        ease: [0.76, 0, 0.24, 1] 
      }}
      className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-primary"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
      }}
    >
      <div className="relative w-64 h-32 text-white flex items-center justify-center drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
        <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Sleek SUV silhouette */}
          <path d="M 50 140 L 40 100 C 40 100, 45 80, 70 70 L 120 60 C 130 50, 150 40, 180 40 L 260 40 C 290 40, 310 50, 320 70 L 360 90 C 370 100, 380 110, 380 140 Z" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
          <path d="M 40 100 L 380 100" stroke="currentColor" strokeWidth="4" opacity="0.3" />
          <path d="M 170 40 L 150 100" stroke="currentColor" strokeWidth="4" />
          <path d="M 260 40 L 270 100" stroke="currentColor" strokeWidth="4" />
          {/* Wheels */}
          <circle cx="100" cy="140" r="24" stroke="currentColor" strokeWidth="6" fill="#0c2340" />
          <circle cx="100" cy="140" r="10" fill="currentColor" />
          <circle cx="310" cy="140" r="24" stroke="currentColor" strokeWidth="6" fill="#0c2340" />
          <circle cx="310" cy="140" r="10" fill="currentColor" />
          {/* Motion lines */}
          <line x1="0" y1="80" x2="30" y2="80" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
          <line x1="10" y1="110" x2="25" y2="110" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.3"/>
          <line x1="-20" y1="130" x2="15" y2="130" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
        </svg>
      </div>
    </motion.div>
  );
}