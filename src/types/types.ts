export interface ImpulseEntry {
  id: string;
  date: string;
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
