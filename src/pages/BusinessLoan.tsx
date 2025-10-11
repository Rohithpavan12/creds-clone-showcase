import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calculator, FileText, Clock, Shield, TrendingUp, Building, Check } from "lucide-react";
import { Link } from "react-router-dom";

const BusinessLoan = () => {
  const features = [
    {
      title: "Fast Business Funding",
      description: "Get business loan approval in just 48-72 hours with minimal documentation",
      icon: Clock
    },
    {
      title: "Competitive Interest Rates",
      description: "Starting from 12.99% per annum with flexible repayment options",
      icon: Calculator
    },
    {
      title: "Business Growth Support",
      description: "Funds for expansion, working capital, equipment purchase, and more",
      icon: TrendingUp
    },
    {
      title: "Expert Business Guidance",
      description: "Dedicated business advisors to help you choose the right loan product",
      icon: Building
    }
  ];

  const loanTypes = [
    {
      type: "Business Loan",
      amount: "Up to ₹5 Crores",
      rate: "12.99% - 18%",
      features: ["Working capital", "Business expansion", "Equipment purchase", "Debt consolidation"]
    },
    {
      type: "MSME Loan",
      amount: "Up to ₹2 Crores",
      rate: "11.99% - 16%",
      features: ["Government schemes available", "Lower interest rates", "Collateral options", "Quick processing"]
    }
  ];

  return (
    <div>

      {/* Hero Section */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                BUSINESS LOAN
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
                Fuel Your <span className="text-primary">Business Growth</span>
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Get comprehensive business financing solutions with competitive rates,
                flexible terms, and dedicated support for entrepreneurs and businesses.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/apply">
                <Button variant="hero" size="lg">Apply Now</Button>
              </Link>
              <Link to="/eligibility">
                <Button variant="outline" size="lg">Check Eligibility</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Why Choose Our Business Loans?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-hover transition-shadow">
                  <CardContent className="text-center space-y-4">
                    <Icon className="w-12 h-12 text-primary mx-auto" />
                    <h3 className="text-xl font-semibold text-text-primary">{feature.title}</h3>
                    <p className="text-text-secondary">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Loan Types */}
      <section className="py-16 bg-hero-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Choose Your Business Loan Type
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {loanTypes.map((loan, index) => (
              <Card key={index} className="p-8 hover:shadow-hover transition-all duration-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-text-primary">{loan.type}</CardTitle>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-primary">Amount: {loan.amount}</p>
                    <p className="text-lg font-semibold text-secondary">Interest: {loan.rate}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {loan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <Check className="w-5 h-5 text-success" />
                        <span className="text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/apply">
                    <Button variant="cta" className="w-full">Apply for This Loan</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Grow Your Business?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of successful entrepreneurs who have scaled their businesses with our comprehensive financing solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/apply">
              <Button variant="secondary" size="lg">Apply Now</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary bg-transparent">
                Get Business Advice
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessLoan;
