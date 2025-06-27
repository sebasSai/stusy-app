// themePalettes.ts

export const THEMES = {
  original: {
    key: "original",
    name: "Original",
    headerGradient: "linear-gradient(90deg, #144AE8 0%, #8DE3FC 100%)",
    modalBg: "linear-gradient(120deg, #EAF6FECC 60%, #D8EDFFEE 100%)",
    work: {
      primary: "#258AFF",
      accent: "#1452A3",
      deepNavy: "#183C58",
      input: "#FFFFFF",
      label: "#4988C7",
      border: "#98CDF5",
      cardBg: "#F4F9FF",
      glow: "#8FD1F9",
    },
    break: {
      primary: "#FF4598",
      accent: "#C73E7B",
      deepNavy: "#45133B",
      input: "#FFF2F9",
      label: "#C990A9",
      border: "#FF8AC9",
      cardBg: "#FFF3FA",
      glow: "#FF8AD7",
    }
  },

  minimalista: {
    key: "minimalista",
    name: "Minimalista",
    headerGradient: "linear-gradient(90deg, #222725 0%, #86B49B 100%)",
    modalBg: "linear-gradient(120deg, #262B28ee 60%, #393E36ee 100%)", // FONDO MODAL OSCURO
    work: {
      primary: "#222725",
      accent: "#86B49B",
      deepNavy: "#FFFFFF",
      input: "#F0F3EF",
      label: "#B2C8BA",
      border: "#36413E",
      cardBg: "#262B28",
      glow: "#86B49B",
    },
    break: {
      primary: "#FAFDF6",
      accent: "#86B49B",
      deepNavy: "#111111",
      input: "#FFFFFF",
      label: "#4E5E55",
      border: "#B5D6C6",
      cardBg: "#FFFFFF",
      glow: "#D6EBDD",
    }
  },

  aurora: {
    key: "aurora",
    name: "Aurora",
    headerGradient: "linear-gradient(90deg, #4F8A8B 0%, #5B5F97 100%)",
    modalBg: "linear-gradient(120deg, #E2F6CA 70%, #B6E1F5EE 100%)",
    work: {
      primary: "#5B5F97",
      accent: "#4F8A8B",
      deepNavy: "#202034",
      input: "#F8F8FA",
      label: "#A8ADB5",
      border: "#93B5C6",
      cardBg: "#E2F6CA",
      glow: "#8ED6FF",
    },
    break: {
      primary: "#FFC145",
      accent: "#FF6F91",
      deepNavy: "#A26EA1",
      input: "#FFF7E0",
      label: "#FFBFA3",
      border: "#FFD6A5",
      cardBg: "#FCEFF9",
      glow: "#FFC145",
    }
  },
};

// El tipo debe ir después de THEMES
export type ThemeKey = keyof typeof THEMES;

// Orden para el selector de temas
export const THEMES_ORDER: ThemeKey[] = ["original", "minimalista", "aurora"];

// Tema neutro para transición visual
export const NEUTRAL_THEME = {
  primary: "#7C7C8A",
  accent: "#D9DBDF",
  deepNavy: "#2D2D38",
  input: "#F6F6F9",
  label: "#999AA6",
  border: "#C0C1CB",
  cardBg: "#EBEBF3",
  glow: "#B8B8CF",
};
