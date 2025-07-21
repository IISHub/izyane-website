import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation } from "wouter";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
	{ href: "#home", label: "Home", route: "/" },
	{ href: "#about", label: "About", route: "/" },
	{ href: "#services", label: "Services", route: "/" },
	{ href: "#products", label: "Products", route: "/" },
	{ href: "#contact", label: "Contact", route: "/" },
];

export default function TopDockNavigation() {
	const [hoveredLink, setHoveredLink] = useState<string | null>(null);
	const [location, setLocation] = useLocation();

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
		<nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl flex items-center justify-between px-16">
			<div className="flex-shrink-0 cursor-pointer">
				<img 
					src="/logo.png" 
					alt="iZyane Logo" 
					className="w-14 h-14 transition-transform duration-200 hover:scale-110" 
					onClick={handleLogoClick}
				/>
			</div>
			<ul
				className="flex items-center gap-4 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md rounded-full shadow-lg p-2"
				onMouseLeave={() => setHoveredLink(null)}
			>
				{navLinks.map((link) => (
					<li key={link.href} className="relative">
						<a
							href={link.href}
							onClick={(e) => handleNavClick(e, link.href, link.route)}
							className="px-4 py-2 block text-sm font-medium text-slate-800 dark:text-slate-200 relative z-10 transition-colors duration-200 hover:text-primary-custom"
							onMouseEnter={() => setHoveredLink(link.href)}
						>
							{link.label}
						</a>
						{hoveredLink === link.href && (
							<motion.div
								layoutId="hover-background"
								className="absolute inset-0 bg-white dark:bg-slate-700 rounded-full"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
							/>
						)}
					</li>
				))}
			</ul>
			<div className="flex-shrink-0">
				<ThemeToggle />
			</div>
		</nav>
	);
}
