// Centralized data management service for the admin panel
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fundineedDB } from './database';

// Types
export interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'Education Loan' | 'Personal Loan' | 'Business Loan' | 'Student Loan';
  amount: string | number;
  status: 'pending' | 'approved' | 'rejected' | 'review';
  date: string;
  timestamp: string;
  documents?: any[];
  formData?: any;
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
  role: 'admin' | 'manager' | 'agent';
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
  permissions: string[];
  avatar?: string;
  department?: string;
  approvedLoans: number;
  kycStatus: 'pending' | 'approved' | 'rejected';
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
  conversionRate: number;
  monthlyGrowth: number;
}

interface DataState {
  applications: Application[];
  users: User[];
{{ ... }}
  updateApplication: (id: string, updates: Partial<Application>) => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;
  
  // User methods
  fetchUsers: () => Promise<void>;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => Promise<User>;
  updateUser: (id: string, updates: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  
  // Analytics methods
  updateAnalytics: () => void;
  getRealtimeStats: () => Analytics;
}

export const useDataStore = create<DataState>()(
  persist(
    (set, get) => ({
      applications: [],
      users: [],
{{ ... }}
        totalDisbursed: 0,
        averageAmount: 0,
        approvalRate: 0,
        processingTime: 24,
        conversionRate: 0,
        monthlyGrowth: 0,
      },
      isLoading: false,

      fetchApplications: async () => {
        try {
          set({ isLoading: true });
          
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Get applications from IndexedDB
          const applications = await fundineedDB.getAllApplications();
          
          set({ applications, isLoading: false });
          get().updateAnalytics();
        } catch (error) {
          console.error('Error fetching applications:', error);
          set({ applications: [], isLoading: false });
        }
      },

      addApplication: async (applicationData) => {
        const newApp: Application = {
          ...applicationData,
          id: `APP-${Date.now()}`,
          timestamp: new Date().toISOString(),
        };
        
        try {
          await fundineedDB.addApplication(newApp);
          const { applications } = get();
          const updated = [...applications, newApp];
          set({ applications: updated });
          get().updateAnalytics();
          
          return newApp;
        } catch (error) {
          console.error('Error adding application:', error);
          throw error;
        }
      },

      updateApplication: async (id, updates) => {
        try {
          const { applications } = get();
          const appToUpdate = applications.find(app => app.id === id);
          if (!appToUpdate) throw new Error('Application not found');
          
          const updatedApp = { ...appToUpdate, ...updates };
          await fundineedDB.updateApplication(updatedApp);
          
          const updated = applications.map(app => 
            app.id === id ? updatedApp : app
          );
          set({ applications: updated });
          get().updateAnalytics();
        } catch (error) {
          console.error('Error updating application:', error);
          throw error;
        }
      },

      deleteApplication: async (id) => {
        try {
          await fundineedDB.deleteApplication(id);
          const { applications } = get();
          const updated = applications.filter(app => app.id !== id);
          set({ applications: updated });
          get().updateAnalytics();
        } catch (error) {
          console.error('Error deleting application:', error);
          throw error;
        }
      },

      fetchUsers: async () => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Demo users for now
        const demoUsers: User[] = [
          {
            id: 'user_1',
            name: 'Admin User',
            email: 'admin@fundineed.com',
            phone: '+91 9876543210',
            role: 'admin',
            status: 'active',
            lastLogin: new Date().toISOString(),
            createdAt: '2024-01-01T00:00:00.000Z',
            permissions: ['all'],
            approvedLoans: 25,
            kycStatus: 'approved',
            lastActive: new Date().toISOString(),
          }
        ];
        
        set({ users: demoUsers, isLoading: false });
      },

      addUser: async (userData) => {
        const newUser: User = {
          ...userData,
          id: `user_${Date.now()}`,
          createdAt: new Date().toISOString(),
        };
        
        const { users } = get();
        const updated = [...users, newUser];
        set({ users: updated });
        
        return newUser;
      },

      updateUser: async (id, updates) => {
        const { users } = get();
        const updated = users.map(user => 
          user.id === id ? { ...user, ...updates } : user
        );
        set({ users: updated });
      },

      deleteUser: async (id) => {
        const { users } = get();
        const updated = users.filter(user => user.id !== id);
        set({ users: updated });
      },

      updateAnalytics: () => {
        const { applications } = get();
        
        const totalApplications = applications.length;
        const approved = applications.filter(app => app.status === 'approved');
        const pending = applications.filter(app => app.status === 'pending');
        const rejected = applications.filter(app => app.status === 'rejected');
        const review = applications.filter(app => app.status === 'review');
        
        const totalDisbursed = approved.reduce((sum, app) => {
          const amount = typeof app.amount === 'string' ? 0 : app.amount;
          return sum + amount;
        }, 0);
        const averageAmount = applications.length > 0 
          ? applications.reduce((sum, app) => {
              const amount = typeof app.amount === 'string' ? 0 : app.amount;
              return sum + amount;
            }, 0) / applications.length 
          : 0;
        
        const approvalRate = totalApplications > 0 ? (approved.length / totalApplications) * 100 : 0;
        const conversionRate = totalApplications > 0 ? (approved.length / totalApplications) * 100 : 0;
        
        // Calculate monthly growth (simplified)
        const currentMonth = new Date().getMonth();
        const currentMonthApps = applications.filter(app => 
          new Date(app.date).getMonth() === currentMonth
        ).length;
        const lastMonthApps = applications.filter(app => 
          new Date(app.date).getMonth() === currentMonth - 1
        ).length;
        const monthlyGrowth = lastMonthApps > 0 ? 
          ((currentMonthApps - lastMonthApps) / lastMonthApps) * 100 : 0;
        
        set({
          analytics: {
            totalApplications,
            approvedLoans: approved.length,
            pendingReview: pending.length + review.length,
            rejectedLoans: rejected.length,
            totalDisbursed,
            averageAmount,
            approvalRate,
            processingTime: 24, // Static for now
            conversionRate,
            monthlyGrowth,
          }
        });
      },

      getRealtimeStats: () => {
        return get().analytics;
      },
    }),
    {
      name: 'fundineed-data-store',
      partialize: (state) => ({
        applications: state.applications,
        users: state.users,
        analytics: state.analytics,
      }),
    }
  )
);
