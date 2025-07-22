import { motion, AnimatePresence, PanInfo, useDragControls, useMotionValue, useAnimation } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import { ThemeToggle } from "./theme-toggle";
import { 
  Menu, 
  X, 
  Home, 
  User, 
  Briefcase, 
  Package, 
  Phone, 
  ArrowLeft, 
  Wifi, 
  WifiOff, 
  ChevronDown, 
  Navigation,
  Users,
  FolderOpen,
  Zap
} from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home", route: "/", icon: Home },
  { href: "#about", label: "About", route: "/", icon: User },
  { href: "#services", label: "Services", route: "/", icon: Briefcase },
  { href: "#products", label: "Products", route: "/", icon: Package },
  { href: "#contact", label: "Contact", route: "/", icon: Phone },
];

const additionalLinks = [
  { href: "/team", label: "Team", route: "/team", icon: Users },
  { href: "/portfolio", label: "Portfolio", route: "/portfolio", icon: FolderOpen },
  { href: "/careers", label: "Careers", route: "/careers", icon: Zap },
];

export default function MobileMenuEnhanced() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const [dragProgress, setDragProgress] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastActiveSection, setLastActiveSection] = useState("");
  const [menuHeight, setMenuHeight] = useState(0);
  const [gestureHint, setGestureHint] = useState(true);
  const [expandedSection, setExpandedSection] = useState<'main' | 'additional' | null>('main');
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  
  const dragControls = useDragControls();
  const x = useMotionValue(0);
  const controls = useAnimation();
  const menuRef = useRef<HTMLDivElement>(null);

  // Enhanced haptic feedback with different patterns
  const triggerHaptic = useCallback((pattern: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator && typeof navigator.vibrate === 'function') {
      const patterns = {
        light: [10],
        medium: [15, 10, 15],
        heavy: [25, 15, 25, 15, 25]
      };
      navigator.vibrate(patterns[pattern]);
    }
  }, []);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.querySelector(link.href));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i] as HTMLElement;
        if (section && section.offsetTop <= scrollPosition) {
          setLastActiveSection(navLinks[i].href);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced gesture recognition
  const handlePan = useCallback((event: any, info: PanInfo) => {
    const progress = Math.max(0, Math.min(1, info.offset.x / 320));
    setDragProgress(progress);
    x.set(info.offset.x);
    
    // Progressive haptic feedback
    if (progress > 0.3 && progress < 0.31) {
      triggerHaptic('light');
    } else if (progress > 0.7 && progress < 0.71) {
      triggerHaptic('medium');
    }
  }, [triggerHaptic, x]);

  const handlePanEnd = useCallback((event: any, info: PanInfo) => {
    const progress = info.offset.x / 320;
    const velocity = info.velocity.x;
    const shouldClose = progress > 0.4 || velocity > 800;
    
    if (shouldClose) {
      triggerHaptic('heavy');
      setIsOpen(false);
      controls.start({ x: 320 });
    } else {
      triggerHaptic('light');
      setDragProgress(0);
      controls.start({ x: 0 });
    }
  }, [triggerHaptic, controls]);

  // Edge swipe detection for opening menu
  const handleTouchStart = useCallback((event: TouchEvent) => {
    if (isOpen) return;
    
    const touch = event.touches[0];
    setTouchStartX(touch.clientX);
    
    if (touch.clientX < 20) {
      triggerHaptic('light');
    }
  }, [isOpen, triggerHaptic]);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (isOpen || touchStartX === null || touchStartX > 20) return;
    
    const touch = event.touches[0];
    const deltaX = touch.clientX - touchStartX;
    
    if (deltaX > 50) {
      setIsOpen(true);
      triggerHaptic('medium');
      setTouchStartX(null);
    }
  }, [isOpen, touchStartX, triggerHaptic]);

  // Menu height calculation with safe areas
  useEffect(() => {
    const updateHeight = () => {
      const vh = window.innerHeight;
      const safeAreaTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sat') || '0');
      const safeAreaBottom = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sab') || '0');
      setMenuHeight(vh - safeAreaTop - safeAreaBottom);
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);
    
    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
    };
  }, []);

  // Touch event listeners
  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleTouchStart, handleTouchMove]);

  // Hide gesture hint after first use
  useEffect(() => {
    if (isOpen && gestureHint) {
      const timer = setTimeout(() => setGestureHint(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, gestureHint]);

  // Enhanced navigation handling
  const handleNavClick = useCallback((href: string, route: string) => {
    if (route !== "/") {
      setLocation(route);
    } else {
      const section = document.querySelector(href) as HTMLElement;
      if (section) {
        const headerOffset = 80;
        const elementPosition = section.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    
    triggerHaptic('medium');
    setIsOpen(false);
    setExpandedSection('main');
  }, [setLocation, triggerHaptic]);

  const handleLogoClick = useCallback(() => {
    setLocation("/");
    setIsOpen(false);
    triggerHaptic('light');
  }, [setLocation, triggerHaptic]);

  const handleMenuToggle = useCallback(() => {
    triggerHaptic(isOpen ? 'light' : 'medium');
    setIsOpen(prev => !prev);
  }, [triggerHaptic, isOpen]);

  // Close menu with escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerHaptic('light');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, triggerHaptic]);

  return (
    <>
      {/* Enhanced Mobile Menu Button */}
      <motion.button
        className="mobile-menu-trigger fixed top-6 right-6 z-[60] p-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-full shadow-lg md:hidden border border-white/20 dark:border-slate-700/20"
        onClick={handleMenuToggle}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        layout
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: 90, scale: 0.8 }}
              transition={{ duration: 0.2, type: "spring" }}
            >
              <X className="w-6 h-6 text-slate-700 dark:text-slate-200" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: -90, scale: 0.8 }}
              transition={{ duration: 0.2, type: "spring" }}
            >
              <Menu className="w-6 h-6 text-slate-700 dark:text-slate-200" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Enhanced status indicators */}
        <div className="absolute -top-1 -right-1 flex gap-1">
          <AnimatePresence>
            {!isOnline && (
              <motion.div
                className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center shadow-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <WifiOff className="w-1.5 h-1.5 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>

      {/* Enhanced Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Enhanced Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            className="mobile-menu fixed top-0 right-0 w-80 max-w-[85vw] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl z-50 md:hidden overflow-hidden"
            style={{ height: menuHeight || '100vh' }}
            initial={{ x: "100%" }}
            animate={{ 
              x: dragProgress > 0 ? `${dragProgress * 100}%` : 0,
              opacity: 1 - (dragProgress * 0.3)
            }}
            exit={{ x: "100%" }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.4
            }}
            drag="x"
            dragControls={dragControls}
            dragConstraints={{ left: -320, right: 0 }}
            dragElastic={0.1}
            onPan={handlePan}
            onPanEnd={handlePanEnd}
          >
            {/* Enhanced Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-white/50 to-transparent dark:from-slate-800/50">
              <motion.div
                className="flex items-center gap-3 cursor-pointer"
                onClick={handleLogoClick}
                whileTap={{ scale: 0.95 }}
              >
                <img 
                  src="/logo.png" 
                  alt="iZyane Logo" 
                  className="w-10 h-10" 
                />
                <div>
                  <h1 className="text-lg font-bold text-slate-900 dark:text-white">iZyane</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Innovation Solutions</p>
                </div>
              </motion.div>
              
              <div className="flex items-center gap-3">
                {/* Network status */}
                <motion.div
                  className="flex items-center gap-1 text-xs px-2 py-1 rounded-full"
                  animate={{ 
                    backgroundColor: isOnline ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                    color: isOnline ? "#10b981" : "#ef4444" 
                  }}
                >
                  {isOnline ? (
                    <Wifi className="w-3 h-3" />
                  ) : (
                    <WifiOff className="w-3 h-3" />
                  )}
                  <span className="font-medium">{isOnline ? "Online" : "Offline"}</span>
                </motion.div>
                
                <ThemeToggle />
              </div>
            </div>

            {/* Drag Indicator */}
            <motion.div 
              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-primary-custom/50 to-primary-custom rounded-r-full"
              animate={{ 
                opacity: 0.3 + (dragProgress * 0.7),
                scaleY: 1 + (dragProgress * 0.8),
                x: dragProgress * 4
              }}
            />

            {/* Gesture Hint */}
            <AnimatePresence>
              {gestureHint && (
                <motion.div
                  className="px-6 py-2 text-xs text-primary-custom border-b border-primary-custom/20 bg-primary-custom/5 flex items-center gap-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <ArrowLeft className="w-3 h-3" />
                  Swipe right or tap outside to close
                </motion.div>
              )}
            </AnimatePresence>

            {/* Current section indicator */}
            {lastActiveSection && (
              <div className="px-6 py-2 text-xs text-primary-custom border-b border-slate-100 dark:border-slate-800 bg-primary-custom/5 flex items-center gap-2">
                <Navigation className="w-3 h-3" />
                Currently: {navLinks.find(link => link.href === lastActiveSection)?.label}
              </div>
            )}

            {/* Navigation Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Main Navigation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Main Menu</h3>
                  <motion.button
                    onClick={() => setExpandedSection(expandedSection === 'main' ? null : 'main')}
                    className="p-1"
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronDown 
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        expandedSection === 'main' ? 'rotate-180' : ''
                      }`} 
                    />
                  </motion.button>
                </div>

                <AnimatePresence>
                  {expandedSection === 'main' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {navLinks.map((link, index) => {
                        const IconComponent = link.icon;
                        const isActive = lastActiveSection === link.href;
                        
                        return (
                          <motion.button
                            key={link.href}
                            onClick={() => handleNavClick(link.href, link.route)}
                            className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-all duration-200 group relative ${
                              isActive 
                                ? 'bg-primary-custom/10 border-r-2 border-primary-custom text-primary-custom' 
                                : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className={`p-2 rounded-lg transition-all ${
                              isActive 
                                ? 'bg-primary-custom text-white shadow-sm' 
                                : 'bg-primary-custom/10 group-hover:bg-primary-custom/20 group-hover:scale-110'
                            }`}>
                              <IconComponent className={`w-5 h-5 ${
                                isActive ? 'text-white' : 'text-primary-custom'
                              }`} />
                            </div>
                            <span className={`text-lg font-medium transition-colors ${
                              isActive 
                                ? 'text-primary-custom' 
                                : 'text-slate-700 dark:text-slate-200 group-hover:text-primary-custom'
                            }`}>
                              {link.label}
                            </span>
                            
                            {isActive && (
                              <motion.div
                                className="absolute left-0 w-1 h-full bg-primary-custom rounded-r"
                                layoutId="activeIndicator"
                              />
                            )}
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Additional Pages */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">More Pages</h3>
                  <motion.button
                    onClick={() => setExpandedSection(expandedSection === 'additional' ? null : 'additional')}
                    className="p-1"
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronDown 
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        expandedSection === 'additional' ? 'rotate-180' : ''
                      }`} 
                    />
                  </motion.button>
                </div>

                <AnimatePresence>
                  {expandedSection === 'additional' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {additionalLinks.map((link, index) => {
                        const IconComponent = link.icon;
                        const isCurrentPage = location === link.route;
                        
                        return (
                          <motion.button
                            key={link.href}
                            onClick={() => handleNavClick(link.href, link.route)}
                            className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-all duration-200 group relative ${
                              isCurrentPage
                                ? 'bg-primary-custom/10 border-r-2 border-primary-custom text-primary-custom' 
                                : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 + 0.3 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className={`p-2 rounded-lg transition-all ${
                              isCurrentPage
                                ? 'bg-primary-custom text-white shadow-sm' 
                                : 'bg-secondary-custom/10 group-hover:bg-secondary-custom/20 group-hover:scale-110'
                            }`}>
                              <IconComponent className={`w-5 h-5 ${
                                isCurrentPage ? 'text-white' : 'text-secondary-custom'
                              }`} />
                            </div>
                            <span className={`text-lg font-medium transition-colors ${
                              isCurrentPage
                                ? 'text-primary-custom' 
                                : 'text-slate-700 dark:text-slate-200 group-hover:text-secondary-custom'
                            }`}>
                              {link.label}
                            </span>
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Enhanced Footer */}
            <div className="p-6 border-t border-slate-200 dark:border-slate-700 bg-gradient-to-t from-white/50 to-transparent dark:from-slate-900/50">
              <motion.div
                className="text-center text-sm text-slate-500 dark:text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="font-medium">© 2025 iZyane</p>
                <p className="mt-1 text-xs flex items-center justify-center gap-2">
                  <ArrowLeft className="w-3 h-3" />
                  Swipe right to close
                </p>
                <div className="flex items-center justify-center gap-2 mt-2 text-xs">
                  <div className={`w-2 h-2 rounded-full transition-colors ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
                  {isOnline ? 'Connected' : 'Offline Mode'}
                </div>
              </motion.div>
            </div>

            {/* Gesture animation hint */}
            <AnimatePresence>
              {gestureHint && (
                <motion.div
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-0.5 bg-gradient-to-r from-primary-custom to-transparent rounded-full"
                  animate={{ 
                    x: [0, 20, 0],
                    opacity: [0.3, 1, 0.3],
                    scaleX: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: 2,
                    repeatType: "loop",
                    ease: "easeInOut"
                  }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
