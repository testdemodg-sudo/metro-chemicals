import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Mr. Rajiv Mehta",
    title: "Head of Procurement",
    company: "Cipla Pharma Supplies, India",
    text: "Metro Chemicals has been a dependable partner for our API sourcing. The purity levels are consistently above spec and their documentation support is excellent.",
    rating: 5,
  },
  {
    name: "Dr. Ahmed Al-Fahad",
    title: "Director",
    company: "Gulf Medical Distributors, UAE",
    text: "We rely on Metro Chemicals for bulk solvents and reagents. Their competitive pricing and on-time delivery have significantly optimized our supply chain.",
    rating: 5,
  },
  {
    name: "Ms. Clara Osei",
    title: "Supply Chain Manager",
    company: "HealthBridge Africa, Ghana",
    text: "Metro Chemicals offers GMP-certified quality that meets our stringent requirements. Their export team provides excellent support with documentation and compliance.",
    rating: 5,
  },
  {
    name: "Mr. Viktor Kovalenko",
    title: "CEO",
    company: "PharmaTrade Ukraine",
    text: "Finding a reliable pharma chemicals partner was challenging until we found Metro Chemicals. Their product quality and service consistency are outstanding.",
    rating: 5,
  },
  {
    name: "Ms. Priya Sharma",
    title: "Quality Assurance Head",
    company: "Sun Pharma Inputs, India",
    text: "Metro Chemicals maintains the highest standards for chemical purity and batch traceability. We trust them completely for our critical API intermediates sourcing.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const ref = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (dir: "prev" | "next") => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent((prev) =>
        dir === "next"
          ? (prev + 1) % testimonials.length
          : (prev - 1 + testimonials.length) % testimonials.length,
      );
      setTimeout(() => setIsAnimating(false), 400);
    },
    [isAnimating],
  );

  // Auto-rotation every 4 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => go("next"), 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [go]);

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => go("next"), 4000);
  };

  const handlePrev = () => {
    go("prev");
    resetInterval();
  };

  const handleNext = () => {
    go("next");
    resetInterval();
  };

  const handleDot = (i: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(i);
    setTimeout(() => setIsAnimating(false), 400);
    resetInterval();
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className="animate-on-scroll text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20 mb-4 uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Trusted by Global Partners
          </h2>
          <p className="text-muted-foreground text-lg">
            Pharma companies and distributors across 40+ countries rely on Metro
            Chemicals for quality and consistency.
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="relative glass-card shadow-glass border border-primary/10 min-h-[260px] flex flex-col justify-between">
            {/* Quote icon */}
            <div className="absolute top-6 right-6 opacity-10">
              <Quote className="w-16 h-16 text-primary" />
            </div>

            {/* Content */}
            <div
              className={`transition-all duration-400 ${isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
              style={{ transition: "opacity 0.35s ease, transform 0.35s ease" }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }, (_, i) => `star-${i}`).map(
                  (k) => (
                    <span key={k} className="text-accent text-lg">
                      ★
                    </span>
                  ),
                )}
              </div>

              {/* Text */}
              <p className="text-foreground text-lg leading-relaxed italic mb-6">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 border-t border-border pt-5">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-display font-bold text-primary text-lg">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-display font-bold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-primary">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.company}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handleDot(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`rounded-full transition-smooth ${
                    i === current
                      ? "w-6 h-2.5 bg-primary"
                      : "w-2.5 h-2.5 bg-primary/25 hover:bg-primary/50"
                  }`}
                  data-ocid={`testimonial-dot-${i}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-xl border border-border text-muted-foreground hover:border-primary/40 hover:text-primary flex items-center justify-center transition-smooth"
                data-ocid="testimonial-prev"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center transition-smooth"
                data-ocid="testimonial-next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
