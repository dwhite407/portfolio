import { shortBio } from "@/lib/data/about";
import { NavCard } from "@/components/renderers/NavCard";

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
        <NavCard href="/projects" title="projects/" desc="Case studies for three projects" />
        <NavCard href="/about" title="about/" desc="Education, career, hobbies, and more" />
        <NavCard href="/about/contact" title="contact.md" desc="Email, GitHub, LinkedIn" />
        <NavCard href="/resume" title="resume.pdf" desc="View it right here" />
      </div>

      <p className="mt-10 font-mono text-xs text-term-muted">
        Prefer typing? Try <code className="text-term-accent">help</code> in the terminal below.
      </p>
    </div>
  );
}
