import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { lifeTopics, getLifeTopic } from "@/lib/data/lifeTopics";
import { AboutTopicPage } from "@/components/renderers/AboutTopicPage";

export function generateStaticParams() {
  return lifeTopics.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const topic = getLifeTopic(params.slug);
  if (!topic) return {};
  return { title: topic.name };
}

export default function LifeTopicPage({ params }: { params: { slug: string } }) {
  const topic = getLifeTopic(params.slug);
  if (!topic) notFound();

  return (
    <AboutTopicPage
      path={`~/about/life/${topic.slug}.md`}
      title={topic.name}
      description={topic.description}
      photoSlug={topic.photoSlug}
      backHref="/about/life"
      backLabel="life"
    />
  );
}
