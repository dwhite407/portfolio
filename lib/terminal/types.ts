import type { StackItem } from "@/lib/data/projects";
import type { SkillGroup } from "@/lib/data/skills";

export type OutputBlock =
  | { kind: "text"; lines: string[]; tone?: "default" | "muted" | "error" | "success" }
  | { kind: "markdown"; body: string }
  | { kind: "code"; language: string; body: string }
  | { kind: "stack-badges"; items: StackItem[] }
  | { kind: "skill-badges"; groups: SkillGroup[] }
  | { kind: "clear" };

export interface CommandContext {
  cwd: string;
  args: string[];
  raw: string;
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
