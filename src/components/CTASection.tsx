const CTASection = () => (
  <section className="py-24 px-8">
    <div className="max-w-7xl mx-auto gradient-primary rounded-3xl p-12 md:p-24 text-center text-primary-foreground relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 border-2 border-current rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 border-4 border-current rounded-full" />
      </div>
      <h2 className="text-4xl md:text-6xl font-headline font-extrabold mb-8 relative z-10">
        Ready to Master Global Trade?
      </h2>
      <p className="text-xl max-w-2xl mx-auto mb-12 relative z-10 opacity-90">
        Join thousands of trade agents leveraging the digital ledger for smarter, faster, and more reliable logistics.
      </p>
      <div className="flex flex-wrap justify-center gap-6 relative z-10">
        <button className="bg-card text-primary px-10 py-5 rounded-full font-bold text-lg hover:opacity-90 transition-all">
          Get Started Free
        </button>
        <button className="border border-current/30 px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all text-primary-foreground">
          Contact Sales
        </button>
      </div>
    </div>
  </section>
);

export default CTASection;
