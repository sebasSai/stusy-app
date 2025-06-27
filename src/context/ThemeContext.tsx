import React, { createContext, useContext, useState, useEffect } from "react";
import { THEMES } from "./themePalettes";
import type { ThemeKey } from "./themePalettes";

type ThemeRoot = typeof THEMES[ThemeKey];
type ThemeModeObj = ThemeRoot["work"];

// ---------- TIPO DE CONTEXTO ----------
interface ThemeContextValue {
  theme: ThemeModeObj;
  mode: "work" | "break";
  currentThemeKey: ThemeKey;
  setThemeByKey: (key: ThemeKey) => void;
  setMode: (mode: "work" | "break") => void;
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

// ---------- FUNCION SEGURA SIN ANY GLOBAL ----------
function getModalBg(themeObj: ThemeRoot, theme: ThemeModeObj, fallback: string): string {
  // Si el tema raíz tiene modalBg (original, aurora)
  if ("modalBg" in themeObj && typeof themeObj["modalBg"] === "string") return themeObj["modalBg"] as string;
  // Si el modo tiene modalBg (minimalista work/break)
  if ("modalBg" in theme && typeof theme["modalBg"] === "string") return theme["modalBg"] as string;
  return fallback;
}

// ---------- PROVIDER ----------
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentThemeKey, setCurrentThemeKey] = useState<ThemeKey>("original");
  const [mode, setMode] = useState<"work" | "break">("work");

  useEffect(() => {
    const saved = localStorage.getItem("pomoflow_theme");
    if (saved && THEMES[saved as ThemeKey]) setCurrentThemeKey(saved as ThemeKey);
  }, []);

  useEffect(() => {
    localStorage.setItem("pomoflow_theme", currentThemeKey);
  }, [currentThemeKey]);

  const themeObj = THEMES[currentThemeKey];
  const theme = themeObj[mode];

  const setThemeByKey = (key: ThemeKey) => {
    if (THEMES[key]) setCurrentThemeKey(key);
  };

  const modalBg = getModalBg(themeObj, theme, THEMES.original.modalBg);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        mode,
        currentThemeKey,
        setThemeByKey,
        setMode,
        headerGradient: themeObj.headerGradient,
        modalBg,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// ---------- HOOK ----------
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext);
}
