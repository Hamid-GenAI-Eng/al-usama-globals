import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Upload, FileText, Filter, Download, MoreVertical, FileCheck, FileWarning, Clock, Search } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import api from "@/lib/api";

const statusColor: Record<string, string> = {
  VERIFIED: "bg-green-50 text-green-700 border border-green-200",
  PROCESSING: "bg-blue-50 text-blue-700 border border-blue-200",
  PENDING: "bg-amber-50 text-amber-700 border border-amber-200",
};

const Documents = () => {
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const response = await api.get("/documents");
        setDocs(response.data.data);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, []);

  const filteredDocs = docs.filter(doc => 
    doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doc.shipment?.shipmentId || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold font-headline text-foreground">Document Vault</h1>
            <p className="text-sm text-muted-foreground mt-1">Centralized trade documentation with cloud storage & shipment linking</p>
          </div>
          <Link to="/documents/upload" className="gradient-primary text-white px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-all shadow-md">
            <Upload className="w-4 h-4" />
            Upload Document
          </Link>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "TOTAL DOCUMENTS", value: docs.length, sub: "Synced from Cloud", icon: FileText, color: "text-primary", bg: "bg-blue-50" },
            { label: "VERIFIED", value: docs.length, sub: "Ready for Customs", icon: FileCheck, color: "text-green-600", bg: "bg-green-50" },
            { label: "CLOUD STORAGE", value: "Active", sub: "Cloudinary CDN", icon: Clock, color: "text-violet-600", bg: "bg-violet-50" },
            { label: "LINKED ASSETS", value: docs.filter(d => d.shipmentId).length, sub: "Assigned to Shipments", icon: FileWarning, color: "text-amber-600", bg: "bg-amber-50" },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.bg} rounded-xl p-5 border border-border/50 shadow-sm`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${stat.color}`}>{stat.label}</p>
                  <p className="text-2xl font-bold font-headline text-foreground mt-1">{stat.value}</p>
                  <p className={`text-[10px] mt-1 ${stat.color} opacity-80`}>{stat.sub}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color} opacity-20`} />
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 border border-border shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search files or shipment IDs..." 
                  className="w-full pl-9 pr-4 py-2 bg-muted rounded-lg text-sm border-none focus:ring-2 focus:ring-primary/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-20 text-center text-muted-foreground flex flex-col items-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
              <p className="font-medium">Connecting to Document Cloud...</p>
            </div>
          ) : filteredDocs.length === 0 ? (
            <div className="p-20 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-muted-foreground opacity-50" />
              </div>
              <h3 className="text-lg font-bold">No documents found</h3>
              <p className="text-muted-foreground mt-1">Upload your first shipment document to see it here.</p>
              <Link to="/documents/upload" className="mt-6 inline-block px-6 py-2 bg-primary text-white rounded-full text-sm font-bold shadow-lg">Upload Now</Link>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/30 border-b border-border">
                  {["Document Name", "Type", "Linked Shipment", "Date Uploaded", "File Info", "Actions"].map((h) => (
                    <th key={h} className="text-left px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="max-w-[240px] truncate">
                          <p className="font-bold text-foreground truncate">{doc.fileName}</p>
                          <p className="text-[10px] text-muted-foreground">ID: {doc.id.substring(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded bg-muted text-[10px] font-bold uppercase">{doc.fileType}</span>
                    </td>
                    <td className="px-6 py-4">
                      {doc.shipment ? (
                        <Link to={`/shipments/${doc.shipmentId}`} className="text-primary font-bold hover:underline">
                          #{doc.shipment.shipmentId}
                        </Link>
                      ) : (
                        <span className="text-muted-foreground italic text-xs">Unlinked</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-primary text-xs font-semibold hover:underline">
                        View Asset
                      </a>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 hover:bg-muted rounded text-muted-foreground">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Documents;
