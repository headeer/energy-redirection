export interface ImpulseEntry {
  id: string;
  date: string;
  name: string;
  strength: number;
  redirectionCount: number;
  result: string;
  category: "Poszukiwacz" | "Kochanek" | "Zdobywca";
  completed: boolean;
  redirected: boolean;
}

export interface DailyRecord {
  date: string;
  entries: ImpulseEntry[];
}

export interface AppState {
  redirections: ImpulseEntry[];
  totalRedirections: number;
}

export interface SuggestionGroup {
  title: string;
  items: string[];
}

export interface SuggestionCategories {
  [category: string]: SuggestionGroup[];
}

export interface RewardSettings {
  small: {
    title: string;
    description: string;
    threshold: number;
  };
  medium: {
    title: string;
    description: string;
    threshold: number;
  };
  large: {
    title: string;
    description: string;
    threshold: number;
  };
}

export type RewardType = "small" | "medium" | "large";

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  emailVerified: boolean;
}

export type AuthStatus =
  | "idle"
  | "loading"
  | "authenticated"
  | "unauthenticated";

export interface UserSuggestion {
  id: string;
  category: string;
  action: string;
  isPreset: boolean;
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface OnboardingState {
  currentStep: number;
  steps: OnboardingStep[];
  selectedCategories: string[];
  personalSuggestions: UserSuggestion[];
  completed: boolean;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  selectedCategories: string[];
  personalSuggestions: UserSuggestion[];
  createdAt: string;
  lastLogin: string;
  totalRedirections: number;
  totalImpulses: number;
  rewardSettings: RewardSettings;
  onboardingCompleted: boolean;
}
