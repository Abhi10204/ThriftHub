// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredAdmin = false }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // If admin is required but user is not admin
  if (requiredAdmin && !user.isAdmin) {
    return <Navigate to="/user/dashboard" replace />;
  }

  // If normal user route but user is admin
  if (!requiredAdmin && user.isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
