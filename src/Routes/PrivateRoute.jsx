
import { Navigate, useLocation } from 'react-router'
import useAuth from '../Hooks/useAuth'
import Spinar from '../Components/Shared/Spinar'


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return  <Spinar></Spinar>
  if (user) return children
  return <Navigate to='/login' state={location.pathname} replace='true' />
}

export default PrivateRoute
