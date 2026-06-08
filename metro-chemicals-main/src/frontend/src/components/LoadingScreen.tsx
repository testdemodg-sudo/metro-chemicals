import { Cross } from "lucide-react";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"loading" | "fading">("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 12 + 3;
      });
    }, 80);

    // Begin fade-out after 2.2s
    const fadeTimer = setTimeout(() => {
      setPhase("fading");
      // Fully remove after fade animation
      setTimeout(onComplete, 500);
    }, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-500 ${
        phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background:
          "linear-gradient(135deg, oklch(0.95 0.04 246) 0%, oklch(0.97 0.02 200) 50%, oklch(0.95 0.03 148) 100%)",
      }}
      data-ocid="loading-screen"
    >
      {/* Decorative background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.15 246) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, oklch(0.80 0.09 148) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Logo animation */}
      <div className="relative flex flex-col items-center gap-6 animate-logo-reveal">
        {/* Icon */}
        <div className="w-20 h-20 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center shadow-glow animate-float-gentle">
          <Cross className="w-10 h-10 text-primary" strokeWidth={2} />
        </div>

        {/* Brand name */}
        <div className="text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Metro <span className="text-primary">Chem</span>
            <span className="text-accent">icals</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground font-body tracking-widest uppercase">
            Innovating Health, Delivering Trust
          </p>
        </div>

        {/* Pulsing dots */}
        <div className="flex items-center gap-2 mt-2" aria-label="Loading">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-primary/60"
              style={{
                animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 md:w-64">
        <div className="h-1 bg-primary/15 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-200 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-center text-xs text-muted-foreground mt-2 font-body">
          Loading...
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
