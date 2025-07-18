import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create form data manually to ensure all fields are captured correctly (matching working contact section)
      const submitData = new URLSearchParams();
      submitData.append('form-name', 'contact-page');
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('company', formData.company);
      submitData.append('subject', formData.subject);
      submitData.append('message', formData.message);

      console.log('Submitting contact page form data:', Object.fromEntries(submitData));

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: submitData.toString()
      });

      console.log('Contact page response status:', response.status);
      console.log('Contact page response ok:', response.ok);

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you within 24 hours.",
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          subject: "",
          message: ""
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting contact page form:', error);
      toast({
        title: "Error sending message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "hello@izyane.com",
      subtitle: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (555) 123-4567",
      subtitle: "Mon-Fri from 8am to 6pm"
    },
    {
      icon: MapPin,
      title: "Office",
      details: "123 Tech Street, San Francisco, CA 94105",
      subtitle: "Visit our headquarters"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Monday - Friday: 8am - 6pm PST",
      subtitle: "We're here to help"
    }
  ];

  const officeLocations = [
    {
      city: "San Francisco",
      address: "123 Tech Street, SF CA 94105",
      phone: "+1 (555) 123-4567",
      isHeadquarters: true
    },
    {
      city: "New York",
      address: "456 Innovation Ave, NY NY 10001",
      phone: "+1 (555) 234-5678",
      isHeadquarters: false
    },
    {
      city: "Austin",
      address: "789 Startup Blvd, Austin TX 73301",
      phone: "+1 (555) 345-6789",
      isHeadquarters: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100 dark:bg-gradient-to-br dark:from-slate-900 dark:via-blue-900/20 dark:to-slate-800 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 bg-primary-accent-light text-primary-custom rounded-full text-sm font-semibold mb-4 animate-fadeInUp">
              Let's Connect
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-responsive leading-tight mb-6 animate-fadeInUp">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed animate-fadeInUp">
              Ready to transform your business? Let's discuss how we can help you achieve your goals.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fadeInUp">
              <div className="text-center">
                <div className="text-2xl font-bold text-responsive">24h</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-responsive">500+</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-responsive">99%</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-responsive">24/7</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">Support Available</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-12 w-16 h-16 hero-decoration-primary rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-12 w-28 h-28 hero-decoration-primary rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-1/3 left-24 w-4 h-4 bg-primary-accent-medium rounded-full opacity-50"></div>
        <div className="absolute top-2/3 right-20 w-8 h-8 bg-primary-accent-medium rounded-full opacity-30"></div>
      </section>

      {/* Contact Form and Info */}
      <section className="section-padding bg-white dark:bg-slate-800">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-responsive mb-6">
                Send us a message
              </h2>
              <form 
                name="contact-page"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                {/* Hidden form-name input for Netlify */}
                <input type="hidden" name="form-name" value="contact-page" />
                
                {/* Honeypot field for spam protection */}
                <div style={{ display: 'none' }}>
                  <label>
                    Don't fill this out if you're human: 
                    <input name="bot-field" />
                  </label>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Company
                    </label>
                    <Input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Subject *
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                      placeholder="How can we help?"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Message *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    placeholder="Tell us about your project..."
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-primary-custom text-white py-3 rounded-lg hover:bg-[hsl(221,83%,45%)] transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-responsive mb-6">
                Contact Information
              </h2>
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-custom to-accent-custom rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-responsive mb-1">
                        {info.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 font-medium">
                        {info.details}
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">
                        {info.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Office Locations */}
              <h3 className="text-xl font-bold text-responsive mb-4">
                Office Locations
              </h3>
              <div className="space-y-4">
                {officeLocations.map((office, index) => (
                  <div key={index} className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-responsive">
                        {office.city}
                      </h4>
                      {office.isHeadquarters && (
                        <span className="bg-primary-custom/10 text-primary-custom px-2 py-1 rounded-full text-xs font-medium">
                          Headquarters
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-1">
                      {office.address}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      {office.phone}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}