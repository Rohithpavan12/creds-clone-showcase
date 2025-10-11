// Authentication utilities for admin panel (JWT via backend)
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'manager' | 'support';
  lastLogin: string;
  sessionToken: string; // JWT token
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  checkSession: () => boolean;
  updateLastActivity: () => void;
}

// Session timeout guard (last activity)
const isSessionExpired = (lastActivity: string): boolean => {
  const TIMEOUT_MINUTES = Number(import.meta.env.VITE_SESSION_TIMEOUT || 30);
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
        // Demo credentials for Fundineed
        const demoCredentials = [
          { email: 'admin@fundineed.com', password: 'Fundineed@2024!', name: 'Admin User', role: 'super_admin' as const },
          { email: 'manager@fundineed.com', password: 'Manager@2024!', name: 'Manager User', role: 'manager' as const }
        ];

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const credential = demoCredentials.find(cred => cred.email === email && cred.password === password);
        
        if (!credential) {
          return { success: false, message: 'Invalid email or password' };
        }

        const now = new Date().toISOString();
        const user: User = {
          id: credential.email.split('@')[0],
          email: credential.email,
          name: credential.name,
          role: credential.role,
          lastLogin: now,
          sessionToken: `demo_token_${Date.now()}`,
        };

        set({ user, isAuthenticated: true });
        return { success: true, message: 'Login successful' };
      },

      logout: () => {
        const user = get().user;
        if (user) {
          // Log logout activity
          const logoutHistory = JSON.parse(localStorage.getItem('fundineed_logout_history') || '[]');
          logoutHistory.push({
            email: user.email,
            timestamp: new Date().toISOString(),
          });
          localStorage.setItem('fundineed_logout_history', JSON.stringify(logoutHistory));
        }

        set({ user: null, isAuthenticated: false });
      },

      checkSession: () => {
        const state = get();
        if (!state.user || !state.isAuthenticated) return false;
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
      name: 'fundineed-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
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
