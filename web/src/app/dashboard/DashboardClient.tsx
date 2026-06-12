// web/src/app/dashboard/DashboardClient.tsx
'use client';

import { useState, useCallback } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
  TrendingUp, ArrowDownToLine, ArrowUpFromLine,
  RefreshCw, CheckCircle2,
  AlertTriangle, Clock, Loader2,
} from 'lucide-react';
import { IconWallet, IconEmpty, ProtocolMark } from '@/components/icons/AdapterIcons';
import { cn, formatUsdc, riskBadgeClass, bpsToPercent, formatAddress } from '@/lib/utils';
import { MOCK_ADAPTERS, MOCK_POSITIONS, PORTFOLIO_SUMMARY } from '@/lib/mockData';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

type TabId = 'positions' | 'deposit' | 'withdraw';

// Synthetic 30-day portfolio value history
const PORTFOLIO_HISTORY = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  value: 7000 + Math.sin(i * 0.3) * 200 + i * 19,
}));

export function DashboardClient() {
  const { publicKey, connected, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [activeTab, setActiveTab] = useState<TabId>('positions');
  const [selectedAdapterId, setSelectedAdapterId] = useState('kamino');
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawShares, setWithdrawShares] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [txResult, setTxResult] = useState<{ sig: string; type: 'deposit' | 'withdraw' } | null>(null);
  const [simResult, setSimResult] = useState<{ fee: number; net: number } | null>(null);

  const selectedAdapter = MOCK_ADAPTERS.find(a => a.id === selectedAdapterId)!;
  const userPosition = MOCK_POSITIONS.find(p => p.adapterId === selectedAdapterId);

  // Compute fee estimate on amount change
  const onDepositAmountChange = (val: string) => {
    setDepositAmount(val);
    const n = parseFloat(val);
    if (!isNaN(n) && n > 0) {
      const fee = n * 0.003;
      setSimResult({ fee, net: n - fee });
    } else {
      setSimResult(null);
    }
  };

  const handleDeposit = useCallback(async () => {
    if (!connected || !publicKey || !depositAmount) return;
    setIsProcessing(true);
    setTxResult(null);

    try {
      // Simulate a 2s delay for demo (real impl uses buildDepositTransaction)
      await new Promise(r => setTimeout(r, 2000));

      // In production: build tx from SDK, sign, and send
      const fakeSig = Array.from({ length: 64 }, () =>
        '0123456789abcdef'[Math.floor(Math.random() * 16)]
      ).join('');

      setTxResult({ sig: fakeSig, type: 'deposit' });
      setDepositAmount('');
      setSimResult(null);
    } catch (err) {
      console.error('Deposit failed:', err);
    } finally {
      setIsProcessing(false);
    }
  }, [connected, publicKey, depositAmount]);

  const handleWithdraw = useCallback(async () => {
    if (!connected || !publicKey) return;
    setIsProcessing(true);
    setTxResult(null);

    try {
      await new Promise(r => setTimeout(r, 2000));
      const fakeSig = Array.from({ length: 64 }, () =>
        '0123456789abcdef'[Math.floor(Math.random() * 16)]
      ).join('');
      setTxResult({ sig: fakeSig, type: 'withdraw' });
    } catch (err) {
      console.error('Withdraw failed:', err);
    } finally {
      setIsProcessing(false);
    }
  }, [connected, publicKey]);

  if (!connected) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-lg border border-border text-dnipro-400">
            <IconWallet size={28} />
          </div>
          <h1 className="heading-serif text-3xl mb-3">Connect your wallet</h1>
          <p className="text-muted-foreground mb-8">
            Connect a Solana wallet to view your positions and start earning yield.
          </p>
          <WalletMultiButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {formatAddress(publicKey!.toBase58(), 6)}
            </p>
          </div>
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        {/* Portfolio summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="surface rounded-lg p-5">
            <p className="text-xs text-muted-foreground mb-1">Total Deposited</p>
            <p className="text-2xl font-semibold">{formatUsdc(PORTFOLIO_SUMMARY.totalDeposited / 1e6)}</p>
          </div>
          <div className="surface rounded-lg p-5">
            <p className="text-xs text-muted-foreground mb-1">Current Value</p>
            <p className="text-2xl font-semibold text-green-400">{formatUsdc(PORTFOLIO_SUMMARY.totalValue / 1e6)}</p>
          </div>
          <div className="surface rounded-lg p-5">
            <p className="text-xs text-muted-foreground mb-1">Total PnL</p>
            <p className="text-2xl font-semibold text-green-400">
              +{formatUsdc(PORTFOLIO_SUMMARY.totalPnl / 1e6)}
              <span className="text-base ml-2 text-green-400/70">{PORTFOLIO_SUMMARY.pnlPercent}</span>
            </p>
          </div>
        </div>

        {/* Portfolio chart */}
        <div className="surface rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Portfolio Value (30d)</h2>
            <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
              +8.21% ↑
            </span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={PORTFOLIO_HISTORY}>
              <defs>
                <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3aab9e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3aab9e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#666' }} tickLine={false} axisLine={false} interval={6} />
              <YAxis tick={{ fontSize: 11, fill: '#666' }} tickLine={false} axisLine={false} tickFormatter={v => `$${(v / 1000).toFixed(1)}K`} />
              <Tooltip
                contentStyle={{ background: '#0f2a26', border: '1px solid #1a3d39', borderRadius: 8, fontSize: 12 }}
                formatter={(v: number) => [`$${v.toFixed(0)}`, 'Value']}
              />
              <Area type="monotone" dataKey="value" stroke="#3aab9e" strokeWidth={2} fill="url(#portfolioGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Main panel: adapter selector + action tabs */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left: Adapter selector */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1">
              Select Adapter
            </h2>
            {MOCK_ADAPTERS.map(adapter => (
              <button
                key={adapter.id}
                onClick={() => setSelectedAdapterId(adapter.id)}
                className={cn(
                  'w-full text-left surface rounded-xl p-4 transition-all border',
                  selectedAdapterId === adapter.id
                    ? 'border-dnipro-500/50 bg-dnipro-500/10'
                    : 'border-transparent hover:border-border'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ProtocolMark letter={adapter.icon} className="text-dnipro-400" size={28} />
                    <div>
                      <div className="text-sm font-medium">{adapter.name}</div>
                      <div className="text-xs text-green-400">{adapter.apyPercent} APY</div>
                    </div>
                  </div>
                  {selectedAdapterId === adapter.id && (
                    <div className="h-2 w-2 rounded-full bg-dnipro-400" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Right: Action panel */}
          <div className="lg:col-span-2 space-y-4">

            {/* Adapter info card */}
            <div className="surface rounded-lg p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <ProtocolMark letter={selectedAdapter.icon} className="text-dnipro-400" size={40} />
                  <div>
                    <h2 className="text-lg font-semibold">{selectedAdapter.name}</h2>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={cn('text-xs px-2 py-0.5 rounded-full border', riskBadgeClass(selectedAdapter.riskScore))}>
                        {selectedAdapter.riskLabel} Risk
                      </span>
                      {selectedAdapter.withdrawalDelay ? (
                        <span className="flex items-center gap-1 text-xs text-yellow-400">
                          <Clock className="h-3 w-3" /> {selectedAdapter.withdrawalDelay}
                        </span>
                      ) : (
                        <span className="text-xs text-green-400">Instant withdraw</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-semibold text-green-400">{selectedAdapter.apyPercent}</div>
                  <div className="text-xs text-muted-foreground">Current APY</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground text-xs mb-0.5">TVL</div>
                  <div className="font-medium">{selectedAdapter.tvlFormatted}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs mb-0.5">Share token</div>
                  <div className="font-medium font-mono text-dnipro-300">{selectedAdapter.shareSymbol}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs mb-0.5">Min deposit</div>
                  <div className="font-medium">{formatUsdc(selectedAdapter.minDeposit / 1e6)}</div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                {selectedAdapter.description}
              </p>
            </div>

            {/* Tabs */}
            <div className="surface rounded-lg overflow-hidden">
              <div className="flex border-b border-border/50">
                {([
                  { id: 'positions', label: 'My Position', icon: Wallet },
                  { id: 'deposit',   label: 'Deposit',     icon: ArrowDownToLine },
                  { id: 'withdraw',  label: 'Withdraw',    icon: ArrowUpFromLine },
                ] as { id: TabId; label: string; icon: any }[]).map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setTxResult(null); }}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-colors',
                      activeTab === tab.id
                        ? 'bg-dnipro-900/50 text-dnipro-200 border-b-2 border-dnipro-400'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* ── Positions tab ────────────────────────────── */}
                {activeTab === 'positions' && (
                  <div>
                    {userPosition ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-secondary/40 rounded-xl p-4">
                            <p className="text-xs text-muted-foreground mb-1">Deposited</p>
                            <p className="text-xl font-semibold">{formatUsdc(userPosition.depositedAmount / 1e6)}</p>
                          </div>
                          <div className="bg-secondary/40 rounded-xl p-4">
                            <p className="text-xs text-muted-foreground mb-1">Current Value</p>
                            <p className="text-xl font-semibold text-green-400">{formatUsdc(userPosition.currentValue / 1e6)}</p>
                          </div>
                          <div className="bg-secondary/40 rounded-xl p-4">
                            <p className="text-xs text-muted-foreground mb-1">PnL</p>
                            <p className="text-xl font-semibold text-green-400">
                              +{formatUsdc(userPosition.pnl / 1e6)}
                              <span className="text-sm ml-1">{userPosition.pnlPercent}</span>
                            </p>
                          </div>
                          <div className="bg-secondary/40 rounded-xl p-4">
                            <p className="text-xs text-muted-foreground mb-1">Shares</p>
                            <p className="text-xl font-semibold font-mono text-dnipro-300">
                              {(userPosition.shares / 1e6).toFixed(2)}
                            </p>
                            <p className="text-xs text-muted-foreground">{selectedAdapter.shareSymbol}</p>
                          </div>
                        </div>
                        <div className="bg-secondary/40 rounded-xl p-4 flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">Est. Daily Yield</p>
                            <p className="text-sm font-medium text-green-400 mt-0.5">
                              +{formatUsdc((userPosition.currentValue / 1e6) * (selectedAdapter.apyBps / 10000) / 365, 4)}/day
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Opened</p>
                            <p className="text-sm">{new Date(userPosition.openedAt * 1000).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <IconEmpty size={36} className="mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground mb-4">No position in {selectedAdapter.name}</p>
                        <button
                          onClick={() => setActiveTab('deposit')}
                          className="text-sm text-dnipro-400 hover:text-dnipro-300 transition-colors"
                        >
                          Make your first deposit →
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* ── Deposit tab ────────────────────────────────── */}
                {activeTab === 'deposit' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Amount (USDC)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={depositAmount}
                          onChange={e => onDepositAmountChange(e.target.value)}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          className="w-full bg-secondary/40 border border-border rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-dnipro-500/50 focus:border-dnipro-500/50 transition-all"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                          {['25%','50%','MAX'].map(pct => (
                            <button
                              key={pct}
                              onClick={() => onDepositAmountChange(pct === 'MAX' ? '10000' : pct === '50%' ? '5000' : '2500')}
                              className="text-xs text-dnipro-400 hover:text-dnipro-300 transition-colors px-1"
                            >
                              {pct}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Simulation result */}
                    {simResult && (
                      <div className="bg-secondary/40 rounded-xl p-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Protocol fee (0.30%)</span>
                          <span className="text-yellow-400">-{formatUsdc(simResult.fee)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Net deposited</span>
                          <span className="font-medium">{formatUsdc(simResult.net)}</span>
                        </div>
                        <div className="flex justify-between border-t border-border/50 pt-2">
                          <span className="text-muted-foreground">Est. {selectedAdapter.shareSymbol} received</span>
                          <span className="text-dnipro-300 font-mono">
                            ~{(simResult.net * 10000 / selectedAdapter.exchangeRateBps).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Est. annual yield</span>
                          <span className="text-green-400">
                            +{formatUsdc(simResult.net * selectedAdapter.apyBps / 10000)}/yr
                          </span>
                        </div>
                      </div>
                    )}

                    {selectedAdapter.withdrawalDelay && (
                      <div className="flex items-start gap-2 text-xs text-yellow-400 bg-yellow-400/5 border border-yellow-400/20 rounded-xl p-3">
                        <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                        <span>
                          This adapter has a <strong>{selectedAdapter.withdrawalDelay}</strong> withdrawal cooldown.
                          Ensure you won't need these funds soon.
                        </span>
                      </div>
                    )}

                    {txResult?.type === 'deposit' && (
                      <div className="flex items-start gap-2 text-xs text-green-400 bg-green-400/5 border border-green-400/20 rounded-xl p-3">
                        <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                        <span>
                          Deposit confirmed!{' '}
                          <a
                            href={`https://solscan.io/tx/${txResult.sig}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            View on Solscan ↗
                          </a>
                        </span>
                      </div>
                    )}

                    <button
                      onClick={handleDeposit}
                      disabled={isProcessing || !depositAmount || parseFloat(depositAmount) <= 0}
                      className={cn(
                        'w-full rounded-xl py-3.5 text-sm font-semibold transition-all flex items-center justify-center gap-2',
                        isProcessing || !depositAmount || parseFloat(depositAmount) <= 0
                          ? 'bg-wheat-900/30 text-wheat-200/30 cursor-not-allowed'
                          : 'bg-wheat-400 text-river-ink hover:bg-wheat-300'
                      )}
                    >
                      {isProcessing ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Processing…</>
                      ) : (
                        <><ArrowDownToLine className="h-4 w-4" /> Deposit USDC</>
                      )}
                    </button>
                  </div>
                )}

                {/* ── Withdraw tab ──────────────────────────────── */}
                {activeTab === 'withdraw' && (
                  <div className="space-y-4">
                    {userPosition ? (
                      <>
                        <div className="bg-secondary/40 rounded-xl p-4 text-sm">
                          <div className="flex justify-between mb-1">
                            <span className="text-muted-foreground">Available shares</span>
                            <span className="font-mono text-dnipro-300">
                              {(userPosition.shares / 1e6).toFixed(4)} {selectedAdapter.shareSymbol}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Estimated value</span>
                            <span className="text-green-400">{formatUsdc(userPosition.currentValue / 1e6)}</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Shares to redeem
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              value={withdrawShares}
                              onChange={e => setWithdrawShares(e.target.value)}
                              placeholder="0.00"
                              min="0"
                              className="w-full bg-secondary/40 border border-border rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-dnipro-500/50 transition-all"
                            />
                            <button
                              onClick={() => setWithdrawShares((userPosition.shares / 1e6).toString())}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-dnipro-400 hover:text-dnipro-300"
                            >
                              MAX
                            </button>
                          </div>
                        </div>

                        {selectedAdapter.withdrawalDelay && (
                          <div className="flex items-start gap-2 text-xs text-yellow-400 bg-yellow-400/5 border border-yellow-400/20 rounded-xl p-3">
                            <Clock className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                            <span>
                              Withdrawal will be queued. You can claim after{' '}
                              <strong>{selectedAdapter.withdrawalDelay}</strong>.
                            </span>
                          </div>
                        )}

                        {txResult?.type === 'withdraw' && (
                          <div className="flex items-start gap-2 text-xs text-green-400 bg-green-400/5 border border-green-400/20 rounded-xl p-3">
                            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                            <span>
                              {selectedAdapter.withdrawalDelay ? 'Withdrawal queued!' : 'Withdrawal confirmed!'}{' '}
                              <a href={`https://solscan.io/tx/${txResult.sig}`} target="_blank" rel="noopener noreferrer" className="underline">
                                View on Solscan ↗
                              </a>
                            </span>
                          </div>
                        )}

                        <button
                          onClick={handleWithdraw}
                          disabled={isProcessing}
                          className={cn(
                            'w-full rounded-xl py-3.5 text-sm font-semibold transition-all flex items-center justify-center gap-2',
                            isProcessing
                              ? 'bg-secondary text-muted-foreground/40 cursor-not-allowed'
                              : 'bg-secondary text-foreground hover:bg-secondary/60 border border-border hover:border-dnipro-400/40'
                          )}
                        >
                          {isProcessing ? (
                            <><Loader2 className="h-4 w-4 animate-spin" /> Processing…</>
                          ) : selectedAdapter.withdrawalDelay ? (
                            <><Clock className="h-4 w-4" /> Queue Withdrawal</>
                          ) : (
                            <><ArrowUpFromLine className="h-4 w-4" /> Withdraw USDC</>
                          )}
                        </button>
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <IconEmpty size={36} className="mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">No position to withdraw from</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
