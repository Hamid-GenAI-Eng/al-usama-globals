import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Search, BookOpen, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface HSEntry {
  code: string;
  description: string;
  category: string;
  duty: number;
  salesTax: number;
  unit: string;
}

const hsDatabase: HSEntry[] = [
  { code: "8544.42.10", description: "Insulated electric conductors with connectors, for telecom, ≤80V", category: "Electronics", duty: 11, salesTax: 18, unit: "kg" },
  { code: "8517.13.00", description: "Smartphones (cellular network)", category: "Electronics", duty: 20, salesTax: 18, unit: "u" },
  { code: "8518.30.00", description: "Headphones, earphones, earbuds", category: "Electronics", duty: 20, salesTax: 18, unit: "u" },
  { code: "5208.42.00", description: "Woven cotton fabric, dyed, plain weave, >100g/m²", category: "Textiles", duty: 11, salesTax: 18, unit: "m²" },
  { code: "6109.10.00", description: "T-shirts, singlets, knitted, of cotton", category: "Textiles", duty: 16, salesTax: 18, unit: "u" },
  { code: "7308.30.00", description: "Doors, windows and frames, of iron or steel", category: "Steel", duty: 20, salesTax: 18, unit: "kg" },
  { code: "7210.49.00", description: "Flat-rolled iron/steel, plated/coated with zinc", category: "Steel", duty: 11, salesTax: 18, unit: "kg" },
  { code: "8407.31.00", description: "Reciprocating piston engines, ≤50cc", category: "Machinery", duty: 16, salesTax: 18, unit: "u" },
  { code: "8479.89.99", description: "Machines and mechanical appliances, NES", category: "Machinery", duty: 5, salesTax: 18, unit: "u" },
  { code: "3920.10.00", description: "Plates of polymers of ethylene, non-cellular", category: "Polymers", duty: 16, salesTax: 18, unit: "kg" },
  { code: "3923.30.00", description: "Carboys, bottles, flasks of plastics", category: "Polymers", duty: 20, salesTax: 18, unit: "kg" },
  { code: "0902.30.00", description: "Black tea (fermented), in packages ≤3kg", category: "Food", duty: 11, salesTax: 18, unit: "kg" },
  { code: "1006.30.00", description: "Semi-milled or wholly milled rice", category: "Food", duty: 0, salesTax: 0, unit: "kg" },
  { code: "9018.31.00", description: "Syringes, with or without needles", category: "Medical", duty: 0, salesTax: 0, unit: "u" },
];

const HSCodeLookup = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const categories = ["all", ...Array.from(new Set(hsDatabase.map(h => h.category)))];

  const filtered = hsDatabase.filter(h => {
    const matchSearch = !search || h.code.includes(search) || h.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "all" || h.category === category;
    return matchSearch && matchCat;
  });

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Copied ${code}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl">
        <div>
          <h1 className="text-2xl font-bold font-headline">HS Code Lookup</h1>
          <p className="text-sm text-muted-foreground mt-1">Search Pakistan Customs Tariff (PCT) Harmonized System codes for import/export classification</p>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-blue-50 rounded-xl border border-border p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-semibold">PCT 2025-26 Database</p>
            <p className="text-sm text-muted-foreground">{hsDatabase.length}+ codes searchable. Updated as per FBR SRO notifications.</p>
          </div>
          <a href="https://www.fbr.gov.pk/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            FBR Portal <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="bg-white rounded-xl border border-border">
          <div className="p-4 border-b border-border flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by HS code (e.g. 8544) or description..."
                className="w-full pl-9 pr-4 py-2 bg-muted rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <select value={category} onChange={e => setCategory(e.target.value)} className="px-3 py-2 border border-border rounded-lg text-sm bg-white">
              {categories.map(c => <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>)}
            </select>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs text-muted-foreground uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">HS Code</th>
                <th className="px-4 py-3 text-left font-semibold">Description</th>
                <th className="px-4 py-3 text-left font-semibold">Category</th>
                <th className="px-4 py-3 text-right font-semibold">Customs Duty</th>
                <th className="px-4 py-3 text-right font-semibold">Sales Tax</th>
                <th className="px-4 py-3 text-left font-semibold">Unit</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(h => (
                <tr key={h.code} className="border-t border-border hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono font-semibold text-primary">{h.code}</td>
                  <td className="px-4 py-3">{h.description}</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-xs bg-muted">{h.category}</span></td>
                  <td className="px-4 py-3 text-right font-mono font-semibold">{h.duty}%</td>
                  <td className="px-4 py-3 text-right font-mono">{h.salesTax}%</td>
                  <td className="px-4 py-3 text-muted-foreground">{h.unit}</td>
                  <td className="px-2 py-3">
                    <button onClick={() => copyCode(h.code)} className="p-1 text-muted-foreground hover:text-primary"><Copy className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">No HS codes match your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HSCodeLookup;
