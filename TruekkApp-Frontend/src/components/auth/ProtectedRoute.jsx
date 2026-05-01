import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

function ProtectedRoute({ children, role }) {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner text="Verificando sesión..." />;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />;
  if (role && user?.role !== role) return <Navigate to="/dashboard" replace />;

  return children;
}

export default ProtectedRoute;
