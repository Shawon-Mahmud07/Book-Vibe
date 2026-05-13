import { Navigate, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  // Loading state — spinner
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-accent-green border-t-transparent" />
      </div>
    );
  }

  // User not signed in — redirect to sign-in page
  if (!currentUser) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
