import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        term: {
          bg: "rgb(var(--term-bg) / <alpha-value>)",
          panel: "rgb(var(--term-panel) / <alpha-value>)",
          panel2: "rgb(var(--term-panel2) / <alpha-value>)",
          border: "rgb(var(--term-border) / <alpha-value>)",
          text: "rgb(var(--term-text) / <alpha-value>)",
          muted: "rgb(var(--term-muted) / <alpha-value>)",
          accent: "rgb(var(--term-accent) / <alpha-value>)",
          accent2: "rgb(var(--term-accent2) / <alpha-value>)",
          warn: "rgb(var(--term-warn) / <alpha-value>)",
          error: "rgb(var(--term-error) / <alpha-value>)",
        },
      },
      fontFamily: {
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          '"Segoe UI"',
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
