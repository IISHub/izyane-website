import { motion } from "framer-motion";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-custom/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-custom/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-20 w-20 h-20 bg-primary-custom/20 rounded-full"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-32 left-20 w-16 h-16 bg-secondary-custom/20 rounded-full"
        animate={{
          y: [0, 20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 text-center px-4">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <h1 className="text-[150px] sm:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-custom to-secondary-custom leading-none select-none">
            404
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-responsive mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8 text-lg">
            The page you're looking for seems to have wandered off into the digital void. Let's get you back on track.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/">
            <button className="btn-solid px-8 py-4 text-lg font-semibold rounded-full inline-flex items-center gap-2">
              <i className="fas fa-home" />
              Back to Home
            </button>
          </Link>
          <Link href="/#contact">
            <button className="btn-outline px-8 py-4 text-lg font-semibold rounded-full inline-flex items-center gap-2">
              <i className="fas fa-envelope" />
              Contact Support
            </button>
          </Link>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Or try one of these pages:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Services", href: "/#services", icon: "fas fa-cogs" },
              { name: "Products", href: "/#products", icon: "fas fa-box" },
              { name: "Team", href: "/team", icon: "fas fa-users" },
              { name: "Careers", href: "/careers", icon: "fas fa-briefcase" },
            ].map((link, index) => (
              <Link key={index} href={link.href}>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full text-sm text-slate-600 dark:text-slate-300 hover:text-primary-custom hover:shadow-md transition-all duration-200 cursor-pointer">
                  <i className={link.icon} />
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
