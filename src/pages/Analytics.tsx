import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Download, FileSpreadsheet, FileText, Filter, Calendar, TrendingUp, Ship, Clock, DollarSign } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { toast } from "sonner";
import api from "@/lib/api";

const shipmentVolume = [
  { month: "Nov", imports: 18, exports: 22 },
  { month: "Dec", imports: 24, exports: 28 },
  { month: "Jan", imports: 32, exports: 26 },
  { month: "Feb", imports: 28, exports: 31 },
  { month: "Mar", imports: 36, exports: 34 },
  { month: "Apr", imports: 42, exports: 38 },
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
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await api.get("/reports/summary");
        setSummary(response.data.data);
      } catch (error) {
        console.error("Failed to fetch analytics summary:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const exportReport = (format: string) => toast.success(`Analytics exported as ${format}`);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-20 text-center flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-bold text-lg animate-pulse">Processing Global Trade Intelligence...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold font-headline">Analytics & Trade Intelligence</h1>
            <p className="text-sm text-muted-foreground mt-1">Operational insights, trade flows, and performance reports</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-2 border border-border bg-white rounded-lg text-sm shadow-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="bg-transparent outline-none font-medium">
                {["Last 6 months", "Last 30 days", "This quarter", "YTD", "Custom"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-border bg-white rounded-lg text-sm font-medium shadow-sm">
              <Filter className="w-4 h-4" /> Filters
            </button>
            <div className="flex shadow-sm">
              <button onClick={() => exportReport("PDF")} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-l-lg text-sm font-bold border-r border-primary-foreground/20 hover:opacity-90">
                <FileText className="w-4 h-4" /> PDF
              </button>
              <button onClick={() => exportReport("Excel")} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-r-lg text-sm font-bold hover:opacity-90">
                <FileSpreadsheet className="w-4 h-4" /> Excel
              </button>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Shipments", value: summary?.shipments?.total || 0, icon: Ship, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "On-Time Delivery", value: `${summary?.customs?.compliance || 94}%`, icon: Clock, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Active Orders", value: summary?.orders?.active || 0, icon: TrendingUp, color: "text-violet-600", bg: "bg-violet-50" },
            { label: "Trade Volume", value: `$${((summary?.finance?.revenue || 0) / 1000000).toFixed(1)}M`, icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50" },
          ].map(k => (
            <div key={k.label} className={`${k.bg} rounded-2xl border border-border/50 p-5 shadow-sm`}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">{k.label}</p>
                <k.icon className={`w-4 h-4 ${k.color} opacity-40`} />
              </div>
              <p className={`text-2xl font-bold font-headline ${k.color}`}>{k.value}</p>
              <p className="text-[10px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +12% from last period
              </p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-bold font-headline text-lg">Shipment Volume</h2>
                <p className="text-xs text-muted-foreground font-medium">Imports vs Exports Trend</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={shipmentVolume}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" vertical={false} />
                <XAxis dataKey="month" stroke="hsl(220, 14%, 64%)" fontSize={10} fontWeight={700} axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="hsl(220, 14%, 64%)" fontSize={10} fontWeight={700} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: 'hsl(210, 40%, 98%)' }}
                />
                <Legend wrapperStyle={{ fontSize: 10, fontWeight: 700, paddingTop: 20 }} />
                <Bar dataKey="imports" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="exports" fill="hsl(173, 80%, 40%)" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
            <h2 className="font-bold font-headline text-lg mb-1">On-Time Performance</h2>
            <p className="text-xs text-muted-foreground font-medium mb-6">Global supply chain reliability</p>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={onTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" vertical={false} />
                <XAxis dataKey="month" stroke="hsl(220, 14%, 64%)" fontSize={10} fontWeight={700} axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="hsl(220, 14%, 64%)" fontSize={10} fontWeight={700} axisLine={false} tickLine={false} domain={[80, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(v: number) => [`${v}%`, 'On-Time']}
                />
                <Line type="monotone" dataKey="rate" stroke="hsl(160, 84%, 39%)" strokeWidth={4} dot={{ r: 6, fill: "hsl(160, 84%, 39%)", strokeWidth: 3, stroke: "#fff" }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories + Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/10">
              <h2 className="font-bold font-headline text-sm uppercase tracking-widest text-muted-foreground">Top Trade Routes</h2>
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <table className="w-full text-sm">
              <thead className="text-[10px] text-muted-foreground uppercase tracking-widest font-black bg-muted/5">
                <tr>
                  <th className="px-6 py-4 text-left">Route</th>
                  <th className="px-6 py-4 text-right">Shipments</th>
                  <th className="px-6 py-4 text-right">Trade Value</th>
                  <th className="px-6 py-4 text-left">Volume Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {[
                  { route: "Shanghai → Karachi", volume: 142, value: "$2.4M" },
                  { route: "Hamburg → Karachi", volume: 86, value: "$1.8M" },
                  { route: "Karachi → Dubai", volume: 124, value: "$1.6M" },
                  { route: "Karachi → Jeddah", volume: 78, value: "$980K" },
                ].map(r => {
                  const pct = (r.volume / 142) * 100;
                  return (
                    <tr key={r.route} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4 font-bold text-foreground">{r.route}</td>
                      <td className="px-6 py-4 text-right font-mono font-bold">{r.volume}</td>
                      <td className="px-6 py-4 text-right font-mono font-black text-primary">{r.value}</td>
                      <td className="px-6 py-4">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden shadow-inner">
                          <div className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
            <h2 className="font-bold font-headline text-sm uppercase tracking-widest text-muted-foreground mb-6">Product Categories</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={productCategories} dataKey="value" outerRadius={90} innerRadius={60} paddingAngle={5}>
                  {productCategories.map((e, i) => <Cell key={i} fill={e.color} stroke="none" />)}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(v: number) => `${v}%`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 mt-6">
              {productCategories.map(e => (
                <div key={e.name} className="flex items-center justify-between text-[11px] font-bold">
                  <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full" style={{ background: e.color }} /> <span className="text-muted-foreground uppercase">{e.name}</span></div>
                  <span className="text-foreground">{e.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
