import { themes } from "@/lib/data/themes";
import { cn } from "@/lib/utils/cn";
import { SidePanelShell } from "./SidePanelShell";

function Swatch({ accent, accent2 }: { accent: string; accent2: string }) {
  return (
    <div className="flex h-9 w-9 shrink-0 overflow-hidden rounded-md border border-term-border">
      <div className="h-full w-1/2" style={{ backgroundColor: accent }} />
      <div className="h-full w-1/2" style={{ backgroundColor: accent2 }} />
    </div>
  );
}

export function ExtensionsPanel({
  themeId,
  onActivate,
}: {
  themeId: string;
  onActivate: (id: string) => void;
}) {
  return (
    <SidePanelShell
      title="EXTENSIONS"
      footer="Color themes only — these actually change the site's colors, nothing decorative."
    >
      <ul className="space-y-1">
        {themes.map((theme) => {
          const active = theme.id === themeId;
          return (
            <li
              key={theme.id}
              className="flex gap-2.5 rounded-md border border-transparent p-2 hover:border-term-border hover:bg-term-panel2"
            >
              <Swatch accent={theme.preview.accent} accent2={theme.preview.accent2} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-term-text">{theme.name}</div>
                <div className="truncate text-[11px] text-term-muted">{theme.publisher}</div>
                <p className="mt-1 text-xs leading-4 text-term-text/70">{theme.description}</p>
                <button
                  type="button"
                  onClick={() => onActivate(theme.id)}
                  className={cn(
                    "mt-2 rounded px-2.5 py-1 font-mono text-[11px] transition-colors",
                    active
                      ? "border border-term-accent/40 text-term-accent"
                      : "border border-term-border text-term-text/80 hover:border-term-accent2/50 hover:text-term-accent2"
                  )}
                >
                  {active ? "✓ Installed" : "Activate"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </SidePanelShell>
  );
}
