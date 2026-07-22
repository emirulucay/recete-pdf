import { useState, useEffect } from "react";
import { Profile, LineItem, InvoiceData } from "../types";
import { Language, Currency, TRANSLATIONS } from "../lib/i18n";
import { toast } from "sonner";

export const DEFAULT_COMPANY_LOGO = "";
export const DEFAULT_CLIENT_LOGO = "https://images.pexels.com/photos/19023561/pexels-photo-19023561.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const getInitialDate = () => {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
};

const emptyInvoiceData: InvoiceData = {
  clientName: "Müşteri Adı",
  date: getInitialDate(),
  notes: "Bizi tercih ettiğiniz için teşekkür ederiz.",
  kdvRate: 0,
};

export function useInvoiceState() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeProfileId, setActiveProfileId] = useState<string>("");
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(emptyInvoiceData);
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [language, setLanguageState] = useState<Language>("tr");
  const [currency, setCurrencyState] = useState<Currency>("TRY");

  useEffect(() => {
    // Load preferences
    const savedPrefs = localStorage.getItem("quote-preferences");
    if (savedPrefs) {
      try {
        const parsed = JSON.parse(savedPrefs);
        if (parsed.language && (parsed.language === "tr" || parsed.language === "en")) {
          setLanguageState(parsed.language);
        }
        if (parsed.currency && ["TRY", "USD", "EUR", "GBP"].includes(parsed.currency)) {
          setCurrencyState(parsed.currency);
        }
      } catch (e) {
        console.error("Failed to parse preferences", e);
      }
    }

    // Load profiles
    const savedProfiles = localStorage.getItem("invoice-profiles");
    if (savedProfiles) {
      try {
        const parsed = JSON.parse(savedProfiles);
        const validProfiles = Array.isArray(parsed) ? parsed.filter((p) => p.id !== "default") : [];
        if (validProfiles.length > 0) {
          setProfiles(validProfiles);
          setActiveProfileId(validProfiles[0].id);
        } else {
          setProfiles([]);
          setActiveProfileId("");
        }
      } catch (e) {
        console.error("Failed to parse profiles", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("invoice-profiles", JSON.stringify(profiles));
    }
  }, [profiles, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("quote-preferences", JSON.stringify({ language, currency }));
    }
  }, [language, currency, isLoaded]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
  };

  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0] || null;

  const updateProfile = (id: string, data: Partial<Profile>) => {
    setProfiles((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.tr;

  const saveAsNewProfile = (data: Partial<Profile>) => {
    const newId = crypto.randomUUID();
    const newProfile: Profile = {
      id: newId,
      profileName: data.companyName || data.profileName || `${t.newProfileTitle} (${profiles.length + 1})`,
      companyName: data.companyName || "",
      contactInfo: data.contactInfo || "",
      logoBase64: data.logoBase64 || DEFAULT_COMPANY_LOGO,
    };
    setProfiles((prev) => [...prev, newProfile]);
    setActiveProfileId(newId);
    toast.success(t.profileCreated);
  };

  const addLineItem = () => {
    setLineItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", quantity: 1, price: "" },
    ]);
  };

  const updateLineItem = (id: string, data: Partial<LineItem>) => {
    setLineItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...data } : item)));
  };

  const removeLineItem = (id: string) => {
    setLineItems((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    isLoaded,
    profiles,
    activeProfileId,
    setActiveProfileId,
    activeProfile,
    updateProfile,
    saveAsNewProfile,
    invoiceData,
    setInvoiceData,
    lineItems,
    addLineItem,
    updateLineItem,
    removeLineItem,
    language,
    setLanguage,
    currency,
    setCurrency,
    t,
  };
}
