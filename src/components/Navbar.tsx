import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center">
            <span className="text-3xl font-normal text-transparent bg-gradient-primary bg-clip-text tracking-wide font-logo">
              Fundineed
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/apply?type=education" className="text-text-secondary hover:text-primary transition-colors">Education Loan</Link>
          <Link to="/apply?type=student" className="text-text-secondary hover:text-primary transition-colors">Student Loan</Link>
          <Link to="/apply?type=personal" className="text-text-secondary hover:text-primary transition-colors">Personal Loan</Link>
          <Link to="/apply?type=business" className="text-text-secondary hover:text-primary transition-colors">Business Loan</Link>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">New</Badge>
          <Link to="/contact" className="text-text-secondary hover:text-primary transition-colors">Contact Us</Link>
        </nav>

        <div className="hidden md:block">
          <Link to="/apply">
            <Button variant="cta" size="lg">Apply For Loan</Button>
          </Link>
        </div>

        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link to="/apply?type=education" className="block text-text-secondary hover:text-primary transition-colors">Education Loan</Link>
            <Link to="/apply?type=student" className="block text-text-secondary hover:text-primary transition-colors">Student Loan</Link>
            <Link to="/apply?type=personal" className="block text-text-secondary hover:text-primary transition-colors">Personal Loan</Link>
            <Link to="/apply?type=business" className="block text-text-secondary hover:text-primary transition-colors">Business Loan</Link>
            <Link to="/contact" className="block text-text-secondary hover:text-primary transition-colors">Contact Us</Link>
            <Link to="/apply">
              <Button variant="cta" size="lg" className="w-full">Apply For Loan</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
