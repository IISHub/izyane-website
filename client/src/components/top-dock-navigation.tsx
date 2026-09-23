import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { useTheme } from "./theme-provider";
import { ThemeToggle } from "./theme-toggle";
import MobileMenuEnhanced from "./mobile-menu-enhanced";

const navLinks = [
  { href: "#home", label: "Home", route: "/", key: "h" },
  { href: "#about", label: "About", route: "/", key: "a" },
  { href: "#services", label: "Services", route: "/", key: "s" },
  { href: "#products", label: "Products", route: "/", key: "p" },
  { href: "#contact", label: "Contact", route: "/", key: "c" },
];

export default function TopDockNavigation() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { theme } = useTheme();
  const navRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Track scroll position for enhanced styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track dark mode changes for adaptive logo
  useEffect(() => {
    const updateDarkMode = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };

    updateDarkMode();

    // Watch for class changes on document element
    const observer = new MutationObserver(updateDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Also listen for system theme preference changes when theme is "system"
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", updateDarkMode);
      return () => {
        observer.disconnect();
        mediaQuery.removeEventListener("change", updateDarkMode);
      };
    }

    return () => observer.disconnect();
  }, [theme]);

  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Alt + key shortcuts for quick navigation
      if (e.altKey) {
        const link = navLinks.find((l) => l.key === e.key.toLowerCase());
        if (link) {
          e.preventDefault();
          const section = document.querySelector(link.href) as HTMLElement;
          if (section) {
            const headerOffset = 80;
            const elementPosition = section.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          }
        }
      }

      // Arrow key navigation when nav is focused
      if (document.activeElement?.closest("nav")) {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          const newIndex = (focusedIndex + 1) % navLinks.length;
          setFocusedIndex(newIndex);
          linkRefs.current[newIndex]?.focus();
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          const newIndex =
            (focusedIndex - 1 + navLinks.length) % navLinks.length;
          setFocusedIndex(newIndex);
          linkRefs.current[newIndex]?.focus();
        } else if (e.key === "Home") {
          e.preventDefault();
          setFocusedIndex(0);
          linkRefs.current[0]?.focus();
        } else if (e.key === "End") {
          e.preventDefault();
          setFocusedIndex(navLinks.length - 1);
          linkRefs.current[navLinks.length - 1]?.focus();
        }
      }
    },
    [focusedIndex],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    route: string,
  ) => {
    e.preventDefault();

    // If we're not on the home page, navigate to home first
    if (location !== "/" && route === "/") {
      setLocation(route);
      // Wait for navigation to complete, then scroll to section
      setTimeout(() => {
        const section = document.querySelector(href) as HTMLElement;
        if (section) {
          const headerOffset = 80;
          const elementPosition = section.offsetTop;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      // We're already on the target page, just scroll to section
      const section = document.querySelector(href) as HTMLElement;
      if (section) {
        const headerOffset = 80;
        const elementPosition = section.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setLocation("/");
  };

  return (
    <>
      {/* Desktop Navigation — outer shell always full-width at top */}
      <div
        className={`fixed top-0 left-0 w-full z-50 hidden md:block transition-[padding] duration-400 ${
          isScrolled ? "pt-0" : "pt-4"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Inner container morphs between centered dock ↔ full-width header */}
        <div
          className={`mx-auto flex items-center justify-between transition-[max-width,padding,background-color,border-radius,box-shadow,border-color] duration-400 ease-out ${
            isScrolled
              ? "max-w-full px-6 lg:px-10 py-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-none shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.04)] border-b border-slate-200/80 dark:border-slate-700/60"
              : "max-w-5xl px-2 py-1 bg-transparent rounded-full border-b border-transparent shadow-none"
          }`}
        >
          {/* Logo */}
          <motion.div
            className="flex-shrink-0 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={isDarkMode ? "/izyane_light.png" : "/izyane_dark.png"}
              alt="iZyane Logo"
              className={`object-contain transition-[height] duration-400 ease-out ${
                isScrolled
                  ? "h-12 w-auto max-w-[5rem]"
                  : "h-28 w-auto max-w-[7.5rem]"
              }`}
              onClick={handleLogoClick}
            />
          </motion.div>

          {/* Nav Links */}
          <ul
            ref={navRef}
            className={`flex items-center transition-[gap,padding,background-color,box-shadow,border-radius] duration-400 ease-out ${
              isScrolled
                ? "gap-1 bg-transparent shadow-none p-0 rounded-none"
                : "gap-3 backdrop-blur-md rounded-full shadow-lg p-2 bg-white/40 dark:bg-slate-800/40"
            }`}
            onMouseLeave={() => setHoveredLink(null)}
            role="menubar"
            aria-label="Site navigation"
          >
            {navLinks.map((link, index) => (
              <li key={link.href} className="relative" role="none">
                <motion.a
                  ref={(el) => {
                    linkRefs.current[index] = el;
                  }}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.route)}
                  className={`block px-4 py-2 font-medium relative z-10 transition-colors duration-200 hover:text-primary-custom focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-custom focus-visible:ring-offset-2 rounded-full ${
                    isScrolled
                      ? "text-[13px] text-slate-700 dark:text-slate-300"
                      : "text-sm text-slate-800 dark:text-slate-200"
                  }`}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onFocus={() => {
                    setHoveredLink(link.href);
                    setFocusedIndex(index);
                  }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  role="menuitem"
                  aria-label={`${link.label} (Alt+${link.key.toUpperCase()})`}
                  tabIndex={0}
                >
                  {link.label}
                </motion.a>
                {hoveredLink === link.href && (
                  <motion.div
                    layoutId="hover-background"
                    className={`absolute inset-0 shadow-sm ${
                      isScrolled
                        ? "bg-slate-100 dark:bg-slate-800 rounded-lg"
                        : "bg-white dark:bg-slate-700 rounded-full"
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.15, type: "spring", stiffness: 400, damping: 30 }}
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ul>

          {/* Right side: CTA + Theme Toggle */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => {
                const section = document.querySelector("#contact") as HTMLElement;
                if (section) {
                  const headerOffset = 80;
                  const elementPosition = section.offsetTop;
                  const offsetPosition = elementPosition - headerOffset;
                  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
              }}
              className={`font-semibold rounded-full transition-[opacity,transform,padding,max-height] duration-400 ease-out bg-primary-custom text-white shadow-md shadow-primary-custom/20 hover:shadow-lg hover:shadow-primary-custom/30 hover:scale-105 active:scale-95 ${
                isScrolled
                  ? "px-5 py-2 text-xs opacity-100 max-h-10"
                  : "px-0 py-0 text-[0px] opacity-0 max-h-0 overflow-hidden pointer-events-none"
              }`}
              aria-label="Get in Touch"
            >
              Get in Touch
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <MobileMenuEnhanced />
    </>
  );
}
