import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Save, Building2, Mail, Phone, Globe, MapPin, FileText, CheckCircle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { ContactKind } from "./ContactsList";
import { toast } from "sonner";

interface Props {
  kind: ContactKind;
}

const ContactForm = ({ kind }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isSupplier = kind === "supplier";
  const isEdit = Boolean(id);
  const basePath = isSupplier ? "/suppliers" : "/buyers";
  const label = isSupplier ? "Suppliers" : "Buyers";
  const entity = isSupplier ? "Supplier" : "Buyer";

  // Prefill if editing
  const [form, setForm] = useState({
    name: isEdit ? (isSupplier ? "Shanghai Heavy Industries Co. Ltd" : "Al-Usama Global Trading LLC") : "",
    contactPerson: isEdit ? "Mr. Wang Liu" : "",
    email: isEdit ? (isSupplier ? "wang.liu@shi-china.com" : "ops@al-usama.ae") : "",
    phone: isEdit ? "+86 21 5588 9921" : "",
    country: isEdit ? (isSupplier ? "China" : "United Arab Emirates") : "",
    city: isEdit ? (isSupplier ? "Shanghai" : "Dubai") : "",
    address: isEdit ? (isSupplier ? "Pudong New District, Shanghai 200120" : "Jebel Ali Free Zone, Dubai") : "",
    taxId: isEdit ? "CN-91310115MA1H..." : "",
    tier: isEdit ? "PLATINUM" : "STANDARD",
    paymentTerms: isEdit ? "Net 45" : "Net 30",
    currency: isEdit ? "USD" : "USD",
    category: isEdit ? "Steel & Construction" : "",
    notes: "",
  });

  const update = (k: keyof typeof form, v: string) => setForm({ ...form, [k]: v });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isEdit ? `${entity} ${id} updated successfully` : `${entity} created successfully`);
    navigate(basePath);
  };

  return (
    <DashboardLayout>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <Link to={basePath} className="flex items-center gap-1 text-muted-foreground hover:text-foreground uppercase text-[11px] font-bold tracking-wider">
            <ChevronLeft className="w-3.5 h-3.5" />
            {label}
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-primary font-semibold text-[11px] uppercase tracking-wider">{isEdit ? `Edit ${id}` : `New ${entity}`}</span>
        </div>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold font-headline text-foreground">{isEdit ? `Edit ${entity}` : `Add New ${entity}`}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isEdit ? `Update ${entity.toLowerCase()} profile, contact, and trade terms.` : `Create a new ${entity.toLowerCase()} profile to start tracking trade activity.`}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Details */}
            <div className="bg-white rounded-xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-5">
                <Building2 className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-bold font-headline">Company Details</h2>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">{entity} Name *</label>
                  <input required value={form.name} onChange={(e) => update("name", e.target.value)} type="text" placeholder={isSupplier ? "e.g. Shanghai Heavy Industries" : "e.g. Al-Usama Global Trading"} className="w-full px-4 py-3 bg-muted rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Trade Category</label>
                    <input value={form.category} onChange={(e) => update("category", e.target.value)} type="text" placeholder="e.g. Steel & Construction" className="w-full px-4 py-3 bg-muted rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Tax ID / VAT</label>
                    <input value={form.taxId} onChange={(e) => update("taxId", e.target.value)} type="text" placeholder="e.g. CN-913101..." className="w-full px-4 py-3 bg-muted rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-primary/20 font-mono" />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-5">
                <Mail className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-bold font-headline">Contact Information</h2>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Primary Contact Person *</label>
                  <input required value={form.contactPerson} onChange={(e) => update("contactPerson", e.target.value)} type="text" placeholder="Full name" className="w-full px-4 py-3 bg-muted rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Email *</label>
                    <input required value={form.email} onChange={(e) => update("email", e.target.value)} type="email" placeholder="contact@company.com" className="w-full px-4 py-3 bg-muted rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Phone *</label>
                    <input required value={form.phone} onChange={(e) => update("phone", e.target.value)} type="tel" placeholder="+__ ___ _______" className="w-full px-4 py-3 bg-muted rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-5">
                <MapPin className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-bold font-headline">Location</h2>
              </div>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Country *</label>
                    <input required value={form.country} onChange={(e) => update("country", e.target.value)} type="text" placeholder="e.g. China" className="w-full px-4 py-3 bg-muted rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">City</label>
                    <input value={form.city} onChange={(e) => update("city", e.target.value)} type="text" placeholder="e.g. Shanghai" className="w-full px-4 py-3 bg-muted rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Full Address</label>
                  <textarea value={form.address} onChange={(e) => update("address", e.target.value)} rows={3} placeholder="Street, building, postal code..." className="w-full px-4 py-3 bg-muted rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-primary/20 resize-y" />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-5">
                <FileText className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-bold font-headline">Internal Notes</h2>
              </div>
              <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={4} placeholder="Optional notes visible only to your team..." className="w-full px-4 py-3 bg-muted rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-primary/20 resize-y" />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <Link to={basePath} className="px-6 py-3 border border-border rounded-lg text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors">
                Cancel
              </Link>
              <button type="submit" className="gradient-primary text-white px-8 py-3 rounded-lg font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-all">
                {isEdit ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {isEdit ? `Update ${entity}` : `Save ${entity}`}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-5 border border-border space-y-4">
              <h3 className="text-sm font-bold font-headline">Trade Terms</h3>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Tier</label>
                <select value={form.tier} onChange={(e) => update("tier", e.target.value)} className="w-full px-3 py-2.5 bg-muted rounded-lg text-sm border-none">
                  <option>STANDARD</option>
                  <option>SILVER</option>
                  <option>GOLD</option>
                  <option>PLATINUM</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Payment Terms</label>
                <select value={form.paymentTerms} onChange={(e) => update("paymentTerms", e.target.value)} className="w-full px-3 py-2.5 bg-muted rounded-lg text-sm border-none">
                  <option>Advance</option>
                  <option>Net 15</option>
                  <option>Net 30</option>
                  <option>Net 45</option>
                  <option>Net 60</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Default Currency</label>
                <select value={form.currency} onChange={(e) => update("currency", e.target.value)} className="w-full px-3 py-2.5 bg-muted rounded-lg text-sm border-none">
                  <option>USD</option>
                  <option>PKR</option>
                  <option>AED</option>
                  <option>EUR</option>
                  <option>CNY</option>
                  <option>GBP</option>
                </select>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-primary" />
                <p className="text-sm font-bold text-foreground">Compliance Tip</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Tax ID is required for customs clearance. Verify it against the country's official trade registry before saving.
              </p>
            </div>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default ContactForm;
