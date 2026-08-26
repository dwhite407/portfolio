"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ActivityBar, type SideView } from "./ActivityBar";
import { ExplorerPanel } from "./ExplorerPanel";
import { SearchPanel } from "./SearchPanel";
import { ExtensionsPanel } from "./ExtensionsPanel";
import { MobileNav } from "./MobileNav";
import { StatusBar } from "./StatusBar";
import { Terminal } from "@/components/terminal/Terminal";
import { FileIcon } from "./FileIcon";
import { nodeForRoute } from "@/lib/fs/routes";
import { DEFAULT_THEME_ID } from "@/lib/data/themes";

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
  const [sideView, setSideView] = useState<SideView>("explorer");
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [themeId, setThemeId] = useState(DEFAULT_THEME_ID);

  useEffect(() => {
    // The inline script in app/layout.tsx already applied the stored theme to
    // the DOM before hydration (avoiding a flash) — this just syncs React
    // state to match it, for the Extensions panel's "Installed" label.
    const stored = localStorage.getItem("theme");
    if (stored) setThemeId(stored);
  }, []);

  function activateTheme(id: string) {
    setThemeId(id);
    document.documentElement.setAttribute("data-theme", id);
    localStorage.setItem("theme", id);
  }

  function toggleSideView(view: Exclude<SideView, null>) {
    setSideView((prev) => (prev === view ? null : view));
  }

  return (
    <div className="flex h-dvh flex-col">
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <ActivityBar
          sideView={sideView}
          onToggleSideView={toggleSideView}
          terminalOpen={terminalOpen}
          onToggleTerminal={() => setTerminalOpen((v) => !v)}
        />
        {sideView === "explorer" && <ExplorerPanel />}
        {sideView === "search" && <SearchPanel />}
        {sideView === "extensions" && <ExtensionsPanel themeId={themeId} onActivate={activateTheme} />}
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
