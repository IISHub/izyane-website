import { useState, useEffect } from "react";
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
  const [showAll, setShowAll] = useState(false);

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

  const displayedProducts = showAll ? products : products.filter(product => product.isFeatured);

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
        
        <div className="space-y-16">
          {displayedProducts.map((product, index) => {
            const reverse = index % 2 !== 0;
            return (
              <div key={product.id} className={`grid lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`${reverse ? 'lg:col-start-2' : 'order-2 lg:order-1'}`}>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
                    product.primaryColor === 'primary-custom' 
                      ? 'bg-primary-custom/10 text-primary-custom'
                      : product.primaryColor === 'accent-custom'
                      ? 'bg-accent-custom/10 text-accent-custom'
                      : `bg-${product.primaryColor}/10 text-${product.primaryColor}`
                  }`}>
                    <i className={`${product.categoryIcon} mr-2`}></i>
                    {product.category}
                  </div>
                  <h3 className="text-3xl font-bold text-responsive mb-6">{product.name}</h3>
                  <p className="text-xl text-slate-600 dark:text-slate-300 mb-6">{product.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-responsive mb-3">Key Features:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {product.features.slice(0, 4).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-slate-600 dark:text-slate-300">
                          <i className="fas fa-check-circle text-emerald-500 mr-3 flex-shrink-0"></i>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                      {product.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="btn-solid px-8 py-3">
                      Start Free Trial
                    </button>
                    <button className="btn-outline px-8 py-3">
                      Learn More
                    </button>
                  </div>
                </div>
                <div className={`${reverse ? 'lg:col-start-1' : 'order-1 lg:order-2'}`}>
                  <div className="relative group overflow-hidden rounded-2xl">
                    <div style={{ transform: imageScale.transform }}>
                      <img 
                        src={product.image} 
                        alt={`${product.name} interface`}
                        className="rounded-2xl shadow-2xl w-full h-auto transition-all duration-500 group-hover:shadow-3xl"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!showAll && products.length > 2 && (
          <div className="text-center mt-16">
            <button 
              onClick={() => setShowAll(true)}
              className="btn-outline px-8 py-3"
            >
              See All Products ({products.length - 2} more)
            </button>
          </div>
        )}

        {showAll && (
          <div className="text-center mt-16">
            <button 
              onClick={() => setShowAll(false)}
              className="btn-outline px-8 py-3"
            >
              Show Less
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
