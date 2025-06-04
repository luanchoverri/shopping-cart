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

const [mode, setMode] = useState<PaletteMode>(() => {
  try {
    const storedMode = localStorage.getItem('themeMode');
    if (storedMode === 'light' || storedMode === 'dark') {
      return storedMode;
    }
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log(systemPrefersDark)
    return systemPrefersDark ? 'dark' : 'light';
  } catch (error) {
    console.error("Error reading themeMode from localStorage:", error);
    return 'dark';
  }
});

  // Escuchar cambios en la preferencia del sistema para actualizar el tema automáticamente
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      setMode(event.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };


  useEffect(() => {
    try {
      localStorage.setItem('themeMode', mode);
    } catch (error) {
      console.error("Error al guardar themeMode en localStorage:", error);
    }
  }, [mode]);


  const currentTheme = useMemo(() => getAppTheme(mode), [mode]);


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


export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within an AppThemeProvider');
  }
  return context;
};