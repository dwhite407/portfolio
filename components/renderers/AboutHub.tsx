import { aboutIntroMarkdown } from "@/lib/data/about";
import { MarkdownPanel } from "./MarkdownPanel";
import { NavCard } from "./NavCard";

export function AboutHub() {
  return (
    <div>
      <MarkdownPanel body={aboutIntroMarkdown} />

      <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <NavCard href="/about/education" title="education.md" desc="School, degrees, GPA" />
        <NavCard href="/about/career" title="career.md" desc="Work experience and awards" />
        <NavCard href="/about/hobbies" title="hobbies/" desc="Golf, basketball, cooking, gaming" />
        <NavCard href="/about/life" title="life/" desc="Family and friends" />
        <NavCard href="/about/favorites" title="favorites.json" desc="The lighthearted stuff" />
      </div>
    </div>
  );
}
