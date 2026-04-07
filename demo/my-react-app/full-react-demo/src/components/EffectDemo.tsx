// ============================================================
// 5️⃣  EffectDemo — useEffect Hook
// ============================================================
// Topics from the notes:
//   • useEffect(() => { ... })           — runs every render
//   • useEffect(() => { ... }, [])       — runs once on mount
//   • useEffect(() => { ... }, [dep])    — runs when dep changes
//   • Cleanup functions (return () => …) — prevent memory leaks
//   • Updating document.title as a side effect
//   • Window resize listener with cleanup
// ============================================================

import React, { useState, useEffect } from 'react';

const EffectDemo: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [renderCount, setRenderCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  // ----- Effect: runs every render (no dependency array) -----
  useEffect(() => {
    setRenderCount(prev => prev + 1);
  });

  // ----- Effect: runs when count changes -----
  useEffect(() => {
    document.title = `Count: ${count} | React Demo`;
  }, [count]);

  // ----- Effect: window resize with cleanup -----
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ----- Effect: interval timer with cleanup -----
  useEffect(() => {
    if (!timerRunning) return;

    const id = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Cleanup: clear the interval when the component unmounts
    // or when timerRunning changes to false
    return () => clearInterval(id);
  }, [timerRunning]);

  return (
    <div>
      <h2>5. useEffect Hook (Side Effects)</h2>

      {/* Runs on every render */}
      <section className="demo-card">
        <h3>Effect — Every Render (no deps)</h3>
        <p>This component has rendered <strong>{renderCount}</strong> times.</p>
        <p className="explanation">
          A <code>useEffect</code> with <em>no</em> dependency array runs
          after every render cycle.
        </p>
      </section>

      {/* Runs when count changes */}
      <section className="demo-card">
        <h3>Effect — Dependency Array [count]</h3>
        <p>Count: <strong>{count}</strong></p>
        <div className="flex-row">
          <button className="btn" onClick={() => setCount(prev => prev - 1)}>−1</button>
          <button className="btn btn-primary" onClick={() => setCount(prev => prev + 1)}>+1</button>
        </div>
        <p className="explanation">
          Check the browser tab title — it updates whenever <code>count</code> changes,
          thanks to <code>useEffect(() =&gt; ..., [count])</code>.
        </p>
      </section>

      {/* Window resize with cleanup */}
      <section className="demo-card">
        <h3>Effect — Resize Listener with Cleanup</h3>
        <p>Window width: <strong>{windowWidth}px</strong></p>
        <p className="explanation">
          Resize the browser window to see this update. The effect adds a
          <code> resize</code> listener on mount and <em>removes it on
          unmount</em> (the cleanup function) to prevent memory leaks.
        </p>
      </section>

      {/* Timer with cleanup */}
      <section className="demo-card">
        <h3>Effect — Interval Timer with Cleanup</h3>
        <p className="big-number">{seconds}s</p>
        <div className="flex-row">
          <button
            className={`btn ${timerRunning ? 'btn-danger' : 'btn-primary'}`}
            onClick={() => setTimerRunning(prev => !prev)}
          >
            {timerRunning ? 'Stop' : 'Start'}
          </button>
          <button className="btn" onClick={() => { setTimerRunning(false); setSeconds(0); }}>
            Reset
          </button>
        </div>
        <p className="explanation">
          When the timer is running, a <code>setInterval</code> ticks every
          second. The cleanup function (<code>clearInterval</code>) runs
          when the effect re-fires or when the component unmounts.
        </p>
      </section>

      <section className="demo-card without-card">
        <h3>⚠️ What Would Happen Without These Features?</h3>
        <ul>
          <li>
            <strong>Without useEffect:</strong> There would be no place to
            put code that should run "after render". Fetching data, setting
            up subscriptions, or updating the document title would need to
            go inside the render function — causing infinite loops or running
            at the wrong time.
          </li>
          <li>
            <strong>Without the dependency array:</strong> Effects would run
            after <em>every</em> render with no way to control when. An API
            call would fire on every keystroke, causing thousands of
            unnecessary network requests.
          </li>
          <li>
            <strong>Without cleanup functions:</strong> Event listeners and
            intervals would pile up every time the component re-renders.
            The <code>resize</code> handler would be added dozens of times,
            and intervals would keep ticking silently in the background —
            a classic <strong>memory leak</strong> that degrades performance
            and causes "setState on unmounted component" warnings.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default EffectDemo;
