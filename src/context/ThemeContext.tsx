// src/context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import type { PaletteMode, Theme } from '@mui/material';
import { getAppTheme } from '../themes/themes';

interface ThemeContextType {
  mode: PaletteMode;
  toggleTheme: () => void;
  currentTheme: Theme; // Añadimos el objeto de tema completo
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Estado para el modo del tema
  // Intenta leer la preferencia de localStorage, si no, usa 'dark' como predeterminado (por tu imagen)
  const [mode, setMode] = useState<PaletteMode>(() => {
    try {
      const storedMode = localStorage.getItem('themeMode');
      return (storedMode === 'light' || storedMode === 'dark') ? storedMode : 'dark';
    } catch (error) {
      console.error("Error al leer themeMode de localStorage:", error);
      return 'dark'; // Fallback a 'dark' si hay error en localStorage
    }
  });

  // 2. Función para alternar el tema
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // 3. Persistir el modo en localStorage cada vez que cambie
  useEffect(() => {
    try {
      localStorage.setItem('themeMode', mode);
    } catch (error) {
      console.error("Error al guardar themeMode en localStorage:", error);
    }
  }, [mode]);

  // 4. Generar el objeto de tema de Material-UI basado en el modo
  // Usamos useMemo para que el tema solo se recalcule cuando cambie el 'mode'
  const currentTheme = useMemo(() => getAppTheme(mode), [mode]);

  // 5. El valor que proveerá el contexto
  const contextValue = useMemo(() => ({
    mode,
    toggleTheme,
    currentTheme,
  }), [mode, toggleTheme, currentTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={currentTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// Hook personalizado para consumir el contexto del tema
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within an AppThemeProvider');
  }
  return context;
};