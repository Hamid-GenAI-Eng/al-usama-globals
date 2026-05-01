import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Building2, Bell, Plug, Globe, Palette, Shield, Save, Key, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

const tabs = [
  { id: "agency", label: "Agency", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "localization", label: "Localization", icon: Globe },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "security", label: "Security", icon: Shield },
];

const Settings = () => {
  const [active, setActive] = useState("agency");
  const [loading, setLoading] = useState(false);
  const [agency, setAgency] = useState({
    name: "AL-Usama-Import and Export System",
    legalName: "AL-Usama Trading Co. (Pvt) Ltd",
    ntn: "1234567-8",
    strn: "0987654321",
    address: "Suite 401, Trade Centre, I.I. Chundrigar Rd, Karachi 74000",
    phone: "+92 21 3263 4500",
    email: "ops@al-usama.com",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const response = await api.get("/settings/agency");
        if (response.data.data) {
          setAgency(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const save = async () => {
    try {
      await api.patch("/settings/agency", agency);
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings");
    }
  };

  return (
    <DashboardLayout title="Settings">
      <div className="grid grid-cols-1 lg:grid-cols-[240px,1fr] gap-6 max-w-6xl">
        {/* Sidebar tabs */}
        <aside className="bg-white rounded-xl border border-border p-3 h-fit">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${active === t.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}>
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </aside>

        <section className="bg-white rounded-xl border border-border p-6 md:p-8">
          {active === "agency" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold font-headline">Agency Details</h2>
                <p className="text-sm text-muted-foreground mt-1">Used on auto-generated invoices, declarations, and reports.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ["Display Name", "name"], ["Legal Name", "legalName"],
                  ["NTN", "ntn"], ["STRN", "strn"],
                  ["Phone", "phone"], ["Operations Email", "email"],
                ].map(([label, key]) => (
                  <div key={key}>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">{label}</label>
                    <input value={agency[key as keyof typeof agency]} onChange={e => setAgency({ ...agency, [key]: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm" />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Registered Address</label>
                  <textarea value={agency.address} onChange={e => setAgency({ ...agency, address: e.target.value })} rows={2} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm" />
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-border">
                <button onClick={save} className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold flex items-center gap-2"><Save className="w-4 h-4" /> Save Changes</button>
              </div>
            </div>
          )}

          {active === "notifications" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold font-headline">Notification Preferences</h2>
                <p className="text-sm text-muted-foreground mt-1">Choose how the system should reach you.</p>
              </div>
              {[
                { title: "Shipment status changes", desc: "Notify when a shipment moves to a new stage.", channels: ["email", "inapp"] },
                { title: "Customs clearance updates", desc: "FBR / WEBOC declaration approvals or queries.", channels: ["email", "inapp", "sms"] },
                { title: "Document uploads", desc: "When team members upload new documents.", channels: ["inapp"] },
                { title: "Payment events", desc: "Invoice paid, overdue, or refund issued.", channels: ["email", "inapp"] },
                { title: "Weekly digest", desc: "Summary of operational activity every Monday.", channels: ["email"] },
              ].map((row, i) => (
                <div key={i} className="flex items-start justify-between gap-4 py-4 border-b border-border last:border-0">
                  <div>
                    <p className="font-semibold text-sm">{row.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{row.desc}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {[
                      { id: "email", label: "Email", icon: Mail },
                      { id: "inapp", label: "In-App", icon: Bell },
                      { id: "sms", label: "SMS", icon: Phone },
                    ].map(c => {
                      const enabled = row.channels.includes(c.id);
                      return (
                        <button key={c.id} className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${enabled ? "bg-primary/10 text-primary border border-primary/20" : "bg-muted text-muted-foreground border border-transparent"}`}>
                          <c.icon className="w-3.5 h-3.5" /> {c.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              <div className="flex justify-end"><button onClick={save} className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold flex items-center gap-2"><Save className="w-4 h-4" /> Save</button></div>
            </div>
          )}

          {active === "integrations" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold font-headline">API Integrations</h2>
                <p className="text-sm text-muted-foreground mt-1">Connect external services to automate workflows.</p>
              </div>
              {[
                { name: "WEBOC Customs", desc: "Pakistan Customs declaration filing", status: "connected", color: "bg-emerald-100 text-emerald-700" },
                { name: "FBR e-Filing", desc: "Tax declaration & duty payment", status: "connected", color: "bg-emerald-100 text-emerald-700" },
                { name: "State Bank of Pakistan", desc: "Live exchange rate feed", status: "connected", color: "bg-emerald-100 text-emerald-700" },
                { name: "MarineTraffic", desc: "Vessel position tracking", status: "available", color: "bg-slate-100 text-slate-700" },
                { name: "DHL / Maersk APIs", desc: "Carrier shipment tracking", status: "available", color: "bg-slate-100 text-slate-700" },
                { name: "Cloudinary", desc: "Document & image storage", status: "connected", color: "bg-emerald-100 text-emerald-700" },
              ].map(i => (
                <div key={i.name} className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-muted/30 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center"><Plug className="w-5 h-5 text-primary" /></div>
                    <div>
                      <p className="font-semibold text-sm">{i.name}</p>
                      <p className="text-xs text-muted-foreground">{i.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${i.color}`}>{i.status}</span>
                    <button className="px-3 py-1.5 border border-border rounded-lg text-xs font-semibold">{i.status === "connected" ? "Manage" : "Connect"}</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {active === "localization" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold font-headline">Localization</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ["Default Language", ["English", "اردو", "العربية"]],
                  ["Default Currency", ["PKR", "USD", "EUR", "AED"]],
                  ["Date Format", ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]],
                  ["Number Format", ["1,234.56", "1.234,56", "12,34,567.89"]],
                  ["Timezone", ["Asia/Karachi (PKT)", "Asia/Dubai", "Europe/London", "UTC"]],
                  ["Fiscal Year Start", ["July", "January", "April"]],
                ].map(([label, opts]) => (
                  <div key={label as string}>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">{label}</label>
                    <select className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm">
                      {(opts as string[]).map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <div className="flex justify-end"><button onClick={save} className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold flex items-center gap-2"><Save className="w-4 h-4" /> Save</button></div>
            </div>
          )}

          {active === "appearance" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold font-headline">Appearance</h2>
              <div>
                <label className="block text-sm font-semibold mb-3">Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  {["Light", "Dark", "System"].map((t, i) => (
                    <button key={t} className={`p-4 rounded-xl border-2 transition ${i === 0 ? "border-primary bg-primary/5" : "border-border"}`}>
                      <div className={`h-16 rounded-lg mb-2 ${i === 0 ? "bg-white border border-border" : i === 1 ? "bg-slate-900" : "bg-gradient-to-br from-white to-slate-900"}`} />
                      <p className="text-sm font-semibold">{t}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-3">Accent Color</label>
                <div className="flex gap-3">
                  {["#0040d4", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444", "#0ea5e9"].map((c, i) => (
                    <button key={c} className={`w-10 h-10 rounded-full transition ${i === 0 ? "ring-2 ring-offset-2 ring-foreground" : ""}`} style={{ background: c }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {active === "security" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold font-headline">Security</h2>
              {[
                { title: "Two-Factor Authentication", desc: "Require 2FA for all admin accounts.", enabled: true },
                { title: "Session Timeout", desc: "Auto-logout after 30 minutes of inactivity.", enabled: true },
                { title: "IP Whitelisting", desc: "Only allow access from approved IPs.", enabled: false },
                { title: "Force Password Rotation", desc: "Require password change every 90 days.", enabled: true },
                { title: "Audit Log Retention", desc: "Keep activity logs for 365 days.", enabled: true },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="font-semibold text-sm">{row.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{row.desc}</p>
                  </div>
                  <input type="checkbox" defaultChecked={row.enabled} className="w-11 h-6 appearance-none bg-muted rounded-full relative cursor-pointer transition-colors checked:bg-primary before:content-[''] before:absolute before:w-5 before:h-5 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 before:transition-transform checked:before:translate-x-5" />
                </div>
              ))}
              <div className="p-4 bg-muted/40 rounded-xl flex items-start gap-3">
                <Key className="w-5 h-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">API Keys</p>
                  <p className="text-xs text-muted-foreground">3 active keys. Last rotated 14 days ago.</p>
                </div>
                <button className="px-3 py-1.5 border border-border rounded-lg text-xs font-semibold">Manage</button>
              </div>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
