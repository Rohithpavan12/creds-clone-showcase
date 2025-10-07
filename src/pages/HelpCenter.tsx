import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowLeft, HelpCircle, Phone, Mail, MessageSquare, FileText, CreditCard, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const HelpCenter = () => {
  const helpCategories = [
    {
      title: "Loan Application",
      description: "Guide to applying for loans, required documents, and approval process",
      icon: FileText,
      topics: ["How to Apply", "Required Documents", "Application Status"]
    },
    {
      title: "Loan Types",
      description: "Understanding different loan products and eligibility criteria",
      icon: CreditCard,
      topics: ["Education Loans", "Personal Loans", "Business Loans"]
    },
    {
      title: "EMI Calculator",
      description: "Calculate your monthly payments and plan your loan repayment",
      icon: Calculator,
      topics: ["EMI Calculation", "Interest Rates", "Repayment Options"]
    },
    {
      title: "Contact Support",
      description: "Get in touch with our loan experts for personalized assistance",
      icon: Phone,
      topics: ["Phone Support", "Email Support", "Live Chat"]
    }
  ];

  const faqs = [
    {
      question: "What documents do I need to apply for a loan?",
      answer: "You'll need identity proof, address proof, income proof, and academic documents for education loans."
    },
    {
      question: "How long does loan approval take?",
      answer: "Most loans are approved within 24-48 hours after submitting all required documents."
    },
    {
      question: "What is the minimum and maximum loan amount?",
      answer: "Loan amounts vary by type: Education loans up to ₹50 lakhs, Personal loans up to ₹40 lakhs, Business loans up to ₹5 crores."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">UC</span>
            </div>
            <span className="text-xl font-bold text-text-primary">UniCreds</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                HELP CENTER
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
                How Can We <span className="text-primary">Help You?</span>
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Find answers to your questions, learn about our loan products,
                and get the support you need for your financial journey.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button variant="hero" size="lg">Contact Support</Button>
              </Link>
              <Link to="/faq">
                <Button variant="outline" size="lg">Browse FAQ</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Explore Help Topics
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {helpCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-hover transition-shadow">
                  <CardContent className="text-center space-y-4">
                    <Icon className="w-12 h-12 text-primary mx-auto" />
                    <h3 className="text-xl font-semibold text-text-primary">{category.title}</h3>
                    <p className="text-text-secondary">{category.description}</p>
                    <ul className="space-y-1 text-sm">
                      {category.topics.map((topic, idx) => (
                        <li key={idx} className="text-text-secondary">• {topic}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-hero-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-semibold text-text-primary">{faq.question}</h3>
                  <p className="text-text-secondary">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Our loan experts are here to help you with personalized assistance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 bg-white/10 border-white/20 text-white">
              <CardContent className="text-center space-y-4">
                <Phone className="w-12 h-12 mx-auto" />
                <h3 className="text-xl font-semibold">Call Us</h3>
                <p>1800-XXX-XXXX</p>
                <p className="text-sm opacity-75">Mon-Fri: 9AM-6PM</p>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white/10 border-white/20 text-white">
              <CardContent className="text-center space-y-4">
                <Mail className="w-12 h-12 mx-auto" />
                <h3 className="text-xl font-semibold">Email Us</h3>
                <p>support@unicreds.com</p>
                <p className="text-sm opacity-75">24/7 Support</p>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white/10 border-white/20 text-white">
              <CardContent className="text-center space-y-4">
                <MessageSquare className="w-12 h-12 mx-auto" />
                <h3 className="text-xl font-semibold">Live Chat</h3>
                <p>Available Now</p>
                <p className="text-sm opacity-75">Instant Response</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
