import type { SkillGroup } from "@/lib/data/skills";
import { BadgeGroups } from "./BadgeList";

export function SkillBadges({ groups }: { groups: SkillGroup[] }) {
  return <BadgeGroups groups={groups.map((g) => ({ title: g.category, items: g.items }))} />;
}
