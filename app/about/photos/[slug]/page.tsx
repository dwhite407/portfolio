import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { photos, getPhoto } from "@/lib/data/photos";
import { PhotoPlaceholder } from "@/components/renderers/PhotoPlaceholder";

export function generateStaticParams() {
  return photos.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const photo = getPhoto(params.slug);
  if (!photo) return {};
  return { title: photo.filename };
}

export default function PhotoPage({ params }: { params: { slug: string } }) {
  const photo = getPhoto(params.slug);
  if (!photo) notFound();

  return (
    <div>
      <div className="mb-1 font-mono text-xs text-term-muted">~/about/photos/{photo.filename}</div>
      <Link
        href="/about"
        className="mb-4 inline-block font-mono text-xs text-term-accent2 hover:underline"
      >
        ← about
      </Link>
      <h1 className="mb-4 text-2xl font-semibold tracking-tight text-term-text">{photo.filename}</h1>

      <div className="max-w-lg">
        <PhotoPlaceholder filename={photo.filename} caption={photo.caption} size="lg" />
      </div>

      {photo.relatedRoute && (
        <p className="mt-4 font-mono text-xs text-term-muted">
          Related:{" "}
          <Link href={photo.relatedRoute} className="text-term-accent2 hover:underline">
            {photo.relatedRoute}
          </Link>
        </p>
      )}
    </div>
  );
}
