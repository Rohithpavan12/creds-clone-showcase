import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, Lock, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Information We Collect",
      icon: Eye,
      content: [
        "Personal information (name, email, phone number, address)",
        "Financial information (income details, loan requirements)",
        "Identification documents (ID proof, address proof)",
        "Usage data (how you interact with our website and services)"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: FileText,
      content: [
        "Process and approve loan applications",
        "Provide customer support and respond to inquiries",
        "Send important updates about your loan application",
        "Improve our services and website functionality",
        "Comply with legal and regulatory requirements"
      ]
    },
    {
      title: "Information Security",
      icon: Lock,
      content: [
        "Bank-grade encryption for all data transmission",
        "Secure servers with regular security audits",
        "Access controls and employee training",
        "Regular security updates and monitoring",
        "Data backup and disaster recovery procedures"
      ]
    },
    {
      title: "Your Rights",
      icon: Shield,
      content: [
        "Right to access your personal information",
        "Right to correct inaccurate information",
        "Right to request deletion of your data",
        "Right to withdraw consent for data processing",
        "Right to lodge complaints with regulatory authorities"
      ]
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
                PRIVACY POLICY
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
                Your Privacy <span className="text-primary">Matters to Us</span>
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                We are committed to protecting your personal information and ensuring
                transparency in how we collect, use, and safeguard your data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Our Privacy Commitment
              </h2>
              <p className="text-xl text-text-secondary">
                At UniCreds, we understand the importance of your privacy and are committed to protecting your personal information.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-hover transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3 text-text-primary">
                        <Icon className="w-6 h-6 text-primary" />
                        <span>{section.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {section.content.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-text-secondary">
                            <span className="text-primary mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-hero-bg">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Questions About Your Privacy?</h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            If you have any questions about our privacy policy or how we handle your data,
            please don't hesitate to contact us.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button variant="cta" size="lg">Contact Us</Button>
            </Link>
            <Link to="/help-center">
              <Button variant="outline" size="lg">Help Center</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <section className="py-8 bg-white border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-text-secondary">
            This privacy policy was last updated on October 7, 2024.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
