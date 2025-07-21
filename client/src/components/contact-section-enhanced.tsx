import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useParallax, useScrollRotation } from "@/hooks/use-parallax";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Video,
  Calendar,
  Globe,
  Users,
  Building
} from "lucide-react";
import { TiltCard, AnimatedButton } from "./micro-animations";

interface OfficeLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  timezone: string;
  coordinates: { lat: number; lng: number };
  isHeadquarters?: boolean;
  status: 'online' | 'busy' | 'offline';
  businessHours: {
    open: string;
    close: string;
    days: string[];
  };
}

interface ContactMethod {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  action: string;
  available: boolean;
  responseTime: string;
  color: string;
}

const officeLocations: OfficeLocation[] = [
  {
    id: 'hq',
    name: 'Headquarters',
    address: '123 Tech Avenue, Suite 100',
    city: 'San Francisco',
    country: 'USA',
    phone: '+1 (555) 123-4567',
    email: 'sf@izyane.com',
    timezone: 'PST',
    coordinates: { lat: 37.7749, lng: -122.4194 },
    isHeadquarters: true,
    status: 'online',
    businessHours: {
      open: '09:00',
      close: '18:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    }
  },
  {
    id: 'eu',
    name: 'European Office',
    address: '45 Innovation Street',
    city: 'London',
    country: 'UK',
    phone: '+44 20 7123 4567',
    email: 'london@izyane.com',
    timezone: 'GMT',
    coordinates: { lat: 51.5074, lng: -0.1278 },
    status: 'online',
    businessHours: {
      open: '09:00',
      close: '17:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    }
  },
  {
    id: 'asia',
    name: 'Asia Pacific',
    address: '88 Business Park Drive',
    city: 'Singapore',
    country: 'Singapore',
    phone: '+65 6123 4567',
    email: 'singapore@izyane.com',
    timezone: 'SGT',
    coordinates: { lat: 1.3521, lng: 103.8198 },
    status: 'busy',
    businessHours: {
      open: '09:00',
      close: '18:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    }
  }
];

const contactMethods: ContactMethod[] = [
  {
    id: 'call',
    name: 'Phone Call',
    icon: Phone,
    description: 'Speak directly with our team',
    action: 'Call Now',
    available: true,
    responseTime: 'Immediate',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'email',
    name: 'Email',
    icon: Mail,
    description: 'Send us a detailed message',
    action: 'Send Email',
    available: true,
    responseTime: '< 4 hours',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'chat',
    name: 'Live Chat',
    icon: MessageCircle,
    description: 'Chat with our support team',
    action: 'Start Chat',
    available: true,
    responseTime: '< 2 minutes',
    color: 'from-purple-500 to-violet-600'
  },
  {
    id: 'video',
    name: 'Video Call',
    icon: Video,
    description: 'Schedule a video consultation',
    action: 'Book Call',
    available: false,
    responseTime: 'Scheduled',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'meeting',
    name: 'In-Person Meeting',
    icon: Users,
    description: 'Meet at one of our offices',
    action: 'Schedule',
    available: true,
    responseTime: 'Scheduled',
    color: 'from-cyan-500 to-blue-600'
  }
];

export default function ContactSectionEnhanced() {
  const { toast } = useToast();
  
  // Parallax effects
  const backgroundParallax = useParallax({ speed: 0.1 });
  const iconRotation = useScrollRotation({ speed: 0.03 });
  const decorationParallax = useParallax({ speed: -0.2 });
  
  const [selectedOffice, setSelectedOffice] = useState<OfficeLocation>(officeLocations[0]);
  const [selectedMethod, setSelectedMethod] = useState<ContactMethod | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    preferredContact: 'email',
    urgency: 'medium',
    consent: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getOfficeStatus = (office: OfficeLocation) => {
    const now = new Date();
    const [openHour, openMinute] = office.businessHours.open.split(':').map(Number);
    const [closeHour, closeMinute] = office.businessHours.close.split(':').map(Number);
    
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;
    const openTime = openHour * 60 + openMinute;
    const closeTime = closeHour * 60 + closeMinute;
    
    const currentDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][now.getDay()];
    const isWorkingDay = office.businessHours.days.includes(currentDay);
    
    if (!isWorkingDay || currentTime < openTime || currentTime > closeTime) {
      return 'offline';
    }
    
    return office.status;
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
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Message Sent!",
        description: `Thank you ${formData.name}! We'll respond within ${contactMethods.find(m => m.id === formData.preferredContact)?.responseTime || '24 hours'}.`,
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        preferredContact: 'email',
        urgency: 'medium',
        consent: false
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const statusColors = {
    online: 'bg-green-500',
    busy: 'bg-yellow-500',
    offline: 'bg-gray-500'
  };

  const statusText = {
    online: 'Available',
    busy: 'Busy',
    offline: 'Offline'
  };

  return (
    <section id="contact" className="section-padding bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-primary-custom/10 to-transparent rounded-full blur-3xl"
        style={backgroundParallax}
      />
      
      <div 
        className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-secondary-custom/10 to-transparent rounded-full blur-3xl"
        style={decorationParallax}
      />
      
      {/* Rotating Icons */}
      <div 
        className="absolute top-20 left-20 w-8 h-8 text-primary-custom/30"
        style={iconRotation}
      >
        <MessageCircle className="w-full h-full" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-responsive mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Get in <span className="text-primary-custom">Touch</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Ready to start your next project? Choose how you'd like to connect with our team.
          </motion.p>
        </motion.div>

        {/* Contact Methods Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className={`p-6 text-center cursor-pointer transition-all duration-300 ${
                    method.available 
                      ? 'hover:shadow-xl bg-white dark:bg-slate-800' 
                      : 'opacity-60 bg-gray-100 dark:bg-slate-700'
                  } ${selectedMethod?.id === method.id ? 'ring-2 ring-primary-custom' : ''}`}
                  onClick={() => method.available && setSelectedMethod(method)}
                >
                  <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-r ${method.color} rounded-full flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="font-semibold text-responsive mb-2">{method.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    {method.description}
                  </p>
                  
                  <div className="text-xs text-primary-custom font-medium mb-2">
                    {method.responseTime}
                  </div>
                  
                  {method.available && (
                    <div className="w-2 h-2 bg-green-500 rounded-full mx-auto"></div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-responsive mb-6">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Company
                    </label>
                    <Input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Subject *
                    </label>
                    <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="project">Project Discussion</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="careers">Career Opportunities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Preferred Contact Method
                    </label>
                    <Select value={formData.preferredContact} onValueChange={(value) => handleInputChange('preferredContact', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                        <SelectItem value="chat">Live Chat</SelectItem>
                        <SelectItem value="video">Video Call</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Urgency Level
                    </label>
                    <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - General inquiry</SelectItem>
                        <SelectItem value="medium">Medium - Standard project</SelectItem>
                        <SelectItem value="high">High - Urgent requirement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Message *
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full h-32 resize-none"
                    placeholder="Tell us about your project, requirements, or questions..."
                    required
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => handleInputChange('consent', checked as boolean)}
                    required
                  />
                  <label htmlFor="consent" className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    I agree to the processing of my personal data and consent to being contacted regarding my inquiry. *
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-primary-custom hover:bg-primary-custom/90 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Office Locations & Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Office Selector */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-responsive mb-4">Our Offices</h3>
              
              <div className="space-y-3">
                {officeLocations.map((office) => {
                  const status = getOfficeStatus(office);
                  return (
                    <motion.div
                      key={office.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedOffice.id === office.id 
                          ? 'border-primary-custom bg-primary-custom/5' 
                          : 'border-slate-200 dark:border-slate-600 hover:border-primary-custom/50'
                      }`}
                      onClick={() => setSelectedOffice(office)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {office.isHeadquarters && <Building className="w-4 h-4 text-primary-custom" />}
                          <h4 className="font-semibold text-responsive">{office.name}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${statusColors[status]}`}></div>
                          <span className="text-xs font-medium text-slate-500">{statusText[status]}</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {office.city}, {office.country}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Selected Office Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedOffice.id}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-primary-custom" />
                  <h3 className="text-xl font-bold text-responsive">{selectedOffice.name}</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-slate-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {selectedOffice.address}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {selectedOffice.city}, {selectedOffice.country}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-slate-500" />
                    <a href={`tel:${selectedOffice.phone}`} className="text-sm text-primary-custom hover:underline">
                      {selectedOffice.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <a href={`mailto:${selectedOffice.email}`} className="text-sm text-primary-custom hover:underline">
                      {selectedOffice.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      <p>{selectedOffice.businessHours.days.join(', ')}</p>
                      <p>{selectedOffice.businessHours.open} - {selectedOffice.businessHours.close} ({selectedOffice.timezone})</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-slate-500" />
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {selectedOffice.timezone} Timezone
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-600">
                  <AnimatedButton
                    variant="ghost"
                    className="w-full"
                    onClick={() => window.open(`https://maps.google.com/?q=${selectedOffice.coordinates.lat},${selectedOffice.coordinates.lng}`, '_blank')}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    View on Map
                  </AnimatedButton>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-responsive mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <AnimatedButton
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => window.location.href = 'tel:+1-555-123-4567'}
                >
                  <Phone className="w-4 h-4 mr-3" />
                  Call Main Office
                </AnimatedButton>
                
                <AnimatedButton
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => window.location.href = 'mailto:hello@izyane.com'}
                >
                  <Mail className="w-4 h-4 mr-3" />
                  Send Email
                </AnimatedButton>
                
                <AnimatedButton
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {/* Open chat widget */}}
                >
                  <MessageCircle className="w-4 h-4 mr-3" />
                  Start Live Chat
                </AnimatedButton>
                
                <AnimatedButton
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => window.open('https://calendly.com/izyane', '_blank')}
                >
                  <Calendar className="w-4 h-4 mr-3" />
                  Schedule Meeting
                </AnimatedButton>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
