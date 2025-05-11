// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ requiredRoles = [] }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si no está autenticado, redirigir a login
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Si no hay roles requeridos, permitir acceso
  if (requiredRoles.length === 0) {
    return <Outlet />;
  }

  // Verificar si el usuario tiene alguno de los roles requeridos
  const hasRequiredRole = currentUser.roles.some(role => 
    requiredRoles.includes(role)
  );

  if (!hasRequiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;