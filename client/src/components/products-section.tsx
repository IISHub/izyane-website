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
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  const colorClassMap: Record<string, string> = {
    'primary-custom': 'bg-primary-custom/10 text-primary-custom',
    'accent-custom': 'bg-accent-custom/10 text-accent-custom',
    'blue-600': 'bg-blue-600/10 text-blue-600',
    'purple-600': 'bg-purple-600/10 text-purple-600',
    'green-500': 'bg-green-500/10 text-green-500',
    'default': 'bg-slate-100 text-slate-700'
  };

  // Fetch products
  useEffect(() => {
    fetch('/data/products.json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error loading products:', error));
  }, []);

  // Scroll-based detection to find which product card is closest to viewport center
  useEffect(() => {
    if (products.length === 0) return;

    const updateActiveProduct = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      productRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const distance = Math.abs(cardCenter - viewportCenter);

          // Only consider cards that are at least partially visible
          if (rect.bottom > 0 && rect.top < window.innerHeight) {
            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = index;
            }
          }
        }
      });

      if (closestIndex !== currentProductIndex && closestIndex < products.length) {
        setCurrentProductIndex(closestIndex);
      }
    };

    // Throttled scroll handler
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveProduct();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check after refs are set
    const timeoutId = setTimeout(() => {
      updateActiveProduct();
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [products.length, currentProductIndex]);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const currentProduct = products[currentProductIndex] || products[0];

  if (products.length === 0) {
    return (
      <section id="products" className="py-20 bg-white dark:bg-slate-800 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center">
            <div className="text-slate-500">Loading products...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      id="products" 
      className="bg-white dark:bg-slate-800 relative"
    >
      {/* Section Header */}
      <div className="container-custom pt-20 pb-12">
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-responsive mt-16 mb-6" style={{ lineHeight: 3 }}>Our Products</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mb-6 mx-auto">
            Innovative solutions designed to solve real-world problems and accelerate business growth.
          </p>
        </div>
      </div>

      {/* Sticky Scroll Container */}
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Left Column - Sticky Image */}
          <div className="lg:h-auto">
            <div className="lg:sticky lg:top-24 h-[400px] lg:h-[70vh]">
              <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl">
                {/* Animated Image */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentProduct?.id}
                    src={currentProduct?.image}
                    alt={`${currentProduct?.name} interface`}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </AnimatePresence>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Product Info Overlay */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProduct?.id}
                    className="absolute bottom-0 left-0 right-0 p-6 lg:p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-3 backdrop-blur-sm ${
                      colorClassMap[currentProduct?.primaryColor] ?? colorClassMap['default']
                    }`}>
                      <i className={`${currentProduct?.categoryIcon} mr-2`}></i>
                      {currentProduct?.category}
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                      {currentProduct?.name}
                    </h3>
                    <p className="text-white/90 text-sm lg:text-base max-w-md">
                      {currentProduct?.shortDescription}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Progress Indicators */}
                <div className="absolute top-6 right-6 flex flex-col gap-2">
                  {products.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentProductIndex
                          ? 'bg-white scale-125'
                          : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Scrollable Product Cards */}
          <div className="space-y-6 lg:space-y-8 pb-20">
            {products.map((product, index) => {
              const isActive = index === currentProductIndex;
              
              return (
                <motion.div
                  key={product.id}
                  ref={(el) => { productRefs.current[index] = el; }}
                  className={`p-6 lg:p-8 rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-slate-700 border-primary shadow-xl scale-100'
                      : 'bg-slate-50/80 dark:bg-slate-800/80 border-transparent hover:border-slate-200 dark:hover:border-slate-600'
                  }`}
                  style={{ minHeight: '50vh' }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setCurrentProductIndex(index)}
                >
                  {/* Category Badge */}
                  <motion.div
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-6 ${
                      colorClassMap[product.primaryColor] ?? colorClassMap['default']
                    }`}
                    animate={{ scale: isActive ? 1 : 0.95, opacity: isActive ? 1 : 0.7 }}
                    transition={{ duration: 0.3 }}
                  >
                    <i className={`${product.categoryIcon} mr-2`}></i>
                    {product.category}
                  </motion.div>

                  {/* Product Name */}
                  <motion.h3
                    className="text-2xl lg:text-3xl font-bold text-responsive mb-4"
                    animate={{ opacity: isActive ? 1 : 0.6 }}
                    transition={{ duration: 0.3 }}
                  >
                    {product.name}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    className="text-slate-600 dark:text-slate-300 mb-6 text-base lg:text-lg leading-relaxed"
                    animate={{ opacity: isActive ? 1 : 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {product.description}
                  </motion.p>

                  {/* Learn More Link */}
                  <motion.a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      scrollToContact();
                    }}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-base group"
                    animate={{ opacity: isActive ? 1 : 0.6 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ x: 5 }}
                  >
                    Learn more
                    <i className="fas fa-arrow-right text-sm transition-transform group-hover:translate-x-1"></i>
                  </motion.a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}