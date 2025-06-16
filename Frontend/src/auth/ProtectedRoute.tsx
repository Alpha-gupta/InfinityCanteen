import { useMyAuth } from "@/auth/useMyAuth"; // your custom hook
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, isPending } = useMyAuth();

  if (isPending) {
    return null; // or a loading spinner
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
