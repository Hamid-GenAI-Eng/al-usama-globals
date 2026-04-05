import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Filter, Ship, Truck, Plane, Package, ChevronLeft, ChevronRight, MoreVertical, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const shipments = [
  { id: "SHP-8829-DXB", origin: "Dubai Terminal 3", originCountry: "United Arab Emirates", dest: "Port of Singapore", destDetail: "Main Terminal", vessel: "Oceanic Voyager V2", date: "Oct 24, 2023", status: "IN TRANSIT", icon: Ship },
  { id: "SHP-9012-SHA", origin: "Shanghai Deepwater", originCountry: "China", dest: "Rotterdam Gateway", destDetail: "Netherlands", vessel: "Evergreen Horizon", date: "Oct 20, 2023", status: "DELIVERED", icon: Package },
  { id: "SHP-4431-LHR", origin: "London Heathrow", originCountry: "United Kingdom", dest: "JFK Cargo Hub", destDetail: "USA", vessel: "Atlas Air F772", date: "Oct 26, 2023", status: "DELAYED", icon: Plane },
  { id: "SHP-1120-KHI", origin: "Port of Karachi", originCountry: "Pakistan", dest: "Jebel Ali Port", destDetail: "United Arab Emirates", vessel: "Indus Star", date: "Oct 30, 2023", status: "PENDING", icon: Ship },
];

const statusColor: Record<string, string> = {
  "IN TRANSIT": "bg-blue-50 text-blue-700 border border-blue-200",
  DELIVERED: "bg-green-50 text-green-700 border border-green-200",
  DELAYED: "bg-red-50 text-red-700 border border-red-200",
  PENDING: "bg-gray-50 text-gray-700 border border-gray-200",
};

const ShipmentList = () => {
  const navigate = useNavigate();

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
        <div className="bg-white rounded-xl p-5 border border-border">
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Origin / Destination</label>
              <div className="flex gap-2">
                <select className="px-3 py-2 bg-muted rounded-lg text-sm border-none min-w-[140px]">
                  <option>Any Origin</option>
                </select>
                <select className="px-3 py-2 bg-muted rounded-lg text-sm border-none min-w-[140px]">
                  <option>Any Destination</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Status</label>
              <select className="px-3 py-2 bg-muted rounded-lg text-sm border-none min-w-[140px]">
                <option>All Statuses</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Date Range</label>
              <input type="text" defaultValue="Oct 12 - Oct 28" className="px-3 py-2 bg-muted rounded-lg text-sm border-none w-[160px]" readOnly />
            </div>
            <button className="p-2 bg-muted rounded-lg hover:bg-muted/80">
              <Filter className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="text-sm text-muted-foreground hover:text-foreground font-medium">Clear Filters</button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Shipment ID", "Origin & Route", "Destination", "Vessel Name", "Departure Date", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shipments.map((s) => (
                <tr key={s.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => navigate(`/shipments/${s.id}`)}>
                  <td className="px-4 py-4">
                    <Link to={`/shipments/${s.id}`} className="text-primary font-bold text-sm hover:underline">#{s.id}</Link>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <s.icon className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{s.origin}</p>
                        <p className="text-xs text-muted-foreground">{s.originCountry}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm font-semibold text-foreground">{s.dest}</p>
                    <p className="text-xs text-muted-foreground">{s.destDetail}</p>
                  </td>
                  <td className="px-4 py-4 text-sm italic text-muted-foreground">{s.vessel}</td>
                  <td className="px-4 py-4">
                    <span className={`text-sm ${s.status === "DELAYED" ? "text-red-600 font-semibold" : "text-foreground"}`}>{s.date}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${statusColor[s.status]}`}>{s.status}</span>
                  </td>
                  <td className="px-4 py-4">
                    <button className="text-muted-foreground hover:text-foreground" onClick={(e) => e.stopPropagation()}>
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <p className="text-sm text-muted-foreground">Showing 1-10 of 248 total shipments</p>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-lg hover:bg-muted"><ChevronLeft className="w-4 h-4" /></button>
              <button className="w-8 h-8 rounded-lg bg-primary text-white text-sm font-bold">1</button>
              <button className="w-8 h-8 rounded-lg hover:bg-muted text-sm">2</button>
              <button className="w-8 h-8 rounded-lg hover:bg-muted text-sm">3</button>
              <button className="p-1.5 rounded-lg hover:bg-muted"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "IN TRANSIT", value: "142", sub: "+12% from last week", icon: Truck, color: "text-primary", bg: "bg-blue-50" },
            { label: "DELIVERED TODAY", value: "28", sub: "Scheduled: 35 units", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
            { label: "DELAYED ALERTS", value: "07", sub: "Requires Action", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
            { label: "TOTAL MANAGED", value: "1.2k", sub: "Monthly quota: 85%", icon: Package, color: "text-muted-foreground", bg: "bg-gray-50" },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.bg} rounded-xl p-5 border border-border/50`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-[11px] font-bold uppercase tracking-wider ${stat.color}`}>{stat.label}</p>
                  <p className="text-3xl font-bold font-headline text-foreground mt-1">{stat.value}</p>
                  <p className={`text-xs mt-1 ${stat.color}`}>{stat.sub}</p>
                </div>
                <stat.icon className={`w-10 h-10 ${stat.color} opacity-20`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ShipmentList;
