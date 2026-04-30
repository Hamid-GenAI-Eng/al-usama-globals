import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Ship, Cog, BarChart3, FileText, HelpCircle, LogOut, Bell, MessageSquare, Search, Menu, X, Users, Building2, ShoppingCart, TrendingUp, Scale, Wallet, ShieldCheck } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Shipments", icon: Ship, path: "/shipments" },
  { label: "Documents", icon: FileText, path: "/documents" },
  { label: "Suppliers", icon: Building2, path: "/suppliers" },
  { label: "Buyers", icon: Users, path: "/buyers" },
  { label: "Purchase Orders", icon: ShoppingCart, path: "/orders/purchase" },
  { label: "Sales Orders", icon: TrendingUp, path: "/orders/sales" },
  { label: "Customs", icon: Scale, path: "/customs/hs-codes" },
  { label: "Finance", icon: Wallet, path: "/finance" },
  { label: "Analytics", icon: BarChart3, path: "/analytics" },
  { label: "Admin", icon: ShieldCheck, path: "/admin/users" },
  { label: "Settings", icon: Cog, path: "/settings" },
];

const DashboardLayout = ({ children, title, showSearch = false, showTabs = false }: {
  children: React.ReactNode;
  title?: string;
  showSearch?: boolean;
  showTabs?: boolean;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shipments/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static z-50 inset-y-0 left-0 w-[220px] bg-white border-r border-border flex flex-col transition-transform duration-200 ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="flex items-center gap-2.5 px-5 py-5">
          <img src={logo} alt="Al-Usama Global" className="h-9 w-9 rounded-lg" />
          <div>
            <p className="text-sm font-bold text-foreground font-headline leading-tight">Al-Usama Global</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-semibold">Architectural Ledger</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-0.5">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? "bg-primary/8 text-primary border-r-[3px] border-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="w-[18px] h-[18px]" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 space-y-0.5 border-t border-border">
          <Link to="/support" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted">
            <HelpCircle className="w-[18px] h-[18px]" />
            Support
          </Link>
          <Link to="/login" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted">
            <LogOut className="w-[18px] h-[18px]" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-border flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button className="md:hidden" onClick={() => setMobileOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            {showSearch && (
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search shipments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 w-[280px] bg-muted rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-primary/20"
                />
              </form>
            )}
            {title && !showSearch && (
              <h1 className="text-lg font-bold font-headline text-foreground">{title}</h1>
            )}
            {showTabs && (
              <div className="flex items-center gap-6 ml-4">
                {["Active", "Pending", "Archive"].map((tab, i) => (
                  <button
                    key={tab}
                    className={`text-sm font-semibold pb-1 border-b-2 transition-colors ${
                      i === 0 ? "text-primary border-primary" : "text-muted-foreground border-transparent hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-muted-foreground hover:text-foreground">
              <Bell className="w-5 h-5" />
            </button>
            <button className="text-muted-foreground hover:text-foreground">
              <MessageSquare className="w-5 h-5" />
            </button>
            <Link to="/profile" className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-foreground">Captain Usama</p>
                <p className="text-[11px] text-muted-foreground">Fleet Manager</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">CU</span>
              </div>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-[hsl(210,33%,98%)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
