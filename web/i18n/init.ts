import i18n, { type Resource } from "i18next";
import { initReactI18next } from "react-i18next";

import enApp from "@/locales/en/app.json";
import arApp from "@/locales/ar/app.json";
import zhApp from "@/locales/zh/app.json";

export type AppLanguage = "en" | "zh" | "ar";

export function normalizeLanguage(lang: unknown): AppLanguage {
  if (!lang) return "en";
  const s = String(lang).trim().toLowerCase();
  if (s === "zh" || s === "cn" || s === "chinese") return "zh";
  if (
    s === "ar" ||
    s === "ara" ||
    s === "arabic" ||
    s === "العربية" ||
    s.startsWith("ar-") ||
    s.startsWith("ar_")
  )
    return "ar";
  return "en";
}

let _initialized = false;

export function initI18n(language?: unknown) {
  if (_initialized) return i18n;

  const resources: Resource = {
    en: { app: enApp },
    ar: { app: arApp },
    zh: { app: zhApp },
  };

  i18n.use(initReactI18next).init({
    resources,
    lng: normalizeLanguage(language),
    fallbackLng: "en",
    // Use a single default namespace to keep lookups simple.
    // We intentionally keep keySeparator disabled so keys like "Generating..." remain valid.
    defaultNS: "app",
    ns: ["app"],
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    returnEmptyString: false,
    returnNull: false,
  });

  _initialized = true;
  return i18n;
}
