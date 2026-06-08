// CategoryIcon: Large gradient icon badges for each of the 13 product categories
import {
  Apple,
  Beaker,
  Circle,
  Coffee,
  Droplets,
  Factory,
  Flame,
  FlaskConical,
  Layers,
  Leaf,
  Microscope,
  Paintbrush,
  Palette,
  Pill,
  Shield,
  Star,
  Sun,
  Syringe,
  Zap,
} from "lucide-react";

interface CategoryIconProps {
  category: string;
  size?: number; // icon size in px
  className?: string;
}

// Icon config per category
const ICON_CONFIG: Record<
  string,
  {
    Icon1: React.ElementType;
    Icon2: React.ElementType;
    bgFrom: string;
    bgTo: string;
    iconColor: string;
    label: string;
  }
> = {
  "pharma-api": {
    Icon1: FlaskConical,
    Icon2: Pill,
    bgFrom: "#dbeafe",
    bgTo: "#ede9fe",
    iconColor: "#4f46e5",
    label: "Pharmaceutical & API",
  },
  excipients: {
    Icon1: Layers,
    Icon2: Layers,
    bgFrom: "#d1fae5",
    bgTo: "#ecfdf5",
    iconColor: "#059669",
    label: "Excipients",
  },
  nutraceutical: {
    Icon1: Apple,
    Icon2: Leaf,
    bgFrom: "#dcfce7",
    bgTo: "#f0fdf4",
    iconColor: "#16a34a",
    label: "Nutraceutical",
  },
  solvent: {
    Icon1: Beaker,
    Icon2: Droplets,
    bgFrom: "#dbeafe",
    bgTo: "#e0f2fe",
    iconColor: "#0369a1",
    label: "Solvent",
  },
  vitamin: {
    Icon1: Sun,
    Icon2: Star,
    bgFrom: "#fef9c3",
    bgTo: "#fef3c7",
    iconColor: "#d97706",
    label: "Vitamin",
  },
  colors: {
    Icon1: Palette,
    Icon2: Paintbrush,
    bgFrom: "#fce7f3",
    bgTo: "#fdf2f8",
    iconColor: "#be185d",
    label: "Colors",
  },
  capsule: {
    Icon1: Pill,
    Icon2: Circle,
    bgFrom: "#e0e7ff",
    bgTo: "#ede9fe",
    iconColor: "#6d28d9",
    label: "Capsule",
  },
  flavors: {
    Icon1: Coffee,
    Icon2: Star,
    bgFrom: "#fff7ed",
    bgTo: "#fef3c7",
    iconColor: "#b45309",
    label: "Flavors",
  },
  industrial: {
    Icon1: Factory,
    Icon2: Zap,
    bgFrom: "#f1f5f9",
    bgTo: "#e2e8f0",
    iconColor: "#475569",
    label: "Industrial Chemicals",
  },
  pellets: {
    Icon1: Circle,
    Icon2: Layers,
    bgFrom: "#ecfdf5",
    bgTo: "#d1fae5",
    iconColor: "#0d9488",
    label: "Pellets",
  },
  "oil-wax": {
    Icon1: Droplets,
    Icon2: Flame,
    bgFrom: "#fefce8",
    bgTo: "#fef9c3",
    iconColor: "#ca8a04",
    label: "Oil & Wax",
  },
  sterile: {
    Icon1: Syringe,
    Icon2: Shield,
    bgFrom: "#dbeafe",
    bgTo: "#bfdbfe",
    iconColor: "#1d4ed8",
    label: "Sterile Injectable",
  },
  extracts: {
    Icon1: Leaf,
    Icon2: Microscope,
    bgFrom: "#dcfce7",
    bgTo: "#bbf7d0",
    iconColor: "#15803d",
    label: "Extracts",
  },
};

export function CategoryIcon({
  category,
  size = 96,
  className,
}: CategoryIconProps) {
  const config = ICON_CONFIG[category] ?? ICON_CONFIG["pharma-api"];
  const { Icon1, Icon2, bgFrom, bgTo, iconColor } = config;
  const iconSize = Math.round(size * 0.42);
  const smallIconSize = Math.round(size * 0.26);

  return (
    <div
      className={`relative flex items-center justify-center rounded-2xl overflow-hidden flex-shrink-0 ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${bgFrom}, ${bgTo})`,
        boxShadow: `0 4px 20px 0 ${bgFrom}cc`,
      }}
      aria-hidden="true"
    >
      {/* Decorative background circle */}
      <div
        className="absolute rounded-full opacity-20"
        style={{
          width: size * 0.75,
          height: size * 0.75,
          background: iconColor,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Primary icon */}
      <Icon1
        style={{
          width: iconSize,
          height: iconSize,
          color: iconColor,
          position: "relative",
          zIndex: 1,
        }}
        strokeWidth={1.5}
      />

      {/* Secondary icon badge — bottom-right corner */}
      <div
        className="absolute bottom-2 right-2 flex items-center justify-center rounded-full"
        style={{
          width: smallIconSize + 8,
          height: smallIconSize + 8,
          background: `${iconColor}22`,
          border: `1.5px solid ${iconColor}44`,
        }}
      >
        <Icon2
          style={{
            width: smallIconSize,
            height: smallIconSize,
            color: iconColor,
          }}
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
}

// Legacy CategoryIllustration preserved for backward compatibility (product card illustrations)
// The new CategoryIcon is used in the category filter tabs
interface IllustrationProps {
  className?: string;
}

function PharmaApiIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="papi-bg"
          x1="0"
          y1="0"
          x2="200"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#dbeafe" stopOpacity="0.8" />
          <stop offset="1" stopColor="#ede9fe" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <rect width="200" height="120" fill="url(#papi-bg)" rx="8" />
      <line
        x1="60"
        y1="60"
        x2="100"
        y2="40"
        stroke="#6366f1"
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <line
        x1="100"
        y1="40"
        x2="140"
        y2="60"
        stroke="#6366f1"
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <line
        x1="140"
        y1="60"
        x2="140"
        y2="85"
        stroke="#6366f1"
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <line
        x1="140"
        y1="85"
        x2="100"
        y2="100"
        stroke="#8b5cf6"
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <line
        x1="100"
        y1="100"
        x2="60"
        y2="85"
        stroke="#8b5cf6"
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <line
        x1="60"
        y1="85"
        x2="60"
        y2="60"
        stroke="#8b5cf6"
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <circle cx="100" cy="40" r="7" fill="#6366f1" fillOpacity="0.9" />
      <circle cx="140" cy="60" r="7" fill="#6366f1" fillOpacity="0.9" />
      <circle cx="60" cy="60" r="7" fill="#6366f1" fillOpacity="0.9" />
      <circle cx="140" cy="85" r="6" fill="#8b5cf6" fillOpacity="0.9" />
      <circle cx="60" cy="85" r="6" fill="#8b5cf6" fillOpacity="0.9" />
      <circle cx="100" cy="100" r="7" fill="#8b5cf6" fillOpacity="0.9" />
    </svg>
  );
}

function ExcipientsIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="exc2-bg"
          x1="0"
          y1="0"
          x2="200"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f0fdf4" stopOpacity="0.9" />
          <stop offset="1" stopColor="#dcfce7" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <rect width="200" height="120" fill="url(#exc2-bg)" rx="8" />
      <rect
        x="60"
        y="42"
        width="80"
        height="36"
        rx="18"
        fill="#22c55e"
        fillOpacity="0.15"
        stroke="#22c55e"
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <line
        x1="100"
        y1="42"
        x2="100"
        y2="78"
        stroke="#22c55e"
        strokeWidth="1"
        strokeDasharray="3 2"
        strokeOpacity="0.5"
      />
      <circle cx="40" cy="35" r="6" fill="#86efac" fillOpacity="0.7" />
      <circle cx="160" cy="35" r="5" fill="#86efac" fillOpacity="0.7" />
      <circle cx="30" cy="75" r="4" fill="#4ade80" fillOpacity="0.6" />
      <circle cx="170" cy="80" r="5.5" fill="#86efac" fillOpacity="0.6" />
    </svg>
  );
}

function SolventIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="sol2-bg"
          x1="0"
          y1="0"
          x2="200"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#eff6ff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#dbeafe" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient
          id="sol2-flask"
          x1="85"
          y1="20"
          x2="115"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3b82f6" stopOpacity="0.2" />
          <stop offset="1" stopColor="#60a5fa" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient
          id="sol2-liquid"
          x1="80"
          y1="70"
          x2="120"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3b82f6" stopOpacity="0.5" />
          <stop offset="1" stopColor="#2563eb" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <rect width="200" height="120" fill="url(#sol2-bg)" rx="8" />
      <path
        d="M90 22 L90 52 L70 90 Q68 98 76 100 L124 100 Q132 98 130 90 L110 52 L110 22 Z"
        fill="url(#sol2-flask)"
        stroke="#3b82f6"
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
      <path
        d="M73 88 L78 72 L100 68 L122 72 L127 88 Q125 98 124 100 L76 100 Q75 98 73 88 Z"
        fill="url(#sol2-liquid)"
      />
      <path
        d="M78 72 Q89 66 100 70 Q111 74 122 68"
        stroke="#93c5fd"
        strokeWidth="1.5"
        fill="none"
        strokeOpacity="0.8"
      />
      <circle cx="88" cy="85" r="3" fill="#bfdbfe" fillOpacity="0.7" />
      <circle cx="105" cy="80" r="2.5" fill="#bfdbfe" fillOpacity="0.6" />
    </svg>
  );
}

function NutraceuticalIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="nut-bg"
          x1="0"
          y1="0"
          x2="200"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f0fdf4" stopOpacity="0.9" />
          <stop offset="1" stopColor="#d1fae5" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <rect width="200" height="120" fill="url(#nut-bg)" rx="8" />
      <circle
        cx="100"
        cy="55"
        r="30"
        fill="#22c55e"
        fillOpacity="0.12"
        stroke="#22c55e"
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      <path
        d="M100 90 Q100 70 100 40"
        stroke="#16a34a"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M100 62 Q72 42 60 57 Q70 80 100 77 Z"
        fill="#4ade80"
        fillOpacity="0.7"
      />
      <path
        d="M100 52 Q128 32 140 47 Q130 70 100 67 Z"
        fill="#86efac"
        fillOpacity="0.7"
      />
      <circle
        cx="100"
        cy="35"
        r="7"
        fill="#bbf7d0"
        stroke="#22c55e"
        strokeWidth="1.5"
        strokeOpacity="0.7"
      />
    </svg>
  );
}

function VitaminIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="vit-bg"
          x1="0"
          y1="0"
          x2="200"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fef9c3" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fef3c7" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <rect width="200" height="120" fill="url(#vit-bg)" rx="8" />
      <circle
        cx="100"
        cy="60"
        r="25"
        fill="#f59e0b"
        fillOpacity="0.15"
        stroke="#f59e0b"
        strokeWidth="2"
        strokeOpacity="0.5"
      />
      <circle cx="100" cy="60" r="14" fill="#fbbf24" fillOpacity="0.4" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 100 + 28 * Math.cos(rad);
        const y1 = 60 + 28 * Math.sin(rad);
        const x2 = 100 + 42 * Math.cos(rad);
        const y2 = 60 + 42 * Math.sin(rad);
        return (
          <line
            key={angle}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#f59e0b"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeOpacity="0.7"
          />
        );
      })}
    </svg>
  );
}

function ColorsIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="col2-bg"
          x1="0"
          y1="0"
          x2="200"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff1f2" stopOpacity="0.8" />
          <stop offset="1" stopColor="#fce7f3" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <rect width="200" height="120" fill="url(#col2-bg)" rx="8" />
      <ellipse
        cx="40"
        cy="85"
        rx="28"
        ry="14"
        fill="#ef4444"
        fillOpacity="0.7"
      />
      <ellipse
        cx="40"
        cy="82"
        rx="22"
        ry="10"
        fill="#f87171"
        fillOpacity="0.6"
      />
      <ellipse
        cx="100"
        cy="85"
        rx="28"
        ry="14"
        fill="#f59e0b"
        fillOpacity="0.7"
      />
      <ellipse
        cx="100"
        cy="82"
        rx="22"
        ry="10"
        fill="#fbbf24"
        fillOpacity="0.6"
      />
      <ellipse
        cx="160"
        cy="85"
        rx="28"
        ry="14"
        fill="#6366f1"
        fillOpacity="0.7"
      />
      <ellipse
        cx="160"
        cy="82"
        rx="22"
        ry="10"
        fill="#818cf8"
        fillOpacity="0.6"
      />
      <circle cx="30" cy="50" r="3" fill="#ef4444" fillOpacity="0.5" />
      <circle cx="90" cy="45" r="3" fill="#f59e0b" fillOpacity="0.5" />
      <circle cx="150" cy="50" r="3" fill="#6366f1" fillOpacity="0.5" />
    </svg>
  );
}

function CapsuleIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="cap-bg"
          x1="0"
          y1="0"
          x2="200"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#e0e7ff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ede9fe" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <rect width="200" height="120" fill="url(#cap-bg)" rx="8" />
      {/* Capsule 1 — horizontal */}
      <rect
        x="50"
        y="47"
        width="100"
        height="26"
        rx="13"
        fill="#a5b4fc"
        fillOpacity="0.25"
        stroke="#6366f1"
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
      <rect
        x="50"
        y="47"
        width="50"
        height="26"
        rx="13"
        fill="#6366f1"
        fillOpacity="0.2"
      />
      <line
        x1="100"
        y1="47"
        x2="100"
        y2="73"
        stroke="#6366f1"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      {/* Smaller capsule top-right */}
      <rect
        x="130"
        y="24"
        width="50"
        height="18"
        rx="9"
        fill="#a5b4fc"
        fillOpacity="0.25"
        stroke="#6366f1"
        strokeWidth="1"
        strokeOpacity="0.4"
      />
      <rect
        x="130"
        y="24"
        width="25"
        height="18"
        rx="9"
        fill="#c084fc"
        fillOpacity="0.2"
      />
      {/* Smaller capsule bottom-left */}
      <rect
        x="20"
        y="78"
        width="50"
        height="18"
        rx="9"
        fill="#a5b4fc"
        fillOpacity="0.25"
        stroke="#6366f1"
        strokeWidth="1"
        strokeOpacity="0.4"
      />
      <rect
        x="20"
        y="78"
        width="25"
        height="18"
        rx="9"
        fill="#818cf8"
        fillOpacity="0.2"
      />
    </svg>
  );
}

function FlavorsIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="fla-bg"
          x1="0"
          y1="0"
          x2="200"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff7ed" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fef3c7" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <rect width="200" height="120" fill="url(#fla-bg)" rx="8" />
      {/* Strawberry */}
      <ellipse
        cx="55"
        cy="68"
        rx="18"
        ry="22"
        fill="#f43f5e"
        fillOpacity="0.2"
        stroke="#f43f5e"
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <circle cx="49" cy="62" r="2" fill="#f43f5e" fillOpacity="0.5" />
      <circle cx="60" cy="59" r="2" fill="#f43f5e" fillOpacity="0.5" />
      <circle cx="54" cy="71" r="2" fill="#f43f5e" fillOpacity="0.5" />
      {/* Orange */}
      <circle
        cx="100"
        cy="65"
        r="22"
        fill="#f97316"
        fillOpacity="0.15"
        stroke="#f97316"
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <path
        d="M100 43 Q100 65 100 87"
        stroke="#f97316"
        strokeWidth="0.8"
        strokeOpacity="0.4"
      />
      <path
        d="M78 65 Q100 65 122 65"
        stroke="#f97316"
        strokeWidth="0.8"
        strokeOpacity="0.4"
      />
      {/* Mint leaf */}
      <path
        d="M145 55 Q165 38 175 50 Q168 72 145 68 Z"
        fill="#22c55e"
        fillOpacity="0.35"
        stroke="#16a34a"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <path
        d="M145 57 Q160 48 168 54"
        stroke="#15803d"
        strokeWidth="0.8"
        strokeOpacity="0.4"
        fill="none"
      />
    </svg>
  );
}

function IndustrialIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="ind-bg"
          x1="0"
          y1="0"
          x2="200"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f1f5f9" stopOpacity="0.9" />
          <stop offset="1" stopColor="#e2e8f0" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <rect width="200" height="120" fill="url(#ind-bg)" rx="8" />
      {/* Factory silhouette */}
      <rect
        x="30"
        y="65"
        width="140"
        height="40"
        rx="2"
        fill="#94a3b8"
        fillOpacity="0.2"
        stroke="#64748b"
        strokeWidth="1"
        strokeOpacity="0.4"
      />
      <rect
        x="50"
        y="45"
        width="30"
        height="25"
        fill="#94a3b8"
        fillOpacity="0.2"
        stroke="#64748b"
        strokeWidth="1"
        strokeOpacity="0.4"
      />
      <rect
        x="90"
        y="50"
        width="25"
        height="20"
        fill="#94a3b8"
        fillOpacity="0.2"
        stroke="#64748b"
        strokeWidth="1"
        strokeOpacity="0.4"
      />
      <rect
        x="125"
        y="55"
        width="20"
        height="15"
        fill="#94a3b8"
        fillOpacity="0.2"
        stroke="#64748b"
        strokeWidth="1"
        strokeOpacity="0.4"
      />
      {/* Chimneys */}
      <rect
        x="55"
        y="30"
        width="8"
        height="18"
        fill="#64748b"
        fillOpacity="0.3"
      />
      <rect
        x="95"
        y="35"
        width="7"
        height="16"
        fill="#64748b"
        fillOpacity="0.3"
      />
      {/* Smoke */}
      <ellipse cx="59" cy="26" rx="5" ry="3" fill="#cbd5e1" fillOpacity="0.5" />
      <ellipse cx="99" cy="30" rx="4" ry="3" fill="#cbd5e1" fillOpacity="0.5" />
    </svg>
  );
}

function PelletsIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="pel-bg"
          x1="0"
          y1="0"
          x2="200"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ecfdf5" stopOpacity="0.9" />
          <stop offset="1" stopColor="#d1fae5" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <rect width="200" height="120" fill="url(#pel-bg)" rx="8" />
      {[
        { cx: 40, cy: 45, r: 12 },
        { cx: 75, cy: 40, r: 10 },
        { cx: 110, cy: 43, r: 11 },
        { cx: 145, cy: 45, r: 12 },
        { cx: 170, cy: 42, r: 9 },
        { cx: 30, cy: 72, r: 10 },
        { cx: 60, cy: 68, r: 13 },
        { cx: 95, cy: 70, r: 11 },
        { cx: 130, cy: 68, r: 12 },
        { cx: 160, cy: 72, r: 10 },
        { cx: 50, cy: 95, r: 9 },
        { cx: 85, cy: 92, r: 11 },
        { cx: 120, cy: 95, r: 12 },
        { cx: 155, cy: 93, r: 10 },
      ].map(({ cx, cy, r }) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={r}
          fill="#14b8a6"
          fillOpacity="0.2"
          stroke="#0d9488"
          strokeWidth="1.2"
          strokeOpacity="0.5"
        />
      ))}
    </svg>
  );
}

function OilWaxIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="oil-bg"
          x1="0"
          y1="0"
          x2="200"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fefce8" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fef9c3" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient
          id="oil-drop"
          x1="90"
          y1="15"
          x2="110"
          y2="80"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <rect width="200" height="120" fill="url(#oil-bg)" rx="8" />
      {/* Large oil drop */}
      <path
        d="M100 18 Q85 38 80 58 Q78 78 100 82 Q122 78 120 58 Q115 38 100 18 Z"
        fill="url(#oil-drop)"
        fillOpacity="0.35"
        stroke="#f59e0b"
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
      {/* Small drops */}
      <path
        d="M50 40 Q43 50 42 60 Q44 68 50 70 Q56 68 57 60 Q56 50 50 40 Z"
        fill="#fbbf24"
        fillOpacity="0.25"
        stroke="#f59e0b"
        strokeWidth="1"
        strokeOpacity="0.4"
      />
      <path
        d="M150 45 Q143 55 142 63 Q144 71 150 73 Q156 71 157 63 Q156 55 150 45 Z"
        fill="#fbbf24"
        fillOpacity="0.25"
        stroke="#f59e0b"
        strokeWidth="1"
        strokeOpacity="0.4"
      />
      {/* Flame */}
      <path
        d="M100 88 Q104 78 100 70 Q96 78 100 88 Z"
        fill="#f97316"
        fillOpacity="0.5"
      />
    </svg>
  );
}

function SterileIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="ste-bg"
          x1="0"
          y1="0"
          x2="200"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#dbeafe" stopOpacity="0.9" />
          <stop offset="1" stopColor="#bfdbfe" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <rect width="200" height="120" fill="url(#ste-bg)" rx="8" />
      {/* Syringe body */}
      <rect
        x="60"
        y="52"
        width="90"
        height="16"
        rx="8"
        fill="#93c5fd"
        fillOpacity="0.3"
        stroke="#3b82f6"
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
      {/* Plunger */}
      <rect
        x="148"
        y="48"
        width="14"
        height="24"
        rx="3"
        fill="#bfdbfe"
        stroke="#3b82f6"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <line
        x1="155"
        y1="48"
        x2="155"
        y2="72"
        stroke="#3b82f6"
        strokeWidth="0.8"
        strokeOpacity="0.4"
      />
      {/* Needle */}
      <rect
        x="40"
        y="57"
        width="22"
        height="6"
        rx="2"
        fill="#60a5fa"
        fillOpacity="0.6"
        stroke="#3b82f6"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <path
        d="M40 60 L30 60"
        stroke="#3b82f6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />
      {/* Liquid inside */}
      <rect
        x="65"
        y="55"
        width="50"
        height="10"
        rx="5"
        fill="#3b82f6"
        fillOpacity="0.2"
      />
      {/* Bubbles */}
      <circle cx="80" cy="60" r="3" fill="#bfdbfe" fillOpacity="0.7" />
      <circle cx="95" cy="59" r="2.5" fill="#bfdbfe" fillOpacity="0.6" />
    </svg>
  );
}

function ExtractsIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="ext-bg"
          x1="0"
          y1="0"
          x2="200"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#dcfce7" stopOpacity="0.9" />
          <stop offset="1" stopColor="#bbf7d0" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient
          id="ext-leaf1"
          x1="60"
          y1="20"
          x2="100"
          y2="80"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4ade80" />
          <stop offset="1" stopColor="#16a34a" />
        </linearGradient>
      </defs>
      <rect width="200" height="120" fill="url(#ext-bg)" rx="8" />
      <path
        d="M100 100 Q100 70 100 40"
        stroke="#16a34a"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M100 60 Q72 40 60 55 Q70 78 100 75 Z"
        fill="url(#ext-leaf1)"
        fillOpacity="0.8"
      />
      <path
        d="M100 50 Q128 30 140 45 Q130 68 100 65 Z"
        fill="#86efac"
        fillOpacity="0.8"
      />
      <circle
        cx="100"
        cy="34"
        r="8"
        fill="#bbf7d0"
        stroke="#22c55e"
        strokeWidth="1.5"
        strokeOpacity="0.7"
      />
      <circle cx="100" cy="34" r="4" fill="#4ade80" fillOpacity="0.9" />
      <ellipse
        cx="45"
        cy="80"
        rx="4"
        ry="6"
        fill="#4ade80"
        fillOpacity="0.35"
        stroke="#22c55e"
        strokeWidth="0.8"
        strokeOpacity="0.5"
      />
      <ellipse
        cx="155"
        cy="85"
        rx="3.5"
        ry="5.5"
        fill="#4ade80"
        fillOpacity="0.35"
        stroke="#22c55e"
        strokeWidth="0.8"
        strokeOpacity="0.5"
      />
    </svg>
  );
}

// Map category id to its illustration component (for product cards)
export function CategoryIllustration({
  category,
  className,
}: { category: string; className?: string }) {
  const props = { className: className ?? "w-full h-full" };
  switch (category) {
    case "pharma-api":
      return <PharmaApiIllustration {...props} />;
    case "excipients":
      return <ExcipientsIllustration {...props} />;
    case "nutraceutical":
      return <NutraceuticalIllustration {...props} />;
    case "solvent":
      return <SolventIllustration {...props} />;
    case "vitamin":
      return <VitaminIllustration {...props} />;
    case "colors":
      return <ColorsIllustration {...props} />;
    case "capsule":
      return <CapsuleIllustration {...props} />;
    case "flavors":
      return <FlavorsIllustration {...props} />;
    case "industrial":
      return <IndustrialIllustration {...props} />;
    case "pellets":
      return <PelletsIllustration {...props} />;
    case "oil-wax":
      return <OilWaxIllustration {...props} />;
    case "sterile":
      return <SterileIllustration {...props} />;
    case "extracts":
      return <ExtractsIllustration {...props} />;
    // legacy
    case "apis":
      return <PharmaApiIllustration {...props} />;
    case "solvents":
      return <SolventIllustration {...props} />;
    case "colorants":
      return <ColorsIllustration {...props} />;
    case "botanicals":
      return <ExtractsIllustration {...props} />;
    default:
      return <PharmaApiIllustration {...props} />;
  }
}
