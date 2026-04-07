// ============================================================
// 7️⃣  ContextDemo — Context API in Action
// ============================================================
// Topics from the notes:
//   • createContext / useContext
//   • Provider components wrapping the tree
//   • Auth Context (login / logout / role checking)
//   • Theme Context (light / dark toggle)
//   • Notification Context (toast messages from anywhere)
//   • Avoiding prop drilling
// ============================================================

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNotifications } from '../context/NotificationContext';
import type { User } from '../types';

// ---------- Login form ----------
const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const { addNotification } = useNotifications();

  const loginAs = (role: User['role']) => {
    const mockUser: User = {
      id: 1,
      name: role === 'admin' ? 'Admin Alice' : role === 'user' ? 'User Bob' : 'Guest Charlie',
      email: `${role}@example.com`,
      role,
      lastActive: new Date(),
      isOnline: true,
    };
    login(mockUser);
    addNotification(`Logged in as ${mockUser.name}`, 'success');
  };

  return (
    <div>
      <p>Choose a role to log in:</p>
      <div className="flex-row">
        <button className="btn btn-primary" onClick={() => loginAs('admin')}>Admin</button>
        <button className="btn" onClick={() => loginAs('user')}>User</button>
        <button className="btn" onClick={() => loginAs('guest')}>Guest</button>
      </div>
    </div>
  );
};

// ---------- Profile (deeply nested — no prop drilling!) ----------
const UserProfile: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const { addNotification } = useNotifications();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    addNotification('Logged out', 'info');
  };

  return (
    <div className="profile-card">
      <h4>{user.name}</h4>
      <p>{user.email}</p>
      <span className={`badge badge-${user.role}`}>{user.role}</span>
      {isAdmin && <span className="badge badge-vip">🔑 Admin</span>}
      <br />
      <button className="btn btn-danger" style={{ marginTop: 8 }} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

// ---------- Theme toggler ----------
const ThemeToggler: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex-row" style={{ alignItems: 'center' }}>
      <span>Current theme: <strong>{theme}</strong></span>
      <button className="btn" onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </div>
  );
};

// ---------- Notification tester ----------
const NotificationTester: React.FC = () => {
  const { addNotification, notifications, removeNotification } = useNotifications();

  return (
    <div>
      <div className="flex-row">
        <button className="btn" onClick={() => addNotification('This is informational', 'info')}>
          ℹ Info
        </button>
        <button className="btn btn-primary" onClick={() => addNotification('Action succeeded!', 'success')}>
          ✅ Success
        </button>
        <button className="btn" style={{ background: '#f59e0b', color: '#fff' }} onClick={() => addNotification('Be careful!', 'warning')}>
          ⚠ Warning
        </button>
        <button className="btn btn-danger" onClick={() => addNotification('Something went wrong', 'error')}>
          ❌ Error
        </button>
      </div>
      {notifications.length > 0 && (
        <div className="toast-container">
          {notifications.map(n => (
            <div key={n.id} className={`toast toast-${n.type}`}>
              {n.message}
              <button onClick={() => removeNotification(n.id)}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ---------- Main demo ----------
const ContextDemo: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <h2>7. Context API (Global State)</h2>

      {/* Auth context */}
      <section className="demo-card">
        <h3>Auth Context</h3>
        <p className="explanation">
          <code>useAuth()</code> provides login state to any component in the
          tree — no prop drilling needed.
        </p>
        {isAuthenticated ? <UserProfile /> : <LoginForm />}
      </section>

      {/* Theme context */}
      <section className="demo-card">
        <h3>Theme Context</h3>
        <p className="explanation">
          <code>useTheme()</code> provides the current theme and a toggle
          function. The entire app reacts to the change.
        </p>
        <ThemeToggler />
      </section>

      {/* Notification context */}
      <section className="demo-card">
        <h3>Notification Context</h3>
        <p className="explanation">
          <code>useNotifications()</code> lets any component fire a toast
          message without knowing about the UI that displays them.
          Toasts auto-dismiss after 3 seconds.
        </p>
        <NotificationTester />
      </section>

      <section className="demo-card without-card">
        <h3>⚠️ What Would Happen Without Context API?</h3>
        <ul>
          <li>
            <strong>Prop drilling:</strong> The <code>user</code> object, 
            <code>login</code>, and <code>logout</code> functions would need
            to be passed through every intermediate component. In a real app
            with 5–10 levels of nesting, this means dozens of components
            accepting and forwarding props they don't even use.
          </li>
          <li>
            <strong>Tight coupling:</strong> Adding a new piece of global
            state (e.g., notifications) would require modifying every
            component in the chain between the provider and consumer.
          </li>
          <li>
            <strong>Inconsistency:</strong> Different parts of the app might
            fall out of sync — one sidebar shows the user as logged in while
            another still shows the login form, because different copies of
            the state weren't all updated.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ContextDemo;
