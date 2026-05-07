import testimonialImg from "@/assets/testimonial-person.jpg";

const TestimonialsSection = () => (
  <section className="py-32 bg-card">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <span className="text-tertiary font-black text-6xl opacity-20">"</span>
          <p className="text-3xl font-headline font-semibold text-foreground leading-tight">
            AL-Usama-Import and Export System has completely transformed how we handle our Mediterranean exports. The 'Digital Ledger' approach provides a level of clarity we simply couldn't find elsewhere.
          </p>
          <div className="flex items-center gap-4">
            <img src={testimonialImg} alt="Marco Valenti" className="w-14 h-14 rounded-full object-cover" loading="lazy" width={56} height={56} />
            <div>
              <p className="font-bold text-foreground">Marco Valenti</p>
              <p className="text-sm text-muted-foreground">Logistics Director, Valenti Trade Group</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-surface-container-low p-8 rounded-xl">
            <p className="text-sm text-muted-foreground italic mb-6">"Automated documentation saved our team 40+ hours a week in manual entry."</p>
            <p className="font-bold text-sm text-foreground">Elena Petrova</p>
            <p className="text-xs text-muted-foreground">Global Ops Lead</p>
          </div>
          <div className="bg-surface-container-low p-8 rounded-xl mt-12">
            <p className="text-sm text-muted-foreground italic mb-6">"The tracking accuracy is unmatched in the mid-market SaaS space."</p>
            <p className="font-bold text-sm text-foreground">James Wilson</p>
            <p className="text-xs text-muted-foreground">Managing Partner</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
