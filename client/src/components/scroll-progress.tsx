import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollPercent(Math.round(latest * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-custom via-secondary-custom to-primary-custom z-50 transform-gpu shadow-sm"
        style={{ scaleX, originX: 0 }}
      />
      
      {/* Progress percentage indicator */}
      <motion.div
        className="fixed top-4 right-4 z-50 px-3 py-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-full text-xs font-medium text-slate-700 dark:text-slate-300 shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: scrollPercent > 5 ? 1 : 0,
          scale: scrollPercent > 5 ? 1 : 0.8
        }}
        transition={{ duration: 0.2 }}
      >
        {scrollPercent}%
      </motion.div>
    </>
  );
}

export function CircularProgress() {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
  });

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="relative w-16 h-16">
        {/* Background circle */}
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-gray-200 dark:text-gray-700"
          />
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            strokeWidth="4"
            className="text-primary-custom"
            strokeLinecap="round"
            strokeDasharray="175.929"
            style={{
              pathLength,
            }}
          />
        </svg>
        
        {/* Percentage text */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700 dark:text-gray-300"
          style={{
            opacity: useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
          }}
        >
          <motion.span>
            {Math.round(scrollYProgress.get() * 100)}%
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}
