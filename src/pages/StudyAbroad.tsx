import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowLeft, Globe, Plane, DollarSign, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const StudyAbroad = () => {
  const countries = [
    {
      name: "United States",
      loanAmount: "Up to $200,000",
      rate: "8.5% - 13%",
      features: ["No collateral up to $100K", "Co-signer options", "Grace period available"]
    },
    {
      name: "United Kingdom", 
      loanAmount: "Up to £150,000",
      rate: "9% - 14%",
      features: ["Quick processing", "Covers living expenses", "Post-study work visa support"]
    },
    {
      name: "Canada",
      loanAmount: "Up to CAD $150,000", 
      rate: "8% - 12%",
      features: ["Immigration pathway loans", "SDS program support", "Flexible repayment"]
    },
    {
      name: "Australia",
      loanAmount: "Up to AUD $120,000",
      rate: "9.5% - 15%", 
      features: ["Student visa assistance", "Living cost coverage", "Part-time work allowed"]
    }
  ];

  const benefits = [
    {
      title: "Global Coverage",
      description: "Loans available for studies in 50+ countries worldwide",
      icon: Globe
    },
    {
      title: "Travel & Visa Support", 
      description: "Assistance with visa processing and travel arrangements",
      icon: Plane
    },
    {
      title: "Currency Protection",
      description: "Hedge against currency fluctuations with our forex services",
      icon: DollarSign
    },
    {
      title: "Destination Guidance",
      description: "Expert counseling for choosing the right destination and course",
      icon: MapPin
    }
  ];

  const coverageItems = [
    "Tuition fees and academic expenses",
    "Living expenses and accommodation", 
    "Travel and visa costs",
    "Insurance and medical expenses",
    "Books, equipment, and study materials",
    "Examination and thesis fees"
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
                STUDY ABROAD LOANS
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
                Turn Your <span className="text-primary">Global Dreams</span> Into Reality
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Get comprehensive education loans for studying abroad with competitive rates, 
                currency protection, and complete visa support.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/apply">
                <Button variant="hero" size="lg">Apply for Study Abroad Loan</Button>
              </Link>
              <Link to="/eligibility">
                <Button variant="outline" size="lg">Check Eligibility</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Why Choose Us for Study Abroad?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-hover transition-shadow">
                  <CardContent className="text-center space-y-4">
                    <Icon className="w-12 h-12 text-primary mx-auto" />
                    <h3 className="text-xl font-semibold text-text-primary">{benefit.title}</h3>
                    <p className="text-text-secondary">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Countries */}
      <section className="py-16 bg-hero-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Popular Study Destinations
            </h2>
            <p className="text-xl text-text-secondary">
              Competitive loan rates for top study abroad destinations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {countries.map((country, index) => (
              <Card key={index} className="p-6 hover:shadow-hover transition-all duration-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-text-primary">{country.name}</CardTitle>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-primary">Loan Amount: {country.loanAmount}</p>
                    <p className="text-lg font-semibold text-secondary">Interest Rate: {country.rate}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {country.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <Check className="w-5 h-5 text-success" />
                        <span className="text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/apply">
                    <Button variant="cta" className="w-full">Apply for {country.name}</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Complete Coverage for Your Journey
              </h2>
              <p className="text-xl text-text-secondary">
                We cover all aspects of your study abroad expenses
              </p>
            </div>

            <Card className="p-8">
              <CardContent className="space-y-6">
                <h3 className="text-2xl font-semibold text-text-primary text-center mb-6">
                  Our loans cover:
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {coverageItems.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="text-text-secondary">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-border text-center">
                  <Link to="/apply">
                    <Button variant="hero" size="lg">Start Your Application</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Study Abroad?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of students who have achieved their international education dreams with our study abroad loans.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/apply">
              <Button variant="secondary" size="lg">Apply Now</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Get Counseling
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudyAbroad;