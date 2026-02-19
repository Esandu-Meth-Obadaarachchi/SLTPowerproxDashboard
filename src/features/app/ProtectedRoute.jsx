import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const RoleProtectedRoute = ({ children, minLevel = 1, redirectTo = "/app/landing" }) => {
  const userString = localStorage.getItem("user") || sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const authLevel = Number(user?.apiData?.AuthLevel || 0);

  const isLoggedIn = user && user.isAuthenticated;
  const isUnauthorized = authLevel < minLevel;

  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (isLoggedIn && isUnauthorized) {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "You do not have permission to access this page.",
      }).then(() => setShouldRedirect(true));
    }
  }, [isLoggedIn, isUnauthorized]);

  // not logged in → redirect instantly
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // unauthorized → wait for popup, then redirect
  if (isUnauthorized) {
    if (shouldRedirect) {
      return <Navigate to={redirectTo} replace />;
    }
    return null; // Don't render page until redirect
  }

  return children;
};

export default RoleProtectedRoute;