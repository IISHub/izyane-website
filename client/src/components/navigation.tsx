import { useState } from "react";
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
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-custom to-accent-custom rounded-lg flex items-center justify-center">
              <i className="fas fa-bolt text-white text-sm"></i>
            </div>
            <span className="text-xl font-bold text-secondary-custom">TechFlow</span>
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
            <button onClick={() => scrollToSection('careers')} className="text-slate-600 hover:text-primary-custom transition-colors duration-200 font-medium">
              Careers
            </button>
            <Button 
              onClick={() => scrollToSection('contact')} 
              className="bg-primary-custom text-white px-6 py-2 rounded-lg hover:bg-[hsl(221,83%,45%)] transition-colors duration-200 font-medium"
            >
              Contact
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-600 hover:text-primary-custom"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
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
              <button onClick={() => scrollToSection('careers')} className="text-slate-600 hover:text-primary-custom transition-colors duration-200 font-medium text-left">
                Careers
              </button>
              <Button 
                onClick={() => scrollToSection('contact')} 
                className="bg-primary-custom text-white px-6 py-2 rounded-lg hover:bg-[hsl(221,83%,45%)] transition-colors duration-200 font-medium text-center"
              >
                Contact
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
