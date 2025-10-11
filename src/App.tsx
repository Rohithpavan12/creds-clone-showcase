import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
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
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import { tracker } from "./lib/tracker";

const queryClient = new QueryClient();

// Initialize real data tracking
tracker;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/education-loan" element={<Layout><EducationLoan /></Layout>} />
          <Route path="/student-loan" element={<Layout><StudentLoan /></Layout>} />
          <Route path="/study-abroad" element={<Layout><StudyAbroad /></Layout>} />
          <Route path="/accommodation" element={<Layout><Accommodation /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/apply" element={<Layout><Apply /></Layout>} />
          <Route path="/eligibility" element={<Layout><Eligibility /></Layout>} />
          <Route path="/faq" element={<Layout><FAQ /></Layout>} />
          <Route path="/personal-loan" element={<Layout><PersonalLoan /></Layout>} />
          <Route path="/business-loan" element={<Layout><BusinessLoan /></Layout>} />
          <Route path="/help-center" element={<Layout><HelpCenter /></Layout>} />
          <Route path="/live-chat" element={<Layout><LiveChat /></Layout>} />
          <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
          <Route path="/terms-of-service" element={<Layout><TermsOfService /></Layout>} />
          <Route path="/cookie-policy" element={<Layout><CookiePolicy /></Layout>} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Layout><Admin /></Layout>
            </ProtectedRoute>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
