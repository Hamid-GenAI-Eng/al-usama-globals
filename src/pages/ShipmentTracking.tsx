import { Link, useParams } from "react-router-dom";
import { Download, Share2, Ship, CheckCircle, Anchor, ShieldCheck, Truck, Package, Calendar, Weight, Shield } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import vesselImg from "@/assets/vessel-tracking.jpg";

const timeline = [
  { date: "SEP 12, 09:15 AM", label: "Ordered", detail: "Shanghai, China • Manifest #SGH-002 confirmed by vendor.", icon: CheckCircle, done: true, color: "bg-green-500" },
  { date: "SEP 14, 02:30 PM", label: "Processed", detail: "Shanghai Warehouse • Export documentation finalized and container sealed.", icon: CheckCircle, done: true, color: "bg-green-500" },
  { date: "OCT 18, 11:00 AM (CURRENT)", label: "In Transit", detail: "Gulf of Aden • En route to Dubai Port. Vessel \"Ever-Forward\" maintaining speed.", icon: Ship, done: true, active: true, color: "bg-primary" },
  { date: "ESTIMATED OCT 22", label: "Customs Clearance", detail: "Jebel Ali Port, Dubai • Awaiting arrival for automated AI inspection.", icon: ShieldCheck, done: false, color: "bg-muted" },
  { date: "ESTIMATED OCT 23", label: "Out for Delivery", detail: "Dubai Logistics Hub • Transfer to regional last-mile fleet.", icon: Truck, done: false, color: "bg-muted" },
  { date: "ESTIMATED OCT 24", label: "Delivered", detail: "London, UK • Final destination: Al-Usama Terminal 4.", icon: Package, done: false, color: "bg-muted" },
];

const manifestItems = [
  { name: "Architectural Steel Beams - Type A4", qty: "450 Units", hs: "7308.90", weight: "8,200 kg", value: "$124,500.00" },
  { name: "Reinforced Glass Paneling - UV Filtered", qty: "120 Crates", hs: "7007.21", weight: "6,050 kg", value: "$89,200.00" },
];

const ShipmentTracking = () => {
  const { id } = useParams();

  return (
    <DashboardLayout showSearch>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <Link to="/shipments" className="text-muted-foreground hover:text-foreground uppercase text-[11px] font-bold tracking-wider">Shipments</Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-primary font-semibold text-[11px] uppercase tracking-wider">{id || "SHP-92831"}</span>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-bold font-headline text-foreground">
            Vessel Transit <span className="text-primary">#{id || "SHP-92831"}</span>
          </h1>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-semibold text-foreground hover:bg-muted transition-colors">
              <Download className="w-4 h-4" />
              Download BOL
            </button>
            <button className="gradient-primary text-white px-4 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:opacity-90">
              <Share2 className="w-4 h-4" />
              Share Tracking
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vessel hero */}
            <div className="relative rounded-xl overflow-hidden h-[320px]">
              <img src={vesselImg} alt="Vessel tracking" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute top-5 left-5">
                <p className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Current Vessel</p>
                <p className="text-lg font-bold text-primary">Ever-Forward V.42</p>
              </div>
              <div className="absolute top-16 left-5">
                <p className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Speed / Course</p>
                <p className="text-sm font-bold text-white">18.4 knots | 124° SE</p>
              </div>
              <div className="absolute bottom-5 left-5 right-5 bg-white/10 backdrop-blur-md rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Live Tracking</span>
                  <span className="ml-auto text-[11px] text-white/60">Updated 2m ago</span>
                </div>
                <p className="text-xs text-white/70 mt-1">Last known position:</p>
                <p className="text-sm font-bold text-white">Gulf of Aden, Coordinates: 12.18° N, 48.15° E</p>
              </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Calendar, label: "ESTIMATED ARRIVAL", value: "Oct 24, 2023", sub: "Delayed by 12 hours (Weather)", subColor: "text-red-500" },
                { icon: Weight, label: "PAYLOAD WEIGHT", value: "14,250 kg", sub: "2× 40ft High-Cube Containers", subColor: "text-muted-foreground" },
                { icon: Shield, label: "SECURITY LEVEL", value: "Grade A", sub: "Full Insurance Coverage", subColor: "text-muted-foreground" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-5 border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                      <stat.icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
                  </div>
                  <p className="text-xl font-bold font-headline text-foreground">{stat.value}</p>
                  <p className={`text-xs mt-1 ${stat.subColor}`}>{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Manifest */}
            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="text-lg font-bold font-headline mb-4">Manifest & Item Details</h3>
              <table className="w-full">
                <thead>
                  <tr className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border">
                    <th className="text-left pb-3">Item Description</th>
                    <th className="text-left pb-3">Quantity</th>
                    <th className="text-left pb-3">HS Code</th>
                    <th className="text-left pb-3">Weight</th>
                    <th className="text-right pb-3">Value (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  {manifestItems.map((item) => (
                    <tr key={item.name} className="border-b border-border/50">
                      <td className="py-3 text-sm text-foreground">{item.name}</td>
                      <td className="py-3 text-sm text-muted-foreground">{item.qty}</td>
                      <td className="py-3 text-sm text-muted-foreground">{item.hs}</td>
                      <td className="py-3 text-sm text-muted-foreground">{item.weight}</td>
                      <td className="py-3 text-sm font-bold text-foreground text-right">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right timeline */}
          <div className="space-y-6">
            {/* Journey header */}
            <div className="bg-white rounded-xl p-5 border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold font-headline">Shipment Journey</h3>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-blue-50 text-primary border border-primary/20">IN TRANSIT</span>
              </div>
              <div className="space-y-0">
                {timeline.map((step, i) => (
                  <div key={step.label} className="flex gap-3 relative">
                    {/* Connector line */}
                    {i < timeline.length - 1 && (
                      <div className={`absolute left-[15px] top-[30px] w-0.5 h-[calc(100%-10px)] ${step.done ? "bg-primary/30" : "bg-border"}`} />
                    )}
                    <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0 ${step.color} ${step.done ? "text-white" : "text-muted-foreground"}`}>
                      <step.icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="pb-6">
                      <p className={`text-[10px] font-bold uppercase tracking-wider ${step.active ? "text-primary" : "text-muted-foreground"}`}>{step.date}</p>
                      <p className="text-sm font-bold text-foreground mt-0.5">{step.label}</p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support card */}
            <div className="gradient-primary rounded-xl p-5 text-white">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4" />
                <p className="text-[10px] uppercase tracking-widest font-bold text-white/70">Support Priority</p>
              </div>
              <p className="text-sm leading-relaxed text-white/90">As an Elite Partner, you have a dedicated logistics specialist for this shipment.</p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-sm font-bold">SJ</span>
                </div>
                <div>
                  <p className="text-sm font-bold">Sarah Jenkins</p>
                  <p className="text-xs text-white/70">Response time: &lt; 5 mins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ShipmentTracking;
