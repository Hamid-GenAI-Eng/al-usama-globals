import trackingMap from "@/assets/tracking-map.jpg";

const BentoGrid = () => (
  <section className="py-32 bg-background">
    <div className="max-w-7xl mx-auto px-8">
      <div className="mb-16">
        <h2 className="text-4xl font-headline font-extrabold tracking-tight mb-4 text-foreground">
          Precision Logistics Infrastructure
        </h2>
        <p className="text-muted-foreground max-w-xl">
          Every module is designed to reduce cognitive load while maintaining absolute data integrity across the global supply chain.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Real-Time Tracking */}
        <div className="md:col-span-8 bg-card p-10 rounded-xl shadow-sm border border-outline-variant/10 flex flex-col justify-between card-interactive">
          <div>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 text-2xl">📊</div>
            <h3 className="text-2xl font-headline font-bold mb-3 text-foreground">Real-Time Shipment Tracking</h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Follow every unit with satellite-grade precision. Our "Node-and-Path" visualizer provides immediate clarity on global movement.
            </p>
          </div>
          <img src={trackingMap} alt="Global trade routes" className="w-full h-48 object-cover rounded-lg" loading="lazy" width={1024} height={512} />
        </div>

        {/* Automated Documentation */}
        <div className="md:col-span-4 gradient-primary text-primary-foreground p-10 rounded-xl flex flex-col justify-between hover-lift">
          <div>
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-6 text-2xl">📄</div>
            <h3 className="text-2xl font-headline font-bold mb-3">Automated Documentation</h3>
            <p className="opacity-80 leading-relaxed">
              Eliminate manual ledger entry. Smart contracts generate compliance docs instantly upon milestone triggers.
            </p>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10">
            <span className="text-4xl font-black">99.8%</span>
            <p className="text-xs uppercase tracking-widest mt-1 opacity-70">Accuracy Rate</p>
          </div>
        </div>

        {/* Global Network */}
        <div className="md:col-span-4 bg-surface-container-low p-10 rounded-xl card-interactive">
          <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary mb-6 text-2xl">🌐</div>
          <h3 className="text-xl font-headline font-bold mb-3 text-foreground">Global Network</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Direct API access to over 400 port authorities and 150 shipping lines globally.
          </p>
        </div>

        {/* Advanced Analytics */}
        <div className="md:col-span-8 bg-card p-10 rounded-xl shadow-sm border border-outline-variant/10 flex flex-col md:flex-row gap-8 items-center card-interactive">
          <div className="flex-1">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 text-2xl">📈</div>
            <h3 className="text-xl font-headline font-bold mb-3 text-foreground">Advanced Data Analytics</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Predictive modeling for route optimization and seasonal demand spikes.
            </p>
          </div>
          <div className="flex-1 flex gap-2 items-end justify-center">
            <div className="w-8 h-32 bg-primary-container rounded-full" />
            <div className="w-8 h-48 bg-primary-container/60 rounded-full" />
            <div className="w-8 h-24 bg-primary-container rounded-full" />
            <div className="w-8 h-40 bg-primary-container/40 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BentoGrid;
