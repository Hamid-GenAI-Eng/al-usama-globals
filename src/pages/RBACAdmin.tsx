import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Search, Plus, Shield, ShieldCheck, MoreVertical, Mail, Ban, Key } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

type Role = "MASTER_ADMIN" | "OPS_MANAGER" | "TRADE_OPERATOR" | "VIEWER";

const RBACAdmin = () => {
  const [tab, setTab] = useState<"users" | "permissions" | "audit">("users");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/users");
      setUsers(response.data.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id: string, role: string) => {
    try {
      await api.patch(`/admin/users/${id}`, { role });
      toast.success("Role updated");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await api.patch(`/admin/users/${id}`, { isActive: !currentStatus });
      toast.success(currentStatus ? "User deactivated" : "User activated");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const filtered = users.filter(u => 
    !search || 
    u.fullName.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-20 text-center flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-bold text-lg animate-pulse">Syncing User Directory...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-headline">User Hub & Access Control</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage team members, roles, and platform permissions</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Users", value: users.length, icon: Shield, bg: "bg-blue-50", color: "text-blue-600" },
            { label: "Active", value: users.filter(u => u.isActive).length, icon: ShieldCheck, bg: "bg-emerald-50", color: "text-emerald-600" },
            { label: "Admins", value: users.filter(u => u.role === "MASTER_ADMIN").length, icon: Mail, bg: "bg-violet-50", color: "text-violet-600" },
            { label: "Inactive", value: users.filter(u => !u.isActive).length, icon: Ban, bg: "bg-rose-50", color: "text-rose-600" },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-xl border border-border/50 p-5 shadow-sm`}>
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{s.label}</p>
                <s.icon className={`w-4 h-4 ${s.color} opacity-40`} />
              </div>
              <p className="text-2xl font-bold font-headline mt-2 text-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-border shadow-sm">
          <div className="border-b border-border px-5 flex gap-6">
            <button onClick={() => setTab("users")} className={`py-3 text-sm font-bold border-b-2 transition-colors ${tab === "users" ? "text-primary border-primary" : "text-muted-foreground border-transparent hover:text-foreground"}`}>
              Users
            </button>
            <button onClick={() => setTab("permissions")} className={`py-3 text-sm font-bold border-b-2 transition-colors ${tab === "permissions" ? "text-primary border-primary" : "text-muted-foreground border-transparent hover:text-foreground"}`}>
              Role Matrix
            </button>
          </div>

          {tab === "users" && (
            <div>
              <div className="p-4 border-b border-border bg-muted/10">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter by name or email..." className="w-full pl-9 pr-4 py-2 bg-white rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-primary/20 shadow-inner" />
                </div>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-muted/30 text-[10px] text-muted-foreground uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Identity</th>
                    <th className="px-6 py-4 text-left font-bold">Role</th>
                    <th className="px-6 py-4 text-left font-bold">Status</th>
                    <th className="px-6 py-4 text-left font-bold">Activity</th>
                    <th className="px-6 py-4 text-right font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filtered.map(u => (
                    <tr key={u.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                            {u.fullName.split(" ").map((n: string) => n[0]).join("")}
                          </div>
                          <div>
                            <p className="font-bold text-foreground">{u.fullName}</p>
                            <p className="text-[10px] text-muted-foreground">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select 
                          value={u.role} 
                          onChange={e => updateRole(u.id, e.target.value)} 
                          className="px-2.5 py-1 rounded-md text-[10px] font-bold border border-border bg-white outline-none cursor-pointer uppercase shadow-sm"
                        >
                          {["MASTER_ADMIN", "OPS_MANAGER", "TRADE_OPERATOR", "VIEWER"].map(r => (
                            <option key={r} value={r}>{r.replace("_", " ")}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase ${u.isActive ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"}`}>
                          {u.isActive ? "Active" : "Disabled"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[10px] text-muted-foreground font-medium">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex gap-1">
                          <button onClick={() => toggleStatus(u.id, u.isActive)} className={`p-1.5 hover:bg-muted rounded transition-colors ${u.isActive ? "text-rose-600" : "text-emerald-600"}`}>
                            <Ban className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 hover:bg-muted rounded text-muted-foreground">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === "permissions" && (
            <div className="p-10 text-center">
              <Shield className="w-12 h-12 text-muted-foreground opacity-20 mx-auto mb-4" />
              <h3 className="text-lg font-bold">Role Matrix</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">The permission grid is being synchronized with the new RBAC engine. Contact system administrator for direct modifications.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RBACAdmin;
