import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { FileText, Download, FileSpreadsheet, Calendar, Filter, Ship, Users, DollarSign, Package, ShieldCheck, TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

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

const Reports = () => {
  const [selected, setSelected] = useState("shipment-summary");
  const [from, setFrom] = useState("2026-04-01");
  const [to, setTo] = useState("2026-04-30");
  const [format, setFormat] = useState("PDF");
  const [grouping, setGrouping] = useState("None");
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await api.get("/reports/summary");
        setSummary(response.data.data);
      } catch (error) {
        console.error("Failed to fetch summary:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const tpl = templates.find(t => t.id === selected)!;

  const generate = () => {
    toast.success(`Generating ${tpl.name} as ${format}...`);
    setTimeout(() => toast.success("Report ready in Recent Reports"), 1200);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-20 text-center flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-bold text-lg animate-pulse">Aggregating Global Trade Data...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Reports">
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">Configure operational, financial, and compliance reports — export instantly to PDF or Excel.</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Active Shipments", value: summary?.shipments?.active || 0, icon: Ship, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Total Revenue", value: `$${(summary?.finance?.revenue || 0).toLocaleString()}`, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "FBR Compliance", value: `${summary?.customs?.compliance || 0}%`, icon: ShieldCheck, color: "text-violet-600", bg: "bg-violet-50" },
            { label: "Reports Generated", value: summary?.reportsCount || 12, icon: FileText, color: "text-amber-600", bg: "bg-amber-50" },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-xl border border-border/50 p-4 shadow-sm flex items-center gap-3`}>
              <div className="p-2.5 rounded-lg bg-white shadow-sm"><s.icon className={`w-4 h-4 ${s.color}`} /></div>
              <div>
                <p className={`text-xl font-bold font-headline ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Templates */}
        <div>
          <h3 className="font-bold font-headline mb-3 text-sm uppercase tracking-widest text-muted-foreground">Report Library</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {templates.map(t => (
              <button key={t.id} onClick={() => setSelected(t.id)} className={`text-left p-4 rounded-xl border-2 transition ${selected === t.id ? "border-primary bg-primary/5 ring-4 ring-primary/5" : "border-border bg-white hover:border-primary/40 shadow-sm"}`}>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${t.color} flex items-center justify-center mb-3 shadow-md`}>
                  <t.icon className="w-5 h-5 text-white" />
                </div>
                <p className="font-bold text-sm text-foreground">{t.name}</p>
                <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{t.desc}</p>
                <span className="inline-block mt-3 text-[9px] uppercase tracking-widest font-black px-2 py-0.5 rounded bg-muted text-muted-foreground">{t.category}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configurator */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-border p-6 space-y-6 shadow-sm">
            <div className="flex items-center gap-4 pb-5 border-b border-border/50">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tpl.color} flex items-center justify-center shadow-lg`}>
                <tpl.icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="font-bold font-headline text-xl text-foreground">{tpl.name}</h2>
                <p className="text-sm text-muted-foreground font-medium">{tpl.desc}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2"><Calendar className="w-3 h-3" /> Start Date</label>
                <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/20 outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2"><Calendar className="w-3 h-3" /> End Date</label>
                <input type="date" value={to} onChange={e => setTo(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/20 outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Base Currency</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/20 outline-none text-sm font-medium"><option>PKR (FBR Standard)</option><option>USD</option><option>EUR</option></select>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Data Grouping</label>
                <select value={grouping} onChange={e => setGrouping(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/20 outline-none text-sm font-medium transition-all">
                  <option>None</option><option>Origin Country</option><option>Shipment Status</option><option>HS Code Category</option><option>Supplier</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2"><Filter className="w-3 h-3" /> Report Scope</label>
              <div className="flex flex-wrap gap-2">
                {["All Terminals", "Verified Suppliers Only", "Active Shipments", "Customs Cleared"].map(f => (
                  <button key={f} className="px-4 py-2 rounded-lg border border-border text-[11px] font-bold text-muted-foreground hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all">
                    {f} ▾
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">Export File Type</label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: "PDF", icon: FileText, desc: "Secure, Print-Ready Document", color: "text-rose-600", bg: "bg-rose-50" },
                  { id: "XLSX", icon: FileSpreadsheet, desc: "Dynamic Analytical Workbook", color: "text-emerald-600", bg: "bg-emerald-50" },
                ].map(f => (
                  <button key={f.id} onClick={() => setFormat(f.id)} className={`p-4 rounded-xl border-2 text-left transition-all ${format === f.id ? "border-primary bg-primary/5 ring-4 ring-primary/5" : "border-border hover:border-primary/20 shadow-sm"}`}>
                    <div className={`w-10 h-10 rounded-lg ${f.bg} flex items-center justify-center mb-3`}>
                      <f.icon className={`w-5 h-5 ${f.color}`} />
                    </div>
                    <p className="font-bold text-sm text-foreground">{f.id === "PDF" ? "Adobe PDF" : "Microsoft Excel"}</p>
                    <p className="text-[10px] text-muted-foreground font-medium mt-1">{f.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-border/50">
              <button className="px-5 py-3 border border-border rounded-xl text-xs font-bold text-muted-foreground hover:bg-muted transition-all">Schedule Automation</button>
              <button onClick={generate} className="px-8 py-3 bg-primary text-primary-foreground rounded-xl text-xs font-bold flex items-center gap-3 hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                <Download className="w-4 h-4" /> Generate Report
              </button>
            </div>
          </div>

          {/* Recent Archives */}
          <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-border bg-muted/10 flex items-center justify-between">
              <h3 className="font-bold font-headline text-sm uppercase tracking-widest text-muted-foreground">Report Archive</h3>
              <Clock className="w-4 h-4 text-muted-foreground opacity-50" />
            </div>
            <div className="divide-y divide-border/50 max-h-[600px] overflow-y-auto">
              {[
                { name: "Q1 Trade Analysis", format: "PDF", size: "2.4 MB", at: "2h ago", by: "Usama" },
                { name: "Customs Duty Log - April", format: "XLSX", size: "1.2 MB", at: "5h ago", by: "Bilal" },
                { name: "Supplier Matrix 2026", format: "PDF", size: "840 KB", at: "Yesterday", by: "Usama" },
                { name: "Financial Audit Trail", format: "XLSX", size: "4.1 MB", at: "2 days ago", by: "Hamza" },
              ].map((r, i) => (
                <div key={i} className="px-5 py-5 flex items-start gap-4 hover:bg-muted/20 transition-all group cursor-pointer">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${r.format === "PDF" ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"}`}>
                    {r.format === "PDF" ? <FileText className="w-5 h-5" /> : <FileSpreadsheet className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate text-foreground group-hover:text-primary transition-colors">{r.name}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[9px] font-black uppercase tracking-tighter text-muted-foreground/60">{r.format}</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="text-[10px] font-bold text-muted-foreground">{r.size}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-2 font-medium flex items-center gap-1.5 opacity-60">
                      <Users className="w-3 h-3" /> {r.by} · {r.at}
                    </p>
                  </div>
                  <button className="p-2 hover:bg-primary/10 rounded-lg text-primary opacity-0 group-hover:opacity-100 transition-all shadow-sm">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 border-t border-border bg-muted/30 flex items-center gap-3 text-[10px] font-bold text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>STABLE STORAGE · 18 MB AVAILABLE</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
