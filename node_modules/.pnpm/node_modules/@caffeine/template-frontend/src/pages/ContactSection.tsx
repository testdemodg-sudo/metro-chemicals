import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
  const { t } = useLanguage();
  const ref = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: "", company: "", email: "", phone: "", message: "" });
  };

  const contactItems = [
    {
      icon: MapPin,
      label: "Address",
      value: "Industrial Area Phase II, Baddi, Himachal Pradesh 174102, India",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 7876355457",
    },
    {
      icon: Mail,
      label: "Email",
      value: "metro.chemicalsofficial@gmail.com",
    },
    {
      icon: Clock,
      label: "Office Hours",
      value: "Monday – Saturday: 9:00 AM – 6:00 PM IST",
    },
  ];

  const quickEnquiries = [
    "Chemical Catalogue",
    "Bulk Pricing",
    "Export Partnership",
    "Certification Docs",
    "Custom Order",
  ];

  return (
    <section id="contact" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className="animate-on-scroll text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4 uppercase tracking-widest">
            Contact
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.contact.title}
          </h2>
          <p className="text-muted-foreground text-lg">{t.contact.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="glass-card shadow-card border border-border">
              <h3 className="font-display font-bold text-lg text-foreground mb-6">
                Contact Information
              </h3>
              <div className="space-y-5">
                {contactItems.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {label}
                      </p>
                      <p className="text-sm text-foreground mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick enquiries */}
            <div className="glass-card shadow-card border border-border">
              <h4 className="font-semibold text-sm text-foreground mb-4">
                Quick Enquiries
              </h4>
              <div className="flex flex-wrap gap-2">
                {quickEnquiries.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      setForm((f) => ({
                        ...f,
                        message: `Inquiry about: ${item}`,
                      }))
                    }
                    className="px-3 py-1.5 rounded-full text-xs border border-primary/20 text-primary hover:bg-primary/8 cursor-pointer transition-smooth"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="glass-card shadow-glass border border-primary/10">
            <h3 className="font-display font-bold text-lg text-foreground mb-6">
              Send a Message
            </h3>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-display font-bold text-foreground mb-2">
                  Message Sent!
                </h4>
                <p className="text-sm text-muted-foreground">
                  Thank you for reaching out. We'll get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
          <form
  action="https://formsubmit.co/metro.chemicalsofficial@gmail.com"
  method="POST"
  className="space-y-4"
>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-medium text-muted-foreground block mb-1.5"
                    >
                      {t.contact.name} *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:border-primary/60 transition-smooth"
                      data-ocid="contact-name-input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-company"
                      className="text-xs font-medium text-muted-foreground block mb-1.5"
                    >
                      Company / Organization
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={form.company}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, company: e.target.value }))
                      }
                      className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:border-primary/60 transition-smooth"
                      data-ocid="contact-company-input"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-medium text-muted-foreground block mb-1.5"
                    >
                      {t.contact.email} *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:border-primary/60 transition-smooth"
                      data-ocid="contact-email-input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="text-xs font-medium text-muted-foreground block mb-1.5"
                    >
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:border-primary/60 transition-smooth"
                      data-ocid="contact-phone-input"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-medium text-muted-foreground block mb-1.5"
                  >
                    {t.contact.message} *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    placeholder="Tell us about your chemical requirements, quantities, or any specific certifications needed..."
                    className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:border-primary/60 transition-smooth resize-none"
                    data-ocid="contact-message-input"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 hover:shadow-glow transition-smooth flex items-center justify-center gap-2"
                  data-ocid="contact-submit"
                >
                  <Send className="w-4 h-4" />
                  {t.contact.send}
                </button><input type="hidden" name="_captcha" value="false" />
<input
  type="hidden"
  name="_subject"
  value="New Inquiry from Metro Chemicals Website"
/>

              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
