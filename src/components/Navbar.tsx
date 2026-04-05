import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav shadow-sm">
      <div className="flex justify-between items-center px-8 py-3 max-w-screen-2xl mx-auto">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Al-Usama Global" className="h-10 w-auto" />
          <span className="text-xl font-bold tracking-tighter text-foreground font-headline">Al-Usama Global</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Services", href: "#" },
            { label: "Shipments", href: "/shipments" },
            { label: "Pricing", href: "#" },
            { label: "About", href: "#" },
          ].map((item) => (
            <Link key={item.label} to={item.href} className="text-muted-foreground hover:text-primary transition-colors font-headline tracking-tight font-medium text-sm">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-primary font-headline hidden md:block">
            Sign In
          </Link>
          <Link to="/login" className="gradient-primary text-primary-foreground px-6 py-2 rounded-full font-headline text-sm font-bold hover:opacity-90 transition-all">
            Get Started
          </Link>
          <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            ☰
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden px-8 pb-4 flex flex-col gap-3 bg-card">
          <Link to="/shipments" className="text-muted-foreground hover:text-primary font-headline text-sm font-medium py-2">Shipments</Link>
          <Link to="/login" className="text-muted-foreground hover:text-primary font-headline text-sm font-medium py-2">Sign In</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
