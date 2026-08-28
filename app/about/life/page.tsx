import type { Metadata } from "next";
import Link from "next/link";
import { lifeIntroMarkdown, lifeTopics } from "@/lib/data/lifeTopics";
import { MarkdownPanel } from "@/components/renderers/MarkdownPanel";
import { NavCard } from "@/components/renderers/NavCard";

export const metadata: Metadata = { title: "Life" };

export default function LifePage() {
  return (
    <div>
      <div className="mb-6 font-mono text-sm text-term-muted">
        <span className="text-term-accent">drew.white@portfolio</span>
        <span className="text-term-text">:</span>
        <span className="text-term-accent2">~/about</span>
        <span className="text-term-text">$ cd life</span>
      </div>
      <Link href="/about" className="mb-4 inline-block font-mono text-xs text-term-accent2 hover:underline">
        ← about
      </Link>
      <MarkdownPanel body={lifeIntroMarkdown} />
      <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {lifeTopics.map((t) => (
          <NavCard key={t.slug} href={`/about/life/${t.slug}`} title={`${t.slug}.md`} desc={t.name} />
        ))}
      </div>
    </div>
  );
}
