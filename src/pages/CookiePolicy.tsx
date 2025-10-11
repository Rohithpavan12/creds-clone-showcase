import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Cookie, Settings, Shield, Info } from "lucide-react";
import { Link } from "react-router-dom";

const CookiePolicy = () => {
  const cookieTypes = [
    {
      title: "Essential Cookies",
      icon: Shield,
      description: "Required for the website to function properly",
      cookies: [
        "Session management and security",
        "User authentication",
        "Form data preservation",
        "CSRF protection"
      ],
      required: true
    },
    {
      title: "Analytics Cookies",
      icon: Info,
      description: "Help us understand how visitors use our website",
      cookies: [
        "Page view tracking",
        "User journey analysis",
        "Performance monitoring",
        "Error tracking"
      ],
      required: false
    },
    {
      title: "Functional Cookies",
      icon: Settings,
      description: "Enhance your browsing experience on our site",
      cookies: [
        "Language preferences",
        "Theme settings",
        "Chat preferences",
        "Form auto-fill"
      ],
      required: false
    },
    {
      title: "Marketing Cookies",
      icon: Cookie,
      description: "Used to deliver relevant advertisements",
      cookies: [
        "Targeted advertising",
        "Retargeting campaigns",
        "Social media integration",
        "Affiliate tracking"
      ],
      required: false
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
                COOKIE POLICY
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
                Our <span className="text-primary">Cookie Policy</span>
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                We use cookies to improve your browsing experience, analyze site traffic,
                and personalize content. Learn more about how we use cookies and your choices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What are Cookies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                What Are Cookies?
              </h2>
              <p className="text-xl text-text-secondary">
                Cookies are small text files that are placed on your computer or mobile device when you visit our website.
              </p>
            </div>

            <Card className="p-8">
              <CardContent className="space-y-4">
                <p className="text-text-secondary">
                  Cookies help us provide you with a better browsing experience by remembering your preferences,
                  analyzing how you use our website, and personalizing content. They also help us improve our services
                  and provide relevant information to you.
                </p>
                <p className="text-text-secondary">
                  Most web browsers allow you to control cookies through their settings. However, disabling cookies
                  may affect the functionality of our website and limit your ability to use certain features.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cookie Types */}
      <section className="py-16 bg-hero-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Types of Cookies We Use
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {cookieTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-hover transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-text-primary">
                      <div className="flex items-center space-x-3">
                        <Icon className="w-6 h-6 text-primary" />
                        <span>{type.title}</span>
                      </div>
                      {type.required && (
                        <Badge variant="secondary" className="bg-red-100 text-red-800">
                          Required
                        </Badge>
                      )}
                    </CardTitle>
                    <p className="text-text-secondary mt-2">{type.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {type.cookies.map((cookie, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-text-secondary">
                          <span className="text-primary mt-1">•</span>
                          <span>{cookie}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cookie Management */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              Managing Your Cookie Preferences
            </h2>
            <p className="text-xl text-text-secondary">
              You have control over how cookies are used on our website.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <CardContent className="text-center space-y-4">
                  <Settings className="w-12 h-12 text-primary mx-auto" />
                  <h3 className="text-lg font-semibold">Browser Settings</h3>
                  <p className="text-text-secondary text-sm">
                    Most browsers allow you to control cookies through settings.
                    You can block or delete cookies, but this may affect website functionality.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="text-center space-y-4">
                  <Shield className="w-12 h-12 text-primary mx-auto" />
                  <h3 className="text-lg font-semibold">Opt-out Options</h3>
                  <p className="text-text-secondary text-sm">
                    For non-essential cookies, you can opt-out through our cookie
                    preference center or by contacting our support team.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Questions About Cookies?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            If you have any questions about our cookie policy or need help managing your preferences,
            please contact us.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button variant="secondary" size="lg">Contact Us</Button>
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
            This cookie policy was last updated on October 7, 2024.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicy;
