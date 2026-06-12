// web/src/components/sections/StatsSection.tsx
const STATS = [
  { label: 'Total value routed', value: '$1.0B+'  },
  { label: 'Active adapters',    value: '5'       },
  { label: 'Protocol fee',       value: '0.30%'   },
  { label: 'License',            value: 'MIT'     },
];

export function StatsSection() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border/60">
          {STATS.map(({ label, value }) => (
            <div key={label} className="px-6 py-8">
              <div className="text-3xl font-mono font-medium text-wheat-300">{value}</div>
              <div className="text-sm text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
