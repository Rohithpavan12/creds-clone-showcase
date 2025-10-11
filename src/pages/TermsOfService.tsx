import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  const sections = [
    {
      title: "Loan Services",
      icon: FileText,
      content: [
        "We provide loan facilitation services connecting borrowers with lending partners",
        "Loan approval is subject to lender's terms, conditions, and eligibility criteria",
        "We act as an intermediary and are not directly responsible for loan disbursements",
        "All loan agreements are between the borrower and the lending partner"
      ]
    },
    {
      title: "User Responsibilities",
      icon: Scale,
      content: [
        "Provide accurate and complete information during loan application",
        "Submit genuine documents and financial information",
        "Comply with all terms and conditions of the loan agreement",
        "Make timely repayment of loan installments as per the agreement"
      ]
    },
    {
      title: "Eligibility and Approval",
      icon: CheckCircle,
      content: [
        "Loan eligibility is determined by lending partners based on their criteria",
        "We provide preliminary eligibility assessment but final approval rests with lenders",
        "Information provided by users is used for loan processing purposes",
        "Users must meet age, income, and credit requirements as specified"
      ]
    },
    {
      title: "Important Disclaimers",
      icon: AlertTriangle,
      content: [
        "Loan amounts, rates, and terms are subject to change without notice",
        "Past performance of loans does not guarantee future approvals",
        "We do not guarantee loan approval or specific interest rates",
        "Users should read and understand all loan terms before signing"
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
              <span className="text-white font-bold text-sm">FN</span>
            </div>
            <span className="text-xl font-bold text-text-primary">Fundineed</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                TERMS OF SERVICE
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
                Terms & <span className="text-primary">Conditions</span>
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Please read these terms carefully before using our loan services.
                By using our platform, you agree to be bound by these terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Service Terms & Conditions
              </h2>
              <p className="text-xl text-text-secondary">
                Understanding our terms helps ensure a smooth loan application and approval process.
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

      {/* Important Notes */}
      <section className="py-16 bg-hero-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 bg-yellow-50 border-yellow-200">
              <CardContent className="text-center space-y-6">
                <AlertTriangle className="w-16 h-16 text-yellow-600 mx-auto" />
                <h3 className="text-2xl font-bold text-text-primary">Important Notice</h3>
                <div className="space-y-4 text-left">
                  <p className="text-text-secondary">
                    • These terms are subject to change without prior notice. Users are advised to check regularly for updates.
                  </p>
                  <p className="text-text-secondary">
                    • Fundineed reserves the right to modify or discontinue services at any time.
                  </p>
                  <p className="text-text-secondary">
                    • All disputes shall be subject to the jurisdiction of Indian courts.
                  </p>
                  <p className="text-text-secondary">
                    • By using our services, you acknowledge that you have read and understood these terms.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Questions About Our Terms?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            If you have any questions about these terms of service or need clarification,
            please contact our support team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button variant="secondary" size="lg">Contact Support</Button>
            </Link>
            <Link to="/privacy-policy">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Privacy Policy
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <section className="py-8 bg-white border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-text-secondary">
            These terms of service were last updated on October 7, 2024.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
