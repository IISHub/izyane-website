import { motion, AnimatePresence, PanInfo, useDragControls } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X, Home, User, Briefcase, Package, Phone, ArrowLeft, Wifi, WifiOff } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home", route: "/", icon: Home },
  { href: "#about", label: "About", route: "/", icon: User },
  { href: "#services", label: "Services", route: "/", icon: Briefcase },
  { href: "#products", label: "Products", route: "/", icon: Package },
  { href: "#contact", label: "Contact", route: "/", icon: Phone },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const [dragProgress, setDragProgress] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastActiveSection, setLastActiveSection] = useState("");
  const dragControls = useDragControls();

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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced gesture handling
  const handlePan = useCallback((event: any, info: PanInfo) => {
    const progress = Math.max(0, Math.min(1, -info.offset.x / 280));
    setDragProgress(progress);
  }, []);

  const handlePanEnd = useCallback((event: any, info: PanInfo) => {
    const shouldClose = -info.offset.x > 140 || info.velocity.x < -800;
    
    if (shouldClose) {
      setIsOpen(false);
    }
    setDragProgress(0);
  }, []);

  // Haptic feedback for supported devices
  const triggerHaptic = useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }, []);

  // Close menu when clicking outside, pressing escape, or on route change
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        triggerHaptic();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-trigger')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, triggerHaptic]);

  const handleNavClick = useCallback((href: string, route: string) => {
    triggerHaptic();
    setIsOpen(false);
    
    if (location !== "/" && route === "/") {
      setLocation(route);
      setTimeout(() => {
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
      }, 100);
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
  }, [location, setLocation, triggerHaptic]);

  const handleLogoClick = useCallback(() => {
    triggerHaptic();
    setIsOpen(false);
    setLocation("/");
  }, [setLocation, triggerHaptic]);

  const handleMenuToggle = useCallback(() => {
    triggerHaptic();
    setIsOpen(prev => !prev);
  }, [triggerHaptic]);

  return (
    <>
      {/* Mobile Menu Button - Enhanced with status indicator */}
      <motion.button
        className="mobile-menu-trigger fixed top-6 right-6 z-[60] p-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-full shadow-lg md:hidden"
        onClick={handleMenuToggle}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        layout
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-slate-700 dark:text-slate-200" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6 text-slate-700 dark:text-slate-200" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Network status indicator */}
        <div className="absolute -top-1 -right-1 w-3 h-3">
          <AnimatePresence>
            {!isOnline && (
              <motion.div
                className="w-full h-full bg-red-500 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <WifiOff className="w-2 h-2 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>

      {/* Enhanced Backdrop with blur effect */}
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
            className="mobile-menu fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl z-50 md:hidden overflow-hidden"
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
            dragConstraints={{ left: -280, right: 0 }}
            dragElastic={0.1}
            onPan={handlePan}
            onPanEnd={handlePanEnd}
          >
            {/* Enhanced Header with breadcrumb */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-white/50 to-transparent dark:from-slate-800/50">
              <motion.img 
                src="/logo.png" 
                alt="iZyane Logo" 
                className="w-10 h-10 cursor-pointer" 
                onClick={handleLogoClick}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              />
              
              <div className="flex items-center gap-4">
                {/* Network status */}
                <motion.div
                  className="flex items-center gap-1 text-xs"
                  animate={{ color: isOnline ? "#10b981" : "#ef4444" }}
                >
                  {isOnline ? (
                    <Wifi className="w-3 h-3" />
                  ) : (
                    <WifiOff className="w-3 h-3" />
                  )}
                  <span>{isOnline ? "Online" : "Offline"}</span>
                </motion.div>
                
                <ThemeToggle />
                
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                </motion.button>
              </div>
            </div>

            {/* Enhanced Drag Indicator */}
            <motion.div 
              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-slate-300 dark:bg-slate-600 rounded-r-full"
              animate={{ 
                opacity: 0.5 + (dragProgress * 0.5),
                scaleY: 1 + (dragProgress * 0.5)
              }}
            />

            {/* Current section indicator */}
            {lastActiveSection && (
              <div className="px-6 py-2 text-xs text-primary-custom border-b border-slate-100 dark:border-slate-800">
                Currently viewing: {navLinks.find(link => link.href === lastActiveSection)?.label}
              </div>
            )}

            {/* Enhanced Navigation Links */}
            <div className="py-6 space-y-1">
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
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`p-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-primary-custom text-white' 
                        : 'bg-primary-custom/10 group-hover:bg-primary-custom/20'
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
            </div>

            {/* Enhanced Footer with additional info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-200 dark:border-slate-700 bg-gradient-to-t from-white/50 to-transparent dark:from-slate-900/50">
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
                  <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
                  {isOnline ? 'Connected' : 'Offline Mode'}
                </div>
              </motion.div>
            </div>

            {/* Enhanced Gesture hint animation */}
            <motion.div
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-0.5 bg-gradient-to-r from-primary-custom to-transparent rounded-full"
              animate={{ 
                x: [0, 20, 0],
                opacity: [0.3, 1, 0.3],
                scaleX: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
