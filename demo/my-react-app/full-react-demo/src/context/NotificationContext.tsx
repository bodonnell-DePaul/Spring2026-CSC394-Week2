// ============================================================
// NotificationContext — Context API for Toast Notifications
// ============================================================
// WHAT THIS DOES:
//   Any component anywhere in the tree can call
//   addNotification('Saved!', 'success') and a toast appears.
//
// WITHOUT THIS:
//   You'd need to hoist notification state to the top-level App,
//   then pass addNotification as a prop through every layer.
//   Deeply nested components couldn't show notifications without
//   many layers of prop drilling.
// ============================================================

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { Notification } from '../types';

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: Notification['type']) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const addNotification = useCallback((message: string, type: Notification['type']) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);

    // Auto-remove after 3 seconds
    setTimeout(() => removeNotification(id), 3000);
  }, [removeNotification]);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
