import { motion, MotionValue, useSpring, useTransform, useAnimationControls, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";

// Enhanced button with multiple feedback types
interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  rippleColor?: string;
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
  rippleColor = "rgba(255, 255, 255, 0.3)",
  haptic = true,
  soundFeedback = false
}: AnimatedButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const controls = useAnimationControls();

  const variants = {
    primary: "bg-primary-custom hover:bg-primary-custom/90 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-secondary-custom hover:bg-secondary-custom/90 text-white shadow-lg hover:shadow-xl",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
    outline: "border-2 border-primary-custom text-primary-custom hover:bg-primary-custom hover:text-white"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  // Enhanced haptic feedback
  const triggerHaptic = useCallback(() => {
    if (haptic && 'vibrate' in navigator) {
      navigator.vibrate([10, 5, 10]);
    }
  }, [haptic]);

  // Sound feedback
  const playSound = useCallback(() => {
    if (soundFeedback) {
      // Create a subtle click sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  }, [soundFeedback]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    setIsPressed(true);
    
    // Trigger feedback
    triggerHaptic();
    playSound();

    const button = buttonRef.current;
    if (button) {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newRipple = { x, y, id: Date.now() };
      setRipples(prev => [...prev, newRipple]);
      
      // Enhanced button animation
      controls.start({
        scale: [1, 0.95, 1.02, 1],
        transition: { duration: 0.3, times: [0, 0.2, 0.8, 1] }
      });
      
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
      
      setTimeout(() => {
        setIsPressed(false);
      }, 150);
    }

    onClick?.();
  };

  return (
    <motion.button
      ref={buttonRef}
      animate={controls}
      className={`relative overflow-hidden rounded-lg font-medium transition-all duration-300 transform-gpu ${variants[variant]} ${sizes[size]} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : "active:scale-95"
      }`}
      onClick={handleClick}
      disabled={disabled || loading}
      whileHover={{ 
        scale: disabled ? 1 : 1.02,
        y: disabled ? 0 : -1,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: disabled ? 1 : 0.98,
        transition: { duration: 0.1 }
      }}
    >
      {/* Enhanced ripple effects */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x - 25,
              top: ripple.y - 25,
              backgroundColor: rippleColor,
            }}
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{ 
              width: [0, 50, 80], 
              height: [0, 50, 80], 
              opacity: [0.8, 0.4, 0],
              scale: [0.5, 1, 1.5]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Success pulse effect */}
      {isPressed && (
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.6, 0],
            scale: [0.8, 1, 1.1]
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        {children}
      </span>
    </motion.button>
  );
}

// Enhanced Floating Action Button with magnetic effect and haptic feedback
export function FloatingActionButton({ 
  children, 
  onClick, 
  className = "",
  haptic = true,
  magneticStrength = 0.3
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  haptic?: boolean;
  magneticStrength?: number;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const controls = useAnimationControls();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || !isHovered) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * magneticStrength;
    const deltaY = (e.clientY - centerY) * magneticStrength;
    
    setMousePosition({ x: deltaX, y: deltaY });
  };

  const handleClick = () => {
    if (haptic && 'vibrate' in navigator) {
      navigator.vibrate([15, 10, 15]);
    }
    
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);
    
    controls.start({
      scale: [1, 1.1, 0.9, 1.05, 1],
      rotate: [0, -5, 5, -2, 0],
      transition: { duration: 0.5, times: [0, 0.2, 0.4, 0.7, 1] }
    });
    
    onClick?.();
  };

  return (
    <motion.button
      ref={buttonRef}
      animate={controls}
      className={`relative z-10 w-14 h-14 bg-primary-custom hover:bg-primary-custom/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      onClick={handleClick}
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      style={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 20,
        x: { type: "spring", stiffness: 300, damping: 30 },
        y: { type: "spring", stiffness: 300, damping: 30 }
      }}
    >
      {/* Pulse effect */}
      <AnimatePresence>
        {isPressed && (
          <motion.div
            className="absolute inset-0 bg-white/30 rounded-full"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
      
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 bg-primary-custom rounded-full opacity-0 group-hover:opacity-20"
        animate={{ scale: isHovered ? 1.5 : 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <motion.div
        animate={{ 
          scale: isPressed ? 0.9 : 1,
          rotate: isHovered ? 360 : 0 
        }}
        transition={{ 
          scale: { duration: 0.1 },
          rotate: { duration: 2, ease: "linear", repeat: isHovered ? Infinity : 0 }
        }}
      >
        {children}
      </motion.div>
    </motion.button>
  );
}

// Enhanced Interactive card with tilt effect and micro-animations
export function TiltCard({ 
  children, 
  className = "", 
  intensity = 15,
  glareEffect = true,
  hoverScale = 1.02
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glareEffect?: boolean;
  hoverScale?: number;
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotY = ((e.clientX - centerX) / rect.width) * intensity;
    const rotX = ((centerY - e.clientY) / rect.height) * intensity;

    setRotateX(rotX);
    setRotateY(rotY);

    // Calculate glare position
    if (glareEffect) {
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setGlarePosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
    setGlarePosition({ x: 50, y: 50 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{
        rotateX,
        rotateY,
        scale: isHovered ? hoverScale : 1,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        scale: { duration: 0.2 }
      }}
      style={{ 
        transformStyle: "preserve-3d",
        transformOrigin: "center center"
      }}
    >
      <div className="relative w-full h-full rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        {/* Glare effect */}
        {glareEffect && isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,.1), transparent 40%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
        
        {/* Subtle border highlight */}
        <motion.div
          className="absolute inset-0 rounded-lg border border-transparent"
          animate={{
            borderColor: isHovered ? "rgba(59, 130, 246, 0.3)" : "transparent",
          }}
          transition={{ duration: 0.3 }}
        />
        
        {children}
      </div>
    </motion.div>
  );
}

// Enhanced Morphing icon component with smooth transitions
export function MorphingIcon({ 
  icon1, 
  icon2, 
  isToggled, 
  onClick,
  className = "",
  haptic = true,
  size = 24
}: {
  icon1: React.ReactNode;
  icon2: React.ReactNode;
  isToggled: boolean;
  onClick?: () => void;
  className?: string;
  haptic?: boolean;
  size?: number;
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimationControls();

  const handleClick = () => {
    if (haptic && 'vibrate' in navigator) {
      navigator.vibrate([5, 5, 5]);
    }

    setIsAnimating(true);
    
    controls.start({
      scale: [1, 1.2, 0.9, 1.1, 1],
      rotate: [0, 180, 360],
      transition: { duration: 0.6, times: [0, 0.2, 0.5, 0.8, 1] }
    });

    setTimeout(() => setIsAnimating(false), 600);
    onClick?.();
  };

  return (
    <motion.button
      animate={controls}
      className={`relative overflow-hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={isAnimating}
      style={{ width: size + 16, height: size + 16 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isToggled ? "icon2" : "icon1"}
          className="flex items-center justify-center"
          initial={{ 
            rotateY: -90, 
            opacity: 0,
            scale: 0.8 
          }}
          animate={{ 
            rotateY: 0, 
            opacity: 1,
            scale: 1
          }}
          exit={{ 
            rotateY: 90, 
            opacity: 0,
            scale: 0.8
          }}
          transition={{ 
            duration: 0.3,
            type: "spring",
            stiffness: 200
          }}
        >
          {isToggled ? icon2 : icon1}
        </motion.div>
      </AnimatePresence>

      {/* Background pulse effect */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="absolute inset-0 bg-primary-custom/20 rounded-lg"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
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
