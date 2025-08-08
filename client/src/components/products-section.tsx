import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useParallax, useParallaxScale } from "@/hooks/use-parallax";

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
function ProductsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);
  
  // Check for reduced motion preference
  const shouldReduceMotion = useReducedMotion();

  // Scroll progress for the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  // Optimized scroll transforms - reduced complexity
  const sectionY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Simplified parallax effects
  const backgroundParallax = useParallax({ speed: 0.05 });
  const decorationParallax = useParallax({ speed: -0.1 });

  useEffect(() => {
    fetch('/data/products.json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error loading products:', error));
  }, []);

  // Auto-advance carousel - optimized with longer intervals
  useEffect(() => {
    if (!products.length || shouldReduceMotion) return;
    if (isHovered) {
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
      return;
    }
    autoAdvanceRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, 6000); // Increased from 4s to 6s for less frequent updates
    return () => {
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
    };
  }, [products.length, isHovered, shouldReduceMotion]);

  // Memoize carousel transform calculations
  const carouselItems = useMemo(() => {
    if (!products.length) return [];
    
    return products.map((product, i) => {
      const pos = ((i - activeIndex + products.length) % products.length);
      let displayPos = pos;
      if (pos > products.length / 2) displayPos = pos - products.length;
      
      // Only render visible cards (-2 to 2)
      if (displayPos < -2 || displayPos > 2) return null;
      
      // Simplified transform calculations
      const baseX = displayPos * 340;
      const scale = 1 - Math.abs(displayPos) * 0.1; // Reduced scale difference
      const rotateY = shouldReduceMotion ? 0 : displayPos * -25; // Reduced rotation
      const z = 10 - Math.abs(displayPos);
      const opacity = Math.abs(displayPos) === 2 ? 0.3 : 1; // Improved visibility
      const isCenter = displayPos === 0;
      
      return {
        product,
        i,
        displayPos,
        baseX,
        scale,
        rotateY,
        z,
        opacity,
        isCenter
      };
    }).filter(Boolean);
  }, [products, activeIndex, shouldReduceMotion]);

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

  return (
    <motion.section 
      ref={sectionRef}
      id="products" 
      className="section-padding bg-white dark:bg-slate-800 relative overflow-hidden"
      style={{ 
        y: sectionY,
        minHeight: "100vh"
      }}
    >
      {/* Simplified Parallax Background Elements */}
      {!shouldReduceMotion && (
        <>
          <motion.div 
            className="absolute top-1/4 right-0 w-60 h-60 bg-gradient-to-l from-green-100/20 to-transparent dark:from-green-900/15 rounded-full blur-3xl"
            style={backgroundParallax}
          />
          
          <motion.div 
            className="absolute bottom-1/4 left-0 w-60 h-60 bg-gradient-to-r from-blue-100/20 to-transparent dark:from-blue-900/15 rounded-full blur-3xl"
            style={decorationParallax}
          />
        </>
      )}

      {/* Simplified floating elements */}
      {!shouldReduceMotion && (
        <>
          <motion.div 
            className="absolute top-20 right-1/4 w-4 h-4 bg-primary-custom/15 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div 
            className="absolute bottom-32 left-1/3 w-3 h-3 bg-accent-custom/20 rounded-full"
            animate={{ 
              y: [0, -8, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </>
      )}
      
      <div className="container-custom relative z-10">
        {/* Debug Progress Indicator */}
        {/* <motion.div 
          className="fixed top-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div>Scroll Progress: {Math.round(scrollYProgress.get() * 100)}%</div>
          <div>Active Product: {activeProductIndex + 1}/{products.length}</div>
          <div>Product Progress: {Math.round(productProgress.get() * 100)}%</div>
          <div className="flex gap-1 mt-2">
            {products.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeProductIndex ? 'bg-blue-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </motion.div> */}

        {/* Enhanced Header with Scroll Animations */}
        <motion.div 
          className="text-center mb-16"
          style={{ 
            opacity: headerOpacity
          }}
        >
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-responsive mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Products
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Innovative solutions designed to solve real-world problems and accelerate business growth.
          </motion.p>
        </motion.div>

        {/* Optimized Cover Flow Carousel */}
        <motion.div
          className="relative flex justify-center items-center h-[20rem] mb-2 select-none"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100, damping: 20 }}
          viewport={{ once: true, amount: 0.3 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {carouselItems.map((item) => {
            if (!item) return null;
            const { product, i, displayPos, baseX, scale, rotateY, z, opacity, isCenter } = item;
            
            return (
              <motion.div
                key={product.id}
                className={`absolute left-1/2 top-0 w-[32rem] h-[20rem] rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 cursor-pointer`}
                style={{
                  x: `calc(-50% + ${baseX}px)`,
                  scale,
                  zIndex: z,
                  rotateY,
                  opacity,
                  // Simplified shadows and effects
                  boxShadow: isCenter
                    ? '0 8px 32px rgba(16,185,129,0.15), 0 0 0 2px rgba(16,185,129,0.2)'
                    : '0 4px 16px rgba(0,0,0,0.08)',
                  filter: isCenter ? 'none' : 'blur(0.5px)', // Reduced blur
                  transition: shouldReduceMotion 
                    ? 'opacity 0.3s ease' 
                    : 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)', // Faster, smoother transition
                  pointerEvents: Math.abs(displayPos) > 2 ? 'none' : 'auto',
                  willChange: 'transform, opacity' // Optimize for transforms
                }}
                drag={isCenter && !shouldReduceMotion ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -60) setActiveIndex((prev) => (prev + 1) % products.length);
                  if (info.offset.x > 60) setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ 
                  opacity, 
                  y: 0, 
                  rotateY, 
                  scale, 
                  x: `calc(-50% + ${baseX}px)` 
                }}
                transition={{ 
                  duration: 0.5, 
                  type: 'spring', 
                  stiffness: 120, 
                  damping: 20 
                }}
                onClick={() => isCenter ? setModalProduct(product) : setActiveIndex(i)}
                whileHover={isCenter && !shouldReduceMotion ? { 
                  scale: 1.02, 
                  boxShadow: '0 12px 48px rgba(16,185,129,0.2)' 
                } : {}}
                whileTap={{ scale: 0.98 }}
              >
                {/* Featured badge */}
                {product.isFeatured && (
                  <span className="absolute top-4 left-4 z-10 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    Featured
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full"
                  draggable={false}
                  loading="lazy"
                  style={{ willChange: 'transform' }} // Optimize for transforms
                />
                {/* Short description for center card only */}
                {isCenter && product.shortDescription && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent text-white text-lg font-semibold px-6 py-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    {product.shortDescription}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
          
          {/* Simplified indicators */}
          {products.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {products.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                    idx === activeIndex 
                      ? 'bg-emerald-500 scale-125' 
                      : 'bg-white/60 dark:bg-slate-600'
                  }`}
                  aria-label={`Go to product ${idx + 1}`}
                  onClick={() => setActiveIndex(idx)}
                />
              ))}
            </div>
          )}
          
          {/* Simplified navigation buttons */}
          {products.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-900/90 rounded-full shadow-lg p-3 text-2xl z-20 hover:bg-emerald-500 hover:text-white transition-colors duration-200"
                onClick={() => setActiveIndex((prev) => (prev - 1 + products.length) % products.length)}
                aria-label="Previous"
              >
                ←
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-900/90 rounded-full shadow-lg p-3 text-2xl z-20 hover:bg-emerald-500 hover:text-white transition-colors duration-200"
                onClick={() => setActiveIndex((prev) => (prev + 1) % products.length)}
                aria-label="Next"
              >
                →
              </button>
            </>
          )}
        </motion.div>

        {/* Modal for product details (Wide Rectangular) */}
        {modalProduct && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalProduct(null)}
          >
            <motion.div
              className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-3xl w-full p-0 relative flex flex-col md:flex-row overflow-hidden"
              initial={{ scale: 0.95, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="md:w-1/2 w-full h-56 md:h-auto bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <motion.img
                  src={modalProduct.image}
                  alt={modalProduct.name}
                  className="object-cover w-full h-full rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                />
              </div>
              <div className="flex-1 p-8 flex flex-col">
                <button
                  className="absolute top-4 right-4 text-2xl text-slate-400 hover:text-slate-700 dark:hover:text-white"
                  onClick={() => setModalProduct(null)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-3 mt-2 ${
                  modalProduct.primaryColor === 'primary-custom' 
                    ? 'bg-primary-custom/10 text-primary-custom'
                    : modalProduct.primaryColor === 'accent-custom'
                    ? 'bg-accent-custom/10 text-accent-custom'
                    : `bg-${modalProduct.primaryColor}/10 text-${modalProduct.primaryColor}`
                }`}>
                  <i className={`${modalProduct.categoryIcon} mr-2`}></i>
                  {modalProduct.category}
                </div>
                <h3 className="text-2xl font-bold mb-2">{modalProduct.name}</h3>
                <p className="text-base text-slate-600 dark:text-slate-300 mb-4">{modalProduct.description}</p>
                <ul className="mb-4 space-y-1">
                  {modalProduct.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-slate-600 dark:text-slate-300 text-sm">
                      <i className="fas fa-check-circle text-emerald-500 mr-2 flex-shrink-0"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mb-4">
                  {modalProduct.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <button 
                  className="btn-solid px-6 py-2 mt-auto"
                  onClick={() => {
                    setModalProduct(null);
                    scrollToContact();
                  }}
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
export default ProductsSection;
