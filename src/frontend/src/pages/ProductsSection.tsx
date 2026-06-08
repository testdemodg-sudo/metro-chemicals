import {
  CategoryIcon,
  CategoryIllustration,
} from "@/components/CategoryIllustration";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useNavigate } from "@tanstack/react-router";
import { FlaskConical, Search } from "lucide-react";
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

// Short display names for the 13 categories
const CAT_SHORT: Record<string, string> = {
  "pharma-api": "Pharma & API",
  excipients: "Excipients",
  nutraceutical: "Nutraceutical",
  solvent: "Solvent",
  vitamin: "Vitamin",
  colors: "Colors",
  capsule: "Capsule",
  flavors: "Flavors",
  industrial: "Industrial",
  pellets: "Pellets",
  "oil-wax": "Oil & Wax",
  sterile: "Sterile",
  extracts: "Extracts",
};

// Hindi category names for 13 categories
const CAT_HI: Record<string, string> = {
  "pharma-api": "फार्मा एपीआई",
  excipients: "एक्सीपिएंट्स",
  nutraceutical: "न्यूट्रास्यूटिकल",
  solvent: "सॉल्वेंट",
  vitamin: "विटामिन",
  colors: "रंग",
  capsule: "कैप्सूल",
  flavors: "फ्लेवर",
  industrial: "औद्योगिक",
  pellets: "पेलेट्स",
  "oil-wax": "तेल और मोम",
  sterile: "स्टेराइल",
  extracts: "अर्क",
};

// Per-category gradient backgrounds for the illustration area
const CAT_GRADIENT: Record<string, string> = {
  "pharma-api": "from-indigo-50/80 via-violet-50/60 to-blue-50/40",
  excipients: "from-green-50/80 via-emerald-50/60 to-teal-50/40",
  nutraceutical: "from-lime-50/80 via-green-50/60 to-emerald-50/40",
  solvent: "from-blue-50/80 via-sky-50/60 to-cyan-50/40",
  vitamin: "from-yellow-50/80 via-amber-50/60 to-orange-50/40",
  colors: "from-rose-50/80 via-pink-50/60 to-red-50/40",
  capsule: "from-violet-50/80 via-purple-50/60 to-indigo-50/40",
  flavors: "from-orange-50/80 via-amber-50/60 to-yellow-50/40",
  industrial: "from-slate-50/80 via-gray-50/60 to-zinc-50/40",
  pellets: "from-teal-50/80 via-cyan-50/60 to-emerald-50/40",
  "oil-wax": "from-yellow-50/80 via-amber-50/60 to-lime-50/40",
  sterile: "from-blue-50/80 via-indigo-50/60 to-sky-50/40",
  extracts: "from-green-50/80 via-lime-50/60 to-emerald-50/40",
  // legacy fallbacks
  apis: "from-indigo-50/80 via-violet-50/60 to-blue-50/40",
  solvents: "from-blue-50/80 via-sky-50/60 to-cyan-50/40",
  colorants: "from-rose-50/80 via-pink-50/60 to-red-50/40",
  botanicals: "from-green-50/80 via-lime-50/60 to-emerald-50/40",
};

// Fixed dot positions for colored powder texture (deterministic, no runtime keys)
const POWDER_DOTS: Array<{ w: number; h: number; l: number; t: number }> = [
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
  { w: 13, h: 13, l: 84, t: 43 },
  { w: 4, h: 4, l: 8, t: 68 },
  { w: 7, h: 7, l: 48, t: 68 },
  { w: 10, h: 10, l: 73, t: 68 },
  { w: 13, h: 13, l: 23, t: 23 },
  { w: 4, h: 4, l: 57, t: 23 },
  { w: 7, h: 7, l: 33, t: 53 },
  { w: 10, h: 10, l: 61, t: 53 },
  { w: 13, h: 13, l: 88, t: 73 },
];

function ProductCard({
  product,
  index,
}: { product: ProductItem; index: number }) {
  const { language } = useLanguage();
  const catName =
    language === "hi"
      ? (CAT_HI[product.category] ??
        CAT_SHORT[product.category] ??
        product.category)
      : (CAT_SHORT[product.category] ?? product.category);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const gradClass =
    CAT_GRADIENT[product.category] ?? "from-primary/5 to-accent/5";

  return (
    <div
      className="glass-card card-3d shadow-card border border-border hover:border-primary/40 transition-smooth group flex flex-col overflow-hidden"
      data-ocid={`product.item.${index + 1}`}
    >
      {/* Illustration / visual area */}
      <div
        className={`relative w-full h-36 bg-gradient-to-br ${gradClass} rounded-t-xl overflow-hidden flex items-center justify-center flex-shrink-0`}
      >
        {product.isColoredPowder && product.colorHex ? (
          <>
            {/* Tinted base */}
            <div
              className="absolute inset-0 opacity-25"
              style={{ backgroundColor: product.colorHex }}
            />
            {/* Deterministic powder texture dots */}
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
            {/* Large color swatch badge */}
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
          /* All other products: category SVG illustration */
          <CategoryIllustration
            category={product.category}
            className="w-full h-full"
          />
        )}

        {/* Category badge — top-left */}
        <span className="absolute top-2 left-2 inline-flex items-center gap-1 text-xs font-medium text-primary bg-white/75 backdrop-blur-sm px-2 py-0.5 rounded-full border border-primary/20 shadow-sm">
          {catName}
        </span>
        {/* Purity badge — top-right */}
        <span className="absolute top-2 right-2 text-xs font-semibold text-accent bg-white/75 backdrop-blur-sm px-2 py-0.5 rounded-full border border-accent/20 shadow-sm">
          {product.purity}
        </span>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4">
        {/* Product name */}
        <h3 className="font-display font-bold text-sm text-foreground leading-snug mb-1 group-hover:text-primary transition-smooth">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Liquid indicator */}
        {!product.isColoredPowder && product.unit === "LTR" && (
          <div className="flex items-center gap-1.5 mt-3">
            <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <FlaskConical className="w-3 h-3 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Liquid form</span>
          </div>
        )}

        {/* Footer row */}
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
            data-ocid={`product.quote_button.${index + 1}`}
            className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-smooth"
          >
            Request Quote
          </button>
        </div>
      </div>
    </div>
  );
}

// Large category card for filter tabs — clicking navigates to category page
function CategoryCard({
  cat,
  active,
  count,
  onClick,
  onNavigate,
  language,
}: {
  cat: CategoryItem;
  active: boolean;
  count: number;
  onClick: () => void;
  onNavigate: () => void;
  language: string;
}) {
  const shortName =
    language === "hi"
      ? (CAT_HI[cat.id] ?? cat.name)
      : (CAT_SHORT[cat.id] ?? cat.name);

  return (
    <div
      className={`relative flex flex-col items-center gap-3 py-5 px-4 rounded-2xl min-w-[140px] transition-smooth border-2 group ${
        active
          ? "border-primary bg-primary/8 shadow-card"
          : "border-border bg-card hover:border-primary/40 hover:bg-primary/4"
      }`}
      data-ocid={`product.filter.${cat.id}`}
    >
      {/* Click icon area → navigate to category page */}
      <button
        type="button"
        onClick={onNavigate}
        className="flex flex-col items-center gap-3 w-full focus:outline-none"
        aria-label={`Browse ${shortName} category`}
        data-ocid={`product.category-link.${cat.id}`}
      >
        {/* Large category icon */}
        <CategoryIcon
          category={cat.id}
          size={88}
          className={`transition-smooth ${active ? "scale-105" : "group-hover:scale-102"}`}
        />

        {/* Category name */}
        <span
          className={`text-sm font-semibold text-center leading-tight ${
            active ? "text-primary" : "text-foreground group-hover:text-primary"
          }`}
        >
          {shortName}
        </span>
      </button>

      {/* Product count badge — clicking sets inline filter */}
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center justify-center min-w-[32px] px-2 py-0.5 rounded-full text-xs font-bold transition-smooth ${
          active
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground group-hover:bg-primary/15 group-hover:text-primary"
        }`}
        title="Filter products on this page"
        data-ocid={`product.filter-count.${cat.id}`}
      >
        {count}
      </button>

      {/* Active indicator dot */}
      {active && (
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
      )}
    </div>
  );
}

export default function ProductsSection() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const ref = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  const countByCategory = useMemo(() => {
    const map: Record<string, number> = { all: allProducts.length };
    for (const cat of categories) {
      map[cat.id] = allProducts.filter((p) => p.category === cat.id).length;
    }
    return map;
  }, []);

  const filtered = useMemo(() => {
    let list =
      activeCategory === "all"
        ? allProducts
        : allProducts.filter((p) => p.category === activeCategory);
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
  }, [activeCategory, search]);

  const handleCategoryNavigate = (categoryId: string) => {
    navigate({ to: "/products/$categoryId", params: { categoryId } });
  };

  return (
    <section
      id="products"
      className="py-24 bg-background section-gradient-blue"
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div
          ref={ref}
          className="animate-on-scroll text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4 uppercase tracking-widest">
            {language === "hi" ? "उत्पाद" : "Products"}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.products.title}
          </h2>
          <p className="text-muted-foreground text-lg">{t.products.subtitle}</p>
          <p className="text-sm text-muted-foreground/70 mt-2">
            {language === "hi"
              ? `13 श्रेणियों में ${allProducts.length}+ उत्पाद`
              : `${allProducts.length}+ products across 13 categories`}
          </p>
        </div>

        {/* Search bar */}
        <div
          className="max-w-md mx-auto mb-10 relative"
          data-ocid="product.search_input"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              language === "hi"
                ? "उत्पाद खोजें..."
                : "Search products by name or HS code..."
            }
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-smooth"
          />
        </div>

        {/* "All Products" pill button */}
        <div className="flex justify-center mb-6" data-ocid="product.filter">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            data-ocid="product.filter.all"
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-smooth border-2 ${
              activeCategory === "all"
                ? "bg-primary text-primary-foreground border-primary shadow-card"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary bg-card"
            }`}
          >
            {language === "hi" ? "सभी उत्पाद" : "All Products"}{" "}
            <span className="opacity-80">({countByCategory.all})</span>
          </button>
        </div>

        {/* Category filter cards — click name/icon navigates to category page, count badge filters inline */}
        <div className="overflow-x-auto pb-4 mb-10 -mx-4 px-4">
          <div className="flex gap-3 min-w-max lg:min-w-0 lg:flex-wrap lg:justify-center">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                cat={cat}
                active={activeCategory === cat.id}
                count={countByCategory[cat.id] ?? 0}
                onClick={() => setActiveCategory(cat.id)}
                onNavigate={() => handleCategoryNavigate(cat.id)}
                language={language}
              />
            ))}
          </div>
        </div>

        {/* Active category description */}
        {activeCategory !== "all" && (
          <div className="text-center mb-8">
            {categories
              .filter((c) => c.id === activeCategory)
              .map((c) => (
                <div
                  key={c.id}
                  className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-primary/6 border border-primary/15"
                >
                  <CategoryIcon category={c.id} size={36} />
                  <p className="text-sm font-medium text-foreground">
                    {c.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCategoryNavigate(c.id)}
                    className="ml-2 text-xs text-primary font-semibold hover:underline flex-shrink-0"
                    data-ocid={`product.view-category.${c.id}`}
                  >
                    {language === "hi" ? "पूरी श्रेणी →" : "View category →"}
                  </button>
                </div>
              ))}
          </div>
        )}

        {/* Products grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-20 glass-card border border-border rounded-2xl"
            data-ocid="product.empty_state"
          >
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-foreground font-semibold mb-1">
              No products found
            </p>
            <p className="text-muted-foreground text-sm">
              Try a different search term or category
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm mb-4">
            {language === "hi"
              ? `कुल ${filtered.length} उत्पाद उपलब्ध हैं`
              : `Showing ${filtered.length} of ${allProducts.length} products`}
          </p>
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3.5 rounded-xl border-2 border-primary/30 text-primary font-semibold hover:border-primary hover:bg-primary/5 transition-smooth"
            data-ocid="product.catalogue_button"
          >
            {language === "hi"
              ? "पूरा कैटलॉग मंगाएं"
              : "Request Full Chemical Catalogue"}
          </button>
        </div>
      </div>
    </section>
  );
}
