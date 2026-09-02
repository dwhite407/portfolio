export interface SkillGroup {
  category: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "SQL", "C++", "Kotlin", "HTML", "CSS"],
  },
  {
    category: "Frameworks & Libraries",
    items: ["React", "Node.js", "Express.js", "Socket.IO", "PyQt5", "Django", "Jetpack Compose"],
  },
  {
    category: "Databases & Tools",
    items: ["SQLite", "MySQL", "PostgreSQL", "REST APIs", "JSON", "ESLint", "PostCSS"],
  },
  {
    category: "Development Software",
    items: ["Git", "GitHub", "Visual Studio", "Android Studio", "Figma", "Vercel"],
  },
];
