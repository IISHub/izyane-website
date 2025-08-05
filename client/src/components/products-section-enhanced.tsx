import { useState, useEffect, useRef } from "react";
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

export default function ProductsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  // Scroll progress for the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Enhanced scroll transforms
  const sectionY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.3], ["30px", "0px"]);
  
  // Product switching based on scroll position
  const productProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  
  // Individual product animations
  const product1Opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const product2Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6, 0.7], [0, 1, 1, 0]);
  const product3Opacity = useTransform(scrollYProgress, [0.6, 0.7, 0.8, 0.9], [0, 1, 1, 0]);

  // Background animations
  const backgroundRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const floatingY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

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

  // Update active product based on scroll
  useEffect(() => {
    const unsubscribe = productProgress.on("change", (latest) => {
      const totalProducts = Math.min(products.length, 3); // Limit to 3 for animation
      const newIndex = Math.min(Math.floor(latest * totalProducts), totalProducts - 1);
      if (newIndex !== activeProductIndex && products.length > 0) {
        setActiveProductIndex(newIndex);
      }
    });

    return () => unsubscribe();
  }, [productProgress, activeProductIndex, products.length]);

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

  const displayedProducts = showAll ? products : products.filter(product => product.isFeatured);
  const animatedProducts = displayedProducts.slice(0, 3); // First 3 products for scroll animation

  return (
    <motion.section 
      ref={sectionRef}
      id="products" 
      className="section-padding bg-white dark:bg-slate-800 relative overflow-hidden min-h-screen"
      style={{ y: sectionY }}
    >
      {/* Enhanced Parallax Background Elements */}
      <motion.div 
        className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-l from-green-100/30 to-transparent dark:from-green-900/20 rounded-full blur-3xl"
        style={{ 
          ...backgroundParallax,
          rotate: backgroundRotation 
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 left-0 w-72 h-72 bg-gradient-to-r from-blue-100/30 to-transparent dark:from-blue-900/20 rounded-full blur-3xl"
        style={decorationParallax}
      />

      {/* Floating animated elements */}
      <motion.div 
        className="absolute top-20 right-1/4 w-6 h-6 bg-primary-custom/20 rounded-full"
        style={{ y: floatingY }}
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
        style={{ y: floatingY }}
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

        {/* Scroll-Triggered Product Showcase */}
        <div className="relative">
          {/* Active Product Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2">
              {animatedProducts.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeProductIndex 
                      ? 'bg-primary-custom scale-125' 
                      : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </div>

          {/* Layered Product Cards with Scroll Animation */}
          <div className="relative h-[600px] mb-16">
            {animatedProducts.map((product, index) => {
              const isActive = index === activeProductIndex;
              const opacity = index === 0 ? product1Opacity : 
                             index === 1 ? product2Opacity : 
                             product3Opacity;
              
              return (
                <motion.div
                  key={product.id}
                  className="absolute inset-0 grid lg:grid-cols-2 gap-12 items-center"
                  style={{ 
                    opacity,
                    zIndex: isActive ? 10 : index 
                  }}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2,
                    opacity: { duration: 0.3 }
                  }}
                  viewport={{ once: true }}
                >
                  {/* Product Content */}
                  <motion.div 
                    className="order-2 lg:order-1"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
                        product.primaryColor === 'primary-custom' 
                          ? 'bg-primary-custom/10 text-primary-custom'
                          : product.primaryColor === 'accent-custom'
                          ? 'bg-accent-custom/10 text-accent-custom'
                          : `bg-${product.primaryColor}/10 text-${product.primaryColor}`
                      }`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <i className={`${product.categoryIcon} mr-2`}></i>
                      {product.category}
                    </motion.div>
                    
                    <motion.h3 
                      className="text-3xl font-bold text-responsive mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      {product.name}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-xl text-slate-600 dark:text-slate-300 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {product.description}
                    </motion.p>
                    
                    {/* Animated Features List */}
                    <motion.div 
                      className="mb-6"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <h4 className="text-lg font-semibold text-responsive mb-3">Key Features:</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {product.features.slice(0, 4).map((feature, featureIndex) => (
                          <motion.li 
                            key={featureIndex} 
                            className="flex items-center text-slate-600 dark:text-slate-300"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ 
                              duration: 0.4, 
                              delay: 0.7 + (featureIndex * 0.1) 
                            }}
                            viewport={{ once: true }}
                            whileHover={{ x: 5 }}
                          >
                            <motion.i 
                              className="fas fa-check-circle text-emerald-500 mr-3 flex-shrink-0"
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{ 
                                duration: 0.3, 
                                delay: 0.8 + (featureIndex * 0.1),
                                type: "spring",
                                stiffness: 300
                              }}
                              viewport={{ once: true }}
                            />
                            <span className="text-sm">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Tech Stack with Staggered Animation */}
                    <motion.div 
                      className="mb-8"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex flex-wrap gap-2">
                        {product.technologies.map((tech, techIndex) => (
                          <motion.span 
                            key={techIndex}
                            className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium cursor-pointer"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ 
                              duration: 0.3, 
                              delay: 1 + (techIndex * 0.1) 
                            }}
                            viewport={{ once: true }}
                            whileHover={{ 
                              scale: 1.1,
                              backgroundColor: "rgba(59, 130, 246, 0.1)"
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    {/* CTA Button with Enhanced Animation */}
                    <motion.div 
                      className="flex flex-col sm:flex-row gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                      viewport={{ once: true }}
                    >
                      <motion.button 
                        className="btn-solid px-8 py-3 relative overflow-hidden group"
                        onClick={scrollToContact}
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">Get Started</span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                      </motion.button>
                    </motion.div>
                  </motion.div>
                  
                  {/* Product Image with Enhanced Effects */}
                  <motion.div 
                    className="order-1 lg:order-2"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="relative group overflow-hidden rounded-2xl"
                      whileHover={{ 
                        scale: 1.02,
                        rotateY: 5,
                        rotateX: 5
                      }}
                      style={{ perspective: 1000 }}
                      transition={{ duration: 0.4 }}
                    >
                      <motion.div style={{ transform: imageScale.transform }}>
                        <motion.img 
                          src={product.image} 
                          alt={`${product.name} interface`}
                          className="rounded-2xl shadow-2xl w-full h-auto transition-all duration-500 group-hover:shadow-3xl"
                          initial={{ scale: 1.1 }}
                          whileInView={{ scale: 1 }}
                          transition={{ duration: 0.8 }}
                          viewport={{ once: true }}
                        />
                      </motion.div>
                      
                      {/* Overlay with Gradient Animation */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      />
                      
                      {/* Floating Badge */}
                      <motion.div
                        className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: 0.8,
                          type: "spring",
                          stiffness: 300
                        }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          animate={{
                            y: [0, -5, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          Featured
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Traditional Products Grid for Additional Items */}
        {showAll && displayedProducts.length > 3 && (
          <motion.div 
            className="space-y-16 mt-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {displayedProducts.slice(3).map((product, index) => {
              const reverse = index % 2 !== 0;
              return (
                <motion.div 
                  key={product.id} 
                  className={`grid lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:grid-flow-col-dense' : ''}`}
                  initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className={`${reverse ? 'lg:col-start-2' : 'order-2 lg:order-1'}`}>
                    <motion.div 
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
                        product.primaryColor === 'primary-custom' 
                          ? 'bg-primary-custom/10 text-primary-custom'
                          : product.primaryColor === 'accent-custom'
                          ? 'bg-accent-custom/10 text-accent-custom'
                          : `bg-${product.primaryColor}/10 text-${product.primaryColor}`
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <i className={`${product.categoryIcon} mr-2`}></i>
                      {product.category}
                    </motion.div>
                    <h3 className="text-3xl font-bold text-responsive mb-6">{product.name}</h3>
                    <p className="text-xl text-slate-600 dark:text-slate-300 mb-6">{product.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-responsive mb-3">Key Features:</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {product.features.slice(0, 4).map((feature, featureIndex) => (
                          <motion.li 
                            key={featureIndex} 
                            className="flex items-center text-slate-600 dark:text-slate-300"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <i className="fas fa-check-circle text-emerald-500 mr-3 flex-shrink-0"></i>
                            <span className="text-sm">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-8">
                      <div className="flex flex-wrap gap-2">
                        {product.technologies.map((tech, techIndex) => (
                          <motion.span 
                            key={techIndex}
                            className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.1 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.button 
                        className="btn-solid px-8 py-3" 
                        onClick={scrollToContact}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Get Started
                      </motion.button>
                    </div>
                  </div>
                  <div className={`${reverse ? 'lg:col-start-1' : 'order-1 lg:order-2'}`}>
                    <motion.div 
                      className="relative group overflow-hidden rounded-2xl"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div style={{ transform: imageScale.transform }}>
                        <img 
                          src={product.image} 
                          alt={`${product.name} interface`}
                          className="rounded-2xl shadow-2xl w-full h-auto transition-all duration-500 group-hover:shadow-3xl"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Enhanced Show More/Less Buttons */}
        {!showAll && products.length > 3 && (
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button 
              onClick={() => setShowAll(true)}
              className="btn-outline px-8 py-3 relative overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">
                See All Products ({products.length - 3} more)
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-custom/10 to-accent-custom/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </motion.div>
        )}

        {showAll && (
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.button 
              onClick={() => setShowAll(false)}
              className="btn-outline px-8 py-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Show Less
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
