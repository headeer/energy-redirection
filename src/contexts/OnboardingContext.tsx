import React, { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  OnboardingState,
  OnboardingStep,
  UserSuggestion,
} from "../types/types";

// Initial steps for the onboarding process
const initialSteps: OnboardingStep[] = [
  {
    id: uuidv4(),
    title: "Wybierz kategorie",
    description:
      "Wybierz do 3 kategorii, które najbardziej odpowiadają Twoim potrzebom",
    completed: false,
  },
  {
    id: uuidv4(),
    title: "Dodaj własne sugestie",
    description:
      "Dodaj własne pomysły na przekierowanie impulsów dla wybranych kategorii",
    completed: false,
  },
  {
    id: uuidv4(),
    title: "Przejrzyj predefiniowane sugestie",
    description: "Sprawdź i wybierz sugestie, które mogą Ci pomóc",
    completed: false,
  },
];

const initialState: OnboardingState = {
  currentStep: 0,
  steps: initialSteps,
  selectedCategories: [],
  personalSuggestions: [],
  completed: false,
};

interface OnboardingContextType {
  state: OnboardingState;
  nextStep: () => void;
  previousStep: () => void;
  setStepCompleted: (stepIndex: number, completed: boolean) => void;
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
  addSuggestion: (suggestion: UserSuggestion) => void;
  removeSuggestion: (suggestionId: string) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};

interface OnboardingProviderProps {
  children: ReactNode;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState<OnboardingState>(initialState);

  const nextStep = () => {
    if (state.currentStep < state.steps.length - 1) {
      setState((prev: OnboardingState) => ({
        ...prev,
        currentStep: prev.currentStep + 1,
      }));
    }
  };

  const previousStep = () => {
    if (state.currentStep > 0) {
      setState((prev: OnboardingState) => ({
        ...prev,
        currentStep: prev.currentStep - 1,
      }));
    }
  };

  const setStepCompleted = (stepIndex: number, completed: boolean) => {
    if (stepIndex >= 0 && stepIndex < state.steps.length) {
      setState((prev: OnboardingState) => {
        const updatedSteps = [...prev.steps];
        updatedSteps[stepIndex] = {
          ...updatedSteps[stepIndex],
          completed,
        };
        return {
          ...prev,
          steps: updatedSteps,
        };
      });
    }
  };

  const addCategory = (category: string) => {
    if (
      state.selectedCategories.length < 3 &&
      !state.selectedCategories.includes(category)
    ) {
      setState((prev: OnboardingState) => ({
        ...prev,
        selectedCategories: [...prev.selectedCategories, category],
      }));
    }
  };

  const removeCategory = (category: string) => {
    setState((prev: OnboardingState) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.filter(
        (c: string) => c !== category
      ),
    }));
  };

  const addSuggestion = (suggestion: UserSuggestion) => {
    setState((prev: OnboardingState) => ({
      ...prev,
      personalSuggestions: [...prev.personalSuggestions, suggestion],
    }));
  };

  const removeSuggestion = (suggestionId: string) => {
    setState((prev: OnboardingState) => ({
      ...prev,
      personalSuggestions: prev.personalSuggestions.filter(
        (s: UserSuggestion) => s.id !== suggestionId
      ),
    }));
  };

  const completeOnboarding = () => {
    setState((prev: OnboardingState) => ({
      ...prev,
      completed: true,
    }));
  };

  const resetOnboarding = () => {
    setState(initialState);
  };

  return (
    <OnboardingContext.Provider
      value={{
        state,
        nextStep,
        previousStep,
        setStepCompleted,
        addCategory,
        removeCategory,
        addSuggestion,
        removeSuggestion,
        completeOnboarding,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
