"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { allNodes } from "@/lib/fs/tree";
import { pathToRoute } from "@/lib/fs/routes";
import { toDisplayPath } from "@/lib/fs/helpers";
import type { FsNode } from "@/lib/fs/types";
import { FileIcon } from "./FileIcon";
import { SidePanelShell } from "./SidePanelShell";

interface SearchResult {
  node: FsNode;
  route: string;
}

const ALL_RESULTS: SearchResult[] = allNodes()
  .map((node) => ({ node, route: pathToRoute(node.path) }))
  .filter((r): r is SearchResult => r.route !== null)
  .sort((a, b) => a.node.path.localeCompare(b.node.path));

export function SearchPanel() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_RESULTS;
    return ALL_RESULTS.filter(
      (r) => r.node.name.toLowerCase().includes(q) || r.node.path.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <SidePanelShell
      title="SEARCH"
      footer="Every file here is real — search finds anything you could also cd or cat to."
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search files..."
        autoFocus
        autoComplete="off"
        spellCheck={false}
        className="mb-2 w-full rounded border border-term-border bg-term-bg px-2.5 py-1.5 font-mono text-[13px] text-term-text outline-none placeholder:text-term-muted focus:border-term-accent/50"
      />

      <ul className="space-y-0.5 font-mono text-[13px]">
        {results.length === 0 && (
          <li className="px-1.5 py-2 text-term-muted">No matches.</li>
        )}
        {results.map(({ node, route }) => (
          <li key={node.path}>
            <Link
              href={route}
              className="flex items-center gap-1.5 rounded px-1.5 py-1.5 text-term-text/85 transition-colors hover:bg-term-panel2 hover:text-term-accent"
            >
              <FileIcon node={node} />
              <span className="flex min-w-0 flex-col">
                <span className="truncate">{node.name}</span>
                <span className="truncate text-[11px] text-term-muted">{toDisplayPath(node.path)}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </SidePanelShell>
  );
}
