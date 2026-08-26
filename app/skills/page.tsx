import type { Metadata } from "next";
import { skills } from "@/lib/data/skills";
import { SkillBadges } from "@/components/renderers/SkillBadges";

export const metadata: Metadata = { title: "Skills" };

export default function SkillsPage() {
  return (
    <div>
      <div className="mb-6 font-mono text-sm text-term-muted">
        <span className="text-term-accent">drew.white@portfolio</span>
        <span className="text-term-text">:</span>
        <span className="text-term-accent2">~</span>
        <span className="text-term-text">$ cat skills.json</span>
      </div>
      <h1 className="mb-6 font-sans text-2xl font-semibold text-term-text">Skills</h1>
      <SkillBadges groups={skills} />
    </div>
  );
}
