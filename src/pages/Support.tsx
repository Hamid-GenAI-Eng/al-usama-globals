import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Search, MessageSquare, Mail, Phone, Book, Video, FileQuestion, ArrowRight, ChevronDown, LifeBuoy, Zap } from "lucide-react";
import { toast } from "sonner";

const faqs = [
  { q: "How do I create a new shipment?", a: "Navigate to Shipments → New Shipment. Fill in origin, destination, cargo details, and assign an agent. The system will auto-generate a tracking ID." },
  { q: "How does the AI document scanner work?", a: "Upload a scanned invoice or PDF in Documents → Upload. Our AI extracts items, quantities, HS codes, and totals. Review extracted fields before saving." },
  { q: "Can I export reports to Excel?", a: "Yes. Open Reports, configure your date range and filters, then click 'Export to Excel' or 'Export to PDF'." },
  { q: "How do I add a new team member?", a: "Go to Admin → Users → Invite User. Enter their email and assign a role (Admin, Manager, Operator, Viewer)." },
  { q: "How is FBR duty calculated?", a: "Use Customs → Duty Calculator. Enter HS code, CIF value, and the system applies current FBR rates for Customs Duty, Regulatory Duty, Sales Tax, and Income Tax." },
  { q: "How do I track an active shipment?", a: "Each shipment has a tracking page with real-time vessel position (when carrier API is connected), milestone timeline, and document checklist." },
];

const guides = [
  { title: "Getting Started", desc: "Set up your agency and first shipment", icon: Zap, color: "from-blue-500 to-blue-600", time: "5 min" },
  { title: "Managing Documents", desc: "Upload, organize, and AI-extract", icon: Book, color: "from-violet-500 to-violet-600", time: "8 min" },
  { title: "Customs Compliance", desc: "FBR & WEBOC step-by-step", icon: FileQuestion, color: "from-emerald-500 to-emerald-600", time: "12 min" },
  { title: "Video Walkthrough", desc: "Full platform tour in 15 minutes", icon: Video, color: "from-amber-500 to-amber-600", time: "15 min" },
];

const Support = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [search, setSearch] = useState("");
  const [ticket, setTicket] = useState({ subject: "", category: "Technical", priority: "Normal", message: "" });

  const filtered = faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Support ticket submitted. We'll respond within 4 business hours.");
    setTicket({ subject: "", category: "Technical", priority: "Normal", message: "" });
  };

  return (
    <DashboardLayout title="Support">
      <div className="space-y-6 max-w-6xl">
        {/* Hero */}
        <div className="rounded-2xl gradient-primary text-primary-foreground p-8 text-center">
          <LifeBuoy className="w-12 h-12 mx-auto mb-3 opacity-90" />
          <h2 className="text-3xl font-headline font-extrabold">How can we help?</h2>
          <p className="opacity-90 mt-2">Search our knowledge base or get in touch with our support team.</p>
          <div className="relative max-w-xl mx-auto mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles, FAQs, guides..." className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white text-foreground outline-none focus:ring-4 focus:ring-white/30" />
          </div>
        </div>

        {/* Quick contact */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: MessageSquare, title: "Live Chat", desc: "Avg response: 2 min", action: "Start Chat", color: "text-blue-700 bg-blue-100" },
            { icon: Mail, title: "Email Support", desc: "support@al-usama.com", action: "Send Email", color: "text-violet-700 bg-violet-100" },
            { icon: Phone, title: "Phone Support", desc: "+92 21 3263 4500", action: "Call Now", color: "text-emerald-700 bg-emerald-100" },
          ].map(c => (
            <div key={c.title} className="bg-white rounded-xl border border-border p-5 flex items-center gap-4 hover:shadow-md transition">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.color}`}><c.icon className="w-5 h-5" /></div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{c.title}</p>
                <p className="text-xs text-muted-foreground">{c.desc}</p>
              </div>
              <button className="text-primary text-xs font-semibold flex items-center gap-1">{c.action} <ArrowRight className="w-3.5 h-3.5" /></button>
            </div>
          ))}
        </div>

        {/* Guides */}
        <div>
          <h3 className="text-lg font-bold font-headline mb-4">Popular Guides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {guides.map(g => (
              <button key={g.title} className="text-left bg-white rounded-xl border border-border p-5 hover:shadow-md transition group">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${g.color} flex items-center justify-center mb-3`}>
                  <g.icon className="w-5 h-5 text-white" />
                </div>
                <p className="font-semibold text-sm">{g.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{g.desc}</p>
                <p className="text-xs text-primary font-semibold mt-3">{g.time} read →</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FAQs */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-border p-6">
            <h3 className="text-lg font-bold font-headline mb-4">Frequently Asked Questions</h3>
            <div className="space-y-2">
              {filtered.map((f, i) => (
                <div key={i} className="border border-border rounded-lg overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/40 transition">
                    <p className="font-semibold text-sm text-left">{f.q}</p>
                    <ChevronDown className={`w-4 h-4 transition-transform shrink-0 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{f.a}</div>}
                </div>
              ))}
              {filtered.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No results for "{search}"</p>}
            </div>
          </div>

          {/* Submit ticket */}
          <form onSubmit={submit} className="bg-white rounded-xl border border-border p-6 h-fit space-y-4">
            <h3 className="text-lg font-bold font-headline">Submit a Ticket</h3>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Subject</label>
              <input required value={ticket.subject} onChange={e => setTicket({ ...ticket, subject: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Category</label>
                <select value={ticket.category} onChange={e => setTicket({ ...ticket, category: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background outline-none text-sm">
                  <option>Technical</option><option>Billing</option><option>Customs</option><option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Priority</label>
                <select value={ticket.priority} onChange={e => setTicket({ ...ticket, priority: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background outline-none text-sm">
                  <option>Low</option><option>Normal</option><option>High</option><option>Urgent</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Message</label>
              <textarea required rows={5} value={ticket.message} onChange={e => setTicket({ ...ticket, message: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-primary/30 text-sm resize-none" />
            </div>
            <button type="submit" className="w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold">Submit Ticket</button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Support;
