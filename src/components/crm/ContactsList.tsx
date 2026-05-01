import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Globe, TrendingUp, Users, DollarSign, Building2, MoreVertical, Search } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import api from "@/lib/api";

export type ContactKind = "supplier" | "buyer";

const tierColor: Record<string, string> = {
  PLATINUM: "bg-purple-50 text-purple-700 border border-purple-200",
  GOLD: "bg-amber-50 text-amber-700 border border-amber-200",
  SILVER: "bg-gray-50 text-gray-700 border border-gray-200",
  STANDARD: "bg-blue-50 text-blue-700 border border-blue-200",
};

const ContactsList = ({ kind }: { kind: ContactKind }) => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const isSupplier = kind === "supplier";
  const basePath = isSupplier ? "/suppliers" : "/buyers";
  const title = isSupplier ? "Supplier Network" : "Buyer Network";
  const subtitle = isSupplier
    ? "Vendor and source partner relationship management"
    : "Customer and importer relationship management";
  const ctaLabel = isSupplier ? "Add Supplier" : "Add Buyer";
  const totalLabel = isSupplier ? "TOTAL SUPPLIERS" : "TOTAL BUYERS";

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const type = isSupplier ? "SUPPLIER" : "BUYER";
        const response = await api.get(`/contacts?type=${type}`);
        setContacts(response.data.data);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, [kind]);

  const filteredContacts = contacts.filter(c => 
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.country?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold font-headline text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          </div>
          <Link to={`${basePath}/create`} className="gradient-primary text-white px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-all shadow-md">
            <Plus className="w-4 h-4" />
            {ctaLabel}
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: totalLabel, value: contacts.length, sub: "Verified Partners", icon: Users, color: "text-primary", bg: "bg-blue-50" },
            { label: "GLOBAL REACH", value: new Set(contacts.map(c => c.country)).size, sub: "Countries Connected", icon: Globe, color: "text-green-600", bg: "bg-green-50" },
            { label: "TRADE DEPTH", value: contacts.length > 0 ? "High" : "None", sub: "Operational Scale", icon: TrendingUp, color: "text-violet-600", bg: "bg-violet-50" },
            { label: "SECURE PORTAL", value: "SSL", sub: "Encrypted Data", icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50" },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.bg} rounded-xl p-5 border border-border/50 shadow-sm`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${stat.color}`}>{stat.label}</p>
                  <p className="text-2xl font-bold font-headline text-foreground mt-1">{stat.value}</p>
                  <p className={`text-[10px] mt-1 ${stat.color} opacity-80`}>{stat.sub}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color} opacity-20`} />
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 border border-border shadow-sm">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder={`Search ${isSupplier ? "suppliers" : "buyers"}...`} 
              className="w-full pl-9 pr-4 py-2 bg-muted rounded-lg text-sm border-none focus:ring-2 focus:ring-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center text-muted-foreground">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
              <p className="font-medium animate-pulse">Syncing CRM Hub...</p>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="p-20 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-muted-foreground opacity-50" />
              </div>
              <h3 className="text-lg font-bold">No partners found</h3>
              <p className="text-muted-foreground mt-1">Start building your trade network by adding your first {kind}.</p>
              <Link to={`${basePath}/create`} className="mt-6 inline-block px-6 py-2 bg-primary text-white rounded-full text-sm font-bold shadow-lg">Get Started</Link>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/30 border-b border-border">
                  {[isSupplier ? "Supplier" : "Buyer", "Country", "Contact Detail", "Tax / NTN ID", ""].map((h) => (
                    <th key={h} className="text-left px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredContacts.map((c) => (
                  <tr key={c.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground">{c.name}</p>
                          <p className="text-[10px] text-muted-foreground">ID: {c.id.substring(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="font-medium">{c.country}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium">{c.email}</p>
                      <p className="text-xs text-muted-foreground">{c.phone || "No phone"}</p>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-muted-foreground">{c.taxId || "—"}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 hover:bg-muted rounded text-muted-foreground">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContactsList;
