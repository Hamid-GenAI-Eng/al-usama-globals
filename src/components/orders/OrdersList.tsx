import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Filter, Download, FileText, TrendingUp, Package, DollarSign } from "lucide-react";
import api from "@/lib/api";

export type OrderType = "purchase" | "sales";

const statusStyle: Record<string, string> = {
  DRAFT: "bg-muted text-muted-foreground",
  CONFIRMED: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-amber-100 text-amber-700",
  DELIVERED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-rose-100 text-rose-700",
};

const OrdersList = ({ type }: { type: OrderType }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const isPO = type === "purchase";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderType = isPO ? "PURCHASE" : "SALES";
        const response = await api.get(`/orders?type=${orderType}`);
        setOrders(response.data.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [type]);

  const filtered = orders.filter(o => {
    const matchSearch = !search || 
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) || 
      (o.contact?.name || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalValue = orders.reduce((s, o) => s + (o.totalAmount || 0), 0);
  const shipped = orders.filter(o => o.status === "SHIPPED").length;
  const delivered = orders.filter(o => o.status === "DELIVERED").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline text-foreground">
            {isPO ? "Purchase Orders" : "Sales Orders"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isPO ? "Manage your import purchase orders to suppliers" : "Manage your export sales orders to buyers"}
          </p>
        </div>
        <div className="flex gap-2">
          <Link to={`/orders/${type}/create`} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:opacity-90 shadow-lg transition-all">
            <Plus className="w-4 h-4" /> New {isPO ? "Order" : "Sale"}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: `Total ${isPO ? "POs" : "SOs"}`, value: orders.length, icon: FileText, color: "text-primary", bg: "bg-blue-50" },
          { label: "Shipped", value: shipped, icon: Package, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Delivered", value: delivered, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Book Value", value: `${(totalValue / 1000).toFixed(1)}K`, icon: DollarSign, color: "text-blue-600", bg: "bg-blue-50" },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.bg} rounded-xl border border-border/50 p-5 shadow-sm`}>
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              <stat.icon className={`w-5 h-5 ${stat.color} opacity-40`} />
            </div>
            <p className="text-2xl font-bold font-headline mt-2 text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex flex-wrap gap-3 bg-muted/20">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={`Search ${isPO ? "orders" : "sales"}...`}
              className="w-full pl-9 pr-4 py-2 bg-white rounded-lg text-sm border-none focus:ring-2 focus:ring-primary/20 shadow-inner"
            />
          </div>
          <select 
            value={statusFilter} 
            onChange={e => setStatusFilter(e.target.value)} 
            className="px-3 py-2 bg-white border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/10"
          >
            <option value="all">All Statuses</option>
            {Object.keys(statusStyle).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="p-20 text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground font-medium">Fetching Order Ledger...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-20 text-center flex flex-col items-center">
            <FileText className="w-12 h-12 text-muted-foreground opacity-20 mb-4" />
            <h3 className="text-lg font-bold">No orders found</h3>
            <p className="text-muted-foreground mt-1">Start by creating a new {type} order record.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Order Ref</th>
                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Partner</th>
                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Order Date</th>
                <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Amount</th>
                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filtered.map(o => (
                <tr key={o.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4">
                    <Link to={`/orders/${o.id}`} className="font-bold text-primary hover:underline">#{o.orderNumber}</Link>
                  </td>
                  <td className="px-6 py-4 font-medium text-foreground">{o.contact?.name || "Unknown"}</td>
                  <td className="px-6 py-4 text-muted-foreground">{new Date(o.orderDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right font-bold text-foreground">
                    {o.currency} {o.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${statusStyle[o.status] || "bg-muted text-muted-foreground"}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrdersList;
