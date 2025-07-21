import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { CheckCircle2, Eye } from "lucide-react";

interface SectionProgressProps {
  sectionId: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function SectionProgress({ sectionId, children, className = "", title }: SectionProgressProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      
      // Check if section is in viewport
      const inViewport = rect.top < windowHeight && rect.bottom > 0;
      setIsVisible(inViewport);
      
      if (inViewport) {
        // Start timer when section becomes visible
        if (startTimeRef.current === 0) {
          startTimeRef.current = Date.now();
          timerRef.current = setInterval(() => {
            setTimeSpent(prev => prev + 1);
          }, 1000);
        }

        // Calculate progress based on how much of the section is visible
        let visibleProgress = 0;
        if (rect.top <= 0 && rect.bottom >= windowHeight) {
          // Section spans entire viewport
          visibleProgress = Math.min(1, (-rect.top) / (elementHeight - windowHeight));
        } else if (rect.top <= 0) {
          // Section top is above viewport
          visibleProgress = Math.min(1, (windowHeight + rect.top) / elementHeight);
        } else if (rect.bottom >= windowHeight) {
          // Section bottom is below viewport  
          visibleProgress = Math.min(1, (windowHeight - rect.top) / elementHeight);
        } else {
          // Section is fully visible
          visibleProgress = 1;
        }
        
        const newProgress = Math.max(0, Math.min(1, visibleProgress));
        setProgress(newProgress);
        
        // Mark as completed if progress > 90% and user spent some time
        if (newProgress >= 0.9 && timeSpent >= 2 && !isCompleted) {
          setIsCompleted(true);
        }
      } else {
        // Stop timer when section leaves viewport
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = undefined;
        }
      }
    };

    // Initial check
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [sectionId, timeSpent, isCompleted]);

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0.7 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Section progress indicator */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="absolute -left-6 top-0 bottom-0 w-2 bg-gradient-to-b from-slate-200 via-primary-custom/30 to-slate-200 dark:from-slate-700 dark:via-primary-custom/30 dark:to-slate-700 rounded-full overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-full bg-gradient-to-b from-primary-custom via-secondary-custom to-primary-custom rounded-full"
              initial={{ height: 0 }}
              animate={{ height: `${progress * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reading progress tooltip */}
      <AnimatePresence>
        {isVisible && progress > 0 && (
          <motion.div
            className="absolute -left-16 top-4 flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-lg shadow-lg text-xs"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Eye className="w-3 h-3 text-primary-custom" />
            <span className="text-slate-700 dark:text-slate-300">
              {Math.round(progress * 100)}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
      
      {/* Section completion badge */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            className="absolute -right-6 top-4 flex items-center gap-2 px-3 py-1.5 bg-green-500/90 backdrop-blur-md rounded-full text-white text-xs font-medium shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ 
              type: "spring",
              stiffness: 400,
              damping: 25,
              duration: 0.6
            }}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>Read</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section title indicator */}
      {title && isVisible && (
        <motion.div
          className="absolute -left-24 top-0 writing-mode-vertical text-xs font-medium text-primary-custom/70 transform -rotate-90 origin-bottom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.div>
      )}
    </motion.div>
  );
}

// Section completion tracker component
export function SectionTracker({ sections }: { sections: Array<{ id: string; title: string }> }) {
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Consider section "read" if user scrolled through 80% of it
        if (rect.top <= windowHeight * 0.2 && rect.bottom <= windowHeight * 0.8) {
          setCompletedSections(prev => {
            if (!prev.includes(section.id)) {
              return [...prev, section.id];
            }
            return prev;
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-40 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-lg p-3 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: completedSections.length > 0 ? 1 : 0,
        y: completedSections.length > 0 ? 0 : 20 
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 text-sm">
        <CheckCircle2 className="w-4 h-4 text-green-500" />
        <span className="text-slate-700 dark:text-slate-300">
          {completedSections.length}/{sections.length} sections read
        </span>
      </div>
    </motion.div>
  );
}
