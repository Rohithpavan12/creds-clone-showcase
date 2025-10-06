import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { addEmiCalculation } from "@/lib/storage";

function calcEmi(principal: number, annualRatePct: number, tenureMonths: number) {
  const r = annualRatePct / 12 / 100;
  if (tenureMonths <= 0 || principal <= 0 || annualRatePct < 0) {
    return { emi: 0, totalPayment: 0, totalInterest: 0 };
  }
  if (r === 0) {
    const emi = principal / tenureMonths;
    return { emi, totalPayment: emi * tenureMonths, totalInterest: emi * tenureMonths - principal };
  }
  const pow = Math.pow(1 + r, tenureMonths);
  const emi = (principal * r * pow) / (pow - 1);
  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;
  return { emi, totalPayment, totalInterest };
}

const EmiCalculator = () => {
  const [principal, setPrincipal] = useState(500000);
  const [annualRate, setAnnualRate] = useState(10);
  const [tenureMonths, setTenureMonths] = useState(60);

  const result = useMemo(() => calcEmi(principal, annualRate, tenureMonths), [principal, annualRate, tenureMonths]);

  const onSave = () => {
    const entry = {
      principal,
      annualRate,
      tenureMonths,
      emi: Number(result.emi.toFixed(2)),
      totalInterest: Number(result.totalInterest.toFixed(2)),
      totalPayment: Number(result.totalPayment.toFixed(2)),
    };
    addEmiCalculation(entry);
  };

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

      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
                Loan <span className="text-primary">EMI Calculator</span>
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Estimate your monthly EMI and total interest instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl text-text-primary flex items-center space-x-2">
                  <Calculator className="w-6 h-6" />
                  <span>EMI Inputs</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="principal">Loan Amount (₹)</Label>
                  <Input id="principal" type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value || 0))} />
                  <Slider value={[principal]} onValueChange={(v) => setPrincipal(v[0])} min={50000} max={10000000} step={10000} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                  <Input id="rate" type="number" step="0.1" value={annualRate} onChange={(e) => setAnnualRate(Number(e.target.value || 0))} />
                  <Slider value={[annualRate]} onValueChange={(v) => setAnnualRate(v[0])} min={0} max={30} step={0.1} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tenure">Tenure (Months)</Label>
                  <Input id="tenure" type="number" value={tenureMonths} onChange={(e) => setTenureMonths(Number(e.target.value || 0))} />
                  <Slider value={[tenureMonths]} onValueChange={(v) => setTenureMonths(v[0])} min={6} max={240} step={6} />
                </div>

                <Button variant="cta" className="w-full" onClick={onSave}>Save Calculation</Button>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl text-text-primary">Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-text-secondary text-sm">Monthly EMI</p>
                    <p className="text-2xl font-bold text-text-primary">₹ {result.emi.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm">Total Payment</p>
                    <p className="text-2xl font-bold text-text-primary">₹ {result.totalPayment.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm">Total Interest</p>
                    <p className="text-2xl font-bold text-text-primary">₹ {result.totalInterest.toFixed(2)}</p>
                  </div>
                </div>
                <p className="text-xs text-text-secondary">Note: Results are estimates and may vary with lender terms.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmiCalculator;
