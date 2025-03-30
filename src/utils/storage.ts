import { ImpulseEntry, RewardSettings } from "../types/types";

interface StoredData {
  redirections: ImpulseEntry[];
  totalRedirections: number;
  rewardSettings: RewardSettings;
  selectedCategory: "Poszukiwacz" | "Kochanek" | "Zdobywca";
}

// Load all app data from local storage
export const loadAppData = (userId: string): StoredData => {
  try {
    const serializedData = localStorage.getItem(`appData_${userId}`);
    if (serializedData === null) {
      // Return default empty data structure if nothing is found
      return {
        redirections: [],
        totalRedirections: 0,
        rewardSettings: {
          small: {
            title: "Small reward",
            description: "5 redirections",
            threshold: 5,
          },
          medium: {
            title: "Medium reward",
            description: "25 redirections",
            threshold: 25,
          },
          large: {
            title: "Large reward",
            description: "100 redirections",
            threshold: 100,
          },
        },
        selectedCategory: "Poszukiwacz",
      };
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Error loading app data:", error);
    return {
      redirections: [],
      totalRedirections: 0,
      rewardSettings: {
        small: {
          title: "Small reward",
          description: "5 redirections",
          threshold: 5,
        },
        medium: {
          title: "Medium reward",
          description: "25 redirections",
          threshold: 25,
        },
        large: {
          title: "Large reward",
          description: "100 redirections",
          threshold: 100,
        },
      },
      selectedCategory: "Poszukiwacz",
    };
  }
};

// Save all app data to local storage
export const saveAppData = (userId: string, data: StoredData): void => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(`appData_${userId}`, serializedData);
  } catch (error) {
    console.error("Error saving app data:", error);
  }
};

// Add a new redirection
export const addRedirection = (
  userId: string,
  redirection: ImpulseEntry
): ImpulseEntry[] => {
  try {
    const data = loadAppData(userId);
    const newRedirections = [...data.redirections, redirection];

    saveAppData(userId, {
      ...data,
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
  const data = loadAppData(userId);
  const newRedirections = data.redirections.map((item) =>
    item.id === updatedRedirection.id ? updatedRedirection : item
  );

  saveAppData(userId, {
    ...data,
    redirections: newRedirections,
  });

  return newRedirections;
};

// Get total redirections count
export const getTotalRedirections = (userId: string): number => {
  const data = loadAppData(userId);
  return data.totalRedirections;
};

// Get today's redirections (only include redirected ones)
export const getTodaysRedirections = (userId: string): ImpulseEntry[] => {
  const data = loadAppData(userId);
  const today = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD

  return data.redirections.filter(
    (redirection) => redirection.date === today && redirection.redirected
  );
};

// Update reward settings
export const updateRewardSettings = (
  userId: string,
  rewardSettings: RewardSettings
): void => {
  const data = loadAppData(userId);
  saveAppData(userId, {
    ...data,
    rewardSettings,
  });
};

// Update selected category
export const updateSelectedCategory = (
  userId: string,
  category: "Poszukiwacz" | "Kochanek" | "Zdobywca"
): void => {
  const data = loadAppData(userId);
  saveAppData(userId, {
    ...data,
    selectedCategory: category,
  });
};
