// Authentication utilities for admin panel
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Admin credentials (in production, this should be in a secure backend)
const ADMIN_CREDENTIALS = {
  email: 'admin@unicreds.com',
  password: 'UniCreds@2024!', // Strong password for production
};

// Alternative admin accounts for testing
const ADMIN_ACCOUNTS = [
  { email: 'admin@unicreds.com', password: 'UniCreds@2024!', role: 'super_admin', name: 'Super Admin' },
  { email: 'manager@unicreds.com', password: 'Manager@2024!', role: 'manager', name: 'Manager User' },
  { email: 'support@unicreds.com', password: 'Support@2024!', role: 'support', name: 'Support User' },
];

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'manager' | 'support';
  lastLogin: string;
  sessionToken: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  checkSession: () => boolean;
  updateLastActivity: () => void;
}

// Generate a secure session token
const generateSessionToken = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};

// Check if session is expired (30 minutes timeout)
const isSessionExpired = (lastActivity: string): boolean => {
  const TIMEOUT_MINUTES = 30;
  const lastActivityTime = new Date(lastActivity).getTime();
  const currentTime = new Date().getTime();
  const diffMinutes = (currentTime - lastActivityTime) / (1000 * 60);
  return diffMinutes > TIMEOUT_MINUTES;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Find matching admin account
        const account = ADMIN_ACCOUNTS.find(
          acc => acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
        );

        if (account) {
          const user: User = {
            id: `user_${Date.now()}`,
            email: account.email,
            name: account.name,
            role: account.role,
            lastLogin: new Date().toISOString(),
            sessionToken: generateSessionToken(),
          };

          set({ user, isAuthenticated: true });

          // Log login activity
          const loginHistory = JSON.parse(localStorage.getItem('unicreds_login_history') || '[]');
          loginHistory.push({
            email: user.email,
            timestamp: user.lastLogin,
            success: true,
            ip: '127.0.0.1', // In production, get real IP
          });
          localStorage.setItem('unicreds_login_history', JSON.stringify(loginHistory));

          return { success: true, message: 'Login successful' };
        }

        // Log failed login attempt
        const loginHistory = JSON.parse(localStorage.getItem('unicreds_login_history') || '[]');
        loginHistory.push({
          email,
          timestamp: new Date().toISOString(),
          success: false,
          ip: '127.0.0.1',
        });
        localStorage.setItem('unicreds_login_history', JSON.stringify(loginHistory));

        return { success: false, message: 'Invalid email or password' };
      },

      logout: () => {
        const user = get().user;
        if (user) {
          // Log logout activity
          const logoutHistory = JSON.parse(localStorage.getItem('unicreds_logout_history') || '[]');
          logoutHistory.push({
            email: user.email,
            timestamp: new Date().toISOString(),
          });
          localStorage.setItem('unicreds_logout_history', JSON.stringify(logoutHistory));
        }

        set({ user: null, isAuthenticated: false });
      },

      checkSession: () => {
        const state = get();
        if (!state.user || !state.isAuthenticated) {
          return false;
        }

        // Check if session is expired
        if (isSessionExpired(state.user.lastLogin)) {
          state.logout();
          return false;
        }

        return true;
      },

      updateLastActivity: () => {
        set(state => {
          if (state.user) {
            return {
              user: {
                ...state.user,
                lastLogin: new Date().toISOString(),
              },
            };
          }
          return state;
        });
      },
    }),
    {
      name: 'unicreds-auth',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

// Permission checking utilities
export const hasPermission = (user: User | null, permission: string): boolean => {
  if (!user) return false;

  const permissions: Record<string, string[]> = {
    super_admin: ['*'], // All permissions
    manager: ['view_dashboard', 'view_applications', 'edit_applications', 'view_users', 'view_reports'],
    support: ['view_dashboard', 'view_applications', 'view_users'],
  };

  const userPermissions = permissions[user.role] || [];
  return userPermissions.includes('*') || userPermissions.includes(permission);
};
