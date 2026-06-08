import {
  CategoryIcon,
  CategoryIllustration,
} from "@/components/CategoryIllustration";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, FlaskConical, Home, Search } from "lucide-react";
import { useMemo, useState } from "react";
import productData from "../data/products.json";

interface ProductItem {
  id: number;
  name: string;
  category: string;
  description: string;
  unit: string;
  purity: string;
  hsCode: string;
  colorHex: string | null;
  isColoredPowder: boolean;
}

interface CategoryItem {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const categories: CategoryItem[] = productData.categories as CategoryItem[];
const allProducts: ProductItem[] = productData.products as ProductItem[];

const CAT_SHORT: Record<string, string> = {
  "pharma-api": "Pharma & API",
  excipients: "Excipients",
  nutraceutical: "Nutraceutical",
  solvent: "Solvent",
  vitamin: "Vitamin",
  colors: "Colors",
  capsule: "Capsule",
  flavors: "Flavors",
  industrial: "Industrial Chemicals",
  pellets: "Pellets",
  "oil-wax": "Oil & Wax",
  sterile: "Sterile Injectable",
  extracts: "Extracts",
};

const CAT_HI: Record<string, string> = {
  "pharma-api": "फार्मा एपीआई",
  excipients: "एक्सीपिएंट्स",
  nutraceutical: "न्यूट्रास्यूटिकल",
  solvent: "सॉल्वेंट",
  vitamin: "विटामिन",
  colors: "रंग",
  capsule: "कैप्सूल",
  flavors: "फ्लेवर",
  industrial: "औद्योगिक रसायन",
  pellets: "पेलेट्स",
  "oil-wax": "तेल और मोम",
  sterile: "स्टेराइल",
  extracts: "अर्क",
};

const CAT_GRADIENT: Record<string, { from: string; via: string; to: string }> =
  {
    "pharma-api": { from: "#dbeafe", via: "#ede9fe", to: "#c7d2fe" },
    excipients: { from: "#d1fae5", via: "#ecfdf5", to: "#a7f3d0" },
    nutraceutical: { from: "#dcfce7", via: "#f0fdf4", to: "#bbf7d0" },
    solvent: { from: "#dbeafe", via: "#e0f2fe", to: "#bae6fd" },
    vitamin: { from: "#fef9c3", via: "#fef3c7", to: "#fde68a" },
    colors: { from: "#fce7f3", via: "#fdf2f8", to: "#fbcfe8" },
    capsule: { from: "#e0e7ff", via: "#ede9fe", to: "#ddd6fe" },
    flavors: { from: "#fff7ed", via: "#fef3c7", to: "#fed7aa" },
    industrial: { from: "#f1f5f9", via: "#e2e8f0", to: "#cbd5e1" },
    pellets: { from: "#ecfdf5", via: "#d1fae5", to: "#a7f3d0" },
    "oil-wax": { from: "#fefce8", via: "#fef9c3", to: "#fef08a" },
    sterile: { from: "#dbeafe", via: "#bfdbfe", to: "#93c5fd" },
    extracts: { from: "#dcfce7", via: "#bbf7d0", to: "#86efac" },
  };

// Fixed powder dots (deterministic)
const POWDER_DOTS = [
  { w: 4, h: 4, l: 5, t: 10 },
  { w: 7, h: 7, l: 42, t: 10 },
  { w: 10, h: 10, l: 79, t: 10 },
  { w: 13, h: 13, l: 16, t: 33 },
  { w: 4, h: 4, l: 53, t: 33 },
  { w: 7, h: 7, l: 5, t: 56 },
  { w: 10, h: 10, l: 42, t: 56 },
  { w: 13, h: 13, l: 79, t: 56 },
  { w: 4, h: 4, l: 16, t: 79 },
  { w: 7, h: 7, l: 53, t: 79 },
  { w: 10, h: 10, l: 79, t: 23 },
  { w: 13, h: 13, l: 68, t: 46 },
  { w: 4, h: 4, l: 27, t: 13 },
  { w: 7, h: 7, l: 64, t: 13 },
  { w: 10, h: 10, l: 37, t: 43 },
];

function ProductCard({
  product,
  index,
}: { product: ProductItem; index: number }) {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const catName =
    language === "hi"
      ? (CAT_HI[product.category] ??
        CAT_SHORT[product.category] ??
        product.category)
      : (CAT_SHORT[product.category] ?? product.category);

  const gradConfig = CAT_GRADIENT[product.category] ?? {
    from: "#dbeafe",
    via: "#ede9fe",
    to: "#c7d2fe",
  };

  const scrollToContact = () => {
    if (window.location.pathname !== "/") {
      navigate({ to: "/" }).then(() => {
        setTimeout(() => {
          document
            .getElementById("contact")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      });
    } else {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="glass-card card-3d shadow-card border border-border hover:border-primary/40 transition-smooth group flex flex-col overflow-hidden"
      data-ocid={`category-page.product.item.${index + 1}`}
    >
      {/* Illustration / visual area */}
      <div
        className="relative w-full h-36 rounded-t-xl overflow-hidden flex items-center justify-center flex-shrink-0"
        style={{
          background: `linear-gradient(135deg, ${gradConfig.from}, ${gradConfig.via}, ${gradConfig.to})`,
        }}
      >
        {product.isColoredPowder && product.colorHex ? (
          <>
            <div
              className="absolute inset-0 opacity-25"
              style={{ backgroundColor: product.colorHex }}
            />
            <div className="absolute inset-0 overflow-hidden">
              {POWDER_DOTS.map((dot) => (
                <div
                  key={`dot-${dot.l}-${dot.t}`}
                  className="absolute rounded-full opacity-40"
                  style={{
                    backgroundColor: product.colorHex ?? "#888",
                    width: `${dot.w}px`,
                    height: `${dot.h}px`,
                    left: `${dot.l}%`,
                    top: `${dot.t}%`,
                    filter: "blur(0.5px)",
                  }}
                />
              ))}
            </div>
            <div className="relative flex flex-col items-center gap-1.5 z-10">
              <div
                className="w-14 h-14 rounded-full border-4 border-white/80 shadow-lg"
                style={{ backgroundColor: product.colorHex }}
                aria-label={`Powder color: ${product.colorHex}`}
              />
              <span className="text-xs font-semibold text-foreground/80 bg-white/70 px-2 py-0.5 rounded-full backdrop-blur-sm">
                {product.colorHex}
              </span>
            </div>
          </>
        ) : (
          <CategoryIllustration
            category={product.category}
            className="w-full h-full"
          />
        )}

        <span className="absolute top-2 left-2 inline-flex items-center gap-1 text-xs font-medium text-primary bg-white/75 backdrop-blur-sm px-2 py-0.5 rounded-full border border-primary/20 shadow-sm">
          {catName}
        </span>
        <span className="absolute top-2 right-2 text-xs font-semibold text-accent bg-white/75 backdrop-blur-sm px-2 py-0.5 rounded-full border border-accent/20 shadow-sm">
          {product.purity}
        </span>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-display font-bold text-sm text-foreground leading-snug mb-1 group-hover:text-primary transition-smooth">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed flex-1">
          {product.description}
        </p>

        {!product.isColoredPowder && product.unit === "LTR" && (
          <div className="flex items-center gap-1.5 mt-3">
            <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <FlaskConical className="w-3 h-3 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Liquid form</span>
          </div>
        )}

        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between gap-2">
          <div>
            <span className="text-xs text-muted-foreground block">
              Unit:{" "}
              <span className="font-semibold text-foreground">
                {product.unit}
              </span>
            </span>
            <span className="text-xs text-muted-foreground/60 mt-0.5 block truncate max-w-[110px]">
              HS: {product.hsCode}
            </span>
          </div>
          <button
            type="button"
            onClick={scrollToContact}
            data-ocid={`category-page.product.quote_button.${index + 1}`}
            className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-smooth"
          >
            Request Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CategoryPage() {
  const { categoryId } = useParams({ from: "/products/$categoryId" });
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const category = categories.find((c) => c.id === categoryId);
  const catName = category
    ? language === "hi"
      ? (CAT_HI[categoryId] ?? category.name)
      : (CAT_SHORT[categoryId] ?? category.name)
    : categoryId;

  const gradConfig = CAT_GRADIENT[categoryId] ?? {
    from: "#dbeafe",
    via: "#ede9fe",
    to: "#c7d2fe",
  };

  const products = useMemo(() => {
    let list = allProducts.filter((p) => p.category === categoryId);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.hsCode.includes(q),
      );
    }
    return list;
  }, [categoryId, search]);

  const handleGoHome = () => navigate({ to: "/" });
  const handleGoProducts = () => {
    navigate({ to: "/" }).then(() => {
      setTimeout(() => {
        document
          .getElementById("products")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
  };

  // If invalid category, show not found
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center" data-ocid="category-page.not_found">
          <h1 className="font-display text-2xl font-bold text-foreground mb-3">
            Category not found
          </h1>
          <button
            type="button"
            onClick={handleGoHome}
            className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-smooth"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-ocid="category-page">
      {/* Hero Section */}
      <section
        className="pt-28 pb-16 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${gradConfig.from} 0%, ${gradConfig.via} 50%, ${gradConfig.to} 100%)`,
        }}
        data-ocid="category-page.hero"
      >
        {/* Subtle decorative background blobs */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          aria-hidden="true"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 80% 30%, ${gradConfig.from}cc, transparent)`,
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-sm mb-8"
            aria-label="Breadcrumb"
            data-ocid="category-page.breadcrumb"
          >
            <button
              type="button"
              onClick={handleGoHome}
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-smooth"
              data-ocid="category-page.breadcrumb-home"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span className="text-muted-foreground/50">/</span>
            <button
              type="button"
              onClick={handleGoProducts}
              className="text-muted-foreground hover:text-primary transition-smooth"
              data-ocid="category-page.breadcrumb-products"
            >
              Products
            </button>
            <span className="text-muted-foreground/50">/</span>
            <span className="text-foreground font-semibold">{catName}</span>
          </nav>

          {/* Hero content */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Large category icon */}
            <div className="flex-shrink-0">
              <CategoryIcon category={categoryId} size={120} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 text-xs font-semibold text-primary mb-3">
                <span>Metro Chemicals</span>
                <span className="w-1 h-1 rounded-full bg-primary/50" />
                <span>
                  {language === "hi" ? "उत्पाद श्रेणी" : "Product Category"}
                </span>
              </div>

              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 leading-tight">
                {catName}
              </h1>

              <p className="text-base text-muted-foreground max-w-xl leading-relaxed mb-4">
                {category.description}
              </p>

              <div className="flex items-center gap-4 flex-wrap">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 text-sm font-semibold text-foreground">
                  <FlaskConical className="w-3.5 h-3.5 text-primary" />
                  {allProducts.filter((p) => p.category === categoryId).length}{" "}
                  {language === "hi" ? "उत्पाद" : "Products"}
                </span>
                <button
                  type="button"
                  onClick={handleGoProducts}
                  data-ocid="category-page.back-button"
                  className="flex items-center gap-2 px-4 py-1.5 rounded-xl border border-primary/30 bg-white/60 backdrop-blur-sm text-primary text-sm font-semibold hover:bg-white/80 hover:border-primary/60 transition-smooth"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {language === "hi" ? "सभी श्रेणियां" : "All Categories"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section
        className="py-12 bg-background"
        data-ocid="category-page.products"
      >
        <div className="container mx-auto px-4">
          {/* Search bar */}
          <div
            className="max-w-md mx-auto mb-8 relative"
            data-ocid="category-page.search_input"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                language === "hi"
                  ? `${catName} में खोजें...`
                  : `Search in ${catName}...`
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-smooth"
            />
          </div>

          {/* Count info */}
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground">
              {search.trim()
                ? `${products.length} result${products.length !== 1 ? "s" : ""} for "${search}"`
                : language === "hi"
                  ? `${products.length} उत्पाद ${catName} में`
                  : `Showing ${products.length} products in ${catName}`}
            </p>
          </div>

          {/* Products grid */}
          {products.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div
              className="text-center py-20 glass-card border border-border rounded-2xl"
              data-ocid="category-page.empty_state"
            >
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-foreground font-semibold mb-1">
                No products found
              </p>
              <p className="text-muted-foreground text-sm">
                Try a different search term
              </p>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="text-center mt-12 pt-8 border-t border-border">
            <p className="text-muted-foreground text-sm mb-4">
              {language === "hi"
                ? "कोट के लिए संपर्क करें"
                : "Need a custom quantity or have a specific requirement?"}
            </p>
            <button
              type="button"
              onClick={() => {
                navigate({ to: "/" }).then(() => {
                  setTimeout(() => {
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 150);
                });
              }}
              className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-smooth shadow-sm"
              data-ocid="category-page.contact-cta"
            >
              {language === "hi" ? "संपर्क करें" : "Contact Us for a Quote"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
