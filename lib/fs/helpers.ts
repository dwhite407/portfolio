import { root } from "./tree";
import type { FsDirNode, FsNode } from "./types";

/** Resolve a user-typed path (absolute, relative, `~`, `..`, `.`) against a cwd into an absolute fs path. */
export function resolveFsPath(cwd: string, input: string): string {
  if (!input || input === "~") return "/";

  const isAbsolute = input.startsWith("/") || input.startsWith("~");
  const base = isAbsolute ? "/" : cwd;
  const rel = input.replace(/^~/, "").replace(/^\/+/, "");

  const segments = base === "/" ? [] : base.split("/").filter(Boolean);

  for (const part of rel.split("/").filter(Boolean)) {
    if (part === ".") continue;
    else if (part === "..") segments.pop();
    else segments.push(part);
  }

  return "/" + segments.join("/");
}

export function getNode(path: string): FsNode | undefined {
  if (path === "/") return root;
  const segments = path.split("/").filter(Boolean);
  let current: FsNode = root;
  for (const segment of segments) {
    if (current.type !== "dir") return undefined;
    const next: FsNode | undefined = current.children.find((c) => c.name === segment);
    if (!next) return undefined;
    current = next;
  }
  return current;
}

export function getDir(path: string): FsDirNode | undefined {
  const node = getNode(path);
  return node && node.type === "dir" ? node : undefined;
}

/** Absolute fs path -> `~`-prefixed display path, e.g. "/projects" -> "~/projects". */
export function toDisplayPath(path: string): string {
  if (path === "/") return "~";
  return "~" + path;
}

export function parentPath(path: string): string {
  if (path === "/") return "/";
  const segments = path.split("/").filter(Boolean);
  segments.pop();
  return "/" + segments.join("/");
}
