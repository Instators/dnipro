// web/src/components/layout/Providers.tsx
'use client';

import { useMemo } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { clusterApiUrl } from '@solana/web3.js';

require('@solana/wallet-adapter-react-ui/styles.css');

// Workaround: @solana/wallet-adapter-* packages are typed against React 18's
// FunctionComponent, which is incompatible with @types/react 18.3+/19's
// expanded ReactNode (which now includes Promise<ReactNode> for RSC support).
// Untyped `any` aliases sidestep the mismatch without affecting runtime behavior.
const ConnectionProviderFixed: any = ConnectionProvider;
const WalletProviderFixed: any = WalletProvider;
const WalletModalProviderFixed: any = WalletModalProvider;

export function Providers({ children }: { children: React.ReactNode }) {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(
    () => process.env.NEXT_PUBLIC_RPC_URL ?? clusterApiUrl(network),
    [network]
  );
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    []
  );

  return (
    <ConnectionProviderFixed endpoint={endpoint}>
      <WalletProviderFixed wallets={wallets} autoConnect>
        <WalletModalProviderFixed>{children}</WalletModalProviderFixed>
      </WalletProviderFixed>
    </ConnectionProviderFixed>
  );
}