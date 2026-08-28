export interface Photo {
  slug: string;
  filename: string;
  caption: string;
  relatedRoute?: string;
}

// TODO: replace these placeholders — see PhotoPlaceholder.tsx for what a real
// photo needs (drop the file in public/about/photos/ and swap the caption).
export const photos: Photo[] = [
  { slug: "golf", filename: "golf.jpg", caption: "Out on the course.", relatedRoute: "/about/hobbies/golf" },
  {
    slug: "basketball",
    filename: "basketball.jpg",
    caption: "On the court.",
    relatedRoute: "/about/hobbies/basketball",
  },
  {
    slug: "cooking",
    filename: "cooking.jpg",
    caption: "Something in the kitchen.",
    relatedRoute: "/about/hobbies/cooking",
  },
  { slug: "gaming", filename: "gaming.jpg", caption: "Mid-session.", relatedRoute: "/about/hobbies/gaming" },
  { slug: "friends", filename: "friends.jpg", caption: "With friends.", relatedRoute: "/about/life/friends" },
];

export function getPhoto(slug: string): Photo | undefined {
  return photos.find((p) => p.slug === slug);
}
