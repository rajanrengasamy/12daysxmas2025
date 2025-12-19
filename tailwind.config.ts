import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Night Sky - Globe interior backdrop
        night: {
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#0a0f1a",
        },
        // Paper Whites & Creams
        paper: {
          50: "#fefdfb",
          100: "#fdf8f0",
          200: "#f5ebe0",
          300: "#e8dcc8",
          400: "#d4c4a8",
        },
        // Burgundy - Rich Christmas red
        burgundy: {
          400: "#c2566a",
          500: "#a63d50",
          600: "#8b2942",
          700: "#6d1f33",
          800: "#4a1523",
        },
        // Forest - Deep evergreen
        forest: {
          400: "#4d7c6f",
          500: "#3d6b5e",
          600: "#2d5a4d",
          700: "#1d493c",
          800: "#143830",
        },
        // Candlelight - Warm amber glow
        candle: {
          300: "#fde68a",
          400: "#fcd34d",
          500: "#f59e0b",
          600: "#d97706",
        },
        // Copper - Metallic accent
        copper: {
          400: "#d4a574",
          500: "#c08552",
          600: "#a66b3d",
        },
        // Warm Neutrals
        warm: {
          200: "#e7e0d6",
          400: "#a39585",
          600: "#6b5c4d",
          800: "#3d342b",
          900: "#241f1a",
        },
        // Legacy aliases for compatibility
        cream: {
          50: "#fefdfb",
          100: "#fdf8f0",
          200: "#f5ebe0",
        },
        primary: {
          100: "#fce4ec",
          500: "#a63d50",
          600: "#8b2942",
          700: "#6d1f33",
        },
        secondary: {
          500: "#3d6b5e",
          600: "#2d5a4d",
        },
        gold: {
          400: "#fcd34d",
          500: "#f59e0b",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-lora)", "Georgia", "serif"],
        poem: ["var(--font-crimson)", "Georgia", "serif"],
      },
      boxShadow: {
        "paper-sm": "0 1px 2px rgba(36, 31, 26, 0.08)",
        "paper-md": "0 2px 8px rgba(36, 31, 26, 0.12), 0 1px 3px rgba(36, 31, 26, 0.08)",
        "paper-lg": "0 4px 16px rgba(36, 31, 26, 0.15), 0 2px 6px rgba(36, 31, 26, 0.1)",
        "paper-xl": "0 8px 32px rgba(36, 31, 26, 0.2), 0 4px 12px rgba(36, 31, 26, 0.12)",
        "paper-cut": "2px 4px 8px rgba(36, 31, 26, 0.25)",
        "candle-glow": "0 0 40px rgba(252, 211, 77, 0.4), 0 0 80px rgba(252, 211, 77, 0.2)",
        "candle-soft": "0 0 20px rgba(252, 211, 77, 0.25)",
        glow: "0 0 20px rgba(252, 211, 77, 0.3)",
        polaroid: "0 4px 20px rgba(0, 0, 0, 0.25)",
      },
      animation: {
        "snow-slow": "snowfall-slow 20s linear infinite",
        "snow-medium": "snowfall-medium 12s linear infinite",
        "snow-fast": "snowfall-fast 8s linear infinite",
        "float-gentle": "float-gentle 6s ease-in-out infinite",
        "paper-unfold": "paper-unfold 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "candle-flicker": "candle-flicker 3s ease-in-out infinite",
        sparkle: "sparkle 2s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
      keyframes: {
        "snowfall-slow": {
          "0%": { transform: "translateY(-10vh) translateX(0) rotate(0deg)" },
          "25%": { transform: "translateY(22vh) translateX(15px) rotate(90deg)" },
          "50%": { transform: "translateY(45vh) translateX(-10px) rotate(180deg)" },
          "75%": { transform: "translateY(68vh) translateX(20px) rotate(270deg)" },
          "100%": { transform: "translateY(100vh) translateX(0) rotate(360deg)" },
        },
        "snowfall-medium": {
          "0%": { transform: "translateY(-10vh) translateX(0)" },
          "50%": { transform: "translateY(45vh) translateX(8px)" },
          "100%": { transform: "translateY(100vh) translateX(-8px)" },
        },
        "snowfall-fast": {
          "0%": { transform: "translateY(-10vh) translateX(0)" },
          "100%": { transform: "translateY(100vh) translateX(5px)" },
        },
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(2deg)" },
        },
        "paper-unfold": {
          "0%": { transform: "rotateX(-90deg) scale(0.8)", opacity: "0" },
          "100%": { transform: "rotateX(0deg) scale(1)", opacity: "1" },
        },
        "candle-flicker": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "25%": { opacity: "0.9", transform: "scale(0.98)" },
          "50%": { opacity: "1", transform: "scale(1.02)" },
          "75%": { opacity: "0.95", transform: "scale(0.99)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(252, 211, 77, 0.25)" },
          "50%": { boxShadow: "0 0 40px rgba(252, 211, 77, 0.4), 0 0 80px rgba(252, 211, 77, 0.2)" },
        },
      },
      backgroundImage: {
        "globe-vignette": "radial-gradient(ellipse 80% 90% at 50% 50%, transparent 60%, rgba(15, 23, 42, 0.3) 80%, rgba(15, 23, 42, 0.6) 100%)",
        "paper-grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
