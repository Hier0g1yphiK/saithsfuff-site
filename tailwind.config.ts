import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Soft pastel pinks
        pink: {
          50: "#fff0f6",
          100: "#ffdeeb",
          200: "#fcc2d7",
          300: "#faa2c1",
          400: "#f783ac",
          500: "#f06595",
          600: "#e64980",
          700: "#d6336c",
          800: "#c2255c",
          900: "#a61e4d",
        },
        // Soft lavender/purple
        lavender: {
          50: "#f8f0fc",
          100: "#f3d9fa",
          200: "#eebefa",
          300: "#e599f7",
          400: "#da77f2",
          500: "#cc5de8",
          600: "#be4bdb",
          700: "#ae3ec9",
          800: "#9c36b5",
          900: "#862e9c",
        },
        // Soft mint/green
        mint: {
          50: "#e6fcf5",
          100: "#c3fae8",
          200: "#96f2d7",
          300: "#63e6be",
          400: "#38d9a9",
          500: "#20c997",
          600: "#12b886",
          700: "#0ca678",
          800: "#099268",
          900: "#087f5b",
        },
        // Cream/warm white for backgrounds
        cream: {
          50: "#fffbf7",
          100: "#fff5ed",
          200: "#ffedd5",
        },
        // Dark text colors that meet WCAG 4.5:1 on pastel backgrounds
        "text-dark": "#2d1b4e",
        "text-body": "#3d2b5a",
        "text-muted": "#5c4478",
      },
      borderRadius: {
        card: "12px",
        container: "16px",
        pill: "9999px",
      },
      fontFamily: {
        display: ["var(--font-fredoka)", "Fredoka", "sans-serif"],
        body: ["var(--font-nunito)", "Nunito", "sans-serif"],
      },
      boxShadow: {
        whimsical: "0 4px 14px 0 rgba(204, 93, 232, 0.08)",
        "whimsical-lg": "0 8px 24px 0 rgba(204, 93, 232, 0.12)",
        glow: "0 0 20px rgba(250, 162, 193, 0.3)",
      },
      backgroundImage: {
        "gradient-whimsical":
          "linear-gradient(135deg, #fff0f6 0%, #f8f0fc 50%, #e6fcf5 100%)",
        "gradient-hero":
          "linear-gradient(180deg, #fff0f6 0%, #f3d9fa 40%, #c3fae8 100%)",
        "gradient-card":
          "linear-gradient(135deg, #ffffff 0%, #fff0f6 50%, #f8f0fc 100%)",
      },
      animation: {
        sparkle: "sparkle 2s ease-in-out infinite",
        "float-slow": "float 6s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
      },
      keyframes: {
        sparkle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".decorative-stars": {
          position: "relative",
          "&::before": {
            content: "'✦'",
            position: "absolute",
            top: "-8px",
            right: "-8px",
            fontSize: "14px",
            color: "#faa2c1",
            animation: "twinkle 3s ease-in-out infinite",
          },
          "&::after": {
            content: "'✧'",
            position: "absolute",
            bottom: "-8px",
            left: "-8px",
            fontSize: "12px",
            color: "#e599f7",
            animation: "twinkle 3s ease-in-out infinite 1s",
          },
        },
        ".decorative-sparkle": {
          position: "relative",
          "&::before": {
            content: "'✨'",
            position: "absolute",
            top: "-12px",
            right: "-12px",
            fontSize: "16px",
            animation: "sparkle 2s ease-in-out infinite",
          },
        },
        ".glass-card": {
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 240, 246, 0.5)",
        },
      });
    }),
  ],
};

export default config;
