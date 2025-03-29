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
  | "english"
  | "form"
  | "suggestions"
  | "smallReward"
  | "mediumReward"
  | "largeReward"
  | "achieved"
  | "claimReward"
  | "redirectedImpulses"
  | "brainCreatingPaths"
  | "yourStats"
  | "impulseName"
  | "impulseStrength"
  | "category"
  | "categoryExplorer"
  | "categoryLover"
  | "categoryAchiever"
  | "todayImpulses"
  | "nameYourImpulse"
  | "describeAction"
  | "impulseNumber"
  | "noImpulsesToday"
  | "editRewards"
  | "selectRewardToEdit"
  | "smallRewardTitle"
  | "mediumRewardTitle"
  | "largeRewardTitle"
  | "rewardTitle"
  | "rewardDescription"
  | "rewardThreshold"
  | "redirections"
  | "cancel"
  | "saveChanges"
  | "subcatCreativeSpark"
  | "subcatLearningDevelopment"
  | "subcatPeopleConnections"
  | "subcatOutreach"
  | "subcatPhysicalActivity"
  | "subcatBusinessProgress"
  | "subcategory"
  | "categoryHelperText"
  | "redirectionSuggestionsExplanation"
  | "categoryExplanationTitle"
  | "categoryExplanationPoszukiwacz"
  | "categoryExplanationKochanek"
  | "categoryExplanationZdobywca"
  | "redirectionCountedHint"
  | "redirectionNotCountedHint"
  | "redirectionToggleTitle";

// Translation maps
export const translations: Record<Language, Record<TranslationKey, string>> = {
  pl: {
    appTitle: "NeuroPulse",
    newImpulse: "Nowy Impuls",
    impulses: "Impulsy",
    stats: "Statystyki",
    redirectionSuggestions: "Sugestie przekierowania",
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
    form: "Formularz",
    suggestions: "Podpowiedzi",
    smallReward: "Mała nagroda (5 przekierowań)",
    mediumReward: "Średnia nagroda (25 przekierowań)",
    largeReward: "Duża nagroda (100 przekierowań)",
    achieved: "Osiągnięto!",
    claimReward: "Kliknij, aby odebrać nagrodę",
    redirectedImpulses: "Przekierowane impulsy",
    brainCreatingPaths: "Twój mózg tworzy nowe ścieżki!",
    yourStats: "Twoje statystyki",
    impulseName: "Nazwa impulsu",
    impulseStrength: "Siła impulsu: {{strength}}/10",
    category: "Kategoria",
    categoryExplorer: '📝 Poszukiwacz - "Iskry Kreatywności" 💡',
    categoryLover: '📝 Kochanek - "Połączenia Serca" ❤️',
    categoryAchiever: '📝 Zdobywca - "Szlak Zwycięstw" 🏆',
    todayImpulses: "Dzisiejsze impulsy ({{count}})",
    nameYourImpulse: "Podaj nazwę impulsu...",
    describeAction: "Opisz, jakie działanie podjąłeś w odpowiedzi na impuls...",
    impulseNumber: "Impuls #{{number}}",
    noImpulsesToday: "Brak impulsów na dzisiaj. Dodaj swój pierwszy impuls!",
    editRewards: "Edytuj nagrody",
    selectRewardToEdit: "Wybierz nagrodę do edycji",
    smallRewardTitle: "Mała nagroda",
    mediumRewardTitle: "Średnia nagroda",
    largeRewardTitle: "Duża nagroda",
    rewardTitle: "Tytuł nagrody",
    rewardDescription: "Opis nagrody",
    rewardThreshold: "Próg",
    redirections: "przekierowań",
    cancel: "Anuluj",
    saveChanges: "Zapisz zmiany",
    subcatCreativeSpark: "Iskra kreatywności",
    subcatLearningDevelopment: "Nauka i rozwój",
    subcatPeopleConnections: "Połączenia z ludźmi",
    subcatOutreach: "Networking",
    subcatPhysicalActivity: "Aktywność fizyczna",
    subcatBusinessProgress: "Rozwój biznesowy",
    subcategory: "Podkategoria",
    categoryHelperText:
      "Wybierz, który aspekt osobowości chcesz wzmocnić przekierowując energię impulsu. Kategoria określa, jakie podpowiedzi działań otrzymasz.",
    redirectionSuggestionsExplanation:
      "Gdy pojawia się impuls, który chcesz przekierować, wybierz kategorię i działanie z poniższych sugestii. Wybór działania z kategorii kształtuje odpowiedni aspekt Twojej osobowości.",
    categoryExplanationTitle: "Co oznacza ta kategoria?",
    categoryExplanationPoszukiwacz:
      "Wybierając Poszukiwacza, przekierujesz energię impulsu w stronę kreatywności, nauki i rozwoju osobistego. Idealne, gdy impuls pojawia się w momentach, gdy czujesz potrzebę stymulacji umysłowej.",
    categoryExplanationKochanek:
      "Wybierając Kochanka, przekierujesz energię impulsu w budowanie relacji, połączeń z ludźmi i networking. Świetny wybór, gdy impuls pojawia się, gdy czujesz się samotny lub potrzebujesz kontaktu.",
    categoryExplanationZdobywca:
      "Wybierając Zdobywcę, przekierujesz energię impulsu w aktywność fizyczną lub postęp w kierunku swoich celów. Najlepszy wybór, gdy impuls pojawia się, gdy czujesz frustrację lub chęć natychmiastowej gratyfikacji.",
    redirectionCountedHint:
      "Ten impuls zostanie uwzględniony w statystykach i punktach",
    redirectionNotCountedHint:
      "Ten impuls nie będzie liczony w statystykach i punktach",
    redirectionToggleTitle: "Czy przekierowałeś impuls na pozytywne działanie?",
  },
  en: {
    appTitle: "NeuroPulse",
    newImpulse: "New Impulse",
    impulses: "Impulses",
    stats: "Statistics",
    redirectionSuggestions: "Redirection Ideas",
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
    form: "Form",
    suggestions: "Suggestions",
    smallReward: "Small reward (5 redirections)",
    mediumReward: "Medium reward (25 redirections)",
    largeReward: "Large reward (100 redirections)",
    achieved: "Achieved!",
    claimReward: "Click to claim reward",
    redirectedImpulses: "Redirected impulses",
    brainCreatingPaths: "Your brain is creating new paths!",
    yourStats: "Your statistics",
    impulseName: "Impulse name",
    impulseStrength: "Impulse strength: {{strength}}/10",
    category: "Category",
    categoryExplorer: '📝 Explorer - "Sparks of Creativity" 💡',
    categoryLover: '📝 Lover - "Heart Connections" ❤️',
    categoryAchiever: '📝 Achiever - "Path to Victory" 🏆',
    todayImpulses: "Today's impulses ({{count}})",
    nameYourImpulse: "Name your impulse...",
    describeAction:
      "Describe the action you took in response to the impulse...",
    impulseNumber: "Impulse #{{number}}",
    noImpulsesToday: "No impulses for today. Add your first impulse!",
    editRewards: "Edit Rewards",
    selectRewardToEdit: "Select Reward to Edit",
    smallRewardTitle: "Small Reward",
    mediumRewardTitle: "Medium Reward",
    largeRewardTitle: "Large Reward",
    rewardTitle: "Reward Title",
    rewardDescription: "Reward Description",
    rewardThreshold: "Threshold",
    redirections: "redirections",
    cancel: "Cancel",
    saveChanges: "Save Changes",
    subcatCreativeSpark: "Creative Spark",
    subcatLearningDevelopment: "Learning & Development",
    subcatPeopleConnections: "People Connections",
    subcatOutreach: "Networking & Outreach",
    subcatPhysicalActivity: "Physical Activity",
    subcatBusinessProgress: "Business Progress",
    subcategory: "Subcategory",
    categoryHelperText:
      "Choose which aspect of your personality you want to strengthen by redirecting the impulse's energy. The category determines what action suggestions you'll receive.",
    redirectionSuggestionsExplanation:
      "When an impulse appears that you want to redirect, choose a category and action from the suggestions below. Choosing an action from a category shapes the corresponding aspect of your personality.",
    categoryExplanationTitle: "What does this category mean?",
    categoryExplanationPoszukiwacz:
      "By choosing Explorer, you'll redirect the impulse energy toward creativity, learning, and personal growth. Perfect when the impulse appears during moments when you feel the need for mental stimulation.",
    categoryExplanationKochanek:
      "By choosing Lover, you'll redirect the impulse energy into building relationships, connections with people, and networking. Great choice when the impulse appears when you feel lonely or need connection.",
    categoryExplanationZdobywca:
      "By choosing Achiever, you'll redirect the impulse energy into physical activity or progress toward your goals. Best choice when the impulse appears when you feel frustrated or want immediate gratification.",
    redirectionCountedHint:
      "This impulse will be counted in your statistics and points",
    redirectionNotCountedHint:
      "This impulse will not be counted in your statistics or points",
    redirectionToggleTitle:
      "Did you redirect the impulse to a positive action?",
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
  const { language, t, setLanguage } = useContext(LanguageContext);
  return { language, t, setLanguage };
};
