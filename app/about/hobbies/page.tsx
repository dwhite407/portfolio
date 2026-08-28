import type { Metadata } from "next";
import Link from "next/link";
import { hobbiesIntroMarkdown, hobbies } from "@/lib/data/hobbies";
import { MarkdownPanel } from "@/components/renderers/MarkdownPanel";
import { NavCard } from "@/components/renderers/NavCard";

export const metadata: Metadata = { title: "Hobbies" };

export default function HobbiesPage() {
  return (
    <div>
      <div className="mb-6 font-mono text-sm text-term-muted">
        <span className="text-term-accent">drew.white@portfolio</span>
        <span className="text-term-text">:</span>
        <span className="text-term-accent2">~/about</span>
        <span className="text-term-text">$ cd hobbies</span>
      </div>
      <Link href="/about" className="mb-4 inline-block font-mono text-xs text-term-accent2 hover:underline">
        ← about
      </Link>
      <MarkdownPanel body={hobbiesIntroMarkdown} />
      <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {hobbies.map((h) => (
          <NavCard key={h.slug} href={`/about/hobbies/${h.slug}`} title={`${h.slug}.md`} desc={h.name} />
        ))}
      </div>
    </div>
  );
}
