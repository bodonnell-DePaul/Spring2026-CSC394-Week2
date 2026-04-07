// ============================================================
// TypeScript Types & Interfaces
// Demonstrates: interfaces, optional props (?), union types,
// and how TypeScript catches errors at compile time.
// ============================================================

// User type used across the app
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string; // Optional prop - the ? means it can be undefined
  role: 'admin' | 'user' | 'guest'; // Union type - only these 3 values allowed
  lastActive: Date;
  isOnline: boolean;
}

// Form data for the registration form demo
export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

// Notification type for the notification system
export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

// Filter options for the search/filter demo
export interface FilterOptions {
  role: string;
  isOnline: boolean | null;
  sortBy: 'name' | 'email' | 'lastActive';
  sortOrder: 'asc' | 'desc';
}
