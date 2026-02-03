import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const CustomCursor = () => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth spring animation for the main cursor
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Trail effect state
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointerQuery = window.matchMedia('(pointer: fine)');
    const hoverQuery = window.matchMedia('(hover: hover)');

    const update = () => {
      setEnabled(!reduceMotionQuery.matches && finePointerQuery.matches && hoverQuery.matches);
    };

    update();
    reduceMotionQuery.addEventListener('change', update);
    finePointerQuery.addEventListener('change', update);
    hoverQuery.addEventListener('change', update);

    return () => {
      reduceMotionQuery.removeEventListener('change', update);
      finePointerQuery.removeEventListener('change', update);
      hoverQuery.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      setTrail([]);
      return undefined;
    }
    let lastTrailUpdate = 0;
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Throttled trail update (every 20ms)
      const now = Date.now();
      if (now - lastTrailUpdate > 20) {
        lastTrailUpdate = now;
        const newId = `${now}-${Math.random()}`;
        setTrail(prev => [
          { x: e.clientX, y: e.clientY, id: newId },
          ...prev.slice(0, 15)
        ]);
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isLink = target.tagName.toLowerCase() === 'a' || 
                     target.tagName.toLowerCase() === 'button' ||
                     target.closest('a') || 
                     target.closest('button') ||
                     target.classList.contains('cursor-hover') ||
                     target.classList.contains('glass-card'); // Added glass-card for hover effect

      setIsHovered(isLink);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY, enabled]);

  // Trail cleanup
  useEffect(() => {
    if (!enabled) return undefined;
    const interval = setInterval(() => {
      setTrail(prev => prev.slice(0, -1));
    }, 50);
    return () => clearInterval(interval);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Trail Effect */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed pointer-events-none z-[9998] rounded-full hidden md:block"
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            left: point.x,
            top: point.y,
            width: 8,
            height: 8,
            backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Main Cursor Circle */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full border border-accent pointer-events-none z-[9999] hidden md:flex items-center justify-center mix-blend-difference backdrop-blur-[1px] gpu-accel`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 64 : 32,
          height: isHovered ? 64 : 32,
          backgroundColor: isClicking ? 'rgb(var(--color-accent-rgb) / 0.3)' : 'transparent',
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        {/* Center Dot */}
        <div 
          className={`w-1 h-1 rounded-full bg-accent transition-all duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
