// ============================================================
// App.tsx — Main application with tabbed navigation
// Wraps everything in Context Providers and lets the instructor
// click through each topic section during class.
// ============================================================

import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

import ComponentsDemo from './components/ComponentsDemo';
import PropsDemo from './components/PropsDemo';
import StateDemo from './components/StateDemo';
import EventsDemo from './components/EventsDemo';
import EffectDemo from './components/EffectDemo';
import CustomHooksDemo from './components/CustomHooksDemo';
import ContextDemo from './components/ContextDemo';
import PerformanceDemo from './components/PerformanceDemo';

import './App.css';

const tabs = [
  { id: 'components', label: '1. Components & TSX' },
  { id: 'props', label: '2. Props' },
  { id: 'state', label: '3. State' },
  { id: 'events', label: '4. Events' },
  { id: 'effects', label: '5. useEffect' },
  { id: 'hooks', label: '6. Custom Hooks' },
  { id: 'context', label: '7. Context API' },
  { id: 'performance', label: '8. Performance' },
] as const;

type TabId = (typeof tabs)[number]['id'];

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('components');
  const { theme } = useTheme();

  const renderTab = () => {
    switch (activeTab) {
      case 'components': return <ComponentsDemo />;
      case 'props': return <PropsDemo />;
      case 'state': return <StateDemo />;
      case 'events': return <EventsDemo />;
      case 'effects': return <EffectDemo />;
      case 'hooks': return <CustomHooksDemo />;
      case 'context': return <ContextDemo />;
      case 'performance': return <PerformanceDemo />;
    }
  };

  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <h1>⚛️ React + TypeScript — Class Demo</h1>
        <p className="subtitle">Interactive showcase of every concept from the Week 02 notes</p>
      </header>

      <nav className="tab-bar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="main-content">
        {renderTab()}
      </main>

      <footer className="app-footer">
        Week 02 — React &amp; TypeScript | DePaul Web Development
      </footer>
    </div>
  );
};

const App: React.FC = () => (
  <ThemeProvider>
    <AuthProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
