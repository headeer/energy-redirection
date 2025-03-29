import { createContext, useContext } from "react";

// Supported languages
export type Language = "pl" | "en";

// Default language
export const defaultLanguage: Language = "pl";

// Translation keys
export type TranslationKey =
  | "appTitle"
  | "newImpulse"
  | "impulses"
  | "stats"
  | "redirectionSuggestions"
  | "saveButton"
  | "clearButton"
  | "impulseSource"
  | "impulseResult"
  | "redirectedCheckbox"
  | "pointsEarned"
  | "totalRedirections"
  | "successRate"
  | "rewards"
  | "claim"
  | "claimed"
  | "addImpulse"
  | "noImpulses"
  | "searchPlaceholder"
  | "filterAll"
  | "filterRedirected"
  | "filterNotRedirected"
  | "dateCreated"
  | "redirectToWhat"
  | "settingsTitle"
  | "themeSetting"
  | "languageSetting"
  | "lightTheme"
  | "darkTheme"
  | "polish"
  | "english";

// Translation maps
export const translations: Record<Language, Record<TranslationKey, string>> = {
  pl: {
    appTitle: "Przekierowanie Impulsów",
    newImpulse: "Nowy Impuls",
    impulses: "Impulsy",
    stats: "Statystyki",
    redirectionSuggestions: "Na co przekierować energię?",
    saveButton: "Zapisz nowy impuls",
    clearButton: "Wyczyść",
    impulseSource: "Źródło impulsu",
    impulseResult: "Rezultat jaki podjąłem",
    redirectedCheckbox: "Czy przekierowałeś impuls?",
    pointsEarned: "Zdobyte punkty",
    totalRedirections: "Całkowita liczba przekierowań",
    successRate: "Współczynnik sukcesu",
    rewards: "Nagrody",
    claim: "Odbierz",
    claimed: "Odebrano",
    addImpulse: "Dodaj impuls",
    noImpulses: "Brak impulsów. Dodaj swój pierwszy!",
    searchPlaceholder: "Wyszukaj impulsy...",
    filterAll: "Wszystkie",
    filterRedirected: "Przekierowane",
    filterNotRedirected: "Nieprzekierowane",
    dateCreated: "Data utworzenia",
    redirectToWhat: "Na co przekierować energię?",
    settingsTitle: "Ustawienia",
    themeSetting: "Motyw",
    languageSetting: "Język",
    lightTheme: "Jasny",
    darkTheme: "Ciemny",
    polish: "Polski",
    english: "Angielski",
  },
  en: {
    appTitle: "Energy Redirection",
    newImpulse: "New Impulse",
    impulses: "Impulses",
    stats: "Statistics",
    redirectionSuggestions: "What to redirect energy to?",
    saveButton: "Save new impulse",
    clearButton: "Clear",
    impulseSource: "Impulse source",
    impulseResult: "Action I took",
    redirectedCheckbox: "Did you redirect the impulse?",
    pointsEarned: "Points earned",
    totalRedirections: "Total redirections",
    successRate: "Success rate",
    rewards: "Rewards",
    claim: "Claim",
    claimed: "Claimed",
    addImpulse: "Add impulse",
    noImpulses: "No impulses. Add your first one!",
    searchPlaceholder: "Search impulses...",
    filterAll: "All",
    filterRedirected: "Redirected",
    filterNotRedirected: "Not redirected",
    dateCreated: "Date created",
    redirectToWhat: "What to redirect energy to?",
    settingsTitle: "Settings",
    themeSetting: "Theme",
    languageSetting: "Language",
    lightTheme: "Light",
    darkTheme: "Dark",
    polish: "Polish",
    english: "English",
  },
};

// Translation function
export const translateWithVars = (
  key: TranslationKey,
  lang: Language,
  variables?: Record<string, string | number>
): string => {
  const text = translations[lang][key] || key;

  if (!variables) {
    return text;
  }

  // Replace all variables in format {{variableName}}
  return Object.entries(variables).reduce(
    (result, [varName, varValue]) =>
      result.replace(new RegExp(`{{${varName}}}`, "g"), String(varValue)),
    text
  );
};

// Language context type
export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (
    key: TranslationKey,
    variables?: Record<string, string | number>
  ) => string;
}

// Initial language context
export const initialLanguageContext: LanguageContextType = {
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key) => key,
};

// Create the language context
export const LanguageContext = createContext<LanguageContextType>(
  initialLanguageContext
);

// Hook to use translations
export const useTranslation = () => {
  const { language, t } = useContext(LanguageContext);
  return { language, t };
};
