import { Button } from "@/components/ui/button";
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
        { name: "News", action: () => {} },
        { name: "Blog", action: () => {} },
        { name: "Contact", action: () => scrollToSection('contact') }
      ]
    },
    {
      title: "Opportunities",
      links: [
        { name: "Careers", action: () => window.location.href = '/careers' },
        { name: "Team", action: () => window.location.href = '/team' },
        { name: "Portfolio", action: () => window.location.href = '/portfolio' },
        { name: "Partnerships", action: () => {} }
      ]
    }
  ];

  const socialLinks = [
    { icon: "fab fa-facebook", href: "https://www.facebook.com/izyaneinovsolutions/" },
    { icon: "fab fa-linkedin", href: "https://zm.linkedin.com/company/izyane-inovsolutions" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" }
  ];

  return (
    <footer className="bg-secondary-custom dark:bg-slate-900 text-white py-12 relative overflow-hidden">
      {/* Subtle parallax background */}
      <div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-white/5 to-transparent rounded-full blur-3xl"
        style={{ transform: footerParallax.transform }}
      />
      
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <img 
                src="/logo.png" 
                alt="iZyane Logo" 
                className="w-8 h-8 rounded-lg object-contain brightness-200"
              />
              <span className="text-xl font-bold">iZyane InovSolutions</span>
            </div>
            <p className="text-slate-300 mb-6">
              Ahead with Innovation.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className="text-slate-300 hover:text-white transition-colors duration-200"
                >
                  <i className={`${social.icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>
          
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-6">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button 
                      onClick={link.action}
                      className="text-slate-300 hover:text-white transition-colors duration-200 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-300 text-sm">
              © {new Date().getFullYear()} iZyane InovSolutions. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {legalLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="text-slate-300 hover:text-white text-sm transition-colors duration-200"
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
