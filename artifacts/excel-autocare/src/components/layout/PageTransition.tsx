import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function MiniCarLoader() {
  return (
    <>
      <style>{`
        .blur-backdrop {
            position: fixed;
            inset: 0;
            z-index: 100;
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            pointer-events: none;
        }
        .mini-loader-wrapper {
            position: fixed;
            inset: 0;
            z-index: 101;
            display: flex;
            justify-content: center;
            align-items: center;
            pointer-events: none;
            mix-blend-mode: difference;
        }
        .mini-loader {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .loader-track {
            position: relative;
            width: 160px;
            height: 40px;
            overflow: hidden;
        }
        .loader-track::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 1.5px;
            background: rgba(255, 255, 255, 0.5);
            bottom: 6px;
        }
        .loader-car {
            position: absolute;
            left: -30px;
            bottom: 10px;
            color: white;
            font-size: 22px;
            animation: carMove 0.8s linear infinite;
        }
        @keyframes carMove {
            0% { left: -30px; opacity: 0; }
            15% { opacity: 1; }
            50% { transform: translateY(-2px); }
            100% { left: 140px; opacity: 0; }
        }
        .loader-text {
            margin-top: 8px;
            color: white;
            font-size: 12px;
            letter-spacing: 2px;
            font-family: monospace;
            font-weight: bold;
            opacity: 0.9;
        }
        .loader-text span {
            animation: loaderDots 0.8s infinite;
        }
        @keyframes loaderDots {
            0% { opacity: 0; }
            25% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 0; }
        }
      `}</style>
      
      {/* Background Blur Layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="blur-backdrop"
      />

      {/* Content Layer with mix-blend-mode */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="mini-loader-wrapper"
      >
        <div className="mini-loader">
          <div className="loader-track">
            <i className="fa-solid fa-car-side loader-car"></i>
          </div>
          <div className="loader-text">
            Loading<span>...</span>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export function PageTransition({ children, locationKey }: { children: React.ReactNode, locationKey: string }) {
  const [loading, setLoading] = useState(false);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0.99, transition: { duration: 0.8 } }
  };

  return (
    <>
      <AnimatePresence mode="wait" onExitComplete={() => setLoading(false)}>
        <motion.div
          key={locationKey}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onAnimationStart={(definition) => {
            if (definition === "exit") setLoading(true);
          }}
          className="will-change-opacity"
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        {loading && <MiniCarLoader />}
      </AnimatePresence>
    </>
  );
}
