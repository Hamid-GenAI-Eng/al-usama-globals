import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Building2, Phone, Globe, Camera, ShieldCheck, ArrowLeft, Save } from "lucide-react";
import logo from "@/assets/logo.png";
import AuthFooter from "@/components/AuthFooter";

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <nav className="border-b border-border bg-background px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Al-Usama" className="h-8 w-auto" />
          <span className="text-lg font-extrabold text-foreground font-headline tracking-tight">
            Al-Usama Logistics
          </span>
        </div>
        <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </nav>

      <div className="flex-1 max-w-4xl mx-auto w-full py-10 px-4">
        <h1 className="text-3xl font-extrabold text-foreground font-headline">Profile Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm">Manage your account information and security preferences.</p>

        {/* Tabs */}
        <div className="flex gap-6 mt-8 border-b border-border">
          {[
            { key: "profile" as const, label: "Profile Information", icon: User },
            { key: "security" as const, label: "Security", icon: ShieldCheck },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 pb-3 px-1 text-sm font-semibold transition-all border-b-2 ${
                activeTab === tab.key
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "profile" && (
          <div className="mt-8 space-y-8">
            {/* Avatar */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary font-headline">
                  AU
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full gradient-primary text-primary-foreground flex items-center justify-center shadow-lg">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h3 className="font-bold text-foreground">Admin User</h3>
                <p className="text-sm text-muted-foreground">admin@al-usama.com</p>
              </div>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      defaultValue="Admin User"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      defaultValue="admin@al-usama.com"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                    Company
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      defaultValue="AL-Usama-Import and Export System Logistics"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="tel"
                      defaultValue="+971 50 123 4567"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                  Language Preference
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <select className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none">
                    <option>English</option>
                    <option>العربية</option>
                    <option>Français</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="gradient-primary text-primary-foreground px-8 py-3 rounded-full font-headline font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-all"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "security" && (
          <div className="mt-8 space-y-8">
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="font-bold text-foreground text-lg font-headline">Change Password</h3>
              <p className="text-sm text-muted-foreground mt-1">Update your password to maintain account security.</p>

              <form className="mt-6 space-y-5 max-w-md" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="gradient-primary text-primary-foreground px-8 py-3 rounded-full font-headline font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-all"
                >
                  Update Password
                </button>
              </form>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="font-bold text-foreground text-lg font-headline">Active Sessions</h3>
              <p className="text-sm text-muted-foreground mt-1">Manage devices where you're currently logged in.</p>
              <div className="mt-4 space-y-3">
                {[
                  { device: "Chrome on Windows", location: "Dubai, UAE", current: true },
                  { device: "Safari on iPhone", location: "Riyadh, KSA", current: false },
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{session.device}</p>
                      <p className="text-xs text-muted-foreground">{session.location}</p>
                    </div>
                    {session.current ? (
                      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Current</span>
                    ) : (
                      <button className="text-xs text-destructive hover:underline font-medium">Revoke</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <AuthFooter />
    </div>
  );
};

export default ProfileSettings;
