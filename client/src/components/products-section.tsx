import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

  // Scroll progress for the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  // Enhanced scroll transforms with more dramatic effects
  const sectionY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.2], ["50px", "0px"]);
  
  // Parallax effects
  const backgroundParallax = useParallax({ speed: 0.1 });
  const imageScale = useParallaxScale({ speed: 0.1, initialScale: 1 });
  const decorationParallax = useParallax({ speed: -0.2 });

  useEffect(() => {
    fetch('/data/products.json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error loading products:', error));
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (!products.length) return;
    if (isHovered) {
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
      return;
    }
    autoAdvanceRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => {
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
    };
  }, [products.length, isHovered]);

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
      {/* Enhanced Parallax Background Elements */}
      <motion.div 
        className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-l from-green-100/30 to-transparent dark:from-green-900/20 rounded-full blur-3xl"
        style={{ 
          ...backgroundParallax,
          rotate: useTransform(scrollYProgress, [0, 1], [0, 360]) 
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 left-0 w-72 h-72 bg-gradient-to-r from-blue-100/30 to-transparent dark:from-blue-900/20 rounded-full blur-3xl"
        style={decorationParallax}
      />

      {/* Floating animated elements */}
      <motion.div 
        className="absolute top-20 right-1/4 w-6 h-6 bg-primary-custom/20 rounded-full"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]) }}
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-32 left-1/3 w-4 h-4 bg-accent-custom/30 rounded-full"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]) }}
        animate={{ 
          x: [0, 20, 0],
          y: [0, -10, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
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
            opacity: headerOpacity,
            y: headerY 
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

        {/* Cover Flow Carousel (Wide Rectangular) */}
        <motion.div
          className="relative flex justify-center items-center h-[20rem] mb-2 select-none"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 80, damping: 18 }}
          viewport={{ once: true, amount: 0.3 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {products.length > 0 && (
            products.map((product, i) => {
              // Calculate position relative to activeIndex
              const pos = ((i - activeIndex + products.length) % products.length);
              let displayPos = pos;
              if (pos > products.length / 2) displayPos = pos - products.length;
              if (displayPos < -2 || displayPos > 2) return null;
              // Wide rectangular aspect ratio and transforms
              const baseX = displayPos * 340;
              const scale = 1 - Math.abs(displayPos) * 0.13;
              const rotateY = displayPos * -40;
              const z = 10 - Math.abs(displayPos);
              const opacity = Math.abs(displayPos) === 2 ? 0.2 : 1;
              const isCenter = displayPos === 0;
              return (
                <motion.div
                  key={product.id}
                  className={`absolute left-1/2 top-0 w-[32rem] h-[20rem] rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border-2 border-white dark:border-slate-800 ${isCenter ? 'cursor-pointer' : 'cursor-pointer'}`}
                  style={{
                    x: `calc(-50% + ${baseX}px)` ,
                    scale,
                    zIndex: z,
                    rotateY,
                    opacity,
                    boxShadow: isCenter
                      ? '0 0 0 4px #a7f3d0, 0 12px 48px 0 rgba(16,185,129,0.18), 0 0 32px 8px rgba(16,185,129,0.10)'
                      : '0 2px 12px rgba(0,0,0,0.10)',
                    filter: isCenter ? '' : 'blur(1.5px)',
                    transition: 'all 0.7s cubic-bezier(.4,2,.6,1)',
                    pointerEvents: Math.abs(displayPos) > 2 ? 'none' : 'auto',
                  }}
                  drag={isCenter ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={(e, info) => {
                    if (info.offset.x < -80) setActiveIndex((prev) => (prev + 1) % products.length);
                    if (info.offset.x > 80) setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
                  }}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity, y: 0, rotateY, scale, x: `calc(-50% + ${baseX}px)` }}
                  transition={{ duration: 0.7, type: 'spring', stiffness: 100, damping: 22 }}
                  onClick={() => isCenter ? setModalProduct(product) : setActiveIndex(i)}
                  whileHover={isCenter ? { scale: 1.045, rotateY: 0, boxShadow: '0 0 0 8px #6ee7b7, 0 24px 80px rgba(16,185,129,0.22)' } : {}}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Featured badge */}
                  {product.isFeatured && (
                    <span className="absolute top-4 left-4 z-10 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">Featured</span>
                  )}
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full"
                    draggable={false}
                    loading="lazy"
                    whileHover={isCenter ? { scale: 1.06, rotate: -1 } : {}}
                    transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                  />
                  {/* Short description/tagline for center card */}
                  {isCenter && product.shortDescription && (
                    <motion.div
                      className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white text-lg font-semibold px-6 py-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      {product.shortDescription}
                    </motion.div>
                  )}
                </motion.div>
              );
            })
          )}
          {/* Carousel indicators (dots) */}
          {products.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {products.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full border-2 border-emerald-300 transition-all duration-300 ${idx === activeIndex ? 'bg-emerald-500 scale-125 shadow-lg' : 'bg-white dark:bg-slate-800'}`}
                  aria-label={`Go to product ${idx + 1}`}
                  onClick={() => setActiveIndex(idx)}
                />
              ))}
            </div>
          )}
          {/* Prev/Next buttons */}
          {products.length > 1 && (
            <>
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-900/80 rounded-full shadow p-4 text-4xl z-20 hover:bg-primary-custom/80 hover:text-white transition"
                onClick={() => setActiveIndex((prev) => (prev - 1 + products.length) % products.length)}
                aria-label="Previous"
                style={{backdropFilter: 'blur(8px)'}}
              >
                &#8592;
              </button>
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-900/80 rounded-full shadow p-4 text-4xl z-20 hover:bg-primary-custom/80 hover:text-white transition"
                onClick={() => setActiveIndex((prev) => (prev + 1) % products.length)}
                aria-label="Next"
                style={{backdropFilter: 'blur(8px)'}}
              >
                &#8594;
              </button>
            </>
          )}
        </motion.div>
        {/* Prev/Next buttons */}
        {/* (already rendered above, this duplicate block is removed) */}
      {/* Remove the extra closing div here */}

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
