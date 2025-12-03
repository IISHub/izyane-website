import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "wouter";
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
	const navRef = useRef<HTMLUListElement>(null);
	const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

	// Track scroll position for enhanced styling
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Keyboard navigation handler
	const handleKeyDown = useCallback((e: KeyboardEvent) => {
		// Alt + key shortcuts for quick navigation
		if (e.altKey) {
			const link = navLinks.find(l => l.key === e.key.toLowerCase());
			if (link) {
				e.preventDefault();
				const section = document.querySelector(link.href) as HTMLElement;
				if (section) {
					const headerOffset = 80;
					const elementPosition = section.offsetTop;
					const offsetPosition = elementPosition - headerOffset;
					window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
				}
			}
		}

		// Arrow key navigation when nav is focused
		if (document.activeElement?.closest('nav')) {
			if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
				e.preventDefault();
				const newIndex = (focusedIndex + 1) % navLinks.length;
				setFocusedIndex(newIndex);
				linkRefs.current[newIndex]?.focus();
			} else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
				e.preventDefault();
				const newIndex = (focusedIndex - 1 + navLinks.length) % navLinks.length;
				setFocusedIndex(newIndex);
				linkRefs.current[newIndex]?.focus();
			} else if (e.key === 'Home') {
				e.preventDefault();
				setFocusedIndex(0);
				linkRefs.current[0]?.focus();
			} else if (e.key === 'End') {
				e.preventDefault();
				setFocusedIndex(navLinks.length - 1);
				linkRefs.current[navLinks.length - 1]?.focus();
			}
		}
	}, [focusedIndex]);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [handleKeyDown]);

	const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, route: string) => {
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
						behavior: 'smooth'
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
					behavior: 'smooth'
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
			{/* Desktop Navigation */}
			<nav 
				className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-16 transition-all duration-300 hidden md:flex items-center justify-between ${
					isScrolled ? 'transform scale-95' : ''
				}`}
				role="navigation"
				aria-label="Main navigation"
			>
				<motion.div 
					className="flex-shrink-0 cursor-pointer"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<img 
						src="/logo.png" 
						alt="iZyane Logo" 
						className={`transition-all duration-300 ${
							isScrolled ? 'w-12 h-12' : 'w-14 h-14'
						} hover:scale-110`} 
						onClick={handleLogoClick}
					/>
				</motion.div>
				
				<motion.ul
					ref={navRef}
					className={`flex items-center gap-4 backdrop-blur-md rounded-full shadow-lg p-2 transition-all duration-300 ${
						isScrolled 
							? 'bg-white/80 dark:bg-slate-800/80 shadow-xl' 
							: 'bg-white/40 dark:bg-slate-800/40'
					}`}
					onMouseLeave={() => setHoveredLink(null)}
					layout
					role="menubar"
					aria-label="Site navigation"
				>
					{navLinks.map((link, index) => (
						<li key={link.href} className="relative" role="none">
							<motion.a
								ref={(el) => { linkRefs.current[index] = el; }}
								href={link.href}
								onClick={(e) => handleNavClick(e, link.href, link.route)}
								className="px-4 py-2 block text-sm font-medium text-slate-800 dark:text-slate-200 relative z-10 transition-all duration-200 hover:text-primary-custom focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-custom focus-visible:ring-offset-2 rounded-full"
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
									className="absolute inset-0 bg-white dark:bg-slate-700 rounded-full shadow-md"
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
									aria-hidden="true"
								/>
							)}
						</li>
					))}
				</motion.ul>
				
				<div className="flex-shrink-0">
					<ThemeToggle />
				</div>
			</nav>

			{/* Enhanced Mobile Menu */}
			<MobileMenuEnhanced />
		</>
	);
}
