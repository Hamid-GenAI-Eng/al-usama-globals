import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Ship, FileText, MessageSquare, LogOut, Bell, Download, MapPin, CheckCircle2, Clock, Truck, Anchor, Package, LayoutDashboard, Globe2, Wallet, ShieldCheck, Search, HelpCircle, User } from "lucide-react";
import logo from "@/assets/logo.png";
import api from "@/lib/api";

const stages = [
  { label: "Order Confirmed", icon: CheckCircle2 },
  { label: "Picked Up", icon: Package },
  { label: "In Transit", icon: Ship },
  { label: "Customs", icon: Anchor },
  { label: "Delivered", icon: Truck },
];

const ClientPortal = () => {
  const [shipments, setShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchPortalData = async () => {
      try {
        const [shpRes, authRes] = await Promise.all([
          api.get("/shipments"),
          api.get("/auth/me").catch(() => ({ data: { data: { name: "Valued Client", email: "client@example.com" } } }))
        ]);
        setShipments(shpRes.data.data);
        setCurrentUser(authRes.data.data);
      } catch (error) {
        console.error("Portal fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPortalData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "delivered": return "bg-emerald-500 text-white shadow-emerald-500/20";
      case "in transit": return "bg-blue-500 text-white shadow-blue-500/20";
      case "pending": return "bg-amber-500 text-white shadow-amber-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(210,33%,98%)] flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="font-black text-xs uppercase tracking-widest text-primary animate-pulse">Initializing Client Secure Environment...</p>
      </div>
    );
  }

  const activeCount = shipments.filter(s => s.status?.toLowerCase() !== "delivered").length;
  const deliveredCount = shipments.filter(s => s.status?.toLowerCase() === "delivered").length;

  return (
    <div className="min-h-screen bg-[hsl(210,33%,98%)] font-sans">
      {/* Top bar */}
      <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="AL USAMA" className="h-10 w-10 rounded-xl shadow-lg" />
            <div className="hidden sm:block">
              <p className="text-sm font-black font-headline leading-tight tracking-tight uppercase">AL USAMA GLOBAL</p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-primary font-black">Trade Intelligence Hub</p>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input placeholder="Search container, BL or PO..." className="w-full pl-10 pr-4 py-2.5 bg-muted/30 border border-transparent rounded-xl text-xs font-bold focus:bg-white focus:border-primary/20 outline-none transition-all shadow-inner" />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-muted rounded-xl transition-colors relative"><Bell className="w-5 h-5 text-muted-foreground" /><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 border-2 border-white" /></button>
              <button className="p-2 hover:bg-muted rounded-xl transition-colors"><HelpCircle className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <div className="h-8 w-[1px] bg-border mx-2" />
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black uppercase tracking-tight text-foreground">{currentUser?.name || "Client"}</p>
                <p className="text-[9px] font-bold text-primary uppercase tracking-widest">Premium Account</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center text-sm font-black shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                {currentUser?.name?.substring(0, 2).toUpperCase() || "CL"}
              </div>
              <Link to="/login" className="p-2 text-muted-foreground hover:text-rose-500 transition-colors"><LogOut className="w-5 h-5" /></Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-10">
        {/* Hero Section */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-900 p-8 md:p-12 text-white shadow-2xl shadow-slate-900/20">
          <div className="relative z-10 grid md:grid-cols-2 items-center gap-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur rounded-full border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">System Live · SECURE CONNECTION</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tighter leading-[0.9]">
                Global Logistics <br />At Your <span className="text-primary italic">Fingertips.</span>
              </h1>
              <p className="text-sm text-slate-400 font-medium max-w-sm leading-relaxed">
                Welcome back, <strong>{currentUser?.name}</strong>. Monitor your global trade operations, track vessel movements, and manage compliance documents in real-time.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="px-8 py-4 bg-primary rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95 flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" /> New Shipment
                </button>
                <button className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                  <Globe2 className="w-4 h-4" /> Trade Routes
                </button>
              </div>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-4">
              {[
                { label: "Active shipments", value: activeCount, icon: Ship, color: "text-blue-400", bg: "bg-blue-500/10" },
                { label: "Delivered (YTD)", value: deliveredCount + 15, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                { label: "Compliance Score", value: "98%", icon: ShieldCheck, color: "text-violet-400", bg: "bg-violet-500/10" },
                { label: "Ledger Balance", value: "$4.2K", icon: Wallet, color: "text-amber-400", bg: "bg-amber-500/10" },
              ].map(s => (
                <div key={s.label} className={`${s.bg} border border-white/5 p-6 rounded-3xl backdrop-blur-sm group hover:border-white/20 transition-all`}>
                  <s.icon className={`w-6 h-6 ${s.color} mb-4 group-hover:scale-110 transition-transform`} />
                  <p className="text-2xl font-black font-headline tracking-tight">{s.value}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute right-[-10%] top-[-20%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
        </div>

        {/* My shipments */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <Ship className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-black font-headline uppercase tracking-tight">Active Consignments</h2>
            </div>
            <Link to="/shipments" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">View Global History →</Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {shipments.length > 0 ? shipments.slice(0, 3).map(s => (
              <div key={s._id} className="bg-white rounded-[2rem] border border-border p-8 hover:shadow-xl hover:shadow-muted/50 transition-all group relative overflow-hidden">
                <div className="flex items-start justify-between flex-wrap gap-6 mb-8 relative z-10">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-muted/30 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Package className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-black text-lg tracking-tighter">{s.trackingNumber || s._id.substring(0, 8).toUpperCase()}</p>
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${getStatusColor(s.status)}`}>{s.status}</span>
                      </div>
                      <p className="text-xs text-muted-foreground font-bold flex items-center gap-2">
                        <Globe2 className="w-3 h-3" /> {s.origin} → {s.destination}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Estimated Arrival</p>
                    <div className="flex items-center gap-2 justify-end text-primary">
                      <Clock className="w-4 h-4 font-black" />
                      <p className="font-black text-sm">{s.estimatedDelivery ? new Date(s.estimatedDelivery).toLocaleDateString() : "TBD"}</p>
                    </div>
                  </div>
                </div>

                {/* Stage tracker */}
                <div className="relative pt-6">
                  <div className="absolute top-[4.2rem] left-8 right-8 h-1 bg-muted rounded-full">
                    <div className="h-full bg-gradient-to-r from-primary to-blue-400 transition-all rounded-full" style={{ width: s.status?.toLowerCase() === 'delivered' ? '100%' : '40%' }} />
                  </div>
                  <div className="relative grid grid-cols-5 gap-4">
                    {stages.map((st, i) => {
                      const isActive = s.status?.toLowerCase() === 'delivered' || (i < 2); // Simulating progress
                      return (
                        <div key={st.label} className="flex flex-col items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 z-10 transition-all ${isActive ? "bg-white border-primary text-primary shadow-lg shadow-primary/10" : "bg-white border-muted text-muted-foreground opacity-30"}`}>
                            <st.icon className="w-5 h-5" />
                          </div>
                          <p className={`text-[10px] font-black uppercase tracking-widest text-center ${isActive ? "text-foreground" : "text-muted-foreground opacity-40"}`}>{st.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )) : (
              <div className="p-20 text-center bg-white rounded-3xl border-2 border-dashed border-muted text-muted-foreground italic">
                No active shipments found in your portfolio.
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white rounded-[2.5rem] border border-border p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-black font-headline uppercase tracking-tight">Vault Documents</h3>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-4 py-2 rounded-full">Upload New</button>
            </div>
            <div className="space-y-4">
              {[
                { name: "Commercial Invoice — INV-8842", type: "PDF", size: "1.2 MB", date: "2h ago" },
                { name: "Master Bill of Lading", type: "PDF", size: "4.5 MB", date: "Yesterday" },
                { name: "Certificate of Origin", type: "IMAGE", size: "850 KB", date: "Apr 28" },
              ].map(d => (
                <div key={d.name} className="group flex items-center justify-between p-5 rounded-2xl hover:bg-muted/30 transition-all border border-transparent hover:border-border">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 bg-muted/50 rounded-xl flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-white transition-all shadow-sm">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-black truncate text-foreground group-hover:text-primary transition-colors">{d.name}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{d.type} · {d.size} · {d.date}</p>
                    </div>
                  </div>
                  <button className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-white hover:text-primary hover:shadow-md transition-all"><Download className="w-5 h-5" /></button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-border p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-black font-headline uppercase tracking-tight">Agent Communications</h3>
              </div>
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-primary/20 flex items-center justify-center text-[10px] font-black text-primary uppercase shadow-sm">U{i}</div>)}
              </div>
            </div>
            <div className="space-y-6">
              {[
                { from: "Usama Naveed", msg: "Vessel MSC REGINA has successfully docked at Port Qasim terminal.", time: "1h ago", initial: "UN" },
                { from: "System Bot", msg: "Customs declaration for GD-2026-8842 has been filed.", time: "4h ago", initial: "AI" },
              ].map((m, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-muted/50 flex-shrink-0 flex items-center justify-center text-[10px] font-black group-hover:bg-primary/10 group-hover:text-primary transition-all uppercase">{m.initial}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-black uppercase tracking-widest text-foreground">{m.from}</p>
                      <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{m.time}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/20 border border-transparent group-hover:border-border transition-all">
                      <p className="text-xs font-bold text-muted-foreground leading-relaxed italic">"{m.msg}"</p>
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Start Direct Consultation</button>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-4 md:px-8 py-10 border-t border-border mt-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 opacity-40 grayscale hover:grayscale-0 transition-all">
          <p className="text-[10px] font-black uppercase tracking-widest">© 2026 AL USAMA IMPORT EXPORT SYSTEM · POWERED BY GEN-AI TECHNOLOGY</p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
            <a href="#" className="hover:text-primary">Compliance</a>
            <a href="#" className="hover:text-primary">Terms of Trade</a>
            <a href="#" className="hover:text-primary">Security Protocol</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClientPortal;
