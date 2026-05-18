import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import BackToTop from "@/components/back-to-top";

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  detailedDescription: string;
  features: string[];
  technologies: string[];
}

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
  serviceId: string;
}

export default function ServiceProducts() {
  const params = useParams<{ serviceId: string }>();
  const [, setLocation] = useLocation();
  const [service, setService] = useState<Service | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [servicesRes, productsRes] = await Promise.all([
          fetch("/data/services.json"),
          fetch("/data/products.json"),
        ]);

        const servicesData = await servicesRes.json();
        const productsData = await productsRes.json();

        const selectedService = servicesData.find(
          (s: Service) => s.id === params.serviceId
        );

        if (!selectedService) {
          setError("Service not found");
          return;
        }

        setService(selectedService);

        const serviceProducts = productsData.filter(
          (p: Product) => p.serviceId === params.serviceId
        );

        setProducts(serviceProducts);
      } catch (err) {
        setError("Failed to load service products");
        console.error("Error loading service products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.serviceId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-custom"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Loading service products...
          </p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600 dark:text-red-400 mb-4">
            {error || "Service not found"}
          </p>
          <button
            onClick={() => setLocation("/")}
            className="inline-flex items-center gap-2 text-primary-custom hover:text-accent-custom transition-colors"
          >
            <ChevronLeft size={20} />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        {/* Header Section */}
        <motion.div
          className="relative py-12 md:py-20 px-4 bg-gradient-to-r from-primary-custom/10 to-accent-custom/10 dark:from-primary-custom/20 dark:to-accent-custom/20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container-custom">
            <button
              onClick={() => setLocation("/")}
              className="inline-flex items-center gap-2 text-primary-custom hover:text-accent-custom transition-colors mb-6"
            >
              <ChevronLeft size={20} />
              Back
            </button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-primary-custom/10 dark:bg-primary-custom/20 rounded-xl flex items-center justify-center">
                  <i className={`${service.icon} text-primary-custom text-2xl`}></i>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                {service.title}
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mb-6">
                {service.detailedDescription}
              </p>

              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary-custom/10 text-primary-custom dark:bg-primary-custom/20 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Products Section */}
        <div className="container-custom py-16 md:py-24 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-3 text-slate-900 dark:text-white">
              Products & Solutions
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-12">
              Explore our comprehensive range of products and solutions developed
              for {service.title}
            </p>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    className="bg-white dark:bg-slate-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    onClick={() => setLocation(`/product/${product.id}`)}
                  >
                    {/* Product Image */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3Crect fill='%23e2e8f0' width='300' height='200'/%3E%3Ctext x='50%25' y='50%25' font-size='18' text-anchor='middle' dominant-baseline='middle' fill='%23666'%3EProduct Image%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary-custom transition-colors flex-1">
                          {product.name}
                        </h3>
                        {product.isFeatured && (
                          <span className="ml-2 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs font-bold rounded-full flex-shrink-0">
                            ⭐
                          </span>
                        )}
                      </div>

                      <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Category Badge */}
                      <div className="flex items-center gap-2 mb-4">
                        <i className={`${product.categoryIcon} text-sm text-primary-custom`}></i>
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                          {product.category}
                        </span>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.technologies.slice(0, 3).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {product.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs rounded">
                            +{product.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* CTA Button */}
                      <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-primary-custom to-accent-custom text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 text-sm">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
                  No products available for this service yet.
                </p>
                <button
                  onClick={() => setLocation("/")}
                  className="inline-flex items-center gap-2 text-primary-custom hover:text-accent-custom transition-colors"
                >
                  <ChevronLeft size={20} />
                  Explore Other Services
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Features Section */}
        {service.features.length > 0 && (
          <motion.div
            className="bg-white dark:bg-slate-700 py-16 md:py-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="container-custom px-4">
              <h2 className="text-2xl md:text-4xl font-bold mb-12 text-slate-900 dark:text-white text-center">
                Service Features
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {service.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-primary-custom/10 dark:bg-primary-custom/20 flex items-center justify-center">
                        <i className="fas fa-check text-primary-custom font-bold"></i>
                      </div>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">
                        {feature}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <BackToTop />
    </>
  );
}
