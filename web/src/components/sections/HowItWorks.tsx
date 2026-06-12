// web/src/components/sections/HowItWorks.tsx
const STEPS = [
  {
    title: 'Connect a wallet',
    desc: 'Phantom, Solflare, or any Solana Wallet Adapter-compatible wallet.',
  },
  {
    title: 'Choose an adapter',
    desc: 'Compare APY, TVL, risk score, and withdrawal terms in the explorer.',
  },
  {
    title: 'Deposit via the dispatcher',
    desc: 'One CPI call routes USDC to the chosen adapter and mints receipt shares.',
  },
  {
    title: 'Earn on-chain',
    desc: 'Your position accrues yield. Check current value any time from the dashboard.',
  },
  {
    title: 'Withdraw anytime',
    desc: 'Redeem shares through the dispatcher — funds return minus the protocol fee.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="tag mb-4">how it works</span>
            <h2 className="heading-serif text-3xl sm:text-4xl mb-4">
              Three instructions, end to end
            </h2>
            <p className="text-muted-foreground">
              Dnipro abstracts protocol complexity behind <code className="text-xs bg-secondary px-1.5 py-0.5 rounded font-mono">deposit</code>,{' '}
              <code className="text-xs bg-secondary px-1.5 py-0.5 rounded font-mono">withdraw</code>, and{' '}
              <code className="text-xs bg-secondary px-1.5 py-0.5 rounded font-mono">current_value</code>.
            </p>
          </div>

          <ol className="lg:col-span-8 divide-y divide-border/60 border-t border-b border-border/60">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-6 py-5 group">
                <span className="font-mono text-sm text-muted-foreground w-6 shrink-0 pt-0.5 group-hover:text-wheat-400 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-medium mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
