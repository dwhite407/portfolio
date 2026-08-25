import { cn } from "@/lib/utils/cn";

// Matches one JSON token per call: a quoted string, or a bare literal (number/true/false/null).
const TOKEN_RE = /"(?:\\.|[^"\\])*"|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|\btrue\b|\bfalse\b|\bnull\b/g;

export function highlightJsonLine(line: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  TOKEN_RE.lastIndex = 0;

  while ((match = TOKEN_RE.exec(line))) {
    if (match.index > lastIndex) nodes.push(line.slice(lastIndex, match.index));

    const token = match[0];
    const after = line.slice(match.index + token.length);
    let className = "text-term-warn"; // number / true / false / null

    if (token[0] === '"') {
      className = /^\s*:/.test(after) ? "text-term-accent2" : "text-term-accent";
    }

    nodes.push(
      <span key={key++} className={className}>
        {token}
      </span>
    );
    lastIndex = TOKEN_RE.lastIndex;
  }

  if (lastIndex < line.length) nodes.push(line.slice(lastIndex));
  return nodes;
}

export function JsonCodeView({ data, className }: { data: unknown; className?: string }) {
  const lines = JSON.stringify(data, null, 2).split("\n");

  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-lg border border-term-border bg-term-panel2 p-4 font-mono text-[13px] leading-6 text-term-text/90",
        className
      )}
    >
      <code>
        {lines.map((line, i) => (
          <div key={i} className="flex">
            <span className="mr-4 w-6 shrink-0 select-none text-right text-term-muted/50">{i + 1}</span>
            <span className="flex-1 whitespace-pre">{highlightJsonLine(line)}</span>
          </div>
        ))}
      </code>
    </pre>
  );
}
