import { useState, useEffect } from "react";
import { ThemeToggle } from '@/components/theme-toggle';
import { Link } from 'wouter';
import { motion } from "framer-motion";

export default function Navigation() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Logo - Fixed top left */}
      <motion.div
        className="fixed top-6 left-6 z-50 flex items-center space-x-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img 
          src="/logo.png" 
          alt="iZyane Logo" 
          className="w-8 h-8 rounded-lg object-contain"
        />
        <span className="text-xl font-bold text-responsive">iZyane</span>
      </motion.div>

      {/* Theme Toggle - Fixed top right */}
      <motion.div
        className="fixed top-6 right-6 z-50 hidden md:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <ThemeToggle />
      </motion.div>

      {/* Mobile Menu Button */}
      <motion.div
        className="fixed top-6 right-6 z-50 md:hidden flex items-center space-x-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <ThemeToggle />
        <button 
          className="w-10 h-10 rounded-full bg-white/20 dark:bg-slate-800/20 backdrop-blur-lg border border-white/30 dark:border-slate-700/30 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-primary-custom transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
        </button>
      </motion.div>

      {/* Navigation Dock - Desktop only */}
      <motion.nav
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300 hidden md:block ${
          hasScrolled 
            ? 'nav-dock-scrolled' 
            : 'nav-dock'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center space-x-1 px-2 py-1">
          <Link href="/" className="nav-dock-item">
            Home
          </Link>
          
          <button 
            onClick={() => scrollToSection('about')} 
            className="nav-dock-item"
          >
            About
          </button>
          
          <button 
            onClick={() => scrollToSection('services')} 
            className="nav-dock-item"
          >
            Services
          </button>
          
          <button 
            onClick={() => scrollToSection('products')} 
            className="nav-dock-item"
          >
            Products
          </button>
          
          <Link href="/team" className="nav-dock-item">
            Team
          </Link>
          
          <Link href="/portfolio" className="nav-dock-item">
            Portfolio
          </Link>
          
          <Link href="/careers" className="nav-dock-item">
            Careers
          </Link>
          
          <button 
            onClick={() => scrollToSection('contact')} 
            className="nav-dock-item"
          >
            Contact
          </button>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 z-30 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <motion.div
            className="absolute top-20 left-6 right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg rounded-2xl border border-white/30 dark:border-slate-700/30 p-6"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col space-y-4">
              <Link href="/" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              
              <button 
                onClick={() => scrollToSection('about')} 
                className="mobile-nav-item text-left"
              >
                About
              </button>
              
              <button 
                onClick={() => scrollToSection('services')} 
                className="mobile-nav-item text-left"
              >
                Services
              </button>
              
              <button 
                onClick={() => scrollToSection('products')} 
                className="mobile-nav-item text-left"
              >
                Products
              </button>
              
              <Link href="/team" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
                Team
              </Link>
              
              <Link href="/portfolio" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
                Portfolio
              </Link>
              
              <Link href="/careers" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
                Careers
              </Link>
              
              <button 
                onClick={() => scrollToSection('contact')} 
                className="mobile-nav-item text-left"
              >
                Contact
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
