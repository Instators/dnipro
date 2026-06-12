// web/src/components/sections/AdaptersPreview.tsx
'use client';

import Link from 'next/link';
import { ArrowRight, TrendingUp, Lock, Clock } from 'lucide-react';
import { MOCK_ADAPTERS } from '@/lib/mockData';
import { riskBadgeClass } from '@/lib/utils';
import { ProtocolMark, CATEGORY_ICONS } from '@/components/icons/AdapterIcons';

export function AdaptersPreview() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <span className="tag mb-4">05 reference adapters</span>
          <h2 className="heading-serif text-3xl sm:text-4xl mb-4">
            Five protocols, <span className="river-underline">one ledger</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Each adapter wraps a battle-tested Solana yield protocol behind a
            clean, auditable on-chain interface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MOCK_ADAPTERS.map((adapter) => {
            const CategoryIcon = CATEGORY_ICONS[adapter.category];
            return (
              <Link
                key={adapter.id}
                href={`/adapters/${adapter.id}`}
                className="group surface rounded-lg p-6 hover:border-dnipro-500/50 transition-colors duration-200"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <ProtocolMark letter={adapter.icon} className="text-dnipro-400 shrink-0" size={36} />
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-dnipro-300 transition-colors">
                        {adapter.name}
                      </h3>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                        <CategoryIcon size={13} />
                        {adapter.categoryLabel}
                      </span>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-md border ${riskBadgeClass(adapter.riskScore)}`}>
                    {adapter.riskLabel}
                  </span>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-border/60">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <TrendingUp className="h-3.5 w-3.5 text-green-400" />
                      <span className="text-xs text-muted-foreground">APY</span>
                    </div>
                    <span className="text-xl font-semibold text-green-400">{adapter.apyPercent}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Lock className="h-3.5 w-3.5 text-dnipro-400" />
                      <span className="text-xs text-muted-foreground">TVL</span>
                    </div>
                    <span className="text-xl font-semibold">{adapter.tvlFormatted}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {adapter.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    {adapter.withdrawalDelay ? (
                      <>
                        <Clock className="h-3.5 w-3.5" />
                        {adapter.withdrawalDelay} unlock
                      </>
                    ) : (
                      <>
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        Instant withdraw
                      </>
                    )}
                  </div>
                  <span className="text-xs text-dnipro-400 group-hover:gap-2 flex items-center gap-1 transition-all">
                    View details <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/adapters"
            className="inline-flex items-center gap-2 text-sm text-dnipro-400 hover:text-dnipro-300 transition-colors"
          >
            Explore all adapters <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
