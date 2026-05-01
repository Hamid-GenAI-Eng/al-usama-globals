import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Search, Info, ArrowRight, BookOpen, ShieldCheck, HelpCircle, Copy, ExternalLink } from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";

const HSCodeLookup = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const searchCodes = async (q: string) => {
    setLoading(true);
    try {
      const response = await api.get(`/customs/hs-codes?query=${q}`);
      setResults(response.data.data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchCodes(query);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Copied HS Code: ${code}`);
  };

  return (
    <DashboardLayout title="HS Code Navigator">
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-primary to-blue-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl font-bold font-headline mb-3 text-white">Global Trade Tariff Search</h1>
            <p className="text-blue-100 mb-6">Find the correct HS Code for your products to ensure accurate duty calculations and compliance with FBR and Customs regulations.</p>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
              <input 
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by code (e.g. 8471) or product name..." 
                className="w-full pl-12 pr-4 py-4 rounded-xl border-none bg-white/10 backdrop-blur-md text-white placeholder:text-blue-200 outline-none ring-2 ring-white/20 focus:ring-white/40 transition-all text-lg shadow-inner"
              />
            </div>
          </div>
          <BookOpen className="absolute right-[-20px] bottom-[-20px] w-64 h-64 text-white opacity-5 rotate-12" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="font-bold text-foreground">Search Results {results.length > 0 && <span className="text-muted-foreground font-normal ml-2">({results.length})</span>}</h2>
              {loading && <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />}
            </div>

            {results.length === 0 && !loading ? (
              <div className="bg-white rounded-xl border border-border p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground opacity-30" />
                </div>
                <h3 className="text-lg font-bold">Start your search</h3>
                <p className="text-muted-foreground mt-1">Enter a product name or partial HS code above to see tariff details.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((r, i) => (
                  <div key={i} className="bg-white rounded-xl border border-border p-5 hover:border-primary/40 transition-all cursor-pointer group shadow-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-primary/10 text-primary font-mono font-bold rounded-md text-sm">{r.code}</span>
                          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> FBR Verified
                          </span>
                        </div>
                        <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{r.description}</h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-muted/30 p-2.5 rounded-lg border border-border/50">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Customs Duty</p>
                            <p className="font-bold text-foreground mt-1">{r.duty}</p>
                          </div>
                          <div className="bg-muted/30 p-2.5 rounded-lg border border-border/50">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Sales Tax</p>
                            <p className="font-bold text-foreground mt-1">{r.salesTax}</p>
                          </div>
                          <div className="bg-muted/30 p-2.5 rounded-lg border border-border/50">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Income Tax</p>
                            <p className="font-bold text-foreground mt-1">{r.incomeTax}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <button onClick={(e) => { e.stopPropagation(); copyCode(r.code); }} className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-primary transition-all">
                          <Copy className="w-5 h-5" />
                        </button>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-all p-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-blue-700">
                <Info className="w-4 h-4" />
                <h3 className="font-bold text-sm">Need Help?</h3>
              </div>
              <p className="text-xs text-blue-600/80 leading-relaxed font-medium">HS Codes are critical for international trade. If you're unsure about a classification, consult with our compliance team.</p>
              <button className="w-full mt-4 py-2 bg-white text-blue-700 rounded-lg text-xs font-bold shadow-sm border border-blue-200">Contact Expert</button>
            </div>

            <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-sm mb-4">Compliance Resources</h3>
              <div className="space-y-3">
                {[
                  { label: "FBR Import Policy 2026", icon: BookOpen },
                  { label: "Prohibited Items List", icon: ShieldCheck },
                  { label: "SRO Search Portal", icon: HelpCircle },
                ].map(item => (
                  <button key={item.label} className="w-full flex items-center justify-between p-2.5 hover:bg-muted rounded-lg transition-colors group">
                    <span className="flex items-center gap-3 text-xs font-bold text-muted-foreground group-hover:text-foreground">
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </span>
                    <ArrowRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HSCodeLookup;
