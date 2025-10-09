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

// Initialize with sample data if empty
const initializeSampleData = () => {
  const existingApps = localStorage.getItem('unicreds_applications_db');
  if (!existingApps) {
    const sampleApplications: Application[] = [
      {
        id: 'APP-001',
        name: 'Rahul Sharma',
        email: 'rahul.sharma@email.com',
        phone: '+91 98765 43210',
        type: 'Education Loan',
        amount: 500000,
        status: 'approved',
        date: '2024-01-15',
        timestamp: '2024-01-15T10:30:00Z',
        creditScore: 750,
        income: 600000,
        employmentStatus: 'Employed',
        purpose: 'Masters in Computer Science',
        notes: 'Strong application with good credit history',
      },
      {
        id: 'APP-002',
        name: 'Priya Patel',
        email: 'priya.patel@email.com',
        phone: '+91 98765 43211',
        type: 'Personal Loan',
        amount: 200000,
        status: 'pending',
        date: '2024-01-14',
        timestamp: '2024-01-14T14:20:00Z',
        creditScore: 680,
        income: 450000,
        employmentStatus: 'Self-employed',
        purpose: 'Medical emergency',
      },
      {
        id: 'APP-003',
        name: 'Amit Kumar',
        email: 'amit.kumar@email.com',
        phone: '+91 98765 43212',
        type: 'Business Loan',
        amount: 1000000,
        status: 'review',
        date: '2024-01-14',
        timestamp: '2024-01-14T16:45:00Z',
        creditScore: 720,
        income: 1200000,
        employmentStatus: 'Business Owner',
        purpose: 'Business expansion',
        notes: 'Requires additional documentation',
      },
      {
        id: 'APP-004',
        name: 'Sneha Singh',
        email: 'sneha.singh@email.com',
        phone: '+91 98765 43213',
        type: 'Student Loan',
        amount: 350000,
        status: 'approved',
        date: '2024-01-13',
        timestamp: '2024-01-13T09:15:00Z',
        creditScore: 700,
        income: 0,
        employmentStatus: 'Student',
        purpose: 'Bachelor degree fees',
      },
      {
        id: 'APP-005',
        name: 'Vikram Rao',
        email: 'vikram.rao@email.com',
        phone: '+91 98765 43214',
        type: 'Education Loan',
        amount: 800000,
        status: 'rejected',
        date: '2024-01-13',
        timestamp: '2024-01-13T11:30:00Z',
        creditScore: 580,
        income: 300000,
        employmentStatus: 'Employed',
        purpose: 'Study abroad program',
        notes: 'Insufficient credit score',
      },
    ];
    localStorage.setItem('unicreds_applications_db', JSON.stringify(sampleApplications));
  }

  const existingUsers = localStorage.getItem('unicreds_users_db');
  if (!existingUsers) {
    const sampleUsers: User[] = [
      {
        id: 'USR-001',
        name: 'Rahul Sharma',
        email: 'rahul.sharma@email.com',
        phone: '+91 98765 43210',
        registeredDate: '2023-12-01',
        status: 'active',
        totalApplications: 1,
        approvedLoans: 1,
        creditScore: 750,
        kycStatus: 'verified',
        lastActive: '2024-01-15T10:30:00Z',
      },
      {
        id: 'USR-002',
        name: 'Priya Patel',
        email: 'priya.patel@email.com',
        phone: '+91 98765 43211',
        registeredDate: '2023-11-15',
        status: 'active',
        totalApplications: 1,
        approvedLoans: 0,
        creditScore: 680,
        kycStatus: 'verified',
        lastActive: '2024-01-14T14:20:00Z',
      },
      {
        id: 'USR-003',
        name: 'Amit Kumar',
        email: 'amit.kumar@email.com',
        phone: '+91 98765 43212',
        registeredDate: '2023-10-20',
        status: 'active',
        totalApplications: 2,
        approvedLoans: 1,
        creditScore: 720,
        kycStatus: 'verified',
        lastActive: '2024-01-14T16:45:00Z',
      },
    ];
    localStorage.setItem('unicreds_users_db', JSON.stringify(sampleUsers));
  }
};

// Initialize sample data
initializeSampleData();

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
