// src/theme.ts
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material";

// Define los colores para el tema oscuro basándonos en tu imagen
const darkPalette = {
  mode: "dark",
  primary: {
    main: "hsl(271, 65.70%, 57.60%)", // Morado secundario estándar
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

// Para el tema claro, simplemente definimos 'mode: "light"'
// y Material-UI usará sus colores por defecto, incluyendo el azul primario estándar.
const lightPalette = {
  primary: {
    main: "#1976d2", // Azul primario estándar de Material-UI
    light: "#42a5f5",
    dark: "#1565c0",
    contrastText: "#fff",
  },
  secondary: {
    main: "#9c27b0", // Morado secundario estándar
    light: "#ba68c8",
    dark: "#7b1fa2",
    contrastText: "#fff",
  },
  background: {
    default: "#f9fafb", // Fondo claro por defecto
    paper: "#ffffff", // Fondo blanco para Card, Paper, etc.
  },
  text: {
    primary: "rgba(0, 0, 0, 0.87)", // Texto oscuro estándar
    secondary: "rgba(0, 0, 0, 0.6)", // Texto secundario más claro
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

// Función para crear el tema completo, incluyendo tipografía y componentes
export const getAppTheme = (mode: PaletteMode) => {
  let theme = createTheme({
    palette: {
      mode, // 'light' o 'dark'
      ...(mode === "light" ? lightPalette : darkPalette),
    },
    typography: {
      fontFamily: "Poppins, Roboto, sans-serif", // Asegúrate de que esta fuente esté importada en tu CSS global o HTML
      // Puedes añadir más estilos de tipografía aquí
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "1rem", // Bordes redondeados para botones
            textTransform: "none", // Quita el uppercase por defecto
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12, // Bordes más redondeados para Cards
            // Sombra condicional para que el card se destaque más en el tema oscuro
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

            // Color de AppBar: el main de la paleta correspondiente
            backgroundColor:
              mode === "dark"
                ? darkPalette.background.paper
                : lightPalette.primary.main,
          },
        },
      },
      // Puedes añadir más overrides para otros componentes aquí
    },
  });

  // Esto hace que los tamaños de fuente sean responsivos automáticamente
  theme = responsiveFontSizes(theme);

  return theme;
};
