import { Navigate, Outlet } from 'react-router-dom'
import { PageLoader } from '../components/loader'
import { useAuth } from '../context/AuthContext'

const ADMIN_EMAILS = [
  'admin@acharbari.com',
]

function AdminRoute() {
  const {
    currentUser,
    authLoading,
  } = useAuth()

  if (authLoading) {
    return <PageLoader label="Checking admin access" />
  }

  if (!currentUser) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  const isAdmin = ADMIN_EMAILS.includes(
    currentUser.email,
  )

  if (!isAdmin) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    )
  }

  return <Outlet />
}

export default AdminRoute
