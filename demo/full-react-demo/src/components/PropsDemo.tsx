// ============================================================
// 2️⃣  PropsDemo — Props, Interfaces, Default Values
// ============================================================
// Topics from the notes:
//   • TypeScript interfaces for props
//   • Required vs optional props (?)
//   • Default prop values
//   • Props are read-only (one-way data flow)
//   • Destructuring props
//   • Callback props (passing functions to children)
//   • Advanced: Partial<T>, keyof, spread operator
// ============================================================

import React, { useState } from 'react';

// ----- Greeting component with typed props -----
interface GreetingProps {
  name: string;          // required
  age?: number;          // optional
  isVip?: boolean;       // optional
}

const Greeting: React.FC<GreetingProps> = ({ name, age = 18, isVip = false }) => (
  <div className={`greeting-card ${isVip ? 'vip' : ''}`}>
    <h4>Hello, {name}!</h4>
    <p>Age: {age}</p>
    {isVip && <span className="badge badge-vip">⭐ VIP</span>}
  </div>
);

// ----- UserCard with callback props -----
interface UserCardProps {
  user: { id: number; name: string; email: string };
  onEdit?: (user: { id: number; name: string; email: string }) => void;
  onDelete?: (userId: number) => void;
  showActions?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete, showActions = true }) => (
  <div className="user-card-mini">
    <strong>{user.name}</strong> — {user.email}
    {showActions && (
      <span className="card-actions">
        {onEdit && <button className="btn btn-small" onClick={() => onEdit(user)}>Edit</button>}
        {onDelete && <button className="btn btn-small btn-danger" onClick={() => onDelete(user.id)}>Delete</button>}
      </span>
    )}
  </div>
);

// ----- GenericList — advanced generic props -----
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
  emptyMessage?: string;
}

function GenericList<T>({ items, renderItem, keyExtractor, emptyMessage = 'No items' }: ListProps<T>) {
  if (items.length === 0) return <p className="empty">{emptyMessage}</p>;
  return (
    <ul className="generic-list">
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>{renderItem(item, index)}</li>
      ))}
    </ul>
  );
}

// ----- Main demo -----
const PropsDemo: React.FC = () => {
  const [log, setLog] = useState<string[]>([]);
  const addLog = (msg: string) => setLog(prev => [...prev, msg]);

  const sampleUsers = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
  ];

  return (
    <div>
      <h2>2. Props &amp; TypeScript Interfaces</h2>

      {/* Basic props */}
      <section className="demo-card">
        <h3>Basic Props with Defaults</h3>
        <p className="explanation">
          Each <code>&lt;Greeting&gt;</code> receives different props.
          Missing optional props use their default values.
        </p>
        <div className="flex-row">
          <Greeting name="Alice" age={25} isVip={true} />
          <Greeting name="Bob" age={30} />
          <Greeting name="Charlie" />
        </div>
      </section>

      {/* Callback props */}
      <section className="demo-card">
        <h3>Callback Props (Parent ↔ Child Communication)</h3>
        <p className="explanation">
          Parent passes <code>onEdit</code> and <code>onDelete</code> functions
          as props. The child calls them — data flows up via callbacks.
        </p>
        {sampleUsers.map(u => (
          <UserCard
            key={u.id}
            user={u}
            onEdit={(user) => addLog(`Edit clicked for ${user.name}`)}
            onDelete={(id) => addLog(`Delete clicked for user #${id}`)}
          />
        ))}
        {log.length > 0 && (
          <div className="log-box">
            <strong>Event Log:</strong>
            {log.map((entry, i) => <div key={i}>→ {entry}</div>)}
            <button className="btn btn-small" onClick={() => setLog([])}>Clear Log</button>
          </div>
        )}
      </section>

      {/* Generic list component */}
      <section className="demo-card">
        <h3>Generic List Component (TypeScript Generics)</h3>
        <p className="explanation">
          <code>GenericList&lt;T&gt;</code> works with any data type.
          The parent decides how to render each item via <code>renderItem</code>.
        </p>
        <GenericList
          items={sampleUsers}
          keyExtractor={(u) => u.id}
          renderItem={(u) => <span>{u.name} — {u.email}</span>}
        />
        <h4 style={{ marginTop: 12 }}>Empty list:</h4>
        <GenericList
          items={[] as string[]}
          keyExtractor={(_, i) => i}
          renderItem={(s) => <span>{s}</span>}
          emptyMessage="Nothing here yet!"
        />
      </section>

      {/* What would happen without */}
      <section className="demo-card without-card">
        <h3>⚠️ What Would Happen Without These Features?</h3>
        <ul>
          <li>
            <strong>Without typed props (interfaces):</strong> You'd pass
            data as plain objects with no compile-time checking. A typo like
            <code> &lt;Greeting naem="Alice" /&gt;</code> would silently
            fail at runtime instead of being caught instantly by TypeScript.
          </li>
          <li>
            <strong>Without default values:</strong> Every optional prop
            would be <code>undefined</code>, causing "cannot read property
            of undefined" errors unless you add null checks everywhere.
          </li>
          <li>
            <strong>Without callback props:</strong> Child components
            couldn't communicate actions back to parents. You'd need global
            variables or DOM events — losing React's predictable data flow.
          </li>
          <li>
            <strong>Without generics:</strong> You'd write separate list
            components for users, products, strings, etc. — duplicating
            logic that only differs in the item type.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default PropsDemo;
