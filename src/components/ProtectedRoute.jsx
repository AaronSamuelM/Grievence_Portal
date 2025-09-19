import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role = "admin" }) => {
  const access = localStorage.getItem("access");
  const token = localStorage.getItem("access_token");

  // Block if not logged in or wrong role
  if (!token || access !== role) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
};

export default ProtectedRoute;
