import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Building2, MapPin, Users } from "lucide-react";

const presenceData = [
  { continent: "Asia Pacific", countries: 14, color: "primary", partners: 45 },
  { continent: "Middle East", countries: 8, color: "accent", partners: 22 },
  { continent: "Africa", countries: 10, color: "primary", partners: 18 },
  { continent: "Latin America", countries: 5, color: "accent", partners: 12 },
  { continent: "Europe & CIS", countries: 4, color: "primary", partners: 9 },
];

const offices = [
  {
    city: "Baddi",
    country: "India",
    type: "Headquarters & Warehouse",
    address: "Industrial Area Phase II, Baddi, HP 174102",
  },
  {
    city: "Mumbai",
    country: "India",
    type: "Sales & Marketing Office",
    address: "Andheri East, Mumbai, Maharashtra",
  },
  {
    city: "Dubai",
    country: "UAE",
    type: "Export Representative Office",
    address: "DAFZ, Dubai, United Arab Emirates",
  },
];

const partnerTestimonials = [
  {
    name: "Dr. Ahmad Al-Rashidi",
    company: "Al Shifa Healthcare, UAE",
    text: "Metro Chemicals has been our trusted pharma chemical supplier for 6 years. Their product purity and delivery consistency is unmatched in the region.",
  },
  {
    name: "Ms. Priya Nair",
    company: "MedPlus Pharma, Singapore",
    text: "Exceptional chemical quality and on-time bulk delivery. Our go-to partner for APIs, solvents and reagents for Southeast Asia.",
  },
  {
    name: "Mr. Samuel Okonkwo",
    company: "Lagos Pharma Supplies, Nigeria",
    text: "Reliable, competitively priced, and GMP-certified. Metro Chemicals helps us deliver quality pharma chemicals across West Africa.",
  },
];

export default function GlobalPresenceSection() {
  const { t } = useLanguage();
  const ref = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="global-presence" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className="animate-on-scroll text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4 uppercase tracking-widest">
            Global
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.globalPresence.title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.globalPresence.subtitle}
          </p>
        </div>

        {/* World map placeholder */}
        <div className="relative rounded-3xl overflow-hidden mb-16 bg-gradient-to-br from-primary/5 to-accent/5 border border-border p-8 shadow-card">
          <div className="aspect-[2/1] flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto animate-float-gentle">
                <MapPin className="w-12 h-12 text-primary" />
              </div>
              <p className="font-display text-2xl font-bold text-foreground">
                40+ Countries
              </p>
              <p className="text-muted-foreground">
                Active Pharma Chemical Export Destinations
              </p>
            </div>
          </div>

          {/* Continent stats overlay */}
          <div className="absolute inset-x-4 bottom-4 flex flex-wrap justify-center gap-3">
            {presenceData.map(({ continent, countries, color }) => (
              <div
                key={continent}
                className="glass-card px-4 py-2 shadow-glass flex items-center gap-2"
              >
                <div
                  className={`w-2 h-2 rounded-full ${color === "primary" ? "bg-primary" : "bg-accent"}`}
                />
                <span className="text-xs font-medium text-foreground">
                  {continent}
                </span>
                <span
                  className={`text-xs font-bold ${color === "primary" ? "text-primary" : "text-accent"}`}
                >
                  {countries}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Offices */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {offices.map(({ city, country, type, address }) => (
            <div
              key={city}
              className="glass-card shadow-card border border-border hover:border-primary/30 transition-smooth"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">
                    {city}, {country}
                  </p>
                  <p className="text-xs text-primary">{type}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground flex items-start gap-1.5">
                <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                {address}
              </p>
            </div>
          ))}
        </div>

        {/* Partner Testimonials */}
        <div>
          <h3 className="font-display text-2xl font-bold text-foreground text-center mb-8 flex items-center justify-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Partner Testimonials
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {partnerTestimonials.map(({ name, company, text }) => (
              <div
                key={name}
                className="glass-card shadow-card border border-border hover:border-accent/30 transition-smooth"
              >
                <div className="flex gap-1 mb-4">
                  {["s1", "s2", "s3", "s4", "s5"].map((k) => (
                    <span key={k} className="text-accent text-sm">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">
                  "{text}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-sm text-foreground">
                    {name}
                  </p>
                  <p className="text-xs text-primary">{company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
