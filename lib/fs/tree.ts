import { projects, projectReadmeMarkdown } from "@/lib/data/projects";
import { aboutMarkdown } from "@/lib/data/about";
import { skills } from "@/lib/data/skills";
import { contactMarkdown } from "@/lib/data/contact";
import { profile } from "@/lib/data/profile";
import type { FsDirNode, FsNode } from "./types";

function buildProjectDir(slug: string): FsDirNode {
  const project = projects.find((p) => p.slug === slug)!;
  const path = `/projects/${slug}`;
  return {
    type: "dir",
    name: slug,
    path,
    children: [
      {
        type: "file",
        name: "README.md",
        path: `${path}/README.md`,
        content: { kind: "markdown", body: projectReadmeMarkdown(project) },
      },
      {
        type: "file",
        name: "architecture.json",
        path: `${path}/architecture.json`,
        content: {
          kind: "architecture",
          steps: project.architecture ?? [],
          connections: project.connections,
        },
      },
    ],
  };
}

const projectsDir: FsDirNode = {
  type: "dir",
  name: "projects",
  path: "/projects",
  children: projects.map((p) => buildProjectDir(p.slug)),
};

export const root: FsDirNode = {
  type: "dir",
  name: "~",
  path: "/",
  children: [
    {
      type: "file",
      name: "about.md",
      path: "/about.md",
      content: { kind: "markdown", body: aboutMarkdown },
    },
    {
      type: "file",
      name: "me.json",
      path: "/me.json",
      content: { kind: "code", language: "json", data: profile },
    },
    projectsDir,
    {
      type: "file",
      name: "skills.json",
      path: "/skills.json",
      content: { kind: "json", variant: "skills", data: skills },
    },
    {
      type: "file",
      name: "contact.md",
      path: "/contact.md",
      content: { kind: "markdown", body: contactMarkdown() },
    },
    {
      type: "file",
      name: "resume.pdf",
      path: "/resume.pdf",
      content: { kind: "binary", href: "/resume.pdf" },
    },
  ],
};

export function allNodes(): FsNode[] {
  const out: FsNode[] = [];
  function walk(node: FsNode) {
    out.push(node);
    if (node.type === "dir") node.children.forEach(walk);
  }
  walk(root);
  return out;
}
