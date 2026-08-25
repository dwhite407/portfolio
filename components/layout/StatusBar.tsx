"use client";

import { usePathname } from "next/navigation";
import { nodeForRoute } from "@/lib/fs/routes";
import { toDisplayPath } from "@/lib/fs/helpers";

export function StatusBar({
  terminalOpen,
  onToggleTerminal,
}: {
  terminalOpen: boolean;
  onToggleTerminal: () => void;
}) {
  const pathname = usePathname();
  const activeNode = nodeForRoute(pathname);
  const breadcrumb = activeNode ? toDisplayPath(activeNode.path) : "~";

  return (
    <div className="flex h-7 shrink-0 items-center justify-between border-t border-term-border bg-term-panel px-3 font-mono text-[11px] text-term-muted">
      <span className="truncate">{breadcrumb}</span>
      <button
        type="button"
        onClick={onToggleTerminal}
        aria-expanded={terminalOpen}
        className="flex shrink-0 items-center gap-1 rounded px-2 py-0.5 hover:bg-term-panel2 hover:text-term-text"
      >
        <span>{terminalOpen ? "⌄" : "⌃"}</span>
        <span>Terminal</span>
      </button>
    </div>
  );
}
