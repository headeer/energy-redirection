import React, { useState, useEffect, useMemo, ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeMode, ThemeContext, createAppTheme } from "../utils/theme";
import {
  LanguageContext,
  Language,
  defaultLanguage,
  translateWithVars,
  TranslationKey,
} from "../utils/i18n";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  // Get stored preferences or use defaults
  const getInitialThemeMode = (): ThemeMode => {
    const storedTheme = localStorage.getItem("themeMode");
    if (storedTheme && (storedTheme === "light" || storedTheme === "dark")) {
      return storedTheme;
    }
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const getInitialLanguage = (): Language => {
    const storedLanguage = localStorage.getItem("language");
    if (
      storedLanguage &&
      (storedLanguage === "pl" || storedLanguage === "en")
    ) {
      return storedLanguage as Language;
    }
    const browserLanguage = navigator.language.split("-")[0];
    return browserLanguage === "pl" ? "pl" : "en";
  };

  // State for theme and language
  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialThemeMode);
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("themeMode")) {
        setThemeMode(e.matches ? "dark" : "light");
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  // Theme context value
  const themeContextValue = useMemo(
    () => ({
      themeMode,
      toggleThemeMode: () => {
        const newMode = themeMode === "light" ? "dark" : "light";
        setThemeMode(newMode);
        localStorage.setItem("themeMode", newMode);
      },
    }),
    [themeMode]
  );

  // Language context value
  const languageContextValue = useMemo(
    () => ({
      language,
      setLanguage: (newLanguage: Language) => {
        setLanguage(newLanguage);
        localStorage.setItem("language", newLanguage);
      },
      t: (key: TranslationKey, variables?: Record<string, string | number>) =>
        translateWithVars(key, language, variables),
    }),
    [language]
  );

  // Create the theme based on current mode and language
  const theme = useMemo(
    () => createAppTheme(themeMode, language),
    [themeMode, language]
  );

  return (
    <LanguageContext.Provider value={languageContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
};
