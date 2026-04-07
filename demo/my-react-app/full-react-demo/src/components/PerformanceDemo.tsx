// ============================================================
// 8️⃣  PerformanceDemo — memo, useMemo, useCallback
// ============================================================
// Topics from the notes:
//   • React.memo — skip re-rendering when props haven't changed
//   • useMemo — cache an expensive calculation result
//   • useCallback — cache a function reference
//   • Why these matter for list-heavy or computation-heavy UIs
// ============================================================

import React, { useState, useMemo, useCallback, memo } from 'react';

// Child that logs every render
let childRenderCount = 0;
const ExpensiveChild = memo<{ items: string[]; onItemClick: (item: string) => void }>(
  ({ items, onItemClick }) => {
    childRenderCount++;
    return (
      <div className="child-box">
        <p className="explanation">ExpensiveChild rendered <strong>{childRenderCount}</strong> times</p>
        <ul>
          {items.map(item => (
            <li key={item}>
              <button className="btn btn-small" onClick={() => onItemClick(item)}>{item}</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

const PerformanceDemo: React.FC = () => {
  const [count, setCount] = useState(0);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Without useMemo, this array would be recreated every render,
  // which would cause ExpensiveChild (wrapped with memo) to re-render
  // because it receives a new array reference each time.
  const items = useMemo(() => ['React', 'TypeScript', 'Vite', 'Node.js', 'Express'], []);

  // Without useCallback, this function would be recreated every render,
  // defeating memo on the child because it sees a new prop reference.
  const handleItemClick = useCallback((item: string) => {
    setSelectedItem(item);
  }, []);

  // Expensive computation cached with useMemo
  const fibonacci = useMemo(() => {
    const fib = (n: number): number => (n <= 1 ? n : fib(n - 1) + fib(n - 2));
    return fib(count > 35 ? 35 : count); // cap to avoid freezing
  }, [count]);

  return (
    <div>
      <h2>8. Performance (memo, useMemo, useCallback)</h2>

      <section className="demo-card">
        <h3>React.memo — Prevent Unnecessary Child Re-renders</h3>
        <p className="explanation">
          Increment the counter below. Notice that <strong>ExpensiveChild</strong>
          does NOT re-render — its props haven't changed because we stabilised
          them with <code>useMemo</code> and <code>useCallback</code>.
        </p>
        <p>Parent count: <strong>{count}</strong></p>
        <button className="btn btn-primary" onClick={() => setCount(prev => prev + 1)}>
          Increment Parent
        </button>
        <ExpensiveChild items={items} onItemClick={handleItemClick} />
        {selectedItem && <p>Last clicked: <strong>{selectedItem}</strong></p>}
      </section>

      <section className="demo-card">
        <h3>useMemo — Cache Expensive Calculations</h3>
        <p className="explanation">
          Fibonacci of <strong>{count}</strong> = <strong>{fibonacci}</strong>.
          The calculation only re-runs when <code>count</code> changes,
          not on every render triggered by other state.
        </p>
      </section>

      <section className="demo-card without-card">
        <h3>⚠️ What Would Happen Without These Features?</h3>
        <ul>
          <li>
            <strong>Without React.memo:</strong> Every child component
            re-renders whenever its parent re-renders — even if none of its
            props changed. In a list of 1 000 items, clicking a counter
            would re-render all 1 000 items needlessly.
          </li>
          <li>
            <strong>Without useMemo:</strong> Expensive computations (like
            filtering a large dataset or computing Fibonacci) would re-run
            on every single render, making the UI sluggish.
          </li>
          <li>
            <strong>Without useCallback:</strong> Function props would be
            new references every render, making <code>React.memo</code>
            useless — the child would still re-render because it thinks it
            received a new function.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default PerformanceDemo;
