import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import TopDockNavigation from "@/components/top-dock-navigation";
import BackToTop from "@/components/back-to-top";
import PagePreloader from "@/components/page-preloader";
import Chatbot from "@/components/Chatbot";

interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  features: string[];
  images?: string[];
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

const colorClassMap: Record<string, string> = {
  'primary-custom': 'bg-primary-custom/10 text-primary-custom',
  'accent-custom': 'bg-accent-custom/10 text-accent-custom',
  'blue-600': 'bg-blue-600/10 text-blue-600',
  'purple-600': 'bg-purple-600/10 text-purple-600',
  'green-500': 'bg-green-500/10 text-green-500',
  'default': 'bg-slate-100 text-slate-700'
};

const gradientClassMap: Record<string, string> = {
  'primary-custom': 'from-primary-custom to-accent-custom',
  'accent-custom': 'from-accent-custom to-primary-custom',
  'blue-600': 'from-blue-600 to-blue-800',
  'purple-600': 'from-purple-600 to-purple-800',
  'green-500': 'from-green-500 to-green-700',
  'default': 'from-slate-500 to-slate-700'
};

export default function ProductDetail() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/products.json')
      .then(response => response.json())
      .then(data => {
        const foundProduct = data.find((p: Product) => p.id === params.id);
        setProduct(foundProduct || null);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading product:', error);
        setLoading(false);
      });
  }, [params.id]);

  const resolveImage = (src: string | undefined) => {
    if (!src) return '';
    if (/^https?:\/\//.test(src)) return src;
    const base = typeof import.meta !== 'undefined' && (import.meta as any).env ? (import.meta as any).env.BASE_URL || '/' : '/';
    return src.startsWith('/') ? `${base}${src.slice(1)}` : `${base}${src}`;
  };

  const images = product?.images && product.images.length > 0 
    ? product.images 
    : product?.image 
      ? [product.image] 
      : [];

  if (loading) {
    return (
      <>
        <PagePreloader />
        <TopDockNavigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-slate-500">Loading product...</div>
        </div>
        <BackToTop />
        <Chatbot />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <PagePreloader />
        <TopDockNavigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-700 mb-4">Product Not Found</h2>
            <button 
              onClick={() => setLocation('/#products')}
              className="text-primary hover:text-primary/80 font-semibold"
            >
              Back to Products
            </button>
          </div>
        </div>
        <BackToTop />
        <Chatbot />
      </>
    );
  }

  const currentImageSrc = images.length > 0 ? resolveImage(images[selectedImageIndex]) : '';

  return (
    <>
      <PagePreloader />
      <TopDockNavigation />
      
      <section className="pt-24 pb-20 bg-white dark:bg-slate-800 min-h-screen">
        <div className="container-custom">
          {/* Back Button */}
          <button
            onClick={() => setLocation('/#products')}
            className="mb-8 inline-flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
          >
            <i className="fas fa-arrow-left"></i>
            Back to Products
          </button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Images */}
            <div className="space-y-6">
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 aspect-video"
              >
                {currentImageSrc && (
                  <motion.img
                    key={selectedImageIndex}
                    src={currentImageSrc}
                    alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    onError={(e) => {
                      const fallback = resolveImage('/img/img.jpg');
                      (e.currentTarget as HTMLImageElement).onerror = null;
                      (e.currentTarget as HTMLImageElement).src = fallback;
                    }}
                  />
                )}
              </motion.div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="grid grid-cols-4 gap-3"
                >
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative rounded-lg overflow-hidden aspect-video border-2 transition-all ${
                        selectedImageIndex === index
                          ? 'border-primary shadow-lg scale-105'
                          : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <img
                        src={resolveImage(img)}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Right Column - Product Details */}
            <div className="space-y-8">
              {/* Category Badge */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                  colorClassMap[product.primaryColor] ?? colorClassMap['default']
                }`}>
                  <i className={`${product.categoryIcon} mr-2`}></i>
                  {product.category}
                </div>
              </motion.div>

              {/* Product Name */}
              <motion.h1
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl lg:text-5xl font-bold text-responsive"
              >
                {product.name}
              </motion.h1>

              {/* Short Description */}
              <motion.p
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-slate-600 dark:text-slate-300"
              >
                {product.shortDescription}
              </motion.p>

              {/* Full Description */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="prose prose-slate dark:prose-invert max-w-none"
              >
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {product.description}
                </p>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold text-responsive mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-slate-600 dark:text-slate-300"
                    >
                      <i className="fas fa-check-circle text-primary mt-1 flex-shrink-0"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Technologies */}
              {product.technologies && product.technologies.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-responsive mb-4">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          colorClassMap[product.primaryColor] ?? colorClassMap['default']
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Pricing */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6"
              >
                <h3 className="text-2xl font-bold text-responsive mb-4">Pricing</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-300">Starter</span>
                    <span className="font-semibold text-responsive">{product.pricing.starter}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-300">Professional</span>
                    <span className="font-semibold text-responsive">{product.pricing.professional}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-300">Enterprise</span>
                    <span className="font-semibold text-responsive">{product.pricing.enterprise}</span>
                  </div>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <button
                  onClick={() => setLocation('/#contact')}
                  className={`w-full py-4 px-8 rounded-xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r ${
                    gradientClassMap[product.primaryColor] ?? gradientClassMap['default']
                  } hover:scale-105`}
                >
                  Get Started
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
      <Chatbot />
    </>
  );
}
