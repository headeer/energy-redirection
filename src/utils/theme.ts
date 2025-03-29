import { createContext, useContext } from "react";
import { createTheme, Theme, PaletteMode } from "@mui/material/styles";
import { plPL, enUS } from "@mui/material/locale";
import { Language } from "./i18n";

// Theme type
export type ThemeMode = "light" | "dark";

// Create the base light theme
export const createAppTheme = (
  mode: PaletteMode,
  language: Language
): Theme => {
  const isLight = mode === "light";

  // Get the correct locale
  const locale = language === "pl" ? plPL : enUS;

  return createTheme(
    {
      palette: {
        mode,
        primary: {
          main: "#5C6BC0",
          light: "#8E99F3",
          dark: "#26418F",
          contrastText: "#ffffff",
        },
        secondary: {
          main: "#EC407A",
          light: "#FF77A9",
          dark: "#B4004E",
          contrastText: "#ffffff",
        },
        success: {
          main: "#66BB6A",
          light: "#98EE99",
          dark: "#338A3E",
          contrastText: "#ffffff",
        },
        background: {
          default: isLight ? "#f5f7fa" : "#121212",
          paper: isLight ? "#ffffff" : "#1e1e1e",
        },
        text: {
          primary: isLight ? "#263238" : "#e0e0e0",
          secondary: isLight ? "#546E7A" : "#aaaaaa",
        },
        divider: isLight ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.08)",
      },
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
          fontWeight: 700,
          letterSpacing: "-0.5px",
        },
        h5: {
          fontWeight: 600,
          letterSpacing: "-0.5px",
        },
        h6: {
          fontWeight: 600,
          letterSpacing: "-0.05px",
        },
        subtitle1: {
          fontWeight: 500,
          letterSpacing: 0,
        },
        body1: {
          letterSpacing: "0.15px",
        },
        body2: {
          letterSpacing: "0.15px",
          lineHeight: 1.5,
        },
        button: {
          fontWeight: 600,
          letterSpacing: "0.4px",
        },
      },
      shape: {
        borderRadius: 12,
      },
      components: {
        MuiAppBar: {
          styleOverrides: {
            root: {
              boxShadow: isLight
                ? "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
                : "0 1px 3px 0 rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(8px)",
              borderRadius: 0,
              backgroundColor: isLight
                ? "rgba(92, 107, 192, 0.95)"
                : "rgba(38, 65, 143, 0.95)",
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "none",
              "&:hover": {
                boxShadow: isLight
                  ? "0 4px 12px 0 rgba(0, 0, 0, 0.08)"
                  : "0 4px 12px 0 rgba(0, 0, 0, 0.25)",
              },
            },
            sizeSmall: {
              padding: "6px 16px",
            },
            sizeMedium: {
              padding: "8px 20px",
            },
            sizeLarge: {
              padding: "10px 24px",
            },
            containedPrimary: {
              "&:hover": {
                backgroundColor: "#4757b8",
              },
            },
            containedSecondary: {
              "&:hover": {
                backgroundColor: "#d62e6a",
              },
            },
            outlinedPrimary: {
              borderColor: "rgba(92, 107, 192, 0.5)",
              "&:hover": {
                borderColor: "#5C6BC0",
                backgroundColor: "rgba(92, 107, 192, 0.04)",
              },
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: 12,
              background: isLight ? "#ffffff" : "#1e1e1e",
            },
            elevation1: {
              boxShadow: isLight
                ? "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
                : "0 1px 3px 0 rgba(0, 0, 0, 0.3)",
            },
            elevation3: {
              boxShadow: isLight
                ? "0 3px 8px 0 rgba(0, 0, 0, 0.1)"
                : "0 3px 8px 0 rgba(0, 0, 0, 0.3)",
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: 12,
              boxShadow: isLight
                ? "0 2px 4px 0 rgba(0, 0, 0, 0.1)"
                : "0 2px 4px 0 rgba(0, 0, 0, 0.3)",
              overflow: "hidden",
            },
          },
        },
        MuiCardContent: {
          styleOverrides: {
            root: {
              padding: 20,
              "&:last-child": {
                paddingBottom: 20,
              },
            },
          },
        },
        MuiChip: {
          styleOverrides: {
            root: {
              borderRadius: 16,
            },
            sizeSmall: {
              height: 24,
            },
          },
        },
        MuiLinearProgress: {
          styleOverrides: {
            root: {
              borderRadius: 4,
              backgroundColor: isLight
                ? "rgba(92, 107, 192, 0.12)"
                : "rgba(92, 107, 192, 0.2)",
              overflow: "hidden",
            },
          },
        },
        MuiListItem: {
          styleOverrides: {
            root: {
              borderRadius: 8,
            },
          },
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              "& .MuiOutlinedInput-root": {
                borderRadius: 8,
              },
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              borderRadius: 8,
            },
          },
        },
        MuiDialog: {
          styleOverrides: {
            paper: {
              borderRadius: 16,
            },
          },
        },
        MuiTab: {
          styleOverrides: {
            root: {
              fontWeight: 600,
              textTransform: "none",
            },
          },
        },
        MuiAccordion: {
          styleOverrides: {
            root: {
              "&:before": {
                display: "none",
              },
              boxShadow: "none",
              borderRadius: 0,
            },
          },
        },
        MuiSwitch: {
          styleOverrides: {
            root: {
              width: 42,
              height: 26,
              padding: 0,
              "& .MuiSwitch-switchBase": {
                padding: 0,
                margin: 2,
                transitionDuration: "300ms",
                "&.Mui-checked": {
                  transform: "translateX(16px)",
                  color: "#fff",
                  "& + .MuiSwitch-track": {
                    backgroundColor: "#5C6BC0",
                    opacity: 1,
                    border: 0,
                  },
                  "&.Mui-disabled + .MuiSwitch-track": {
                    opacity: 0.5,
                  },
                },
                "&.Mui-focusVisible .MuiSwitch-thumb": {
                  color: "#5C6BC0",
                  border: "6px solid #fff",
                },
                "&.Mui-disabled .MuiSwitch-thumb": {
                  color: (theme: Theme) =>
                    theme.palette.mode === "light"
                      ? theme.palette.grey[100]
                      : theme.palette.grey[600],
                },
                "&.Mui-disabled + .MuiSwitch-track": {
                  opacity: (theme: Theme) =>
                    theme.palette.mode === "light" ? 0.7 : 0.3,
                },
              },
              "& .MuiSwitch-thumb": {
                boxSizing: "border-box",
                width: 22,
                height: 22,
              },
              "& .MuiSwitch-track": {
                borderRadius: 26 / 2,
                backgroundColor: (theme: Theme) =>
                  theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
                opacity: 1,
                transition: (theme: Theme) =>
                  theme.transitions.create(["background-color"], {
                    duration: 500,
                  }),
              },
            },
          },
        },
      },
    },
    locale
  );
};

// Interface for the theme context
export interface ThemeContextType {
  themeMode: ThemeMode;
  toggleThemeMode: () => void;
}

// Initial theme context
export const initialThemeContext: ThemeContextType = {
  themeMode: "light",
  toggleThemeMode: () => {},
};

// Create the theme context
export const ThemeContext =
  createContext<ThemeContextType>(initialThemeContext);

// Hook to use the theme context
export const useAppTheme = () => useContext(ThemeContext);
