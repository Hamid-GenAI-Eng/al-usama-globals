import { Link, useSearchParams } from "react-router-dom";
import { Download, SlidersHorizontal, X, Ship, Plane, Truck, Package, ChevronLeft, ChevronRight, MapPin, MoreVertical, Plus } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import trackingMap from "@/assets/tracking-map.jpg";

const results = [
  {
    id: "SH-992-CN", originCity: "Shanghai, CN", originDetail: "Port of Yangshan", destCity: "Hamburg, DE", destDetail: "CTA Terminal",
    cargo: "Consumer Electronics", cargoType: "40ft HC • 18.5 Tons", icon: Package, status: "IN TRANSIT", statusColor: "text-blue-600",
    delivery: "Oct 24, 2023", deliverySub: "ON TIME", deliveryColor: "text-green-600",
  },
  {
    id: "SH-104-CN", originCity: "Shanghai, CN", originDetail: "Pudong Int'l", destCity: "New York, US", destDetail: "JFK Airport",
    cargo: "Industrial Parts", cargoType: "Air Freight • 2.1 Tons", icon: Plane, status: "PENDING", statusColor: "text-gray-600",
    delivery: "Oct 12, 2023", deliverySub: "PROCESSING", deliveryColor: "text-muted-foreground",
  },
  {
    id: "LA-551-SH", originCity: "Los Angeles, US", originDetail: "Port of LA", destCity: "Shanghai, CN", destDetail: "Port of Waigaoqiao",
    cargo: "Raw Materials", cargoType: "Bulk Carrier • 42 Tons", icon: Ship, status: "DELAYED", statusColor: "text-red-600",
    delivery: "Nov 02, 2023", deliverySub: "+4 DAYS", deliveryColor: "text-red-600",
  },
  {
    id: "SH-330-JP", originCity: "Shanghai, CN", originDetail: "Port of Yangshan", destCity: "Tokyo, JP", destDetail: "Ohi Terminal",
    cargo: "Textile & Apparel", cargoType: "20ft Dry • 8.2 Tons", icon: Truck, status: "DELIVERED", statusColor: "text-green-600",
    delivery: "Oct 05, 2023", deliverySub: "COMPLETED", deliveryColor: "text-green-600",
  },
];

const statusDot: Record<string, string> = {
  "IN TRANSIT": "bg-blue-500",
  PENDING: "bg-gray-400",
  DELAYED: "bg-red-500",
  DELIVERED: "bg-green-500",
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "Shanghai";

  return (
    <DashboardLayout showSearch>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider">
          <Link to="/shipments" className="text-muted-foreground hover:text-foreground">Shipments</Link>
          <span className="text-muted-foreground">›</span>
          <span className="text-primary">Search Results</span>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold font-headline text-foreground">
              Results for "<span className="text-primary">{query}</span>"
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Showing 12 active shipments originating or destined for {query} ports.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
            <button className="gradient-primary text-white px-4 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:opacity-90">
              <SlidersHorizontal className="w-4 h-4" />
              Advanced Filters
            </button>
          </div>
        </div>

        {/* Quick filters */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Quick Filters:</span>
          <span className="flex items-center gap-1 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-xs font-semibold text-green-700">
            Status: In Transit <X className="w-3 h-3 cursor-pointer" />
          </span>
          <span className="px-3 py-1.5 bg-muted rounded-full text-xs font-semibold text-foreground">Date: Last 30 Days</span>
          <span className="px-3 py-1.5 bg-muted rounded-full text-xs font-semibold text-foreground">Type: Sea Freight</span>
          <span className="ml-auto text-sm text-muted-foreground font-semibold">12 Results found</span>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Shipment ID", "Route (Origin › Dest)", "Cargo Details", "Current Status", "Est. Delivery", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-4">
                    <Link to={`/shipments/${r.id}`} className="text-primary font-bold text-sm hover:underline">{r.id}</Link>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-sm font-semibold">{r.originCity}</p>
                        <p className="text-[10px] text-muted-foreground">{r.originDetail}</p>
                      </div>
                      <span className="text-muted-foreground text-xs">→</span>
                      <div>
                        <p className="text-sm font-semibold">{r.destCity}</p>
                        <p className="text-[10px] text-muted-foreground">{r.destDetail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <r.icon className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-semibold">{r.cargo}</p>
                        <p className="text-[10px] text-muted-foreground">{r.cargoType}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`flex items-center gap-1.5 text-xs font-bold ${r.statusColor}`}>
                      <span className={`w-2 h-2 rounded-full ${statusDot[r.status]}`} />
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-foreground">{r.delivery}</p>
                    <p className={`text-[10px] font-bold uppercase ${r.deliveryColor}`}>{r.deliverySub}</p>
                  </td>
                  <td className="px-4 py-4">
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <p className="text-sm text-muted-foreground">Showing 1 to 4 of 12 results</p>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-lg hover:bg-muted"><ChevronLeft className="w-4 h-4" /></button>
              <button className="w-8 h-8 rounded-lg bg-primary text-white text-sm font-bold">1</button>
              <button className="w-8 h-8 rounded-lg hover:bg-muted text-sm">2</button>
              <button className="w-8 h-8 rounded-lg hover:bg-muted text-sm">3</button>
              <button className="p-1.5 rounded-lg hover:bg-muted"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Bottom cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 relative rounded-xl overflow-hidden h-[200px]">
            <img src={trackingMap} alt="Geographic distribution" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" />
                <p className="text-sm font-bold text-white">Geographic Distribution</p>
              </div>
              <p className="text-xs text-white/70 mt-0.5">Live visualization of {query} hub activity</p>
            </div>
            <div className="absolute bottom-4 right-4 space-y-2">
              <div className="flex items-center gap-2 bg-white/90 rounded-lg px-3 py-1.5 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-blue-500" /> 8 Outbound Vessels
              </div>
              <div className="flex items-center gap-2 bg-white/90 rounded-lg px-3 py-1.5 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-red-500" /> 4 Inbound Air-Freight
              </div>
            </div>
          </div>
          <div className="gradient-primary rounded-xl p-6 text-white flex flex-col justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Total Value</p>
              <p className="text-3xl font-bold font-headline mt-1">$2.4M USD</p>
              <p className="text-xs text-white/80 mt-1">Total cargo value currently in transit via {query} node.</p>
            </div>
            <button className="w-full mt-4 py-2.5 bg-white/20 rounded-lg text-sm font-semibold hover:bg-white/30 transition-colors">View Detailed Audit</button>
          </div>
        </div>

        {/* New Shipment floating button */}
        <Link to="/shipments/create" className="fixed bottom-6 left-6 gradient-primary text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg hover:opacity-90 z-20">
          <Plus className="w-4 h-4" />
          New Shipment
        </Link>
      </div>
    </DashboardLayout>
  );
};

export default SearchResults;
