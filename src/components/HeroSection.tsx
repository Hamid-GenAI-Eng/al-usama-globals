import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heroPort from "@/assets/hero-port.jpg";
import heroShip from "@/assets/hero-ship.jpg";
import heroWarehouse from "@/assets/hero-warehouse.jpg";
import heroCranes from "@/assets/hero-cranes.jpg";

const images = [heroPort, heroShip, heroWarehouse, heroCranes];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background images with crossfade */}
      {images.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current && fade ? 1 : 0 }}
        >
          <img src={img} alt="Logistics background" className="w-full h-full object-cover" width={1920} height={1080} />
        </div>
      ))}
      {/* Ken Burns subtle zoom on active */}
      <style>{`
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
      `}</style>
      <div className="absolute inset-0 z-[1] hero-overlay" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-container text-secondary-container-foreground rounded-full">
            <span className="text-[10px] font-bold uppercase tracking-widest">Next-Gen Logistics</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter text-foreground leading-[1.1]">
            The Digital Ledger for <span className="text-primary">Global Logistics.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            Al-Usama Global empowers enterprise trade with a sophisticated SaaS platform. Manage imports, exports, and compliance with the precision of an architectural ledger.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/login" className="gradient-primary text-primary-foreground px-8 py-4 rounded-full font-bold shadow-lg hover:opacity-90 transition-all">
              Get Started Today
            </Link>
            <Link to="/register" className="bg-surface-container-high text-primary px-8 py-4 rounded-full font-bold hover:bg-surface-container transition-all">
              Book a Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => { setFade(false); setTimeout(() => { setCurrent(i); setFade(true); }, 300); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-primary" : "w-2 bg-white/40"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
