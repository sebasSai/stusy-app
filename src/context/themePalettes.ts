// themePalettes.ts

export const THEMES = {
  original: {
    key: "original",
    name: "Original",
    headerGradient: "linear-gradient(90deg, #143759 0%, #51A8E0 100%)",
    modalBg: "linear-gradient(120deg, #f6f8feCC 60%, #eaf6fdEE 100%)",
    work: {
      primary: "#51A8E0",
      accent: "#205375",
      deepNavy: "#152642",
      input: "#FFFFFF",
      label: "#7A8FA6",
      border: "#9ED8DB",
      cardBg: "#F6F8FE",
      glow: "#51A8E0",
    },
    break: {
      primary: "#F7CF3A",
      accent: "#F08C20",
      deepNavy: "#143759",
      input: "#FFFDF3",
      label: "#AD9F5C",
      border: "#F7CF3A",
      cardBg: "#FDF8E3",
      glow: "#F7CF3A",
    }
  },
  minimalista: {
    key: "minimalista",
    name: "Minimalista",
    headerGradient: "linear-gradient(90deg, #23232A 0%, #506485 100%)",
    modalBg: "linear-gradient(120deg, #23232ACC 60%, #506485EE 100%)",
    work: {
      primary: "#506485",
      accent: "#2C3750",
      deepNavy: "#F4F6FA",
      input: "#18181B",
      label: "#B0B0B0",
      border: "#48485A",
      cardBg: "#23232A",
      glow: "#A0B3CA",
    },
    break: {
      primary: "#9DC9E2",
      accent: "#D5E9F6",
      deepNavy: "#22292F",
      input: "#FFFFFF",
      label: "#818181",
      border: "#CFCFCF",
      cardBg: "#F8F9FA",
      glow: "#E8F4FA",
    }
  }
};

// Tema neutro para transición
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

// SOLO AQUÍ exportas el type
export type ThemeKey = keyof typeof THEMES;
