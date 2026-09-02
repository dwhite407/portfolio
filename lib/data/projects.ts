export interface StackItem {
  name: string;
  category: "language" | "framework" | "infra" | "tool";
}

export interface ArchitectureStep {
  label: string;
  detail?: string;
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
  /** A simple left-to-right (or top-to-bottom on mobile) flow: client -> server -> database, etc. */
  architecture?: ArchitectureStep[];
  /** Labels for the arrows between architecture steps, e.g. "WebSocket" or "REST". One shorter than `architecture`. */
  connections?: string[];
  links?: { repo?: string; demo?: string };
}

// Each project becomes both a rendered case-study page (/projects/<slug>)
// and a node in the fake filesystem (projects/<slug>/README.md + architecture.json).
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
    timeframe: "April 2025 – October 2025",
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
    architecture: [
      { label: "React Client", detail: "renders the board, sends moves" },
      { label: "Socket.IO Server (Node.js)", detail: "validates moves, tracks turn order" },
      { label: "In-memory Game State", detail: "board + player state per room" },
    ],
    connections: ["WebSocket (Socket.IO)", "reads/writes"],
  },
  {
    slug: "traffic-simulator",
    title: "Traffic Simulator",
    summary: "A real-time C++/SFML traffic simulation with signal logic and multi-lane vehicle behavior.",
    role: "Full-stack developer",
    timeframe: "June 2025 – August 2025",
    problem:
      "Wanted to model how real intersections handle traffic — signal timing, multi-lane behavior, and collision avoidance — as a real-time simulation instead of a static diagram.",
    constraints: [
      "Needed to run smoothly in real time with continuously spawning vehicles",
      "Signals and stopping logic had to stay collision-aware across multiple synchronized intersections",
      "Multi-lane behavior needed to plausibly match U.S. traffic patterns",
    ],
    decisions: [
      "Engineered the simulation in C++ with SFML for rendering and the main loop.",
      "Modeled traffic signals as finite-state machines, with collision-aware stopping logic per lane.",
      "Used an object-oriented architecture to model vehicles and intersections as independent, synchronized entities.",
    ],
    retrospective:
      "Next step would be pathfinding/routing for individual vehicles, plus configurable intersection layouts instead of hardcoded ones.",
    stack: [
      { name: "C++", category: "language" },
      { name: "SFML", category: "framework" },
    ],
    architecture: [
      { label: "Simulation Loop", detail: "spawns vehicles, advances state each frame" },
      { label: "Traffic Signal FSM", detail: "finite-state signals, collision-aware stopping" },
      { label: "SFML Renderer", detail: "draws vehicles, lanes, and intersections" },
    ],
    connections: ["updates", "renders"],
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
    architecture: [
      { label: "Multi-screen Web UI", detail: "add / edit / view meals" },
      { label: "Express REST API", detail: "meal CRUD endpoints" },
      { label: "SQLite Database", detail: "persisted meal logs" },
    ],
    connections: ["REST (HTTP/JSON)", "SQL"],
  },
  // TODO: placeholders below — swap in real projects as you build them.
  {
    slug: "project-4",
    title: "Project Four — Replace Me",
    summary: "One-line summary of what this project is and who it's for.",
    role: "Full-stack developer",
    timeframe: "2026",
    problem:
      "Describe the problem this project solved. What was the trigger — an idea, a class assignment, a personal need?",
    constraints: [
      "Limited time alongside school/work",
      "Learning the stack while building it",
    ],
    decisions: [
      "Chose [technology/approach] because it matched what you wanted to learn.",
      "Cut [feature] from v1 to protect the timeline.",
    ],
    retrospective: "What you'd do differently: e.g. plan the data model before writing UI code.",
    stack: [
      { name: "Python", category: "language" },
      { name: "Django", category: "framework" },
      { name: "PostgreSQL", category: "infra" },
    ],
    architecture: [
      { label: "[Client]", detail: "[what the user interacts with]" },
      { label: "Django Backend", detail: "[what it does]" },
      { label: "PostgreSQL", detail: "[what's stored]" },
    ],
    connections: ["HTTP", "ORM"],
  },
  {
    slug: "project-5",
    title: "Project Five — Replace Me",
    summary: "One-line summary of what this project is and who it's for.",
    role: "Mobile developer",
    timeframe: "2026",
    problem: "Describe the problem this project solved, from the user's point of view.",
    constraints: [
      "Needed to work well on low-end devices",
      "No budget for paid infrastructure beyond a free tier",
    ],
    decisions: [
      "Chose [technology/approach] to keep the app responsive.",
      "Cached data locally to reduce network calls.",
    ],
    retrospective: "What you'd do differently: e.g. plan for offline support from day one.",
    stack: [
      { name: "Kotlin", category: "language" },
      { name: "Jetpack Compose", category: "framework" },
      { name: "SQLite", category: "infra" },
    ],
    architecture: [
      { label: "Jetpack Compose UI", detail: "[what the screens do]" },
      { label: "[Sync layer]", detail: "[what it syncs/caches]" },
      { label: "Local SQLite", detail: "[what's stored on-device]" },
    ],
    connections: ["[protocol]", "reads/writes"],
  },
  {
    slug: "project-6",
    title: "Project Six — Replace Me",
    summary: "One-line summary of what this project is and who it's for.",
    role: "Backend engineer",
    timeframe: "2027",
    problem: "Describe the problem this project solved — an inefficiency, a manual process, a bottleneck.",
    constraints: [
      "Had to stay compatible with an existing data source",
      "Team project — needed clear ownership of each piece",
    ],
    decisions: [
      "Chose [technology/approach] because it matched the team's existing skill set.",
      "Wrote a migration script instead of a big-bang cutover to de-risk rollout.",
    ],
    retrospective: "What you'd do differently: e.g. invest in monitoring/alerting sooner.",
    stack: [
      { name: "SQL", category: "language" },
      { name: "C++", category: "language" },
      { name: "Docker", category: "tool" },
    ],
    architecture: [
      { label: "[Data source]", detail: "[where data comes from]" },
      { label: "[Processing service]", detail: "[what it transforms/computes]" },
      { label: "SQL Database", detail: "[what's stored]" },
    ],
    connections: ["[protocol]", "SQL"],
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
