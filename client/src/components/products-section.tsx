import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  ExternalLink,
  Laptop
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  features: string[];
  image: string;
  images?: string[];
  category: string;
  categoryIcon: string;
  primaryColor: string;
  isFeatured: boolean;
  technologies: string[];
  pricing?: {
    starter: string;
    professional: string;
    enterprise: string;
  };
}

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  // Fetch products data
  useEffect(() => {
    fetch('/data/products.json')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading products:', error);
        setLoading(false);
      });
  }, []);

  // Keyboard navigation between products
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!products.length) return;
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % products.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [products.length]);

  const resolveImage = (src: string | undefined) => {
    if (!src) return '';
    if (/^https?:\/\//.test(src)) return src;
    const base = typeof import.meta !== 'undefined' && (import.meta as any).env ? (import.meta as any).env.BASE_URL || '/' : '/';
    return src.startsWith('/') ? `${base}${src.slice(1)}` : `${base}${src}`;
  };

  const handleProductClick = (productId: string) => {
    setLocation(`/product/${productId}`);
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + (window.pageYOffset || window.scrollY || 0);
      const offsetPosition = Math.max(0, elementPosition - headerOffset);
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  // Scroll active tab into view when index changes
  useEffect(() => {
    if (tabsContainerRef.current) {
      const activeTab = tabsContainerRef.current.children[currentIndex] as HTMLElement;
      if (activeTab) {
        activeTab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [currentIndex]);

  if (loading || products.length === 0) {
    return (
      <section id="products" className="py-24 bg-white dark:bg-slate-800 relative">
        <div className="container-custom text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-64 mx-auto" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-96 mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  const currentProduct = products[currentIndex];
  const currentImageSrc = resolveImage(currentProduct?.image);

  return (
    <section 
      id="products" 
      className="py-20 sm:py-24 bg-white dark:bg-slate-800 relative overflow-hidden transition-colors duration-300"
    >
      {/* Background Decorative Blurs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-custom/10 dark:bg-primary-custom/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-custom/10 text-primary-custom rounded-full text-sm font-semibold mb-4 border border-primary-custom/20">
              <Layers className="w-4 h-4" />
              <span>Proprietary Technology Platforms</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-responsive mb-4 tracking-tight">
              Our Products
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Explore our suite of enterprise fintech and software platforms, engineered for seamless scalability, compliance, and financial inclusion.
            </p>
          </motion.div>
        </div>

        {/* Interactive Product Selector Rail */}
        <div className="relative mb-10 max-w-5xl mx-auto">
          {/* Scrollable Tab Pills */}
          <div 
            ref={tabsContainerRef}
            className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-3 pt-1 px-1 scrollbar-none no-scrollbar snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={product.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 snap-center flex-shrink-0 ${
                    isActive 
                      ? 'text-white shadow-md shadow-primary-custom/20' 
                      : 'bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700 border border-transparent'
                  }`}
                  aria-selected={isActive}
                  role="tab"
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-product-pill"
                      className="absolute inset-0 bg-primary-custom rounded-xl sm:rounded-2xl z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <i className={`${product.categoryIcon} text-xs sm:text-sm opacity-90`} />
                    <span>{product.name}</span>
                  </span>
                  {product.isFeatured && (
                    <span className="relative z-10 w-2 h-2 rounded-full bg-amber-400" title="Featured Product" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Interactive Showcase Stage */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl backdrop-blur-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Column: Interactive Product Visual & Mockup Stage */}
                <div className="lg:col-span-6 order-2 lg:order-1">
                  <div 
                    onClick={() => handleProductClick(currentProduct.id)}
                    className="group relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/60 dark:border-slate-700/60 bg-slate-900 cursor-pointer aspect-[16/10] sm:aspect-[16/11] flex items-center justify-center transition-transform duration-300 hover:scale-[1.01]"
                  >
                    {/* Visual Image */}
                    <img
                      src={currentImageSrc}
                      alt={`${currentProduct.name} Preview`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).onerror = null;
                        (e.currentTarget as HTMLImageElement).src = '/img/banner1.png';
                      }}
                    />

                    {/* Gradient Overlay for Aesthetics */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                    {/* Floating Badges */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 backdrop-blur-md shadow-sm">
                        <i className={`${currentProduct.categoryIcon} text-primary-custom`} />
                        <span>{currentProduct.category}</span>
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-black/60 text-white backdrop-blur-md">
                        {String(currentIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Hover Prompt */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white/90">
                      <div className="flex items-center gap-2 text-xs font-medium bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 group-hover:bg-primary-custom/90 transition-colors duration-200">
                        <Laptop className="w-3.5 h-3.5" />
                        <span>Interactive Platform View</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-white group-hover:translate-x-1 transition-transform duration-200">
                        <span>Details</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Product Deep Dive & Information */}
                <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
                  {/* Category & Status */}
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-custom/10 text-primary-custom border border-primary-custom/20">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{currentProduct.category}</span>
                    </span>
                    {currentProduct.isFeatured && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        ★ Featured Platform
                      </span>
                    )}
                  </div>

                  {/* Product Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-responsive tracking-tight">
                    {currentProduct.name}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    {currentProduct.description}
                  </p>

                  {/* Key Features Bullet Grid */}
                  {/* <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                      Key Capabilities & Architecture
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentProduct.features.slice(0, 6).map((feature, fIndex) => (
                        <div 
                          key={fIndex}
                          className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div> */}

                  {/* Technology Stack Pills */}
                  {/* {currentProduct.technologies && currentProduct.technologies.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                        Tech Stack & Integrations
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {currentProduct.technologies.map((tech, tIndex) => (
                          <span
                            key={tIndex}
                            className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300/40 dark:border-slate-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )} */}

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => handleProductClick(currentProduct.id)}
                      className="btn-solid inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all"
                    >
                      <span>Explore Platform</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={scrollToContact}
                      className="btn-outline inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border-slate-300 dark:border-slate-600 hover:border-primary-custom"
                    >
                      <span>Request Demo</span>
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Stage Controller: Prev/Next & Stepper */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {currentProduct.name}
              </span>
              <span>•</span>
              <span>Use arrow keys to navigate</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Stepper Dots */}
              <div className="flex items-center gap-1.5 mr-2">
                {products.map((_, dotIndex) => (
                  <button
                    key={dotIndex}
                    onClick={() => setCurrentIndex(dotIndex)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      dotIndex === currentIndex 
                        ? 'w-6 bg-primary-custom' 
                        : 'w-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to product ${dotIndex + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Buttons */}
              <button
                onClick={prevProduct}
                className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-primary-custom hover:text-white hover:border-primary-custom transition-all"
                aria-label="Previous product"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextProduct}
                className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-primary-custom hover:text-white hover:border-primary-custom transition-all"
                aria-label="Next product"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}