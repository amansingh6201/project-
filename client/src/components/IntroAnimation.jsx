import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroAnimation({ onComplete }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 500); // Wait for exit animation
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.5, filter: 'brightness(2)' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Glow effect */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 blur-[80px] bg-[#ff4d38] opacity-50"
            />
            {/* Outer strong glow */}
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="absolute inset-0 blur-[160px] bg-[#ff4d38]"
            />
            
            <h1 
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(120px, 20vw, 200px)",
                color: "#ff4d38",
                textShadow: "0 0 80px rgba(255,77,56,0.8), 0 0 160px rgba(255,77,56,0.4)"
              }}
              className="relative z-10 font-bold tracking-tighter"
            >
              NS
            </h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
