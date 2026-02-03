import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const interval = 20;
    const steps = duration / interval;
    const increment = 100 / steps;
    let completeTimeout;

    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          completeTimeout = setTimeout(onComplete, 500);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => {
      clearInterval(timer);
      if (completeTimeout) clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary text-accent font-mono overflow-hidden"
    >
      <div className="relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="h-1 bg-accent absolute top-1/2 left-0 -translate-y-1/2 z-0 opacity-20"
        />
        <h1 className="text-6xl md:text-9xl font-bold relative z-10 mix-blend-difference text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">
          {Math.round(count)}%
        </h1>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-text-muted text-sm tracking-[0.2em] uppercase"
      >
        Loading Experience
      </motion.div>
    </motion.div>
  );
};

export default Preloader;
