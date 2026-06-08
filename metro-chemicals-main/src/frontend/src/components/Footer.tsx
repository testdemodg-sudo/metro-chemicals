import { useLanguage } from "@/contexts/LanguageContext";
import { ExternalLink, FlaskConical, Mail, MapPin, Phone } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Manufacturing", href: "#manufacturing" },
  { label: "Certifications", href: "#certification" },
  { label: "Export", href: "#export" },
  { label: "Global Presence", href: "#global-presence" },
  { label: "Contact Us", href: "#contact" },
];

const chemicalCategories = [
  "Active Pharmaceutical Ingredients",
  "Pharmaceutical Solvents",
  "Laboratory Reagents",
  "Fine Chemicals",
  "Pharmaceutical Excipients",
  "API Intermediates",
];

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  )}`;

  const handleNav = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-card border-t border-border">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <FlaskConical
                  className="w-5 h-5 text-primary"
                  strokeWidth={2}
                />
              </div>
              <span className="font-display font-bold text-lg tracking-tight">
                Metro <span className="text-primary">Chemicals</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.footer.tagline}. Your trusted partner for high-purity pharma
              chemicals, APIs, solvents, and reagents with GMP-certified
              excellence.
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Industrial Area Phase II, Baddi, Himachal Pradesh 174102,
                  India
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <a
                  href="tel:+917876355457"
                  className="hover:text-primary transition-smooth"
                >
                  +91 7876355457
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <a
                  href="mailto:metro.chemicalsofficial@gmail.com"
                  className="hover:text-primary transition-smooth"
                >
                  metro.chemicalsofficial@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-bold text-sm text-foreground uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => handleNav(href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-smooth text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Chemical categories */}
          <div>
            <h4 className="font-display font-bold text-sm text-foreground uppercase tracking-wider mb-4">
              Chemical Categories
            </h4>
            <ul className="space-y-2">
              {chemicalCategories.map((cat) => (
                <li key={cat} className="text-sm text-muted-foreground">
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications & markets */}
          <div>
            <h4 className="font-display font-bold text-sm text-foreground uppercase tracking-wider mb-4">
              Certifications
            </h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {["WHO-GMP", "ISO 9001:2015", "ISO 14001", "CDSCO", "CoA"].map(
                (cert) => (
                  <span
                    key={cert}
                    className="px-2.5 py-1 rounded-full text-xs border border-primary/20 text-primary font-medium"
                  >
                    {cert}
                  </span>
                ),
              )}
            </div>

            <h4 className="font-display font-bold text-sm text-foreground uppercase tracking-wider mb-3">
              Export Markets
            </h4>
            <p className="text-sm text-muted-foreground">
              Asia • Middle East • Africa • Latin America • Europe
            </p>
            <p className="text-sm font-bold text-primary mt-1">40+ Countries</p>

            <div className="mt-6 pt-5 border-t border-border">
              <p className="text-xs text-muted-foreground font-medium mb-1">
                Business Hours
              </p>
              <p className="text-xs text-foreground">
                Mon – Sat: 9:00 AM – 6:00 PM IST
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {year} Metro Chemicals. {t.footer.rights}
          </p>
          <a
            href={utmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-primary transition-smooth flex items-center gap-1"
          >
            Built with love using caffeine.ai
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
