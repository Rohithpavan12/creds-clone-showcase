import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Calculator, FileText, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const EducationLoan = () => {
  const features = [
    {
      title: "Quick Approval",
      description: "Get loan approval in just 48 hours with minimal documentation",
      icon: Clock
    },
    {
      title: "Competitive Interest Rates", 
      description: "Starting from 8.33% per annum with flexible repayment options",
      icon: Calculator
    },
    {
      title: "Minimal Documentation",
      description: "Simple paperwork process with digital document submission",
      icon: FileText
    },
    {
      title: "Secure Process",
      description: "Bank-grade security for all your personal and financial information",
      icon: Shield
    }
  ];

  const loanTypes = [
    {
      type: "Secured Education Loan",
      amount: "Up to ₹1.5 Crores",
      rate: "8.33% - 12.5%",
      features: ["Lower interest rates", "Higher loan amounts", "Collateral required"]
    },
    {
      type: "Unsecured Education Loan", 
      amount: "Up to ₹40 Lakhs",
      rate: "10.5% - 15%",
      features: ["No collateral needed", "Quick processing", "Co-applicant required"]
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
                EDUCATION LOAN
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
                Fund Your <span className="text-primary">Education Dreams</span>
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Get instant education loans with competitive interest rates, minimal documentation, 
                and flexible repayment options tailored for students.
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
              Why Choose Our Education Loans?
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
              Choose Your Loan Type
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
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Educational Journey?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of students who have achieved their dreams with our education loans.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/apply">
              <Button variant="secondary" size="lg">Apply Now</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary bg-transparent">
                Get Expert Advice
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EducationLoan;