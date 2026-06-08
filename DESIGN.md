# Design Brief: Metro Chemicals

## Purpose
Premium pharma chemicals manufacturing and export website. Inspires confidence through Apple-inspired minimalism, glassmorphism, and international pharmaceutical/chemical standards. Positioned for B2B pharma chemical purchase and sale context.

## Tone & Differentiation
Luxury minimalism with premium trust signals. Glassmorphism effects convey transparency and approachability. Soft, intentional typography. No brutalism; no aggressive contrast. Execution is refined, not generic.

## Color Palette

| Role | Light | Dark | OKLCH |
|------|-------|------|-------|
| Background | Near-white cool | Premium charcoal | `0.97 0.01 265` / `0.12 0.02 265` |
| Foreground | Deep slate | Near-white | `0.15 0.04 265` / `0.93 0.03 265` |
| Primary (CTA) | Medical blue | Bright blue | `0.62 0.14 246` / `0.72 0.15 246` |
| Secondary/Accent | Healthcare green | Soft green | `0.80 0.09 148` / `0.82 0.10 148` |
| Muted/Section BG | Light gray | Dark gray | `0.92 0.02 265` / `0.22 0.03 265` |
| Card | Soft white | Soft dark | `0.99 0.01 265` / `0.15 0.02 265` |
| Border | Barely-visible | Subtle | `0.90 0.02 265` / `0.22 0.03 265` |

## Typography

| Layer | Font | Use |
|-------|------|-----|
| Display | General Sans | Headlines, hero text (geometric, modern authority) |
| Body | DM Sans | All body copy, UI text (minimal, readable, Apple-like) |
| Mono | JetBrains Mono | Code, technical specs, data labels |

### Type Scale
- Hero: 48px / 700 weight
- H1: 36px / 600 weight
- H2: 28px / 600 weight
- Body: 16px / 400 weight
- Caption: 12px / 500 weight

## Elevation & Depth

| Level | Box Shadow | Border | Backdrop | Use |
|-------|-----------|--------|---------|-----|
| Base | none | `border-border` | solid | Background, text |
| Card | `shadow-glass` | `border-white/20` | `backdrop-blur-md` | Feature cards, testimonials, products |
| Elevated | `shadow-elevated` | subtle | none | CTAs, hover states, modals |
| Subtle | `shadow-subtle` | none | none | Dividers, subtle lift |

## Structural Zones

| Zone | Background | Border | Treatment |
|------|-----------|--------|-----------|
| Header/Nav | `glass` class (blur + white/20 border) | bottom subtle | Sticky, glassmorphism, translucent |
| Hero Section | Gradient white → soft blue | none | Full-width hero image + gradient overlay |
| Content Cards | `glass-card` (elevated glassmorphism) | subtle | Rounded lg, shadow-glass, hover float animation |
| Section BG (alternate) | `bg-muted/20` | none | Recessed, no elevation |
| Footer | `bg-muted/40` | top subtle | Clean, minimal, border-top-border |

## Component Patterns

- **Buttons**: Primary (solid blue, white text), Secondary (outline blue), Ghost (text only)
- **Cards**: Glass effect with blur, rounded-lg, soft shadow
- **Navigation**: Sticky navbar with glass effect, smooth transitions
- **Hover States**: Subtle float animation, shadow-glass, text-primary accent
- **Forms**: Minimal borders, rounded input fields, focus ring on primary color
- **Icons**: 24px, light weight (300-400), inherit color from parent

## Motion & Animation

| Animation | Duration | Use |
|-----------|----------|-----|
| fade-in | 0.5s ease-in | Content entrance |
| slide-up | 0.4s ease-out | Hero reveal, section entrance |
| slide-down | 0.4s ease-out | Dropdown, collapse exit |
| float | 3s infinite | Decorative floating elements |
| transition-smooth | 0.3s cubic-bezier(0.4, 0, 0.2, 1) | All interactive state changes |

## Constraints

- No neon, no aggressive gradients, no bouncy easing
- All colors from OKLCH palette — no arbitrary hex values
- Glassmorphism on cards only; header/footer use subtle alternatives
- Dark mode invert logic: flip lightness values, maintain color saturation
- Minimum touch target: 44px for buttons, interactive elements
- Mobile-first responsive breakpoints: sm (640px), md (768px), lg (1024px)

## Signature Detail

Glassmorphism + blue-green color harmony = premium trust. Glassmorphism cards convey transparency and approachability; soft blue + green palette reinforces healthcare/pharmaceutical authority without aggression. Every interactive state uses `transition-smooth` for refined, Apple-like motion.
