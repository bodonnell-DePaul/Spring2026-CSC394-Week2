// ============================================================
// 4️⃣  EventsDemo — React Event Handling
// ============================================================
// Topics from the notes:
//   • React synthetic event system
//   • Mouse events (onClick, onDoubleClick)
//   • Keyboard events (onKeyDown)
//   • Form events (onSubmit)
//   • Input change events (onChange)
//   • e.preventDefault() — stopping default browser behaviour
//   • Event handler typing (React.MouseEvent, etc.)
// ============================================================

import React, { useState } from 'react';

const EventsDemo: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [clickCount, setClickCount] = useState(0);

  const log = (msg: string) => {
    setLogs(prev => [`${new Date().toLocaleTimeString()} — ${msg}`, ...prev].slice(0, 20));
  };

  // Mouse events
  const handleClick = (_e: React.MouseEvent<HTMLButtonElement>) => {
    setClickCount(prev => prev + 1);
    log('Button clicked!');
  };

  const handleDoubleClick = () => {
    log('Button double-clicked!');
  };

  // Keyboard event
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      log(`Enter pressed! Value: "${e.currentTarget.value}"`);
    }
  };

  // Form submit with preventDefault
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ← Prevents the browser from reloading the page
    const formData = new FormData(e.currentTarget);
    log(`Form submitted with: "${formData.get('demo-input')}"`);
  };

  // onChange for live tracking
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    log(`Input changed: "${e.target.value}"`);
  };

  // Prevented link navigation
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    log('Link click intercepted — navigation prevented');
  };

  // Prevented context menu
  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    log('Right-click intercepted — context menu prevented');
  };

  return (
    <div>
      <h2>4. Event Handling</h2>

      {/* Mouse events */}
      <section className="demo-card">
        <h3>Mouse Events</h3>
        <div className="flex-row">
          <button className="btn btn-primary" onClick={handleClick}>
            Click Me ({clickCount})
          </button>
          <button className="btn" onDoubleClick={handleDoubleClick}>
            Double-Click Me
          </button>
        </div>
      </section>

      {/* Keyboard events */}
      <section className="demo-card">
        <h3>Keyboard Events</h3>
        <input
          type="text"
          placeholder="Type and press Enter…"
          onKeyDown={handleKeyDown}
          style={{ width: '100%' }}
        />
      </section>

      {/* Form with preventDefault */}
      <section className="demo-card">
        <h3>Form Submit &amp; preventDefault()</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="flex-row">
            <input
              name="demo-input"
              type="text"
              placeholder="Type something…"
              onChange={handleInputChange}
            />
            <button className="btn btn-primary" type="submit">Submit</button>
          </div>
        </form>
      </section>

      {/* preventDefault examples */}
      <section className="demo-card">
        <h3>Other preventDefault() Uses</h3>
        <div className="flex-row" style={{ alignItems: 'center' }}>
          <a href="https://example.com" onClick={handleLinkClick} style={{ marginRight: 16 }}>
            Click this link (navigation prevented)
          </a>
          <div
            onContextMenu={handleRightClick}
            style={{
              padding: '12px 20px',
              background: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            Right-click me (custom menu)
          </div>
        </div>
      </section>

      {/* Event log */}
      <section className="demo-card">
        <h3>Event Log</h3>
        <div className="log-box" style={{ maxHeight: 200, overflowY: 'auto' }}>
          {logs.length === 0
            ? <p style={{ color: '#9ca3af' }}>Interact with the controls above…</p>
            : logs.map((entry, i) => <div key={i}>{entry}</div>)
          }
        </div>
        <button className="btn btn-small" onClick={() => setLogs([])}>Clear</button>
      </section>

      <section className="demo-card without-card">
        <h3>⚠️ What Would Happen Without These Features?</h3>
        <ul>
          <li>
            <strong>Without React's synthetic events:</strong> You'd deal with
            raw DOM events that behave differently across browsers. React
            normalises them so <code>e.target</code>, <code>e.key</code>,
            etc. work identically in Chrome, Firefox, and Safari.
          </li>
          <li>
            <strong>Without preventDefault():</strong> Submitting a form
            would <em>reload the entire page</em>, losing all React state.
            Clicking an anchor would navigate away. Right-clicking would
            always open a browser context menu — you couldn't build custom
            interactions.
          </li>
          <li>
            <strong>Without event typing (React.MouseEvent, etc.):</strong>{' '}
            TypeScript wouldn't know what properties the event has. You'd
            lose autocomplete for <code>e.target.value</code>,
            <code>e.key</code>, etc., and runtime crashes from accessing
            non-existent properties would go undetected.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default EventsDemo;
