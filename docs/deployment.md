# Dnipro Deployment Guide

Complete guide for deploying the Dnipro protocol to mainnet.

## Prerequisites

| Tool | Version | Install |
|---|---|---|
| Rust | 1.79+ | `rustup update` |
| Solana CLI | 2.2.20 | [docs.solana.com](https://docs.solana.com/cli/install-solana-cli-tools) |
| Anchor CLI | 0.31.1 | `cargo install --git https://github.com/coral-xyz/anchor anchor-cli --tag v0.31.1` |
| Node.js | 18+ | [nodejs.org](https://nodejs.org) |
| Yarn | 1.22+ | `npm install -g yarn` |

## Step 1: Environment Setup

```bash
# Clone the repository
git clone https://github.com/dnipro-finance/dnipro
cd dnipro

# Install Node.js dependencies
yarn install

# Verify Solana CLI
solana --version   # should be 2.2.20
anchor --version   # should be 0.31.1

# Configure Solana for mainnet (or devnet for testing)
solana config set --url mainnet-beta
solana config set --keypair ~/.config/solana/id.json

# Check your balance
solana balance
# You need ~3-5 SOL for deployment (program accounts, PDAs)
```

## Step 2: Build All Programs

```bash
# Build all 7 programs (dispatcher + registry + 5 adapters)
anchor build

# Verify build succeeded
ls -la target/deploy/
# Should show: dispatcher.so, registry.so, kamino_adapter.so, etc.
```

## Step 3: Deploy to Devnet First

Always test on devnet before mainnet.

```bash
# Switch to devnet
solana config set --url devnet
solana airdrop 5  # get devnet SOL

# Deploy all programs
anchor deploy --provider.cluster devnet

# Note the program IDs from output:
# Deploying workspace: https://api.devnet.solana.com
# Upgrade authority: <your-wallet>
# Deploying program "dispatcher"...
# Program Id: <DISPATCHER_PROGRAM_ID>
# ...

# Update Anchor.toml with real program IDs:
# [programs.devnet]
# dispatcher = "<DISPATCHER_PROGRAM_ID>"
# registry   = "<REGISTRY_PROGRAM_ID>"
# ...
```

## Step 4: Initialize Programs

```bash
# Initialize the Dispatcher and Registry
ts-node scripts/initialize.ts --cluster devnet

# Expected output:
# ✅ Registry initialized: <REGISTRY_PROGRAM_ID>
# ✅ Dispatcher initialized: <DISPATCHER_PROGRAM_ID>
# Fee: 0.30% (30 bps)
```

## Step 5: Register Adapters

```bash
# Register each adapter in sequence
ts-node scripts/register-adapter.ts --adapter kamino   --cluster devnet
ts-node scripts/register-adapter.ts --adapter marginfi --cluster devnet
ts-node scripts/register-adapter.ts --adapter jupiter  --cluster devnet
ts-node scripts/register-adapter.ts --adapter maple    --cluster devnet
ts-node scripts/register-adapter.ts --adapter drift    --cluster devnet

# Verify registration
ts-node -e "
const { DniproClient } = require('./sdk/dist');
const { Connection } = require('@solana/web3.js');
const client = new DniproClient(new Connection('https://api.devnet.solana.com'));
client.getAllAdapters().then(a => console.log(a.length + ' adapters registered'));
"
```

## Step 6: Run Integration Tests

```bash
# Run full test suite against devnet
ANCHOR_PROVIDER_URL=https://api.devnet.solana.com \
ANCHOR_WALLET=~/.config/solana/id.json \
anchor test --skip-local-validator

# All tests should pass before proceeding to mainnet
```

## Step 7: Mainnet Deployment

```bash
# Switch to mainnet
solana config set --url mainnet-beta

# Deploy (costs ~1-2 SOL per program)
anchor deploy --provider.cluster mainnet-beta

# Initialize mainnet programs
ts-node scripts/initialize.ts --cluster mainnet-beta

# Register adapters
for adapter in kamino marginfi jupiter maple drift; do
  ts-node scripts/register-adapter.ts --adapter $adapter --cluster mainnet-beta
done
```

## Step 8: Deploy the Web App

```bash
# Install Vercel CLI
npm install -g vercel

# Set up environment variables
vercel env add NEXT_PUBLIC_RPC_URL
# Enter: https://api.mainnet-beta.solana.com (or your dedicated RPC)
# Select: Production, Preview, Development

vercel env add NEXT_PUBLIC_NETWORK
# Enter: mainnet-beta

vercel env add NEXT_PUBLIC_MOCK_DATA
# Enter: false (use real chain data)

# Deploy to Vercel
cd web
vercel --prod

# Your app is now live at: https://dnipro.vercel.app
```

## Step 9: Verify Deployment

```bash
# Check all programs are initialized
ts-node -e "
const { DniproClient } = require('./sdk/dist');
const { Connection } = require('@solana/web3.js');
const client = new DniproClient(new Connection('https://api.mainnet-beta.solana.com'));

async function verify() {
  const config = await client.getDispatcherConfig();
  console.log('Dispatcher:', config ? '✅' : '❌');
  const registry = await client.getRegistryConfig();
  console.log('Registry:',   registry ? '✅' : '❌');
  const adapters = await client.getAllAdapters();
  console.log('Adapters:   ' + adapters.length + '/5 ✅');
}

verify();
"
```

---

## Program Upgrade Policy

Anchor programs can be upgraded by the upgrade authority. For security:

1. Transfer upgrade authority to the governance multisig after deployment
2. All future upgrades require governance approval + timelock
3. Emergency upgrades require 2/3 multisig signatures

```bash
# Transfer upgrade authority to multisig
solana program set-upgrade-authority <PROGRAM_ID> \
  --new-upgrade-authority <MULTISIG_ADDRESS>
```

---

## Monitoring

### On-chain events
Subscribe to Dispatcher events via WebSocket:
```typescript
connection.onLogs(DISPATCHER_PROGRAM_ID, (logs) => {
  if (logs.logs.some(l => l.includes('DepositEvent'))) {
    console.log('New deposit:', logs.signature);
  }
});
```

### Health check endpoint
The web app exposes `/api/health` which verifies:
- RPC connectivity
- Dispatcher config PDA readable
- Registry config PDA readable

---

## Costs Estimate

| Item | Cost (SOL) |
|---|---|
| Dispatcher program deploy | ~1.0 |
| Registry program deploy | ~0.8 |
| 5× Adapter program deploy | ~3.5 |
| Program initialization | ~0.05 |
| Adapter registration (5×) | ~0.1 |
| **Total** | **~5.5 SOL** |

At current prices (~$150/SOL) ≈ $825 total deployment cost.
