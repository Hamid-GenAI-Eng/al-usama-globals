import heroImg from "@/assets/hero-port.jpg";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img src={heroImg} alt="Cargo port at dawn" className="w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 hero-overlay" />
    </div>
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
          <button className="gradient-primary text-primary-foreground px-8 py-4 rounded-full font-bold shadow-lg hover:opacity-90 transition-all">
            Get Started Today
          </button>
          <button className="bg-surface-container-high text-primary px-8 py-4 rounded-full font-bold hover:bg-surface-container transition-all">
            Book a Demo
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
