import { Navigate } from 'react-router-dom';
import useStore from '../store/useStore';

export default function ProtectedRoute({ children, allowedRoles }: any) {
  const user = useStore((state: any) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect based on role if they try to access unauthorized area
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (user.role === 'staff') return <Navigate to="/staff/dashboard" replace />;
    return <Navigate to="/home" replace />;
  }

  return children;
}
