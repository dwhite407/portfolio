"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { root } from "@/lib/fs/tree";
import { pathToRoute, nodeForRoute } from "@/lib/fs/routes";
import { parentPath } from "@/lib/fs/helpers";
import type { FsNode } from "@/lib/fs/types";
import { cn } from "@/lib/utils/cn";
import { FileIcon } from "./FileIcon";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={cn("h-3.5 w-3.5 shrink-0 transition-transform", open && "rotate-90")}
      aria-hidden="true"
    >
      <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ROW = "flex items-center gap-1.5 rounded px-1.5 py-1 text-sm truncate transition-colors";

export function FileTree() {
  const pathname = usePathname();
  const activePath = nodeForRoute(pathname)?.path;
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(["/", "/projects"]));

  useEffect(() => {
    if (!activePath) return;
    setExpanded((prev) => {
      const next = new Set(prev);
      let p = activePath;
      while (p !== "/") {
        p = parentPath(p);
        next.add(p);
      }
      return next;
    });
  }, [activePath]);

  function toggle(path: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }

  return (
    <ul className="space-y-0.5 font-mono text-[13px]">
      {root.children
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((child) => (
          <FileTreeNode
            key={child.path}
            node={child}
            depth={0}
            activePath={activePath}
            expanded={expanded}
            onToggle={toggle}
          />
        ))}
    </ul>
  );
}

function FileTreeNode({
  node,
  depth,
  activePath,
  expanded,
  onToggle,
}: {
  node: FsNode;
  depth: number;
  activePath: string | undefined;
  expanded: Set<string>;
  onToggle: (path: string) => void;
}) {
  const isActive = node.path === activePath;
  const paddingLeft = 6 + depth * 14;

  if (node.type === "dir") {
    const isOpen = expanded.has(node.path);
    const route = pathToRoute(node.path);

    return (
      <li>
        <div
          className={cn(ROW, isActive ? "bg-term-panel2 text-term-accent" : "text-term-text/85 hover:bg-term-panel2")}
          style={{ paddingLeft }}
        >
          <button
            type="button"
            onClick={() => onToggle(node.path)}
            aria-label={isOpen ? `Collapse ${node.name}` : `Expand ${node.name}`}
            className="shrink-0 text-term-muted hover:text-term-text"
          >
            <Chevron open={isOpen} />
          </button>
          <FileIcon node={node} expanded={isOpen} />
          {route ? (
            <Link href={route} className="truncate hover:text-term-accent">
              {node.name}/
            </Link>
          ) : (
            <span className="truncate">{node.name}/</span>
          )}
        </div>
        {isOpen && (
          <ul>
            {node.children
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((child) => (
                <FileTreeNode
                  key={child.path}
                  node={child}
                  depth={depth + 1}
                  activePath={activePath}
                  expanded={expanded}
                  onToggle={onToggle}
                />
              ))}
          </ul>
        )}
      </li>
    );
  }

  const { content } = node;
  const routeHref = pathToRoute(node.path) ?? undefined;
  const rowClass = cn(ROW, isActive ? "bg-term-panel2 text-term-accent" : "text-term-text/85 hover:bg-term-panel2");

  return (
    <li>
      {routeHref ? (
        <Link href={routeHref} className={rowClass} style={{ paddingLeft: paddingLeft + 20 }}>
          <FileIcon node={node} />
          <span className="truncate">{node.name}</span>
        </Link>
      ) : content.kind === "binary" ? (
        <a href={content.href} target="_blank" rel="noopener noreferrer" className={rowClass} style={{ paddingLeft: paddingLeft + 20 }}>
          <FileIcon node={node} />
          <span className="truncate">{node.name}</span>
        </a>
      ) : (
        <span className={rowClass} style={{ paddingLeft: paddingLeft + 20 }}>
          <FileIcon node={node} />
          <span className="truncate">{node.name}</span>
        </span>
      )}
    </li>
  );
}
