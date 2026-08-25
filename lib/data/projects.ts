export interface StackItem {
  name: string;
  category: "language" | "framework" | "infra" | "tool";
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  role: string;
  timeframe: string;
  problem: string;
  constraints: string[];
  decisions: string[];
  retrospective: string;
  stack: StackItem[];
  links?: { repo?: string; demo?: string };
}

// Each project becomes both a rendered case-study page (/projects/<slug>)
// and a node in the fake filesystem (projects/<slug>/README.md + stack.json).
//
// NOTE: role/timeframe/stack are pulled straight from the resume. The
// problem/constraints/decisions/retrospective prose is a best-effort writeup
// from the resume bullets — reword it to match how you'd actually describe
// these in your own voice before this goes live.
export const projects: Project[] = [
  {
    slug: "blokus-board-game",
    title: "Blokus Board Game",
    summary: "A real-time multiplayer Blokus game with server-side move validation and live client sync.",
    role: "Full-stack developer (solo)",
    timeframe: "April 2025 – Present",
    problem:
      "Wanted a lightweight, real-time way to play Blokus online with friends — one where the rules (piece legality, rotation, turn order) are enforced consistently for every player instead of trusted to each client.",
    constraints: [
      "Server needs to be the source of truth for move legality, not just the UI",
      "Real-time sync across clients without noticeable lag",
      "Piece rotation and flipping needed to feel intuitive on a grid-based board",
    ],
    decisions: [
      "Built the game server in Node.js with Socket.IO for real-time move broadcasting and turn state.",
      "Validated every placement server-side before broadcasting, so the client only ever renders legal moves.",
      "Added rotation, flipping, and placement previews in the React client to make piece manipulation clearer and more accessible.",
    ],
    retrospective:
      "Next step would be reconnect/resume support for dropped players, plus persisting game state so a session survives a server restart.",
    stack: [
      { name: "JavaScript", category: "language" },
      { name: "React", category: "framework" },
      { name: "Node.js", category: "framework" },
      { name: "Socket.IO", category: "framework" },
    ],
  },
  {
    slug: "fitness-tracker",
    title: "Fitness Tracker",
    summary: "A multi-screen calorie tracking web app with a REST API for logging and editing meals.",
    role: "Full-stack developer",
    timeframe: "June 2025 – August 2025",
    problem:
      "Wanted a simple, friendly way to log and track daily calorie intake without the bloat of a full commercial fitness app.",
    constraints: [
      "Multi-screen flow needed to stay simple and fast for daily use",
      "Team project — needed clean version control and coordinated testing",
    ],
    decisions: [
      "Built RESTful API endpoints in Express for adding, editing, and viewing meals, backed by SQLite.",
      "Kept the UI modular across screens for friendly, uncluttered navigation.",
      "Used GitHub for version control and coordinated system testing across the team.",
    ],
    retrospective:
      "Next step would be per-user auth so tracking data is scoped per person, plus a simple weekly-trends view on top of the logged meals.",
    stack: [
      { name: "JavaScript", category: "language" },
      { name: "Node.js", category: "framework" },
      { name: "Express", category: "framework" },
      { name: "SQLite", category: "infra" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectReadmeMarkdown(project: Project): string {
  const constraints = project.constraints.map((c) => `- ${c}`).join("\n");
  const decisions = project.decisions.map((d) => `- ${d}`).join("\n");
  const links = project.links
    ? Object.entries(project.links)
        .map(([label, href]) => `- [${label}](${href})`)
        .join("\n")
    : "";

  return `# ${project.title}

**Role:** ${project.role} · **Timeframe:** ${project.timeframe}

## Problem

${project.problem}

## Constraints

${constraints}

## Decisions

${decisions}

## What I'd do differently

${project.retrospective}
${links ? `\n## Links\n\n${links}\n` : ""}`;
}
