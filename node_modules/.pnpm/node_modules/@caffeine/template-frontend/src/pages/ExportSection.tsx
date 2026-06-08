import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  FileText,
  Globe,
  Handshake,
  Package,
  TrendingUp,
  Truck,
} from "lucide-react";

const exportRegions = [
  {
    region: "South & Southeast Asia",
    countries:
      "India, Nepal, Sri Lanka, Bangladesh, Vietnam, Philippines, Indonesia",
    flag: "🌏",
  },
  {
    region: "Middle East",
    countries: "UAE, Saudi Arabia, Qatar, Kuwait, Oman, Jordan, Bahrain",
    flag: "🌍",
  },
  {
    region: "Africa",
    countries:
      "Kenya, Nigeria, Tanzania, Ethiopia, Ghana, Uganda, South Africa",
    flag: "🌍",
  },
  {
    region: "Central Asia",
    countries: "Kazakhstan, Uzbekistan, Kyrgyzstan, Tajikistan, Turkmenistan",
    flag: "🌍",
  },
  {
    region: "Latin America",
    countries: "Brazil, Mexico, Colombia, Peru, Chile, Argentina",
    flag: "🌎",
  },
  {
    region: "Europe & CIS",
    countries: "Ukraine, Georgia, Belarus, Moldova, Romania, Bulgaria",
    flag: "🌍",
  },
];

const exportServices = [
  {
    icon: Package,
    title: "Custom Packaging",
    desc: "Private labeling and country-specific chemical packaging for compliance and branding.",
  },
  {
    icon: FileText,
    title: "Documentation",
    desc: "Full regulatory documentation — CoA, MSDS, GMP certificates, and custom dossiers.",
  },
  {
    icon: Handshake,
    title: "Distribution Partnerships",
    desc: "Exclusive import distribution agreements and long-term supply frameworks.",
  },
  {
    icon: TrendingUp,
    title: "Competitive Pricing",
    desc: "Volume-based bulk pricing with flexible payment terms and long-term rate agreements.",
  },
  {
    icon: Truck,
    title: "Logistics Support",
    desc: "End-to-end chemical shipping including dangerous goods compliance and cold chain.",
  },
  {
    icon: Globe,
    title: "Regulatory Guidance",
    desc: "Expert assistance for chemical import registration and compliance in target markets.",
  },
];

export default function ExportSection() {
  const { t } = useLanguage();
  const ref = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="export" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className="animate-on-scroll text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4 uppercase tracking-widest">
            Export
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.export.title}
          </h2>
          <p className="text-muted-foreground text-lg">{t.export.subtitle}</p>
        </div>

        {/* Export regions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {exportRegions.map(({ region, countries, flag }) => (
            <div
              key={region}
              className="glass-card shadow-card card-3d border border-border hover:border-primary/30 transition-smooth"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{flag}</span>
                <h3 className="font-display font-bold text-base text-foreground">
                  {region}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {countries}
              </p>
            </div>
          ))}
        </div>

        {/* Export services */}
        <div className="bg-muted/40 rounded-3xl p-8 border border-border">
          <h3 className="font-display text-2xl font-bold text-foreground text-center mb-8">
            Export Support Services
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exportServices.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground mb-1">
                    {title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:shadow-glow transition-smooth"
              data-ocid="export-enquiry-cta"
            >
              Enquire About Export Partnership
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
