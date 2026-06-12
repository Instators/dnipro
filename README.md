# ⚡ Dnipro: Universal Yield Adapter Standard

> One interface. Every yield protocol on Solana built for SuperteamUkraine.

Dnipro is an open-source, governance-gated yield routing layer that lets users deposit into Kamino, MarginFi, Jupiter LP, Maple, and Drift through a single unified on-chain dispatcher.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Anchor](https://img.shields.io/badge/Anchor-0.31.1-purple)](https://anchor-lang.com)
[![Solana](https://img.shields.io/badge/Solana-2.2.20-green)](https://solana.com)

---

## Architecture

```
User Wallet / Dashboard / CLI
         │
         ▼
  ┌──────────────────┐     ┌──────────────────┐
  │   Dispatcher     │────▶│    Registry       │
  │ deposit()        │     │ AdapterRecord PDAs│
  │ withdraw()       │     │ Governance        │
  │ current_value()  │     │ Timelock          │
  └────────┬─────────┘     └──────────────────┘
           │ CPI
    ┌──────┴──────────────────────────┐
    │         Adapter Layer           │
    │ Kamino · MarginFi · Jupiter     │
    │ Maple · Drift                   │
    └─────────────────────────────────┘
```

## Quick Start

```bash
# Clone
git clone https://github.com/dnipro-finance/dnipro && cd dnipro
yarn install

# Build Rust programs
anchor build

# Run tests
anchor test

# Start web app
cp .env.example web/.env.local
yarn dev
```

## Programs

- **Dispatcher** (`programs/dispatcher/`) — deposit, withdraw, current_value
- **Registry** (`programs/registry/`) — governance-gated adapter catalog
- **Adapters** — Kamino, MarginFi, Jupiter LP, Maple Syrup, Drift Insurance Fund

## SDK

```typescript
import { DniproClient, ADAPTER_PROGRAM_IDS, usdcToAtomics } from '@dnipro/sdk';

const client = new DniproClient(connection);
const adapters = await client.getActiveAdapters();
const portfolio = await client.getPortfolioSummary(wallet.publicKey);

const tx = client.buildDepositTransaction({
  user: wallet.publicKey,
  adapterProgramId: ADAPTER_PROGRAM_IDS.kamino,
  underlyingMint: USDC_MINT,
  adapterVault: vaultAccount,
  feeRecipientAccount: feeAccount,
  deposit: { amount: usdcToAtomics(1000) },
});
```

## CLI

```bash
npm install -g @dnipro/cli
dnipro generate my-protocol   # Scaffold new adapter
dnipro list                   # List all adapters
dnipro inspect kamino         # Adapter details
dnipro portfolio <wallet>     # Your positions
```

## Adapters

| Adapter | APY | Unlock |
|---|---|---|
| Kamino USDC | ~8.2% | Instant |
| MarginFi USDC | ~7.5% | Instant |
| Jupiter LP | ~18.4% | Instant |
| Maple Syrup | ~12.5% | 7 days |
| Drift Insurance Fund | ~9.6% | 14 days |

## Deployment

```bash
# Vercel
vercel env add NEXT_PUBLIC_RPC_URL
vercel --prod
```

## License
MIT © 2024 Dnipro Protocol, Built for SuperteamUkraine.
