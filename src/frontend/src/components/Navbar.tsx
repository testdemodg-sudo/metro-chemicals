import { CategoryIcon } from "@/components/CategoryIllustration";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import productData from "@/data/products.json";
import { useNavigate } from "@tanstack/react-router";
import { ChevronDown, FlaskConical, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CategoryItem {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const categories: CategoryItem[] = productData.categories as CategoryItem[];

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

const navLinks = [
  { key: "home" as const, href: "#home" },
  { key: "about" as const, href: "#about" },
  { key: "product" as const, href: "#products" },
  { key: "certification" as const, href: "#certification" },
  { key: "export" as const, href: "#export" },
  { key: "globalPresence" as const, href: "#global-presence" },
] as const;

type NavKey = (typeof navLinks)[number]["key"];

export default function Navbar() {
  const { t, language, toggleLanguage } = useLanguage();
  const { isDark, toggleDark } = useDarkMode();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const sections = [
        "global-presence",
        "export",
        "certification",
        "products",
        "about",
        "home",
      ];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setDropdownOpen(false);
    // If we're on a category page, navigate home first
    if (window.location.pathname !== "/") {
      navigate({ to: "/" }).then(() => {
        setTimeout(() => {
          const id = href.replace("#", "");
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      });
      return;
    }
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategoryClick = (categoryId: string) => {
    setMobileOpen(false);
    setDropdownOpen(false);
    setMobileProductsOpen(false);
    navigate({ to: "/products/$categoryId", params: { categoryId } });
  };

  const navLabel = (key: NavKey): string => {
    const map: Record<NavKey, string> = {
      home: t.nav.home,
      about: t.nav.about,
      product: t.nav.product,
      certification: t.nav.certification,
      export: t.nav.export,
      globalPresence: t.nav.globalPresence,
    };
    return map[key];
  };

  return (
    <>
      <header
        data-ocid="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "navbar-scrolled py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2 group"
            data-ocid="navbar-logo"
          >
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
              <FlaskConical className="w-5 h-5 text-primary" strokeWidth={2} />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-foreground">
              Metro <span className="text-primary">Chemicals</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            data-ocid="navbar-links"
          >
            {navLinks.map(({ key, href }) => {
              if (key === "product") {
                return (
                  <div key={key} className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      data-ocid="navbar-product-dropdown-trigger"
                      onClick={() => setDropdownOpen((v) => !v)}
                      onMouseEnter={() => setDropdownOpen(true)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-smooth hover:bg-primary/8 hover:text-primary ${
                        activeSection === "products" || dropdownOpen
                          ? "text-primary bg-primary/8"
                          : "text-foreground/70"
                      }`}
                    >
                      {navLabel(key)}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Glassmorphism Dropdown */}
                    <div
                      onMouseLeave={() => setDropdownOpen(false)}
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] transition-all duration-200 origin-top ${
                        dropdownOpen
                          ? "opacity-100 scale-100 pointer-events-auto"
                          : "opacity-0 scale-95 pointer-events-none"
                      }`}
                      data-ocid="navbar-product-dropdown"
                    >
                      <div className="glass border border-border/60 rounded-2xl shadow-glass p-4 overflow-hidden">
                        {/* Dropdown header */}
                        <div className="flex items-center justify-between mb-3 pb-3 border-b border-border/50">
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {language === "hi"
                                ? "सभी श्रेणियां"
                                : "All Categories"}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {language === "hi"
                                ? "एक श्रेणी चुनें"
                                : "Browse by product category"}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleNavClick("#products")}
                            className="text-xs text-primary font-semibold hover:underline"
                            data-ocid="navbar-view-all-products"
                          >
                            {language === "hi" ? "सभी देखें →" : "View all →"}
                          </button>
                        </div>

                        {/* Category grid */}
                        <div
                          className="grid grid-cols-4 gap-2"
                          data-ocid="navbar-category-grid"
                        >
                          {categories.map((cat) => (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => handleCategoryClick(cat.id)}
                              data-ocid={`navbar-category.${cat.id}`}
                              className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl hover:bg-primary/8 hover:border-primary/30 border border-transparent transition-smooth group text-center"
                            >
                              <CategoryIcon category={cat.id} size={40} />
                              <span className="text-xs font-medium text-foreground/80 group-hover:text-primary transition-smooth leading-tight">
                                {CAT_SHORT[cat.id] ?? cat.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  type="button"
                  key={key}
                  onClick={() => handleNavClick(href)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-smooth hover:bg-primary/8 hover:text-primary ${
                    activeSection === href.replace("#", "")
                      ? "text-primary bg-primary/8"
                      : "text-foreground/70"
                  }`}
                >
                  {navLabel(key)}
                </button>
              );
            })}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              data-ocid="lang-toggle"
              onClick={toggleLanguage}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border bg-card hover:border-primary/40 hover:text-primary transition-smooth"
              title="Switch Language"
            >
              <span
                className={
                  language === "en" ? "text-primary" : "text-muted-foreground"
                }
              >
                EN
              </span>
              <span className="text-muted-foreground">/</span>
              <span
                className={
                  language === "hi" ? "text-primary" : "text-muted-foreground"
                }
              >
                HI
              </span>
            </button>

            <button
              type="button"
              data-ocid="dark-mode-toggle"
              onClick={toggleDark}
              className="w-9 h-9 rounded-lg flex items-center justify-center border border-border bg-card hover:border-primary/40 hover:text-primary transition-smooth"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNavClick("#contact")}
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-smooth shadow-sm"
              data-ocid="navbar-contact-cta"
            >
              {t.nav.contactUs}
            </button>

            <button
              type="button"
              data-ocid="mobile-menu-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center border border-border bg-card hover:border-primary/40 transition-smooth"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          role="button"
          tabIndex={0}
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setMobileOpen(false)}
          aria-label="Close menu"
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 glass border-l border-border shadow-glass transition-transform duration-300 lg:hidden flex flex-col ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        data-ocid="mobile-menu"
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="font-display font-bold text-base">
            Metro <span className="text-primary">Chemicals</span>
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-smooth"
            aria-label="Close mobile menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
          {navLinks.map(({ key, href }) => {
            if (key === "product") {
              return (
                <div key={key}>
                  <button
                    type="button"
                    onClick={() => setMobileProductsOpen((v) => !v)}
                    data-ocid="mobile-product-dropdown-trigger"
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium hover:bg-primary/8 hover:text-primary transition-smooth text-foreground/80"
                  >
                    <span>{navLabel(key)}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Mobile category list */}
                  {mobileProductsOpen && (
                    <div
                      className="ml-2 mt-1 mb-1 border-l-2 border-primary/20 pl-3 flex flex-col gap-1"
                      data-ocid="mobile-category-list"
                    >
                      <button
                        type="button"
                        onClick={() => handleNavClick("#products")}
                        className="text-left px-3 py-2 rounded-lg text-xs font-semibold text-primary hover:bg-primary/8 transition-smooth"
                      >
                        {language === "hi" ? "सभी उत्पाद" : "All Products"}
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleCategoryClick(cat.id)}
                          data-ocid={`mobile-category.${cat.id}`}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-foreground/80 hover:bg-primary/8 hover:text-primary transition-smooth"
                        >
                          <CategoryIcon category={cat.id} size={28} />
                          <span>{CAT_SHORT[cat.id] ?? cat.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                type="button"
                key={key}
                onClick={() => handleNavClick(href)}
                className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium hover:bg-primary/8 hover:text-primary transition-smooth text-foreground/80"
              >
                {navLabel(key)}
              </button>
            );
          })}

          <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold border border-border bg-card hover:border-primary/40 hover:text-primary transition-smooth"
            >
              <span
                className={
                  language === "en" ? "text-primary" : "text-muted-foreground"
                }
              >
                EN
              </span>
              <span className="text-muted-foreground">/</span>
              <span
                className={
                  language === "hi" ? "text-primary" : "text-muted-foreground"
                }
              >
                HI
              </span>
            </button>

            <button
              type="button"
              onClick={toggleDark}
              className="w-9 h-9 rounded-lg flex items-center justify-center border border-border bg-card hover:border-primary/40 transition-smooth"
              aria-label={isDark ? "Light mode" : "Dark mode"}
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleNavClick("#contact")}
            className="mt-4 w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-smooth text-center"
          >
            {t.nav.contactUs}
          </button>
        </nav>
      </div>
    </>
  );
}
