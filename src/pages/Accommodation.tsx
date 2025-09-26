import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowLeft, Home, Shield, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Accommodation = () => {
  const accommodationTypes = [
    {
      type: "Student Hostels",
      description: "Budget-friendly shared accommodation with study facilities",
      priceRange: "₹8,000 - ₹15,000/month",
      features: ["Shared rooms", "Common study areas", "Mess facility", "24/7 security"]
    },
    {
      type: "Private Rooms", 
      description: "Independent living with privacy and personal space",
      priceRange: "₹15,000 - ₹30,000/month",
      features: ["Private room", "Attached bathroom", "Kitchen access", "Wi-Fi included"]
    },
    {
      type: "Apartment Sharing",
      description: "Share apartments with fellow students for cost-effective living", 
      priceRange: "₹20,000 - ₹40,000/month",
      features: ["Shared apartment", "Individual rooms", "Full kitchen", "Living area"]
    },
    {
      type: "Premium Housing",
      description: "Luxury student housing with premium amenities",
      priceRange: "₹40,000 - ₹80,000/month", 
      features: ["Fully furnished", "Gym & recreation", "Laundry service", "Housekeeping"]
    }
  ];

  const services = [
    {
      title: "Verified Properties",
      description: "All properties are verified and approved by our team",
      icon: Shield
    },
    {
      title: "Quick Booking",
      description: "Book your accommodation in just a few clicks",
      icon: Clock
    },
    {
      title: "Safe Environment", 
      description: "Secure and safe living environments for students",
      icon: Home
    },
    {
      title: "Community Living",
      description: "Connect with fellow students and build networks",
      icon: Users
    }
  ];

  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", 
    "Chennai", "Kolkata", "Ahmedabad", "Jaipur", "Chandigarh"
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
                STUDENT ACCOMMODATION
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
                Find Your Perfect <span className="text-primary">Student Home</span>
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Discover safe, affordable, and comfortable accommodation options near 
                top universities and colleges across India.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" size="lg">Find Accommodation</Button>
              <Button variant="outline" size="lg">List Your Property</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Why Choose Our Accommodation Services?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-hover transition-shadow">
                  <CardContent className="text-center space-y-4">
                    <Icon className="w-12 h-12 text-primary mx-auto" />
                    <h3 className="text-xl font-semibold text-text-primary">{service.title}</h3>
                    <p className="text-text-secondary">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Accommodation Types */}
      <section className="py-16 bg-hero-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Accommodation Options
            </h2>
            <p className="text-xl text-text-secondary">
              Choose from various types of student accommodation to fit your budget and preferences
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {accommodationTypes.map((accommodation, index) => (
              <Card key={index} className="p-6 hover:shadow-hover transition-all duration-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-text-primary">{accommodation.type}</CardTitle>
                  <p className="text-text-secondary">{accommodation.description}</p>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 w-fit">
                    {accommodation.priceRange}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {accommodation.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <Check className="w-5 h-5 text-success" />
                        <span className="text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="cta" className="w-full">View Options</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Available in Major Cities
            </h2>
            <p className="text-xl text-text-secondary">
              Find student accommodation in these major educational hubs
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {cities.map((city, index) => (
                <Card key={index} className="p-4 hover:shadow-hover transition-all duration-200 cursor-pointer">
                  <CardContent className="text-center">
                    <h3 className="font-semibold text-text-primary">{city}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-hero-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              How It Works
            </h2>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-text-primary">Search & Browse</h3>
              <p className="text-text-secondary">Browse through verified accommodations in your preferred city and location</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-text-primary">Visit & Select</h3>
              <p className="text-text-secondary">Schedule visits to shortlisted properties and select your preferred accommodation</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-text-primary">Book & Move In</h3>
              <p className="text-text-secondary">Complete the booking process and move into your new student home</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Find Your Student Home Today</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Start your accommodation search now and secure your perfect student living space.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg">Search Accommodation</Button>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Need Help?
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Accommodation;