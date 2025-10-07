import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import EducationLoan from "./pages/EducationLoan";
import StudentLoan from "./pages/StudentLoan";
import StudyAbroad from "./pages/StudyAbroad";
import Accommodation from "./pages/Accommodation";
import Contact from "./pages/Contact";
import Apply from "./pages/Apply";
import Eligibility from "./pages/Eligibility";
import FAQ from "./pages/FAQ";
import PersonalLoan from "./pages/PersonalLoan";
import BusinessLoan from "./pages/BusinessLoan";
import HelpCenter from "./pages/HelpCenter";
import LiveChat from "./pages/LiveChat";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/education-loan" element={<EducationLoan />} />
          <Route path="/student-loan" element={<StudentLoan />} />
          <Route path="/study-abroad" element={<StudyAbroad />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/personal-loan" element={<PersonalLoan />} />
          <Route path="/business-loan" element={<BusinessLoan />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/live-chat" element={<LiveChat />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
