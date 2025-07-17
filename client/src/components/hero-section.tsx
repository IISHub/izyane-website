import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
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

  return (
    <section id="home" className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen flex items-center">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold text-secondary-custom leading-tight mb-6">
              Building the
              <span className="gradient-text ml-2">Future</span>
              <br />of Technology
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              We deliver cutting-edge solutions that transform businesses and drive innovation. Join the thousands of companies already accelerating their growth with TechFlow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={scrollToContact}
                className="bg-primary-custom text-white px-8 py-4 rounded-lg hover:bg-[hsl(221,83%,45%)] transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-lg hover:border-primary-custom hover:text-primary-custom transition-all duration-200 font-semibold text-lg"
              >
                <i className="fas fa-play mr-2"></i>Watch Demo
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-secondary-custom">500+</div>
                <div className="text-slate-600 text-sm font-medium">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary-custom">1000+</div>
                <div className="text-slate-600 text-sm font-medium">Projects Delivered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary-custom">99%</div>
                <div className="text-slate-600 text-sm font-medium">Satisfaction Rate</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-slate-400 text-sm">dashboard.techflow.com</div>
                </div>
                <div className="h-32 bg-gradient-to-r from-primary-custom/20 to-accent-custom/20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-chart-line text-4xl text-primary-custom"></i>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-users text-slate-400"></i>
                  </div>
                  <div className="h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-server text-slate-400"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r from-accent-custom to-primary-custom rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-primary-custom to-accent-custom rounded-full opacity-30 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
