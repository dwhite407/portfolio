import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <pre className="mb-6 whitespace-pre-wrap font-mono text-[13px] leading-6 text-term-error">
        {"$ cat <this page>\ncat: No such file or directory"}
      </pre>
      <h1 className="mb-3 font-sans text-2xl font-semibold text-white">404 — Not found</h1>
      <p className="mb-6 font-sans text-sm leading-6 text-term-text/80">
        Nothing lives at this path. Try <code className="text-term-accent">ls</code> from home,
        or use the sidebar.
      </p>
      <Link
        href="/"
        className="inline-block rounded-lg border border-term-border bg-term-panel px-4 py-2 font-mono text-sm text-term-accent2 hover:border-term-accent2/50"
      >
        cd ~
      </Link>
    </div>
  );
}
