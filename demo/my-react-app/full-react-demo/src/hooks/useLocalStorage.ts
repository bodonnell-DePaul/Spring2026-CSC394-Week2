// ============================================================
// useLocalStorage — Custom Hook for Persistent State
// ============================================================
// WHAT THIS DOES:
//   Works exactly like useState but also saves & restores the
//   value in localStorage, so it persists across page reloads.
//
// WITHOUT THIS:
//   Every component that needs persistence would manually call
//   localStorage.getItem / setItem with JSON parse/stringify,
//   duplicating the same try/catch logic everywhere. User
//   preferences, theme choices, etc. would be lost on refresh.
// ============================================================

import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Lazy initial state — the function only runs once on mount
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}
