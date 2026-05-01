import { Link } from "react-router-dom";
import { Ship, FileText, MessageSquare, LogOut, Bell, Download, MapPin, CheckCircle2, Clock, Truck, Anchor, Package } from "lucide-react";
import logo from "@/assets/logo.png";

const myShipments = [
  { id: "SHP-2026-1842", desc: "200 cartons · Auto parts", route: "Shanghai → Karachi", status: "In Transit", progress: 60, eta: "May 3, 2026" },
  { id: "SHP-2026-1838", desc: "12 pallets · Electronics", route: "Hong Kong → Karachi", status: "Customs Clearance", progress: 80, eta: "May 1, 2026" },
  { id: "SHP-2026-1820", desc: "6 containers · Textiles", route: "Karachi → Dubai", status: "Delivered", progress: 100, eta: "Apr 22, 2026" },
];

const stages = [
  { label: "Order Confirmed", icon: CheckCircle2 },
  { label: "Picked Up", icon: Package },
  { label: "In Transit", icon: Ship },
  { label: "Customs", icon: Anchor },
  { label: "Delivered", icon: Truck },
];

const docs = [
  { name: "Commercial Invoice — INV-1842", date: "Apr 24" },
  { name: "Bill of Lading — BL-MSCU8842", date: "Apr 25" },
  { name: "Packing List", date: "Apr 24" },
  { name: "Certificate of Origin", date: "Apr 26" },
];

const ClientPortal = () => {
  return (
    <div className="min-h-screen bg-[hsl(210,33%,98%)]">
      {/* Top bar */}
      <header className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-9 w-9 rounded-lg" />
            <div>
              <p className="text-sm font-bold font-headline leading-tight">AL-Usama-Import and Export System</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Client Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-muted-foreground"><Bell className="w-5 h-5" /><span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500" /></button>
            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">Lahore Traders</p>
                <p className="text-[11px] text-muted-foreground">Client</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">LT</div>
            </div>
            <Link to="/login" className="text-muted-foreground"><LogOut className="w-5 h-5" /></Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* Welcome */}
        <div className="rounded-2xl gradient-primary text-primary-foreground p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">Welcome back</p>
            <h1 className="text-2xl md:text-3xl font-headline font-extrabold mt-1">Lahore Traders Pvt Ltd</h1>
            <p className="text-sm opacity-90 mt-2">You have <strong>2 active shipments</strong> and <strong>1 awaiting your approval</strong>.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-full bg-white text-primary font-semibold text-sm">Request Quote</button>
            <button className="px-4 py-2 rounded-full bg-white/15 backdrop-blur text-white font-semibold text-sm border border-white/20">Contact Agent</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Active shipments", value: "2", color: "text-blue-600" },
            { label: "Delivered (YTD)", value: "18", color: "text-emerald-600" },
            { label: "Documents", value: "47", color: "text-violet-600" },
            { label: "Outstanding (PKR)", value: "245K", color: "text-amber-600" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-border p-4">
              <p className={`text-2xl font-bold font-headline ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* My shipments */}
        <div className="bg-white rounded-xl border border-border">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-bold font-headline">My Shipments</h2>
            <a href="#" className="text-sm text-primary font-semibold">View all</a>
          </div>
          <div className="divide-y divide-border">
            {myShipments.map(s => (
              <div key={s.id} className="p-6 hover:bg-muted/20 transition">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                  <div>
                    <p className="font-bold text-sm">{s.id}</p>
                    <p className="text-xs text-muted-foreground">{s.desc} · <MapPin className="w-3 h-3 inline" /> {s.route}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${s.progress === 100 ? "bg-emerald-100 text-emerald-700" : s.progress >= 80 ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>{s.status}</span>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 justify-end"><Clock className="w-3 h-3" /> ETA {s.eta}</p>
                  </div>
                </div>
                {/* Stage tracker */}
                <div className="relative">
                  <div className="absolute top-4 left-4 right-4 h-0.5 bg-muted">
                    <div className="h-full bg-primary transition-all" style={{ width: `${s.progress}%` }} />
                  </div>
                  <div className="relative grid grid-cols-5 gap-2">
                    {stages.map((st, i) => {
                      const reached = (i + 1) * 20 <= s.progress;
                      return (
                        <div key={st.label} className="flex flex-col items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 ${reached ? "bg-primary border-primary text-primary-foreground" : "bg-white border-muted text-muted-foreground"}`}>
                            <st.icon className="w-3.5 h-3.5" />
                          </div>
                          <p className={`text-[10px] font-semibold text-center ${reached ? "text-foreground" : "text-muted-foreground"}`}>{st.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4"><FileText className="w-4 h-4 text-primary" /><h3 className="font-bold font-headline">My Documents</h3></div>
            <div className="space-y-2">
              {docs.map(d => (
                <div key={d.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/40 transition">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">{d.name}</p>
                      <p className="text-xs text-muted-foreground">{d.date}</p>
                    </div>
                  </div>
                  <button className="text-primary"><Download className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4"><MessageSquare className="w-4 h-4 text-primary" /><h3 className="font-bold font-headline">Messages from your Agent</h3></div>
            <div className="space-y-3">
              {[
                { from: "Hamza Khan", msg: "Vessel docked at Karachi Port. Customs paperwork submitted.", time: "1h ago" },
                { from: "Bilal Ahmed", msg: "Please confirm delivery address for SHP-2026-1842.", time: "Yesterday" },
              ].map((m, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold">{m.from}</p>
                    <p className="text-xs text-muted-foreground">{m.time}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{m.msg}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold">Open Conversation</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientPortal;
