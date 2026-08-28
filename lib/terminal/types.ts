import type { SkillGroup } from "@/lib/data/skills";

export type OutputBlock =
  | { kind: "text"; lines: string[]; tone?: "default" | "muted" | "error" | "success" }
  | { kind: "markdown"; body: string }
  | { kind: "code"; language: string; body: string }
  | { kind: "architecture"; steps: { label: string; detail?: string }[]; connections?: string[] }
  | { kind: "skill-badges"; groups: SkillGroup[] }
  | { kind: "listing"; entries: { name: string; route: string | null; isDir: boolean }[] }
  | { kind: "clear" };

export interface CommandContext {
  cwd: string;
  args: string[];
  raw: string;
  /** Previously run commands, oldest first (doesn't yet include the command currently running). */
  history: string[];
}

export interface CommandOutcome {
  blocks: OutputBlock[];
  /** New cwd, if this command moves the "current directory" (cd, open). */
  cwd?: string;
  /** Route to push via the router, if this command should navigate the page. */
  route?: string;
}

export interface CommandDef {
  usage: string;
  description: string;
  hidden?: boolean;
  run: (ctx: CommandContext) => CommandOutcome;
}

export interface HistoryEntry {
  id: number;
  prompt: string;
  raw: string;
  blocks: OutputBlock[];
}
