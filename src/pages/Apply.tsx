import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Check, FileText, User, GraduationCap, DollarSign } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { trackEvent, trackPageView } from "@/lib/analytics";
import { fundineedDB } from "@/lib/database";

const Apply = () => {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [loanType, setLoanType] = useState("Education Loan");
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    aadhar: "",
    pan: "",
    
    // Education Information (for Education Loan)
    course: "",
    institution: "",
    courseYear: "",
    
    // Employment Information (for Personal Loan)
    companyName: "",
    employmentType: "",
    workExperience: "",
    
    // Business Information (for Business Loan)
    businessName: "",
    businessType: "",
    businessAge: "",
    
    // Financial Information
    loanAmount: "",
    familyIncome: "",
    coApplicant: "",
    loanPurpose: "",
    
    // Documents
    acceptTerms: false
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateAadhar = (aadhar: string): boolean => {
    const aadharRegex = /^\d{4}\s?\d{4}\s?\d{4}$/;
    return aadharRegex.test(aadhar);
  };

  const validatePAN = (pan: string): boolean => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan.toUpperCase());
  };

  const validateAge = (dateOfBirth: string): boolean => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 18;
    }
    return age >= 18;
  };

  const getRequiredDocuments = () => {
    const baseDocuments = [
      { type: 'passport', name: 'Passport/Photo ID' },
      { type: 'identity', name: 'Aadhar Card' },
      { type: 'address', name: 'Address Proof' },
      { type: 'income', name: 'Income Proof' }
    ];

    if (loanType === "Education Loan") {
      baseDocuments.push({ type: 'academic', name: 'Academic Documents' });
    }

    return baseDocuments;
  };

  const validateStep = (step: number): boolean => {
    const errors: {[key: string]: string} = {};

    if (step === 1) {
      // Only validate required fields: name, email, phone
      if (!formData.firstName.trim()) {
        errors.firstName = "First name is required";
      } else if (formData.firstName.length < 2) {
        errors.firstName = "First name must be at least 2 characters";
      }

      if (!formData.lastName.trim()) {
        errors.lastName = "Last name is required";
      } else if (formData.lastName.length < 2) {
        errors.lastName = "Last name must be at least 2 characters";
      }

      if (!formData.email.trim()) {
        errors.email = "Email is required";
      } else if (!validateEmail(formData.email)) {
        errors.email = "Please enter a valid email address";
      }

      if (!formData.phone.trim()) {
        errors.phone = "Phone number is required";
      } else if (!validatePhone(formData.phone)) {
        errors.phone = "Please enter a valid Indian phone number";
      }
    }

    // Steps 2 and 3 are optional - allow navigation without validation
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  interface FileData {
    base64: string;
    name: string;
    type: string;
    fileType: string;
    size: number;
    uploadedAt: string;
  }

  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: FileData | null}>({
    passport: null,
    identity: null,
    address: null,
    income: null,
    academic: null,
    admission: null,
    bank: null,
    fee: null,
    employment: null,
    business: null,
    financial: null,
    gst: null
  });

  // Loan type configurations
  const loanTypeConfig = {
    "Education Loan": {
      title: "Education Loan Application",
      step2Title: "Education Info",
      step2Icon: GraduationCap,
      fields: ["course", "institution", "courseYear", "loanPurpose"],
      documents: [
        { name: "Passport size photographs", key: "passport" },
        { name: "Identity proof (Aadhar/Passport)", key: "identity" }, 
        { name: "Address proof", key: "address" },
        { name: "Income proof of co-applicant", key: "income" },
        { name: "Academic records & marksheets", key: "academic" },
        { name: "Admission letter", key: "admission" },
        { name: "Bank statements (6 months)", key: "bank" },
        { name: "Fee structure from institution", key: "fee" }
      ]
    },
    "Personal Loan": {
      title: "Personal Loan Application",
      step2Title: "Employment Info",
      step2Icon: User,
      fields: ["employmentType", "companyName", "workExperience", "loanPurpose"],
      documents: [
        { name: "Passport size photographs", key: "passport" },
        { name: "Identity proof (Aadhar/Passport)", key: "identity" }, 
        { name: "Address proof", key: "address" },
        { name: "Income proof/Salary slips", key: "income" },
        { name: "Bank statements (6 months)", key: "bank" },
        { name: "Employment certificate", key: "employment" }
      ]
    },
    "Business Loan": {
      title: "Business Loan Application",
      step2Title: "Business Info",
      step2Icon: DollarSign,
      fields: ["businessName", "businessType", "businessAge", "loanPurpose"],
      documents: [
        { name: "Passport size photographs", key: "passport" },
        { name: "Identity proof (Aadhar/Passport)", key: "identity" }, 
        { name: "Address proof", key: "address" },
        { name: "Business registration documents", key: "business" },
        { name: "Financial statements (2 years)", key: "financial" },
        { name: "Bank statements (12 months)", key: "bank" },
        { name: "GST returns", key: "gst" }
      ]
    },
    "Student Loan": {
      title: "Student Loan Application",
      step2Title: "Study Info",
      step2Icon: GraduationCap,
      fields: ["course", "institution", "courseYear", "loanPurpose"],
      documents: [
        { name: "Passport size photographs", key: "passport" },
        { name: "Identity proof (Aadhar/Passport)", key: "identity" }, 
        { name: "Address proof", key: "address" },
        { name: "Income proof of parents/guardian", key: "income" },
        { name: "Academic records & marksheets", key: "academic" },
        { name: "Admission letter", key: "admission" },
        { name: "Bank statements (6 months)", key: "bank" }
      ]
    }
  };

  // Detect loan type from URL parameters and track page view
  useEffect(() => {
    const type = searchParams.get('type');
    if (type) {
      const formattedType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase() + ' Loan';
      if (loanTypeConfig[formattedType as keyof typeof loanTypeConfig]) {
        setLoanType(formattedType);
        trackPageView(`Apply - ${formattedType}`);
      }
    } else {
      trackPageView('Apply - Education Loan');
    }
    
    trackEvent('application_started', { loanType: loanType });
  }, [searchParams, loanType]);

  const currentConfig = loanTypeConfig[loanType as keyof typeof loanTypeConfig];
  
  const steps = [
    { id: 1, title: "Personal Details", icon: User },
    { id: 2, title: currentConfig?.step2Title || "Education Info", icon: currentConfig?.step2Icon || GraduationCap },
    { id: 3, title: "Financial Details", icon: DollarSign },
    { id: 4, title: "Documents", icon: FileText }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (documentType: string, file: File) => {
    // Validate file type and size
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF, JPG, or PNG files only.",
        variant: "destructive"
      });
      return;
    }

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload files smaller than 5MB.",
        variant: "destructive"
      });
      return;
    }

    // Convert file to base64 for storage
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Result = e.target?.result as string;
      
      // Debug log to check base64 data
      console.log('File uploaded:', {
        name: file.name,
        type: file.type,
        size: file.size,
        base64Length: base64Result?.length || 0,
        base64Preview: base64Result?.substring(0, 50) + '...'
      });

      const fileData = {
        base64: base64Result,
        name: file.name,
        type: file.type,
        fileType: file.type, // Add fileType for consistency
        size: file.size,
        uploadedAt: new Date().toISOString()
      };

      setUploadedFiles(prev => ({
        ...prev,
        [documentType]: fileData
      }));

      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded. Size: ${(file.size / 1024).toFixed(1)} KB`,
      });
      
      trackEvent('document_uploaded', { 
        documentType: documentType, 
        fileName: file.name,
        fileSize: file.size,
        loanType: loanType
      });
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      toast({
        title: "Upload Error",
        description: "Failed to process the file. Please try again.",
        variant: "destructive"
      });
    };
    
    reader.readAsDataURL(file);
  };

  const triggerFileUpload = (documentType: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleFileUpload(documentType, file);
      }
    };
    input.click();
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
        setFormErrors({}); // Clear errors when moving to next step
      }
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields correctly before proceeding.",
        variant: "destructive"
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simplified validation - only name, email, phone required
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setIsSubmitting(false);
      toast({
        title: "Validation Error",
        description: "Please fill in your name, email address, and mobile number.",
        variant: "destructive"
      });
      return;
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      setIsSubmitting(false);
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    // Validate phone format
    if (!validatePhone(formData.phone)) {
      setIsSubmitting(false);
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid Indian mobile number.",
        variant: "destructive"
      });
      return;
    }

    // Create application with uploaded documents
    const application = {
      id: `#APP-${String(Date.now()).slice(-6)}`,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      type: loanType as 'Education Loan' | 'Personal Loan' | 'Business Loan' | 'Student Loan',
      amount: formData.loanAmount || "0",
      status: "pending" as 'pending' | 'approved' | 'rejected' | 'review',
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toISOString(),
      formData: formData,
      documents: Object.entries(uploadedFiles)
        .filter(([_, fileData]) => fileData !== null)
        .map(([key, fileData]) => ({
          type: key,
          name: fileData!.name,
          size: fileData!.size,
          base64: fileData!.base64,
          fileType: fileData!.type,
          uploadedAt: fileData!.uploadedAt
        }))
    };

    // Save to IndexedDB database
    try {
      await fundineedDB.addApplication(application);
      console.log('Application saved to database:', application.id);
    } catch (error) {
      console.error('Error saving application:', error);
      // Fallback to localStorage if database fails
      let existingApplications = JSON.parse(localStorage.getItem('fundineed_applications_db') || '[]');
      existingApplications.push(application);
      localStorage.setItem('fundineed_applications_db', JSON.stringify(existingApplications));
    }
    
    // Track application completion
    trackEvent('application_completed', { 
      loanType: loanType,
      applicationId: application.id,
      documentsCount: application.documents.length,
      amount: application.amount
    });

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
      companyName: "",
      employmentType: "",
      workExperience: "",
      businessName: "",
      businessType: "",
      businessAge: "",
      loanAmount: "",
      familyIncome: "",
      coApplicant: "",
      loanPurpose: "",
      acceptTerms: false
    });
    
    setUploadedFiles({
      passport: null,
      identity: null,
      address: null,
      income: null,
      academic: null,
      admission: null,
      bank: null,
      fee: null,
      employment: null,
      business: null,
      financial: null,
      gst: null
    });
    setCurrentStep(1);
    setIsSubmitting(false);
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
                  placeholder="Enter your first name"
                  required
                  className={formErrors.firstName ? "border-destructive" : ""}
                />
                {formErrors.firstName && (
                  <p className="text-sm text-destructive mt-1">{formErrors.firstName}</p>
                )}
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
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aadhar">Aadhar Number</Label>
                <Input
                  id="aadhar"
                  value={formData.aadhar}
                  onChange={(e) => handleInputChange("aadhar", e.target.value)}
                  placeholder="1234 5678 9012"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pan">PAN Number</Label>
                <Input
                  id="pan"
                  value={formData.pan}
                  onChange={(e) => handleInputChange("pan", e.target.value)}
                  placeholder="ABCDE1234F"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-text-primary mb-4">{currentConfig?.step2Title || "Educational Information"}</h3>
            
            {loanType === "Education Loan" || loanType === "Student Loan" ? (
              <>
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
              </>
            ) : loanType === "Personal Loan" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="employmentType">Employment Type *</Label>
                  <Select value={formData.employmentType} onValueChange={(value) => handleInputChange("employmentType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salaried">Salaried</SelectItem>
                      <SelectItem value="self-employed">Self Employed</SelectItem>
                      <SelectItem value="business">Business Owner</SelectItem>
                      <SelectItem value="freelancer">Freelancer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName">Company/Organization Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    placeholder="Enter company name"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="workExperience">Work Experience *</Label>
                    <Select value={formData.workExperience} onValueChange={(value) => handleInputChange("workExperience", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1-years">0-1 Years</SelectItem>
                        <SelectItem value="1-3-years">1-3 Years</SelectItem>
                        <SelectItem value="3-5-years">3-5 Years</SelectItem>
                        <SelectItem value="5-10-years">5-10 Years</SelectItem>
                        <SelectItem value="10-plus-years">10+ Years</SelectItem>
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
                        <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
                        <SelectItem value="home-renovation">Home Renovation</SelectItem>
                        <SelectItem value="medical-expenses">Medical Expenses</SelectItem>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            ) : loanType === "Business Loan" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange("businessName", e.target.value)}
                    placeholder="Enter business name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type *</Label>
                  <Select value={formData.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="private-limited">Private Limited</SelectItem>
                      <SelectItem value="llp">LLP</SelectItem>
                      <SelectItem value="public-limited">Public Limited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessAge">Business Age *</Label>
                    <Select value={formData.businessAge} onValueChange={(value) => handleInputChange("businessAge", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business age" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1-years">0-1 Years</SelectItem>
                        <SelectItem value="1-3-years">1-3 Years</SelectItem>
                        <SelectItem value="3-5-years">3-5 Years</SelectItem>
                        <SelectItem value="5-10-years">5-10 Years</SelectItem>
                        <SelectItem value="10-plus-years">10+ Years</SelectItem>
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
                        <SelectItem value="working-capital">Working Capital</SelectItem>
                        <SelectItem value="equipment-purchase">Equipment Purchase</SelectItem>
                        <SelectItem value="business-expansion">Business Expansion</SelectItem>
                        <SelectItem value="inventory">Inventory</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            ) : null}
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
                {(currentConfig?.documents || []).map((doc, index) => {
                  const isUploaded = uploadedFiles[doc.key] !== null;
                  return (
                    <div key={index} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                      <FileText className={`w-5 h-5 ${isUploaded ? 'text-success' : 'text-primary'}`} />
                      <span className="text-text-secondary flex-1">{doc.name}</span>
                      <Button 
                        variant={isUploaded ? "default" : "outline"} 
                        size="sm"
                        onClick={() => triggerFileUpload(doc.key)}
                      >
                        {isUploaded ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Uploaded
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload
                          </>
                        )}
                      </Button>
                    </div>
                  );
                })}
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
                      By submitting this application, you consent to Fundineed processing your personal data for loan evaluation purposes.
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
    <div className="bg-hero-bg">

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
                {currentConfig?.title || "Education Loan Application"}
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