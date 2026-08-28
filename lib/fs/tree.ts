import { projects, projectReadmeMarkdown } from "@/lib/data/projects";
import { aboutIntroMarkdown, educationMarkdown, careerMarkdown } from "@/lib/data/about";
import { hobbies, hobbiesIntroMarkdown } from "@/lib/data/hobbies";
import { lifeTopics, lifeIntroMarkdown } from "@/lib/data/lifeTopics";
import { photos } from "@/lib/data/photos";
import { favorites } from "@/lib/data/favorites";
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

function buildAboutDir(): FsDirNode {
  const hobbiesDir: FsDirNode = {
    type: "dir",
    name: "hobbies",
    path: "/about/hobbies",
    children: [
      {
        type: "file",
        name: "README.md",
        path: "/about/hobbies/README.md",
        content: { kind: "markdown", body: hobbiesIntroMarkdown },
      },
      ...hobbies.map((h) => ({
        type: "file" as const,
        name: `${h.slug}.md`,
        path: `/about/hobbies/${h.slug}.md`,
        content: { kind: "markdown" as const, body: h.description },
      })),
    ],
  };

  const lifeDir: FsDirNode = {
    type: "dir",
    name: "life",
    path: "/about/life",
    children: [
      {
        type: "file",
        name: "README.md",
        path: "/about/life/README.md",
        content: { kind: "markdown", body: lifeIntroMarkdown },
      },
      ...lifeTopics.map((t) => ({
        type: "file" as const,
        name: `${t.slug}.md`,
        path: `/about/life/${t.slug}.md`,
        content: { kind: "markdown" as const, body: t.description },
      })),
    ],
  };

  const photosDir: FsDirNode = {
    type: "dir",
    name: "photos",
    path: "/about/photos",
    children: photos.map((p) => ({
      type: "file",
      name: p.filename,
      path: `/about/photos/${p.filename}`,
      content: { kind: "image", caption: p.caption, relatedRoute: p.relatedRoute },
    })),
  };

  return {
    type: "dir",
    name: "about",
    path: "/about",
    children: [
      {
        type: "file",
        name: "README.md",
        path: "/about/README.md",
        content: { kind: "markdown", body: aboutIntroMarkdown },
      },
      {
        type: "file",
        name: "education.md",
        path: "/about/education.md",
        content: { kind: "markdown", body: educationMarkdown },
      },
      {
        type: "file",
        name: "career.md",
        path: "/about/career.md",
        content: { kind: "markdown", body: careerMarkdown },
      },
      hobbiesDir,
      lifeDir,
      {
        type: "file",
        name: "favorites.json",
        path: "/about/favorites.json",
        content: { kind: "code", language: "json", data: favorites },
      },
      photosDir,
    ],
  };
}

export const root: FsDirNode = {
  type: "dir",
  name: "~",
  path: "/",
  children: [
    buildAboutDir(),
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
