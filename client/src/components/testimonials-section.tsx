import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Mwanza",
    role: "CEO",
    company: "Zambian Financial Services",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    quote: "iZyane transformed our banking operations with their innovative POS solutions. The team's expertise and dedication to delivering quality software is unmatched.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Banda",
    role: "Head of Digital Transformation",
    company: "MicroFinance Plus",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    quote: "Working with iZyane has been a game-changer for our mobile money platform. Their understanding of African fintech challenges sets them apart.",
    rating: 5
  },
  {
    id: 3,
    name: "Michael Tembo",
    role: "Managing Director",
    company: "AgriTech Solutions",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    quote: "The agency banking solution developed by iZyane helped us reach rural communities we never thought possible. Exceptional technical support throughout.",
    rating: 5
  },
  {
    id: 4,
    name: "Grace Phiri",
    role: "IT Director",
    company: "National Savings Bank",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    quote: "iZyane's Oracle expertise and their commitment to security standards gave us confidence in deploying their solutions across our entire network.",
    rating: 5
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-custom/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-custom/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      {/* Quote Icon Background */}
      <div className="absolute top-20 right-20 text-primary-custom/5 dark:text-primary-custom/10">
        <i className="fas fa-quote-right text-[200px]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-primary-custom/10 text-primary-custom rounded-full text-sm font-semibold mb-4">
            Client Testimonials
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-responsive mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Trusted by leading organizations across Africa to deliver innovative solutions
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[400px] flex items-center">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-slate-700 shadow-lg text-slate-600 dark:text-slate-300 hover:bg-primary-custom hover:text-white transition-all duration-300 -translate-x-6 lg:-translate-x-12"
              aria-label="Previous testimonial"
            >
              <i className="fas fa-chevron-left" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-slate-700 shadow-lg text-slate-600 dark:text-slate-300 hover:bg-primary-custom hover:text-white transition-all duration-300 translate-x-6 lg:translate-x-12"
              aria-label="Next testimonial"
            >
              <i className="fas fa-chevron-right" />
            </button>

            {/* Testimonial Cards */}
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                }}
                className="w-full"
              >
                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 lg:p-12 mx-4">
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden ring-4 ring-primary-custom/20">
                          <img
                            src={testimonials[currentIndex].image}
                            alt={testimonials[currentIndex].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary-custom rounded-full flex items-center justify-center">
                          <i className="fas fa-quote-right text-white text-sm" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center lg:text-left">
                      {/* Rating */}
                      <div className="flex justify-center lg:justify-start gap-1 mb-4">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <i key={i} className="fas fa-star text-yellow-400" />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-lg lg:text-xl text-slate-700 dark:text-slate-300 mb-6 leading-relaxed italic">
                        "{testimonials[currentIndex].quote}"
                      </blockquote>

                      {/* Author */}
                      <div>
                        <div className="font-bold text-responsive text-lg">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-slate-600 dark:text-slate-400">
                          {testimonials[currentIndex].role}
                        </div>
                        <div className="text-primary-custom font-medium">
                          {testimonials[currentIndex].company}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary-custom w-8"
                    : "bg-slate-300 dark:bg-slate-600 hover:bg-primary-custom/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

