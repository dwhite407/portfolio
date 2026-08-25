"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { runCommand } from "@/lib/terminal/commands";
import { applyCompletion, getCompletions } from "@/lib/terminal/complete";
import { routeToInfo } from "@/lib/fs/routes";
import { toDisplayPath } from "@/lib/fs/helpers";
import type { HistoryEntry } from "@/lib/terminal/types";
import { TerminalLine } from "./TerminalLine";

const WELCOME: HistoryEntry = {
  id: 0,
  prompt: "~",
  raw: "",
  blocks: [
    {
      kind: "text",
      lines: [
        "Welcome. This is a living, typeable filesystem.",
        "Type 'help' to see what's here, or use the sidebar — both stay in sync.",
      ],
      tone: "muted",
    },
  ],
};

interface TabCycle {
  base: string;
  matches: string[];
  index: number;
}

export function Terminal() {
  const router = useRouter();
  const pathname = usePathname();

  const [cwd, setCwd] = useState<string>(() => routeToInfo(pathname)?.cwd ?? "/");
  const [log, setLog] = useState<HistoryEntry[]>([WELCOME]);
  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [tabCycle, setTabCycle] = useState<TabCycle | null>(null);

  const lastHandledRoute = useRef(pathname);
  const nextId = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reflect navigation that didn't originate from the terminal itself
  // (sidebar clicks, browser back/forward, a direct URL load).
  useEffect(() => {
    if (pathname === lastHandledRoute.current) return;
    lastHandledRoute.current = pathname;

    const info = routeToInfo(pathname);
    if (!info) return;

    if (info.cwd) setCwd(info.cwd);

    setLog((prev) => [
      ...prev,
      {
        id: nextId.current++,
        prompt: toDisplayPath(info.cwd ?? cwd),
        raw: info.narration,
        blocks: [],
      },
    ]);
    // cwd intentionally omitted: we only want this to react to pathname changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [log]);

  const execute = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      const promptCwd = cwd;
      const outcome = runCommand(trimmed, cwd);

      const isClear = outcome.blocks.length === 1 && outcome.blocks[0].kind === "clear";

      if (isClear) {
        setLog([]);
      } else {
        setLog((prev) => [
          ...prev,
          {
            id: nextId.current++,
            prompt: toDisplayPath(promptCwd),
            raw: trimmed,
            blocks: outcome.blocks,
          },
        ]);
      }

      if (outcome.cwd) setCwd(outcome.cwd);

      if (outcome.route) {
        lastHandledRoute.current = outcome.route;
        router.push(outcome.route);
      }

      if (trimmed) {
        setCommandHistory((prev) => (prev[prev.length - 1] === trimmed ? prev : [...prev, trimmed]));
      }
      setHistoryIndex(null);
      setTabCycle(null);
    },
    [cwd, router]
  );

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      execute(inputValue);
      setInputValue("");
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === null ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputValue(commandHistory[nextIndex]);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(null);
        setInputValue("");
      } else {
        setHistoryIndex(nextIndex);
        setInputValue(commandHistory[nextIndex]);
      }
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const cycle =
        tabCycle && tabCycle.base === inputValue
          ? { ...tabCycle, index: (tabCycle.index + 1) % tabCycle.matches.length }
          : buildTabCycle(inputValue, cwd);

      if (!cycle || cycle.matches.length === 0) return;

      setTabCycle(cycle);
      const match = cycle.matches[cycle.index];
      const completed = applyCompletion(inputValue, match);
      setInputValue(match.endsWith("/") ? completed : `${completed} `);
    }
  }

  function buildTabCycle(input: string, currentCwd: string): TabCycle | null {
    const matches = getCompletions(input, currentCwd);
    if (matches.length === 0) return null;
    return { base: input, matches, index: 0 };
  }

  return (
    <div
      className="flex h-full flex-col bg-term-bg font-mono"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-3 border-b border-term-border px-4 py-2 text-xs text-term-muted">
        <span className="rounded-sm border-b-2 border-term-accent px-1 pb-1.5 pt-0.5 font-mono text-[11px] font-semibold tracking-wide text-term-text">
          TERMINAL
        </span>
        <span>drew.white@portfolio — {toDisplayPath(cwd)}</span>
      </div>

      <div ref={scrollRef} className="term-scroll flex-1 space-y-3 overflow-y-auto px-4 py-3">
        {log.map((entry) => (
          <TerminalLine key={entry.id} entry={entry} />
        ))}

        <div className="flex items-baseline gap-1 text-[13px]">
          <span className="text-term-accent">drew.white@portfolio</span>
          <span className="text-term-text">:</span>
          <span className="text-term-accent2">{toDisplayPath(cwd)}</span>
          <span className="text-term-text">$</span>
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setTabCycle(null);
            }}
            onKeyDown={handleKeyDown}
            autoFocus
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Terminal input"
            className="flex-1 bg-transparent text-term-text caret-term-accent outline-none"
          />
        </div>
      </div>
    </div>
  );
}
