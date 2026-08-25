import Link from "next/link";
import { FileTree } from "./FileTree";

export function ExplorerPanel() {
  return (
    <div className="hidden w-64 shrink-0 flex-col border-r border-term-border bg-term-panel lg:flex">
      <div className="flex items-center justify-between border-b border-term-border px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm text-term-text hover:text-term-accent"
        >
          <span className="text-term-accent">~</span>
          <span className="font-semibold">portfolio</span>
        </Link>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        <div className="mb-2 px-1.5 font-mono text-[11px] font-semibold tracking-wide text-term-muted">
          EXPLORER
        </div>
        <FileTree />
      </div>

      <div className="border-t border-term-border p-3 font-mono text-[11px] text-term-muted">
        Click a file to open it — same filesystem as the terminal below.
      </div>
    </div>
  );
}
