import { cn } from "@/lib/utils/cn";

export function ActivityBar({
  explorerOpen,
  onToggle,
}: {
  explorerOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="hidden w-12 shrink-0 flex-col items-center border-r border-term-border bg-term-panel py-2 lg:flex">
      <button
        type="button"
        onClick={onToggle}
        aria-label={explorerOpen ? "Collapse Explorer" : "Expand Explorer"}
        aria-pressed={explorerOpen}
        title="Explorer"
        className={cn(
          "relative flex h-11 w-11 items-center justify-center rounded-md transition-colors",
          explorerOpen ? "text-term-accent" : "text-term-muted hover:text-term-text"
        )}
      >
        {explorerOpen && (
          <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-term-accent" />
        )}
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M3 6.8A1.8 1.8 0 0 1 4.8 5h4.6c.5 0 .98.2 1.34.55l1.1 1.1c.35.35.83.55 1.34.55H19.2A1.8 1.8 0 0 1 21 9v8.2A1.8 1.8 0 0 1 19.2 19H4.8A1.8 1.8 0 0 1 3 17.2V6.8Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
