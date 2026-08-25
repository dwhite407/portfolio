import type { Metadata } from "next";
import { aboutMarkdown } from "@/lib/data/about";
import { MarkdownPanel } from "@/components/renderers/MarkdownPanel";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div>
      <div className="mb-6 font-mono text-sm text-term-muted">
        <span className="text-term-accent">drew.white@portfolio</span>
        <span className="text-term-text">:</span>
        <span className="text-term-accent2">~</span>
        <span className="text-term-text">$ cat about.md</span>
      </div>
      <MarkdownPanel body={aboutMarkdown} />
    </div>
  );
}
