import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Search, Plus, Shield, ShieldCheck, MoreVertical, Mail, Ban, Key } from "lucide-react";
import { toast } from "sonner";

type Role = "Admin" | "Manager" | "Operator" | "Viewer";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "Active" | "Invited" | "Suspended";
  lastActive: string;
  initials: string;
}

const initialUsers: User[] = [
  { id: "u1", name: "Captain Usama", email: "usama@alusama.global", role: "Admin", status: "Active", lastActive: "Just now", initials: "CU" },
  { id: "u2", name: "Ayesha Rahim", email: "ayesha@alusama.global", role: "Manager", status: "Active", lastActive: "2 hrs ago", initials: "AR" },
  { id: "u3", name: "Bilal Ahmed", email: "bilal@alusama.global", role: "Operator", status: "Active", lastActive: "Yesterday", initials: "BA" },
  { id: "u4", name: "Sana Iqbal", email: "sana@alusama.global", role: "Operator", status: "Active", lastActive: "3 days ago", initials: "SI" },
  { id: "u5", name: "Hamza Khan", email: "hamza@alusama.global", role: "Viewer", status: "Invited", lastActive: "Pending", initials: "HK" },
  { id: "u6", name: "Fatima Sheikh", email: "fatima@alusama.global", role: "Manager", status: "Suspended", lastActive: "2 weeks ago", initials: "FS" },
];

const roleStyle: Record<Role, string> = {
  Admin: "bg-rose-100 text-rose-700",
  Manager: "bg-blue-100 text-blue-700",
  Operator: "bg-amber-100 text-amber-700",
  Viewer: "bg-muted text-muted-foreground",
};

const statusStyle: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Invited: "bg-blue-100 text-blue-700",
  Suspended: "bg-rose-100 text-rose-700",
};

const permissions = [
  { module: "Shipments", Admin: "Full", Manager: "Full", Operator: "Edit", Viewer: "Read" },
  { module: "Documents", Admin: "Full", Manager: "Full", Operator: "Edit", Viewer: "Read" },
  { module: "Suppliers/Buyers", Admin: "Full", Manager: "Full", Operator: "Edit", Viewer: "Read" },
  { module: "Orders", Admin: "Full", Manager: "Full", Operator: "Edit", Viewer: "Read" },
  { module: "Customs & Compliance", Admin: "Full", Manager: "Full", Operator: "Edit", Viewer: "Read" },
  { module: "Financial Dashboard", Admin: "Full", Manager: "Read", Operator: "—", Viewer: "—" },
  { module: "User Management", Admin: "Full", Manager: "—", Operator: "—", Viewer: "—" },
  { module: "Audit Log", Admin: "Full", Manager: "Read", Operator: "—", Viewer: "—" },
];

const auditLog = [
  { time: "2 min ago", actor: "Captain Usama", action: "Updated role of Bilal Ahmed to Operator", level: "info" },
  { time: "1 hr ago", actor: "Ayesha Rahim", action: "Created shipment SHP-2026-1842", level: "info" },
  { time: "3 hrs ago", actor: "Bilal Ahmed", action: "Uploaded document DOC-9921 to Vault", level: "info" },
  { time: "Yesterday", actor: "Captain Usama", action: "Suspended user Fatima Sheikh", level: "warn" },
  { time: "Yesterday", actor: "Sana Iqbal", action: "Failed login attempt (invalid password)", level: "error" },
  { time: "2 days ago", actor: "Captain Usama", action: "Invited Hamza Khan as Viewer", level: "info" },
  { time: "2 days ago", actor: "Ayesha Rahim", action: "Approved PO-2026-0142 ($48,250)", level: "info" },
  { time: "3 days ago", actor: "System", action: "Daily backup completed successfully", level: "info" },
];

const levelStyle: Record<string, string> = {
  info: "bg-blue-100 text-blue-700",
  warn: "bg-amber-100 text-amber-700",
  error: "bg-rose-100 text-rose-700",
};

const RBACAdmin = () => {
  const [tab, setTab] = useState<"users" | "permissions" | "audit">("users");
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("Operator");

  const filtered = users.filter(u => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  const updateRole = (id: string, role: Role) => {
    setUsers(users.map(u => u.id === id ? { ...u, role } : u));
    toast.success("Role updated");
  };
  const toggleStatus = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "Suspended" ? "Active" : "Suspended" } : u));
    toast.success("User status changed");
  };
  const sendInvite = () => {
    if (!inviteEmail) return toast.error("Email required");
    setUsers([...users, { id: `u${Date.now()}`, name: inviteEmail.split("@")[0], email: inviteEmail, role: inviteRole, status: "Invited", lastActive: "Pending", initials: inviteEmail.slice(0, 2).toUpperCase() }]);
    setShowInvite(false); setInviteEmail("");
    toast.success(`Invitation sent to ${inviteEmail}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-headline">User Management & Access Control</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage team members, roles, permissions, and audit history</p>
          </div>
          {tab === "users" && (
            <button onClick={() => setShowInvite(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold">
              <Plus className="w-4 h-4" /> Invite User
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Users", value: users.length, icon: Shield },
            { label: "Active", value: users.filter(u => u.status === "Active").length, icon: ShieldCheck },
            { label: "Pending Invites", value: users.filter(u => u.status === "Invited").length, icon: Mail },
            { label: "Suspended", value: users.filter(u => u.status === "Suspended").length, icon: Ban },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-border p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{s.label}</p>
                <s.icon className="w-4 h-4 text-primary" />
              </div>
              <p className="text-2xl font-bold font-headline mt-2">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-border">
          <div className="border-b border-border px-5 flex gap-6">
            {([
              { id: "users", label: "Users" },
              { id: "permissions", label: "Roles & Permissions" },
              { id: "audit", label: "Audit Log" },
            ] as const).map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`py-3 text-sm font-semibold border-b-2 transition-colors ${tab === t.id ? "text-primary border-primary" : "text-muted-foreground border-transparent hover:text-foreground"}`}>
                {t.label}
              </button>
            ))}
          </div>

          {tab === "users" && (
            <div>
              <div className="p-4 border-b border-border">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="w-full pl-9 pr-4 py-2 bg-muted rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-xs text-muted-foreground uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3 text-left font-semibold">User</th>
                    <th className="px-5 py-3 text-left font-semibold">Role</th>
                    <th className="px-5 py-3 text-left font-semibold">Status</th>
                    <th className="px-5 py-3 text-left font-semibold">Last Active</th>
                    <th className="px-5 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(u => (
                    <tr key={u.id} className="border-t border-border hover:bg-muted/30">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">{u.initials}</span>
                          </div>
                          <div>
                            <p className="font-semibold">{u.name}</p>
                            <p className="text-xs text-muted-foreground">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <select value={u.role} onChange={e => updateRole(u.id, e.target.value as Role)} className={`px-2 py-1 rounded-full text-xs font-semibold border-none outline-none cursor-pointer ${roleStyle[u.role]}`}>
                          {(["Admin", "Manager", "Operator", "Viewer"] as Role[]).map(r => <option key={r}>{r}</option>)}
                        </select>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusStyle[u.status]}`}>{u.status}</span>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">{u.lastActive}</td>
                      <td className="px-5 py-3 text-right">
                        <div className="inline-flex gap-1">
                          <button onClick={() => toast.info("Password reset link sent")} title="Reset password" className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-primary"><Key className="w-4 h-4" /></button>
                          <button onClick={() => toggleStatus(u.id)} title={u.status === "Suspended" ? "Reactivate" : "Suspend"} className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-rose-600"><Ban className="w-4 h-4" /></button>
                          <button className="p-1.5 hover:bg-muted rounded text-muted-foreground"><MoreVertical className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === "permissions" && (
            <div className="p-5">
              <p className="text-sm text-muted-foreground mb-4">Permission matrix across system modules. Edit a role to customize.</p>
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-xs text-muted-foreground uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Module</th>
                    <th className="px-4 py-3 text-center font-semibold">Admin</th>
                    <th className="px-4 py-3 text-center font-semibold">Manager</th>
                    <th className="px-4 py-3 text-center font-semibold">Operator</th>
                    <th className="px-4 py-3 text-center font-semibold">Viewer</th>
                  </tr>
                </thead>
                <tbody>
                  {permissions.map(p => (
                    <tr key={p.module} className="border-t border-border">
                      <td className="px-4 py-3 font-medium">{p.module}</td>
                      {(["Admin", "Manager", "Operator", "Viewer"] as const).map(r => {
                        const v = p[r];
                        const cls = v === "Full" ? "bg-emerald-100 text-emerald-700" : v === "Edit" ? "bg-blue-100 text-blue-700" : v === "Read" ? "bg-amber-100 text-amber-700" : "bg-muted text-muted-foreground";
                        return <td key={r} className="px-4 py-3 text-center"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${cls}`}>{v}</span></td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === "audit" && (
            <div className="divide-y divide-border">
              {auditLog.map((a, i) => (
                <div key={i} className="px-5 py-3 flex items-center gap-4 hover:bg-muted/30">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold uppercase ${levelStyle[a.level]}`}>{a.level}</span>
                  <div className="flex-1 text-sm"><span className="font-semibold">{a.actor}</span> · {a.action}</div>
                  <span className="text-xs text-muted-foreground">{a.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowInvite(false)}>
          <div className="bg-white rounded-xl border border-border p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold font-headline mb-4">Invite New User</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Email Address</label>
                <input type="email" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} placeholder="name@company.com" className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Role</label>
                <select value={inviteRole} onChange={e => setInviteRole(e.target.value as Role)} className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm bg-white">
                  {(["Admin", "Manager", "Operator", "Viewer"] as Role[]).map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowInvite(false)} className="px-4 py-2 border border-border rounded-lg text-sm font-semibold">Cancel</button>
              <button onClick={sendInvite} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold">Send Invite</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default RBACAdmin;
