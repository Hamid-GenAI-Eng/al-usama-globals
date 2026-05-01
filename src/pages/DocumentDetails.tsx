import { Link, useParams } from "react-router-dom";
import { ChevronLeft, Download, Share2, FileText, Sparkles, History, User, Calendar, HardDrive, Hash, Eye, MoreVertical } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const versionHistory = [
  { version: "v3", date: "Oct 22, 2026 • 14:32", user: "Salman Younas", action: "Updated total value after rate revision", current: true },
  { version: "v2", date: "Oct 20, 2026 • 09:15", user: "Usama Faraz", action: "Corrected HS Code for line item 2", current: false },
  { version: "v1", date: "Oct 18, 2026 • 11:00", user: "AI Auto-Extract", action: "Initial document upload & AI extraction", current: false },
];

const extractedFields = [
  { label: "Vendor", value: "Shanghai Heavy Industries Co. Ltd" },
  { label: "Invoice Number", value: "SHI-2026-0871" },
  { label: "Invoice Date", value: "2026-10-18" },
  { label: "Payment Terms", value: "Net 30 Days" },
  { label: "Currency", value: "USD" },
  { label: "Total Value", value: "$213,700.00" },
];

const lineItems = [
  { desc: "Architectural Steel Beams - Type A4", qty: "450 Units", hs: "7308.90", value: "$124,500.00" },
  { desc: "Reinforced Glass Paneling - UV Filtered", qty: "120 Crates", hs: "7007.21", value: "$89,200.00" },
];

const DocumentDetails = () => {
  const { id } = useParams();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <Link to="/documents" className="flex items-center gap-1 text-muted-foreground hover:text-foreground uppercase text-[11px] font-bold tracking-wider">
            <ChevronLeft className="w-3.5 h-3.5" />
            Documents
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-primary font-semibold text-[11px] uppercase tracking-wider">{id}</span>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-headline text-foreground">Commercial Invoice - SHP-8829</h1>
              <p className="text-sm text-muted-foreground mt-0.5">{id} • PDF • 1.2 MB • Linked to <Link to="/shipments/SHP-8829-DXB" className="text-primary font-bold hover:underline">SHP-8829-DXB</Link></p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-semibold text-foreground hover:bg-muted transition-colors">
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-semibold text-foreground hover:bg-muted transition-colors">
              <Download className="w-4 h-4" />
              Download
            </button>
            <button className="gradient-primary text-white px-4 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:opacity-90">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Preview placeholder */}
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <div className="h-[420px] bg-gradient-to-br from-muted/40 to-muted/80 flex items-center justify-center relative">
                <div className="bg-white shadow-2xl rounded-md w-[300px] h-[380px] p-6 text-xs">
                  <div className="border-b border-border pb-3 mb-3">
                    <p className="text-[8px] uppercase tracking-widest text-muted-foreground font-bold">Commercial Invoice</p>
                    <p className="text-sm font-bold text-foreground mt-1">SHI-2026-0871</p>
                  </div>
                  <p className="text-[8px] uppercase text-muted-foreground font-bold mb-1">Vendor</p>
                  <p className="text-[10px] font-semibold text-foreground mb-3">Shanghai Heavy Industries Co. Ltd</p>
                  <p className="text-[8px] uppercase text-muted-foreground font-bold mb-1">Buyer</p>
                  <p className="text-[10px] font-semibold text-foreground mb-3">AL-Usama-Import and Export System Trading LLC</p>
                  <div className="border-t border-border pt-3 mt-3">
                    <div className="flex justify-between text-[9px] mb-1"><span className="text-muted-foreground">Steel Beams A4</span><span className="font-bold">$124,500</span></div>
                    <div className="flex justify-between text-[9px] mb-3"><span className="text-muted-foreground">Glass Paneling UV</span><span className="font-bold">$89,200</span></div>
                    <div className="flex justify-between text-xs font-bold border-t border-border pt-2"><span>TOTAL USD</span><span>$213,700</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Extracted Fields */}
            <div className="bg-white rounded-xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-5">
                <Sparkles className="w-4 h-4 text-primary" />
                <h3 className="text-lg font-bold font-headline">AI-Extracted Fields</h3>
                <span className="ml-auto px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-green-50 text-green-700 border border-green-200">Verified</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {extractedFields.map((f) => (
                  <div key={f.label} className="p-3 bg-muted/40 rounded-lg">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{f.label}</p>
                    <p className="text-sm font-bold text-foreground mt-0.5">{f.value}</p>
                  </div>
                ))}
              </div>

              <h4 className="text-sm font-bold text-foreground mb-3">Line Items</h4>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      <th className="text-left px-4 py-2.5">Description</th>
                      <th className="text-left px-4 py-2.5">Quantity</th>
                      <th className="text-left px-4 py-2.5">HS Code</th>
                      <th className="text-right px-4 py-2.5">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lineItems.map((it) => (
                      <tr key={it.hs} className="border-t border-border">
                        <td className="px-4 py-3 text-sm text-foreground">{it.desc}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{it.qty}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{it.hs}</td>
                        <td className="px-4 py-3 text-sm font-bold text-foreground text-right">{it.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {/* Metadata */}
            <div className="bg-white rounded-xl p-5 border border-border">
              <h3 className="text-sm font-bold font-headline mb-4">Document Info</h3>
              <div className="space-y-3">
                {[
                  { icon: Hash, label: "Document ID", value: id || "DOC-9821" },
                  { icon: FileText, label: "Type", value: "Commercial Invoice" },
                  { icon: User, label: "Uploaded By", value: "Salman Younas" },
                  { icon: Calendar, label: "Uploaded", value: "Oct 22, 2026" },
                  { icon: HardDrive, label: "File Size", value: "1.2 MB" },
                ].map((m) => (
                  <div key={m.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <m.icon className="w-3.5 h-3.5" />
                      {m.label}
                    </div>
                    <span className="text-sm font-semibold text-foreground">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Version History */}
            <div className="bg-white rounded-xl p-5 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <History className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm font-bold font-headline">Version History</h3>
              </div>
              <div className="space-y-0">
                {versionHistory.map((v, i) => (
                  <div key={v.version} className="flex gap-3 relative">
                    {i < versionHistory.length - 1 && (
                      <div className="absolute left-[15px] top-[28px] w-0.5 h-[calc(100%-12px)] bg-border" />
                    )}
                    <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                      v.current ? "gradient-primary text-white" : "bg-muted text-muted-foreground"
                    }`}>
                      {v.version}
                    </div>
                    <div className="pb-5 flex-1">
                      <div className="flex items-center justify-between">
                        <p className={`text-xs font-bold ${v.current ? "text-primary" : "text-foreground"}`}>{v.user}</p>
                        {!v.current && (
                          <button className="text-[10px] text-primary font-bold uppercase tracking-wider hover:underline">Restore</button>
                        )}
                      </div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mt-0.5">{v.date}</p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{v.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DocumentDetails;
