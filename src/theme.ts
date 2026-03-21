const defaultTheme = {
  colors: {
    bg: {
      primary: "#0a0a1a",
      secondary: "#12122a",
      card: "#1a1a2e",
      cardHover: "#222244",
      cardDisabled: "#111122",
    },
    accent: {
      primary: "#00d4ff",
      primaryGlow: "#00d4ff40",
      secondary: "#ff6b35",
      secondaryGlow: "#ff6b3540",
    },
    text: {
      primary: "#e0e0ff",
      secondary: "#8888aa",
      muted: "#555577",
      bright: "#ffffff",
    },
    status: {
      success: "#00ff88",
      warning: "#ffcc00",
      danger: "#ff4444",
      info: "#00d4ff",
    },
    prestige: {
      primary: "#aa77ff",
      glow: "#aa77ff40",
      bg: "#1a0a2e",
    },
    achievement: {
      locked: "#333355",
      unlocked: "#ffd700",
      glow: "#ffd70040",
    },
    golden: {
      primary: "#ffd700",
      glow: "#ffd70060",
    },
    tier: {
      common: "#aaaacc",
      uncommon: "#00cc66",
      rare: "#3399ff",
      epic: "#aa44ff",
      legendary: "#ff8800",
    },
    border: {
      subtle: "#2a2a4e",
      normal: "#3a3a5e",
      bright: "#4a4a7e",
    },
    // Legacy compat
    black: { normal: "#000", faded: "#0000000f" },
    white: {
      normal: "#fff",
      light_fade: "#ffffff20",
      lighter_fade: "#ffffff40",
    },
    grey: { light: "#efefef", normal: "#8888aa", dark: "#555577" },
    price: "#ff6b35",
    description: "#00d4ff",
    secondary: {
      normal: "#12122a",
      light: "#1a1a2e",
      lighter: "#222244",
      lightest: "#e0e0ff",
    },
    main: { normal: "#00d4ff" },
  },
  shadows: {
    card: "0 2px 8px rgba(0, 0, 0, 0.4)",
    cardHover: "0 4px 16px rgba(0, 212, 255, 0.15)",
    glow: "0 0 20px rgba(0, 212, 255, 0.3)",
    neon: "0 0 10px #00d4ff, 0 0 20px #00d4ff40",
  },
  borderRadius: {
    sm: "6px",
    md: "10px",
    lg: "16px",
    xl: "20px",
  },
  transitions: {
    fast: "0.15s ease",
    normal: "0.25s ease",
    slow: "0.4s ease",
  },
};

export type ThemeInterface = typeof defaultTheme;

export default defaultTheme;
