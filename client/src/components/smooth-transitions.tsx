import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { useLocation } from "wouter";
import { useEffect, useState, createContext, useContext } from "react";

// Enhanced page transition variants
const pageVariants = {
  slideIn: {
    initial: { x: "100%", opacity: 0 },
    in: { x: 0, opacity: 1 },
    out: { x: "-100%", opacity: 0 }
  },
  fadeScale: {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    in: { opacity: 1, scale: 1, y: 0 },
    out: { opacity: 0, scale: 1.05, y: -20 }
  },
  flipVertical: {
    initial: { rotateX: -90, opacity: 0, transformOrigin: "top" },
    in: { rotateX: 0, opacity: 1 },
    out: { rotateX: 90, opacity: 0, transformOrigin: "bottom" }
  },
  slideUp: {
    initial: { y: "100vh", opacity: 0 },
    in: { y: 0, opacity: 1 },
    out: { y: "-100vh", opacity: 0 }
  },
  morphing: {
    initial: { opacity: 0, scale: 0, borderRadius: "100%" },
    in: { opacity: 1, scale: 1, borderRadius: "0%" },
    out: { opacity: 0, scale: 0, borderRadius: "100%" }
  }
};

const pageTransitions = {
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 0.8
  },
  tween: {
    type: "tween",
    ease: [0.25, 0.46, 0.45, 0.94],
    duration: 0.4
  },
  anticipate: {
    type: "tween",
    ease: "anticipate",
    duration: 0.6
  }
};

// Transition context for global state management
interface TransitionContextType {
  transitionStyle: keyof typeof pageVariants;
  transitionType: keyof typeof pageTransitions;
  isTransitioning: boolean;
  setTransitionStyle: (style: keyof typeof pageVariants) => void;
  setTransitionType: (type: keyof typeof pageTransitions) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  transitionStyle: 'fadeScale',
  transitionType: 'spring',
  isTransitioning: false,
  setTransitionStyle: () => {},
  setTransitionType: () => {},
});

export const useTransition = () => useContext(TransitionContext);

// Enhanced transition provider
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [transitionStyle, setTransitionStyle] = useState<keyof typeof pageVariants>('fadeScale');
  const [transitionType, setTransitionType] = useState<keyof typeof pageTransitions>('spring');
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <TransitionContext.Provider value={{
      transitionStyle,
      transitionType,
      isTransitioning,
      setTransitionStyle,
      setTransitionType
    }}>
      {children}
    </TransitionContext.Provider>
  );
}

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  const [location] = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("in");
  const { transitionStyle, transitionType } = useTransition();
  const controls = useAnimationControls();

  const currentVariants = pageVariants[transitionStyle];
  const currentTransition = pageTransitions[transitionType];

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage("out");
    }
  }, [location, displayLocation]);

  const handleExitComplete = () => {
    setDisplayLocation(location);
    setTransitionStage("in");
  };

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={handleExitComplete}
    >
      <motion.div
        key={displayLocation}
        className={className}
        initial={currentVariants.initial}
        animate={currentVariants.in}
        exit={currentVariants.out}
        transition={currentTransition}
        style={{ 
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden"
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Enhanced smooth state transitions hook with debouncing and easing
export function useSmoothTransition<T>(
  value: T, 
  delay: number = 150,
  easing: string = "easeInOut"
): [T, boolean] {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    setIsTransitioning(true);
    
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setTimeout(() => setIsTransitioning(false), 50);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [debouncedValue, isTransitioning];
}

// Enhanced loading transition with skeleton states
interface LoadingTransitionProps {
  loading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showSkeleton?: boolean;
  skeletonClassName?: string;
}

export function LoadingTransition({ 
  loading, 
  children, 
  fallback,
  showSkeleton = false,
  skeletonClassName = ""
}: LoadingTransitionProps) {
  const defaultSkeleton = (
    <div className={`animate-pulse space-y-3 ${skeletonClassName}`}>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {fallback || (showSkeleton ? defaultSkeleton : (
            <div className="flex items-center justify-center py-8">
              <motion.div
                className="w-8 h-8 border-3 border-primary-custom border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 1.02 }}
          transition={{ 
            duration: 0.3, 
            delay: 0.1,
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {fallback}
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Enhanced staggered children animation with custom directions
export function StaggeredChildren({ 
  children, 
  delay = 0.1,
  className = "",
  direction = "up",
  distance = 20,
  duration = 0.6
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
}) {
  const getInitialPosition = (dir: string) => {
    switch (dir) {
      case "up": return { y: distance, x: 0 };
      case "down": return { y: -distance, x: 0 };
      case "left": return { x: distance, y: 0 };
      case "right": return { x: -distance, y: 0 };
      default: return { y: distance, x: 0 };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      ...getInitialPosition(direction),
      opacity: 0,
      scale: 0.95
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        duration
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>
      }
    </motion.div>
  );
}

// Modal transition with backdrop blur
interface ModalTransitionProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  backdropBlur?: boolean;
  closeOnBackdrop?: boolean;
}

export function ModalTransition({
  isOpen,
  onClose,
  children,
  className = "",
  backdropBlur = true,
  closeOnBackdrop = true
}: ModalTransitionProps) {
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.75,
      y: 50,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.9
      }
    },
    exit: {
      opacity: 0,
      scale: 0.75,
      y: 50,
      rotateX: 15,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
              backdropBlur ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/50'
            }`}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeOnBackdrop ? onClose : undefined}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={`relative bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden ${className}`}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              style={{ 
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden"
              }}
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Toast notification transition
interface ToastTransitionProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  position?: 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export function ToastTransition({
  message,
  type = 'info',
  isVisible,
  onClose,
  duration = 4000,
  position = 'top-right'
}: ToastTransitionProps) {
  const getPositionClasses = (pos: string) => {
    switch (pos) {
      case 'top': return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'bottom': return 'bottom-4 left-1/2 transform -translate-x-1/2';
      case 'top-right': return 'top-4 right-4';
      case 'top-left': return 'top-4 left-4';
      case 'bottom-right': return 'bottom-4 right-4';
      case 'bottom-left': return 'bottom-4 left-4';
      default: return 'top-4 right-4';
    }
  };

  const getTypeStyles = (toastType: string) => {
    switch (toastType) {
      case 'success': return 'bg-green-500 text-white';
      case 'error': return 'bg-red-500 text-white';
      case 'warning': return 'bg-yellow-500 text-white';
      case 'info': return 'bg-blue-500 text-white';
      default: return 'bg-gray-800 text-white';
    }
  };

  const getAnimation = (pos: string) => {
    if (pos.includes('top')) {
      return {
        initial: { opacity: 0, y: -50, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -50, scale: 0.95 }
      };
    } else {
      return {
        initial: { opacity: 0, y: 50, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 50, scale: 0.95 }
      };
    }
  };

  const animation = getAnimation(position);

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed z-50 max-w-sm w-full ${getPositionClasses(position)}`}
          {...animation}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 25,
            duration: 0.4
          }}
        >
          <div className={`px-4 py-3 rounded-lg shadow-lg ${getTypeStyles(type)} flex items-center justify-between`}>
            <span className="text-sm font-medium">{message}</span>
            <button
              onClick={onClose}
              className="ml-3 text-white/80 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
