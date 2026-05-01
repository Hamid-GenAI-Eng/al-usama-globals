import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { TrendingUp, TrendingDown, RefreshCw, Plus, Download, Edit2, Calculator } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { toast } from "sonner";
import api from "@/lib/api";

const ExchangeRates = () => {
  const [rates, setRates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [convertFrom, setConvertFrom] = useState("USD");
  const [convertTo, setConvertTo] = useState("PKR");
  const [amount, setAmount] = useState(1000);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const response = await api.get("/finance/rates");
      setRates(response.data.data);
    } catch (error) {
      console.error("Failed to fetch rates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const fromRate = rates.find(r => r.currencyCode === convertFrom)?.rateToPkr || 1;
  const toRate = convertTo === "PKR" ? 1 : rates.find(r => r.currencyCode === convertTo)?.rateToPkr || 1;
  const result = (amount * fromRate) / toRate;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-20 text-center flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-bold text-lg animate-pulse">Syncing SBP Rates...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Exchange Rates">
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-sm text-muted-foreground">Live PKR conversion rates for multi-currency orders. Auto-synced from global trade feeds.</p>
          <div className="flex gap-2">
            <button onClick={fetchRates} className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors">
              <RefreshCw className="w-4 h-4" /> Sync now
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-all">
              <Plus className="w-4 h-4" /> Add currency
            </button>
          </div>
        </div>

        {/* Top stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Base Currency</p>
            <p className="text-3xl font-bold font-headline mt-1">PKR <span className="text-xs text-muted-foreground font-normal">Pakistani Rupee</span></p>
          </div>
          <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Market Status</p>
            <p className="text-3xl font-bold font-headline mt-1">LIVE</p>
            <p className="text-[10px] text-emerald-600 mt-1 font-bold">● Operational</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Tracked Currencies</p>
            <p className="text-3xl font-bold font-headline mt-1">{rates.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Rate list */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-border overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-border bg-muted/10 flex items-center justify-between">
              <h3 className="font-bold font-headline text-sm">Currency Matrix (1 unit → PKR)</h3>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-muted/30 border-b border-border">
                <tr className="text-left text-[10px] uppercase text-muted-foreground">
                  <th className="px-6 py-4 font-bold tracking-widest">Currency</th>
                  <th className="px-6 py-4 font-bold tracking-widest text-right">Rate (PKR)</th>
                  <th className="px-6 py-4 font-bold tracking-widest">Source</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {rates.map(r => (
                  <tr key={r.currencyCode} className="hover:bg-muted/20 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                          {r.currencyCode}
                        </div>
                        <p className="font-bold text-foreground">{r.currencyCode}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-foreground">{r.rateToPkr.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase">
                        {r.source}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 hover:bg-muted rounded text-muted-foreground transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Converter */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="w-5 h-5 text-primary" />
                <h3 className="font-bold font-headline">Forex Calculator</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Amount</label>
                  <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted/20 outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bold" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">From</label>
                    <select value={convertFrom} onChange={e => setConvertFrom(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white outline-none text-xs font-bold">
                      {rates.map(r => <option key={r.currencyCode}>{r.currencyCode}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">To</label>
                    <select value={convertTo} onChange={e => setConvertTo(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white outline-none text-xs font-bold">
                      <option>PKR</option>
                      {rates.map(r => <option key={r.currencyCode}>{r.currencyCode}</option>)}
                    </select>
                  </div>
                </div>
                <div className="pt-6 border-t border-border mt-4">
                  <p className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest">Conversion Result</p>
                  <p className="text-3xl font-bold font-headline mt-1.5 text-primary">
                    {result.toLocaleString(undefined, { maximumFractionDigits: 2 })} 
                    <span className="text-xs text-muted-foreground font-normal ml-2">{convertTo}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ExchangeRates;
