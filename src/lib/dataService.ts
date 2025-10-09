// Centralized data management service for the admin panel
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
export interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'Education Loan' | 'Personal Loan' | 'Business Loan' | 'Student Loan';
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'review';
  date: string;
  timestamp: string;
  documents?: string[];
  notes?: string;
  assignedTo?: string;
  creditScore?: number;
  income?: number;
  employmentStatus?: string;
  purpose?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  registeredDate: string;
  status: 'active' | 'inactive' | 'suspended';
  totalApplications: number;
  approvedLoans: number;
  creditScore?: number;
  kycStatus: 'pending' | 'verified' | 'rejected';
  lastActive: string;
}

export interface Analytics {
  totalApplications: number;
  approvedLoans: number;
  pendingReview: number;
  rejectedLoans: number;
  totalDisbursed: number;
  averageAmount: number;
  approvalRate: number;
  processingTime: number;
  monthlyGrowth: number;
  conversionRate: number;
}

interface DataState {
  applications: Application[];
  users: User[];
  analytics: Analytics;
  isLoading: boolean;
  
  // Application methods
  fetchApplications: () => Promise<void>;
  addApplication: (application: Omit<Application, 'id' | 'timestamp'>) => Promise<Application>;
  updateApplication: (id: string, updates: Partial<Application>) => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;
  
  // User methods
  fetchUsers: () => Promise<void>;
  addUser: (user: Omit<User, 'id'>) => Promise<User>;
  updateUser: (id: string, updates: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  
  // Analytics methods
  updateAnalytics: () => void;
  getRealtimeStats: () => Analytics;
}

// No sample data initialization. Real user data will populate these stores at runtime via UI/API.

export const useDataStore = create<DataState>()(
  persist(
    (set, get) => ({
      applications: [],
      users: [],
      analytics: {
        totalApplications: 0,
        approvedLoans: 0,
        pendingReview: 0,
        rejectedLoans: 0,
        totalDisbursed: 0,
        averageAmount: 0,
        approvalRate: 0,
        processingTime: 24,
        monthlyGrowth: 0,
        conversionRate: 0,
      },
      isLoading: false,

      fetchApplications: async () => {
        set({ isLoading: true });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const storedApps = localStorage.getItem('unicreds_applications_db');
        const applications = storedApps ? JSON.parse(storedApps) : [];
        
        set({ applications, isLoading: false });
        get().updateAnalytics();
      },

      addApplication: async (applicationData) => {
        const newApp: Application = {
          ...applicationData,
          id: `APP-${Date.now().toString().slice(-6)}`,
          timestamp: new Date().toISOString(),
        };

        const { applications } = get();
        const updated = [...applications, newApp];
        
        localStorage.setItem('unicreds_applications_db', JSON.stringify(updated));
        set({ applications: updated });
        get().updateAnalytics();
        
        return newApp;
      },

      updateApplication: async (id, updates) => {
        const { applications } = get();
        const updated = applications.map(app => 
          app.id === id ? { ...app, ...updates } : app
        );
        
        localStorage.setItem('unicreds_applications_db', JSON.stringify(updated));
        set({ applications: updated });
        get().updateAnalytics();
      },

      deleteApplication: async (id) => {
        const { applications } = get();
        const updated = applications.filter(app => app.id !== id);
        
        localStorage.setItem('unicreds_applications_db', JSON.stringify(updated));
        set({ applications: updated });
        get().updateAnalytics();
      },

      fetchUsers: async () => {
        set({ isLoading: true });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const storedUsers = localStorage.getItem('unicreds_users_db');
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        
        set({ users, isLoading: false });
      },

      addUser: async (userData) => {
        const newUser: User = {
          ...userData,
          id: `USR-${Date.now().toString().slice(-6)}`,
        };

        const { users } = get();
        const updated = [...users, newUser];
        
        localStorage.setItem('unicreds_users_db', JSON.stringify(updated));
        set({ users: updated });
        
        return newUser;
      },

      updateUser: async (id, updates) => {
        const { users } = get();
        const updated = users.map(user => 
          user.id === id ? { ...user, ...updates } : user
        );
        
        localStorage.setItem('unicreds_users_db', JSON.stringify(updated));
        set({ users: updated });
      },

      deleteUser: async (id) => {
        const { users } = get();
        const updated = users.filter(user => user.id !== id);
        
        localStorage.setItem('unicreds_users_db', JSON.stringify(updated));
        set({ users: updated });
      },

      updateAnalytics: () => {
        const { applications } = get();
        
        const approved = applications.filter(app => app.status === 'approved');
        const pending = applications.filter(app => app.status === 'pending' || app.status === 'review');
        const rejected = applications.filter(app => app.status === 'rejected');
        
        const totalDisbursed = approved.reduce((sum, app) => sum + app.amount, 0);
        const averageAmount = applications.length > 0 
          ? applications.reduce((sum, app) => sum + app.amount, 0) / applications.length 
          : 0;
        
        const approvalRate = applications.length > 0 
          ? (approved.length / applications.length) * 100 
          : 0;
        
        // Calculate monthly growth (simplified)
        const thisMonth = applications.filter(app => {
          const appDate = new Date(app.timestamp);
          const now = new Date();
          return appDate.getMonth() === now.getMonth() && appDate.getFullYear() === now.getFullYear();
        });
        
        const lastMonth = applications.filter(app => {
          const appDate = new Date(app.timestamp);
          const now = new Date();
          const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1);
          return appDate.getMonth() === lastMonthDate.getMonth() && appDate.getFullYear() === lastMonthDate.getFullYear();
        });
        
        const monthlyGrowth = lastMonth.length > 0 
          ? ((thisMonth.length - lastMonth.length) / lastMonth.length) * 100 
          : 0;

        set({
          analytics: {
            totalApplications: applications.length,
            approvedLoans: approved.length,
            pendingReview: pending.length,
            rejectedLoans: rejected.length,
            totalDisbursed,
            averageAmount,
            approvalRate,
            processingTime: 24 + Math.floor(Math.random() * 12), // 24-36 hours
            monthlyGrowth,
            conversionRate: Math.random() * 5 + 2, // 2-7% conversion
          }
        });
      },

      getRealtimeStats: () => {
        const state = get();
        state.updateAnalytics();
        return state.analytics;
      },
    }),
    {
      name: 'unicreds-data',
      partialize: (state) => ({
        applications: state.applications,
        users: state.users,
        analytics: state.analytics,
      }),
    }
  )
);
