// web/src/hooks/useTransaction.ts
'use client';

import { useState, useCallback } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

export type TxStatus = 'idle' | 'building' | 'signing' | 'confirming' | 'success' | 'error';

export interface TxState {
  status: TxStatus;
  signature: string | null;
  error: string | null;
}

/**
 * Generic hook for building, signing, and confirming a Solana transaction.
 * Wraps the wallet adapter send flow with clear status states.
 */
export function useTransaction() {
  const { sendTransaction } = useWallet();
  const { connection }      = useConnection();

  const [state, setState] = useState<TxState>({
    status:    'idle',
    signature: null,
    error:     null,
  });

  const reset = useCallback(() => {
    setState({ status: 'idle', signature: null, error: null });
  }, []);

  /**
   * Execute a transaction builder function.
   * The builder receives the current publicKey and returns a Transaction.
   */
  const execute = useCallback(
    async (
      buildTx: () => Promise<import('@solana/web3.js').Transaction>
    ) => {
      setState({ status: 'building', signature: null, error: null });

      try {
        const tx = await buildTx();

        setState(s => ({ ...s, status: 'signing' }));

        const sig = await sendTransaction(tx, connection, {
          skipPreflight: false,
          preflightCommitment: 'confirmed',
        });

        setState(s => ({ ...s, status: 'confirming', signature: sig }));

        await connection.confirmTransaction(sig, 'confirmed');

        setState({ status: 'success', signature: sig, error: null });
        return sig;
      } catch (err: any) {
        const msg = err?.message ?? String(err);
        setState({ status: 'error', signature: null, error: msg });
        throw err;
      }
    },
    [sendTransaction, connection]
  );

  /**
   * Simulate (no send) — used for dry-run deposit/withdraw previews.
   * Returns after a short delay with a fake signature for demo purposes.
   */
  const simulate = useCallback(async () => {
    setState({ status: 'building', signature: null, error: null });
    await new Promise(r => setTimeout(r, 1200));
    const fakeSig = Array.from(
      { length: 64 },
      () => '0123456789abcdef'[Math.floor(Math.random() * 16)]
    ).join('');
    setState({ status: 'success', signature: fakeSig, error: null });
    return fakeSig;
  }, []);

  return { state, execute, simulate, reset };
}

// Status helpers
export const isBusy   = (s: TxStatus) => ['building','signing','confirming'].includes(s);
export const isDone   = (s: TxStatus) => s === 'success' || s === 'error';
export const statusLabel: Record<TxStatus, string> = {
  idle:       'Ready',
  building:   'Building transaction…',
  signing:    'Sign in wallet…',
  confirming: 'Confirming on-chain…',
  success:    'Confirmed!',
  error:      'Transaction failed',
};
