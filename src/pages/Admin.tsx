import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { getAllContactMessages, getAllEligibilityResults, getAllEmiCalculations } from "@/lib/storage";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Admin = () => {
  const [contact, setContact] = useState(getAllContactMessages());
  const [elig, setElig] = useState(getAllEligibilityResults());
  const [emi, setEmi] = useState(getAllEmiCalculations());

  useEffect(() => {
    const onFocus = () => {
      setContact(getAllContactMessages());
      setElig(getAllEligibilityResults());
      setEmi(getAllEmiCalculations());
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  return (
    <div className="min-h-screen">
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

      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-text-primary">Admin Submissions</h1>
            <Button variant="outline" onClick={() => { setContact(getAllContactMessages()); setElig(getAllEligibilityResults()); setEmi(getAllEmiCalculations()); }}>Refresh</Button>
          </div>

          <Tabs defaultValue="contact" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="contact">Contact Messages ({contact.length})</TabsTrigger>
              <TabsTrigger value="eligibility">Eligibility Results ({elig.length})</TabsTrigger>
              <TabsTrigger value="emi">EMI Calculations ({emi.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="contact">
              <div className="grid gap-4">
                {contact.length === 0 && <p className="text-text-secondary">No messages yet.</p>}
                {contact.map((c) => (
                  <Card key={c.id} className="p-4">
                    <CardHeader>
                      <CardTitle className="text-text-primary text-lg">{c.name} • {new Date(c.timestamp).toLocaleString()}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1 text-sm">
                      {c.email && <p><span className="font-medium">Email:</span> {c.email}</p>}
                      {c.phone && <p><span className="font-medium">Phone:</span> {c.phone}</p>}
                      {c.subject && <p><span className="font-medium">Subject:</span> {c.subject}</p>}
                      <p><span className="font-medium">Source:</span> {c.source}</p>
                      <p className="mt-2 whitespace-pre-wrap">{c.message}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="eligibility">
              <div className="grid gap-4">
                {elig.length === 0 && <p className="text-text-secondary">No results yet.</p>}
                {elig.map((e) => (
                  <Card key={e.id} className="p-4">
                    <CardHeader>
                      <CardTitle className="text-text-primary text-lg">Score: {e.result.score}% • {e.result.eligibilityStatus} • {new Date(e.timestamp).toLocaleString()}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p className="mb-2 text-text-secondary">Form Snapshot</p>
                      <pre className="bg-hero-bg p-3 rounded text-xs overflow-auto">{JSON.stringify(e.form, null, 2)}</pre>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="emi">
              <div className="grid gap-4">
                {emi.length === 0 && <p className="text-text-secondary">No calculations yet.</p>}
                {emi.map((m) => (
                  <Card key={m.id} className="p-4">
                    <CardHeader>
                      <CardTitle className="text-text-primary text-lg">₹{m.principal} • {m.annualRate}% • {m.tenureMonths} mo • {new Date(m.timestamp).toLocaleString()}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-2 text-sm">
                      <p><span className="font-medium">EMI:</span> ₹{m.emi}</p>
                      <p><span className="font-medium">Total Payment:</span> ₹{m.totalPayment}</p>
                      <p><span className="font-medium">Total Interest:</span> ₹{m.totalInterest}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Admin;
