import { motion, MotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";

// Enhanced button with multiple feedback types
interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "success" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  haptic?: boolean;
  soundFeedback?: boolean;
}

export function AnimatedButton({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  haptic = false,
  soundFeedback = false
}: AnimatedButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const variants = {
    primary: "bg-primary-custom hover:bg-primary-custom/90 text-white",
    secondary: "bg-secondary-custom hover:bg-secondary-custom/90 text-white",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
    success: "bg-green-500 hover:bg-green-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  const triggerHaptic = useCallback(() => {
    if (haptic && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }, [haptic]);

  const playSound = useCallback(() => {
    if (soundFeedback) {
      // Create a subtle click sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  }, [soundFeedback]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    const button = buttonRef.current;
    if (button) {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newRipple = { x, y, id: Date.now() };
      setRipples(prev => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }

    triggerHaptic();
    playSound();
    onClick?.();
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`relative overflow-hidden rounded-lg font-medium transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handleClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      disabled={disabled || loading}
      whileHover={{ 
        scale: disabled ? 1 : 1.02,
        boxShadow: disabled ? undefined : "0 4px 12px rgba(0,0,0,0.15)"
      }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Enhanced ripple effects */}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x - 20,
            top: ripple.y - 20,
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ 
            width: 40, 
            height: 40, 
            opacity: 0,
            scale: [0, 1, 1.5]
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Press state overlay */}
      <motion.div
        className="absolute inset-0 bg-black/10 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: isPressed ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        {children}
      </span>
    </motion.button>
  );
}
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }

    onClick?.();
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`relative overflow-hidden rounded-lg font-medium transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handleClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x - 20,
            top: ripple.y - 20,
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ 
            width: 40, 
            height: 40, 
            opacity: 0,
            scale: [0, 1, 1.5]
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        {children}
      </span>
    </motion.button>
  );
}

// Floating Action Button with magnetic effect
export function FloatingActionButton({ children, onClick, className = "" }: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;
    
    setMousePosition({ x: deltaX, y: deltaY });
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`relative p-4 bg-primary-custom text-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      animate={{
        x: isHovered ? mousePosition.x : 0,
        y: isHovered ? mousePosition.y : 0,
        scale: isHovered ? 1.1 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        animate={{ rotate: isHovered ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.button>
  );
}

// Interactive card with tilt effect
export function TiltCard({ 
  children, 
  className = "", 
  intensity = 15 
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateXValue = (mouseY / (rect.height / 2)) * intensity;
    const rotateYValue = -(mouseX / (rect.width / 2)) * intensity;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`transform-gpu perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative w-full h-full rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        {children}
      </div>
    </motion.div>
  );
}

// Morphing icon component
export function MorphingIcon({ 
  icon1, 
  icon2, 
  isToggled, 
  onClick,
  className = "" 
}: {
  icon1: React.ReactNode;
  icon2: React.ReactNode;
  isToggled: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        animate={{ 
          rotateY: isToggled ? 180 : 0,
          opacity: isToggled ? 0 : 1 
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {icon1}
      </motion.div>
      
      <motion.div
        animate={{ 
          rotateY: isToggled ? 0 : -180,
          opacity: isToggled ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center"
        style={{ rotateY: -180 }}
      >
        {icon2}
      </motion.div>
    </motion.button>
  );
}

// Progress button with loading state
export function ProgressButton({
  children,
  onClick,
  progress = 0,
  className = "",
  variant = "primary"
}: {
  children: React.ReactNode;
  onClick?: () => void;
  progress?: number;
  className?: string;
  variant?: "primary" | "secondary";
}) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    onClick?.();
  };

  const progressSpring = useSpring(progress, { stiffness: 100, damping: 30 });

  return (
    <motion.button
      className={`relative overflow-hidden px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
        variant === "primary" 
          ? "bg-primary-custom hover:bg-primary-custom/90 text-white" 
          : "bg-secondary-custom hover:bg-secondary-custom/90 text-white"
      } ${className}`}
      onClick={handleClick}
      animate={{
        scale: isClicked ? 0.95 : 1,
      }}
      transition={{ duration: 0.1 }}
    >
      {/* Progress background */}
      <motion.div
        className="absolute inset-0 bg-white/20"
        style={{
          scaleX: useTransform(progressSpring, [0, 100], [0, 1]),
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      />
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
