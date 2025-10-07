import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Menu, X, Star, Users, TrendingUp, Shield, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-graduate.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">UC</span>
          </div>
          <span className="text-xl font-bold text-text-primary">UniCreds</span>
        </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/education-loan" className="text-text-secondary hover:text-primary transition-colors">Education Loan</Link>
            <Link to="/student-loan" className="text-text-secondary hover:text-primary transition-colors">Student Loan</Link>
            <Link to="/study-abroad" className="text-text-secondary hover:text-primary transition-colors">Study Abroad</Link>
            <Badge variant="secondary" className="bg-success/10 text-success border-success/20">New</Badge>
            <Link to="/contact" className="text-text-secondary hover:text-primary transition-colors">Contact Us</Link>
          </nav>

        <div className="hidden md:block">
          <Link to="/apply">
            <Button variant="cta" size="lg">Apply For Loan</Button>
          </Link>
        </div>

        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link to="/education-loan" className="block text-text-secondary hover:text-primary transition-colors">Education Loan</Link>
            <Link to="/student-loan" className="block text-text-secondary hover:text-primary transition-colors">Student Loan</Link>
            <Link to="/study-abroad" className="block text-text-secondary hover:text-primary transition-colors">Study Abroad</Link>
            <Link to="/contact" className="block text-text-secondary hover:text-primary transition-colors">Contact Us</Link>
            <Link to="/apply">
              <Button variant="cta" size="lg" className="w-full">Apply For Loan</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

const Hero = () => {
  return (
    <section className="bg-gradient-hero py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-text-secondary font-medium">FUNDING DREAMS. FUELLING CAREERS.</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
                Get Education Loan in{" "}
                <span className="text-primary">48 hours*</span>
              </h1>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-success" />
                <span className="text-text-secondary">Interest Rate Starting at 8.33%*</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-success" />
                <span className="text-text-secondary">Sanctions in 48 Hours*</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-success" />
                <span className="text-text-secondary">Savings up to ₹15 lacs</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-success" />
                <span className="text-text-secondary">Non Collateral Loans</span>
              </div>
            </div>

            <Link to="/eligibility">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                Check your Eligibility
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="relative">
            <img 
              src={heroImage} 
              alt="Happy graduate holding diploma" 
              className="w-full h-auto rounded-2xl shadow-hover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    {
      title: "Check Loan Eligibility",
      description: "Quickly verify your loan eligibility online by following quick, easy steps!",
      icon: "1"
    },
    {
      title: "Upload Documents",
      description: "Submit your required documents digitally through our secure platform.",
      icon: "2"
    },
    {
      title: "Get Approved",
      description: "Receive loan approval within 48 hours from our partner lenders.",
      icon: "3"
    },
    {
      title: "Receive Funds",
      description: "Get your education loan disbursed directly to your account.",
      icon: "4"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">How it Works?</h2>
          <p className="text-xl text-text-secondary">Take advantage of our 100% digital process in just 4 easy steps</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xl">{step.icon}</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">{step.title}</h3>
                <p className="text-text-secondary">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-text-primary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">UC</span>
              </div>
              <span className="text-xl font-bold">UniCreds</span>
            </div>
            <p className="text-gray-300">
              Making education financing accessible and affordable for students worldwide.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Products</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/education-loan" className="hover:text-primary transition-colors">Education Loan</Link></li>
              <li><Link to="/student-loan" className="hover:text-primary transition-colors">Student Loan</Link></li>
              <li><Link to="/personal-loan" className="hover:text-primary transition-colors">Personal Loan</Link></li>
              <li><Link to="/business-loan" className="hover:text-primary transition-colors">Business Loan</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/help-center" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/live-chat" className="hover:text-primary transition-colors">Live Chat</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300">&copy; 2024 UniCreds. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-gray-300 hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-gray-300 hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" className="text-gray-300 hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Process />
      <Footer />
    </div>
  );
};

export default Index;