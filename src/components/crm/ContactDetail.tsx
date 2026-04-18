import { Link, useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Pencil, Trash2, Mail, Phone, MapPin, Globe, Building2, Calendar, FileText, MessageSquare, Plus, Ship, DollarSign, TrendingUp, Package } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { ContactKind } from "./ContactsList";
import { toast } from "sonner";

const tradeHistory = [
  { id: "SHP-8829-DXB", date: "Oct 22, 2026", value: "$213,700", status: "IN TRANSIT", items: "Steel Beams, Glass Paneling" },
  { id: "SHP-7710-SHA", date: "Sep 14, 2026", value: "$184,200", status: "DELIVERED", items: "Industrial Machinery" },
  { id: "SHP-6534-KHI", date: "Aug 02, 2026", value: "$96,500", status: "DELIVERED", items: "Textile Components" },
  { id: "SHP-5421-LHR", date: "Jun 18, 2026", value: "$321,000", status: "DELIVERED", items: "Architectural Glass" },
];

const notes = [
  { author: "Salman Younas", date: "Oct 22, 2026", text: "Negotiated 5% discount on bulk steel order. Vendor agreed to expedited shipping at no extra cost." },
  { author: "Usama Faraz", date: "Oct 10, 2026", text: "Site visit completed. Production capacity verified — can handle up to 15,000 units/month." },
  { author: "Salman Younas", date: "Sep 28, 2026", text: "Updated payment terms to Net 45. Awaiting signed addendum." },
];

const statusColor: Record<string, string> = {
  "IN TRANSIT": "bg-blue-50 text-blue-700 border border-blue-200",
  DELIVERED: "bg-green-50 text-green-700 border border-green-200",
};

interface Props {
  kind: ContactKind;
}

const ContactDetail = ({ kind }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isSupplier = kind === "supplier";
  const basePath = isSupplier ? "/suppliers" : "/buyers";
  const label = isSupplier ? "Suppliers" : "Buyers";

  const handleDelete = () => {
    toast.success(`${isSupplier ? "Supplier" : "Buyer"} ${id} archived`);
    navigate(basePath);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <Link to={basePath} className="flex items-center gap-1 text-muted-foreground hover:text-foreground uppercase text-[11px] font-bold tracking-wider">
            <ChevronLeft className="w-3.5 h-3.5" />
            {label}
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-primary font-semibold text-[11px] uppercase tracking-wider">{id}</span>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold font-headline text-foreground">
                  {isSupplier ? "Shanghai Heavy Industries Co. Ltd" : "Al-Usama Global Trading LLC"}
                </h1>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase bg-purple-50 text-purple-700 border border-purple-200">PLATINUM</span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{id} • Partner since Jan 2023 • {isSupplier ? "Steel & Construction Materials" : "Architectural & Industrial Goods"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors">
              <Trash2 className="w-4 h-4" />
              Archive
            </button>
            <Link to={`${basePath}/${id}/edit`} className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-semibold text-foreground hover:bg-muted transition-colors">
              <Pencil className="w-4 h-4" />
              Edit
            </Link>
            <button className="gradient-primary text-white px-4 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:opacity-90">
              <Plus className="w-4 h-4" />
              New Shipment
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "TOTAL VOLUME (YTD)", value: "$2.4M", icon: TrendingUp, color: "text-primary", bg: "bg-blue-50" },
            { label: "TOTAL SHIPMENTS", value: "47", icon: Package, color: "text-green-600", bg: "bg-green-50" },
            { label: "ACTIVE SHIPMENTS", value: "3", icon: Ship, color: "text-primary", bg: "bg-blue-50" },
            { label: "OUTSTANDING", value: "$24,500", icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50" },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.bg} rounded-xl p-5 border border-border/50`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-[11px] font-bold uppercase tracking-wider ${stat.color}`}>{stat.label}</p>
                  <p className="text-2xl font-bold font-headline text-foreground mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`w-9 h-9 ${stat.color} opacity-20`} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trade History */}
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h3 className="text-lg font-bold font-headline">Trade History</h3>
                <button className="text-xs font-bold uppercase tracking-wider text-primary hover:underline">View All</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/30 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    <th className="text-left px-6 py-2.5">Shipment</th>
                    <th className="text-left px-6 py-2.5">Date</th>
                    <th className="text-left px-6 py-2.5">Items</th>
                    <th className="text-right px-6 py-2.5">Value</th>
                    <th className="text-right px-6 py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tradeHistory.map((t) => (
                    <tr key={t.id} className="border-t border-border hover:bg-muted/20">
                      <td className="px-6 py-3">
                        <Link to={`/shipments/${t.id}`} className="text-sm font-bold text-primary hover:underline">{t.id}</Link>
                      </td>
                      <td className="px-6 py-3 text-sm text-foreground">{t.date}</td>
                      <td className="px-6 py-3 text-sm text-muted-foreground">{t.items}</td>
                      <td className="px-6 py-3 text-sm font-bold text-foreground text-right">{t.value}</td>
                      <td className="px-6 py-3 text-right">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${statusColor[t.status]}`}>{t.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Notes & Communication */}
            <div className="bg-white rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-lg font-bold font-headline">Notes & Communication</h3>
                </div>
                <button className="text-xs font-bold uppercase tracking-wider text-primary hover:underline flex items-center gap-1">
                  <Plus className="w-3 h-3" />
                  Add Note
                </button>
              </div>

              <textarea placeholder="Add a note about this contact..." rows={3} className="w-full px-4 py-3 bg-muted rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-primary/20 resize-y mb-5" />

              <div className="space-y-4">
                {notes.map((n, i) => (
                  <div key={i} className="flex gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary">{n.author.split(" ").map(s => s[0]).join("")}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-foreground">{n.author}</p>
                        <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold">{n.date}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{n.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-xl p-5 border border-border">
              <h3 className="text-sm font-bold font-headline mb-4">Contact Information</h3>
              <div className="space-y-4">
                {[
                  { icon: Building2, label: "Contact Person", value: "Mr. Wang Liu" },
                  { icon: Mail, label: "Email", value: isSupplier ? "wang.liu@shi-china.com" : "ops@al-usama.ae" },
                  { icon: Phone, label: "Phone", value: "+86 21 5588 9921" },
                  { icon: Globe, label: "Country", value: isSupplier ? "China" : "United Arab Emirates" },
                  { icon: MapPin, label: "Address", value: isSupplier ? "Pudong New District, Shanghai 200120" : "Jebel Ali Free Zone, Dubai" },
                  { icon: FileText, label: "Tax ID / VAT", value: "CN-91310115MA1H..." },
                  { icon: Calendar, label: "Partner Since", value: "Jan 12, 2023" },
                ].map((m) => (
                  <div key={m.label}>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1">
                      <m.icon className="w-3 h-3" />
                      {m.label}
                    </div>
                    <p className="text-sm font-semibold text-foreground pl-5">{m.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Standing */}
            <div className="gradient-primary rounded-xl p-5 text-white">
              <p className="text-[10px] uppercase tracking-widest font-bold text-white/70 mb-1">Payment Standing</p>
              <p className="text-2xl font-bold font-headline">Excellent</p>
              <p className="text-xs text-white/80 mt-2 leading-relaxed">
                97% on-time payment rate over the last 24 months. Eligible for extended Net 60 terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContactDetail;
