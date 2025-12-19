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
        // Primary - Warm Reds
        primary: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          500: "#B91C1C",
          600: "#991B1B",
          700: "#7F1D1D",
        },
        // Secondary - Forest Greens
        secondary: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          500: "#166534",
          600: "#15803D",
          700: "#14532D",
        },
        // Neutral - Warm Creams
        cream: {
          50: "#FFFBF5",
          100: "#FFF7ED",
          200: "#FFEDD5",
        },
        // Neutral - Warm Browns
        warm: {
          400: "#A8A29E",
          600: "#78716C",
          800: "#44403C",
        },
        // Accent - Gold
        gold: {
          400: "#FACC15",
          500: "#EAB308",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        poem: ["var(--font-crimson)", "Georgia", "serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(250, 204, 21, 0.3)",
        polaroid: "0 4px 20px rgba(0, 0, 0, 0.25)",
      },
      animation: {
        "snow-fall": "snowfall 10s linear infinite",
        sparkle: "sparkle 2s ease-in-out infinite",
      },
      keyframes: {
        snowfall: {
          "0%": { transform: "translateY(-10vh)" },
          "100%": { transform: "translateY(100vh)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
