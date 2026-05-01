import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Filter, Ship, Truck, Plane, Package, ChevronLeft, ChevronRight, MoreVertical, TrendingUp, AlertTriangle, CheckCircle, Search } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import api from "@/lib/api";

const statusColor: Record<string, string> = {
  "IN_TRANSIT": "bg-blue-50 text-blue-700 border border-blue-200",
  "DELIVERED": "bg-green-50 text-green-700 border border-green-200",
  "DELAYED": "bg-red-50 text-red-700 border border-red-200",
  "PENDING": "bg-gray-50 text-gray-700 border border-gray-200",
};

const ShipmentList = () => {
  const navigate = useNavigate();
  const [shipments, setShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: "", origin: "", destination: "" });

  const fetchShipments = async () => {
    setLoading(true);
    try {
      const response = await api.get("/shipments", { params: filters });
      setShipments(response.data.data);
    } catch (error) {
      console.error("Failed to fetch shipments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, [filters]);

  return (
    <DashboardLayout showSearch showTabs>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold font-headline text-foreground">Shipment Ledger</h1>
            <p className="text-sm text-muted-foreground mt-1">Global logistics and freight monitoring interface</p>
          </div>
          <Link to="/shipments/create" className="gradient-primary text-white px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-all">
            <Plus className="w-4 h-4" />
            Create Shipment
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-5 border border-border shadow-sm">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Search Route</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Origin or Destination..." 
                  className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg text-sm border-none"
                  onChange={(e) => setFilters(prev => ({ ...prev, origin: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Status</label>
              <select 
                className="px-3 py-2 bg-muted rounded-lg text-sm border-none min-w-[140px]"
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="IN_TRANSIT">In Transit</option>
                <option value="DELIVERED">Delivered</option>
                <option value="DELAYED">Delayed</option>
              </select>
            </div>
            <button 
              onClick={() => setFilters({ status: "", origin: "", destination: "" })}
              className="text-sm text-primary hover:text-primary/80 font-semibold py-2"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center text-muted-foreground">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
              <p className="font-medium animate-pulse">Syncing with Trade Ledger...</p>
            </div>
          ) : shipments.length === 0 ? (
            <div className="p-20 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Ship className="w-8 h-8 text-muted-foreground opacity-50" />
              </div>
              <h3 className="text-lg font-bold font-headline">No shipments found</h3>
              <p className="text-muted-foreground max-w-xs mt-1">We couldn't find any shipments matching your criteria. Create a new one to get started.</p>
              <Link to="/shipments/create" className="mt-6 px-6 py-2 bg-primary text-white rounded-full text-sm font-bold">New Shipment</Link>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-muted/30 border-b border-border">
                  {["Shipment ID", "Origin", "Destination", "Vessel Name", "Last Updated", "Status", ""].map((h) => (
                    <th key={h} className="text-left px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {shipments.map((s) => (
                  <tr key={s.id} className="hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => navigate(`/shipments/${s.id}`)}>
                    <td className="px-6 py-4">
                      <span className="text-primary font-bold text-sm">#{s.shipmentId}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Ship className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-semibold">{s.origin}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">{s.destination}</td>
                    <td className="px-6 py-4 text-sm italic text-muted-foreground">{s.vesselName || "—"}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(s.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${statusColor[s.status] || statusColor.PENDING}`}>
                        {s.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 hover:bg-muted rounded">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
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

export default ShipmentList;
