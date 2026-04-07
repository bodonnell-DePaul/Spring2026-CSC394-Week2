// ============================================================
// ThemeContext — Context API for State Management
// ============================================================
// WHAT THIS DOES:
//   Provides a "theme" value (light/dark) to the ENTIRE component
//   tree without passing props through every level.
//
// WITHOUT THIS (prop drilling):
//   <App theme="dark">            — must pass theme
//     <Layout theme="dark">       — must pass theme again
//       <Sidebar theme="dark">    — must pass theme AGAIN
//         <Button theme="dark" /> — finally uses it
//       </Sidebar>
//     </Layout>
//   </App>
//   Every intermediate component must accept and forward the prop,
//   even if it doesn't use it. One missed prop = broken styling.
//
// WITH CONTEXT:
//   <ThemeProvider>               — provides theme once
//     <Layout>                    — no props needed
//       <Sidebar>                 — no props needed
//         <Button />              — calls useTheme() to read it
//       </Sidebar>
//     </Layout>
//   </ThemeProvider>
// ============================================================

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
