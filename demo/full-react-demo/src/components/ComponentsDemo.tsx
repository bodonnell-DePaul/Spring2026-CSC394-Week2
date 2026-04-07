// ============================================================
// 1️⃣  ComponentsDemo — Functional Components & TSX Fundamentals
// ============================================================
// Topics from the notes:
//   • Functional components (React.FC)
//   • TSX / JSX syntax
//   • Curly braces {} for embedding TypeScript expressions
//   • Single parent element rule (Fragments)
//   • Component composition (combining small components)
//   • Array rendering with .map() and the key prop
//   • className instead of class, onClick instead of onclick
// ============================================================

import React, { useState } from 'react';

// ---------- Small composable components ----------

const Header: React.FC = () => {
  return (
    <header style={{ background: '#4f46e5', color: '#fff', padding: '12px 20px', borderRadius: 8 }}>
      <h3 style={{ margin: 0 }}>📦 My Application Header</h3>
      <nav style={{ marginTop: 4 }}>
        <a href="#home" style={{ color: '#c7d2fe', marginRight: 12 }}>Home</a>
        <a href="#about" style={{ color: '#c7d2fe' }}>About</a>
      </nav>
    </header>
  );
};

const Footer: React.FC = () => {
  // Variable inside a component — rendered with {}
  const currentYear: number = new Date().getFullYear();
  return (
    <footer style={{ textAlign: 'center', color: '#6b7280', fontSize: 13, marginTop: 12 }}>
      &copy; {currentYear} My Application
    </footer>
  );
};

// ---------- Main Demo ----------

const ComponentsDemo: React.FC = () => {
  const userName: string = 'Alice';
  const userAge: number = 28;
  const isLoggedIn: boolean = true;
  const score: number = 95;

  const features: string[] = ['Fast', 'Reliable', 'User-friendly', 'Accessible'];
  const [items, setItems] = useState<string[]>(features);

  const addItem = () => {
    const newItem = `Feature-${items.length + 1}`;
    setItems(prev => [...prev, newItem]);
  };

  return (
    <div>
      <h2>1. Components &amp; TSX Fundamentals</h2>

      {/* --- Curly-brace expressions --- */}
      <section className="demo-card">
        <h3>Curly Braces — Embedding TypeScript in TSX</h3>
        <p><strong>Variable:</strong> Welcome, {userName}!</p>
        <p><strong>Number:</strong> Age is {userAge}</p>
        <p><strong>Ternary:</strong> Status: {isLoggedIn ? '✅ Logged In' : '❌ Logged Out'}</p>
        <p><strong>Math:</strong> Next year you'll be {userAge + 1}</p>
        <p><strong>Expression:</strong> Grade: {score >= 90 ? 'A' : score >= 80 ? 'B' : 'C'}</p>
        <p><strong>Method call:</strong> {userName.toUpperCase()}</p>
      </section>

      {/* --- Component composition --- */}
      <section className="demo-card">
        <h3>Component Composition</h3>
        <p className="explanation">
          <code>&lt;Header /&gt;</code> and <code>&lt;Footer /&gt;</code> are
          reusable components composed inside this parent.
        </p>
        <Header />
        <div style={{ padding: '12px 0' }}>
          <p>This is the main content area between Header and Footer.</p>
        </div>
        <Footer />
      </section>

      {/* --- Array rendering with .map() --- */}
      <section className="demo-card">
        <h3>Array Rendering with .map() &amp; key</h3>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <button className="btn btn-primary" onClick={addItem}>+ Add Feature</button>
      </section>

      {/* --- Fragment demo --- */}
      <section className="demo-card">
        <h3>React Fragments &lt;&gt;...&lt;/&gt;</h3>
        <p className="explanation">
          Fragments let you group elements without adding an extra DOM node.
          Below, two paragraphs are siblings returned from a fragment.
        </p>
        <>
          <p style={{ color: '#059669' }}>✅ First paragraph (inside Fragment)</p>
          <p style={{ color: '#059669' }}>✅ Second paragraph (inside Fragment)</p>
        </>
      </section>

      {/* --- What would happen without --- */}
      <section className="demo-card without-card">
        <h3>⚠️ What Would Happen Without These Features?</h3>
        <ul>
          <li>
            <strong>Without TSX curly braces:</strong> You couldn't embed
            JavaScript expressions in markup. You'd have to manually
            create DOM elements with <code>document.createElement</code> and
            concatenate strings — error-prone and hard to read.
          </li>
          <li>
            <strong>Without components:</strong> You'd have one massive HTML
            file. No reusability — every repeated section (header, footer,
            card) would be copy-pasted, and changes would need to be made in
            every copy.
          </li>
          <li>
            <strong>Without .map() and key:</strong> You'd manually write
            each list item. React uses the <code>key</code> prop to track
            which items changed; without it, React may re-render the entire
            list instead of only the changed items, causing bugs with input
            focus and animations.
          </li>
          <li>
            <strong>Without Fragments:</strong> You'd need unnecessary
            wrapper <code>&lt;div&gt;</code>s everywhere, bloating the DOM
            and potentially breaking CSS layouts (e.g., flexbox or grid).
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ComponentsDemo;
