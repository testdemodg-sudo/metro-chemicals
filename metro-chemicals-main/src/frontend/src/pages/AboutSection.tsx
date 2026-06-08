import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CheckCircle2, Factory, Globe, TrendingUp } from "lucide-react";

const milestones = [
  {
    year: "2008",
    title: "Company Founded",
    desc: "Metro Chemicals established in Baddi, Himachal Pradesh as a dedicated pharma chemicals trading company.",
  },
  {
    year: "2011",
    title: "GMP Certification",
    desc: "Achieved WHO-GMP certification for our chemical handling and storage infrastructure.",
  },
  {
    year: "2014",
    title: "ISO 9001:2015",
    desc: "Received ISO 9001:2015 quality management certification, reinforcing commitment to excellence.",
  },
  {
    year: "2017",
    title: "Global Expansion",
    desc: "Commenced export of pharma chemicals to 15+ countries across Asia, Africa and the Middle East.",
  },
  {
    year: "2020",
    title: "1000+ Chemicals",
    desc: "Expanded our portfolio to 1000+ pharma chemicals including APIs, solvents, reagents and fine chemicals.",
  },
  {
    year: "2024",
    title: "40+ Countries",
    desc: "Now supplying premium pharma chemicals to over 40 countries with trusted global partnerships.",
  },
];

const values = [
  {
    icon: CheckCircle2,
    title: "Quality Assured",
    desc: "Every chemical we supply meets stringent purity and compliance standards for pharma-grade use.",
  },
  {
    icon: TrendingUp,
    title: "Reliable Supply",
    desc: "Consistent bulk supply with competitive pricing and flexible order fulfillment.",
  },
  {
    icon: Factory,
    title: "GMP Infrastructure",
    desc: "GMP-certified warehousing and handling facilities ensuring chemical integrity.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    desc: "Trusted chemical supply partnerships across Asia, Africa, Middle East and beyond.",
  },
];

export default function AboutSection() {
  const { t } = useLanguage();
  const ref = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="about" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          ref={ref}
          className="animate-on-scroll text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4 uppercase tracking-widest">
            Our Story
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.about.title}
          </h2>
          <p className="text-xl text-primary font-semibold mb-3">
            {t.about.subtitle}
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t.about.description}
          </p>
        </div>

        {/* Values grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {values.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="glass-card card-3d shadow-card text-center group hover:border-primary/30 transition-smooth"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/15 transition-smooth">
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

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <h3 className="font-display text-2xl font-bold text-center text-foreground mb-12">
            Our Journey
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-primary/20 md:-translate-x-px" />

            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex flex-col md:flex-row gap-6 items-start ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1 md:-translate-x-1.5 mt-5 ring-4 ring-primary/20" />

                  {/* Content */}
                  <div
                    className={`w-full md:w-[calc(50%-2rem)] pl-12 md:pl-0 ${i % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10"}`}
                  >
                    <div className="glass-card shadow-card">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        {m.year}
                      </span>
                      <h4 className="font-display font-bold text-base text-foreground mt-2 mb-1">
                        {m.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{m.desc}</p>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block w-[calc(50%-2rem)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
