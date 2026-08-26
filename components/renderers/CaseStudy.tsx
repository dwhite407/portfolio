import Link from "next/link";
import type { Project } from "@/lib/data/projects";
import { StackBadges } from "./StackBadges";

export function CaseStudy({ project }: { project: Project }) {
  return (
    <article className="font-sans">
      <div className="mb-1 font-mono text-xs text-term-muted">
        ~/projects/{project.slug}/README.md
      </div>
      <h1 className="mb-2 text-2xl font-semibold tracking-tight text-white">{project.title}</h1>
      <p className="mb-6 text-sm text-term-muted">
        {project.role} · {project.timeframe}
      </p>

      <p className="mb-8 text-base leading-7 text-term-text/90">{project.summary}</p>

      {project.architecture && project.architecture.length > 0 && (
        <p className="-mt-6 mb-8 font-mono text-xs text-term-muted">
          Curious how it&apos;s built? Try{" "}
          <Link href={`/projects/${project.slug}/architecture`} className="text-term-accent2 hover:underline">
            cat architecture.json
          </Link>
        </p>
      )}

      <Section title="Problem">
        <p className="leading-7 text-term-text/90">{project.problem}</p>
      </Section>

      <Section title="Constraints">
        <ul className="ml-5 list-disc space-y-1.5 leading-7 text-term-text/90">
          {project.constraints.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </Section>

      <Section title="Decisions">
        <ul className="ml-5 list-disc space-y-1.5 leading-7 text-term-text/90">
          {project.decisions.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </Section>

      <Section title="What I'd do differently">
        <p className="leading-7 text-term-text/90">{project.retrospective}</p>
      </Section>

      <Section title="Stack">
        <StackBadges items={project.stack} />
      </Section>

      {project.links && (project.links.repo || project.links.demo) && (
        <Section title="Links">
          <div className="flex flex-wrap gap-3">
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-term-border bg-term-panel px-4 py-2 text-sm text-term-accent2 hover:border-term-accent2/50"
              >
                Repository →
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-term-border bg-term-panel px-4 py-2 text-sm text-term-accent2 hover:border-term-accent2/50"
              >
                Live demo →
              </a>
            )}
          </div>
        </Section>
      )}
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 border-b border-term-border pb-2 text-lg font-semibold text-white">
        {title}
      </h2>
      {children}
    </section>
  );
}
