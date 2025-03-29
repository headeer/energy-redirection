import { createTheme } from "@mui/material/styles";
import { plPL } from "@mui/material/locale";

const theme = createTheme(
  {
    palette: {
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
        default: "#f5f7fa",
        paper: "#ffffff",
      },
      text: {
        primary: "#263238",
        secondary: "#546E7A",
      },
      divider: "rgba(0, 0, 0, 0.08)",
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
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(8px)",
            borderRadius: 0,
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
              boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.08)",
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
          },
          elevation1: {
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
          },
          elevation3: {
            boxShadow: "0 3px 8px 0 rgba(0, 0, 0, 0.1)",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
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
            backgroundColor: "rgba(92, 107, 192, 0.12)",
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
    },
  },
  plPL
);

export default theme;
