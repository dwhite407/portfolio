import { contact } from "@/lib/data/contact";

export function ContactCard() {
  return (
    <div>
      <h1 className="mb-2 font-sans text-2xl font-semibold text-term-text">Contact</h1>
      <p className="mb-6 font-sans text-sm leading-6 text-term-text/80">{contact.intro}</p>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {contact.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.kind === "email" ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-4 rounded-lg border border-term-border bg-term-panel px-4 py-3 text-sm transition-colors hover:border-term-accent/50 sm:min-w-[220px]"
          >
            <span className="font-medium text-term-text">{link.label}</span>
            <span className="truncate font-mono text-xs text-term-muted">{link.href}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
