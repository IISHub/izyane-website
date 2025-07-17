import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import ProductsSection from "@/components/products-section";
import PortfolioSection from "@/components/portfolio-section";
import TeamSection from "@/components/team-section";
import PartnersSection from "@/components/partners-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProductsSection />
      <PortfolioSection />
      <TeamSection />
      <PartnersSection />
      <Footer />
    </div>
  );
}
