// ============================================================
// useFetch — Custom Hook for Data Fetching
// ============================================================
// WHAT THIS DOES:
//   Encapsulates the fetch → loading → data/error cycle so every
//   component that needs remote data can reuse the same logic.
//
// WITHOUT THIS:
//   Every component that fetches data would duplicate the same
//   useState + useEffect + try/catch pattern. Bug fixes (e.g.
//   adding an AbortController) would need to be applied in
//   every copy. Custom hooks let you write it once.
// ============================================================

import { useState, useEffect } from 'react';

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}
