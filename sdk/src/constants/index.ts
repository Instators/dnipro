// sdk/src/constants/index.ts
import { PublicKey } from '@solana/web3.js';

// ── Program IDs ──────────────────────────────────────────────────────────────

export const DISPATCHER_PROGRAM_ID = new PublicKey(
  'DniproDispatcher1111111111111111111111111111'
);

export const REGISTRY_PROGRAM_ID = new PublicKey(
  'DniproRegistry11111111111111111111111111111'
);

// ── Adapter Program IDs ───────────────────────────────────────────────────────

export const ADAPTER_PROGRAM_IDS = {
  kamino:   new PublicKey('DniproKamino111111111111111111111111111111'),
  marginfi: new PublicKey('DniproMarginFi1111111111111111111111111111'),
  jupiter:  new PublicKey('DniproJupiter11111111111111111111111111111'),
  maple:    new PublicKey('DniproMaple111111111111111111111111111111'),
  drift:    new PublicKey('DniproDrift111111111111111111111111111111'),
} as const;

// ── Token Mints (mainnet) ────────────────────────────────────────────────────

export const USDC_MINT = new PublicKey(
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
);

export const USDT_MINT = new PublicKey(
  'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'
);

// ── PDA Seeds ─────────────────────────────────────────────────────────────────

export const SEEDS = {
  DISPATCHER_CONFIG: Buffer.from('dispatcher_config'),
  REGISTRY_CONFIG: Buffer.from('registry_config'),
  POSITION: Buffer.from('position'),
  ADAPTER: Buffer.from('adapter'),
  PROPOSAL: Buffer.from('proposal'),
} as const;

// ── Protocol constants ────────────────────────────────────────────────────────

export const BPS_DENOMINATOR = 10_000;
export const LAMPORTS_PER_SOL = 1_000_000_000;
export const USDC_DECIMALS = 6;
export const USDC_BASE = 10 ** USDC_DECIMALS;

// ── Adapter metadata ──────────────────────────────────────────────────────────

export const ADAPTER_METADATA = {
  kamino: {
    name: 'Kamino USDC',
    protocol: 'kamino',
    description: 'Earn lending yield on USDC via Kamino Finance. kUSDC auto-compounds.',
    website: 'https://kamino.finance',
    docs: 'https://docs.kamino.finance',
    riskScore: 20,
    withdrawalDelay: null,
    auditUrl: 'https://docs.kamino.finance/security',
  },
  marginfi: {
    name: 'MarginFi USDC',
    protocol: 'marginfi',
    description: 'Deposit USDC into MarginFi lending pools. Earn from leveraged trader borrowing.',
    website: 'https://app.marginfi.com',
    docs: 'https://docs.marginfi.com',
    riskScore: 25,
    withdrawalDelay: null,
    auditUrl: 'https://docs.marginfi.com/security',
  },
  jupiter: {
    name: 'Jupiter LP (JLP)',
    protocol: 'jupiter',
    description: 'Provide liquidity to Jupiter Perpetuals pool. Earn trading fees + funding rates.',
    website: 'https://jup.ag/perps',
    docs: 'https://station.jup.ag/docs/perpetual-exchange/jlp',
    riskScore: 40,
    withdrawalDelay: null,
    auditUrl: 'https://station.jup.ag/docs/security',
  },
  maple: {
    name: 'Maple Syrup',
    protocol: 'maple',
    description: 'Private credit lending to institutional borrowers. Higher yield, 7-day withdrawal.',
    website: 'https://maple.finance',
    docs: 'https://maplefinance.gitbook.io',
    riskScore: 55,
    withdrawalDelay: '7 days',
    auditUrl: 'https://maple.finance/security',
  },
  drift: {
    name: 'Drift Insurance Fund',
    protocol: 'drift',
    description: 'Stake USDC as insurance backstop. Earn liquidation fees. 14-day unstake period.',
    website: 'https://drift.trade',
    docs: 'https://docs.drift.trade/insurance-fund',
    riskScore: 45,
    withdrawalDelay: '14 days',
    auditUrl: 'https://docs.drift.trade/security',
  },
} as const;
