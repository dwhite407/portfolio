import type { FsNode } from "@/lib/fs/types";

function IconWrap({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`h-4 w-4 shrink-0 ${className ?? ""}`}
    >
      {children}
    </svg>
  );
}

export function FileIcon({ node, expanded }: { node: FsNode; expanded?: boolean }) {
  if (node.type === "dir") {
    return (
      <IconWrap className="text-term-accent2">
        {expanded ? (
          <path
            d="M1.5 4.6A1.4 1.4 0 0 1 2.9 3.2h3.15c.35 0 .69.13.95.38l.77.73c.26.25.6.38.95.38H13a1.4 1.4 0 0 1 1.4 1.4v.4h-11a1 1 0 0 0-.98 1.19l.86 4.3a1.4 1.4 0 0 0 1.37 1.11h7.5a1.4 1.4 0 0 0 1.37-1.12l.78-3.9"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M1.5 4.6A1.4 1.4 0 0 1 2.9 3.2h3.15c.35 0 .69.13.95.38l.77.73c.26.25.6.38.95.38H13a1.4 1.4 0 0 1 1.4 1.4v6.1a1.4 1.4 0 0 1-1.4 1.4H2.9a1.4 1.4 0 0 1-1.4-1.4V4.6Z"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        )}
      </IconWrap>
    );
  }

  const ext = node.name.split(".").pop();

  if (ext === "md") {
    return (
      <IconWrap className="text-term-accent2">
        <rect x="1.3" y="2.6" width="13.4" height="10.8" rx="1.1" stroke="currentColor" strokeWidth="1.1" />
        <path
          d="M3.7 10.8V5.7l2.1 2.5 2.1-2.5v5.1M10.3 6v3.1M9 8l1.3 1.3L11.6 8"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </IconWrap>
    );
  }

  if (ext === "json") {
    return (
      <IconWrap className="text-term-warn">
        <path
          d="M5.4 2.6c-1.3 0-1.7.66-1.7 1.7v1.7c0 .85-.3 1.2-.95 1.4.65.2.95.55.95 1.4v1.7c0 1.04.4 1.7 1.7 1.7M10.6 2.6c1.3 0 1.7.66 1.7 1.7v1.7c0 .85.3 1.2.95 1.4-.65.2-.95.55-.95 1.4v1.7c0 1.04-.4 1.7-1.7 1.7"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </IconWrap>
    );
  }

  if (ext === "pdf") {
    return (
      <IconWrap className="text-term-error">
        <rect x="1.3" y="1.3" width="13.4" height="13.4" rx="1.2" stroke="currentColor" strokeWidth="1.1" />
        <path d="M3.8 5.4h6.5M3.8 8h8M3.8 10.6h5.2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      </IconWrap>
    );
  }

  if (ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "gif" || ext === "webp") {
    return (
      <IconWrap className="text-term-accent">
        <rect x="1.3" y="2.3" width="13.4" height="11.4" rx="1.1" stroke="currentColor" strokeWidth="1.1" />
        <circle cx="5.1" cy="5.7" r="1.15" stroke="currentColor" strokeWidth="1.1" />
        <path
          d="M2.2 11.8 6 8l2.3 2.3L11 7.4l2.8 3.9"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </IconWrap>
    );
  }

  return (
    <IconWrap className="text-term-muted">
      <path
        d="M4 1.5h4.6L11.6 4.5V13.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2.5A1 1 0 0 1 4 1.5Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path d="M8.6 1.5V4.1a.4.4 0 0 0 .4.4h2.6" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    </IconWrap>
  );
}
