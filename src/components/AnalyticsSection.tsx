const AnalyticsSection = () => (
  <section className="py-32 bg-surface-container-low overflow-hidden">
    <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-20 items-center">
      {/* Dashboard Card */}
      <div className="relative">
        <div className="bg-card rounded-xl shadow-2xl p-8 relative z-10">
          <div className="flex justify-between items-center mb-8">
            <h4 className="font-bold text-lg text-foreground">Active Logistics Flow</h4>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-primary" />
              <span className="w-3 h-3 rounded-full bg-secondary-container" />
            </div>
          </div>
          <div className="space-y-6">
            {[2/3, 1/2, 3/4].map((w, i) => (
              <div key={i} className="h-4 bg-surface-container-high rounded-full w-full relative">
                <div className="absolute inset-y-0 left-0 bg-primary rounded-full" style={{ width: `${w * 100}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-3 gap-4">
            <div className="bg-surface-bright p-4 rounded-lg">
              <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Efficiency</p>
              <p className="text-xl font-bold text-primary">+24%</p>
            </div>
            <div className="bg-surface-bright p-4 rounded-lg">
              <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Cost</p>
              <p className="text-xl font-bold text-tertiary">-12%</p>
            </div>
            <div className="bg-surface-bright p-4 rounded-lg">
              <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Risk</p>
              <p className="text-xl font-bold text-secondary">Low</p>
            </div>
          </div>
        </div>
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Text */}
      <div>
        <h2 className="text-4xl font-headline font-extrabold tracking-tight mb-6 text-foreground">
          Analytical Power at <span className="text-primary">Global Scale.</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg mb-8">
          Stop guessing. Our dashboard transforms chaotic shipping data into an editorial-grade ledger of truth. Get the insights you need to optimize your fleet and reduce idle port time.
        </p>
        <ul className="space-y-4">
          {["Predictive Bottleneck Detection", "Carbon Footprint Auditing", "Automated Vendor Scorecards"].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="text-primary text-xl">✓</span>
              <span className="font-medium text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default AnalyticsSection;
