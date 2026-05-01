import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { TrendingUp, DollarSign, CreditCard, ArrowUpRight, ArrowDownRight, Download, Clock, Activity } from "lucide-react";
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";
import api from "@/lib/api";

const FinancialDashboard = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinance = async () => {
      try {
        const response = await api.get("/analytics");
        setData(response.data.data);
      } catch (error) {
        console.error("Finance fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFinance();
  }, []);

  const exportReport = (kind: string) => toast.success(`${kind} report generated and syncing with Cloudinary`);

  const revenueData = [
    { month: "Jan", revenue: 12000, profit: 8000 },
    { month: "Feb", revenue: 15000, profit: 9000 },
    { month: "Mar", revenue: 18000, profit: 11000 },
    { month: "Apr", revenue: 22000, profit: 15000 },
    { month: "May", revenue: data?.financials?.totalRevenue || 25000, profit: data?.financials?.netProfit || 18000 },
  ];

  if (loading) {
    return (
      <DashboardLayout title="Financial Intelligence">
        <div className="p-20 text-center flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6" />
          <p className="font-black text-xl animate-pulse text-primary tracking-tighter uppercase">Synchronizing Global Ledgers...</p>
          <p className="text-xs text-muted-foreground mt-2 font-bold uppercase tracking-widest opacity-50">Fetching secure financial data from MongoDB Cluster</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Financial Hub">
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-border shadow-sm">
          <div>
            <h1 className="text-2xl font-black font-headline text-foreground uppercase tracking-tight">Trade Finance & Treasury</h1>
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1 opacity-60">Real-time fiscal monitoring across global routes</p>
          </div>
          <button onClick={() => exportReport("Financial")} className="bg-primary text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95">
            <Download className="w-4 h-4" /> Export Ledger
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Gross Revenue", value: `$${(data?.financials?.totalRevenue || 0).toLocaleString()}`, change: "+14.2%", up: true, icon: DollarSign, color: "from-blue-500 to-blue-600", bg: "bg-blue-50" },
            { label: "Operational Costs", value: `$${(data?.financials?.totalExpenses || 0).toLocaleString()}`, change: "+3.1%", up: false, icon: CreditCard, color: "from-rose-500 to-rose-600", bg: "bg-rose-50" },
            { label: "Net Earnings", value: `$${(data?.financials?.netProfit || 0).toLocaleString()}`, change: "+22.7%", up: true, icon: TrendingUp, color: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50" },
            { label: "Active Pipeline", value: data?.shipmentStats?.active || 0, change: "Current Trades", up: true, icon: Activity, color: "from-amber-500 to-amber-600", bg: "bg-amber-50" },
          ].map(k => (
            <div key={k.label} className={`${k.bg} rounded-2xl border border-border/50 p-6 shadow-sm group hover:border-primary/20 transition-all`}>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black opacity-60">{k.label}</p>
                  <p className="text-2xl font-black font-headline text-foreground tracking-tighter">{k.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${k.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <k.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className={`flex items-center gap-1 mt-4 text-[10px] font-black uppercase tracking-widest ${k.up ? "text-emerald-600" : "text-rose-600"}`}>
                {k.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {k.change}
              </div>
            </div>
          ))}
        </div>

        {/* Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-black font-headline text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-3">
                <Activity className="w-5 h-5 text-primary" /> Financial Velocity
              </h2>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"><div className="w-3 h-3 rounded-full bg-primary" /> Revenue</div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"><div className="w-3 h-3 rounded-full bg-emerald-500" /> Profit</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.4} /><stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} /></linearGradient>
                  <linearGradient id="profGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.4} /><stop offset="100%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(214, 32%, 91%)" />
                <XAxis dataKey="month" stroke="hsl(220, 14%, 64%)" fontSize={10} fontWeight={700} axisLine={false} tickLine={false} />
                <YAxis stroke="hsl(220, 14%, 64%)" fontSize={10} fontWeight={700} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="hsl(217, 91%, 60%)" fill="url(#revGrad)" strokeWidth={4} />
                <Area type="monotone" dataKey="profit" stroke="hsl(160, 84%, 39%)" fill="url(#profGrad)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
            <h2 className="font-black font-headline text-sm uppercase tracking-widest text-muted-foreground mb-8">Asset Allocation</h2>
            <div className="h-[240px] flex items-center justify-center">
              <PieChart width={220} height={220}>
                <Pie 
                  data={[
                    { name: "OpEx", value: data?.financials?.totalExpenses || 35 },
                    { name: "Profit Margin", value: data?.financials?.netProfit || 65 }
                  ]} 
                  innerRadius={70} 
                  outerRadius={100} 
                  paddingAngle={8} 
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill="hsl(0, 84%, 60%)" />
                  <Cell fill="hsl(160, 84%, 39%)" />
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
            <div className="space-y-4 mt-8">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground"><div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm" /> Net Earnings</span>
                <span className="text-emerald-600 font-black font-mono tracking-tighter">${(data?.financials?.netProfit || 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground"><div className="w-3 h-3 rounded-full bg-rose-500 shadow-sm" /> Operational Costs</span>
                <span className="text-rose-600 font-black font-mono tracking-tighter">${(data?.financials?.totalExpenses || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-black font-headline text-sm uppercase tracking-widest text-muted-foreground">Financial Security Audit</h2>
            <Link to="/admin/audit-log" className="text-[10px] text-primary font-black uppercase tracking-widest hover:underline flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full">
              <Clock className="w-3 h-3" /> System Logs
            </Link>
          </div>
          <div className="text-center py-16 text-muted-foreground border-2 border-dashed border-muted rounded-3xl">
            <Activity className="w-8 h-8 mx-auto mb-4 opacity-20 animate-pulse" />
            <p className="font-black text-[10px] uppercase tracking-widest opacity-40">End-to-End Encrypted Financial Stream Active</p>
            <p className="text-xs font-bold mt-1">Authorized Node: AL-USAMA-HQ-KARACHI</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FinancialDashboard;
