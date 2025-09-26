import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowLeft, GraduationCap, BookOpen, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const StudentLoan = () => {
  const benefits = [
    {
      title: "Flexible Repayment",
      description: "Start repaying after graduation with moratorium period",
      icon: TrendingUp
    },
    {
      title: "Course Coverage",
      description: "Covers tuition fees, living expenses, and study materials",
      icon: BookOpen
    },
    {
      title: "Student-Friendly",
      description: "Designed specifically for students with minimal income proof",
      icon: GraduationCap
    },
    {
      title: "Expert Guidance",
      description: "Dedicated support team to guide you through the process",
      icon: Users
    }
  ];

  const eligibility = [
    "Indian citizen aged 16-35 years",
    "Admission confirmed in recognized institution",
    "Co-applicant (parent/guardian/spouse) required", 
    "Good academic record",
    "Course duration should not exceed 10 years"
  ];

  const expenses = [
    { category: "Tuition Fees", coverage: "100%" },
    { category: "Accommodation", coverage: "Up to ₹5 Lakhs" },
    { category: "Books & Equipment", coverage: "Up to ₹2 Lakhs" },
    { category: "Travel Expenses", coverage: "Up to ₹1 Lakh" },
    { category: "Other Study Expenses", coverage: "Up to ₹3 Lakhs" }
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
                STUDENT LOAN
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
                Student Loans Made <span className="text-primary">Simple</span>
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Comprehensive student loans covering all your educational expenses with 
                flexible repayment options that fit your student lifestyle.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/apply">
                <Button variant="hero" size="lg">Apply for Student Loan</Button>
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
              Student Loan Benefits
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

      {/* Expense Coverage */}
      <section className="py-16 bg-hero-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                What We Cover
              </h2>
              <p className="text-xl text-text-secondary">
                Comprehensive coverage for all your educational expenses
              </p>
            </div>

            <Card className="p-8">
              <CardContent className="space-y-6">
                {expenses.map((expense, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border border-border rounded-lg">
                    <span className="font-semibold text-text-primary">{expense.category}</span>
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                      {expense.coverage}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Eligibility Criteria
              </h2>
            </div>

            <Card className="p-8">
              <CardContent className="space-y-4">
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  You are eligible if you meet the following criteria:
                </h3>
                <ul className="space-y-3">
                  {eligibility.map((criterion, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary">{criterion}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-border">
                  <Link to="/eligibility">
                    <Button variant="cta" size="lg">Check Your Eligibility Now</Button>
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
          <h2 className="text-3xl md:text-4xl font-bold">Start Your Student Loan Application</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Get the financial support you need to focus on your studies and achieve your academic goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/apply">
              <Button variant="secondary" size="lg">Apply Now</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Speak to an Expert
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentLoan;