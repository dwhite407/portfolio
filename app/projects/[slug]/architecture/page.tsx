import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/data/projects";
import { ArchitectureDiagram } from "@/components/renderers/ArchitectureDiagram";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return { title: `${project.title} — Architecture` };
}

export default function ProjectArchitecturePage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <div>
      <div className="mb-1 font-mono text-xs text-term-muted">
        ~/projects/{project.slug}/architecture.json
      </div>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight text-term-text">
        {project.title} — Architecture
      </h1>
      <ArchitectureDiagram steps={project.architecture ?? []} connections={project.connections} />
    </div>
  );
}
