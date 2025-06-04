// src/theme.ts
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material";

const darkPalette = {
  mode: "dark",
  primary: {
    main: "#954cda",
    light: "#7b28c5",
    dark: "#3a125d",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#d81b60",
    light: "#DF487F",
    dark: "#B91753",
    contrastText: "#e2e8f0",
  },
  background: {
    default: "#121212", // Fondo global
    paper: "#121212", // Tarjetas, AppBar, etc.
  },
  text: {
    primary: "#e2e8f0",
    secondary: "#a0aec0",
  },
  divider: "#4a5568",
  error: {
    main: "#F44336",
  },
  warning: {
    main: "#ffa726",
  },
  info: {
    main: "#005683",
  },
  success: {
    main: "#00c070",
    dark: "#2d9066",
    contrastText: "#FFFFFF",
  },
};


const lightPalette = {
  primary: {
    main: "#1976d2", 
    light: "#42a5f5",
    dark: "#1565c0",
    contrastText: "#fff",
  },
  secondary: {
    main: "#9c27b0", 
    light: "#ba68c8",
    dark: "#7b1fa2",
    contrastText: "#fff",
  },
  background: {
    default: "#f9fafb", 
    paper: "#ffffff", 
  },
  text: {
    primary:"rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.6)",
  },
  divider: "rgba(0, 0, 0, 0.12)",
  error: {
    main: "#d32f2f",
  },
  warning: {
    main: "#ed6c02",
  },
  info: {
    main: "#0288d1",
  },
  success: {
    main: "#3da242",
  },
};

export const getAppTheme = (mode: PaletteMode) => {
  let theme = createTheme({
    palette: {
      mode, 
      ...(mode === "light" ? lightPalette : darkPalette),
    },
    typography: {
      fontFamily: "Poppins, Roboto, sans-serif",
      
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "1rem",
            textTransform: "none", 
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,  
            boxShadow:
              mode === "dark"
                ? "0px 4px 20px rgba(0, 0, 0, 0.4)"
                : "0px 4px 10px rgba(0, 0, 0, 0.1)",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            backgroundColor:
              mode === "dark"
                ? darkPalette.background.paper
                : lightPalette.primary.main,
          },
        },
      },

    },
  });

  theme = responsiveFontSizes(theme);

  return theme;
};
