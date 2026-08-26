import Link from "next/link";
import { shortBio } from "@/lib/data/about";

export default function HomePage() {
  return (
    <div>
      <div className="mb-6 font-mono text-sm text-term-muted">
        <span className="text-term-accent">drew.white@portfolio</span>
        <span className="text-term-text">:</span>
        <span className="text-term-accent2">~</span>
        <span className="text-term-text">$ ls</span>
      </div>

      <h1 className="mb-3 font-sans text-3xl font-semibold tracking-tight text-term-text">
        Hi, I&apos;m Drew White.
      </h1>
      <p className="mb-8 max-w-xl font-sans text-base leading-7 text-term-text/85">{shortBio}</p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <QuickLink href="/projects" title="projects/" desc="Case studies for three projects" />
        <QuickLink href="/about" title="about.md" desc="Longer bio and background" />
        <QuickLink href="/contact" title="contact.md" desc="Email, GitHub, LinkedIn" />
        <QuickLink href="/resume" title="resume.pdf" desc="View it right here" />
      </div>

      <p className="mt-10 font-mono text-xs text-term-muted">
        Prefer typing? Try <code className="text-term-accent">help</code> in the terminal below.
      </p>
    </div>
  );
}

function QuickLink({
  href,
  title,
  desc,
}: {
  href: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-lg border border-term-border bg-term-panel p-4 transition-colors hover:border-term-accent/50"
    >
      <div className="mb-1 font-mono text-sm text-term-accent group-hover:text-term-accent">
        {title}
      </div>
      <div className="font-sans text-sm text-term-text/70">{desc}</div>
    </Link>
  );
}
