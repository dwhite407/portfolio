"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ActivityBar } from "./ActivityBar";
import { ExplorerPanel } from "./ExplorerPanel";
import { MobileNav } from "./MobileNav";
import { StatusBar } from "./StatusBar";
import { Terminal } from "@/components/terminal/Terminal";
import { FileIcon } from "./FileIcon";
import { nodeForRoute } from "@/lib/fs/routes";

function OpenFileTab() {
  const pathname = usePathname();
  const node = nodeForRoute(pathname);
  const name = node ? node.name : "~";

  return (
    <div className="flex h-9 shrink-0 items-center border-b border-term-border bg-term-bg">
      <div className="flex h-full items-center gap-2 border-r border-term-border bg-term-panel px-3 font-mono text-xs text-term-text">
        <FileIcon node={node ?? { type: "dir", name: "~", path: "/", children: [] }} />
        <span>{name}</span>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <div className="flex h-dvh flex-col">
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <ActivityBar explorerOpen={explorerOpen} onToggle={() => setExplorerOpen((v) => !v)} />
        {explorerOpen && <ExplorerPanel />}
        <MobileNav />

        <div className="flex min-h-0 flex-1 flex-col">
          <OpenFileTab />

          <main className="term-scroll flex-1 overflow-y-auto px-4 py-6 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-3xl">{children}</div>
          </main>

          {terminalOpen && (
            <div className="h-72 shrink-0 border-t border-term-border">
              <Terminal />
            </div>
          )}
        </div>
      </div>

      <StatusBar terminalOpen={terminalOpen} onToggleTerminal={() => setTerminalOpen((v) => !v)} />
    </div>
  );
}
