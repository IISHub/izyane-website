import { useState, useEffect } from "react";
import { ThemeToggle } from '@/components/theme-toggle';
import { Link } from 'wouter';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > 50); // Add blur effect after 50px of scrolling
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
    <motion.nav 
      className={`fixed height-10 top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        hasScrolled 
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-700/50' 
          : 'bg-transparent border-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container-custom py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src="/logo.png" 
              alt="iZyane Logo" 
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-contain"
            />
            <span className="text-lg sm:text-xl font-bold text-responsive">iZyane</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-600 dark:text-white hover:text-primary-custom transition-colors duration-200 font-medium">
              Home
            </Link>
            <button onClick={() => scrollToSection('about')} className="text-slate-600 dark:text-white hover:text-primary-custom transition-colors duration-200 font-medium">
              About
            </button>
            <button onClick={() => scrollToSection('services')} className="text-slate-600 dark:text-white hover:text-primary-custom transition-colors duration-200 font-medium">
              Services
            </button>
            <button onClick={() => scrollToSection('products')} className="text-slate-600 dark:text-white hover:text-primary-custom transition-colors duration-200 font-medium">
              Products
            </button>
            <Link href="/team" className="text-slate-600 dark:text-white hover:text-primary-custom transition-colors duration-200 font-medium">
              Team
            </Link>
            <button onClick={() => scrollToSection('contact')} className="text-slate-600 dark:text-white hover:text-primary-custom transition-colors duration-200 font-medium">
              Contact
            </button>
            
            <ThemeToggle />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button 
              className="text-slate-600 dark:text-slate-300 hover:text-primary-custom"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className={`md:hidden mt-4 pb-4 border-t transition-all duration-300 ${
            hasScrolled 
              ? 'border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg rounded-lg mx-2' 
              : 'border-slate-200/30 dark:border-slate-700/30 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-lg mx-2'
          }`}>
            <div className="flex flex-col space-y-3 pt-4">
              <button onClick={() => scrollToSection('home')} className="text-slate-600 dark:text-white hover:text-primary-custom transition-colors duration-200 font-medium text-left">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="text-slate-600 dark:text-white hover:text-primary-custom transition-colors duration-200 font-medium text-left">
                About
              </button>
              <button onClick={() => scrollToSection('services')} className="text-slate-600 dark:text-white hover:text-primary-custom transition-colors duration-200 font-medium text-left">
                Services
              </button>
              <button onClick={() => scrollToSection('products')} className="text-slate-600 dark:text-white hover:text-primary-custom transition-colors duration-200 font-medium text-left">
                Products
              </button>

              <Link href="/team" className="text-slate-600 dark:text-white hover:text-primary-custom transition-colors duration-200 font-medium text-left">
                Team
              </Link>

              <button onClick={() => scrollToSection('contact')} className="text-slate-600 dark:text-white hover:text-primary-custom transition-colors duration-200 font-medium text-left">
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  );
}
