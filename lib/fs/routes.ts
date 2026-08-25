import { allNodes } from "./tree";
import type { FsNode } from "./types";

/** Maps an absolute fs path to the real Next.js route that renders it, if any. */
export function pathToRoute(fsPath: string): string | null {
  if (fsPath === "/") return "/";
  if (fsPath === "/projects") return "/projects";

  const projectMatch = fsPath.match(/^\/projects\/([^/]+)$/);
  if (projectMatch) return `/projects/${projectMatch[1]}`;

  // A project's README.md and stack.json both render on the project's case-study page.
  const projectFileMatch = fsPath.match(/^\/projects\/([^/]+)\/(README\.md|stack\.json)$/);
  if (projectFileMatch) return `/projects/${projectFileMatch[1]}`;

  if (fsPath === "/about.md") return "/about";
  if (fsPath === "/contact.md") return "/contact";
  if (fsPath === "/resume.pdf") return "/resume";
  if (fsPath === "/skills.json") return "/skills";
  if (fsPath === "/me.json") return "/me";

  return null;
}

export interface RouteInfo {
  /** Present only for routes that represent a directory (cd targets). */
  cwd?: string;
  /** A command narrating how this route was reached, for the terminal log. */
  narration: string;
}

/** Reverse mapping used to narrate navigation that didn't originate from the terminal (sidebar clicks, back/forward, direct URL loads). */
export function routeToInfo(pathname: string): RouteInfo | null {
  if (pathname === "/") return { cwd: "/", narration: "cd ~" };
  if (pathname === "/projects") return { cwd: "/projects", narration: "cd projects" };

  const projectMatch = pathname.match(/^\/projects\/([^/]+)$/);
  if (projectMatch) {
    const slug = projectMatch[1];
    return { cwd: `/projects/${slug}`, narration: `open ${slug}` };
  }

  if (pathname === "/about") return { narration: "cat about.md" };
  if (pathname === "/contact") return { narration: "contact" };
  if (pathname === "/resume") return { narration: "resume" };
  if (pathname === "/skills") return { narration: "cat skills.json" };
  if (pathname === "/me") return { narration: "cat me.json" };

  return null;
}

/** The fs node that renders a given route, if any — used to highlight the active file/folder in the Explorer and status bar. */
export function nodeForRoute(pathname: string): FsNode | undefined {
  return allNodes().find((n) => pathToRoute(n.path) === pathname);
}
