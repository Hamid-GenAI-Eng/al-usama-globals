import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Ship, FileText, DollarSign, AlertTriangle, TrendingUp, TrendingDown, ArrowRight, Package, CheckCircle2, Clock, Users, Activity } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [recentShipments, setRecentShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await api.get("/analytics/summary");
        setStats(response.data.data.stats);
        setRecentShipments(response.data.data.recentShipments);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const kpis = [
    { label: "Active Shipments", value: stats?.activeShipments || "0", delta: "+8", trend: "up", icon: Ship, color: "from-blue-500 to-blue-600" },
    { label: "Total Orders", value: stats?.totalOrders || "0", delta: "-3", trend: "down", icon: FileText, color: "from-violet-500 to-violet-600" },
    { label: "Revenue (MTD)", value: `PKR ${(stats?.totalRevenue / 1000000 || 0).toFixed(1)}M`, delta: "+12.5%", trend: "up", icon: DollarSign, color: "from-emerald-500 to-emerald-600" },
    { label: "Total Shipments", value: stats?.totalShipments || "0", delta: "+2", trend: "up", icon: AlertTriangle, color: "from-amber-500 to-amber-600" },
  ];

  const volumeData = [
    { m: "Jan", import: 32, export: 28 }, { m: "Feb", import: 38, export: 31 },
    { m: "Mar", import: 41, export: 35 }, { m: "Apr", import: 45, export: 38 },
    { m: "May", import: 52, export: 44 }, { m: "Jun", import: 47, export: 41 },
  ];

  const tasks = [
    { label: "Approve GD KAPE-441230", due: "Today", priority: "high" },
    { label: "Upload BL for SHP-2026-1842", due: "Tomorrow", priority: "med" },
    { label: "Review PO-2026-0241 line items", due: "Apr 28", priority: "med" },
    { label: "Pay duty for SHP-2026-1839", due: "Apr 29", priority: "low" },
  ];

  const activity = [
    { who: "Bilal Ahmed", what: "uploaded Bill of Lading", target: "SHP-2026-1842", time: "5m ago", icon: FileText },
    { who: "System", what: "cleared customs for", target: "SHP-2026-1840", time: "1h ago", icon: CheckCircle2 },
    { who: "Hamza Khan", what: "created Purchase Order", target: "PO-2026-0241", time: "3h ago", icon: Package },
    { who: "Captain Usama", what: "invited new user", target: "ahmed@al-usama.com", time: "Yesterday", icon: Users },
  ];
  return (
    <DashboardLayout title="Dashboard" showSearch>
      <div className="space-y-6">
        {/* Hero */}
        <div className="rounded-2xl gradient-primary text-primary-foreground p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">Welcome back, {JSON.parse(localStorage.getItem("user") || '{"fullName":"User"}').fullName}</p>
            <h2 className="text-2xl md:text-3xl font-headline font-extrabold mt-1">Your trade desk is moving fast today.</h2>
            <p className="text-sm opacity-90 mt-2">8 new shipments dispatched, 3 customs declarations awaiting your approval.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/shipments/create" className="px-5 py-2.5 rounded-full bg-white text-primary font-semibold text-sm hover:opacity-90 transition flex items-center gap-2">New Shipment <ArrowRight className="w-4 h-4" /></Link>
            <Link to="/documents/upload" className="px-5 py-2.5 rounded-full bg-white/15 backdrop-blur text-white font-semibold text-sm hover:bg-white/25 transition border border-white/20">Upload Doc</Link>
          </div>
        </div>

        {/* KPI grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-border p-5 animate-fade-in">
                <div className="flex items-start justify-between">
                  <Skeleton className="w-11 h-11 rounded-xl" />
                  <Skeleton className="w-10 h-4" />
                </div>
                <Skeleton className="h-7 w-24 mt-4" />
                <Skeleton className="h-3 w-20 mt-2" />
              </div>
            ))
          ) : (
            kpis.map(k => (
              <div key={k.label} className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${k.color} flex items-center justify-center`}>
                    <k.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className={`flex items-center gap-1 text-xs font-bold ${k.trend === "up" ? "text-emerald-600" : "text-rose-600"}`}>
                    {k.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {k.delta}
                  </span>
                </div>
                <p className="text-2xl font-bold font-headline mt-4">{k.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{k.label}</p>
              </div>
            ))
          )}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold font-headline">Shipment Volume</h3>
                <p className="text-xs text-muted-foreground">Last 6 months</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Imports</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Exports</span>
              </div>
            </div>
            {loading ? (
              <div className="h-[240px] flex items-end gap-2 pt-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton key={i} className="flex-1" style={{ height: `${40 + ((i * 13) % 50)}%` }} />
                ))}
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={volumeData}>
                  <defs>
                    <linearGradient id="impG" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} /><stop offset="100%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
                    <linearGradient id="expG" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity={0.4} /><stop offset="100%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="m" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="import" stroke="#3b82f6" fill="url(#impG)" strokeWidth={2} />
                  <Area type="monotone" dataKey="export" stroke="#10b981" fill="url(#expG)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="font-bold font-headline">Pending Tasks</h3>
            <p className="text-xs text-muted-foreground mb-4">Your inbox</p>
            <div className="space-y-3">
              {tasks.map(t => (
                <div key={t.label} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition">
                  <span className={`mt-1 w-2 h-2 rounded-full ${t.priority === "high" ? "bg-rose-500" : t.priority === "med" ? "bg-amber-500" : "bg-slate-400"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{t.label}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" /> {t.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-border">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="font-bold font-headline">Recent Shipments</h3>
              <Link to="/shipments" className="text-sm text-primary font-semibold flex items-center gap-1">View all <ArrowRight className="w-3.5 h-3.5" /></Link>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr className="text-left text-xs uppercase text-muted-foreground">
                  <th className="px-6 py-3 font-bold">Shipment</th>
                  <th className="px-6 py-3 font-bold">Route</th>
                  <th className="px-6 py-3 font-bold">Status</th>
                  <th className="px-6 py-3 font-bold">ETA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-28" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-40" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-5 w-20 rounded-full" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                    </tr>
                  ))
                ) : (
                  recentShipments.map(s => (
                    <tr key={s.id} className="hover:bg-muted/30 transition">
                      <td className="px-6 py-4 font-semibold">
                        <Link to={`/shipments/${s.id}`} className="text-primary hover:underline">{s.shipmentId}</Link>
                      </td>
                      <td className="px-6 py-4">{s.origin} → {s.destination}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          s.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-700' : 
                          s.status === 'IN_TRANSIT' ? 'bg-blue-100 text-blue-700' : 
                          'bg-amber-100 text-amber-700'
                        }`}>{s.status}</span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{s.arrivalDate ? new Date(s.arrivalDate).toLocaleDateString() : '—'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-primary" />
              <h3 className="font-bold font-headline">Recent Activity</h3>
            </div>
            <div className="space-y-4">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="w-8 h-8 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                ))
              ) : (
                activity.map((a, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <a.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0 text-sm">
                      <p><span className="font-semibold">{a.who}</span> <span className="text-muted-foreground">{a.what}</span> <span className="font-semibold">{a.target}</span></p>
                      <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
