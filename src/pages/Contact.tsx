import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, User, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "", 
      message: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const contactInfo = [
    {
      title: "Phone Support",
      description: "Speak to our loan experts",
      value: "+91 98765 43210",
      icon: Phone,
      action: "tel:+919876543210"
    },
    {
      title: "Email Support", 
      description: "Send us your queries",
      value: "support@unicreds.com",
      icon: Mail,
      action: "mailto:support@unicreds.com"
    },
    {
      title: "Office Address",
      description: "Visit our main office", 
      value: "123 Education Hub, Mumbai 400001",
      icon: MapPin,
      action: ""
    },
    {
      title: "Business Hours",
      description: "Monday to Saturday",
      value: "9:00 AM - 7:00 PM",
      icon: Clock,
      action: ""
    }
  ];

  const services = [
    {
      title: "Loan Consultation",
      description: "Get expert advice on education loan options",
      icon: User
    },
    {
      title: "Document Assistance",
      description: "Help with loan documentation and paperwork", 
      icon: FileText
    },
    {
      title: "Application Support",
      description: "Step-by-step guidance through loan application",
      icon: MessageSquare
    }
  ];

  return (
    <div>

      {/* Hero Section */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
                Get In <span className="text-primary">Touch</span>
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Have questions about education loans? Our expert team is here to help you 
                find the perfect financing solution for your educational journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl text-text-primary">Send us a Message</CardTitle>
                <p className="text-text-secondary">Fill out the form below and we'll get back to you within 24 hours.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="education-loan">Education Loan Inquiry</SelectItem>
                        <SelectItem value="student-loan">Student Loan Inquiry</SelectItem>
                        <SelectItem value="study-abroad">Study Abroad Loan</SelectItem>
                        <SelectItem value="accommodation">Accommodation Support</SelectItem>
                        <SelectItem value="documentation">Documentation Help</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Please describe your inquiry in detail..."
                      className="min-h-32"
                      required
                    />
                  </div>

                  <Button type="submit" variant="cta" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-text-primary">{info.title}</h3>
                          <p className="text-text-secondary text-sm mb-1">{info.description}</p>
                          {info.action ? (
                            <a href={info.action} className="text-primary font-medium hover:underline">
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-primary font-medium">{info.value}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-xl text-text-primary">Our Services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {services.map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <div key={index} className="flex items-start space-x-3">
                        <Icon className="w-6 h-6 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium text-text-primary">{service.title}</h4>
                          <p className="text-text-secondary text-sm">{service.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-hero-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              Need Immediate Assistance?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link to="/apply">
                <Button variant="cta" size="lg" className="w-full h-auto py-4">
                  <div className="text-center">
                    <div className="font-semibold">Apply for Loan</div>
                    <div className="text-sm opacity-90">Start your application now</div>
                  </div>
                </Button>
              </Link>
              
              <Link to="/eligibility">
                <Button variant="outline" size="lg" className="w-full h-auto py-4">
                  <div className="text-center">
                    <div className="font-semibold">Check Eligibility</div>
                    <div className="text-sm opacity-70">Quick eligibility check</div>
                  </div>
                </Button>
              </Link>

              <a href="tel:+919876543210">
                <Button variant="secondary" size="lg" className="w-full h-auto py-4">
                  <div className="text-center">
                    <div className="font-semibold">Call Now</div>
                    <div className="text-sm opacity-70">Speak to an expert</div>
                  </div>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;