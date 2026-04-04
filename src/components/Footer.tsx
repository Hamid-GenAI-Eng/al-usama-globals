const Footer = () => (
  <footer className="bg-surface-bright py-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-8 max-w-7xl mx-auto">
      <div className="space-y-6">
        <div className="text-lg font-black text-foreground uppercase tracking-tighter font-headline">Al-Usama Global</div>
        <p className="text-muted-foreground text-xs leading-relaxed max-w-xs">
          Redefining global shipping with architectural precision and digital intelligence.
        </p>
      </div>
      {[
        { title: "Product", links: ["Tracking", "Analytics", "Compliance"] },
        { title: "Company", links: ["About Us", "Global Network", "Careers"] },
        { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Compliance"] },
      ].map((col) => (
        <div key={col.title}>
          <h5 className="font-bold text-sm mb-6 text-foreground">{col.title}</h5>
          <ul className="space-y-4">
            {col.links.map((link) => (
              <li key={link}>
                <a href="#" className="text-muted-foreground hover:underline transition-all text-xs">{link}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="max-w-7xl mx-auto px-8 mt-12 pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-muted-foreground text-xs">© 2024 Al-Usama Global Logistics. All rights reserved.</p>
      <div className="flex gap-6">
        {["🌐", "✉️", "🔗"].map((icon, i) => (
          <a key={i} href="#" className="text-muted-foreground hover:text-primary transition-colors text-lg">{icon}</a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
