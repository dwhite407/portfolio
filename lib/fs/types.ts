export interface MarkdownFile {
  kind: "markdown";
  body: string;
}

export interface JsonFile {
  kind: "json";
  variant: "skills";
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

/** A file that renders as a flow diagram (boxes + arrows) rather than text — e.g. a project's architecture.json. */
export interface ArchitectureFile {
  kind: "architecture";
  steps: { label: string; detail?: string }[];
  connections?: string[];
}

/** A placeholder for a personal photo the user hasn't added yet — renders an "add your photo here" card, not a real image. */
export interface ImagePlaceholderFile {
  kind: "image";
  caption: string;
  relatedRoute?: string;
}

export type FileContent = MarkdownFile | JsonFile | BinaryFile | CodeFile | ArchitectureFile | ImagePlaceholderFile;

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
