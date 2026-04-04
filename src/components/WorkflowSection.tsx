const steps = [
  { icon: "🔗", title: "1. Connect", desc: "Integrate your current ERP and shipping partners into the Al-Usama ledger via our universal API." },
  { icon: "📍", title: "2. Track", desc: "Watch your global operations synchronize. Real-time updates push directly to your stakeholder dashboard." },
  { icon: "📈", title: "3. Scale", desc: "Use our data-driven suggestions to optimize routes and expand your trade reach into new territories." },
];

const WorkflowSection = () => (
  <section className="py-32 bg-background">
    <div className="max-w-7xl mx-auto px-8">
      <div className="text-center mb-20">
        <p className="text-primary font-bold uppercase tracking-widest text-xs mb-4">The Workflow</p>
        <h2 className="text-4xl font-headline font-extrabold text-foreground">Three Steps to Total Visibility</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-12 relative">
        <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-px bg-outline-variant/30" />
        {steps.map((s) => (
          <div key={s.title} className="relative text-center">
            <div className="w-20 h-20 bg-card shadow-sm rounded-full flex items-center justify-center mx-auto mb-8 relative z-10 text-3xl">
              {s.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">{s.title}</h3>
            <p className="text-muted-foreground text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WorkflowSection;
