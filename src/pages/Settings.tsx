import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Building2, Bell, Plug, Globe, Palette, Shield, Save, Key, Mail, Phone, User } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

const tabs = [
  { id: "profile", label: "My Profile", icon: User },
  { id: "agency", label: "Agency", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "localization", label: "Localization", icon: Globe },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "security", label: "Security", icon: Shield },
];

const Settings = () => {
  const userRole = localStorage.getItem("role");
  const [active, setActive] = useState("profile");
  const [loading, setLoading] = useState(false);
  
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
  });

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
    const fetchAllSettings = async () => {
      setLoading(true);
      try {
        // Fetch User Profile
        const meRes = await api.get("/auth/me");
        if (meRes.data.data) {
          setProfile({
            fullName: meRes.data.data.fullName,
            email: meRes.data.data.email,
          });
        }

        // Fetch Agency Settings (if master admin or higher)
        const agencyRes = await api.get("/settings/agency");
        if (agencyRes.data.data) {
          setAgency(agencyRes.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllSettings();
  }, []);

  const saveAgency = async () => {
    try {
      await api.patch("/settings/agency", agency);
      toast.success("Agency settings saved successfully");
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to save settings";
      toast.error(msg);
    }
  };

  const saveProfile = async () => {
    try {
      // Note: Backend might need a route for updating profile
      await api.patch("/auth/me", profile);
      toast.success("Profile updated successfully");
      
      // Update local storage too
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem("user", JSON.stringify({ ...user, ...profile }));
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to update profile";
      toast.error(msg);
    }
  };

  return (
    <DashboardLayout title="Settings">
      <div className="grid grid-cols-1 lg:grid-cols-[240px,1fr] gap-6 max-w-6xl">
        {/* Sidebar tabs */}
        <aside className="bg-white rounded-xl border border-border p-3 h-fit">
          {tabs.map(t => {
            // Hide Agency tab if not Master Admin
            if (t.id === "agency" && userRole !== "MASTER_ADMIN") return null;
            
            return (
              <button 
                key={t.id} 
                onClick={() => setActive(t.id)} 
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${active === t.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </aside>

        <section className="bg-white rounded-xl border border-border p-6 md:p-8">
          {active === "profile" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold font-headline">My Profile</h2>
                <p className="text-sm text-muted-foreground mt-1">Manage your personal account settings.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Full Name</label>
                  <input 
                    value={profile.fullName} 
                    onChange={e => setProfile({ ...profile, fullName: e.target.value })} 
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Email Address</label>
                  <input 
                    value={profile.email} 
                    disabled
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted/50 text-muted-foreground outline-none text-sm cursor-not-allowed" 
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-border">
                <button onClick={saveProfile} className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold flex items-center gap-2">
                  <Save className="w-4 h-4" /> Save Profile
                </button>
              </div>
            </div>
          )}

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
                <button onClick={saveAgency} className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold flex items-center gap-2"><Save className="w-4 h-4" /> Save Changes</button>
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
            </div>
          )}

          {/* Other tabs remain static for now as they are placeholder sections */}
          {(active === "localization" || active === "appearance" || active === "security") && (
            <div className="p-12 text-center">
              <p className="text-muted-foreground italic">Configuration section for {active} is coming soon in the next update.</p>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
