import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Upload, Check, FileText, User, GraduationCap, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Apply = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    aadhar: "",
    pan: "",
    
    // Educational Details
    course: "",
    institution: "",
    courseYear: "",
    loanPurpose: "",
    
    // Financial Information
    loanAmount: "",
    familyIncome: "",
    coApplicant: "",
    
    // Documents
    acceptTerms: false
  });

  const steps = [
    { id: 1, title: "Personal Details", icon: User },
    { id: 2, title: "Education Info", icon: GraduationCap },
    { id: 3, title: "Financial Details", icon: DollarSign },
    { id: 4, title: "Documents", icon: FileText }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Application Submitted!",
      description: "Your loan application has been submitted successfully. We'll review it and get back to you within 48 hours.",
    });
    
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      aadhar: "",
      pan: "",
      course: "",
      institution: "",
      courseYear: "",
      loanPurpose: "",
      loanAmount: "",
      familyIncome: "",
      coApplicant: "",
      acceptTerms: false
    });
    setCurrentStep(1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-text-primary mb-4">Personal Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Enter last name"
                  required
                />
              </div>
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

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aadhar">Aadhar Number *</Label>
                <Input
                  id="aadhar"
                  value={formData.aadhar}
                  onChange={(e) => handleInputChange("aadhar", e.target.value)}
                  placeholder="1234 5678 9012"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pan">PAN Number *</Label>
                <Input
                  id="pan"
                  value={formData.pan}
                  onChange={(e) => handleInputChange("pan", e.target.value)}
                  placeholder="ABCDE1234F"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-text-primary mb-4">Educational Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="course">Course/Program *</Label>
              <Input
                id="course"
                value={formData.course}
                onChange={(e) => handleInputChange("course", e.target.value)}
                placeholder="e.g., B.Tech Computer Science, MBA, MS in Data Science"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="institution">Institution/University *</Label>
              <Input
                id="institution"
                value={formData.institution}
                onChange={(e) => handleInputChange("institution", e.target.value)}
                placeholder="Enter institution name"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="courseYear">Course Year *</Label>
                <Select value={formData.courseYear} onValueChange={(value) => handleInputChange("courseYear", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st-year">1st Year</SelectItem>
                    <SelectItem value="2nd-year">2nd Year</SelectItem>
                    <SelectItem value="3rd-year">3rd Year</SelectItem>
                    <SelectItem value="4th-year">4th Year</SelectItem>
                    <SelectItem value="postgraduate">Postgraduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="loanPurpose">Loan Purpose *</Label>
                <Select value={formData.loanPurpose} onValueChange={(value) => handleInputChange("loanPurpose", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tuition-fees">Tuition Fees</SelectItem>
                    <SelectItem value="living-expenses">Living Expenses</SelectItem>
                    <SelectItem value="study-abroad">Study Abroad</SelectItem>
                    <SelectItem value="equipment">Equipment & Books</SelectItem>
                    <SelectItem value="comprehensive">Comprehensive (All Expenses)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-text-primary mb-4">Financial Details</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loanAmount">Loan Amount Required *</Label>
                <Select value={formData.loanAmount} onValueChange={(value) => handleInputChange("loanAmount", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan amount" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5-lakhs">₹1 - ₹5 Lakhs</SelectItem>
                    <SelectItem value="5-10-lakhs">₹5 - ₹10 Lakhs</SelectItem>
                    <SelectItem value="10-20-lakhs">₹10 - ₹20 Lakhs</SelectItem>
                    <SelectItem value="20-50-lakhs">₹20 - ₹50 Lakhs</SelectItem>
                    <SelectItem value="50-plus-lakhs">₹50+ Lakhs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="familyIncome">Annual Family Income *</Label>
                <Select value={formData.familyIncome} onValueChange={(value) => handleInputChange("familyIncome", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select income range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="below-3-lakhs">Below ₹3 Lakhs</SelectItem>
                    <SelectItem value="3-6-lakhs">₹3 - ₹6 Lakhs</SelectItem>
                    <SelectItem value="6-12-lakhs">₹6 - ₹12 Lakhs</SelectItem>
                    <SelectItem value="12-25-lakhs">₹12 - ₹25 Lakhs</SelectItem>
                    <SelectItem value="25-plus-lakhs">₹25+ Lakhs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coApplicant">Co-Applicant Details *</Label>
              <Textarea
                id="coApplicant"
                value={formData.coApplicant}
                onChange={(e) => handleInputChange("coApplicant", e.target.value)}
                placeholder="Enter co-applicant details (Parent/Guardian/Spouse name and relationship)"
                className="min-h-24"
                required
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-text-primary mb-4">Document Upload</h3>
            
            <div className="space-y-4">
              <p className="text-text-secondary">
                Please ensure you have the following documents ready for upload:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Passport size photographs",
                  "Identity proof (Aadhar/Passport)", 
                  "Address proof",
                  "Income proof of co-applicant",
                  "Academic records & marksheets",
                  "Admission letter",
                  "Bank statements (6 months)",
                  "Fee structure from institution"
                ].map((doc, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="text-text-secondary flex-1">{doc}</span>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 border border-border rounded-lg">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => handleInputChange("acceptTerms", checked === true)}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="acceptTerms" className="text-sm font-normal cursor-pointer">
                      I agree to the <Link to="/terms" className="text-primary hover:underline">Terms and Conditions</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                    </Label>
                    <p className="text-xs text-text-secondary">
                      By submitting this application, you consent to UniCreds processing your personal data for loan evaluation purposes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-hero-bg">
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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="flex flex-col items-center flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      isActive ? 'bg-gradient-primary text-white' :
                      isCompleted ? 'bg-success text-white' : 
                      'bg-gray-200 text-gray-500'
                    }`}>
                      {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                    </div>
                    <span className={`text-sm font-medium ${
                      isActive || isCompleted ? 'text-text-primary' : 'text-text-secondary'
                    }`}>
                      {step.title}
                    </span>
                    {step.id < steps.length && (
                      <div className={`hidden md:block absolute h-0.5 w-24 mt-6 ${
                        isCompleted ? 'bg-success' : 'bg-gray-200'
                      }`} style={{ left: `${(step.id - 1) * 25 + 12.5}%` }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Card */}
          <Card className="p-8">
            <CardHeader>
              <CardTitle className="text-3xl text-text-primary">
                Education Loan Application
              </CardTitle>
              <p className="text-text-secondary">
                Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
              </p>
            </CardHeader>
            
            <CardContent>
              {renderStepContent()}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                
                {currentStep < 4 ? (
                  <Button variant="cta" onClick={handleNext}>
                    Next Step
                  </Button>
                ) : (
                  <Button
                    variant="cta"
                    onClick={handleSubmit}
                    disabled={!formData.acceptTerms}
                  >
                    Submit Application
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <div className="mt-8 text-center">
            <p className="text-text-secondary mb-4">
              Need help with your application?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button variant="outline">Contact Support</Button>
              </Link>
              <a href="tel:+919876543210">
                <Button variant="secondary">Call +91 98765 43210</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply;