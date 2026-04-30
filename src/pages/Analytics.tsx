import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Download, FileSpreadsheet, FileText, Filter, Calendar } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { toast } from "sonner";

const shipmentVolume = [
  { month: "Nov", imports: 18, exports: 22 },
  { month: "Dec", imports: 24, exports: 28 },
  { month: "Jan", imports: 32, exports: 26 },
  { month: "Feb", imports: 28, exports: 31 },
  { month: "Mar", imports: 36, exports: 34 },
  { month: "Apr", imports: 42, exports: 38 },
];

const topRoutes = [
  { route: "Shanghai → Karachi", volume: 142, value: "$2.4M" },
  { route: "Hamburg → Karachi", volume: 86, value: "$1.8M" },
  { route: "Karachi → Dubai", volume: 124, value: "$1.6M" },
  { route: "Karachi → Jeddah", volume: 78, value: "$980K" },
  { route: "Mumbai → Karachi", volume: 64, value: "$720K" },
];

const productCategories = [
  { name: "Electronics", value: 32, color: "hsl(217, 91%, 60%)" },
  { name: "Textiles", value: 24, color: "hsl(173, 80%, 40%)" },
  { name: "Machinery", value: 18, color: "hsl(43, 96%, 56%)" },
  { name: "Steel", value: 14, color: "hsl(280, 70%, 60%)" },
  { name: "Food", value: 12, color: "hsl(160, 84%, 39%)" },
];

const onTimeData = [
  { month: "Nov", rate: 86 }, { month: "Dec", rate: 89 }, { month: "Jan", rate: 91 },
  { month: "Feb", rate: 88 }, { month: "Mar", rate: 93 }, { month: "Apr", rate: 95 },
];

const Analytics = () => {
  const [dateRange, setDateRange] = useState("Last 6 months");

  const exportReport = (format: string) => toast.success(`Analytics exported as ${format}`);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-headline">Analytics & Reporting</h1>
            <p className="text-sm text-muted-foreground mt-1">Operational insights, trade flows, and performance reports</p>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="bg-transparent outline-none">
                {["Last 6 months", "Last 30 days", "This quarter", "YTD", "Custom"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm">
              <Filter className="w-4 h-4" /> Filters
            </button>
            <div className="flex">
              <button onClick={() => exportReport("PDF")} className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-l-lg text-sm font-semibold border-r border-primary-foreground/20">
                <FileText className="w-4 h-4" /> PDF
              </button>
              <button onClick={() => exportReport("Excel")} className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-r-lg text-sm font-semibold">
                <FileSpreadsheet className="w-4 h-4" /> Excel
              </button>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Shipments", value: "294", sub: "+12% vs prior" },
            { label: "On-Time Delivery", value: "94.8%", sub: "+2.3 pts" },
            { label: "Avg Transit Days", value: "18.2", sub: "−1.4 days" },
            { label: "Trade Volume", value: "$8.4M", sub: "+22% YoY" },
          ].map(k => (
            <div key={k.label} className="bg-white rounded-xl border border-border p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{k.label}</p>
              <p className="text-2xl font-bold font-headline mt-2">{k.value}</p>
              <p className="text-xs text-emerald-600 font-semibold mt-1">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Shipment Volume + On-Time */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold font-headline">Shipment Volume</h2>
                <p className="text-xs text-muted-foreground">Imports vs Exports</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={shipmentVolume}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                <XAxis dataKey="month" stroke="hsl(220, 14%, 64%)" fontSize={12} />
                <YAxis stroke="hsl(220, 14%, 64%)" fontSize={12} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="imports" fill="hsl(217, 91%, 60%)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="exports" fill="hsl(173, 80%, 40%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="font-bold font-headline mb-1">On-Time Delivery Rate</h2>
            <p className="text-xs text-muted-foreground mb-4">Performance trend (%)</p>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={onTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                <XAxis dataKey="month" stroke="hsl(220, 14%, 64%)" fontSize={12} />
                <YAxis stroke="hsl(220, 14%, 64%)" fontSize={12} domain={[80, 100]} />
                <Tooltip formatter={(v: number) => `${v}%`} />
                <Line type="monotone" dataKey="rate" stroke="hsl(160, 84%, 39%)" strokeWidth={3} dot={{ r: 5, fill: "hsl(160, 84%, 39%)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Routes + Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-border">
            <div className="p-5 border-b border-border">
              <h2 className="font-bold font-headline">Top Trade Routes</h2>
              <p className="text-xs text-muted-foreground">Ranked by shipment volume</p>
            </div>
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground uppercase tracking-wider">
                <tr className="border-b border-border">
                  <th className="px-5 py-3 text-left font-semibold">Route</th>
                  <th className="px-5 py-3 text-right font-semibold">Shipments</th>
                  <th className="px-5 py-3 text-right font-semibold">Trade Value</th>
                  <th className="px-5 py-3 text-left font-semibold">Volume Share</th>
                </tr>
              </thead>
              <tbody>
                {topRoutes.map(r => {
                  const max = Math.max(...topRoutes.map(x => x.volume));
                  const pct = (r.volume / max) * 100;
                  return (
                    <tr key={r.route} className="border-b border-border last:border-0">
                      <td className="px-5 py-3 font-medium">{r.route}</td>
                      <td className="px-5 py-3 text-right font-mono">{r.volume}</td>
                      <td className="px-5 py-3 text-right font-mono font-semibold">{r.value}</td>
                      <td className="px-5 py-3">
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="font-bold font-headline mb-1">Product Categories</h2>
            <p className="text-xs text-muted-foreground mb-4">By trade volume</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={productCategories} dataKey="value" outerRadius={80}>
                  {productCategories.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {productCategories.map(e => (
                <div key={e.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm" style={{ background: e.color }} /><span>{e.name}</span></div>
                  <span className="font-semibold">{e.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Saved Reports */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold font-headline">Saved Reports</h2>
              <p className="text-xs text-muted-foreground">Scheduled and ad-hoc reports</p>
            </div>
            <button className="text-sm text-primary font-semibold hover:underline">+ New Report</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { name: "Monthly Trade Summary", schedule: "1st of month", last: "Apr 1" },
              { name: "Top 10 Suppliers", schedule: "Weekly", last: "Apr 28" },
              { name: "Customs Duty Analysis", schedule: "Monthly", last: "Apr 1" },
              { name: "Aged Receivables", schedule: "Bi-weekly", last: "Apr 15" },
              { name: "Vessel Performance", schedule: "Monthly", last: "Apr 1" },
              { name: "FBR Compliance Audit", schedule: "Quarterly", last: "Apr 1" },
            ].map(r => (
              <div key={r.name} className="border border-border rounded-lg p-4 hover:border-primary transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-sm">{r.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{r.schedule} · last sent {r.last}</p>
                  </div>
                  <button onClick={() => exportReport(r.name)} className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-primary">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
