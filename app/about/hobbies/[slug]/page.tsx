import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hobbies, getHobby } from "@/lib/data/hobbies";
import { AboutTopicPage } from "@/components/renderers/AboutTopicPage";

export function generateStaticParams() {
  return hobbies.map((h) => ({ slug: h.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const hobby = getHobby(params.slug);
  if (!hobby) return {};
  return { title: hobby.name };
}

export default function HobbyPage({ params }: { params: { slug: string } }) {
  const hobby = getHobby(params.slug);
  if (!hobby) notFound();

  return (
    <AboutTopicPage
      path={`~/about/hobbies/${hobby.slug}.md`}
      title={hobby.name}
      description={hobby.description}
      stats={hobby.stats}
      photoSlug={hobby.photoSlug}
      backHref="/about/hobbies"
      backLabel="hobbies"
    />
  );
}
