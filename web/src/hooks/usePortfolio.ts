// web/src/hooks/usePortfolio.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { MOCK_POSITIONS, PORTFOLIO_SUMMARY, MOCK_ADAPTERS } from '@/lib/mockData';

export type PositionData = typeof MOCK_POSITIONS[number] & {
  adapter: typeof MOCK_ADAPTERS[number] | undefined;
};

export interface PortfolioSummary {
  positions: PositionData[];
  totalDeposited: number;
  totalValue: number;
  totalPnl: number;
  pnlPercent: string;
  positionCount: number;
}

export function usePortfolio() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [portfolio, setPortfolio] = useState<PortfolioSummary | null>(null);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<Error | null>(null);

  const useMock = process.env.NEXT_PUBLIC_MOCK_DATA === 'true';

  const fetch = useCallback(async () => {
    if (!connected || !publicKey) {
      setPortfolio(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await new Promise(r => setTimeout(r, 800));

      if (useMock) {
        const positions: PositionData[] = MOCK_POSITIONS.map(p => ({
          ...p,
          adapter: MOCK_ADAPTERS.find(a => a.id === p.adapterId),
        }));

        setPortfolio({
          positions,
          totalDeposited: PORTFOLIO_SUMMARY.totalDeposited,
          totalValue:     PORTFOLIO_SUMMARY.totalValue,
          totalPnl:       PORTFOLIO_SUMMARY.totalPnl,
          pnlPercent:     PORTFOLIO_SUMMARY.pnlPercent,
          positionCount:  positions.length,
        });
        return;
      }

      // Production: use DniproClient.getPortfolioSummary(publicKey)
      setPortfolio(null);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  }, [publicKey, connected, connection, useMock]);

  useEffect(() => { fetch(); }, [fetch]);

  return { portfolio, loading, error, refetch: fetch };
}
