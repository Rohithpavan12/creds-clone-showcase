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
  analytics: Analytics;
  isLoading: boolean;
  
  // Application methods
  fetchApplications: () => Promise<void>;
  addApplication: (application: Omit<Application, 'id' | 'timestamp'>) => Promise<Application>;
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
      analytics: {
        totalApplications: 0,
        approvedLoans: 0,
        pendingReview: 0,
        rejectedLoans: 0,
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
          
          // Try to get from IndexedDB first, fallback to localStorage
          let applications: Application[] = [];
          try {
            applications = await fundineedDB.getAllApplications();
          } catch (error) {
            console.log('IndexedDB not available, using localStorage');
            const storedApplications = localStorage.getItem('fundineed_applications_db');
            applications = storedApplications ? JSON.parse(storedApplications) : [];
          }
          
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
          // Try IndexedDB first
          await fundineedDB.addApplication(newApp);
        } catch (error) {
          // Fallback to localStorage
          const existing = JSON.parse(localStorage.getItem('fundineed_applications_db') || '[]');
          existing.push(newApp);
          localStorage.setItem('fundineed_applications_db', JSON.stringify(existing));
        }
        
        const { applications } = get();
        const updated = [...applications, newApp];
        set({ applications: updated });
        get().updateAnalytics();
        
        return newApp;
      },

      updateApplication: async (id, updates) => {
        try {
          const { applications } = get();
          const appToUpdate = applications.find(app => app.id === id);
          if (!appToUpdate) throw new Error('Application not found');
          
          const updatedApp = { ...appToUpdate, ...updates };
          
          try {
            await fundineedDB.updateApplication(updatedApp);
          } catch (error) {
            // Fallback to localStorage
            const existing = JSON.parse(localStorage.getItem('fundineed_applications_db') || '[]');
            const updatedExisting = existing.map((app: Application) => 
              app.id === id ? updatedApp : app
            );
            localStorage.setItem('fundineed_applications_db', JSON.stringify(updatedExisting));
          }
          
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
          try {
            await fundineedDB.deleteApplication(id);
          } catch (error) {
            // Fallback to localStorage
            const existing = JSON.parse(localStorage.getItem('fundineed_applications_db') || '[]');
            const filtered = existing.filter((app: Application) => app.id !== id);
            localStorage.setItem('fundineed_applications_db', JSON.stringify(filtered));
          }
          
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
    }
  )
);
