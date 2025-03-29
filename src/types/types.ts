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
