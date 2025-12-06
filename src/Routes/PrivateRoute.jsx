
import { Navigate, useLocation } from 'react-router'
import useAuth from '../Hooks/useAuth'


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <h1>Loadding</h1>
  if (user) return children
  return <Navigate to='/login' state={location.pathname} replace='true' />
}

export default PrivateRoute
