import { projects } from "@/lib/data/projects";
import { ProjectCard } from "./ProjectCard";

export function DirectoryListing() {
  return (
    <div>
      <div className="mb-6 font-mono text-sm text-term-muted">
        <span className="text-term-accent">drew.white@portfolio</span>
        <span className="text-term-text">:</span>
        <span className="text-term-accent2">~</span>
        <span className="text-term-text">$ ls projects</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
