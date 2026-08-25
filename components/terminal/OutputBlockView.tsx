import type { OutputBlock } from "@/lib/terminal/types";
import { MarkdownPanel } from "@/components/renderers/MarkdownPanel";
import { StackBadges } from "@/components/renderers/StackBadges";
import { SkillBadges } from "@/components/renderers/SkillBadges";
import { highlightJsonLine } from "@/components/renderers/JsonCodeView";
import { cn } from "@/lib/utils/cn";

const TONE_CLASS: Record<string, string> = {
  default: "text-term-text",
  muted: "text-term-muted",
  error: "text-term-error",
  success: "text-term-accent",
};

export function OutputBlockView({ block }: { block: OutputBlock }) {
  switch (block.kind) {
    case "text":
      return (
        <pre
          className={cn(
            "whitespace-pre-wrap break-words font-mono text-[13px] leading-6",
            TONE_CLASS[block.tone ?? "default"]
          )}
        >
          {block.lines.join("\n")}
        </pre>
      );
    case "markdown":
      return (
        <div className="my-2 rounded-lg border border-term-border bg-term-panel p-4">
          <MarkdownPanel body={block.body} />
        </div>
      );
    case "code":
      return (
        <pre className="my-2 overflow-x-auto rounded-lg border border-term-border bg-term-panel p-4 font-mono text-[13px] leading-6 text-term-text/90">
          <code>
            {block.body.split("\n").map((line, i) => (
              <div key={i} className="whitespace-pre">
                {highlightJsonLine(line)}
              </div>
            ))}
          </code>
        </pre>
      );
    case "stack-badges":
      return (
        <div className="my-2 rounded-lg border border-term-border bg-term-panel p-4">
          <StackBadges items={block.items} />
        </div>
      );
    case "skill-badges":
      return (
        <div className="my-2 rounded-lg border border-term-border bg-term-panel p-4">
          <SkillBadges groups={block.groups} />
        </div>
      );
    case "clear":
      return null;
    default:
      return null;
  }
}
