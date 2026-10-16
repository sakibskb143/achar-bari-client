import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { PageLoader } from '../components/loader'
import { useAuth } from '../context/AuthContext'

function PrivateRoute() {
  const location = useLocation()
  const {
    currentUser,
    authLoading,
  } = useAuth()

  if (authLoading) {
    return <PageLoader label="Checking your account" />
  }

  if (!currentUser) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    )
  }

  return <Outlet />
}

export default PrivateRoute
