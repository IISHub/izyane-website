import HeroSection from "@/components/hero-section-vertical";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import ProductsSection from "@/components/products-section";
import ContactSection from "@/components/contact-section";
import PartnersSection from "@/components/partners-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProductsSection />
      <PartnersSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
