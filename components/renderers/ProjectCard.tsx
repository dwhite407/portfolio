import Link from "next/link";
import type { Project } from "@/lib/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-lg border border-term-border bg-term-panel p-5 transition-colors hover:border-term-accent/50"
    >
      <div className="mb-1 font-mono text-xs text-term-muted">~/projects/{project.slug}</div>
      <h3 className="mb-2 font-sans text-lg font-semibold text-term-text group-hover:text-term-accent">
        {project.title}
      </h3>
      <p className="mb-4 font-sans text-sm leading-6 text-term-text/80">{project.summary}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((s) => (
          <span
            key={s.name}
            className="rounded-full border border-term-border bg-term-panel2 px-2.5 py-0.5 font-mono text-[11px] text-term-muted"
          >
            {s.name}
          </span>
        ))}
      </div>
    </Link>
  );
}
