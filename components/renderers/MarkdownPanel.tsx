import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils/cn";

export function MarkdownPanel({ body, className }: { body: string; className?: string }) {
  return (
    <div className={cn("font-sans text-[15px] leading-7 text-term-text", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mb-4 mt-2 text-2xl font-semibold tracking-tight text-white">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="mb-3 mt-8 border-b border-term-border pb-2 text-lg font-semibold text-white first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-2 mt-6 text-base font-semibold text-white">{children}</h3>
          ),
          p: ({ children }) => <p className="mb-4 text-term-text/90">{children}</p>,
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-term-accent2 underline decoration-term-accent2/40 underline-offset-2 hover:decoration-term-accent2"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
          ul: ({ children }) => <ul className="mb-4 ml-5 list-disc space-y-1.5 text-term-text/90">{children}</ul>,
          ol: ({ children }) => <ol className="mb-4 ml-5 list-decimal space-y-1.5 text-term-text/90">{children}</ol>,
          li: ({ children }) => <li className="pl-1">{children}</li>,
          code: ({ children }) => (
            <code className="rounded bg-term-panel2 px-1.5 py-0.5 font-mono text-[13px] text-term-accent">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="mb-4 overflow-x-auto rounded-lg border border-term-border bg-term-panel2 p-4 font-mono text-[13px]">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mb-4 border-l-2 border-term-accent/50 pl-4 text-term-muted">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-6 border-term-border" />,
          table: ({ children }) => (
            <div className="mb-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-term-border bg-term-panel2 px-3 py-2 text-left font-semibold text-white">
              {children}
            </th>
          ),
          td: ({ children }) => <td className="border border-term-border px-3 py-2">{children}</td>,
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
