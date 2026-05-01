import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Lock, ArrowRight, ShieldCheck, BarChart3, Globe, HelpCircle } from "lucide-react";
import registerMap from "@/assets/register-map.jpg";
import AuthFooter from "@/components/AuthFooter";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <nav className="border-b border-border bg-background px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-lg font-extrabold text-foreground font-headline tracking-tight">
          Al-Usama Logistics
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground font-medium">Explore</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground font-medium">Solutions</a>
          <Globe className="w-5 h-5 text-muted-foreground" />
          <HelpCircle className="w-5 h-5 text-muted-foreground" />
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
          {/* Left — Info panel */}
          <div className="w-full md:w-[42%] bg-surface-container-low rounded-2xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-destructive/10 text-destructive text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-6">
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Only
              </span>
              <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
                Global Trade<br />Command Center
              </h2>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed max-w-sm">
                Access high-precision logistics management tools and real-time financial journals for the Al-Usama network.
              </p>
            </div>

            <div className="mt-8">
              <img src={registerMap} alt="Global network" className="w-48 h-auto ml-auto opacity-40 rounded-lg" loading="lazy" width={512} height={512} />
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Enterprise-Grade Security</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Real-time Analytics Dashboard</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="w-full md:w-[58%] bg-card border border-border rounded-2xl p-8 md:p-10">
            <h2 className="text-2xl font-extrabold text-foreground font-headline">Register Administrative Account</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Fill in your corporate details to request system access.
            </p>

            <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AL-Usama-Import and Export System Lt"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                    Admin Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full legal name"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                  Corporate Email Address
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="admin@alusama-global.com"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                  Access Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="password"
                    defaultValue="password1234"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Must contain at least 12 characters, including corporate identifiers.
                </p>
              </div>

              <button
                type="submit"
                className="w-full gradient-primary text-primary-foreground py-4 rounded-full font-headline font-bold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-all"
              >
                Register Account
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <p className="text-center text-xs text-muted-foreground mt-6">
              By registering, you agree to the{" "}
              <a href="#" className="text-primary hover:underline font-medium">Security Architecture</a>
              {" "}and{" "}
              <a href="#" className="text-primary hover:underline font-medium">Compliance Guidelines</a>.
            </p>
          </div>
        </div>
      </div>
      <AuthFooter />
    </div>
  );
};

export default Register;
