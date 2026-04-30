import { useState, useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Calculator, TrendingUp, AlertCircle } from "lucide-react";

const DutyCalculator = () => {
  const [hsCode, setHsCode] = useState("8544.42.10");
  const [cifValue, setCifValue] = useState(10000);
  const [currency, setCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState(282);
  const [customsDuty, setCustomsDuty] = useState(11);
  const [additionalDuty, setAdditionalDuty] = useState(2);
  const [regulatoryDuty, setRegulatoryDuty] = useState(0);
  const [salesTax, setSalesTax] = useState(18);
  const [incomeTax, setIncomeTax] = useState(5.5);

  const calc = useMemo(() => {
    const cifPkr = cifValue * exchangeRate;
    const cd = (cifPkr * customsDuty) / 100;
    const ad = (cifPkr * additionalDuty) / 100;
    const rd = (cifPkr * regulatoryDuty) / 100;
    const dutyValue = cifPkr + cd + ad + rd;
    const st = (dutyValue * salesTax) / 100;
    const stValue = dutyValue + st;
    const it = (stValue * incomeTax) / 100;
    const totalDuties = cd + ad + rd + st + it;
    const landedCost = cifPkr + totalDuties;
    return { cifPkr, cd, ad, rd, st, it, totalDuties, landedCost };
  }, [cifValue, exchangeRate, customsDuty, additionalDuty, regulatoryDuty, salesTax, incomeTax]);

  const fmt = (n: number) => `PKR ${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl">
        <div>
          <h1 className="text-2xl font-bold font-headline">FBR Duty Calculator</h1>
          <p className="text-sm text-muted-foreground mt-1">Calculate customs duty, sales tax, and total landed cost as per FBR rules</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-border p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              <h2 className="font-bold font-headline">Inputs</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs font-semibold text-muted-foreground">HS Code</label>
                <input value={hsCode} onChange={e => setHsCode(e.target.value)} className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm font-mono" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">CIF Value</label>
                <input type="number" value={cifValue} onChange={e => setCifValue(parseFloat(e.target.value) || 0)} className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Currency</label>
                <select value={currency} onChange={e => setCurrency(e.target.value)} className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm bg-white">
                  {["USD", "EUR", "GBP", "CNY", "AED"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-xs font-semibold text-muted-foreground">Exchange Rate (1 {currency} = PKR)</label>
                <input type="number" value={exchangeRate} onChange={e => setExchangeRate(parseFloat(e.target.value) || 0)} className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm" />
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Tariff Rates (%)</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Customs Duty", value: customsDuty, set: setCustomsDuty },
                  { label: "Additional CD", value: additionalDuty, set: setAdditionalDuty },
                  { label: "Regulatory Duty", value: regulatoryDuty, set: setRegulatoryDuty },
                  { label: "Sales Tax", value: salesTax, set: setSalesTax },
                  { label: "Income Tax", value: incomeTax, set: setIncomeTax },
                ].map(f => (
                  <div key={f.label}>
                    <label className="text-xs font-semibold text-muted-foreground">{f.label}</label>
                    <input type="number" step="0.1" value={f.value} onChange={e => f.set(parseFloat(e.target.value) || 0)} className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-primary to-blue-600 text-white rounded-xl p-6">
              <div className="flex items-center gap-2 mb-2 opacity-90"><TrendingUp className="w-4 h-4" /><span className="text-xs font-semibold uppercase tracking-wider">Total Landed Cost</span></div>
              <p className="text-3xl font-bold font-headline">{fmt(calc.landedCost)}</p>
              <p className="text-sm opacity-80 mt-1">CIF + All Duties & Taxes</p>
            </div>

            <div className="bg-white rounded-xl border border-border p-6">
              <h2 className="font-bold font-headline mb-4">Breakdown</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-border"><span className="text-muted-foreground">CIF Value (PKR)</span><span className="font-mono font-semibold">{fmt(calc.cifPkr)}</span></div>
                <div className="flex justify-between py-2"><span className="text-muted-foreground">Customs Duty ({customsDuty}%)</span><span className="font-mono">{fmt(calc.cd)}</span></div>
                <div className="flex justify-between py-2"><span className="text-muted-foreground">Additional Duty ({additionalDuty}%)</span><span className="font-mono">{fmt(calc.ad)}</span></div>
                <div className="flex justify-between py-2"><span className="text-muted-foreground">Regulatory Duty ({regulatoryDuty}%)</span><span className="font-mono">{fmt(calc.rd)}</span></div>
                <div className="flex justify-between py-2"><span className="text-muted-foreground">Sales Tax ({salesTax}%)</span><span className="font-mono">{fmt(calc.st)}</span></div>
                <div className="flex justify-between py-2 border-b border-border"><span className="text-muted-foreground">Income Tax ({incomeTax}%)</span><span className="font-mono">{fmt(calc.it)}</span></div>
                <div className="flex justify-between py-2 text-base"><span className="font-bold">Total Duties</span><span className="font-mono font-bold text-primary">{fmt(calc.totalDuties)}</span></div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900">Indicative calculation. Final assessment depends on FBR valuation, SRO exemptions, and clearance officer's review at WEBOC.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DutyCalculator;
