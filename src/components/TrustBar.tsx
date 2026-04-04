const TrustBar = () => (
  <section className="py-12 bg-surface-container-low">
    <div className="max-w-7xl mx-auto px-8">
      <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-10">
        Trusted by Global Trade Authorities
      </p>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        {["MARITIME", "CARGOCO", "GLOBALNET", "TRADESYNC", "PATHFINDER"].map((name) => (
          <div key={name} className="h-8 flex items-center font-headline font-black text-2xl text-foreground">
            {name}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBar;
