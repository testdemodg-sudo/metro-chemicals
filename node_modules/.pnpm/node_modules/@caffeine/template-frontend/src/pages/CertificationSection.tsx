import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Award,
  CheckCircle2,
  Copy,
  ExternalLink,
  FileCheck,
  FileText,
  Star,
} from "lucide-react";
import { useState } from "react";

const certifications = [
  {
    icon: Award,
    name: "WHO-GMP",
    fullName: "World Health Organization — Good Manufacturing Practice",
    desc: "Compliance with WHO manufacturing and handling standards for pharmaceutical-grade chemicals.",
    color: "primary",
    year: "2011",
  },
  {
    icon: FileCheck,
    name: "ISO 9001:2015",
    fullName: "Quality Management System",
    desc: "International standard ensuring consistent quality across all chemical procurement and supply processes.",
    color: "accent",
    year: "2014",
  },
  {
    icon: CheckCircle2,
    name: "ISO 14001",
    fullName: "Environmental Management System",
    desc: "Commitment to environmentally responsible chemical handling, storage, and waste disposal.",
    color: "primary",
    year: "2016",
  },
  {
    icon: Star,
    name: "CDSCO",
    fullName: "Central Drugs Standard Control Organization",
    desc: "Indian regulatory authority approval for pharma chemical trading and distribution operations.",
    color: "accent",
    year: "2009",
  },
];

const regulatory = [
  "GST Registered Business — GSTIN: 02ENIPB0449B1ZS",
  "Himachal Pradesh State Drug License",
  "Drug Trading License (Form 20B & 21B)",
  "Import/Export License for Chemicals",
  "Hazardous Chemical Handling Permit",
  "GMP Certificate for Chemical Supply",
  "Certificate of Analysis (CoA) for all products",
];

function GSTCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("02ENIPB0449B1ZS").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      data-ocid="gst-certificate.card"
      className="col-span-full glass-card card-3d shadow-card border-2 border-accent/30 hover:border-accent/60 transition-smooth relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(var(--accent) / 0.06) 0%, transparent 60%)",
      }}
    >
      {/* Green glow accent strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/60 via-accent to-accent/60 rounded-t-2xl" />

      <div className="flex flex-col lg:flex-row gap-6 items-start pt-2">
        {/* Icon + badge */}
        <div className="flex flex-col items-center gap-3 flex-shrink-0">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-accent/15 group-hover:scale-110 transition-smooth shadow-md">
            <FileText className="w-10 h-10 text-accent" />
          </div>
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-accent/15 text-accent border border-accent/30 tracking-widest uppercase">
            GST Certificate
          </span>
          <span className="text-xs text-muted-foreground">Since Dec 2023</span>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h3 className="font-display text-xl font-bold text-foreground">
              GST Registration Certificate
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 font-semibold">
              Government of India
            </span>
          </div>

          {/* GSTIN badge */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-xs text-muted-foreground font-medium">
              GSTIN:
            </span>
            <div
              data-ocid="gst-certificate.gstin_badge"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/30"
            >
              <span className="font-mono text-base font-bold text-accent tracking-widest">
                02ENIPB0449B1ZS
              </span>
              <button
                data-ocid="gst-certificate.copy_button"
                type="button"
                onClick={handleCopy}
                title="Copy GSTIN"
                className="ml-1 p-1 rounded hover:bg-accent/20 transition-colors text-accent/70 hover:text-accent"
                aria-label="Copy GSTIN number"
              >
                {copied ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            {copied && (
              <span className="text-xs text-accent font-medium animate-pulse">
                Copied!
              </span>
            )}
          </div>

          {/* Details grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            {[
              { label: "Trade Name", value: "METRO CHEMICALS" },
              { label: "Registration Type", value: "Regular" },
              { label: "Date of Issue", value: "26 Dec 2023" },
              { label: "Jurisdiction", value: "Himachal Pradesh" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-background/50 rounded-xl px-3 py-2 border border-border/50"
              >
                <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-foreground leading-snug">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Address */}
          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
            <span className="font-medium text-foreground/70">Address: </span>
            Godown No 3, Chakkan Road, Adjoining to Big Bazar, Vill- Mouja
            Kalyanpur, Bassi, Solan, Himachal Pradesh – 173205
          </p>

          {/* View Certificate button */}
          <a
            data-ocid="gst-certificate.view_button"
            href="/assets/gst-certificate.png"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent/15 hover:bg-accent/25 text-accent font-semibold text-sm border border-accent/30 transition-smooth group"
          >
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            View Certificate
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CertificationSection() {
  const { t } = useLanguage();
  const ref = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      id="certification"
      className="py-24 bg-background section-gradient-green"
    >
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className="animate-on-scroll text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20 mb-4 uppercase tracking-widest">
            Standards
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.certification.title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.certification.subtitle}
          </p>
        </div>

        {/* Certification cards grid — 4 cards + GST spanning full row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certifications.map(
            ({ icon: Icon, name, fullName, desc, color, year }) => (
              <div
                key={name}
                data-ocid={`certification.card.${name.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
                className="glass-card card-3d shadow-card border border-border hover:border-accent/30 transition-smooth group text-center"
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                    color === "primary" ? "bg-primary/10" : "bg-accent/10"
                  } group-hover:scale-110 transition-smooth`}
                >
                  <Icon
                    className={`w-8 h-8 ${color === "primary" ? "text-primary" : "text-accent"}`}
                  />
                </div>
                <div
                  className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3 ${
                    color === "primary"
                      ? "bg-primary/10 text-primary"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  {name}
                </div>
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  {fullName}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  Since {year}
                </p>
              </div>
            ),
          )}

          {/* GST Certificate — full-width row */}
          <GSTCard />
        </div>

        {/* Regulatory licenses */}
        <div className="max-w-3xl mx-auto">
          <h3 className="font-display text-xl font-bold text-foreground text-center mb-8">
            Regulatory Licenses & Approvals
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {regulatory.map((item, idx) => (
              <div
                key={item}
                data-ocid={`regulatory.item.${idx + 1}`}
                className={`flex items-center gap-3 glass-card shadow-card py-3 ${
                  idx === 0 ? "border border-accent/30 bg-accent/5" : ""
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    idx === 0 ? "bg-accent/25" : "bg-accent/15"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                </div>
                <span
                  className={`text-sm font-medium ${
                    idx === 0 ? "text-accent font-semibold" : "text-foreground"
                  }`}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
