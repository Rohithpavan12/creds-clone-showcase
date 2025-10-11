import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  const faqs = [
    {
      category: "General",
      questions: [
        {
          question: "What is an education loan?",
          answer: "An education loan is a financial product designed to help students fund their higher education expenses including tuition fees, accommodation, books, and other study-related costs. The loan is typically repaid after the completion of the course."
        },
        {
          question: "Who can apply for an education loan?",
          answer: "Indian citizens aged 16-35 years who have secured admission in recognized educational institutions can apply. A co-applicant (parent, guardian, or spouse) is usually required."
        },
        {
          question: "What is the maximum loan amount available?",
          answer: "Loan amounts vary based on the course and institution. For Indian institutions, loans up to ₹10 lakhs are available without collateral. For premium institutes and study abroad, loans up to ₹1.5 crores are possible with collateral."
        },
        {
          question: "Do I need collateral for education loans?",
          answer: "For loans up to ₹7.5 lakhs, no collateral is typically required. For higher amounts, collateral such as property, fixed deposits, or securities may be needed depending on the lender's policy."
        }
      ]
    },
    {
      category: "Application Process",
      questions: [
        {
          question: "How long does it take to process an education loan?",
          answer: "With Fundineed, most education loans are processed within 48-72 hours of document submission. The exact time depends on the completeness of documents and lender verification processes."
        },
        {
          question: "What documents are required for loan application?",
          answer: "Required documents include: admission letter, fee structure, identity proof, address proof, income proof of co-applicant, academic records, bank statements, and passport-size photographs."
        },
        {
          question: "Can I apply for a loan before getting admission?",
          answer: "Most lenders require a confirmed admission letter before processing the loan. However, you can start the eligibility assessment and pre-approval process with conditional admission letters."
        },
        {
          question: "What if my loan application is rejected?",
          answer: "If rejected by one lender, you can apply to other partner banks. Our team helps identify alternative options and works on strengthening your application for better chances of approval."
        }
      ]
    },
    {
      category: "Interest Rates & Repayment",
      questions: [
        {
          question: "What are the current interest rates?",
          answer: "Interest rates start from 8.33% per annum and vary based on the loan amount, course, institution, and applicant profile. Rates are subject to change based on market conditions."
        },
        {
          question: "When do I start repaying the loan?",
          answer: "Repayment typically starts 6 months to 1 year after course completion or getting a job, whichever is earlier. During the study period and moratorium, only simple interest may need to be paid."
        },
        {
          question: "What is the repayment tenure?",
          answer: "Repayment tenure ranges from 5 to 15 years depending on the loan amount and lender policy. Longer tenures are available for higher loan amounts."
        },
        {
          question: "Are there any prepayment charges?",
          answer: "Many lenders don't charge prepayment penalties for education loans. However, terms vary by lender, and it's advisable to check the specific loan agreement."
        }
      ]
    },
    {
      category: "Study Abroad",
      questions: [
        {
          question: "Can I get a loan for studying abroad?",
          answer: "Yes, we provide education loans for studying in 50+ countries including USA, UK, Canada, Australia, Germany, and more. Loan amounts up to $200,000 or equivalent are available."
        },
        {
          question: "Do you provide forex services?",
          answer: "Yes, we offer competitive forex rates and currency hedging services to protect against exchange rate fluctuations during your study period abroad."
        },
        {
          question: "What expenses are covered under study abroad loans?",
          answer: "Study abroad loans cover tuition fees, living expenses, travel costs, visa fees, insurance, books, equipment, and other study-related expenses as per the fee structure."
        },
        {
          question: "Do I need a co-signer for study abroad loans?",
          answer: "For most study abroad loans, a co-applicant in India is required. Some lenders also accept co-signers in the destination country, depending on their policies."
        }
      ]
    },
    {
      category: "Tax Benefits & Other Benefits",
      questions: [
        {
          question: "Are there tax benefits on education loans?",
          answer: "Yes, under Section 80E of the Income Tax Act, the entire interest paid on education loans is deductible from taxable income for up to 8 years or until the loan is repaid, whichever is earlier."
        },
        {
          question: "What happens if I'm unable to repay due to job loss?",
          answer: "Most lenders offer restructuring options, payment holidays, or tenure extensions in case of genuine financial hardship. It's important to communicate with your lender proactively."
        },
        {
          question: "Can I get a loan for distance learning or online courses?",
          answer: "Loan availability for distance learning depends on the institution's recognition and course accreditation. Many top-tier online programs from recognized institutions are eligible for funding."
        },
        {
          question: "Is loan insurance mandatory?",
          answer: "While not always mandatory, loan insurance is highly recommended as it protects the borrower and co-applicant in case of unforeseen circumstances. Some lenders make it compulsory for higher loan amounts."
        }
      ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div>

      {/* Hero Section */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <HelpCircle className="w-16 h-16 text-primary mx-auto" />
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
                Frequently Asked <span className="text-primary">Questions</span>
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Find answers to common questions about education loans, application processes, 
                and our services.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <Input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-3 text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((category, categoryIndex) => (
                <Card key={categoryIndex} className="p-6">
                  <CardContent>
                    <h2 className="text-2xl font-bold text-text-primary mb-6">
                      {category.category}
                    </h2>
                    
                    <Accordion type="single" collapsible className="space-y-4">
                      {category.questions.map((faq, index) => (
                        <AccordionItem 
                          key={index} 
                          value={`${categoryIndex}-${index}`}
                          className="border border-border rounded-lg px-4"
                        >
                          <AccordionTrigger className="text-left py-4 hover:no-underline">
                            <span className="font-medium text-text-primary pr-4">
                              {faq.question}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 text-text-secondary leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="p-8">
                <CardContent className="text-center space-y-6">
                  <Search className="w-16 h-16 text-text-secondary mx-auto" />
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      No results found
                    </h3>
                    <p className="text-text-secondary">
                      Try searching with different keywords or browse our categories above.
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16 bg-hero-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 text-center">
              <CardContent className="space-y-6">
                <MessageCircle className="w-16 h-16 text-primary mx-auto" />
                <div>
                  <h2 className="text-3xl font-bold text-text-primary mb-4">
                    Still Need Help?
                  </h2>
                  <p className="text-xl text-text-secondary mb-8">
                    Can't find what you're looking for? Our expert team is here to help 
                    you with personalized assistance.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <Link to="/contact">
                    <Button variant="cta" size="lg" className="w-full h-auto py-4">
                      <div className="text-center">
                        <MessageCircle className="w-6 h-6 mx-auto mb-2" />
                        <div className="font-semibold">Contact Us</div>
                        <div className="text-sm opacity-90">Send us a message</div>
                      </div>
                    </Button>
                  </Link>
                  
                  <a href="tel:+919876543210">
                    <Button variant="outline" size="lg" className="w-full h-auto py-4">
                      <div className="text-center">
                        <Phone className="w-6 h-6 mx-auto mb-2" />
                        <div className="font-semibold">Call Us</div>
                        <div className="text-sm opacity-70">+91 98765 43210</div>
                      </div>
                    </Button>
                  </a>

                  <Link to="/apply">
                    <Button variant="secondary" size="lg" className="w-full h-auto py-4">
                      <div className="text-center">
                        <HelpCircle className="w-6 h-6 mx-auto mb-2" />
                        <div className="font-semibold">Start Application</div>
                        <div className="text-sm opacity-70">Begin your loan journey</div>
                      </div>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;