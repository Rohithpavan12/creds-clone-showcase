// Real analytics tracking service for Fundineed
import React from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AnalyticsData {
  pageViews: { [key: string]: number };
  totalPageViews: number;
  uniqueVisitors: Set<string>;
  sessionStart: number;
  lastActivity: number;
  conversionEvents: Array<{
    type: 'application_started' | 'application_completed' | 'document_uploaded' | 'page_view';
    timestamp: number;
    page?: string;
    data?: any;
  }>;
}

interface AnalyticsStore extends AnalyticsData {
  trackPageView: (page: string) => void;
  trackEvent: (type: string, data?: any) => void;
  getAnalytics: () => {
    totalPageViews: number;
    uniqueVisitors: number;
    conversionRate: number;
    averageSessionTime: number;
    topPages: Array<{ page: string; views: number }>;
    recentActivity: Array<any>;
  };
  initializeSession: () => void;
}

// Generate a simple visitor ID
const getVisitorId = () => {
  let visitorId = localStorage.getItem('fundineed_visitor_id');
  if (!visitorId) {
    visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('fundineed_visitor_id', visitorId);
  }
  return visitorId;
};

export const useAnalyticsStore = create<AnalyticsStore>()(
  persist(
    (set, get) => ({
      pageViews: {},
      totalPageViews: 0,
      uniqueVisitors: new Set(),
      sessionStart: Date.now(),
      lastActivity: Date.now(),
      conversionEvents: [],

      initializeSession: () => {
        const visitorId = getVisitorId();
        const state = get();
        const newUniqueVisitors = new Set(state.uniqueVisitors);
        newUniqueVisitors.add(visitorId);
        
        set({
          uniqueVisitors: newUniqueVisitors,
          sessionStart: Date.now(),
          lastActivity: Date.now()
        });
      },

      trackPageView: (page: string) => {
        const state = get();
        const newPageViews = { ...state.pageViews };
        newPageViews[page] = (newPageViews[page] || 0) + 1;
        
        const event = {
          type: 'page_view' as const,
          timestamp: Date.now(),
          page: page
        };

        set({
          pageViews: newPageViews,
          totalPageViews: state.totalPageViews + 1,
          lastActivity: Date.now(),
          conversionEvents: [...state.conversionEvents, event].slice(-100) // Keep last 100 events
        });
      },

      trackEvent: (type: string, data?: any) => {
        const state = get();
        const event = {
          type: type as any,
          timestamp: Date.now(),
          data: data
        };

        set({
          lastActivity: Date.now(),
          conversionEvents: [...state.conversionEvents, event].slice(-100)
        });
      },

      getAnalytics: () => {
        const state = get();
        const now = Date.now();
        const sessionTime = now - state.sessionStart;
        
        // Calculate conversion rate (applications completed / total page views)
        const applicationEvents = state.conversionEvents.filter(e => e.type === 'application_completed');
        const conversionRate = state.totalPageViews > 0 ? (applicationEvents.length / state.totalPageViews) * 100 : 0;
        
        // Get top pages
        const topPages = Object.entries(state.pageViews)
          .map(([page, views]) => ({ page, views }))
          .sort((a, b) => b.views - a.views)
          .slice(0, 5);

        // Get recent activity (last 24 hours)
        const dayAgo = now - (24 * 60 * 60 * 1000);
        const recentActivity = state.conversionEvents.filter(e => e.timestamp > dayAgo);

        return {
          totalPageViews: state.totalPageViews,
          uniqueVisitors: state.uniqueVisitors.size,
          conversionRate: Math.round(conversionRate * 100) / 100,
          averageSessionTime: Math.round(sessionTime / 1000 / 60), // in minutes
          topPages,
          recentActivity
        };
      }
    }),
    {
      name: 'fundineed-analytics',
      partialize: (state) => ({
        pageViews: state.pageViews,
        totalPageViews: state.totalPageViews,
        uniqueVisitors: Array.from(state.uniqueVisitors), // Convert Set to Array for serialization
        sessionStart: state.sessionStart,
        lastActivity: state.lastActivity,
        conversionEvents: state.conversionEvents
      }),
      // Custom deserializer to handle Set conversion
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.uniqueVisitors)) {
          state.uniqueVisitors = new Set(state.uniqueVisitors);
        }
      }
    }
  )
);

// Hook to track page views automatically
export const usePageTracking = (pageName: string) => {
  const { trackPageView, initializeSession } = useAnalyticsStore();
  
  React.useEffect(() => {
    initializeSession();
    trackPageView(pageName);
  }, [pageName, trackPageView, initializeSession]);
};

// Export for manual tracking
export const trackEvent = (type: string, data?: any) => {
  useAnalyticsStore.getState().trackEvent(type, data);
};

export const trackPageView = (page: string) => {
  useAnalyticsStore.getState().trackPageView(page);
};
