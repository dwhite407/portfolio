import { getDir, resolveFsPath } from "@/lib/fs/helpers";
import { visibleCommandNames } from "./commands";

const PATH_COMMANDS = new Set(["ls", "cd", "cat", "open"]);

/**
 * Returns completion candidates for the current raw input.
 * Replaces the *last token* of the input; callers splice it back in.
 */
export function getCompletions(input: string, cwd: string): string[] {
  const endsWithSpace = /\s$/.test(input);
  const tokens = input.split(/\s+/).filter(Boolean);

  const completingFirstToken = tokens.length === 0 || (tokens.length === 1 && !endsWithSpace);

  if (completingFirstToken) {
    const partial = tokens[0] ?? "";
    return visibleCommandNames().filter((name) => name.startsWith(partial)).sort();
  }

  const commandName = tokens[0];
  if (!PATH_COMMANDS.has(commandName)) return [];

  const partial = endsWithSpace ? "" : tokens[tokens.length - 1];
  const slashIndex = partial.lastIndexOf("/");
  const dirPart = slashIndex >= 0 ? partial.slice(0, slashIndex + 1) : "";
  const namePrefix = slashIndex >= 0 ? partial.slice(slashIndex + 1) : partial;

  const baseDirPath = commandName === "open" ? "/projects" : resolveFsPath(cwd, dirPart || ".");
  const dir = getDir(baseDirPath);
  if (!dir) return [];

  return dir.children
    .filter((c) => c.name.startsWith(namePrefix))
    .map((c) => dirPart + c.name + (c.type === "dir" ? "/" : ""))
    .sort();
}

/** Replace the last token of `input` with `replacement`. */
export function applyCompletion(input: string, replacement: string): string {
  const endsWithSpace = /\s$/.test(input);
  const tokens = input.split(/\s+/).filter(Boolean);
  if (endsWithSpace || tokens.length === 0) {
    return [...tokens, replacement].join(" ");
  }
  tokens[tokens.length - 1] = replacement;
  return tokens.join(" ");
}
