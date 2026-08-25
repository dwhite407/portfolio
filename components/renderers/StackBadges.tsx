import type { StackItem } from "@/lib/data/projects";
import { BadgeGroups } from "./BadgeList";

const CATEGORY_LABEL: Record<StackItem["category"], string> = {
  language: "Languages",
  framework: "Frameworks",
  infra: "Infra",
  tool: "Tools",
};

const CATEGORY_ORDER: StackItem["category"][] = ["language", "framework", "infra", "tool"];

export function StackBadges({ items }: { items: StackItem[] }) {
  const groups = CATEGORY_ORDER.map((category) => ({
    title: CATEGORY_LABEL[category],
    items: items.filter((i) => i.category === category).map((i) => i.name),
  })).filter((g) => g.items.length > 0);

  return <BadgeGroups groups={groups} />;
}
