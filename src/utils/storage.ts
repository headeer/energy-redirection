import { ImpulseEntry } from "../types/types";

const STORAGE_KEY = "energy_redirections";

export const saveRedirections = (redirections: ImpulseEntry[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(redirections));
};

export const loadRedirections = (): ImpulseEntry[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  return [];
};

export const addRedirection = (redirection: ImpulseEntry): ImpulseEntry[] => {
  const redirections = loadRedirections();
  const newRedirections = [...redirections, redirection];
  saveRedirections(newRedirections);
  return newRedirections;
};

export const updateRedirection = (
  updatedRedirection: ImpulseEntry
): ImpulseEntry[] => {
  const redirections = loadRedirections();
  const newRedirections = redirections.map((item) =>
    item.id === updatedRedirection.id ? updatedRedirection : item
  );
  saveRedirections(newRedirections);
  return newRedirections;
};

export const getTotalRedirections = (): number => {
  return loadRedirections().length;
};
