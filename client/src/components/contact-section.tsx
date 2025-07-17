import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';
import { motion } from "framer-motion";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
      // EmailJS configuration - you'll need to set these up at https://emailjs.com
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        subject: formData.subject,
        message: formData.message,
        to_name: 'iZyane Team',
      };

      // Replace these with your actual EmailJS credentials
      const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id';
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id';
      const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID || 'your_user_id';

      if (SERVICE_ID === 'your_service_id') {
        // Fallback: Show success message without actually sending email
        console.log('EmailJS not configured. Form data:', templateParams);
        toast({
          title: "Demo Mode",
          description: "Contact form is in demo mode. Please configure EmailJS to send real emails.",
        });
      } else {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. We'll get back to you soon.",
        });
      }
      
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        consent: false
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
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
      content: "123 Innovation Drive\nSan Francisco, CA 94105\nUnited States"
    },
    {
      icon: "fas fa-phone",
      title: "Phone",
      content: "+1 (555) 123-4567"
    },
    {
      icon: "fas fa-envelope",
      title: "Email",
      content: "hello@izyane.com"
    },
    {
      icon: "fas fa-clock",
      title: "Business Hours",
      content: "Monday - Friday: 9:00 AM - 6:00 PM PST\nSaturday: 10:00 AM - 2:00 PM PST\nSunday: Closed"
    }
  ];

  const socialLinks = [
    { icon: "fab fa-twitter", href: "#" },
    { icon: "fab fa-linkedin", href: "#" },
    { icon: "fab fa-github", href: "#" },
    { icon: "fab fa-youtube", href: "#" }
  ];

  return (
    <section id="contact" className="section-padding bg-white dark:bg-slate-800">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary-custom mb-6">Get In Touch</h2>
          <p className="text-xl text-slate-600 dark:text-white max-w-3xl mx-auto">
            Ready to start your next project? Let's discuss how we can help bring your ideas to life.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-secondary-custom mb-8">Contact Information</h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-custom/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className={`${info.icon} text-primary-custom`}></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-secondary-custom mb-2">{info.title}</h4>
                    <p className="text-slate-600 dark:text-white whitespace-pre-line">{info.content}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-secondary-custom mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href} 
                    className="w-10 h-10 bg-primary-custom text-white rounded-lg flex items-center justify-center hover:bg-[hsl(221,83%,45%)] transition-colors duration-200"
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-secondary-custom mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="John Doe"
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-secondary-custom mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
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
                <label htmlFor="company" className="block text-sm font-semibold text-secondary-custom mb-2">
                  Company
                </label>
                <Input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Your Company"
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-secondary-custom mb-2">
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
                <label htmlFor="message" className="block text-sm font-semibold text-secondary-custom mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Tell us about your project..."
                  rows={5}
                  className="w-full resize-vertical"
                  required
                />
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) => handleInputChange('consent', checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="consent" className="text-sm text-slate-600">
                  I agree to the <a href="#" className="text-primary-custom hover:underline">Privacy Policy</a> and <a href="#" className="text-primary-custom hover:underline">Terms of Service</a>
                </label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary-custom text-white px-8 py-4 rounded-lg hover:bg-[hsl(221,83%,45%)] transition-colors duration-200 font-semibold text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <i className="fas fa-paper-plane ml-2"></i>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
