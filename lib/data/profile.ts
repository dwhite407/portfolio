// The "me, but as data" file — rendered literally as JSON (me.json), not as prose.
// Keep this in sync with lib/data/about.ts / skills.ts / contact.ts, which cover
// the same facts in human-readable form.
export const profile = {
  name: "Drew White",
  role: "Full-time Student",
  company: "Indiana University",
  alsoWorking: "Warehouse Associate, NMW, Inc. (full-time)",
  mostRecentInternship: "Software Engineer Intern, Eli Lilly and Company (May–Aug 2026)",
  location: "Indianapolis, IN",
  education: [
    {
      school: "Indiana University, Luddy School of Informatics, Computing, and Engineering",
      degree: "B.S. Computer Science",
      minor: "Applied Data Science",
      gpa: 3.9,
      expectedGraduation: "2027-05",
    },
    {
      school: "Ivy Tech Community College",
      degree: "A.S. Software Development",
      honors: "Cum Laude",
      completed: "2025-08",
    },
  ],
  certificates: ["Certificate in Software Application Developer", "Technical Certificate in Software Development"],
  languages: ["JavaScript", "TypeScript", "Python", "SQL", "C++", "Kotlin", "HTML", "CSS"],
  currentlyBuilding: ["This Portfolio"],
  awards: [
    { name: "Eli Lilly Career Planning Conference Capture the Flag — 2nd Place", date: "2025-10" },
    { name: "BDPA Indianapolis Hackathon — First Place, Best Design Award", date: "2025-11" },
    { name: "Eli Lilly and Company Hackathon — Most Creative Award", date: "2026-06" },
  ],
  contact: {
    email: "drew.white087@outlook.com",
    github: "https://github.com/dwhite407",
    linkedin: "https://www.linkedin.com/in/drew-white1/",
  },
  openToWork: true,
} as const;
