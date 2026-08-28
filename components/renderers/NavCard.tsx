import Link from "next/link";

export function NavCard({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link
      href={href}
      className="group block rounded-lg border border-term-border bg-term-panel p-4 transition-colors hover:border-term-accent/50"
    >
      <div className="mb-1 font-mono text-sm text-term-accent group-hover:text-term-accent">{title}</div>
      <div className="font-sans text-sm text-term-text/70">{desc}</div>
    </Link>
  );
}
