import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { CheckCircle2, Circle, FileCheck, Download, Send } from "lucide-react";
import { toast } from "sonner";

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
  const [gdNumber] = useState("KAPE-HC-" + Math.floor(Math.random() * 900000 + 100000));
  const [declarationType, setDeclarationType] = useState("Home Consumption");
  const [collectorate, setCollectorate] = useState("Karachi (Port Qasim)");
  const [importerNTN, setImporterNTN] = useState("");
  const [consignee, setConsignee] = useState("");
  const [vessel, setVessel] = useState("");
  const [igmNumber, setIgmNumber] = useState("");
  const [bl, setBl] = useState("");
  const [checked, setChecked] = useState<string[]>([]);

  const toggle = (id: string) => setChecked(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const requiredDone = checklist.filter(c => c.required).every(c => checked.includes(c.id));

  const submit = () => {
    if (!requiredDone) { toast.error("Complete all required items"); return; }
    toast.success(`GD ${gdNumber} prepared for submission to WEBOC`);
  };

  const steps = ["Declaration Info", "Importer & Consignment", "Documents Checklist", "Review & Submit"];

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-headline">WEBOC Declaration Helper</h1>
            <p className="text-sm text-muted-foreground mt-1">Prepare Goods Declaration (GD) for Pakistan Customs WEBOC system</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">GD Reference</p>
            <p className="font-mono font-bold text-primary">{gdNumber}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-8">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${step > i + 1 ? "bg-emerald-500 text-white" : step === i + 1 ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                    {step > i + 1 ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                  </div>
                  <p className={`text-xs mt-2 font-semibold ${step >= i + 1 ? "text-foreground" : "text-muted-foreground"}`}>{s}</p>
                </div>
                {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${step > i + 1 ? "bg-emerald-500" : "bg-muted"}`} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Declaration Type</label>
                <select value={declarationType} onChange={e => setDeclarationType(e.target.value)} className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm bg-white">
                  {["Home Consumption", "Warehousing", "Re-export", "Transit", "Export"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Collectorate</label>
                <select value={collectorate} onChange={e => setCollectorate(e.target.value)} className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm bg-white">
                  {["Karachi (Port Qasim)", "Karachi (KICT)", "Lahore (Dry Port)", "Sialkot Airport", "Islamabad Airport", "Peshawar"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Mode of Transport</label>
                <select className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm bg-white">
                  {["Sea", "Air", "Road", "Rail"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Currency of Invoice</label>
                <select className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm bg-white">
                  {["USD", "EUR", "GBP", "CNY", "AED"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Importer NTN</label>
                <input value={importerNTN} onChange={e => setImporterNTN(e.target.value)} placeholder="0000000-0" className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Consignee Name</label>
                <input value={consignee} onChange={e => setConsignee(e.target.value)} className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Vessel / Flight</label>
                <input value={vessel} onChange={e => setVessel(e.target.value)} placeholder="MV / Flight no." className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">IGM Number</label>
                <input value={igmNumber} onChange={e => setIgmNumber(e.target.value)} className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm" />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-semibold text-muted-foreground">B/L or AWB Number</label>
                <input value={bl} onChange={e => setBl(e.target.value)} className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-2">
              {checklist.map(c => (
                <button type="button" key={c.id} onClick={() => toggle(c.id)} className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg text-left">
                  {checked.includes(c.id) ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <Circle className="w-5 h-5 text-muted-foreground" />}
                  <span className="flex-1 text-sm font-medium">{c.label}</span>
                  {c.required && <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-semibold">Required</span>}
                </button>
              ))}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex gap-3">
                <FileCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-emerald-900">Declaration ready for submission</p>
                  <p className="text-sm text-emerald-800 mt-1">All required documents are checked. Review the summary below before submitting to WEBOC.</p>
                </div>
              </div>
              <div className="bg-muted/30 rounded-xl p-5 grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-xs text-muted-foreground">GD Number</p><p className="font-mono font-semibold">{gdNumber}</p></div>
                <div><p className="text-xs text-muted-foreground">Type</p><p className="font-semibold">{declarationType}</p></div>
                <div><p className="text-xs text-muted-foreground">Collectorate</p><p className="font-semibold">{collectorate}</p></div>
                <div><p className="text-xs text-muted-foreground">Importer NTN</p><p className="font-semibold">{importerNTN || "—"}</p></div>
                <div><p className="text-xs text-muted-foreground">Vessel</p><p className="font-semibold">{vessel || "—"}</p></div>
                <div><p className="text-xs text-muted-foreground">B/L No.</p><p className="font-semibold">{bl || "—"}</p></div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <button type="button" disabled={step === 1} onClick={() => setStep(step - 1)} className="px-4 py-2 border border-border rounded-lg text-sm font-semibold disabled:opacity-50">Back</button>
            {step < 4 ? (
              <button type="button" onClick={() => setStep(step + 1)} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold">Next</button>
            ) : (
              <div className="flex gap-2">
                <button type="button" className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-semibold"><Download className="w-4 h-4" /> Export GD</button>
                <button type="button" onClick={submit} className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold"><Send className="w-4 h-4" /> Submit to WEBOC</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WEBOCDeclaration;
