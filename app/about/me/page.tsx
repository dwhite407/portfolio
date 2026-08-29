import type { Metadata } from "next";
import { profile } from "@/lib/data/profile";
import { JsonCodeView } from "@/components/renderers/JsonCodeView";

export const metadata: Metadata = { title: "me.json" };

export default function MePage() {
  return (
    <div>
      <div className="mb-6 font-mono text-sm text-term-muted">
        <span className="text-term-accent">drew.white@portfolio</span>
        <span className="text-term-text">:</span>
        <span className="text-term-accent2">~/about</span>
        <span className="text-term-text">$ cat me.json</span>
      </div>
      <JsonCodeView data={profile} />
    </div>
  );
}
