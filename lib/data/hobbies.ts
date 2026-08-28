export interface HobbyStat {
  label: string;
  value: string;
}

export interface Hobby {
  slug: string;
  name: string;
  description: string;
  stats: HobbyStat[];
  photoSlug?: string;
}

export const hobbiesIntroMarkdown = `A few things I do outside of writing code.`;

// TODO: every description/stat below is a placeholder — replace with the real thing.
export const hobbies: Hobby[] = [
  {
    slug: "golf",
    name: "Golf",
    description:
      "Write a couple sentences here about your golf game — how long you've played, a favorite course, your best round, or just why you like it.",
    stats: [
      { label: "Playing since", value: "TODO" },
      { label: "Favorite course", value: "TODO" },
    ],
    photoSlug: "golf",
  },
  {
    slug: "basketball",
    name: "Basketball",
    description:
      "Write a couple sentences here about basketball — pickup games, a favorite team, position you play, whatever feels like you.",
    stats: [
      { label: "Position", value: "TODO" },
      { label: "Favorite team", value: "TODO" },
    ],
    photoSlug: "basketball",
  },
  {
    slug: "cooking",
    name: "Cooking",
    description:
      "Write a couple sentences here about cooking — a specialty dish, a cuisine you love, or how you got into it.",
    stats: [
      { label: "Go-to dish", value: "TODO" },
      { label: "Cuisine", value: "TODO" },
    ],
    photoSlug: "cooking",
  },
  {
    slug: "gaming",
    name: "Gaming",
    description:
      "Write a couple sentences here about gaming — favorite genres, platform, a game you're currently into.",
    stats: [
      { label: "Platform", value: "TODO" },
      { label: "Currently playing", value: "TODO" },
    ],
    photoSlug: "gaming",
  },
];

export function getHobby(slug: string): Hobby | undefined {
  return hobbies.find((h) => h.slug === slug);
}
