/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useContext, useState, useEffect } from "react";
import { THEMES } from "./themePalettes";
import type { ThemeKey } from "./themePalettes"; 

type ThemeMode = "work" | "break";

interface ThemeContextValue {
  theme: typeof THEMES["original"]["work"];
  mode: ThemeMode;
  currentThemeKey: ThemeKey;
  setThemeByKey: (key: ThemeKey) => void;
  setMode: (mode: ThemeMode) => void;
  headerGradient: string;
  modalBg: string;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: THEMES.original.work,
  mode: "work",
  currentThemeKey: "original",
  setThemeByKey: () => {},
  setMode: () => {},
  headerGradient: THEMES.original.headerGradient,
  modalBg: THEMES.original.modalBg,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentThemeKey, setCurrentThemeKey] = useState<ThemeKey>("original");
  const [mode, setMode] = useState<ThemeMode>("work");

  useEffect(() => {
    const saved = localStorage.getItem("pomoflow_theme");
    if (saved && THEMES[saved as ThemeKey]) {
      setCurrentThemeKey(saved as ThemeKey);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("pomoflow_theme", currentThemeKey);
  }, [currentThemeKey]);

  const themeObj = THEMES[currentThemeKey];
  const theme = themeObj[mode];

  const setThemeByKey = (key: ThemeKey) => {
    if (THEMES[key]) setCurrentThemeKey(key);
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      mode,
      currentThemeKey,
      setThemeByKey,
      setMode,
      headerGradient: themeObj.headerGradient,
      modalBg: themeObj.modalBg,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  return useContext(ThemeContext);
}
