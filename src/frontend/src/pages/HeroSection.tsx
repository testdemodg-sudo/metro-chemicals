import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, Award, FlaskConical, Globe, Shield } from "lucide-react";

const stats = [
  { value: "40+", label: "Countries Served" },
  { value: "1000+", label: "Chemical Products" },
  { value: "15+", label: "Years Experience" },
  { value: "GMP", label: "Certified Facility" },
];

export default function HeroSection() {
  const { t } = useLanguage();
  const ref = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden hero-gradient"
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full opacity-30 animate-float-gentle"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.15 246 / 0.5) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, oklch(0.80 0.09 148 / 0.6) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, oklch(0.75 0.12 200 / 0.4) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div ref={ref} className="animate-on-scroll space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-sm font-medium text-primary shadow-glass">
              <FlaskConical className="w-4 h-4" />
              <span>GMP-Certified Pharma Chemicals Supplier</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-foreground">
                {t.hero.headline1}{" "}
                <span className="text-primary">{t.hero.headline2}</span>
              </h1>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-accent">
                {t.hero.headline3}
              </h1>
            </div>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => handleScroll("products")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 hover:shadow-glow transition-smooth shadow-card"
                data-ocid="hero-explore-cta"
              >
                {t.hero.cta1}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll("contact")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-primary/30 text-primary font-semibold text-base hover:border-primary hover:bg-primary/5 transition-smooth"
                data-ocid="hero-contact-cta"
              >
                {t.hero.cta2}
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {[
                { icon: Shield, label: "GMP Certified" },
                { icon: Award, label: "ISO 9001:2015" },
                { icon: Globe, label: "40+ Countries" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground"
                >
                  <Icon className="w-4 h-4 text-accent" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Hero image + cards */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-elevated aspect-[4/3]">
              <img
                src="/assets/generated/hero-lab.dim_800x600.jpg"
                alt="Metro Chemicals pharma laboratory"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>

            {/* Floating stat cards */}
            <div className="absolute -bottom-6 -left-6 glass-card shadow-glass p-4 rounded-2xl">
              <p className="text-2xl font-display font-bold text-primary">
                1000+
              </p>
              <p className="text-xs text-muted-foreground">Chemical Products</p>
            </div>
            <div className="absolute -top-6 -right-6 glass-card shadow-glass p-4 rounded-2xl">
              <p className="text-2xl font-display font-bold text-accent">40+</p>
              <p className="text-xs text-muted-foreground">Export Countries</p>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card text-center shadow-glass"
            >
              <p className="text-3xl font-display font-bold text-primary">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
