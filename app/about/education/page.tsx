import type { Metadata } from "next";
import { educationMarkdown } from "@/lib/data/about";
import { MarkdownPanel } from "@/components/renderers/MarkdownPanel";

export const metadata: Metadata = { title: "Education" };

export default function EducationPage() {
  return (
    <div>
      <div className="mb-6 font-mono text-sm text-term-muted">
        <span className="text-term-accent">drew.white@portfolio</span>
        <span className="text-term-text">:</span>
        <span className="text-term-accent2">~/about</span>
        <span className="text-term-text">$ cat education.md</span>
      </div>
      <MarkdownPanel body={educationMarkdown} />
    </div>
  );
}
