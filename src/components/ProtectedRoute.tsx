import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/lib/auth";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

const ProtectedRoute = ({ children, requiredPermission }: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthenticated, user, checkSession, updateLastActivity } = useAuthStore();

  useEffect(() => {
    // Check session validity on mount and route changes
    if (isAuthenticated) {
      const isValid = checkSession();
      if (!isValid) {
        // Session expired, redirect to login
        window.location.href = "/admin/login";
      } else {
        // Update last activity time
        updateLastActivity();
      }
    }
  }, [location.pathname]);

  // Set up activity tracking
  useEffect(() => {
    if (!isAuthenticated) return;

    const handleActivity = () => {
      updateLastActivity();
    };

    // Track user activity
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keypress", handleActivity);
    window.addEventListener("click", handleActivity);
    window.addEventListener("scroll", handleActivity);

    // Check session every minute
    const interval = setInterval(() => {
      const isValid = checkSession();
      if (!isValid) {
        window.location.href = "/admin/login";
      }
    }, 60000); // 1 minute

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keypress", handleActivity);
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      clearInterval(interval);
    };
  }, [isAuthenticated]);

  if (!isAuthenticated || !user) {
    // Redirect to login page with return URL
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Check permissions if required
  if (requiredPermission) {
    const hasPermission = user.role === 'super_admin' || 
      (user.role === 'manager' && ['view_dashboard', 'view_applications', 'edit_applications', 'view_users', 'view_reports'].includes(requiredPermission)) ||
      (user.role === 'support' && ['view_dashboard', 'view_applications', 'view_users'].includes(requiredPermission));

    if (!hasPermission) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600">You don't have permission to access this page.</p>
            <button
              onClick={() => window.history.back()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
