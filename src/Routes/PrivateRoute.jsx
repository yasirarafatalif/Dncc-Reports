
import { Navigate, useLocation } from 'react-router'
import useAuth from '../Hooks/useAuth'
import Spinar from '../Components/Shared/Spinar'
import AdminDashboardSkeleton from '../Components/Shared/AdminDashboardSkeleton'


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return  <Spinar></Spinar>
  // if (loading) return  <AdminDashboardSkeleton></AdminDashboardSkeleton>
  if (user) return children
  return <Navigate to='/login' state={location.pathname} replace='true' />
}

export default PrivateRoute
