import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Calculator, Check, X, TrendingUp, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const Eligibility = () => {
  const [formData, setFormData] = useState({
    age: "",
    income: "", 
    course: "",
    loanAmount: "",
    academicRecord: "",
    employmentStatus: ""
  });

  const [result, setResult] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateEligibility = () => {
    // Simple eligibility logic for demo
    const age = parseInt(formData.age);
    const income = parseInt(formData.income.split('-')[0]);
    const loanAmount = parseInt(formData.loanAmount.split('-')[0]);
    
    let score = 0;
    let factors = [];
    
    // Age factor
    if (age >= 18 && age <= 35) {
      score += 25;
      factors.push({ factor: "Age Range", status: "good", message: "Within eligible age range" });
    } else {
      factors.push({ factor: "Age Range", status: "poor", message: "Age should be between 18-35 years" });
    }
    
    // Income factor
    if (income >= 300000) {
      score += 30;
      factors.push({ factor: "Family Income", status: "good", message: "Sufficient family income" });
    } else if (income >= 150000) {
      score += 20;
      factors.push({ factor: "Family Income", status: "average", message: "Moderate family income" });
    } else {
      score += 10;
      factors.push({ factor: "Family Income", status: "poor", message: "Low family income may require collateral" });
    }
    
    // Course factor
    if (formData.course === "engineering" || formData.course === "medical" || formData.course === "mba") {
      score += 25;
      factors.push({ factor: "Course Type", status: "good", message: "High-demand course with good ROI" });
    } else {
      score += 15;
      factors.push({ factor: "Course Type", status: "average", message: "Standard course eligibility" });
    }
    
    // Academic record
    if (formData.academicRecord === "excellent") {
      score += 20;
      factors.push({ factor: "Academic Record", status: "good", message: "Excellent academic performance" });
    } else if (formData.academicRecord === "good") {
      score += 15;
      factors.push({ factor: "Academic Record", status: "average", message: "Good academic performance" });
    } else {
      score += 5;
      factors.push({ factor: "Academic Record", status: "poor", message: "Academic record needs improvement" });
    }

    let eligibilityStatus, message, recommendations;
    
    if (score >= 80) {
      eligibilityStatus = "excellent";
      message = "Congratulations! You have excellent eligibility for education loans.";
      recommendations = [
        "Apply for unsecured loans up to ₹40 lakhs",
        "Competitive interest rates available",
        "Quick approval process expected"
      ];
    } else if (score >= 60) {
      eligibilityStatus = "good";
      message = "You have good eligibility for education loans with some conditions.";
      recommendations = [
        "Consider secured loans for better rates",
        "Co-applicant may strengthen application",
        "Document preparation assistance available"
      ];
    } else if (score >= 40) {
      eligibilityStatus = "average";
      message = "You may be eligible with additional requirements.";
      recommendations = [
        "Collateral may be required",
        "Consider adding a co-applicant with higher income",
        "Build your academic record before applying"
      ];
    } else {
      eligibilityStatus = "poor";
      message = "Your current profile may not meet standard eligibility criteria.";
      recommendations = [
        "Improve academic performance",
        "Consider gap year to strengthen profile",
        "Explore scholarship opportunities"
      ];
    }

    setResult({
      score,
      eligibilityStatus,
      message,
      factors,
      recommendations
    });
  };

  const resetForm = () => {
    setFormData({
      age: "",
      income: "",
      course: "",
      loanAmount: "",
      academicRecord: "",
      employmentStatus: ""
    });
    setResult(null);
  };

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
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
                Check Your <span className="text-primary">Loan Eligibility</span>
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Get an instant assessment of your education loan eligibility with our smart calculator. 
                No impact on your credit score.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Calculator */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="p-8">
                <CardHeader>
                  <CardTitle className="text-2xl text-text-primary flex items-center space-x-2">
                    <Calculator className="w-6 h-6" />
                    <span>Eligibility Calculator</span>
                  </CardTitle>
                  <p className="text-text-secondary">Fill in your details to check eligibility</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age *</Label>
                      <Input
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                        placeholder="Enter your age"
                        min="16"
                        max="50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="income">Annual Family Income *</Label>
                      <Select value={formData.income} onValueChange={(value) => handleInputChange("income", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select income range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-200000">Below ₹2 Lakhs</SelectItem>
                          <SelectItem value="200000-500000">₹2 - ₹5 Lakhs</SelectItem>
                          <SelectItem value="500000-1000000">₹5 - ₹10 Lakhs</SelectItem>
                          <SelectItem value="1000000-2500000">₹10 - ₹25 Lakhs</SelectItem>
                          <SelectItem value="2500000-5000000">₹25+ Lakhs</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="course">Course Type *</Label>
                    <Select value={formData.course} onValueChange={(value) => handleInputChange("course", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your course type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering/Technology</SelectItem>
                        <SelectItem value="medical">Medical/Healthcare</SelectItem>
                        <SelectItem value="mba">MBA/Management</SelectItem>
                        <SelectItem value="law">Law</SelectItem>
                        <SelectItem value="arts">Arts/Humanities</SelectItem>
                        <SelectItem value="science">Pure Sciences</SelectItem>
                        <SelectItem value="commerce">Commerce/Finance</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loanAmount">Required Loan Amount *</Label>
                    <Select value={formData.loanAmount} onValueChange={(value) => handleInputChange("loanAmount", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan amount" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100000-500000">₹1 - ₹5 Lakhs</SelectItem>
                        <SelectItem value="500000-1000000">₹5 - ₹10 Lakhs</SelectItem>
                        <SelectItem value="1000000-2000000">₹10 - ₹20 Lakhs</SelectItem>
                        <SelectItem value="2000000-4000000">₹20 - ₹40 Lakhs</SelectItem>
                        <SelectItem value="4000000-10000000">₹40+ Lakhs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="academicRecord">Academic Performance *</Label>
                    <Select value={formData.academicRecord} onValueChange={(value) => handleInputChange("academicRecord", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select academic performance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent (80%+ / 8+ CGPA)</SelectItem>
                        <SelectItem value="good">Good (70-80% / 7-8 CGPA)</SelectItem>
                        <SelectItem value="average">Average (60-70% / 6-7 CGPA)</SelectItem>
                        <SelectItem value="below-average">Below Average (<60% / <6 CGPA)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      variant="cta" 
                      onClick={calculateEligibility}
                      className="flex-1"
                      disabled={!formData.age || !formData.income || !formData.course || !formData.loanAmount || !formData.academicRecord}
                    >
                      Check Eligibility
                    </Button>
                    <Button variant="outline" onClick={resetForm}>
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
              <div className="space-y-6">
                {result ? (
                  <>
                    {/* Eligibility Score */}
                    <Card className="p-6">
                      <CardContent className="text-center space-y-4">
                        <div className="relative w-32 h-32 mx-auto">
                          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#E5E7EB"
                              strokeWidth="2"
                            />
                            <path
                              d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={result.eligibilityStatus === 'excellent' ? '#10B981' : 
                                     result.eligibilityStatus === 'good' ? '#059669' :
                                     result.eligibilityStatus === 'average' ? '#F59E0B' : '#EF4444'}
                              strokeWidth="2"
                              strokeDasharray={`${result.score}, 100`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-text-primary">{result.score}%</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Badge 
                            variant={result.eligibilityStatus === 'excellent' || result.eligibilityStatus === 'good' ? 'default' : 'secondary'}
                            className={`${
                              result.eligibilityStatus === 'excellent' ? 'bg-success text-white' :
                              result.eligibilityStatus === 'good' ? 'bg-success/80 text-white' :
                              result.eligibilityStatus === 'average' ? 'bg-warning text-white' :
                              'bg-destructive text-white'
                            }`}
                          >
                            {result.eligibilityStatus.charAt(0).toUpperCase() + result.eligibilityStatus.slice(1)} Eligibility
                          </Badge>
                          <p className="text-text-secondary">{result.message}</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Factors */}
                    <Card className="p-6">
                      <CardHeader>
                        <CardTitle className="text-lg text-text-primary">Eligibility Factors</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {result.factors.map((factor: any, index: number) => (
                          <div key={index} className="flex items-start justify-between p-3 border border-border rounded-lg">
                            <div className="flex items-start space-x-3">
                              {factor.status === 'good' ? (
                                <Check className="w-5 h-5 text-success mt-0.5" />
                              ) : factor.status === 'average' ? (
                                <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
                              ) : (
                                <X className="w-5 h-5 text-destructive mt-0.5" />
                              )}
                              <div>
                                <p className="font-medium text-text-primary">{factor.factor}</p>
                                <p className="text-sm text-text-secondary">{factor.message}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Recommendations */}
                    <Card className="p-6">
                      <CardHeader>
                        <CardTitle className="text-lg text-text-primary flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5" />
                          <span>Recommendations</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {result.recommendations.map((rec: string, index: number) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-text-secondary">{rec}</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="space-y-4">
                      <Link to="/apply">
                        <Button variant="cta" size="lg" className="w-full">
                          Apply for Loan Now
                        </Button>
                      </Link>
                      <Link to="/contact">
                        <Button variant="outline" size="lg" className="w-full">
                          Speak to a Loan Expert
                        </Button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <Card className="p-8">
                    <CardContent className="text-center space-y-6">
                      <Calculator className="w-16 h-16 text-primary mx-auto" />
                      <div>
                        <h3 className="text-xl font-semibold text-text-primary mb-2">
                          Ready to Check Your Eligibility?
                        </h3>
                        <p className="text-text-secondary">
                          Fill in your details in the form to get an instant assessment of your loan eligibility.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Eligibility;