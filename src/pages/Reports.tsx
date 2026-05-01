import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { FileText, Download, FileSpreadsheet, Calendar, Filter, Ship, Users, DollarSign, Package, ShieldCheck, TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const templates = [
  { id: "shipment-summary", name: "Shipment Summary", desc: "All shipments with status, route, value", icon: Ship, color: "from-blue-500 to-blue-600", category: "Operations" },
  { id: "trade-volume", name: "Trade Volume by Country", desc: "Imports & exports broken down by country", icon: TrendingUp, color: "from-emerald-500 to-emerald-600", category: "Analytics" },
  { id: "supplier-perf", name: "Supplier Performance", desc: "Volume, on-time delivery, quality score", icon: Users, color: "from-violet-500 to-violet-600", category: "CRM" },
  { id: "buyer-perf", name: "Top Buyers", desc: "Revenue & orders by buyer", icon: Users, color: "from-pink-500 to-pink-600", category: "CRM" },
  { id: "profit-loss", name: "Profit & Loss Statement", desc: "Per-shipment P&L with all costs", icon: DollarSign, color: "from-amber-500 to-amber-600", category: "Finance" },
  { id: "outstanding", name: "Outstanding Payments", desc: "Receivables & payables aging", icon: Clock, color: "from-rose-500 to-rose-600", category: "Finance" },
  { id: "duty-paid", name: "Duty & Tax Paid", desc: "FBR duty, sales tax, income tax breakdown", icon: ShieldCheck, color: "from-teal-500 to-teal-600", category: "Customs" },
  { id: "inventory", name: "Inventory & HS Codes", desc: "Items moved by HS code & category", icon: Package, color: "from-indigo-500 to-indigo-600", category: "Operations" },
];

const recent = [
  { name: "Q1 2026 Trade Volume", format: "PDF", size: "1.4 MB", at: "2026-04-30 10:22", by: "Captain Usama" },
  { name: "April Supplier Performance", format: "XLSX", size: "284 KB", at: "2026-04-29 16:04", by: "Hamza Khan" },
  { name: "March P&L Statement", format: "PDF", size: "892 KB", at: "2026-04-28 09:11", by: "Captain Usama" },
  { name: "FBR Duty Summary — Mar", format: "XLSX", size: "412 KB", at: "2026-04-27 14:38", by: "Bilal Ahmed" },
];

const Reports = () => {
  const [selected, setSelected] = useState("shipment-summary");
  const [from, setFrom] = useState("2026-04-01");
  const [to, setTo] = useState("2026-04-30");
  const [format, setFormat] = useState("PDF");
  const [grouping, setGrouping] = useState("None");
  const tpl = templates.find(t => t.id === selected)!;

  const generate = () => {
    toast.success(`Generating ${tpl.name} as ${format}...`);
    setTimeout(() => toast.success("Report ready in Recent Reports"), 1200);
  };

  return (
    <DashboardLayout title="Reports">
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">Configure operational, financial, and compliance reports — export instantly to PDF or Excel.</p>

        {/* Templates */}
        <div>
          <h3 className="font-bold font-headline mb-3">Choose a report template</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {templates.map(t => (
              <button key={t.id} onClick={() => setSelected(t.id)} className={`text-left p-4 rounded-xl border-2 transition ${selected === t.id ? "border-primary bg-primary/5" : "border-border bg-white hover:border-primary/40"}`}>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${t.color} flex items-center justify-center mb-3`}>
                  <t.icon className="w-5 h-5 text-white" />
                </div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{t.desc}</p>
                <span className="inline-block mt-2 text-[10px] uppercase tracking-wider font-bold text-muted-foreground">{t.category}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configurator */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-border p-6 space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tpl.color} flex items-center justify-center`}>
                <tpl.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold font-headline text-lg">{tpl.name}</h2>
                <p className="text-xs text-muted-foreground">{tpl.desc}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> From</label>
                <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> To</label>
                <input type="date" value={to} onChange={e => setTo(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Currency</label>
                <select className="w-full px-3 py-2 rounded-lg border border-border bg-background outline-none text-sm"><option>PKR (default)</option><option>USD</option><option>EUR</option></select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Group by</label>
                <select value={grouping} onChange={e => setGrouping(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background outline-none text-sm">
                  <option>None</option><option>Country</option><option>Status</option><option>Month</option><option>Supplier</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5"><Filter className="w-3.5 h-3.5" /> Filters</label>
              <div className="flex flex-wrap gap-2">
                {["All statuses", "All countries", "All agents", "All carriers"].map(f => (
                  <button key={f} className="px-3 py-1.5 rounded-full border border-border text-xs font-semibold hover:bg-muted">{f} ▾</button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Output format</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "PDF", icon: FileText, desc: "Formatted, ready to print" },
                  { id: "XLSX", icon: FileSpreadsheet, desc: "Editable spreadsheet" },
                ].map(f => (
                  <button key={f.id} onClick={() => setFormat(f.id)} className={`p-4 rounded-xl border-2 text-left transition ${format === f.id ? "border-primary bg-primary/5" : "border-border"}`}>
                    <f.icon className={`w-6 h-6 mb-2 ${format === f.id ? "text-primary" : "text-muted-foreground"}`} />
                    <p className="font-semibold text-sm">{f.id === "PDF" ? "PDF Document" : "Excel Spreadsheet"}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <button className="px-4 py-2.5 border border-border rounded-lg text-sm font-semibold">Schedule</button>
              <button onClick={generate} className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold flex items-center gap-2"><Download className="w-4 h-4" /> Generate Report</button>
            </div>
          </div>

          {/* Recent */}
          <div className="bg-white rounded-xl border border-border">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="font-bold font-headline">Recent Reports</h3>
            </div>
            <div className="divide-y divide-border">
              {recent.map((r, i) => (
                <div key={i} className="px-5 py-4 flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${r.format === "PDF" ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"}`}>
                    {r.format === "PDF" ? <FileText className="w-4 h-4" /> : <FileSpreadsheet className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{r.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{r.format} · {r.size} · by {r.by}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{r.at}</p>
                  </div>
                  <button className="text-primary"><Download className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-border bg-muted/30 flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 4 reports stored · 12 MB used
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
