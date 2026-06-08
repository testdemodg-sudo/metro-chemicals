import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Microscope,
  Settings,
  Shield,
  Thermometer,
  Wind,
  Zap,
} from "lucide-react";

const capabilities = [
  {
    icon: Settings,
    title: "Advanced Processing",
    desc: "Automated chemical processing lines with real-time quality monitoring and batch traceability.",
  },
  {
    icon: Shield,
    title: "GMP Warehousing",
    desc: "GMP-certified storage with segregated zones for APIs, solvents, reagents, and sensitive chemicals.",
  },
  {
    icon: Thermometer,
    title: "Temperature Control",
    desc: "Cold chain and temperature-controlled storage for heat-sensitive pharma chemicals.",
  },
  {
    icon: Microscope,
    title: "QC Laboratory",
    desc: "In-house quality control lab with HPLC, UV spectroscopy, and chemical purity testing.",
  },
  {
    icon: Zap,
    title: "High-Volume Handling",
    desc: "Bulk chemical handling capacity with precision dispensing and packaging systems.",
  },
  {
    icon: Wind,
    title: "HVAC & Safety",
    desc: "Pharma-grade HVAC with HEPA filtration and chemical-safe exhaust for contamination-free handling.",
  },
];

const specItems = [
  { value: "50,000", unit: "sq ft", label: "Facility Area" },
  { value: "1000+", unit: "products", label: "Chemical SKUs" },
  { value: "500MT+", unit: "/month", label: "Handling Capacity" },
  { value: "99.9%", unit: "", label: "Purity Pass Rate" },
];

export default function ManufacturingSection() {
  const ref = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="manufacturing" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className="animate-on-scroll text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4 uppercase tracking-widest">
            Manufacturing
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Manufacturing Excellence
          </h2>
          <p className="text-muted-foreground text-lg">
            State-of-the-art GMP certified facilities
          </p>
        </div>

        {/* Capabilities grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {capabilities.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="glass-card shadow-card card-3d border border-border hover:border-primary/30 transition-smooth group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-smooth">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-base text-foreground mb-2">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Key specs */}
        <div className="mt-4 p-8 glass rounded-2xl border border-primary/10 shadow-glass">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {specItems.map(({ value, unit, label }) => (
              <div key={label}>
                <p className="font-display text-2xl md:text-3xl font-bold text-primary">
                  {value}{" "}
                  <span className="text-base font-medium text-muted-foreground">
                    {unit}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
