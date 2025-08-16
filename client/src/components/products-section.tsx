"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  features: string[];
  image: string;
  category: string;
  categoryIcon: string;
  primaryColor: string;
  isFeatured: boolean;
  technologies: string[];
  pricing: {
    starter: string;
    professional: string;
    enterprise: string;
  };
}

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  // Prevent page scroll when section is in view
  useEffect(() => {
    if (isInView) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isInView]);

  const handleNext = () => {
    if (isScrolling || !products.length) return;
    setIsScrolling(true);
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % products.length);
    setTimeout(() => setIsScrolling(false), 500);
  };

  const handlePrev = () => {
    if (isScrolling || !products.length) return;
    setIsScrolling(true);
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
    setTimeout(() => setIsScrolling(false), 500);
  };

  // Handle wheel/scroll events globally when section is in view
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isInView || isScrolling) return;
      
      e.preventDefault();
      
      if (e.deltaY > 0) {
        handleNext();
      } else if (e.deltaY < 0) {
        handlePrev();
      }
    };

    if (isInView) {
      window.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isInView, isScrolling, activeIndex, products.length]);

  // Handle touch events for swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isInView) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isInView) return;
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!isInView || !touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;

    if (isUpSwipe) {
      handleNext();
    } else if (isDownSwipe) {
      handlePrev();
    }
  };

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      y: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      y: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  if (!products.length) return null;

  const currentProduct = products[activeIndex];

  return (
    <section 
      ref={sectionRef} 
      id="products" 
      className="min-h-screen bg-white dark:bg-slate-800 relative overflow-hidden flex items-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Parallax Background Elements */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-l from-green-100/30 to-transparent dark:from-green-900/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-gradient-to-r from-blue-100/30 to-transparent dark:from-blue-900/20 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-custom/5 to-transparent" />

      <div className="container-custom w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-responsive mb-6">Our Products</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Innovative solutions designed to solve real-world problems and accelerate business growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column (Image) */}
          <div className="relative">
            <motion.img
              key={activeIndex}
              src={currentProduct.image}
              alt={currentProduct.name}
              className="rounded-2xl shadow-2xl w-full h-[480px] object-cover"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Right Column (Carousel Content) */}
          <div className="relative overflow-hidden h-[480px] flex flex-col">
            <div className="flex-1 relative">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    y: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 }
                  }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <div
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-4 w-fit ${
                      currentProduct.primaryColor === "primary-custom"
                        ? "bg-primary-custom/10 text-primary-custom"
                        : currentProduct.primaryColor === "accent-custom"
                        ? "bg-accent-custom/10 text-accent-custom"
                        : `bg-${currentProduct.primaryColor}/10 text-${currentProduct.primaryColor}`
                    }`}
                  >
                    <i className={`${currentProduct.categoryIcon} mr-2`}></i>
                    {currentProduct.category}
                  </div>
                  <h3 className="text-3xl font-bold mb-6">{currentProduct.name}</h3>
                  <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
                    {currentProduct.description}
                  </p>
                  <div className="flex justify-start">
                    <a
                      href="#contact"
                      className="inline-flex items-center text-primary-custom hover:text-primary-custom/80 font-semibold transition-colors duration-200"
                      onClick={e => {
                        e.preventDefault();
                        const el = document.getElementById("contact");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Learn More
                      <i className="fas fa-arrow-right ml-2"></i>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Visual indicator for scroll interaction */}
        {isInView && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
              Scroll to browse products
            </p>
            <div className="flex justify-center space-x-1">
              {products.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === activeIndex
                      ? "bg-primary-custom"
                      : "bg-slate-300 dark:bg-slate-600"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}