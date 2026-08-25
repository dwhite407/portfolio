export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-term-border bg-term-panel2 px-3 py-1 text-xs font-medium text-term-text">
      {children}
    </span>
  );
}

export function BadgeGroups({ groups }: { groups: { title: string; items: string[] }[] }) {
  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <div key={group.title}>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-term-muted">
            {group.title}
          </div>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
