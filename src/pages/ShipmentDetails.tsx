import { Link, useParams } from "react-router-dom";
import { Pencil, Download, Anchor, Ship, Package, CheckCircle, Truck, Eye, FileText, ShieldCheck } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import vesselImg from "@/assets/vessel-tracking.jpg";

const journeySteps = [
  { label: "Dispatched", detail: "Shenzhen, CN", date: "Oct 12, 09:20 AM", icon: Package, done: true },
  { label: "Port Departure", detail: "Hong Kong Port", date: "Oct 14, 02:45 PM", icon: Anchor, done: true },
  { label: "In Transit", detail: "Pacific Ocean", date: "Expected Oct 20", icon: Ship, done: true, active: true },
  { label: "Customs", detail: "Port of Dubai", date: "Estimated Oct 22", icon: ShieldCheck, done: false },
  { label: "Delivered", detail: "Dubai Warehouse", date: "Estimated Oct 24", icon: CheckCircle, done: false },
];

const inventoryItems = [
  { name: "Industrial Control Units", sku: "ICU-990-22", qty: "450 Units", weight: "1,240 kg", value: "$124,500.00" },
  { name: "Fiber Optic Cabling (Grade A)", sku: "FOC-F1-002", qty: "80 Spools", weight: "820 kg", value: "$42,100.00" },
  { name: "Voltage Regulators", sku: "VR-3000-X", qty: "12 Cases", weight: "460 kg", value: "$18,900.00" },
];

const documents = [
  { name: "Commercial Invoice", type: "PDF", size: "2.4 MB", icon: FileText },
  { name: "Bill of Lading", type: "PDF", size: "1.1 MB", icon: FileText },
  { name: "Packing List", type: "XLSX", size: "0.8 MB", icon: FileText },
  { name: "Certificate of Origin", type: "PDF", size: "1.5 MB", icon: ShieldCheck },
];

const ShipmentDetails = () => {
  const { id } = useParams();

  return (
    <DashboardLayout showSearch showTabs>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <Link to="/shipments" className="text-muted-foreground hover:text-foreground">Shipments</Link>
          <span className="text-muted-foreground">›</span>
          <span className="text-primary font-semibold">#{id || "SHP-92831"}</span>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold font-headline text-foreground">Premium Electronic Hardware</h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase bg-blue-100 text-blue-700">IN TRANSIT</span>
              <span className="text-sm text-muted-foreground">⏱ Estimated Delivery: Oct 24, 2023</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to={`/shipments/${id || "SHP-92831"}/edit`} className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-semibold text-foreground hover:bg-muted transition-colors">
              <Pencil className="w-4 h-4" />
              Edit Shipment
            </Link>
            <button className="gradient-primary text-white px-4 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:opacity-90">
              <Download className="w-4 h-4" />
              Download Documents
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Journey + Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipment Journey */}
            <div className="bg-white rounded-xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-6">
                <Anchor className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold font-headline">Shipment Journey</h2>
              </div>
              <div className="flex items-center justify-between relative">
                <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-border" />
                {journeySteps.map((step, i) => (
                  <div key={step.label} className="flex flex-col items-center gap-2 relative z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.active ? "gradient-primary text-white" : step.done ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                    }`}>
                      <step.icon className="w-4 h-4" />
                    </div>
                    <div className="text-center">
                      <p className={`text-xs font-bold ${step.active ? "text-primary" : "text-foreground"}`}>{step.label}</p>
                      <p className="text-[10px] text-muted-foreground">{step.detail}</p>
                      <p className="text-[10px] text-muted-foreground">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipper & Consignee */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-5 border border-border">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" /> Shipper / Sender
                </p>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Giga-Tech Industrial</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">No. 448 Silicon Valley Road<br />Shenzhen High-Tech Park,<br />China</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 border border-border">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" /> Consignee / Receiver
                </p>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                    <Package className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Al-Usama Logistics Hub</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Jebel Ali Free Zone (JAFZA)<br />Warehouse Block 7, Dubai,<br />UAE</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Carrier info */}
            <div className="gradient-primary rounded-xl p-6 text-white">
              <p className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Carrier Information</p>
              <p className="text-2xl font-bold font-headline mt-1">MAERSK LINE</p>
              <p className="text-sm text-white/80">Vessel: MS Arctic Horizon</p>
              <div className="flex gap-8 mt-4 pt-4 border-t border-white/20">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/60 font-bold">Container ID</p>
                  <p className="text-sm font-bold">MSKU-0928-11</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/60 font-bold">Seal Number</p>
                  <p className="text-sm font-bold">SL-8849-20</p>
                </div>
              </div>
            </div>

            {/* Documents & Audit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-5 border border-border">
                <h3 className="text-base font-bold font-headline mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" /> Attached Documentation
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {documents.map((doc) => (
                    <div key={doc.name} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <doc.icon className="w-4 h-4 text-primary shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-foreground truncate">{doc.name}</p>
                        <p className="text-[10px] text-muted-foreground">{doc.type} • {doc.size}</p>
                      </div>
                      <Eye className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 border border-border">
                <h3 className="text-base font-bold font-headline mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" /> Audit Log & Remarks
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold">AK</span>
                    </div>
                    <div>
                      <p className="text-xs"><strong>Amir Khan (Operations)</strong> <span className="text-muted-foreground">2 hours ago</span></p>
                      <p className="text-xs text-muted-foreground mt-1 bg-muted rounded-lg p-2 leading-relaxed">Verified custom clearing documents for Dubai entry. All duties paid. Waiting for vessel docking confirmation.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary">SU</span>
                    </div>
                    <div>
                      <p className="text-xs"><strong>System Update</strong> <span className="text-muted-foreground">Yesterday</span></p>
                      <p className="text-xs text-muted-foreground mt-1 italic">Shipment transitioned to "In Transit" status via Automated Port Scan at Shenzhen Container Terminal.</p>
                    </div>
                  </div>
                </div>
                <input type="text" placeholder="Add a note or remark..." className="w-full px-3 py-2 bg-muted rounded-lg text-sm border-none outline-none mt-4" />
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {/* Live Location */}
            <div className="bg-[hsl(220,50%,15%)] rounded-xl p-5 text-white relative overflow-hidden">
              <p className="text-[10px] uppercase tracking-widest text-red-400 font-bold">Live Location</p>
              <p className="text-lg font-bold mt-1">Pacific North Zone</p>
              <div className="mt-4 bg-white/10 rounded-lg p-3 flex items-center justify-between">
                <span className="text-xs text-white/70">Speed</span>
                <span className="text-sm font-bold">18.5 Knots</span>
              </div>
            </div>

            {/* Inventory */}
            <div className="bg-white rounded-xl p-5 border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold font-headline">Shipment Inventory</h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold border border-border text-muted-foreground">3 Items Total</span>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    <th className="text-left pb-2">Item Details</th>
                    <th className="text-left pb-2">SKU</th>
                    <th className="text-right pb-2">Value (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryItems.map((item) => (
                    <tr key={item.sku} className="border-t border-border/50">
                      <td className="py-3">
                        <p className="text-xs font-semibold text-foreground">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground">{item.qty} • {item.weight}</p>
                      </td>
                      <td className="text-[11px] text-muted-foreground">{item.sku}</td>
                      <td className="text-right text-xs font-bold text-primary">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ShipmentDetails;
