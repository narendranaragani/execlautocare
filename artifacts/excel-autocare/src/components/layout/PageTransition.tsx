import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CarSpinner() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white shadow-md rounded-full px-4 py-2 flex items-center gap-2 border border-border">
      <div className="w-[90px] h-[40px] relative overflow-hidden">
        <svg viewBox="0 0 100 50" className="w-full h-full car-bounce">
          {/* Car Body */}
          <path d="M 15 38 L 12 25 C 12 20, 20 12, 35 10 L 55 10 C 65 10, 75 18, 80 25 L 85 30 C 90 32, 95 35, 95 38 Z" stroke="#2d5491" strokeWidth="3" fill="none" strokeLinejoin="round" />
          <path d="M 35 10 L 30 25 M 55 10 L 60 25" stroke="#2d5491" strokeWidth="2" fill="none" />
          <line x1="10" y1="38" x2="95" y2="38" stroke="#2d5491" strokeWidth="2" strokeDasharray="4 2" className="opacity-50" />
          
          {/* Wheels */}
          <g className="wheel-spin-sm" style={{ transformOrigin: '25px 38px' }}>
            <circle cx="25" cy="38" r="9" fill="white" stroke="#2d5491" strokeWidth="2.5" />
            <circle cx="25" cy="38" r="3" fill="#2d5491" />
            <line x1="25" y1="29" x2="25" y2="47" stroke="#2d5491" strokeWidth="1.5" />
            <line x1="16" y1="38" x2="34" y2="38" stroke="#2d5491" strokeWidth="1.5" />
          </g>
          <g className="wheel-spin-sm" style={{ transformOrigin: '75px 38px' }}>
            <circle cx="75" cy="38" r="9" fill="white" stroke="#2d5491" strokeWidth="2.5" />
            <circle cx="75" cy="38" r="3" fill="#2d5491" />
            <line x1="75" y1="29" x2="75" y2="47" stroke="#2d5491" strokeWidth="1.5" />
            <line x1="66" y1="38" x2="84" y2="38" stroke="#2d5491" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
      <span className="text-muted-foreground text-xs font-medium">Loading...</span>
    </div>
  );
}

export function PageTransition({ children, locationKey }: { children: React.ReactNode, locationKey: string }) {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait" onExitComplete={() => setLoading(false)}>
        <motion.div
          key={locationKey}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1], delay: 0.25 }}
          onAnimationStart={(definition) => {
            if (definition === "exit") setLoading(true);
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="z-[100]">
            <CarSpinner />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
