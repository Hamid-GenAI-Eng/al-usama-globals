import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Globe } from "lucide-react";
import loginHero from "@/assets/login-hero.jpg";
import AuthFooter from "@/components/AuthFooter";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left — Hero panel */}
        <div className="relative w-full md:w-[55%] min-h-[400px] md:min-h-screen overflow-hidden">
          <img
            src={loginHero}
            alt="Global shipping port"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(180,40%,30%)]/70 via-[hsl(210,60%,30%)]/60 to-[hsl(220,100%,30%)]/90" />

          <div className="relative z-10 flex flex-col justify-end h-full p-10 md:p-16 pb-16">
            <div className="inline-flex items-center gap-2 bg-foreground/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium w-fit mb-6">
              <Globe className="w-4 h-4" />
              Global Import & Export Excellence
            </div>
            <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Architecting the Future of Global Trade Operations.
            </h1>
            <p className="text-white/80 text-base max-w-lg mb-10">
              Precision logistics and secure architectural ledgers for enterprise-scale supply chain management.
            </p>
            <div className="flex items-center gap-8">
              <div>
                <div className="text-3xl font-extrabold text-white font-headline">140+</div>
                <div className="text-xs text-white/70 uppercase tracking-widest mt-1">Countries Connected</div>
              </div>
              <div className="w-px h-12 bg-white/30" />
              <div>
                <div className="text-3xl font-extrabold text-white font-headline">2.4M</div>
                <div className="text-xs text-white/70 uppercase tracking-widest mt-1">Annual Shipments</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Login form */}
        <div className="w-full md:w-[45%] flex items-center justify-center p-8 md:p-16 bg-surface-bright">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold text-foreground font-headline">Welcome back</h2>
              <p className="text-muted-foreground mt-2">
                Please enter your credentials to access your global logistics dashboard.
              </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                  Corporate Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="name@al-usama.com"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Security Password
                  </label>
                  <Link to="/forgot-password" className="text-sm text-primary font-semibold hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    defaultValue="password1234"
                    className="w-full pl-12 pr-12 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={keepLoggedIn}
                  onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                  className="w-5 h-5 rounded border-border text-primary focus:ring-primary/30"
                />
                <span className="text-sm text-foreground">Keep me logged in for 30 days</span>
              </label>

              <button
                type="submit"
                className="w-full gradient-primary text-primary-foreground py-4 rounded-full font-headline font-bold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-all"
              >
                Sign In to Portal
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="text-center space-y-3 pt-2">
              <p className="text-muted-foreground text-sm">New to AL-Usama-Import and Export System?</p>
              <Link
                to="/register"
                className="inline-block border border-border rounded-full px-8 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all"
              >
                Request Access Credentials
              </Link>
            </div>

            <p className="text-center text-[10px] text-muted-foreground uppercase tracking-[0.2em] pt-4">
              Secured by Enterprise Architecture Protocol 2.0
            </p>
          </div>
        </div>
      </div>
      <AuthFooter />
    </div>
  );
};

export default Login;
