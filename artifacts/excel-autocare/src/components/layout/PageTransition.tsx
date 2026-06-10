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
        transition={{ duration: 0.3, delay: 0.55 }}
      >
        <CarTransitionMask key={"mask-" + locationKey} />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function CarTransitionMask() {
  return (
    <motion.div
      initial={{ x: "-105%" }}
      animate={{ x: "105%" }}
      exit={{ x: "105%" }}
      transition={{ 
        duration: 0.7, 
        ease: [0.76, 0, 0.24, 1] 
      }}
      className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-[#07111f]"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/20 rounded-full blur-[100px]"></div>
      
      <div className="relative w-full max-w-4xl h-[300px] flex items-center justify-center">
        
        {/* Speed lines (left of car) */}
        <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-48 h-[180px]">
          <svg viewBox="0 0 100 180" className="w-full h-full text-accent">
            <line x1="0" y1="100" x2="45" y2="100" stroke="currentColor" strokeWidth="3" opacity="0.5" className="speed-line"/>
            <line x1="10" y1="120" x2="40" y2="120" stroke="currentColor" strokeWidth="2" opacity="0.35" className="speed-line"/>
            <line x1="0" y1="140" x2="35" y2="140" stroke="currentColor" strokeWidth="2.5" opacity="0.4" className="speed-line"/>
            <line x1="15" y1="160" x2="50" y2="160" stroke="currentColor" strokeWidth="2" opacity="0.3" className="speed-line"/>
            <line x1="5" y1="80" x2="30" y2="80" stroke="currentColor" strokeWidth="2" opacity="0.25" className="speed-line"/>
          </svg>
        </div>

        {/* The Car */}
        <div className="relative z-10 w-[500px] h-[220px]" style={{ filter: "blur(1px) drop-shadow(0 0 10px rgba(0,163,255,0.3))" }}>
          <svg viewBox="0 0 500 220" className="w-full h-full text-white">
            {/* Body outline */}
            <path d="M 60 165 L 55 120 C 55 110, 70 90, 100 78 L 160 60 C 175 45, 200 38, 235 38 L 310 38 C 345 38, 365 48, 380 65 L 430 105 C 445 115, 455 130, 455 165 Z" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" fill="none"/>
            {/* Windshield */}
            <path d="M 160 60 L 145 120" stroke="currentColor" strokeWidth="3.5" opacity="0.7"/>
            {/* Rear window */}
            <path d="M 310 38 L 325 110" stroke="currentColor" strokeWidth="3.5" opacity="0.7"/>
            {/* Door line */}
            <line x1="220" y1="42" x2="210" y2="120" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
            {/* Roof rack detail */}
            <line x1="175" y1="42" x2="305" y2="40" stroke="currentColor" strokeWidth="2" opacity="0.5"/>

            {/* Rear Wheel Group */}
            <motion.g 
              className="wheel-spin" 
              style={{ transformOrigin: '120px 170px' }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
            >
              <circle cx="120" cy="170" r="35" stroke="currentColor" strokeWidth="5" fill="#07111f"/>
              <circle cx="120" cy="170" r="14" fill="currentColor"/>
              <line x1="120" y1="135" x2="120" y2="205" stroke="currentColor" strokeWidth="3" opacity="0.5" />
              <line x1="85" y1="170" x2="155" y2="170" stroke="currentColor" strokeWidth="3" opacity="0.5" />
            </motion.g>

            {/* Front Wheel Group */}
            <motion.g 
              className="wheel-spin" 
              style={{ transformOrigin: '390px 170px' }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
            >
              <circle cx="390" cy="170" r="35" stroke="currentColor" strokeWidth="5" fill="#07111f"/>
              <circle cx="390" cy="170" r="14" fill="currentColor"/>
              <line x1="390" y1="135" x2="390" y2="205" stroke="currentColor" strokeWidth="3" opacity="0.5" />
              <line x1="355" y1="170" x2="425" y2="170" stroke="currentColor" strokeWidth="3" opacity="0.5" />
            </motion.g>
            
            {/* Headlight element */}
            <ellipse cx="450" cy="150" rx="8" ry="6" fill="#00a3ff" className="headlight-glow" />
          </svg>
        </div>

        {/* Headlight cone (right of car) */}
        <div className="absolute right-[5%] top-[130px] w-64 h-24 bg-[radial-gradient(ellipse_at_left,_rgba(0,163,255,0.8)_0%,_transparent_70%)] opacity-80 mix-blend-screen pointer-events-none transform -translate-y-1/2"></div>
      </div>
    </motion.div>
  );
}
