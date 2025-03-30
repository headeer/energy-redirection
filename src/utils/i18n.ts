import { createContext, useContext } from "react";

// Supported languages
export type Language = "pl" | "en";

// Default language
export const defaultLanguage: Language = "pl";

// Translation keys
export type TranslationKey =
  | "title"
  | "newImpulse"
  | "impulsesList"
  | "stats"
  | "suggestions"
  | "impulseName"
  | "impulseStrength"
  | "impulseCategory"
  | "impulseResult"
  | "chooseCategory"
  | "addImpulse"
  | "cancel"
  | "explorer"
  | "lover"
  | "conqueror"
  | "save"
  | "complete"
  | "congratulations"
  | "redirectSuccess"
  | "today"
  | "yesterday"
  | "pastWeek"
  | "noImpulsesToday"
  | "noImpulsesYesterday"
  | "noImpulsesPastWeek"
  | "impulseRedirected"
  | "redirections"
  | "totalImpulses"
  | "settingsTitle"
  | "themeSetting"
  | "lightTheme"
  | "darkTheme"
  | "languageSetting"
  | "polish"
  | "english"
  | "editRewards"
  | "selectReward"
  | "rewardTitle"
  | "rewardDescription"
  | "rewardThreshold"
  | "saveChanges"
  | "small"
  | "medium"
  | "large"
  | "claimReward"
  | "login"
  | "logout"
  | "register"
  | "email"
  | "password"
  | "confirmPassword"
  | "displayName"
  | "forgotPassword"
  | "resetPassword"
  | "needAccount"
  | "alreadyHaveAccount"
  | "loginError"
  | "registerError"
  | "resetPasswordError"
  | "resetPasswordEmailSent"
  | "emailRequired"
  | "passwordsDoNotMatch"
  | "verifyEmail"
  | "verifyEmailSent"
  | "resendVerification"
  | "onboardingTitle"
  | "onboardingDescription"
  | "selectCategories"
  | "selectCategoriesDescription"
  | "addSuggestions"
  | "addSuggestionsDescription"
  | "reviewPresets"
  | "reviewPresetsDescription"
  | "categoryLimit"
  | "next"
  | "previous"
  | "finish"
  | "skip"
  | "welcomeBack"
  | "completeOnboarding"
  | "appTitle"
  | "impulses"
  | "redirectionSuggestions"
  | "saveButton"
  | "clearButton"
  | "impulseSource"
  | "pointsEarned"
  | "totalRedirections"
  | "claim"
  | "claimed"
  | "noImpulses"
  | "searchPlaceholder"
  | "dateCreated"
  | "redirectToWhat"
  | "form"
  | "smallReward"
  | "mediumReward"
  | "largeReward"
  | "achieved"
  | "redirectedImpulses"
  | "brainCreatingPaths"
  | "describeAction"
  | "impulseNumber"
  | "selectRewardToEdit"
  | "smallRewardTitle"
  | "mediumRewardTitle"
  | "largeRewardTitle"
  | "subcatCreativeSpark"
  | "subcatLearningDevelopment"
  | "subcatPeopleConnections"
  | "add"
  | "yourSuggestions"
  | "noSuggestionsYet"
  | "filterByCategory"
  | "allCategories"
  | "searchSuggestions"
  | "noSuggestionsFound"
  | "selectedPresets"
  | "noPresetsSelected"
  | "backToLogin"
  | "clickLinkInEmail"
  | "signInWithGoogle"
  | "rewards"
  | "subcatOutreach"
  | "subcatPhysicalActivity"
  | "subcatBusinessProgress"
  | "category"
  | "subcategory"
  | "nameYourImpulse"
  | "categoryExplorer"
  | "categoryLover"
  | "categoryAchiever"
  | "categoryHelperText"
  | "redirectionToggleTitle"
  | "redirectionCountedHint"
  | "redirectionNotCountedHint"
  | "todayImpulses"
  | "filterRedirected"
  | "filterNotRedirected"
  | "smallRewardClaimed"
  | "mediumRewardClaimed"
  | "largeRewardClaimed";

// Translation maps
export const translations: Record<Language, Record<TranslationKey, string>> = {
  pl: {
    title: "NeuroPulse",
    newImpulse: "Nowy impuls",
    impulsesList: "Lista impulsów",
    stats: "Statystyki",
    suggestions: "Sugestie przekierowania",
    impulseName: "Nazwa impulsu",
    impulseStrength: "Siła impulsu",
    impulseCategory: "Kategoria impulsu",
    impulseResult: "Rezultat przekierowania",
    chooseCategory: "Wybierz kategorię",
    addImpulse: "Dodaj impuls",
    cancel: "Anuluj",
    explorer: "Poszukiwacz",
    lover: "Kochanek",
    conqueror: "Zdobywca",
    save: "Zapisz",
    complete: "Zakończ",
    congratulations: "Gratulacje!",
    redirectSuccess: "Pomyślnie przekierowałeś impuls",
    today: "Dzisiaj",
    yesterday: "Wczoraj",
    pastWeek: "Ostatni tydzień",
    noImpulsesToday: "Brak impulsów na dzisiaj",
    noImpulsesYesterday: "Brak impulsów z wczoraj",
    noImpulsesPastWeek: "Brak impulsów z ostatniego tygodnia",
    impulseRedirected: "Impuls przekierowany",
    redirections: "Przekierowania",
    totalImpulses: "Całkowita liczba impulsów",
    settingsTitle: "Ustawienia",
    themeSetting: "Motyw aplikacji",
    lightTheme: "Jasny",
    darkTheme: "Ciemny",
    languageSetting: "Język",
    polish: "Polski",
    english: "Angielski",
    editRewards: "Edytuj nagrody",
    selectReward: "Wybierz nagrodę",
    rewardTitle: "Tytuł nagrody",
    rewardDescription: "Opis nagrody",
    rewardThreshold: "Liczba przekierowań",
    saveChanges: "Zapisz zmiany",
    small: "Mała",
    medium: "Średnia",
    large: "Duża",
    claimReward: "Odbierz nagrodę",
    login: "Zaloguj się",
    logout: "Wyloguj się",
    register: "Zarejestruj się",
    email: "Email",
    password: "Hasło",
    confirmPassword: "Potwierdź hasło",
    displayName: "Imię",
    forgotPassword: "Zapomniałeś hasła?",
    resetPassword: "Zresetuj hasło",
    needAccount: "Potrzebujesz konta?",
    alreadyHaveAccount: "Masz już konto?",
    loginError: "Błąd logowania. Sprawdź swoje dane i spróbuj ponownie.",
    registerError: "Błąd rejestracji. Spróbuj ponownie.",
    resetPasswordError: "Błąd resetowania hasła. Spróbuj ponownie.",
    resetPasswordEmailSent: "Email z resetem hasła został wysłany.",
    emailRequired: "Email jest wymagany do zresetowania hasła.",
    passwordsDoNotMatch: "Hasła nie są identyczne.",
    verifyEmail: "Zweryfikuj swój email",
    verifyEmailSent:
      "Email weryfikacyjny został wysłany. Sprawdź swoją skrzynkę.",
    resendVerification: "Wyślij ponownie",
    onboardingTitle: "Witaj w NeuroPulse",
    onboardingDescription:
      "Skonfiguruj swoje konto, aby rozpocząć przekierowywanie impulsów.",
    selectCategories: "Wybierz kategorie",
    selectCategoriesDescription:
      "Wybierz do 3 kategorii, które najbardziej odpowiadają Twoim potrzebom.",
    addSuggestions: "Dodaj własne sugestie",
    addSuggestionsDescription:
      "Dodaj własne pomysły na przekierowanie impulsów dla wybranych kategorii.",
    reviewPresets: "Przejrzyj predefiniowane sugestie",
    reviewPresetsDescription:
      "Sprawdź i wybierz sugestie, które mogą Ci pomóc.",
    categoryLimit: "Możesz wybrać maksymalnie 3 kategorie.",
    next: "Dalej",
    previous: "Wstecz",
    finish: "Zakończ",
    skip: "Pomiń",
    welcomeBack: "Witaj ponownie",
    completeOnboarding: "Dokończ konfigurację",
    appTitle: "NeuroPulse",
    impulses: "Impulsy",
    redirectionSuggestions: "Sugestie przekierowania",
    saveButton: "Zapisz nowy impuls",
    clearButton: "Wyczyść",
    impulseSource: "Źródło impulsu",
    pointsEarned: "Zdobyte punkty",
    totalRedirections: "Całkowita liczba przekierowań",
    claim: "Odbierz",
    claimed: "Odebrano",
    noImpulses: "Brak impulsów. Dodaj swój pierwszy!",
    searchPlaceholder: "Wyszukaj impulsy...",
    dateCreated: "Data utworzenia",
    redirectToWhat: "Na co przekierować energię?",
    form: "Formularz",
    smallReward: "Mała nagroda (5 przekierowań)",
    mediumReward: "Średnia nagroda (25 przekierowań)",
    largeReward: "Duża nagroda (100 przekierowań)",
    achieved: "Osiągnięto!",
    redirectedImpulses: "Przekierowane impulsy",
    brainCreatingPaths: "Twój mózg tworzy nowe ścieżki!",
    describeAction: "Opisz działanie, które podjąłeś w odpowiedzi na impuls...",
    impulseNumber: "Impuls #{{number}}",
    selectRewardToEdit: "Wybierz nagrodę do edycji",
    smallRewardTitle: "Mała nagroda",
    mediumRewardTitle: "Średnia nagroda",
    largeRewardTitle: "Duża nagroda",
    subcatCreativeSpark: "Iskra kreatywności",
    subcatLearningDevelopment: "Nauka i rozwój",
    subcatPeopleConnections: "Połączenia z ludźmi",
    add: "Dodaj",
    yourSuggestions: "Twoje sugestie",
    noSuggestionsYet: "Nie masz jeszcze żadnych sugestii.",
    filterByCategory: "Filtruj według kategorii",
    allCategories: "Wszystkie kategorie",
    searchSuggestions: "Szukaj sugestii",
    noSuggestionsFound: "Nie znaleziono sugestii.",
    selectedPresets: "Wybrane predefiniowane sugestie",
    noPresetsSelected: "Nie wybrano żadnych predefiniowanych sugestii.",
    backToLogin: "Wróć do logowania",
    clickLinkInEmail:
      "Sprawdź swoją skrzynkę email i kliknij w link weryfikacyjny, aby zakończyć rejestrację.",
    signInWithGoogle: "Zaloguj się przez Google",
    rewards: "Nagrody",
    subcatOutreach: "Kontakty zewnętrzne",
    subcatPhysicalActivity: "Aktywność fizyczna",
    subcatBusinessProgress: "Rozwój biznesu",
    category: "Kategoria",
    subcategory: "Podkategoria",
    nameYourImpulse: "Nazwij swój impuls...",
    categoryExplorer: "Poszukiwacz",
    categoryLover: "Kochanek",
    categoryAchiever: "Zdobywca",
    categoryHelperText:
      "Wybierz kategorię, która najlepiej pasuje do twojego impulsu",
    redirectionToggleTitle: "Czy przekierowałeś ten impuls?",
    redirectionCountedHint: "Ten impuls zostanie wliczony do twoich statystyk",
    redirectionNotCountedHint:
      "Ten impuls nie zostanie wliczony do twoich statystyk",
    todayImpulses: "Dzisiejsze impulsy ({{count}})",
    filterRedirected: "Przekierowany",
    filterNotRedirected: "Nieprzekierowany",
    smallRewardClaimed: "Odebrano małą nagrodę! -5 punktów",
    mediumRewardClaimed: "Odebrano średnią nagrodę! -25 punktów",
    largeRewardClaimed: "Odebrano dużą nagrodę! -100 punktów",
  },
  en: {
    title: "NeuroPulse",
    newImpulse: "New Impulse",
    impulsesList: "Impulses List",
    stats: "Statistics",
    suggestions: "Redirection Suggestions",
    impulseName: "Impulse Name",
    impulseStrength: "Impulse Strength",
    impulseCategory: "Impulse Category",
    impulseResult: "Redirection Result",
    chooseCategory: "Choose Category",
    addImpulse: "Add Impulse",
    cancel: "Cancel",
    explorer: "Explorer",
    lover: "Lover",
    conqueror: "Conqueror",
    save: "Save",
    complete: "Complete",
    congratulations: "Congratulations!",
    redirectSuccess: "You have successfully redirected an impulse",
    today: "Today",
    yesterday: "Yesterday",
    pastWeek: "Past Week",
    noImpulsesToday: "No impulses for today",
    noImpulsesYesterday: "No impulses from yesterday",
    noImpulsesPastWeek: "No impulses from the past week",
    impulseRedirected: "Impulse redirected",
    redirections: "Redirections",
    totalImpulses: "Total impulses",
    settingsTitle: "Settings",
    themeSetting: "App Theme",
    lightTheme: "Light",
    darkTheme: "Dark",
    languageSetting: "Language",
    polish: "Polish",
    english: "English",
    editRewards: "Edit Rewards",
    selectReward: "Select Reward",
    rewardTitle: "Reward Title",
    rewardDescription: "Reward Description",
    rewardThreshold: "Redirections Count",
    saveChanges: "Save Changes",
    small: "Small",
    medium: "Medium",
    large: "Large",
    claimReward: "Claim Reward",
    login: "Log In",
    logout: "Log Out",
    register: "Register",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    displayName: "Display Name",
    forgotPassword: "Forgot Password?",
    resetPassword: "Reset Password",
    needAccount: "Need an Account?",
    alreadyHaveAccount: "Already have an account?",
    loginError: "Login error. Please check your credentials and try again.",
    registerError: "Registration error. Please try again.",
    resetPasswordError: "Password reset error. Please try again.",
    resetPasswordEmailSent: "Password reset email has been sent.",
    emailRequired: "Email is required to reset your password.",
    passwordsDoNotMatch: "Passwords do not match.",
    verifyEmail: "Verify Your Email",
    verifyEmailSent:
      "Verification email has been sent. Please check your inbox.",
    resendVerification: "Resend Email",
    onboardingTitle: "Welcome to NeuroPulse",
    onboardingDescription: "Set up your account to start redirecting impulses.",
    selectCategories: "Select Categories",
    selectCategoriesDescription:
      "Choose up to 3 categories that best fit your needs.",
    addSuggestions: "Add Your Suggestions",
    addSuggestionsDescription:
      "Add your own ideas for redirecting impulses for your selected categories.",
    reviewPresets: "Review Preset Suggestions",
    reviewPresetsDescription:
      "Check and choose suggestions that might help you.",
    categoryLimit: "You can select up to 3 categories.",
    next: "Next",
    previous: "Back",
    finish: "Finish",
    skip: "Skip",
    welcomeBack: "Welcome Back",
    completeOnboarding: "Complete Setup",
    appTitle: "NeuroPulse",
    impulses: "Impulses",
    redirectionSuggestions: "Redirection Ideas",
    saveButton: "Save new impulse",
    clearButton: "Clear",
    impulseSource: "Impulse source",
    pointsEarned: "Points earned",
    totalRedirections: "Total redirections",
    claim: "Claim",
    claimed: "Claimed",
    noImpulses: "No impulses. Add your first one!",
    searchPlaceholder: "Search impulses...",
    dateCreated: "Date created",
    redirectToWhat: "What to redirect energy to?",
    form: "Form",
    smallReward: "Small reward (5 redirections)",
    mediumReward: "Medium reward (25 redirections)",
    largeReward: "Large reward (100 redirections)",
    achieved: "Achieved!",
    redirectedImpulses: "Redirected impulses",
    brainCreatingPaths: "Your brain is creating new paths!",
    describeAction:
      "Describe the action you took in response to the impulse...",
    impulseNumber: "Impulse #{{number}}",
    selectRewardToEdit: "Select Reward to Edit",
    smallRewardTitle: "Small Reward",
    mediumRewardTitle: "Medium Reward",
    largeRewardTitle: "Large Reward",
    subcatCreativeSpark: "Creative Spark",
    subcatLearningDevelopment: "Learning & Development",
    subcatPeopleConnections: "People Connections",
    add: "Add",
    yourSuggestions: "Your Suggestions",
    noSuggestionsYet: "You don't have any suggestions yet.",
    filterByCategory: "Filter by Category",
    allCategories: "All Categories",
    searchSuggestions: "Search suggestions",
    noSuggestionsFound: "No suggestions found.",
    selectedPresets: "Selected Preset Suggestions",
    noPresetsSelected: "No preset suggestions selected.",
    backToLogin: "Back to Login",
    clickLinkInEmail:
      "Check your email inbox and click on the verification link to complete your registration.",
    signInWithGoogle: "Sign in with Google",
    rewards: "Rewards",
    subcatOutreach: "Outreach",
    subcatPhysicalActivity: "Physical Activity",
    subcatBusinessProgress: "Business Progress",
    category: "Category",
    subcategory: "Subcategory",
    nameYourImpulse: "Name your impulse...",
    categoryExplorer: "Explorer",
    categoryLover: "Lover",
    categoryAchiever: "Achiever",
    categoryHelperText: "Choose the category that best fits your impulse",
    redirectionToggleTitle: "Did you redirect this impulse?",
    redirectionCountedHint: "This impulse will be counted in your statistics",
    redirectionNotCountedHint:
      "This impulse will not be counted in your statistics",
    todayImpulses: "Today's impulses ({{count}})",
    filterRedirected: "Redirected",
    filterNotRedirected: "Not redirected",
    smallRewardClaimed: "Small reward claimed! -5 points",
    mediumRewardClaimed: "Medium reward claimed! -25 points",
    largeRewardClaimed: "Large reward claimed! -100 points",
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
