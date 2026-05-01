import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { CheckCircle2, Circle, FileCheck, Download, Send, Ship, Building2, ClipboardList, ShieldAlert, Loader2 } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

const checklist = [
  { id: "iban", label: "Importer NTN & STRN registered", required: true },
  { id: "weboc", label: "WEBOC user ID active", required: true },
  { id: "bl", label: "Bill of Lading / Airway Bill uploaded", required: true },
  { id: "ci", label: "Commercial Invoice attached", required: true },
  { id: "pl", label: "Packing List attached", required: true },
  { id: "coo", label: "Certificate of Origin (if FTA claim)", required: false },
  { id: "lc", label: "L/C or Bank Contract copy", required: false },
  { id: "ins", label: "Insurance Certificate", required: true },
];

const WEBOCDeclaration = () => {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [gdNumber] = useState("KAPE-HC-" + Math.floor(Math.random() * 900000 + 100000));
  const [formData, setFormData] = useState({
    declarationType: "Home Consumption",
    collectorate: "Karachi (Port Qasim)",
    modeOfTransport: "Sea",
    currency: "USD",
    importerNTN: "",
    consignee: "",
    vessel: "",
    igmNumber: "",
    bl: "",
  });
  const [checked, setChecked] = useState<string[]>([]);

  const updateForm = (key: string, val: string) => setFormData(p => ({ ...p, [key]: val }));
  const toggle = (id: string) => setChecked(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const requiredDone = checklist.filter(c => c.required).every(c => checked.includes(c.id));

  const submit = async () => {
    if (!requiredDone) { toast.error("Complete all required items"); return; }
    
    setSubmitting(true);
    try {
      await api.post("/customs/weboc", {
        gdNumber,
        ...formData,
        documents: checked
      });
      toast.success(`GD ${gdNumber} successfully prepared and filed with WEBOC`);
      setStep(4); // Move to final if not there
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Failed to transmit data to WEBOC gateway");
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [
    { name: "Declaration Info", icon: Building2 },
    { name: "Logistics", icon: Ship },
    { name: "Checklist", icon: ClipboardList },
    { name: "Submission", icon: Send }
  ];

  return (
    <DashboardLayout title="WEBOC Filing">
      <div className="space-y-6 max-w-5xl">
        <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <FileCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-black font-headline text-foreground uppercase tracking-tight">WEBOC Digital Gateway</h1>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest opacity-60">Goods Declaration (GD) Preparation</p>
            </div>
          </div>
          <div className="text-right px-4 py-2 bg-muted/30 rounded-xl border border-border/50">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1 opacity-50">Draft Reference</p>
            <p className="font-mono font-black text-primary text-sm">{gdNumber}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-border shadow-xl shadow-muted/20 overflow-hidden">
          <div className="flex items-center border-b border-border bg-muted/5">
            {steps.map((s, i) => (
              <div key={s.name} className={`flex-1 flex items-center justify-center py-5 relative ${step === i + 1 ? "bg-white" : ""}`}>
                <div className={`flex items-center gap-2 ${step >= i + 1 ? "text-primary" : "text-muted-foreground opacity-40"}`}>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black border-2 ${step >= i + 1 ? "border-primary bg-primary text-white" : "border-muted-foreground"}`}>
                    {step > i + 1 ? <CheckCircle2 className="w-3 h-3" /> : i + 1}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">{s.name}</span>
                </div>
                {step === i + 1 && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />}
              </div>
            ))}
          </div>

          <div className="p-8 min-h-[400px]">
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Declaration Type</label>
                    <select value={formData.declarationType} onChange={e => updateForm("declarationType", e.target.value)} className="w-full px-4 py-3 bg-muted/20 border border-border rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                      {["Home Consumption", "Warehousing", "Re-export", "Transit", "Export"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Collectorate</label>
                    <select value={formData.collectorate} onChange={e => updateForm("collectorate", e.target.value)} className="w-full px-4 py-3 bg-muted/20 border border-border rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                      {["Karachi (Port Qasim)", "Karachi (KICT)", "Lahore (Dry Port)", "Sialkot Airport", "Islamabad Airport", "Peshawar"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Currency of Invoice</label>
                    <select value={formData.currency} onChange={e => updateForm("currency", e.target.value)} className="w-full px-4 py-3 bg-muted/20 border border-border rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                      {["USD", "EUR", "GBP", "CNY", "AED"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Mode of Transport</label>
                    <select value={formData.modeOfTransport} onChange={e => updateForm("modeOfTransport", e.target.value)} className="w-full px-4 py-3 bg-muted/20 border border-border rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                      {["Sea", "Air", "Road", "Rail"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Importer NTN</label>
                    <input value={formData.importerNTN} onChange={e => updateForm("importerNTN", e.target.value)} placeholder="0000000-0" className="w-full px-4 py-3 bg-muted/20 border border-border rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Vessel / Flight Reference</label>
                    <input value={formData.vessel} onChange={e => updateForm("vessel", e.target.value)} placeholder="MV PACIFIC / EK-601" className="w-full px-4 py-3 bg-muted/20 border border-border rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Consignee Name</label>
                    <input value={formData.consignee} onChange={e => updateForm("consignee", e.target.value)} className="w-full px-4 py-3 bg-muted/20 border border-border rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">B/L or AWB Number</label>
                    <input value={formData.bl} onChange={e => updateForm("bl", e.target.value)} className="w-full px-4 py-3 bg-muted/20 border border-border rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 mb-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Compliance Check</p>
                  <p className="text-xs text-muted-foreground font-medium">Please verify all mandatory documents are digitized and attached.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {checklist.map(c => (
                    <button type="button" key={c.id} onClick={() => toggle(c.id)} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${checked.includes(c.id) ? "bg-emerald-50 border-emerald-200" : "bg-white border-border hover:border-primary/40 shadow-sm"}`}>
                      {checked.includes(c.id) ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <Circle className="w-5 h-5 text-muted-foreground opacity-30" />}
                      <div className="flex-1 text-left">
                        <p className={`text-xs font-black uppercase tracking-tight ${checked.includes(c.id) ? "text-emerald-900" : "text-foreground"}`}>{c.label}</p>
                        {c.required && <p className="text-[9px] font-bold text-rose-500 uppercase mt-0.5">Mandatory</p>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 bg-emerald-500 text-white rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Send className="w-10 h-10" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black font-headline text-foreground uppercase tracking-tight">Final Transmission</h2>
                    <p className="text-sm text-muted-foreground font-medium max-w-md mx-auto">Review the digital goods declaration before final filing into the WEBOC ecosystem.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Type", val: formData.declarationType },
                    { label: "Collectorate", val: formData.collectorate },
                    { label: "Importer NTN", val: formData.importerNTN || "N/A" },
                    { label: "B/L No", val: formData.bl || "N/A" },
                  ].map(x => (
                    <div key={x.label} className="p-4 bg-muted/20 border border-border/50 rounded-2xl">
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">{x.label}</p>
                      <p className="text-xs font-bold text-foreground truncate">{x.val}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 border-2 border-dashed border-amber-200 rounded-3xl p-6 flex gap-4">
                  <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0" />
                  <div>
                    <p className="text-xs font-black text-amber-900 uppercase tracking-widest">Legal Disclaimer</p>
                    <p className="text-[11px] text-amber-800/80 font-bold leading-relaxed mt-1">
                      ANY MISDECLARATION OF VALUE, WEIGHT, OR PCT CODE IS PUNISHABLE UNDER THE CUSTOMS ACT 1969. 
                      ENSURE ALL DATA MATCHES THE COMMERCIAL INVOICE EXACTLY.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-8 bg-muted/5 border-t border-border flex justify-between items-center">
            <button 
              type="button" 
              disabled={step === 1 || submitting} 
              onClick={() => setStep(step - 1)} 
              className="px-6 py-3 border-2 border-border rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white disabled:opacity-30 transition-all"
            >
              Back
            </button>
            
            <div className="flex gap-4">
              {step < 4 ? (
                <button 
                  type="button" 
                  onClick={() => setStep(step + 1)} 
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
                >
                  Continue
                </button>
              ) : (
                <>
                  <button type="button" className="hidden md:flex items-center gap-2 px-6 py-3 border-2 border-border rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white transition-all">
                    <Download className="w-4 h-4" /> Save PDF
                  </button>
                  <button 
                    type="button" 
                    onClick={submit} 
                    disabled={submitting}
                    className="flex items-center gap-2 px-10 py-3 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 disabled:opacity-50 transition-all"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {submitting ? "Transmitting..." : "Submit to WEBOC"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WEBOCDeclaration;
