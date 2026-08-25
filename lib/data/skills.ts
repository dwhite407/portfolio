export interface SkillGroup {
  category: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["JavaScript", "Python", "SQL", "C++", "Kotlin", "HTML", "CSS"],
  },
  {
    category: "Frameworks & Libraries",
    items: ["React", "Node.js", "Express.js", "Socket.IO", "PyQt5", "Django", "Jetpack Compose"],
  },
  {
    category: "Databases & Tools",
    items: ["SQLite", "MySQL", "PostgreSQL", "REST APIs", "JSON"],
  },
  {
    category: "Development Software",
    items: ["Git", "Visual Studio", "Android Studio", "Figma"],
  },
];
