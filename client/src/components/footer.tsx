import { useParallax } from "@/hooks/use-parallax";

export default function Footer() {
  // Subtle parallax effect for footer
  const footerParallax = useParallax({ speed: 0.05 });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
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

  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "Web Development", action: () => scrollToSection('services') },
        { name: "Mobile Apps", action: () => scrollToSection('services') },
        { name: "Cloud Solutions", action: () => scrollToSection('services') },
        { name: "AI & ML", action: () => scrollToSection('services') },
        { name: "Consulting", action: () => scrollToSection('services') }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", action: () => scrollToSection('about') },
        { name: "Our Team", action: () => window.location.href = '/team' },
        { name: "Careers", action: () => window.location.href = '/careers' },
        { name: "Contact", action: () => scrollToSection('contact') }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Portfolio", action: () => window.location.href = '/portfolio' },
        { name: "Partners", action: () => scrollToSection('partners') },
        { name: "Testimonials", action: () => scrollToSection('testimonials') },
        { name: "Products", action: () => scrollToSection('products') }
      ]
    }
  ];

  const socialLinks = [
    { icon: "fab fa-facebook", href: "https://www.facebook.com/izyaneinovsolutions/", label: "Facebook" },
    { icon: "fab fa-linkedin", href: "https://zm.linkedin.com/company/izyane-inovsolutions", label: "LinkedIn" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Cookie Policy", href: "#cookies" }
  ];

  return (
    <footer className="bg-primary-custom dark:bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle parallax background */}
      <div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-white/5 to-transparent rounded-full blur-3xl"
        style={{ transform: footerParallax.transform }}
      />
      <div 
        className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-primary-custom/10 to-transparent rounded-full blur-3xl"
      />
      
      {/* Main Footer Content */}
      <div className="container-custom py-16 lg:py-20 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <img 
                src="/logo.png" 
                alt="iZyane Logo" 
                className="w-10 h-10 rounded-lg object-contain brightness-200"
              />
              <span className="text-xl font-bold">iZyane InovSolutions</span>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed max-w-sm">
              Ahead with Innovation. We deliver cutting-edge fintech solutions that transform businesses and drive financial inclusion across Africa.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className="w-10 h-10 bg-white/10 hover:bg-primary-custom rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={`Follow us on ${social.label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`${social.icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>
          
          {/* Link Columns */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary-custom rounded-full"></span>
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button 
                      onClick={link.action}
                      className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-left flex items-center gap-2 group"
                    >
                      <i className="fas fa-chevron-right text-xs text-primary-custom opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} iZyane InovSolutions. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {legalLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="text-slate-400 hover:text-white text-sm transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
