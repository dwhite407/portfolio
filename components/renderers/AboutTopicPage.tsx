import Link from "next/link";
import { getPhoto } from "@/lib/data/photos";
import { Badge } from "./BadgeList";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

export function AboutTopicPage({
  path,
  title,
  description,
  stats,
  photoSlug,
  backHref,
  backLabel,
}: {
  path: string;
  title: string;
  description: string;
  stats?: { label: string; value: string }[];
  photoSlug?: string;
  backHref: string;
  backLabel: string;
}) {
  const photo = photoSlug ? getPhoto(photoSlug) : undefined;

  return (
    <div>
      <div className="mb-1 font-mono text-xs text-term-muted">{path}</div>
      <Link
        href={backHref}
        className="mb-4 inline-block font-mono text-xs text-term-accent2 hover:underline"
      >
        ← {backLabel}
      </Link>
      <h1 className="mb-4 text-2xl font-semibold tracking-tight text-term-text">{title}</h1>

      <p className="mb-6 max-w-xl font-sans text-base leading-7 text-term-text/90">{description}</p>

      {stats && stats.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {stats.map((s) => (
            <Badge key={s.label}>
              <span className="text-term-muted">{s.label}:</span>&nbsp;{s.value}
            </Badge>
          ))}
        </div>
      )}

      {photo && (
        <div className="max-w-sm">
          <PhotoPlaceholder filename={photo.filename} caption={photo.caption} size="lg" />
        </div>
      )}
    </div>
  );
}
