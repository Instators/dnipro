// web/src/app/adapters/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { TrendingUp, Lock, Clock, Shield, ArrowRight, Filter } from 'lucide-react';
import { MOCK_ADAPTERS } from '@/lib/mockData';
import { riskBadgeClass } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Adapter Explorer — Dnipro',
  description: 'Browse all registered yield adapters on Dnipro',
};

const CATEGORIES = ['All', 'Lending', 'Liquidity', 'Real World Asset', 'Insurance'];

export default function AdaptersPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12">
          <h1 className="heading-serif text-4xl mb-3">Adapter Explorer</h1>
          <p className="text-muted-foreground text-lg">
            Browse all governance-approved yield adapters registered with the Dnipro protocol.
          </p>
        </div>

        {/* Summary stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Active Adapters',  value: '5'       },
            { label: 'Total TVL',        value: '$1.005B' },
            { label: 'Avg APY',          value: '11.84%'  },
            { label: 'Protocols',        value: '5'       },
          ].map(s => (
            <div key={s.label} className="surface rounded-xl p-4 text-center">
              <div className="text-xl font-semibold font-mono">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter chips */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:border-dnipro-500/50 hover:text-dnipro-300 transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Adapter cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {MOCK_ADAPTERS.map(adapter => (
            <Link key={adapter.id} href={`/adapters/${adapter.id}`}>
              <div className="surface rounded-lg p-6 hover:border-dnipro-500/40 hover:bg-dnipro-500/5 transition-all duration-200 group h-full">
                {/* Header row */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{adapter.icon}</div>
                    <div>
                      <h2 className="font-medium text-lg group-hover:accent-text transition-colors">
                        {adapter.name}
                      </h2>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">{adapter.categoryLabel}</span>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-xs text-muted-foreground font-mono">{adapter.shareSymbol}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${riskBadgeClass(adapter.riskScore)}`}>
                      {adapter.riskLabel} Risk
                    </span>
                    <div className={`flex items-center gap-1 text-xs ${adapter.isActive ? 'text-green-400' : 'text-red-400'}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {adapter.isActive ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-5">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <TrendingUp className="h-3 w-3" /> APY
                    </div>
                    <div className="text-2xl font-mono font-medium text-green-400">{adapter.apyPercent}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Lock className="h-3 w-3" /> TVL
                    </div>
                    <div className="text-2xl font-mono font-medium">{adapter.tvlFormatted}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Shield className="h-3 w-3" /> Risk
                    </div>
                    <div className="text-2xl font-mono font-medium">{adapter.riskScore}<span className="text-sm text-muted-foreground">/100</span></div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-5 line-clamp-2">
                  {adapter.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-border/50 pt-4">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Min: ${(adapter.minDeposit / 1e6).toFixed(0)} USDC</span>
                    <span>·</span>
                    {adapter.withdrawalDelay ? (
                      <span className="flex items-center gap-1 text-yellow-400">
                        <Clock className="h-3 w-3" /> {adapter.withdrawalDelay}
                      </span>
                    ) : (
                      <span className="text-green-400">Instant withdraw</span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-dnipro-400 group-hover:gap-2 transition-all">
                    Details <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Build your own CTA */}
        <div className="surface rounded-lg p-8 text-center border border-dnipro-500/20">
          <h3 className="text-xl font-semibold font-mono mb-2">Want to add your protocol?</h3>
          <p className="text-muted-foreground mb-5">
            Implement the three-function adapter interface and submit a governance proposal.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/docs/build-adapter"
              className="rounded-xl bg-wheat-400 px-5 py-2.5 text-sm font-semibold text-river-ink hover:bg-wheat-300 transition-colors"
            >
              Build an Adapter
            </Link>
            <Link
              href="/docs/governance"
              className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold hover:bg-secondary transition-colors"
            >
              Governance Docs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
