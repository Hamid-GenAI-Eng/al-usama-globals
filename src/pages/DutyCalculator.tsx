import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Calculator, TrendingUp, AlertCircle, RefreshCw, ArrowRight, ShieldCheck, DollarSign } from "lucide-react";
import api from "@/lib/api";
import { debounce } from "lodash";

const DutyCalculator = () => {
  const [inputs, setInputs] = useState({
    hsCode: "8471.3000",
    cifValue: 10000,
    currency: "USD",
    exchangeRate: 282,
    customsDuty: 11,
    additionalDuty: 2,
    regulatoryDuty: 0,
    salesTax: 18,
    incomeTax: 5.5,
  });

  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const calculate = async (vals: any) => {
    setLoading(true);
    try {
      const response = await api.post("/customs/calculate-duty", vals);
      setResults(response.data.data);
    } catch (error) {
      console.error("Calculation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedCalc = useCallback(debounce(calculate, 600), []);

  useEffect(() => {
    debouncedCalc(inputs);
  }, [inputs, debouncedCalc]);

  const updateInput = (key: string, val: any) => {
    setInputs(prev => ({ ...prev, [key]: val }));
  };

  const fmt = (n: number) => `PKR ${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  return (
    <DashboardLayout title="Duty Estimator">
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
          <div className="bg-primary/5 p-6 border-b border-border">
            <h1 className="text-xl font-bold font-headline text-foreground flex items-center gap-3">
              <Calculator className="w-6 h-6 text-primary" /> FBR Duty & Tax Calculator
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Calculate customs duties, additional taxes, and total landed cost based on current PCT tariff.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 space-y-8 border-r border-border bg-white">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">HS Code / Product</label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                    <input 
                      value={inputs.hsCode} 
                      onChange={e => updateInput("hsCode", e.target.value)} 
                      className="w-full pl-10 pr-4 py-3 bg-muted/20 border border-border rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">CIF Value</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input 
                      type="number" 
                      value={inputs.cifValue} 
                      onChange={e => updateInput("cifValue", parseFloat(e.target.value) || 0)} 
                      className="w-full pl-10 pr-4 py-3 bg-muted/20 border border-border rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Currency</label>
                  <select 
                    value={inputs.currency} 
                    onChange={e => updateInput("currency", e.target.value)} 
                    className="w-full px-4 py-3 bg-muted/20 border border-border rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  >
                    {["USD", "EUR", "GBP", "CNY", "AED"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Exchange Rate (1 {inputs.currency} = PKR)</label>
                  <input 
                    type="number" 
                    value={inputs.exchangeRate} 
                    onChange={e => updateInput("exchangeRate", parseFloat(e.target.value) || 0)} 
                    className="w-full px-4 py-3 bg-muted/20 border border-border rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Tariff Percentages (%)</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { label: "CD", key: "customsDuty" },
                    { label: "ACD", key: "additionalDuty" },
                    { label: "RD", key: "regulatoryDuty" },
                    { label: "ST", key: "salesTax" },
                    { label: "IT", key: "incomeTax" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1 block">{f.label}</label>
                      <input 
                        type="number" 
                        step="0.1" 
                        value={(inputs as any)[f.key]} 
                        onChange={e => updateInput(f.key, parseFloat(e.target.value) || 0)} 
                        className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 bg-muted/10 space-y-6">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center py-20">
                  <RefreshCw className="w-10 h-10 text-primary animate-spin mb-4" />
                  <p className="font-bold text-muted-foreground animate-pulse">Running assessment...</p>
                </div>
              ) : results ? (
                <>
                  <div className="bg-gradient-to-br from-primary to-blue-700 text-white rounded-2xl p-8 shadow-xl shadow-primary/20 relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-4 opacity-80">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Total Assessable Value</span>
                      </div>
                      <p className="text-4xl font-bold font-headline">{fmt(results.totalLandedCost)}</p>
                      <p className="text-xs font-medium opacity-80 mt-2">Landed Cost including all FBR levies</p>
                    </div>
                    <DollarSign className="absolute right-[-20px] bottom-[-20px] w-32 h-32 text-white opacity-10" />
                  </div>

                  <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                    <h2 className="font-bold font-headline text-sm uppercase tracking-widest text-muted-foreground mb-4">Detailed Breakdown</h2>
                    <div className="space-y-4">
                      {[
                        { label: "CIF Value (PKR)", val: results.cifPkr, bold: true },
                        { label: `Customs Duty (${inputs.customsDuty}%)`, val: results.cd },
                        { label: `Additional Duty (${inputs.additionalDuty}%)`, val: results.ad },
                        { label: `Regulatory Duty (${inputs.regulatoryDuty}%)`, val: results.rd },
                        { label: `Sales Tax (${inputs.salesTax}%)`, val: results.st },
                        { label: `Income Tax (${inputs.incomeTax}%)`, val: results.it },
                      ].map((item, i) => (
                        <div key={i} className={`flex justify-between items-center text-sm ${item.bold ? "pb-3 border-b border-border/50 font-bold" : "text-muted-foreground font-medium"}`}>
                          <span>{item.label}</span>
                          <span className="font-mono text-foreground">{fmt(item.val)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-4 border-t border-border mt-2">
                        <span className="font-black text-[10px] uppercase tracking-widest text-primary">Total Duties & Taxes</span>
                        <span className="font-mono font-black text-lg text-primary">{fmt(results.totalDuties)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3 shadow-sm">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                    <p className="text-[10px] text-amber-900 font-bold leading-relaxed uppercase tracking-tighter">
                      INDICATIVE ONLY. FINAL ASSESSMENT SUBJECT TO CUSTOMS VALUATION (SRO 2026), EXEMPTIONS, AND PHYSICAL INSPECTION AT PORT.
                    </p>
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center py-20 text-center opacity-40">
                  <Calculator className="w-16 h-16 mb-4" />
                  <p className="font-bold">Enter values to generate assessment</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DutyCalculator;
