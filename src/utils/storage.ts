import { ImpulseEntry } from "../types/types";

interface StoredData {
  redirections: ImpulseEntry[];
  totalRedirections: number;
}

// Load redirections from local storage
export const loadRedirections = (userId: string): StoredData => {
  try {
    const serializedData = localStorage.getItem(`redirections_${userId}`);
    if (serializedData === null) {
      // Return default empty data structure if nothing is found
      return { redirections: [], totalRedirections: 0 };
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Error loading redirections:", error);
    return { redirections: [], totalRedirections: 0 };
  }
};

// Save redirections to local storage
export const saveRedirections = (userId: string, data: StoredData): void => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(`redirections_${userId}`, serializedData);
  } catch (error) {
    console.error("Error saving redirections:", error);
  }
};

// Add a new redirection
export const addRedirection = (
  userId: string,
  redirection: ImpulseEntry
): ImpulseEntry[] => {
  try {
    const data = loadRedirections(userId);
    const newRedirections = [...data.redirections, redirection];

    saveRedirections(userId, {
      redirections: newRedirections,
      totalRedirections:
        data.totalRedirections + (redirection.redirected ? 1 : 0),
    });

    return newRedirections;
  } catch (error) {
    console.error("Error adding redirection:", error);
    return [];
  }
};

// Update an existing redirection
export const updateRedirection = (
  userId: string,
  updatedRedirection: ImpulseEntry
): ImpulseEntry[] => {
  const data = loadRedirections(userId);
  const newRedirections = data.redirections.map((item) =>
    item.id === updatedRedirection.id ? updatedRedirection : item
  );

  saveRedirections(userId, {
    redirections: newRedirections,
    totalRedirections: data.totalRedirections,
  });

  return newRedirections;
};

// Get total redirections count
export const getTotalRedirections = (userId: string): number => {
  const data = loadRedirections(userId);
  return data.totalRedirections;
};

// Get today's redirections (only include redirected ones)
export const getTodaysRedirections = (userId: string): ImpulseEntry[] => {
  const data = loadRedirections(userId);
  const today = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD

  return data.redirections.filter(
    (redirection) => redirection.date === today && redirection.redirected
  );
};
