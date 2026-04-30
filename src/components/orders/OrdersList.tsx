import { Link } from "react-router-dom";
import { Plus, Search, Filter, Download, FileText, TrendingUp, Package, DollarSign } from "lucide-react";
import { useState } from "react";

export type OrderType = "purchase" | "sales";

interface Order {
  id: string;
  number: string;
  party: string;
  date: string;
  delivery: string;
  amount: string;
  currency: string;
  status: "Draft" | "Confirmed" | "In Transit" | "Delivered" | "Cancelled";
  items: number;
}

const purchaseOrders: Order[] = [
  { id: "po-001", number: "PO-2026-0142", party: "Shenzhen Electronics Co.", date: "2026-04-22", delivery: "2026-05-15", amount: "48,250.00", currency: "USD", status: "Confirmed", items: 12 },
  { id: "po-002", number: "PO-2026-0141", party: "Mumbai Textiles Ltd.", date: "2026-04-20", delivery: "2026-05-08", amount: "32,800.00", currency: "USD", status: "In Transit", items: 8 },
  { id: "po-003", number: "PO-2026-0140", party: "Hamburg Machinery GmbH", date: "2026-04-18", delivery: "2026-06-02", amount: "127,400.00", currency: "EUR", status: "Confirmed", items: 4 },
  { id: "po-004", number: "PO-2026-0139", party: "Istanbul Steel Works", date: "2026-04-15", delivery: "2026-05-20", amount: "89,600.00", currency: "USD", status: "Draft", items: 6 },
  { id: "po-005", number: "PO-2026-0138", party: "Bangkok Polymers", date: "2026-04-12", delivery: "2026-04-30", amount: "21,450.00", currency: "USD", status: "Delivered", items: 15 },
];

const salesOrders: Order[] = [
  { id: "so-001", number: "SO-2026-0089", party: "Lahore Traders Pvt Ltd", date: "2026-04-23", delivery: "2026-05-10", amount: "1,245,000.00", currency: "PKR", status: "Confirmed", items: 9 },
  { id: "so-002", number: "SO-2026-0088", party: "Dubai Imports LLC", date: "2026-04-21", delivery: "2026-05-05", amount: "67,300.00", currency: "AED", status: "In Transit", items: 11 },
  { id: "so-003", number: "SO-2026-0087", party: "Karachi Distributors", date: "2026-04-19", delivery: "2026-04-29", amount: "856,500.00", currency: "PKR", status: "Delivered", items: 14 },
  { id: "so-004", number: "SO-2026-0086", party: "Riyadh Trading Co.", date: "2026-04-16", delivery: "2026-05-12", amount: "42,100.00", currency: "SAR", status: "Draft", items: 7 },
];

const statusStyle: Record<string, string> = {
  Draft: "bg-muted text-muted-foreground",
  Confirmed: "bg-blue-100 text-blue-700",
  "In Transit": "bg-amber-100 text-amber-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-rose-100 text-rose-700",
};

const OrdersList = ({ type }: { type: OrderType }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const orders = type === "purchase" ? purchaseOrders : salesOrders;
  const isPO = type === "purchase";

  const filtered = orders.filter(o => {
    const matchSearch = !search || o.number.toLowerCase().includes(search.toLowerCase()) || o.party.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalValue = orders.reduce((s, o) => s + parseFloat(o.amount.replace(/,/g, "")), 0);
  const inTransit = orders.filter(o => o.status === "In Transit").length;
  const delivered = orders.filter(o => o.status === "Delivered").length;

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
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted">
            <Download className="w-4 h-4" /> Export
          </button>
          <Link to={`/orders/${type}/create`} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90">
            <Plus className="w-4 h-4" /> New {isPO ? "PO" : "SO"}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: `Total ${isPO ? "POs" : "SOs"}`, value: orders.length.toString(), icon: FileText, color: "text-primary" },
          { label: "In Transit", value: inTransit.toString(), icon: Package, color: "text-amber-600" },
          { label: "Delivered", value: delivered.toString(), icon: TrendingUp, color: "text-emerald-600" },
          { label: "Total Value", value: `$${(totalValue / 1000).toFixed(1)}K`, icon: DollarSign, color: "text-blue-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-border p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{stat.label}</p>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold font-headline mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-border">
        <div className="p-4 border-b border-border flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={`Search ${isPO ? "POs" : "SOs"} or ${isPO ? "supplier" : "buyer"}...`}
              className="w-full pl-9 pr-4 py-2 bg-muted rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 border border-border rounded-lg text-sm bg-white">
            <option value="all">All Statuses</option>
            <option>Draft</option><option>Confirmed</option><option>In Transit</option><option>Delivered</option><option>Cancelled</option>
          </select>
          <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm">
            <Filter className="w-4 h-4" /> More Filters
          </button>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">{isPO ? "PO" : "SO"} Number</th>
              <th className="px-4 py-3 text-left font-semibold">{isPO ? "Supplier" : "Buyer"}</th>
              <th className="px-4 py-3 text-left font-semibold">Order Date</th>
              <th className="px-4 py-3 text-left font-semibold">Delivery</th>
              <th className="px-4 py-3 text-left font-semibold">Items</th>
              <th className="px-4 py-3 text-right font-semibold">Amount</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id} className="border-t border-border hover:bg-muted/30">
                <td className="px-4 py-3">
                  <Link to={`/orders/${type}/${o.id}`} className="font-semibold text-primary hover:underline">{o.number}</Link>
                </td>
                <td className="px-4 py-3 font-medium">{o.party}</td>
                <td className="px-4 py-3 text-muted-foreground">{o.date}</td>
                <td className="px-4 py-3 text-muted-foreground">{o.delivery}</td>
                <td className="px-4 py-3">{o.items}</td>
                <td className="px-4 py-3 text-right font-mono font-semibold">{o.currency} {o.amount}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusStyle[o.status]}`}>{o.status}</span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">No orders match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersList;
