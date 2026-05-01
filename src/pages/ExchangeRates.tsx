import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { TrendingUp, TrendingDown, RefreshCw, Plus, Download, Edit2, Calculator } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { toast } from "sonner";

const rates = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸", rate: 278.45, change: +0.32, source: "SBP" },
  { code: "EUR", name: "Euro", flag: "🇪🇺", rate: 302.18, change: -0.45, source: "SBP" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧", rate: 351.20, change: +1.10, source: "SBP" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪", rate: 75.82, change: +0.08, source: "SBP" },
  { code: "SAR", name: "Saudi Riyal", flag: "🇸🇦", rate: 74.25, change: 0.00, source: "SBP" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳", rate: 38.42, change: -0.12, source: "SBP" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵", rate: 1.84, change: +0.02, source: "SBP" },
  { code: "TRY", name: "Turkish Lira", flag: "🇹🇷", rate: 8.20, change: -0.18, source: "Manual" },
];

const usdHistory = [
  { d: "Apr 24", r: 277.10 }, { d: "Apr 25", r: 277.55 }, { d: "Apr 26", r: 278.02 },
  { d: "Apr 27", r: 277.88 }, { d: "Apr 28", r: 278.13 }, { d: "Apr 29", r: 278.13 }, { d: "Apr 30", r: 278.45 },
];

const ExchangeRates = () => {
  const [convertFrom, setConvertFrom] = useState("USD");
  const [convertTo, setConvertTo] = useState("PKR");
  const [amount, setAmount] = useState(1000);

  const fromRate = rates.find(r => r.code === convertFrom)?.rate || 1;
  const toRate = convertTo === "PKR" ? 1 : rates.find(r => r.code === convertTo)?.rate || 1;
  const result = (amount * fromRate) / toRate;

  return (
    <DashboardLayout title="Exchange Rates">
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-sm text-muted-foreground">Live PKR conversion rates for multi-currency orders. Auto-synced from State Bank of Pakistan every 30 minutes.</p>
          <div className="flex gap-2">
            <button onClick={() => toast.success("Rates synced from SBP")} className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-semibold"><RefreshCw className="w-4 h-4" /> Sync now</button>
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-semibold"><Download className="w-4 h-4" /> Export</button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold"><Plus className="w-4 h-4" /> Add currency</button>
          </div>
        </div>

        {/* Top stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-border p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Base Currency</p>
            <p className="text-3xl font-bold font-headline mt-2">PKR <span className="text-base text-muted-foreground">Pakistani Rupee</span></p>
            <p className="text-xs text-muted-foreground mt-1">All conversions referenced to PKR</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Last Sync</p>
            <p className="text-3xl font-bold font-headline mt-2">2 min ago</p>
            <p className="text-xs text-emerald-600 mt-1 font-semibold">● Live from SBP</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Active Currencies</p>
            <p className="text-3xl font-bold font-headline mt-2">{rates.length}</p>
            <p className="text-xs text-muted-foreground mt-1">In use across orders & invoices</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Rate list */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h3 className="font-bold font-headline">Current Rates (1 unit → PKR)</h3>
              <span className="text-xs text-muted-foreground">Updated 2 min ago</span>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr className="text-left text-xs uppercase text-muted-foreground">
                  <th className="px-6 py-3 font-bold">Currency</th>
                  <th className="px-6 py-3 font-bold text-right">Rate (PKR)</th>
                  <th className="px-6 py-3 font-bold text-right">24h Change</th>
                  <th className="px-6 py-3 font-bold">Source</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rates.map(r => (
                  <tr key={r.code} className="hover:bg-muted/30 transition">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{r.flag}</span>
                        <div>
                          <p className="font-bold">{r.code}</p>
                          <p className="text-xs text-muted-foreground">{r.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono font-bold">{r.rate.toFixed(2)}</td>
                    <td className="px-6 py-3.5 text-right">
                      <span className={`inline-flex items-center gap-1 text-xs font-bold ${r.change > 0 ? "text-emerald-600" : r.change < 0 ? "text-rose-600" : "text-muted-foreground"}`}>
                        {r.change > 0 ? <TrendingUp className="w-3 h-3" /> : r.change < 0 ? <TrendingDown className="w-3 h-3" /> : null}
                        {r.change > 0 ? "+" : ""}{r.change.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-3.5"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${r.source === "SBP" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{r.source}</span></td>
                    <td className="px-6 py-3.5 text-right"><button className="text-muted-foreground hover:text-primary"><Edit2 className="w-4 h-4" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Converter + chart */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-4 h-4 text-primary" />
                <h3 className="font-bold font-headline">Quick Converter</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Amount</label>
                  <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-primary/30 text-sm font-bold" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">From</label>
                    <select value={convertFrom} onChange={e => setConvertFrom(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background outline-none text-sm">
                      {rates.map(r => <option key={r.code}>{r.code}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">To</label>
                    <select value={convertTo} onChange={e => setConvertTo(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background outline-none text-sm">
                      <option>PKR</option>
                      {rates.map(r => <option key={r.code}>{r.code}</option>)}
                    </select>
                  </div>
                </div>
                <div className="pt-3 border-t border-border">
                  <p className="text-xs uppercase text-muted-foreground font-bold">Result</p>
                  <p className="text-2xl font-bold font-headline mt-1">{result.toLocaleString(undefined, { maximumFractionDigits: 2 })} <span className="text-sm text-muted-foreground">{convertTo}</span></p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-border p-6">
              <h3 className="font-bold font-headline">USD → PKR (7d)</h3>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={usdHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="d" tick={{ fontSize: 11 }} />
                  <YAxis domain={["auto", "auto"]} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="r" stroke="hsl(220 100% 40%)" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ExchangeRates;
