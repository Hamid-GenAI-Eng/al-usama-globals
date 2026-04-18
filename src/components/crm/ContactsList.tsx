import { Link } from "react-router-dom";
import { Plus, Filter, Search, MoreVertical, Building2, Globe, TrendingUp, Users, DollarSign, Package } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

export type ContactKind = "supplier" | "buyer";

export interface Contact {
  id: string;
  name: string;
  country: string;
  city: string;
  contact: string;
  email: string;
  taxId: string;
  totalVolume: string;
  activeShipments: number;
  paymentStatus: "PAID" | "PARTIAL" | "OVERDUE";
  tier: "PLATINUM" | "GOLD" | "SILVER" | "STANDARD";
}

const tierColor: Record<string, string> = {
  PLATINUM: "bg-purple-50 text-purple-700 border border-purple-200",
  GOLD: "bg-amber-50 text-amber-700 border border-amber-200",
  SILVER: "bg-gray-50 text-gray-700 border border-gray-200",
  STANDARD: "bg-blue-50 text-blue-700 border border-blue-200",
};

const paymentColor: Record<string, string> = {
  PAID: "bg-green-50 text-green-700 border border-green-200",
  PARTIAL: "bg-amber-50 text-amber-700 border border-amber-200",
  OVERDUE: "bg-red-50 text-red-700 border border-red-200",
};

interface Props {
  kind: ContactKind;
  contacts: Contact[];
}

const ContactsList = ({ kind, contacts }: Props) => {
  const isSupplier = kind === "supplier";
  const basePath = isSupplier ? "/suppliers" : "/buyers";
  const title = isSupplier ? "Supplier Network" : "Buyer Network";
  const subtitle = isSupplier
    ? "Vendor and source partner relationship management"
    : "Customer and importer relationship management";
  const ctaLabel = isSupplier ? "Add Supplier" : "Add Buyer";
  const totalLabel = isSupplier ? "TOTAL SUPPLIERS" : "TOTAL BUYERS";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold font-headline text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          </div>
          <Link to={`${basePath}/create`} className="gradient-primary text-white px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-all">
            <Plus className="w-4 h-4" />
            {ctaLabel}
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: totalLabel, value: contacts.length.toString().padStart(2, "0"), sub: "+3 this month", icon: Users, color: "text-primary", bg: "bg-blue-50" },
            { label: "ACTIVE SHIPMENTS", value: contacts.reduce((s, c) => s + c.activeShipments, 0).toString(), sub: "Currently in transit", icon: Package, color: "text-green-600", bg: "bg-green-50" },
            { label: "TRADE VOLUME (YTD)", value: "$8.2M", sub: "+18% YoY", icon: TrendingUp, color: "text-primary", bg: "bg-blue-50" },
            { label: "OUTSTANDING", value: "$142K", sub: "3 overdue invoices", icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50" },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.bg} rounded-xl p-5 border border-border/50`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-[11px] font-bold uppercase tracking-wider ${stat.color}`}>{stat.label}</p>
                  <p className="text-3xl font-bold font-headline text-foreground mt-1">{stat.value}</p>
                  <p className={`text-xs mt-1 ${stat.color}`}>{stat.sub}</p>
                </div>
                <stat.icon className={`w-10 h-10 ${stat.color} opacity-20`} />
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-5 border border-border">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[220px]">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder={`Search ${isSupplier ? "suppliers" : "buyers"} by name, country, tax ID...`} className="w-full pl-9 pr-4 py-2 bg-muted rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Country</label>
              <select className="px-3 py-2 bg-muted rounded-lg text-sm border-none min-w-[150px]">
                <option>All Countries</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Tier</label>
              <select className="px-3 py-2 bg-muted rounded-lg text-sm border-none min-w-[140px]">
                <option>All Tiers</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Payment Status</label>
              <select className="px-3 py-2 bg-muted rounded-lg text-sm border-none min-w-[140px]">
                <option>All Statuses</option>
              </select>
            </div>
            <button className="p-2 bg-muted rounded-lg hover:bg-muted/80">
              <Filter className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {[isSupplier ? "Supplier" : "Buyer", "Country", "Contact Person", "Tax ID", "Trade Volume", "Active", "Payment", "Tier", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-4">
                    <Link to={`${basePath}/${c.id}`} className="flex items-center gap-3 group">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.id} • {c.email}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{c.country}</p>
                        <p className="text-xs text-muted-foreground">{c.city}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-foreground">{c.contact}</td>
                  <td className="px-4 py-4 text-sm text-muted-foreground font-mono">{c.taxId}</td>
                  <td className="px-4 py-4 text-sm font-bold text-foreground">{c.totalVolume}</td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-bold text-primary">{c.activeShipments}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${paymentColor[c.paymentStatus]}`}>{c.paymentStatus}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${tierColor[c.tier]}`}>{c.tier}</span>
                  </td>
                  <td className="px-4 py-4">
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContactsList;
