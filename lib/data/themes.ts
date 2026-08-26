export interface Theme {
  id: string;
  name: string;
  publisher: string;
  description: string;
  mode: "dark" | "light";
  /** Hex swatches for the Extensions list preview — the CSS variables in globals.css are the source of truth for actual rendering. */
  preview: { accent: string; accent2: string };
}

export const DEFAULT_THEME_ID = "terminal-green-dark";

export const themes: Theme[] = [
  {
    id: "terminal-green-dark",
    name: "Terminal Green Dark",
    publisher: "portfolio",
    description: "The default. Classic green-on-black hacker terminal.",
    mode: "dark",
    preview: { accent: "#4ade80", accent2: "#60a5fa" },
  },
  {
    id: "terminal-green-light",
    name: "Terminal Green Light",
    publisher: "portfolio",
    description: "Same accent family, reworked for a light background.",
    mode: "light",
    preview: { accent: "#16a34a", accent2: "#2563eb" },
  },
  {
    id: "ocean-dark",
    name: "Ocean Dark",
    publisher: "portfolio",
    description: "Cool cyans and indigo.",
    mode: "dark",
    preview: { accent: "#22d3ee", accent2: "#818cf8" },
  },
  {
    id: "ocean-light",
    name: "Ocean Light",
    publisher: "portfolio",
    description: "Cyan and indigo, reworked for a light background.",
    mode: "light",
    preview: { accent: "#0891b2", accent2: "#4f46e5" },
  },
  {
    id: "sunset-dark",
    name: "Sunset Dark",
    publisher: "portfolio",
    description: "Warm orange and coral pink.",
    mode: "dark",
    preview: { accent: "#fb923c", accent2: "#f472b6" },
  },
  {
    id: "sunset-light",
    name: "Sunset Light",
    publisher: "portfolio",
    description: "Orange and pink, reworked for a light background.",
    mode: "light",
    preview: { accent: "#ea580c", accent2: "#db2777" },
  },
  {
    id: "nightshade-dark",
    name: "Nightshade Dark",
    publisher: "portfolio",
    description: "Violet and sky blue, moody and high-contrast.",
    mode: "dark",
    preview: { accent: "#c084fc", accent2: "#38bdf8" },
  },
  {
    id: "nightshade-light",
    name: "Nightshade Light",
    publisher: "portfolio",
    description: "Violet and sky blue, reworked for a light background.",
    mode: "light",
    preview: { accent: "#9333ea", accent2: "#0284c7" },
  },
];
