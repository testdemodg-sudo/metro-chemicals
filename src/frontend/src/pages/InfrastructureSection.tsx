import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CheckCircle2 } from "lucide-react";

const infraAreas = [
  {
    label: "Chemical Storage",
    desc: "Segregated GMP-certified storage zones for APIs, solvents, and hazardous materials.",
    bg: "from-primary/20 to-accent/10",
  },
  {
    label: "QC Laboratory",
    desc: "Fully equipped analytical lab with HPLC, UV spectro, and purity testing instruments.",
    bg: "from-accent/20 to-primary/10",
  },
  {
    label: "Dispatch & Packaging",
    desc: "Clean room packaging unit ensuring contamination-free chemical dispatch globally.",
    bg: "from-primary/15 to-primary/5",
  },
  {
    label: "Cold Chain Warehouse",
    desc: "Temperature-controlled cold storage for heat-sensitive chemicals and biologics.",
    bg: "from-accent/15 to-accent/5",
  },
];

const features = [
  "GMP-Certified Facility — Baddi, HP India",
  "ISO 14001 Environmental Management",
  "24/7 Automated Monitoring Systems",
  "Pharmaceutical-Grade HVAC & HEPA",
  "Fire Safety & Hazmat Containment",
  "ERP-Integrated Inventory Tracking",
];

export default function InfrastructureSection() {
  const ref = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      id="infrastructure"
      className="py-24 bg-background section-gradient-blue"
    >
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className="animate-on-scroll text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4 uppercase tracking-widest">
            Infrastructure
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            World-Class Facility
          </h2>
          <p className="text-muted-foreground text-lg">
            Metro Chemicals operates from a state-of-the-art GMP-certified
            facility in Baddi, Himachal Pradesh — India's premier pharma hub.
          </p>
        </div>

        {/* Infrastructure image grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {infraAreas.map(({ label, desc, bg }) => (
            <div
              key={label}
              className={`rounded-2xl bg-gradient-to-br ${bg} border border-border p-6 shadow-card hover:shadow-glass transition-smooth group card-3d flex flex-col justify-between min-h-[180px]`}
            >
              <span className="text-sm font-bold text-foreground/90 font-display">
                {label}
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed mt-3">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Features checklist */}
        <div className="max-w-4xl mx-auto p-8 glass rounded-2xl border border-primary/10 shadow-glass">
          <h3 className="font-display text-xl font-bold text-foreground text-center mb-8">
            Facility Highlights
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {features.map((feat) => (
              <div key={feat} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                </div>
                <span className="text-sm text-foreground font-medium">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
