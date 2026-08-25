import { cn } from "@/lib/utils/cn";

function ActivityBarButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={active ? `Collapse ${label}` : `Expand ${label}`}
      aria-pressed={active}
      title={label}
      className={cn(
        "relative flex h-11 w-11 items-center justify-center rounded-md transition-colors",
        active ? "text-term-accent" : "text-term-muted hover:text-term-text"
      )}
    >
      {active && (
        <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-term-accent" />
      )}
      {children}
    </button>
  );
}

export function ActivityBar({
  explorerOpen,
  onToggleExplorer,
  terminalOpen,
  onToggleTerminal,
}: {
  explorerOpen: boolean;
  onToggleExplorer: () => void;
  terminalOpen: boolean;
  onToggleTerminal: () => void;
}) {
  return (
    <div className="hidden w-12 shrink-0 flex-col items-center gap-1 border-r border-term-border bg-term-panel py-2 lg:flex">
      <ActivityBarButton active={explorerOpen} onClick={onToggleExplorer} label="Explorer">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M3 6.8A1.8 1.8 0 0 1 4.8 5h4.6c.5 0 .98.2 1.34.55l1.1 1.1c.35.35.83.55 1.34.55H19.2A1.8 1.8 0 0 1 21 9v8.2A1.8 1.8 0 0 1 19.2 19H4.8A1.8 1.8 0 0 1 3 17.2V6.8Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </ActivityBarButton>

      <ActivityBarButton active={terminalOpen} onClick={onToggleTerminal} label="Terminal">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <rect x="3" y="4.5" width="18" height="15" rx="1.8" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7 9.5 10.5 12 7 14.5M12.5 14.5H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </ActivityBarButton>
    </div>
  );
}
