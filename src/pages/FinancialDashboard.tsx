import DashboardLayout from "@/components/DashboardLayout";
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Wallet, ArrowUpRight, ArrowDownRight, Download } from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { toast } from "sonner";

const revenueData = [
  { month: "Nov", revenue: 142000, expenses: 98000, profit: 44000 },
  { month: "Dec", revenue: 168000, expenses: 112000, profit: 56000 },
  { month: "Jan", revenue: 195000, expenses: 124000, profit: 71000 },
  { month: "Feb", revenue: 178000, expenses: 118000, profit: 60000 },
  { month: "Mar", revenue: 224000, expenses: 142000, profit: 82000 },
  { month: "Apr", revenue: 268000, expenses: 156000, profit: 112000 },
];

const cashflowData = [
  { week: "W1", inflow: 48000, outflow: 32000 },
  { week: "W2", inflow: 62000, outflow: 41000 },
  { week: "W3", inflow: 55000, outflow: 38000 },
  { week: "W4", inflow: 71000, outflow: 45000 },
];

const expenseBreakdown = [
  { name: "Freight & Logistics", value: 42, color: "hsl(217, 91%, 60%)" },
  { name: "Customs Duties", value: 28, color: "hsl(173, 80%, 40%)" },
  { name: "Warehousing", value: 14, color: "hsl(43, 96%, 56%)" },
  { name: "Insurance", value: 9, color: "hsl(280, 70%, 60%)" },
  { name: "Other", value: 7, color: "hsl(220, 14%, 64%)" },
];

const recentTransactions = [
  { id: "TX-8821", date: "Apr 28", desc: "Payment from Lahore Traders", type: "in", amount: 1245000, currency: "PKR" },
  { id: "TX-8820", date: "Apr 27", desc: "Customs duty - GD KAPE-441230", type: "out", amount: 184500, currency: "PKR" },
  { id: "TX-8819", date: "Apr 26", desc: "Freight invoice - Maersk Line", type: "out", amount: 8400, currency: "USD" },
  { id: "TX-8818", date: "Apr 25", desc: "Payment from Dubai Imports LLC", type: "in", amount: 67300, currency: "AED" },
  { id: "TX-8817", date: "Apr 24", desc: "Supplier payment - Shenzhen Electronics", type: "out", amount: 48250, currency: "USD" },
];

const FinancialDashboard = () => {
  const exportReport = (kind: string) => toast.success(`${kind} report exported to /mnt/documents`);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-headline">Financial Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Real-time financial performance across all trade operations</p>
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 border border-border rounded-lg text-sm bg-white">
              {["Last 6 months", "Last 30 days", "This quarter", "YTD"].map(o => <option key={o}>{o}</option>)}
            </select>
            <button onClick={() => exportReport("Financial")} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold">
              <Download className="w-4 h-4" /> Export Report
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Revenue", value: "$1.18M", change: "+18.4%", up: true, icon: DollarSign, color: "from-emerald-500 to-emerald-600" },
            { label: "Total Expenses", value: "$750K", change: "+9.2%", up: false, icon: CreditCard, color: "from-rose-500 to-rose-600" },
            { label: "Net Profit", value: "$430K", change: "+24.7%", up: true, icon: TrendingUp, color: "from-primary to-blue-600" },
            { label: "Cash Balance", value: "$892K", change: "+5.1%", up: true, icon: Wallet, color: "from-violet-500 to-violet-600" },
          ].map(k => (
            <div key={k.label} className="bg-white rounded-xl border border-border p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{k.label}</p>
                  <p className="text-2xl font-bold font-headline mt-2">{k.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${k.color} flex items-center justify-center`}>
                  <k.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className={`flex items-center gap-1 mt-3 text-xs font-semibold ${k.up ? "text-emerald-600" : "text-rose-600"}`}>
                {k.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {k.change}
                <span className="text-muted-foreground font-normal ml-1">vs prior period</span>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue vs Expenses */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold font-headline">Revenue vs Expenses</h2>
                <p className="text-xs text-muted-foreground">Monthly performance trend</p>
              </div>
              <button onClick={() => exportReport("Revenue")} className="text-xs text-primary font-semibold hover:underline">Export CSV</button>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.4} /><stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} /></linearGradient>
                  <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.3} /><stop offset="100%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                <XAxis dataKey="month" stroke="hsl(220, 14%, 64%)" fontSize={12} />
                <YAxis stroke="hsl(220, 14%, 64%)" fontSize={12} tickFormatter={v => `$${v / 1000}k`} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(214, 32%, 91%)" }} formatter={(v: number) => `$${v.toLocaleString()}`} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="revenue" stroke="hsl(217, 91%, 60%)" fill="url(#revGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="expenses" stroke="hsl(0, 84%, 60%)" fill="url(#expGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="font-bold font-headline mb-1">Expense Breakdown</h2>
            <p className="text-xs text-muted-foreground mb-4">By category</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={expenseBreakdown} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {expenseBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {expenseBreakdown.map(e => (
                <div key={e.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm" style={{ background: e.color }} /><span>{e.name}</span></div>
                  <span className="font-semibold">{e.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cashflow + Profit */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="font-bold font-headline mb-1">Cash Flow (Last 4 Weeks)</h2>
            <p className="text-xs text-muted-foreground mb-4">Inflow vs Outflow</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={cashflowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                <XAxis dataKey="week" stroke="hsl(220, 14%, 64%)" fontSize={12} />
                <YAxis stroke="hsl(220, 14%, 64%)" fontSize={12} tickFormatter={v => `$${v / 1000}k`} />
                <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="inflow" fill="hsl(160, 84%, 39%)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="outflow" fill="hsl(0, 84%, 60%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="font-bold font-headline mb-1">Net Profit Trend</h2>
            <p className="text-xs text-muted-foreground mb-4">Month-over-month</p>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                <XAxis dataKey="month" stroke="hsl(220, 14%, 64%)" fontSize={12} />
                <YAxis stroke="hsl(220, 14%, 64%)" fontSize={12} tickFormatter={v => `$${v / 1000}k`} />
                <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
                <Line type="monotone" dataKey="profit" stroke="hsl(217, 91%, 60%)" strokeWidth={3} dot={{ r: 5, fill: "hsl(217, 91%, 60%)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions + Quick Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-border">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h2 className="font-bold font-headline">Recent Transactions</h2>
              <button className="text-xs text-primary font-semibold hover:underline">View All</button>
            </div>
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground uppercase tracking-wider">
                <tr className="border-b border-border">
                  <th className="px-5 py-3 text-left font-semibold">Date</th>
                  <th className="px-5 py-3 text-left font-semibold">Description</th>
                  <th className="px-5 py-3 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map(t => (
                  <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-5 py-3 text-muted-foreground">{t.date}</td>
                    <td className="px-5 py-3">
                      <p className="font-medium">{t.desc}</p>
                      <p className="text-xs text-muted-foreground">{t.id}</p>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className={`font-mono font-semibold ${t.type === "in" ? "text-emerald-600" : "text-rose-600"}`}>
                        {t.type === "in" ? "+" : "−"}{t.currency} {t.amount.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="font-bold font-headline mb-4">Quick Reports</h2>
            <div className="space-y-2">
              {[
                "Profit & Loss Statement",
                "Balance Sheet",
                "Cash Flow Statement",
                "Outstanding Receivables",
                "Tax Summary (FBR)",
                "Customs Duty Report",
              ].map(r => (
                <button key={r} onClick={() => exportReport(r)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 rounded-lg text-sm font-medium border border-border">
                  <span>{r}</span>
                  <Download className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FinancialDashboard;
