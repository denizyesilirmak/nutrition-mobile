const MAIN_COLORS = {
  PRIMARY: "#FF6B6B",
  SECONDARY: "#FFD166",
  TERTIARY: "#06D6A0",
  QUATERNARY: "#118AB2",
  QUINARY: "#073B4C",
};

const TEXT_COLORS = {
  PRIMARY: "#e24a4a",
  SECONDARY: "#000000",
  TERTIARY: "#333",
  QUATERNARY: "#666",
};

const BACKGROUND_COLORS = {
  PRIMARY: "#FFF",
  SECONDARY: "#F2F2F2",
  TERTIARY: "#E5E5E5",
  QUATERNARY: "#D9D9D9",
};

const STATUS_COLORS = {
  SUCCESS: "#06D6A0",
  ERROR: "#FF6B6B",
  WARNING: "#FFD166",
  INFO: "#118AB2",
};

const COLORS = {
  main: MAIN_COLORS,
  text: TEXT_COLORS,
  background: BACKGROUND_COLORS,
  status: STATUS_COLORS,
};

export const LightTheme = {
  dark: false,
  colors: {
    primary: "#84cc16",
    background: "rgb(255, 255, 255)",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(216, 216, 216)",
    notification: "rgb(255, 59, 48)",
  },
};

export const DarkTheme = {
  dark: true,
  colors: {
    primary: "#22c55e",
    background: "rgb(1, 1, 1)",
    card: "rgb(18, 18, 18)",
    text: "rgb(229, 229, 231)",
    border: "rgb(39, 39, 41)",
    notification: "rgb(255, 69, 58)",
  },
};

export default COLORS;
