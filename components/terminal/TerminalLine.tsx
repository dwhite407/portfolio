import type { HistoryEntry } from "@/lib/terminal/types";
import { OutputBlockView } from "./OutputBlockView";

export function TerminalLine({ entry }: { entry: HistoryEntry }) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-1 font-mono text-[13px]">
        <span className="text-term-accent">drew.white@portfolio</span>
        <span className="text-term-text">:</span>
        <span className="text-term-accent2">{entry.prompt}</span>
        <span className="text-term-text">$</span>
        <span className="text-term-text">{entry.raw}</span>
      </div>
      {entry.blocks.map((block, i) => (
        <OutputBlockView key={i} block={block} />
      ))}
    </div>
  );
}
