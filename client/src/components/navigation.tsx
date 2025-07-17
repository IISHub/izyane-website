import { useState } from "react";
import { ThemeToggle } from '@/components/theme-toggle';
import { Link } from 'wouter';
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <nav className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src="/logo.png" 
              alt="iZyane Logo" 
              className="w-8 h-8 rounded-lg object-contain"
            />
            <span className="text-xl font-bold text-secondary-custom dark:text-white">iZyane</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-slate-600 hover:text-primary-custom transition-colors duration-200 font-medium">
              Home
            </button>
            <button onClick={() => scrollToSection('about')} className="text-slate-600 hover:text-primary-custom transition-colors duration-200 font-medium">
              About
            </button>
            <button onClick={() => scrollToSection('services')} className="text-slate-600 hover:text-primary-custom transition-colors duration-200 font-medium">
              Services
            </button>
            <button onClick={() => scrollToSection('products')} className="text-slate-600 hover:text-primary-custom transition-colors duration-200 font-medium">
              Products
            </button>

            <Link href="/contact" className="text-slate-600 dark:text-slate-300 hover:text-primary-custom transition-colors duration-200 font-medium">
              Contact
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
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
          <div className="md:hidden mt-4 pb-4 border-t border-slate-200">
            <div className="flex flex-col space-y-3 pt-4">
              <button onClick={() => scrollToSection('home')} className="text-slate-600 hover:text-primary-custom transition-colors duration-200 font-medium text-left">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="text-slate-600 hover:text-primary-custom transition-colors duration-200 font-medium text-left">
                About
              </button>
              <button onClick={() => scrollToSection('services')} className="text-slate-600 hover:text-primary-custom transition-colors duration-200 font-medium text-left">
                Services
              </button>
              <button onClick={() => scrollToSection('products')} className="text-slate-600 hover:text-primary-custom transition-colors duration-200 font-medium text-left">
                Products
              </button>

              <Link href="/contact" className="text-slate-600 dark:text-slate-300 hover:text-primary-custom transition-colors duration-200 font-medium text-left">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
