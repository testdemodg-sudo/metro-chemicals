import { useLanguage } from "@/contexts/LanguageContext";
import {
  ChevronDown,
  FlaskConical,
  MessageCircle,
  Send,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const botResponses: Record<string, { en: string; hi: string }> = {
  apis: {
    en: "Metro Chemicals supplies a wide range of Active Pharmaceutical Ingredients (APIs) including Paracetamol, Ibuprofen, Metformin, Amoxicillin, Azithromycin, Ciprofloxacin, and many more. All our APIs are USP/BP/EP compliant and GMP-certified. We supply in bulk — minimum order quantities vary by product. Contact us at metro.chemicalsofficial@gmail.com for pricing and availability.",
    hi: "Metro Chemicals पैरासिटामोल, इबुप्रोफेन, मेटफॉर्मिन, एमोक्सिसिलिन सहित सक्रिय फार्मास्यूटिकल सामग्री (API) की विस्तृत श्रृंखला आपूर्ति करती है। सभी API USP/BP/EP अनुरूप और GMP-प्रमाणित हैं। मूल्य के लिए metro.chemicalsofficial@gmail.com पर संपर्क करें।",
  },
  solvents: {
    en: "We supply pharmaceutical-grade solvents including Methanol, Ethanol (99.9%), Acetone, Isopropyl Alcohol (IPA), Chloroform, Acetonitrile, Dichloromethane, and more. Available in HPLC, GMP, and industrial grades. Bulk supply with CoA and MSDS documentation provided. Call us at +91 7876355457 for bulk pricing.",
    hi: "हम मेथनॉल, एथनॉल, एसीटोन, IPA, क्लोरोफॉर्म सहित फार्मास्युटिकल ग्रेड सॉल्वेंट्स की आपूर्ति करते हैं। HPLC, GMP और औद्योगिक ग्रेड उपलब्ध। थोक मूल्य के लिए +91 7876355457 पर कॉल करें।",
  },
  reagents: {
    en: "Our reagents portfolio includes Hydrochloric Acid, Sulfuric Acid, Sodium Hydroxide, Ammonia Solution, Hydrogen Peroxide, Acetic Acid, Citric Acid, and 200+ more chemical reagents. Available in LR, AR, and GMP grades. We provide complete CoA and safety documentation with every order.",
    hi: "हमारे रिएजेंट पोर्टफोलियो में हाइड्रोक्लोरिक एसिड, सोडियम हाइड्रॉक्साइड, एसिटिक एसिड और 200+ से अधिक केमिकल रिएजेंट शामिल हैं। LR, AR और GMP ग्रेड उपलब्ध।",
  },
  pricing: {
    en: "Metro Chemicals offers competitive bulk pricing with volume discounts. Pricing depends on the chemical, grade, and order quantity. For a formal quotation: 📧 metro.chemicalsofficial@gmail.com | 📞 +91 7876355457. We offer long-term supply contracts with locked-in pricing for repeat customers.",
    hi: "Metro Chemicals प्रतिस्पर्धी थोक मूल्य और वॉल्यूम डिस्काउंट प्रदान करता है। कोटेशन के लिए: 📧 metro.chemicalsofficial@gmail.com | 📞 +91 7876355457",
  },
  purchase: {
    en: "To place a purchase order with Metro Chemicals: 1) Send your chemical requirements to metro.chemicalsofficial@gmail.com 2) We'll send you a proforma invoice 3) Confirm order with advance payment 4) We dispatch within 3-5 business days with full CoA documentation. For urgent orders call +91 7876355457.",
    hi: "Metro Chemicals से खरीदने के लिए: 1) अपनी आवश्यकता metro.chemicalsofficial@gmail.com पर भेजें 2) हम Proforma Invoice भेजेंगे 3) अग्रिम भुगतान के साथ ऑर्डर कन्फर्म करें। आपातकाल में +91 7876355457 पर कॉल करें।",
  },
  export: {
    en: "Metro Chemicals exports pharma chemicals to 40+ countries across Asia, Africa, Middle East, Latin America, and Europe. We handle all export documentation including CoA, MSDS, GMP certificates, and customs paperwork. We comply with international dangerous goods shipping regulations. Contact our export team: metro.chemicalsofficial@gmail.com",
    hi: "Metro Chemicals एशिया, अफ्रीका, मध्य पूर्व, लैटिन अमेरिका और यूरोप में 40+ देशों को रसायन निर्यात करती है। पूरी दस्तावेज़ सहायता सहित। हमारी export टीम से संपर्क करें: metro.chemicalsofficial@gmail.com",
  },
  certification: {
    en: "Metro Chemicals holds: ✅ WHO-GMP Certification ✅ ISO 9001:2015 Quality Management ✅ ISO 14001 Environmental Standard ✅ CDSCO Approved ✅ Import/Export License. All chemicals come with Certificate of Analysis (CoA) and Material Safety Data Sheet (MSDS). We can provide GMP compliance certificates for regulatory submissions.",
    hi: "Metro Chemicals के पास: ✅ WHO-GMP ✅ ISO 9001:2015 ✅ ISO 14001 ✅ CDSCO अनुमोदित। सभी रसायनों के साथ CoA और MSDS प्रदान की जाती है।",
  },
  contact: {
    en: "📧 Email: metro.chemicalsofficial@gmail.com\n📞 Phone: +91 7876355457\n📍 Address: Industrial Area Phase II, Baddi, Himachal Pradesh 174102, India\n⏰ Office hours: Mon–Sat, 9 AM – 6 PM IST\n\nFor bulk orders, export inquiries, or product availability — our team responds within 2-4 hours during business hours.",
    hi: "📧 ईमेल: metro.chemicalsofficial@gmail.com\n📞 फोन: +91 7876355457\n📍 पता: बद्दी, हिमाचल प्रदेश 174102, भारत\n⏰ समय: सोम–शनि, सुबह 9 – शाम 6 IST",
  },
  minimum: {
    en: "Minimum order quantities vary by chemical type: APIs typically start at 5-25 kg, Solvents from 50-200 liters, Reagents from 25-100 kg. We accommodate both small trial orders and large bulk requirements. Contact us at metro.chemicalsofficial@gmail.com for specific MOQ and pricing.",
    hi: "न्यूनतम ऑर्डर मात्रा रसायन प्रकार के अनुसार भिन्न होती है। API 5-25 kg से, Solvents 50-200 लीटर से। विस्तृत जानकारी के लिए metro.chemicalsofficial@gmail.com पर संपर्क करें।",
  },
  default: {
    en: "Welcome to Metro Chemicals! I can help you with:\n• Product inquiries (APIs, Solvents, Reagents, Lab Chemicals)\n• Purchase orders and bulk pricing\n• Export partnerships and documentation\n• Certifications (GMP, ISO, CoA)\n• Contact information\n\nWhat would you like to know?",
    hi: "Metro Chemicals में आपका स्वागत है! मैं इनमें मदद कर सकता हूँ:\n• उत्पाद पूछताछ (API, सॉल्वेंट, रिएजेंट)\n• खरीद ऑर्डर और थोक मूल्य\n• निर्यात साझेदारी\n• प्रमाणन (GMP, ISO, CoA)\n\nआप क्या जानना चाहते हैं?",
  },
};

function getBotResponse(input: string, lang: "en" | "hi"): string {
  const lower = input.toLowerCase();

  if (
    lower.includes("api") ||
    lower.includes("active pharma") ||
    lower.includes("paracetamol") ||
    lower.includes("ibuprofen") ||
    lower.includes("amoxicillin") ||
    lower.includes("सक्रिय")
  ) {
    return botResponses.apis[lang];
  }
  if (
    lower.includes("solvent") ||
    lower.includes("methanol") ||
    lower.includes("ethanol") ||
    lower.includes("acetone") ||
    lower.includes("ipa") ||
    lower.includes("सॉल्वेंट")
  ) {
    return botResponses.solvents[lang];
  }
  if (
    lower.includes("reagent") ||
    lower.includes("acid") ||
    lower.includes("sodium") ||
    lower.includes("hcl") ||
    lower.includes("रिएजेंट")
  ) {
    return botResponses.reagents[lang];
  }
  if (
    lower.includes("price") ||
    lower.includes("pricing") ||
    lower.includes("cost") ||
    lower.includes("quote") ||
    lower.includes("bulk") ||
    lower.includes("मूल्य") ||
    lower.includes("कीमत")
  ) {
    return botResponses.pricing[lang];
  }
  if (
    lower.includes("purchase") ||
    lower.includes("order") ||
    lower.includes("buy") ||
    lower.includes("खरीद")
  ) {
    return botResponses.purchase[lang];
  }
  if (
    lower.includes("export") ||
    lower.includes("import") ||
    lower.includes("ship") ||
    lower.includes("country") ||
    lower.includes("global") ||
    lower.includes("निर्यात")
  ) {
    return botResponses.export[lang];
  }
  if (
    lower.includes("certif") ||
    lower.includes("gmp") ||
    lower.includes("iso") ||
    lower.includes("coa") ||
    lower.includes("msds") ||
    lower.includes("प्रमाण")
  ) {
    return botResponses.certification[lang];
  }
  if (
    lower.includes("contact") ||
    lower.includes("phone") ||
    lower.includes("email") ||
    lower.includes("address") ||
    lower.includes("call") ||
    lower.includes("संपर्क")
  ) {
    return botResponses.contact[lang];
  }
  if (
    lower.includes("minimum") ||
    lower.includes("moq") ||
    lower.includes("small order") ||
    lower.includes("न्यूनतम")
  ) {
    return botResponses.minimum[lang];
  }
  return botResponses.default[lang];
}

export default function ChatBot() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize greeting on first open
  useEffect(() => {
    if (isOpen && !initialized) {
      setMessages([
        {
          id: "greeting",
          text: t.chatbot.greeting,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setInitialized(true);
    }
  }, [isOpen, initialized, t.chatbot.greeting]);

  // Update greeting when language changes
  useEffect(() => {
    if (initialized) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === "greeting" ? { ...m, text: t.chatbot.greeting } : m,
        ),
      );
    }
  }, [t.chatbot.greeting, initialized]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]); // scroll when message count changes

  const sendMessage = (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      text,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(
      () => {
        const response = getBotResponse(text, language);
        setMessages((prev) => [
          ...prev,
          {
            id: `b-${Date.now()}`,
            text: response,
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
      },
      900 + Math.random() * 400,
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickPrompts =
    language === "en"
      ? ["APIs", "Solvents", "Pricing", "Export", "Certifications", "Contact"]
      : ["API", "सॉल्वेंट", "मूल्य", "निर्यात", "प्रमाणन", "संपर्क"];

  return (
    <div className="fixed bottom-6 right-6 z-50" data-ocid="chatbot-widget">
      {isOpen && (
        <div
          className="absolute bottom-16 right-0 w-80 md:w-96 rounded-2xl overflow-hidden shadow-glass border border-border"
          style={{
            background: "rgba(255,255,255,0.96)",
            backdropFilter: "blur(20px)",
          }}
          data-ocid="chatbot-panel"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b border-border"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.62 0.14 246) 0%, oklch(0.70 0.12 220) 100%)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <FlaskConical
                  className="w-4 h-4 text-primary-foreground"
                  strokeWidth={2.5}
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary-foreground">
                  {t.chatbot.title}
                </p>
                <p className="text-xs text-primary-foreground/70">
                  {t.chatbot.subtitle}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-smooth"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted px-4 py-3 rounded-xl rounded-bl-sm flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
                      style={{
                        animation: `chatPulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompts */}
          <div className="px-4 pb-2 flex flex-wrap gap-1.5">
            {quickPrompts.map((prompt) => (
              <button
                type="button"
                key={prompt}
                onClick={() => sendMessage(prompt)}
                className="px-2.5 py-1 rounded-full text-xs border border-primary/20 text-primary hover:bg-primary/8 transition-smooth"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 border border-input rounded-xl px-3 py-2 bg-card focus-within:border-primary/60 transition-smooth">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.chatbot.placeholder}
                className="flex-1 text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                data-ocid="chatbot-input"
              />
              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={!input.trim()}
                className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground disabled:opacity-40 hover:bg-primary/90 transition-smooth"
                aria-label="Send message"
                data-ocid="chatbot-send"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground shadow-glow flex items-center justify-center hover:bg-primary/90 hover:scale-105 active:scale-95 transition-smooth animate-pulse-glow"
        aria-label="Open Metro Chemicals chemical assistant"
        data-ocid="chatbot-toggle"
      >
        {isOpen ? (
          <ChevronDown className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      <style>{`
        @keyframes chatPulse {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
