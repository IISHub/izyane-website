import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useParallax, useScrollRotation } from "@/hooks/use-parallax";

export default function ContactSection() {
  
  const { toast } = useToast();
  
  // Parallax effects
  const backgroundParallax = useParallax({ speed: 0.1 });
  const iconRotation = useScrollRotation({ speed: 0.03 });
  const decorationParallax = useParallax({ speed: -0.2 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    consent: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message || !formData.consent) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields and accept the terms.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create form data manually to ensure all fields are captured correctly
      const submitData = new URLSearchParams();
      submitData.append('form-name', 'contact');
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('company', formData.company);
      submitData.append('subject', formData.subject);
      submitData.append('message', formData.message);
      submitData.append('consent', formData.consent.toString());

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: submitData.toString()
      });

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. We'll get back to you soon.",
        });
        
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: '',
          consent: false
        });
      } else {
        throw new Error(`Form submission failed: ${response.status}`);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: "fas fa-map-marker-alt",
      title: "Address",
      content: "Engineering House - 3rd Floor, Kelvin Siwale Road, Lusaka - Zambia",
      link: "https://www.google.com/maps/place/iZyane+InovSolutions/@-15.3954016,28.3198545,1004m/data=!3m2!1e3!4b1!4m6!3m5!1s0x19408be262a33ec5:0xcc7121ba1cc55fec!8m2!3d-15.3954016!4d28.3198545!16s%2Fg%2F11vs8s0hnh?entry=ttu&g_ep=EgoyMDI1MDcxNi4wIKXMDSoASAFQAw%3D%3D",
      isClickable: true
    },
    {
      icon: "fas fa-phone",
      title: "Phone",
      content: "+260 958 169 735",
      link: "tel:+260958169735",
      isClickable: true
    },
    {
      icon: "fas fa-envelope",
      title: "Email",
      content: "info@izyane.com",
      link: "mailto:info@izyane.com",
      isClickable: true
    }
  ];

  const socialLinks = [
    { icon: "fab fa-facebook", href: "https://www.facebook.com/izyaneinovsolutions/" },
    { icon: "fab fa-linkedin", href: "https://zm.linkedin.com/company/izyane-inovsolutions" }
  ];

  return (
    <section id="contact" className="section-padding bg-white dark:bg-slate-800 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-5"
        style={{ transform: backgroundParallax.transform }}
      >
        <div className="absolute top-40 right-40 w-80 h-80 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-3xl" />
      </div>
      
      <div 
        className="absolute bottom-40 left-40 w-72 h-72 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-2xl opacity-10"
        style={{ transform: decorationParallax.transform }}
      />
      
      {/* Floating Icon */}
      <div 
        className="absolute top-32 left-32 w-8 h-8 text-emerald-400/30"
        style={{ transform: iconRotation.transform }}
      >
        <i className="fas fa-paper-plane text-2xl" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl xs:text-4xl lg:text-5xl font-bold text-responsive mb-4 sm:mb-6">Get In Touch</h2>
          <p className="text-lg xs:text-xl text-slate-600 dark:text-white max-w-3xl mx-auto px-4">
            Ready to start your next project? Let's discuss how we can help bring your ideas to life.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="order-2 lg:order-1">
            <h3 className="text-xl xs:text-2xl font-bold text-responsive mb-6 sm:mb-8">Contact Information</h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-custom/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className={`${info.icon} text-primary-custom`}></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-responsive mb-2">{info.title}</h4>
                    {info.isClickable ? (
                      <a 
                        href={info.link} 
                        target={info.title === 'Address' ? '_blank' : '_self'}
                        rel={info.title === 'Address' ? 'noopener noreferrer' : ''}
                        className="text-slate-600 dark:text-white whitespace-pre-line hover:text-primary-custom transition-colors duration-200 cursor-pointer"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-slate-600 dark:text-white whitespace-pre-line">{info.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Map */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-responsive mb-4">Our Location</h4>
              <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1004!2d28.3198545!3d-15.3954016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19408be262a33ec5%3A0xcc7121ba1cc55fec!2siZyane%20InovSolutions!5e0!3m2!1sen!2szm!4v1699999999999!5m2!1sen!2szm"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="iZyane InovSolutions Location"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h3 className="text-xl xs:text-2xl font-bold text-responsive mb-6 sm:mb-8">Send us a Message</h3>
            
            <form 
              name="contact" 
              method="POST" 
              data-netlify="true" 
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              {/* Hidden field for Netlify */}
              <input type="hidden" name="form-name" value="contact" />
              
              {/* Honeypot field for spam protection */}
              <div style={{ display: 'none' }}>
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </div>
              
              {/* Hidden inputs that sync with state for complex form elements */}
              <input type="hidden" name="subject" value={formData.subject} />
              <input type="hidden" name="consent" value={formData.consent.toString()} />
              
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-responsive mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="John Doe"
                    className="w-full h-12"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-responsive mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@example.com"
                    className="w-full"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-responsive mb-2">
                  Company
                </label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Your Company"
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-responsive mb-2">
                  Subject *
                </label>
                <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="mobile-apps">Mobile Apps</SelectItem>
                    <SelectItem value="cloud-solutions">Cloud Solutions</SelectItem>
                    <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-responsive mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Tell us about your project..."
                  rows={5}
                  className="w-full resize-vertical"
                  required
                />
              </div>
              
              
              
              <button 
                type="submit" 
                className="btn-solid w-full text-lg px-8 py-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <i className="fas fa-paper-plane ml-2"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
