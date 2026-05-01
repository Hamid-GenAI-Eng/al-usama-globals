import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Search, Download, Filter, Eye, Edit, Trash2, LogIn, Upload, ShieldCheck, FileText, DollarSign, Ship, User } from "lucide-react";

type Action = "create" | "update" | "delete" | "view" | "login" | "upload" | "approve" | "payment";

const actionMeta: Record<Action, { icon: typeof Eye; color: string; bg: string }> = {
  create: { icon: Edit, color: "text-emerald-700", bg: "bg-emerald-100" },
  update: { icon: Edit, color: "text-blue-700", bg: "bg-blue-100" },
  delete: { icon: Trash2, color: "text-rose-700", bg: "bg-rose-100" },
  view: { icon: Eye, color: "text-slate-700", bg: "bg-slate-100" },
  login: { icon: LogIn, color: "text-violet-700", bg: "bg-violet-100" },
  upload: { icon: Upload, color: "text-amber-700", bg: "bg-amber-100" },
  approve: { icon: ShieldCheck, color: "text-emerald-700", bg: "bg-emerald-100" },
  payment: { icon: DollarSign, color: "text-emerald-700", bg: "bg-emerald-100" },
};

const logs = [
  { time: "2026-04-30 14:32:11", user: "Captain Usama", role: "Admin", action: "approve" as Action, target: "GD KAPE-441230", module: "Customs", ip: "203.81.45.12" },
  { time: "2026-04-30 14:18:42", user: "Bilal Ahmed", role: "Operator", action: "upload" as Action, target: "Bill of Lading — SHP-2026-1842", module: "Documents", ip: "203.81.45.18" },
  { time: "2026-04-30 13:55:09", user: "Hamza Khan", role: "Manager", action: "create" as Action, target: "PO-2026-0241", module: "Orders", ip: "182.180.44.91" },
  { time: "2026-04-30 13:40:22", user: "System", role: "—", action: "payment" as Action, target: "PKR 1,245,000 received from Lahore Traders", module: "Finance", ip: "—" },
  { time: "2026-04-30 12:11:55", user: "Captain Usama", role: "Admin", action: "update" as Action, target: "User role: ahmed@al-usama.com → Manager", module: "RBAC", ip: "203.81.45.12" },
  { time: "2026-04-30 11:48:30", user: "Sara Iqbal", role: "Viewer", action: "view" as Action, target: "Shipment SHP-2026-1840", module: "Shipments", ip: "39.42.118.7" },
  { time: "2026-04-30 10:22:17", user: "Bilal Ahmed", role: "Operator", action: "update" as Action, target: "SHP-2026-1842 status → In Transit", module: "Shipments", ip: "203.81.45.18" },
  { time: "2026-04-30 09:15:04", user: "Captain Usama", role: "Admin", action: "login" as Action, target: "Successful login", module: "Auth", ip: "203.81.45.12" },
  { time: "2026-04-30 08:50:33", user: "Hamza Khan", role: "Manager", action: "delete" as Action, target: "Draft SO-2026-0088", module: "Orders", ip: "182.180.44.91" },
  { time: "2026-04-29 17:30:11", user: "System", role: "—", action: "approve" as Action, target: "Auto-renewal: SBP exchange rate feed", module: "Integrations", ip: "—" },
  { time: "2026-04-29 16:14:56", user: "Sara Iqbal", role: "Viewer", action: "view" as Action, target: "Financial dashboard", module: "Finance", ip: "39.42.118.7" },
  { time: "2026-04-29 15:02:18", user: "Bilal Ahmed", role: "Operator", action: "create" as Action, target: "Supplier: Hamburg Machinery GmbH", module: "CRM", ip: "203.81.45.18" },
];

const moduleIcon: Record<string, typeof Ship> = { Customs: ShieldCheck, Documents: FileText, Orders: FileText, Finance: DollarSign, RBAC: User, Shipments: Ship, Auth: LogIn, CRM: User, Integrations: ShieldCheck };

const AuditLog = () => {
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("All");
  const [actionFilter, setActionFilter] = useState<"All" | Action>("All");

  const modules = ["All", ...Array.from(new Set(logs.map(l => l.module)))];
  const filtered = logs.filter(l =>
    (search === "" || l.user.toLowerCase().includes(search.toLowerCase()) || l.target.toLowerCase().includes(search.toLowerCase())) &&
    (moduleFilter === "All" || l.module === moduleFilter) &&
    (actionFilter === "All" || l.action === actionFilter)
  );

  return (
    <DashboardLayout title="Audit Trail">
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Comprehensive log of every action across the platform — user, timestamp, IP, and target.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Events today", value: "247", color: "text-blue-600" },
            { label: "Active users", value: "12", color: "text-emerald-600" },
            { label: "Failed logins", value: "3", color: "text-amber-600" },
            { label: "Critical actions", value: "8", color: "text-rose-600" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-border p-4">
              <p className={`text-2xl font-bold font-headline ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-border p-4 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by user or target..." className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
          </div>
          <select value={moduleFilter} onChange={e => setModuleFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-border bg-background outline-none text-sm">
            {modules.map(m => <option key={m}>{m}</option>)}
          </select>
          <select value={actionFilter} onChange={e => setActionFilter(e.target.value as typeof actionFilter)} className="px-3 py-2 rounded-lg border border-border bg-background outline-none text-sm">
            <option value="All">All actions</option>
            {Object.keys(actionMeta).map(a => <option key={a} value={a} className="capitalize">{a}</option>)}
          </select>
          <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm font-semibold"><Filter className="w-4 h-4" /> Date range</button>
        </div>

        {/* Log table */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr className="text-left text-xs uppercase text-muted-foreground">
                <th className="px-6 py-3 font-bold">Timestamp</th>
                <th className="px-6 py-3 font-bold">User</th>
                <th className="px-6 py-3 font-bold">Action</th>
                <th className="px-6 py-3 font-bold">Target</th>
                <th className="px-6 py-3 font-bold">Module</th>
                <th className="px-6 py-3 font-bold">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((log, i) => {
                const meta = actionMeta[log.action];
                const Icon = meta.icon;
                const ModIcon = moduleIcon[log.module] || FileText;
                return (
                  <tr key={i} className="hover:bg-muted/30 transition">
                    <td className="px-6 py-3.5 font-mono text-xs text-muted-foreground whitespace-nowrap">{log.time}</td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{log.user.split(" ").map(n => n[0]).join("").slice(0, 2)}</div>
                        <div>
                          <p className="font-semibold">{log.user}</p>
                          <p className="text-xs text-muted-foreground">{log.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${meta.bg} ${meta.color}`}>
                        <Icon className="w-3 h-3" /> {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">{log.target}</td>
                    <td className="px-6 py-3.5"><span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><ModIcon className="w-3.5 h-3.5" /> {log.module}</span></td>
                    <td className="px-6 py-3.5 font-mono text-xs text-muted-foreground">{log.ip}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="px-6 py-12 text-center text-sm text-muted-foreground">No events match these filters.</div>}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AuditLog;
