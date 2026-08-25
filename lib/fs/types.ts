export interface MarkdownFile {
  kind: "markdown";
  body: string;
}

export interface JsonFile {
  kind: "json";
  variant: "skills" | "stack";
  data: unknown;
}

export interface BinaryFile {
  kind: "binary";
  href: string;
}

/** A file that renders as literal, syntax-highlighted source (not badges) — e.g. me.json. */
export interface CodeFile {
  kind: "code";
  language: "json";
  data: unknown;
}

export type FileContent = MarkdownFile | JsonFile | BinaryFile | CodeFile;

export interface FsFileNode {
  type: "file";
  name: string;
  path: string;
  content: FileContent;
}

export interface FsDirNode {
  type: "dir";
  name: string;
  path: string;
  children: FsNode[];
}

export type FsNode = FsFileNode | FsDirNode;

export function isDir(node: FsNode): node is FsDirNode {
  return node.type === "dir";
}

export function isFile(node: FsNode): node is FsFileNode {
  return node.type === "file";
}
