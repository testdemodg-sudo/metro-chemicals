import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useState } from "react";

export type Language = "en" | "hi";

export interface Translations {
  nav: {
    home: string;
    about: string;
    product: string;
    certification: string;
    export: string;
    globalPresence: string;
    contactUs: string;
  };
  hero: {
    headline1: string;
    headline2: string;
    headline3: string;
    subtitle: string;
    cta1: string;
    cta2: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
  };
  products: {
    title: string;
    subtitle: string;
    filterAll: string;
  };
  certification: {
    title: string;
    subtitle: string;
    gstLabel: string;
    gstSince: string;
  };
  export: {
    title: string;
    subtitle: string;
  };
  globalPresence: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
  };
  footer: {
    tagline: string;
    rights: string;
  };
  chatbot: {
    placeholder: string;
    title: string;
    subtitle: string;
    greeting: string;
  };
}

const en: Translations = {
  nav: {
    home: "Home",
    about: "About Us",
    product: "Product",
    certification: "Certification",
    export: "Export",
    globalPresence: "Global Presence",
    contactUs: "Contact Us",
  },
  hero: {
    headline1: "Precision",
    headline2: "Chemicals.",
    headline3: "Global Supply.",
    subtitle:
      "Metro Chemicals — Your trusted partner for high-quality pharma chemicals, bulk drug supply, and API intermediates with GMP-certified excellence.",
    cta1: "Explore Products",
    cta2: "Contact Us",
  },
  about: {
    title: "About Metro Chemicals",
    subtitle: "Trusted Pharma Chemical Supplier Since 2008",
    description:
      "We are a premier pharma chemicals trading and manufacturing company, committed to delivering pharmaceutical-grade chemicals of the highest quality to global markets.",
  },
  products: {
    title: "Our Chemical Portfolio",
    subtitle: "World-class pharma chemicals across therapeutic categories",
    filterAll: "All",
  },
  certification: {
    title: "Certifications & Standards",
    subtitle: "Meeting international quality benchmarks",
    gstLabel: "GST Registration Certificate",
    gstSince: "Since Dec 2023",
  },
  export: {
    title: "Global Export Network",
    subtitle: "Delivering pharma chemicals to 40+ countries",
  },
  globalPresence: {
    title: "Our Global Presence",
    subtitle: "Trusted by partners across 6 continents",
  },
  contact: {
    title: "Get in Touch",
    subtitle: "We're here to help you with all your pharma chemical needs",
    name: "Your Name",
    email: "Email Address",
    message: "Your Message",
    send: "Send Message",
  },
  footer: {
    tagline: "Quality Chemicals, Trusted Supply",
    rights: "All rights reserved.",
  },
  chatbot: {
    placeholder: "Ask about our chemicals...",
    title: "Metro Chemicals",
    subtitle: "Pharma Chemical Assistant",
    greeting:
      "Hello! Welcome to Metro Chemicals. I can help you with information about our pharma chemicals, bulk drug supply, pricing, and export services. How can I assist you today?",
  },
};

const hi: Translations = {
  nav: {
    home: "होम",
    about: "हमारे बारे में",
    product: "उत्पाद",
    certification: "प्रमाणन",
    export: "निर्यात",
    globalPresence: "वैश्विक उपस्थिति",
    contactUs: "संपर्क करें",
  },
  hero: {
    headline1: "सटीक",
    headline2: "रसायन।",
    headline3: "वैश्विक आपूर्ति।",
    subtitle:
      "Metro Chemicals — GMP-प्रमाणित उत्कृष्टता के साथ उच्च-गुणवत्ता वाले फार्मा रसायन, बल्क ड्रग सप्लाई और API इंटरमीडिएट के लिए आपका विश्वसनीय भागीदार।",
    cta1: "उत्पाद देखें",
    cta2: "संपर्क करें",
  },
  about: {
    title: "Metro Chemicals के बारे में",
    subtitle: "2008 से विश्वसनीय फार्मा केमिकल सप्लायर",
    description:
      "हम एक प्रीमियर फार्मा केमिकल्स ट्रेडिंग और मैन्युफैक्चरिंग कंपनी हैं, जो वैश्विक बाजारों को उच्चतम गुणवत्ता के फार्मास्युटिकल-ग्रेड रसायन प्रदान करने के लिए प्रतिबद्ध हैं।",
  },
  products: {
    title: "हमारा केमिकल पोर्टफोलियो",
    subtitle: "चिकित्सीय श्रेणियों में विश्व स्तरीय फार्मा रसायन",
    filterAll: "सभी",
  },
  certification: {
    title: "प्रमाणन और मानक",
    subtitle: "अंतर्राष्ट्रीय गुणवत्ता मानकों को पूरा करना",
    gstLabel: "GST पंजीकरण प्रमाणपत्र",
    gstSince: "दिसंबर 2023 से",
  },
  export: {
    title: "वैश्विक निर्यात नेटवर्क",
    subtitle: "40+ देशों को फार्मा रसायन पहुंचाना",
  },
  globalPresence: {
    title: "हमारी वैश्विक उपस्थिति",
    subtitle: "6 महाद्वीपों के भागीदारों द्वारा विश्वसनीय",
  },
  contact: {
    title: "संपर्क करें",
    subtitle: "हम आपकी सभी फार्मा केमिकल जरूरतों में मदद करने के लिए यहाँ हैं",
    name: "आपका नाम",
    email: "ईमेल पता",
    message: "आपका संदेश",
    send: "संदेश भेजें",
  },
  footer: {
    tagline: "गुणवत्ता रसायन, विश्वसनीय आपूर्ति",
    rights: "सर्वाधिकार सुरक्षित।",
  },
  chatbot: {
    placeholder: "हमारे रसायनों के बारे में पूछें...",
    title: "Metro Chemicals",
    subtitle: "फार्मा केमिकल सहायक",
    greeting:
      "नमस्ते! Metro Chemicals में आपका स्वागत है। मैं आपको हमारे फार्मा रसायनों, बल्क ड्रग सप्लाई, मूल्य निर्धारण और निर्यात सेवाओं के बारे में जानकारी दे सकता हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?",
  },
};

export const translations: Record<Language, Translations> = { en, hi };

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  }, []);

  const value: LanguageContextValue = {
    language,
    setLanguage,
    t: translations[language],
    toggleLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
