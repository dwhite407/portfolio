import type { Metadata } from "next";
import { AboutHub } from "@/components/renderers/AboutHub";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div>
      <div className="mb-6 font-mono text-sm text-term-muted">
        <span className="text-term-accent">drew.white@portfolio</span>
        <span className="text-term-text">:</span>
        <span className="text-term-accent2">~</span>
        <span className="text-term-text">$ cd about</span>
      </div>
      <AboutHub />
    </div>
  );
}
