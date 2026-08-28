import { cn } from "@/lib/utils/cn";

/** An "add your photo here" slot — deliberately not a real image. */
export function PhotoPlaceholder({
  filename,
  caption,
  size = "md",
}: {
  filename: string;
  caption: string;
  size?: "sm" | "md" | "lg";
}) {
  const height = size === "lg" ? "h-64" : size === "sm" ? "h-28" : "h-40";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-term-border bg-term-panel2 px-4 text-center",
        height
      )}
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-term-muted" fill="none" aria-hidden="true">
        <rect x="2.5" y="4" width="19" height="16" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="8" cy="9.5" r="1.7" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M3.5 17 9 11.5l3.5 3.5 4-4.5 4 5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="font-mono text-xs text-term-muted">{caption}</div>
      <div className="font-mono text-[10px] text-term-muted/60">
        Add {filename} to public/about/photos/
      </div>
    </div>
  );
}
