import type { Metadata } from "next";

export const metadata: Metadata = { title: "Resume" };

export default function ResumePage() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between font-mono text-sm text-term-muted">
        <div>
          <span className="text-term-accent">drew.white@portfolio</span>
          <span className="text-term-text">:</span>
          <span className="text-term-accent2">~</span>
          <span className="text-term-text">$ resume</span>
        </div>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap text-xs text-term-accent2 hover:underline"
        >
          Open in new tab ↗
        </a>
      </div>

      <div className="h-[80vh] overflow-hidden rounded-lg border border-term-border bg-term-panel">
        <iframe src="/resume.pdf" title="Resume" className="h-full w-full" />
      </div>
    </div>
  );
}
