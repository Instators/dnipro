// web/src/app/adapters/[id]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, TrendingUp, Shield, Clock, FileCode } from 'lucide-react';
import { MOCK_ADAPTERS, generateApyHistory } from '@/lib/mockData';
import { riskBadgeClass, formatUsdc } from '@/lib/utils';
import { AdapterDetailClient } from './AdapterDetailClient';
import { ProtocolMark } from '@/components/icons/AdapterIcons';

type PageParams = Promise<{ id: string }>;

export async function generateStaticParams() {
  return MOCK_ADAPTERS.map(a => ({ id: a.id }));
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { id } = await params;
  const adapter = MOCK_ADAPTERS.find(a => a.id === id);
  if (!adapter) return { title: 'Not Found — Dnipro' };
  return {
    title: `${adapter.name} — Dnipro Adapter`,
    description: adapter.description,
  };
}

export default async function AdapterDetailPage({ params }: { params: PageParams }) {
  const { id } = await params;
  const adapter = MOCK_ADAPTERS.find(a => a.id === id);
  if (!adapter) notFound();

  const apyHistory = generateApyHistory(adapter.apyBps);

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Back link */}
        <Link href="/adapters" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" /> All Adapters
        </Link>

        {/* Header */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-5">
            <ProtocolMark letter={adapter.icon} className="text-dnipro-400" size={56} />
            <div>
              <h1 className="heading-serif text-3xl">{adapter.name}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-muted-foreground">{adapter.categoryLabel}</span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${riskBadgeClass(adapter.riskScore)}`}>
                  {adapter.riskLabel} Risk ({adapter.riskScore}/100)
                </span>
                <span className="flex items-center gap-1 text-xs text-green-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  Active
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="rounded-xl bg-wheat-400 px-6 py-3 text-sm font-semibold text-river-ink hover:bg-wheat-300"
          >
            Deposit Now
          </Link>
        </div>

        {/* Metrics strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Current APY',   value: adapter.apyPercent,    color: 'text-green-400', icon: TrendingUp },
            { label: 'TVL',           value: adapter.tvlFormatted,   color: 'text-foreground', icon: Shield },
            { label: 'Risk Score',    value: `${adapter.riskScore}/100`, color: 'text-foreground', icon: Shield },
            { label: 'Unlock Period', value: adapter.withdrawalDelay ?? 'Instant', color: adapter.withdrawalDelay ? 'text-yellow-400' : 'text-green-400', icon: Clock },
          ].map(m => (
            <div key={m.label} className="surface rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
              <p className={`text-xl font-mono font-medium ${m.color}`}>{m.value}</p>
            </div>
          ))}
        </div>

        {/* Client-side chart + interactions */}
        <AdapterDetailClient adapter={adapter} apyHistory={apyHistory} />

        {/* Technical details */}
        <div className="grid sm:grid-cols-2 gap-6 mt-8">
          <div className="surface rounded-lg p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <FileCode className="h-4 w-4 text-dnipro-400" /> Technical Details
            </h3>
            <div className="space-y-3 text-sm">
              {[
                { label: 'Program ID',       value: adapter.programId.slice(0, 20) + '…', mono: true },
                { label: 'Underlying Mint',  value: adapter.underlyingMint.slice(0, 20) + '…', mono: true },
                { label: 'Share Token',      value: adapter.shareSymbol, mono: true },
                { label: 'Exchange Rate',    value: `${(adapter.exchangeRateBps / 10000).toFixed(4)}x`, mono: false },
                { label: 'Min Deposit',      value: `$${(adapter.minDeposit / 1e6).toFixed(2)} USDC`, mono: false },
                { label: 'Max Deposit',      value: adapter.maxDeposit === 0 ? 'Unlimited' : formatUsdc(adapter.maxDeposit / 1e6), mono: false },
              ].map(row => (
                <div key={row.label} className="flex justify-between items-center py-1 border-b border-border/30 last:border-0">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className={row.mono ? 'font-mono text-xs text-dnipro-300' : 'font-medium'}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="surface rounded-lg p-6">
            <h3 className="font-semibold mb-4">Links & Resources</h3>
            <div className="space-y-3">
              {[
                { label: 'Protocol Website', href: adapter.website },
                { label: 'Documentation',    href: adapter.docs    },
                { label: 'Security Audit',   href: adapter.auditUrl},
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-border hover:border-dnipro-500/40 hover:bg-secondary transition-all text-sm group"
                >
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">{link.label}</span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-dnipro-400 transition-colors" />
                </a>
              ))}
            </div>

            <div className="mt-5 p-4 bg-secondary/40 rounded-xl border border-border/50">
              <p className="text-xs text-muted-foreground leading-relaxed">
                This adapter is governed by the Dnipro Registry. Any changes to its
                configuration require a governance proposal with a timelock delay.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
