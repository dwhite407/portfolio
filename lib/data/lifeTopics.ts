export interface LifeTopic {
  slug: string;
  name: string;
  description: string;
  photoSlug?: string;
}

export const lifeIntroMarkdown = `The people outside of school and work — kept general on purpose.`;

// TODO: replace with whatever you're comfortable sharing. Keep it general —
// no addresses or details about people who haven't agreed to be on a public site.
export const lifeTopics: LifeTopic[] = [
  {
    slug: "family",
    name: "Family",
    description:
      "A sentence or two about your family — keep it general, nothing that identifies where you live or specific people who haven't agreed to be here.",
  },
  {
    slug: "friends",
    name: "Friends",
    description: "A sentence or two about your friend group, or what you like to do together.",
    photoSlug: "friends",
  },
];

export function getLifeTopic(slug: string): LifeTopic | undefined {
  return lifeTopics.find((t) => t.slug === slug);
}
