import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Bell, CheckCheck, Filter, Ship, FileText, AlertTriangle, DollarSign, Users, Settings as SettingsIcon } from "lucide-react";
import { toast } from "sonner";

type NotifType = "shipment" | "document" | "alert" | "payment" | "user";

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const seed: Notification[] = [
  { id: "n1", type: "shipment", title: "Shipment SHP-2026-1842 arrived at Karachi Port", body: "Container MSCU 8842919 cleared customs. Pickup scheduled.", time: "5 min ago", read: false },
  { id: "n2", type: "alert", title: "Document expiring soon", body: "Insurance certificate for SHP-2026-1839 expires in 3 days.", time: "1 hr ago", read: false },
  { id: "n3", type: "payment", title: "Payment received: PKR 1,245,000", body: "From Lahore Traders Pvt Ltd against SO-2026-0089.", time: "2 hrs ago", read: false },
  { id: "n4", type: "document", title: "New document uploaded", body: "Bilal Ahmed uploaded Bill of Lading for SHP-2026-1840.", time: "4 hrs ago", read: true },
  { id: "n5", type: "user", title: "Hamza Khan accepted your invitation", body: "New user joined as Viewer.", time: "Yesterday", read: true },
  { id: "n6", type: "alert", title: "Vessel delay detected", body: "MV Maersk Houston delayed by 36 hrs due to weather.", time: "Yesterday", read: true },
  { id: "n7", type: "shipment", title: "Customs clearance approved", body: "GD KAPE-441230 approved by FBR.", time: "2 days ago", read: true },
  { id: "n8", type: "payment", title: "Invoice overdue", body: "INV-2026-0312 from Hamburg Machinery is 5 days overdue.", time: "2 days ago", read: true },
];

const typeIcon: Record<NotifType, { icon: typeof Ship; color: string; bg: string }> = {
  shipment: { icon: Ship, color: "text-blue-700", bg: "bg-blue-100" },
  document: { icon: FileText, color: "text-violet-700", bg: "bg-violet-100" },
  alert: { icon: AlertTriangle, color: "text-amber-700", bg: "bg-amber-100" },
  payment: { icon: DollarSign, color: "text-emerald-700", bg: "bg-emerald-100" },
  user: { icon: Users, color: "text-rose-700", bg: "bg-rose-100" },
};

const Notifications = () => {
  const [items, setItems] = useState(seed);
  const [filter, setFilter] = useState<"all" | "unread" | NotifType>("all");
  const [prefs, setPrefs] = useState({
    shipmentUpdates: true,
    documentAlerts: true,
    paymentEvents: true,
    systemAlerts: true,
    weeklyDigest: false,
    emailNotifications: true,
    smsAlerts: false,
  });

  const filtered = items.filter(n => filter === "all" || (filter === "unread" ? !n.read : n.type === filter));
  const unreadCount = items.filter(n => !n.read).length;

  const markAllRead = () => {
    setItems(items.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };
  const toggle = (id: string) => setItems(items.map(n => n.id === id ? { ...n, read: !n.read } : n));

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-headline flex items-center gap-3">
              Notifications
              {unreadCount > 0 && <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">{unreadCount} new</span>}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Stay on top of shipment events, document alerts, and team activity</p>
          </div>
          <button onClick={markAllRead} className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-semibold">
            <CheckCheck className="w-4 h-4" /> Mark all read
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notifications List */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-border">
            <div className="p-4 border-b border-border flex flex-wrap gap-2">
              {([
                { id: "all", label: "All" },
                { id: "unread", label: `Unread (${unreadCount})` },
                { id: "shipment", label: "Shipments" },
                { id: "document", label: "Documents" },
                { id: "alert", label: "Alerts" },
                { id: "payment", label: "Payments" },
              ] as const).map(f => (
                <button key={f.id} onClick={() => setFilter(f.id as typeof filter)} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${filter === f.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                  {f.label}
                </button>
              ))}
            </div>

            <div className="divide-y divide-border">
              {filtered.map(n => {
                const meta = typeIcon[n.type];
                const Icon = meta.icon;
                return (
                  <button key={n.id} onClick={() => toggle(n.id)} className={`w-full text-left px-5 py-4 flex gap-3 hover:bg-muted/30 transition-colors ${!n.read ? "bg-primary/[0.02]" : ""}`}>
                    <div className={`w-10 h-10 rounded-xl ${meta.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${meta.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-sm ${!n.read ? "font-bold" : "font-semibold text-muted-foreground"}`}>{n.title}</p>
                        {!n.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{n.body}</p>
                      <p className="text-xs text-muted-foreground mt-1.5">{n.time}</p>
                    </div>
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <div className="px-5 py-12 text-center text-muted-foreground">
                  <Bell className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No notifications match this filter.</p>
                </div>
              )}
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-xl border border-border p-6 h-fit">
            <div className="flex items-center gap-2 mb-4">
              <SettingsIcon className="w-4 h-4 text-primary" />
              <h2 className="font-bold font-headline">Preferences</h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">In-App</p>
                {[
                  { key: "shipmentUpdates", label: "Shipment updates" },
                  { key: "documentAlerts", label: "Document alerts" },
                  { key: "paymentEvents", label: "Payment events" },
                  { key: "systemAlerts", label: "System alerts" },
                ].map(p => (
                  <label key={p.key} className="flex items-center justify-between py-2 cursor-pointer">
                    <span className="text-sm">{p.label}</span>
                    <input type="checkbox" checked={prefs[p.key as keyof typeof prefs]} onChange={e => setPrefs({ ...prefs, [p.key]: e.target.checked })} className="w-9 h-5 appearance-none bg-muted rounded-full relative cursor-pointer transition-colors checked:bg-primary before:content-[''] before:absolute before:w-4 before:h-4 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 before:transition-transform checked:before:translate-x-4" />
                  </label>
                ))}
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Channels</p>
                {[
                  { key: "emailNotifications", label: "Email notifications" },
                  { key: "smsAlerts", label: "SMS alerts" },
                  { key: "weeklyDigest", label: "Weekly digest" },
                ].map(p => (
                  <label key={p.key} className="flex items-center justify-between py-2 cursor-pointer">
                    <span className="text-sm">{p.label}</span>
                    <input type="checkbox" checked={prefs[p.key as keyof typeof prefs]} onChange={e => setPrefs({ ...prefs, [p.key]: e.target.checked })} className="w-9 h-5 appearance-none bg-muted rounded-full relative cursor-pointer transition-colors checked:bg-primary before:content-[''] before:absolute before:w-4 before:h-4 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 before:transition-transform checked:before:translate-x-4" />
                  </label>
                ))}
              </div>

              <button onClick={() => toast.success("Preferences saved")} className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold">
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
