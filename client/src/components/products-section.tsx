import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
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
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Parallax effects
  const backgroundParallax = useParallax({ speed: 0.1 });
  const imageScale = useParallaxScale({ speed: 0.1, initialScale: 1 });
  const decorationParallax = useParallax({ speed: -0.2 });

  const colorClassMap: Record<string, string> = {
    'primary-custom': 'bg-primary-custom/10 text-primary-custom',
    'accent-custom': 'bg-accent-custom/10 text-accent-custom',
    'blue-600': 'bg-blue-600/10 text-blue-600',
    'purple-600': 'bg-purple-600/10 text-purple-600',
    'green-500': 'bg-green-500/10 text-green-500',
    'default': 'bg-slate-100 text-slate-700'
  };

  useEffect(() => {
    fetch('/data/products.json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error loading products:', error));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = productRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setCurrentProductIndex(index);
            }
          }
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.5,
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    productRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [products]);

  const setProductRef = useCallback((el: HTMLDivElement | null, index: number) => {
    productRefs.current[index] = el;
  }, []);

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
      <section id="products" className="section-padding bg-white dark:bg-slate-800 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center">
            <div className="text-slate-500">Loading products...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="section-padding bg-white dark:bg-slate-800 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div 
        className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-l from-green-100/30 to-transparent dark:from-green-900/20 rounded-full blur-3xl"
        style={backgroundParallax}
      />
      
      <div 
        className="absolute bottom-1/4 left-0 w-72 h-72 bg-gradient-to-r from-blue-100/30 to-transparent dark:from-blue-900/20 rounded-full blur-3xl"
        style={decorationParallax}
      />
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-responsive mb-6">Our Products</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Innovative solutions designed to solve real-world problems and accelerate business growth.
          </p>
        </div>
        
        {/* Horizontal Layout: Fixed Image Left + Scrollable Cards Right */}
        <div className="grid lg:grid-cols-2 gap-12 h-[600px]">
          {/* Left Side - Fixed Product Image */}
          <div className="relative group overflow-hidden rounded-2xl">
            <motion.div 
              key={currentProduct?.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{ transform: imageScale.transform }}
            >
              <img 
                src={currentProduct?.image} 
                alt={`${currentProduct?.name} interface`}
                loading="lazy"
                decoding="async"
                className="rounded-2xl shadow-2xl w-full h-full object-cover transition-all duration-500 group-hover:shadow-3xl"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Product Info Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-3 ${
                colorClassMap[currentProduct?.primaryColor] ?? colorClassMap['default']
              }`}>
                <i className={`${currentProduct?.categoryIcon} mr-2`}></i>
                {currentProduct?.category}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{currentProduct?.name}</h3>
              <p className="text-white/90 text-sm">{currentProduct?.shortDescription}</p>
            </div>
          </div>

          {/* Right Side - Scrollable Product Cards */}
          <div 
            ref={scrollContainerRef}
            className="overflow-y-auto space-y-6 pr-4 scrollbar-hide"
          >
            {products.map((product, index) => (
              <div 
                key={product.id}
                ref={(el) => setProductRef(el, index)}
                className={`p-6 rounded-xl border transition-all duration-500 ${
                  index === currentProductIndex 
                    ? 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 shadow-lg opacity-100 scale-100' 
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-40 scale-95 hover:opacity-60'
                }`}
              >
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                  colorClassMap[product.primaryColor] ?? colorClassMap['default']
                }`}>
                  <i className={`${product.categoryIcon} mr-2`}></i>
                  {product.category}
                </div>
                
                <h3 className="text-xl font-bold text-responsive mb-3">{product.name}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm leading-relaxed">{product.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-responsive mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {product.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-start text-slate-600 dark:text-slate-300">
                        <i className="fas fa-check-circle text-emerald-500 mr-2 mt-0.5 flex-shrink-0 text-xs"></i>
                        <span className="text-xs">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {product.technologies.slice(0, 4).map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  className="btn-solid px-6 py-2 text-sm w-full" 
                  onClick={scrollToContact}
                  aria-label={`Inquire about ${product.name}`}
                >
                  Inquire
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}