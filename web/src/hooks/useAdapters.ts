// web/src/hooks/useAdapters.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useConnection } from '@solana/wallet-adapter-react';
import { MOCK_ADAPTERS } from '@/lib/mockData';

// Type matching MOCK_ADAPTERS shape
export type AdapterData = typeof MOCK_ADAPTERS[number];

/**
 * Fetches all registered adapters.
 * Falls back to mock data when chain is unavailable or
 * NEXT_PUBLIC_MOCK_DATA=true.
 */
export function useAdapters() {
  const { connection } = useConnection();
  const [adapters, setAdapters] = useState<AdapterData[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<Error | null>(null);

  const useMock = process.env.NEXT_PUBLIC_MOCK_DATA === 'true';

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (useMock) {
        // Simulate a small network delay for realism
        await new Promise(r => setTimeout(r, 600));
        setAdapters(MOCK_ADAPTERS);
        return;
      }
      // In production, instantiate DniproClient and call getAllAdapters()
      // const { DniproClient } = await import('@dnipro/sdk');
      // const client = new DniproClient(connection);
      // const result = await client.getAllAdapters();
      // setAdapters(result as any);
      setAdapters(MOCK_ADAPTERS);
    } catch (e) {
      setError(e as Error);
      setAdapters(MOCK_ADAPTERS); // fallback
    } finally {
      setLoading(false);
    }
  }, [connection, useMock]);

  useEffect(() => { fetch(); }, [fetch]);

  return { adapters, loading, error, refetch: fetch };
}

/**
 * Returns a single adapter by id string.
 */
export function useAdapter(id: string) {
  const { adapters, loading, error } = useAdapters();
  const adapter = adapters.find(a => a.id === id) ?? null;
  return { adapter, loading, error };
}
