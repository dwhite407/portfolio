import type { ArchitectureStep } from "@/lib/data/projects";

function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex shrink-0 flex-col items-center justify-center gap-1 px-1 py-2 sm:py-0">
      {label && (
        <span className="whitespace-nowrap font-mono text-[11px] text-term-muted">{label}</span>
      )}
      <span aria-hidden="true" className="text-term-muted">
        <span className="sm:hidden">↓</span>
        <span className="hidden sm:inline">→</span>
      </span>
    </div>
  );
}

function StepBox({ step }: { step: ArchitectureStep }) {
  return (
    <div className="flex-1 rounded-lg border border-term-border bg-term-panel2 px-4 py-3 text-center sm:min-w-[9rem]">
      <div className="font-mono text-sm font-medium text-term-accent">{step.label}</div>
      {step.detail && <div className="mt-1 text-xs text-term-muted">{step.detail}</div>}
    </div>
  );
}

export function ArchitectureDiagram({
  steps,
  connections,
}: {
  steps: ArchitectureStep[];
  connections?: string[];
}) {
  if (steps.length === 0) return null;

  return (
    <div className="flex flex-col items-stretch rounded-lg border border-term-border bg-term-panel p-4 sm:flex-row sm:items-center">
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col items-stretch sm:flex-row sm:items-center">
          <StepBox step={step} />
          {i < steps.length - 1 && <Arrow label={connections?.[i]} />}
        </div>
      ))}
    </div>
  );
}
