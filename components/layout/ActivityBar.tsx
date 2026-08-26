import { cn } from "@/lib/utils/cn";

export type SideView = "explorer" | "search" | "extensions" | null;

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
  sideView,
  onToggleSideView,
  terminalOpen,
  onToggleTerminal,
}: {
  sideView: SideView;
  onToggleSideView: (view: Exclude<SideView, null>) => void;
  terminalOpen: boolean;
  onToggleTerminal: () => void;
}) {
  return (
    <div className="hidden w-12 shrink-0 flex-col items-center gap-1 border-r border-term-border bg-term-panel py-2 lg:flex">
      <ActivityBarButton active={sideView === "explorer"} onClick={() => onToggleSideView("explorer")} label="Explorer">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M3 6.8A1.8 1.8 0 0 1 4.8 5h4.6c.5 0 .98.2 1.34.55l1.1 1.1c.35.35.83.55 1.34.55H19.2A1.8 1.8 0 0 1 21 9v8.2A1.8 1.8 0 0 1 19.2 19H4.8A1.8 1.8 0 0 1 3 17.2V6.8Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </ActivityBarButton>

      <ActivityBarButton active={sideView === "search"} onClick={() => onToggleSideView("search")} label="Search">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M15.2 15.2 20 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </ActivityBarButton>

      <ActivityBarButton
        active={sideView === "extensions"}
        onClick={() => onToggleSideView("extensions")}
        label="Extensions"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M9.5 4.5a1.5 1.5 0 0 1 3 0V6h2.8A1.7 1.7 0 0 1 17 7.7v2.8h1.5a1.5 1.5 0 0 1 0 3H17v2.8a1.7 1.7 0 0 1-1.7 1.7h-2.8v-1.5a1.5 1.5 0 0 0-3 0V18H6.7A1.7 1.7 0 0 1 5 16.3v-2.8h1.5a1.5 1.5 0 0 0 0-3H5V7.7A1.7 1.7 0 0 1 6.7 6h2.8V4.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </ActivityBarButton>

      <div className="my-1 h-px w-6 bg-term-border" aria-hidden="true" />

      <ActivityBarButton active={terminalOpen} onClick={onToggleTerminal} label="Terminal">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <rect x="3" y="4.5" width="18" height="15" rx="1.8" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7 9.5 10.5 12 7 14.5M12.5 14.5H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </ActivityBarButton>
    </div>
  );
}
