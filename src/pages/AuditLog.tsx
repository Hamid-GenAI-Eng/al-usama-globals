import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Search, Download, Filter, Eye, Edit, Trash2, LogIn, Upload, ShieldCheck, FileText, DollarSign, Ship, User } from "lucide-react";
import api from "@/lib/api";

type Action = "create" | "update" | "delete" | "view" | "login" | "upload" | "approve" | "payment";

const actionMeta: Record<string, { icon: typeof Eye; color: string; bg: string }> = {
  POST: { icon: Edit, color: "text-emerald-700", bg: "bg-emerald-100" },
  PUT: { icon: Edit, color: "text-blue-700", bg: "bg-blue-100" },
  PATCH: { icon: Edit, color: "text-blue-700", bg: "bg-blue-100" },
  DELETE: { icon: Trash2, color: "text-rose-700", bg: "bg-rose-100" },
  GET: { icon: Eye, color: "text-slate-700", bg: "bg-slate-100" },
  LOGIN: { icon: LogIn, color: "text-violet-700", bg: "bg-violet-100" },
};

const moduleIcon: Record<string, typeof Ship> = { Customs: ShieldCheck, Documents: FileText, Orders: FileText, Finance: DollarSign, RBAC: User, Shipments: Ship, Auth: LogIn, CRM: User, Integrations: ShieldCheck };

const AuditLog = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("All");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get("/admin/audit-log");
        setLogs(response.data.data);
      } catch (error) {
        console.error("Failed to fetch audit logs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const modules = ["All", ...Array.from(new Set(logs.map(l => l.module)))];
  const filtered = logs.filter(l =>
    (search === "" || (l.user?.fullName || "System").toLowerCase().includes(search.toLowerCase()) || l.target.toLowerCase().includes(search.toLowerCase())) &&
    (moduleFilter === "All" || l.module === moduleFilter)
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-20 text-center flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-bold text-lg animate-pulse">Retrieving Audit Trail...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Audit Trail">
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Comprehensive log of every action across the platform — user, timestamp, IP, and target.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-all shadow-md">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Events", value: logs.length, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Critical Actions", value: logs.filter(l => l.action === "DELETE").length, color: "text-rose-600", bg: "bg-rose-50" },
            { label: "Unique Modules", value: modules.length - 1, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "System Uptime", value: "99.9%", color: "text-violet-600", bg: "bg-violet-50" },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-xl border border-border/50 p-4 shadow-sm`}>
              <p className={`text-2xl font-bold font-headline ${s.color}`}>{s.value}</p>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-border p-4 flex flex-wrap gap-3 items-center shadow-sm">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by user or target..." className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-muted/20 outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
          </div>
          <select value={moduleFilter} onChange={e => setModuleFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-border bg-white outline-none text-sm font-medium">
            {modules.map(m => <option key={m}>{m}</option>)}
          </select>
          <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors"><Filter className="w-4 h-4" /> Filters</button>
        </div>

        {/* Log table */}
        <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 border-b border-border">
              <tr className="text-left text-[10px] uppercase text-muted-foreground tracking-widest">
                <th className="px-6 py-4 font-bold">Timestamp</th>
                <th className="px-6 py-4 font-bold">User</th>
                <th className="px-6 py-4 font-bold">Action</th>
                <th className="px-6 py-4 font-bold">Target</th>
                <th className="px-6 py-4 font-bold">Module</th>
                <th className="px-6 py-4 font-bold">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filtered.map((log, i) => {
                const meta = actionMeta[log.action] || actionMeta.GET;
                const Icon = meta.icon;
                const ModIcon = moduleIcon[log.module] || FileText;
                return (
                  <tr key={log.id} className="hover:bg-muted/20 transition">
                    <td className="px-6 py-4 font-mono text-[10px] text-muted-foreground whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                          {log.user ? log.user.fullName.split(" ").map((n: string) => n[0]).join("") : "SY"}
                        </div>
                        <div>
                          <p className="font-bold text-foreground text-xs">{log.user?.fullName || "System"}</p>
                          <p className="text-[10px] text-muted-foreground uppercase">{log.user?.role || "SYSTEM"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${meta.bg} ${meta.color}`}>
                        <Icon className="w-3 h-3" /> {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate font-medium text-foreground">{log.target}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                        <ModIcon className="w-3.5 h-3.5" /> {log.module}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-[10px] text-muted-foreground">{log.ipAddress || "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="px-6 py-20 text-center text-sm text-muted-foreground font-medium">No audit events match these parameters.</div>}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AuditLog;
