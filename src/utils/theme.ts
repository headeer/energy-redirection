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

  // Logo colors
  const purpleColor = "#6a0dad";
  const lightPurple = "#9c27b0";
  const lightBlue = "#00d4ff";
  const darkBlue = "#0288d1";

  // Updated color palette based on logo colors (purple to blue gradient)
  const palette = {
    primary: {
      main: purpleColor,
      dark: "#4a0080",
      light: lightPurple,
      ...(mode === "dark" && {
        main: lightPurple,
      }),
      contrastText: "#ffffff",
    },
    secondary: {
      main: lightBlue,
      light: "#62ebff",
      dark: darkBlue,
      contrastText: "#ffffff",
    },
    success: {
      main: "#4caf50", // Green
      light: "#80e27e",
      dark: "#087f23",
      contrastText: "#ffffff",
    },
    info: {
      main: lightBlue, // Using logo blue
      light: "#62ebff",
      dark: darkBlue,
      contrastText: "#ffffff",
    },
    warning: {
      main: "#ffb74d", // Amber
      light: "#ffe97d",
      dark: "#c88719",
      contrastText: "#ffffff",
    },
    error: {
      main: "#f44336", // Red
      light: "#ff7961",
      dark: "#ba000d",
      contrastText: "#ffffff",
    },
    background: {
      default: isLight ? "#f8f9fb" : "#121212",
      paper: isLight ? "#ffffff" : "#1e1e1e",
    },
    text: {
      primary: isLight ? "#2d3436" : "#f0f0f0",
      secondary: isLight ? "#636e72" : "#b2bec3",
    },
    divider: isLight ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.08)",
  };

  return createTheme(
    {
      palette: {
        mode,
        ...palette,
      },
      typography: {
        fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
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
        borderRadius: 16,
      },
      components: {
        MuiAppBar: {
          styleOverrides: {
            root: {
              boxShadow: isLight
                ? "0 2px 10px 0 rgba(106, 13, 173, 0.15)"
                : "0 2px 10px 0 rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(10px)",
              borderRadius: 0,
              background: `linear-gradient(135deg, ${purpleColor} 0%, ${lightBlue} 100%)`,
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 12,
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "none",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: isLight
                  ? "0 6px 16px 0 rgba(106, 13, 173, 0.25)"
                  : "0 6px 16px 0 rgba(0, 0, 0, 0.3)",
              },
              "&:active": {
                transform: "translateY(0)",
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
              background: `linear-gradient(135deg, ${purpleColor} 0%, ${lightPurple} 100%)`,
              "&:hover": {
                background: `linear-gradient(135deg, ${purpleColor} 10%, ${lightPurple} 90%)`,
              },
            },
            containedSecondary: {
              background: `linear-gradient(135deg, ${darkBlue} 0%, ${lightBlue} 100%)`,
              "&:hover": {
                background: `linear-gradient(135deg, ${darkBlue} 10%, ${lightBlue} 90%)`,
              },
            },
            outlinedPrimary: {
              borderColor: `rgba(106, 13, 173, 0.5)`,
              "&:hover": {
                borderColor: purpleColor,
                backgroundColor: "rgba(106, 13, 173, 0.04)",
              },
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: 16,
              background: isLight ? "#ffffff" : "#1e1e1e",
              transition:
                "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
              "&:hover": {
                boxShadow: isLight
                  ? "0 4px 20px 0 rgba(106, 13, 173, 0.15)"
                  : "0 4px 20px 0 rgba(0, 0, 0, 0.3)",
              },
            },
            elevation1: {
              boxShadow: isLight
                ? "0 2px 10px 0 rgba(106, 13, 173, 0.1)"
                : "0 2px 10px 0 rgba(0, 0, 0, 0.3)",
            },
            elevation3: {
              boxShadow: isLight
                ? "0 4px 20px 0 rgba(106, 13, 173, 0.15)"
                : "0 4px 20px 0 rgba(0, 0, 0, 0.3)",
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: 16,
              boxShadow: isLight
                ? "0 3px 15px 0 rgba(106, 13, 173, 0.1)"
                : "0 3px 15px 0 rgba(0, 0, 0, 0.3)",
              overflow: "hidden",
              transition:
                "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: isLight
                  ? "0 8px 25px 0 rgba(106, 13, 173, 0.2)"
                  : "0 8px 25px 0 rgba(0, 0, 0, 0.4)",
              },
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
