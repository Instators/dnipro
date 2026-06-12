// web/src/lib/mockData.ts
// Static mock data for adapters — used in UI when chain is unavailable.

export const MOCK_ADAPTERS = [
  {
    id: 'kamino',
    programId: 'DniproKamino111111111111111111111111111111',
    name: 'Kamino USDC',
    protocol: 'kamino',
    description: 'Earn lending yield on USDC via Kamino Finance automated strategies. kUSDC receipt tokens auto-compound your position.',
    underlyingMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    underlyingSymbol: 'USDC',
    category: 0,
    categoryLabel: 'Lending',
    apyBps: 820,
    apyPercent: '8.20%',
    tvlFormatted: '$47.3M',
    tvlRaw: 47_300_000,
    isActive: true,
    depositsPaused: false,
    minDeposit: 1_000_000,       // 1 USDC
    maxDeposit: 0,
    riskScore: 20,
    riskLabel: 'Low' as const,
    withdrawalDelay: null,
    website: 'https://kamino.finance',
    docs: 'https://docs.kamino.finance',
    auditUrl: 'https://docs.kamino.finance/security',
    shareSymbol: 'kUSDC',
    exchangeRateBps: 10_412,     // 4.12% gain since inception
    icon: 'K', // ProtocolMark letter
  },
  {
    id: 'marginfi',
    programId: 'DniproMarginFi1111111111111111111111111111',
    name: 'MarginFi USDC',
    protocol: 'marginfi',
    description: 'Deposit USDC into MarginFi v2 lending pools and earn yield from leveraged trader borrowing.',
    underlyingMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    underlyingSymbol: 'USDC',
    category: 0,
    categoryLabel: 'Lending',
    apyBps: 750,
    apyPercent: '7.50%',
    tvlFormatted: '$31.8M',
    tvlRaw: 31_800_000,
    isActive: true,
    depositsPaused: false,
    minDeposit: 1_000_000,
    maxDeposit: 0,
    riskScore: 25,
    riskLabel: 'Low' as const,
    withdrawalDelay: null,
    website: 'https://app.marginfi.com',
    docs: 'https://docs.marginfi.com',
    auditUrl: 'https://docs.marginfi.com/security',
    shareSymbol: 'mfUSDC',
    exchangeRateBps: 10_380,
    icon: 'M', // ProtocolMark letter
  },
  {
    id: 'jupiter',
    programId: 'DniproJupiter11111111111111111111111111111',
    name: 'Jupiter LP (JLP)',
    protocol: 'jupiter',
    description: 'Provide USDC liquidity to Jupiter Perpetuals. Earn a share of trading fees and funding rates from leveraged positions.',
    underlyingMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    underlyingSymbol: 'USDC',
    category: 1,
    categoryLabel: 'Liquidity',
    apyBps: 1840,
    apyPercent: '18.40%',
    tvlFormatted: '$892.1M',
    tvlRaw: 892_100_000,
    isActive: true,
    depositsPaused: false,
    minDeposit: 1_000_000,
    maxDeposit: 0,
    riskScore: 40,
    riskLabel: 'Medium' as const,
    withdrawalDelay: null,
    website: 'https://jup.ag/perps',
    docs: 'https://station.jup.ag/docs/perpetual-exchange/jlp',
    auditUrl: 'https://station.jup.ag/docs/security',
    shareSymbol: 'JLP',
    exchangeRateBps: 11_840,
    icon: 'J', // ProtocolMark letter
  },
  {
    id: 'maple',
    programId: 'DniproMaple111111111111111111111111111111',
    name: 'Maple Syrup',
    protocol: 'maple',
    description: 'Real-world asset lending to institutional borrowers via Maple Finance. Higher yields with a 7-day withdrawal queue.',
    underlyingMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    underlyingSymbol: 'USDC',
    category: 2,
    categoryLabel: 'Real World Asset',
    apyBps: 1250,
    apyPercent: '12.50%',
    tvlFormatted: '$24.6M',
    tvlRaw: 24_600_000,
    isActive: true,
    depositsPaused: false,
    minDeposit: 100_000_000,     // 100 USDC min
    maxDeposit: 0,
    riskScore: 55,
    riskLabel: 'Medium' as const,
    withdrawalDelay: '7 days',
    website: 'https://maple.finance',
    docs: 'https://maplefinance.gitbook.io',
    auditUrl: 'https://maple.finance/security',
    shareSymbol: 'syrupUSDC',
    exchangeRateBps: 10_620,
    icon: 'S', // ProtocolMark letter (Syrup)
  },
  {
    id: 'drift',
    programId: 'DniproDrift111111111111111111111111111111',
    name: 'Drift Insurance Fund',
    protocol: 'drift',
    description: 'Stake USDC as the backstop for Drift Protocol\'s insurance fund. Earn liquidation fees and protocol revenue. 14-day unstake cooldown.',
    underlyingMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    underlyingSymbol: 'USDC',
    category: 3,
    categoryLabel: 'Insurance',
    apyBps: 960,
    apyPercent: '9.60%',
    tvlFormatted: '$8.9M',
    tvlRaw: 8_900_000,
    isActive: true,
    depositsPaused: false,
    minDeposit: 1_000_000,
    maxDeposit: 0,
    riskScore: 45,
    riskLabel: 'Medium' as const,
    withdrawalDelay: '14 days',
    website: 'https://drift.trade',
    docs: 'https://docs.drift.trade/insurance-fund',
    auditUrl: 'https://docs.drift.trade/security',
    shareSymbol: 'IF-USDC',
    exchangeRateBps: 10_480,
    icon: 'D', // ProtocolMark letter
  },
];

export const MOCK_POSITIONS = [
  {
    adapterId: 'kamino',
    depositedAmount: 5_000_000_000,   // $5000
    shares: 4_802_110_000,
    currentValue: 5_206_500_000,      // $5206.50
    pnl: 206_500_000,
    pnlPercent: '+4.13%',
    openedAt: 1710000000,
    lastUpdatedAt: Date.now() / 1000,
  },
  {
    adapterId: 'jupiter',
    depositedAmount: 2_000_000_000,   // $2000
    shares: 169_169_000,
    currentValue: 2_368_000_000,      // $2368
    pnl: 368_000_000,
    pnlPercent: '+18.40%',
    openedAt: 1705000000,
    lastUpdatedAt: Date.now() / 1000,
  },
];

export const PORTFOLIO_SUMMARY = {
  totalDeposited: 7_000_000_000,
  totalValue: 7_574_500_000,
  totalPnl: 574_500_000,
  pnlPercent: '+8.21%',
};

// APY history for charts (last 30 days)
export function generateApyHistory(baseBps: number, days = 30) {
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - (days - i) * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    apy: (baseBps + Math.sin(i * 0.4) * 50 + (Math.random() - 0.5) * 30) / 100,
  }));
}
