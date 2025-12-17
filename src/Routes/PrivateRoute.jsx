
import { Navigate, useLocation } from 'react-router'
import useAuth from '../Hooks/useAuth'


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return  <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
  if (user) return children
  return <Navigate to='/login' state={location.pathname} replace='true' />
}

export default PrivateRoute
