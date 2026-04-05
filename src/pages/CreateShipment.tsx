import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Save, Anchor, MapPin, AlertTriangle, Lightbulb, Info } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import routeImg from "@/assets/route-optimization.jpg";

const steps = [
  { num: 1, label: "SENDER DETAILS" },
  { num: 2, label: "CONSIGNEE DETAILS" },
  { num: 3, label: "SHIPMENT INFO" },
  { num: 4, label: "REVIEW & SUBMIT" },
];

const CreateShipment = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <DashboardLayout title="Create Shipment" showTabs>
      <div className="space-y-6">
        {/* Stepper */}
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.num} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                step.num === activeStep
                  ? "gradient-primary text-white"
                  : step.num < activeStep
                  ? "bg-green-500 text-white"
                  : "bg-muted text-muted-foreground"
              }`}>
                {step.num}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{step.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sender Information */}
            <div className="bg-white rounded-xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-lg">🏢</span>
                <h2 className="text-lg font-bold font-headline text-foreground">Sender Information</h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Business Name</label>
                  <input type="text" placeholder="e.g. Al-Usama Textiles Ltd" className="w-full px-4 py-3 bg-muted rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Pick-up Address</label>
                  <textarea placeholder="Street, Building No, Area..." rows={3} className="w-full px-4 py-3 bg-muted rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-primary/20 resize-y" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Contact Person</label>
                    <input type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-muted rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Phone Number</label>
                    <input type="text" placeholder="+971 50 123 4567" className="w-full px-4 py-3 bg-muted rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
              </div>
            </div>

            {/* Port Routing */}
            <div className="bg-white rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold font-headline text-foreground">Port Routing</h2>
                <span className="flex items-center gap-1 text-xs text-primary font-semibold">
                  <Info className="w-3.5 h-3.5" />
                  Intelligent Routing Enabled
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Port of Origin</label>
                  <div className="flex items-center gap-3 px-4 py-3 bg-primary/5 border-2 border-primary/20 rounded-lg">
                    <Anchor className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-bold text-foreground">Jebel Ali, UAE</p>
                      <p className="text-xs text-muted-foreground">AEJEA • Terminal 2</p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Port of Discharge</label>
                  <div className="flex items-center gap-3 px-4 py-3 bg-muted rounded-lg">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <input type="text" placeholder="Select destination..." className="bg-transparent text-sm border-none outline-none flex-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors">
                <Save className="w-4 h-4" />
                Save as Draft
              </button>
              <button
                onClick={() => setActiveStep(Math.min(4, activeStep + 1))}
                className="gradient-primary text-white px-8 py-3 rounded-lg font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-all"
              >
                Next Step
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Route complexity card */}
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <div className="relative h-36">
                <img src={routeImg} alt="Route optimization" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <p className="text-[10px] uppercase tracking-wider text-white/70 font-bold">Route Complexity</p>
                  <p className="text-white font-bold text-sm">Optimization Active</p>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Estimated Transit</span>
                  <span className="text-sm font-bold text-primary">14-18 Days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Route Tier</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold border border-primary text-primary">Premium Air</span>
                </div>
              </div>
            </div>

            {/* Holiday notice */}
            <div className="bg-red-50 rounded-xl p-4 border border-red-100">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <p className="text-sm font-bold text-foreground">Regional Holiday Notice</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Destination port has reduced operation hours on Oct 12-14 due to local festivals. Plan accordingly.
              </p>
            </div>

            {/* Pro Tip */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                <p className="text-sm font-bold text-foreground">Pro Tip</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Ensure your <strong>Volume (CBM)</strong> is calculated accurately to avoid re-weighing surcharges at the loading dock.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateShipment;
