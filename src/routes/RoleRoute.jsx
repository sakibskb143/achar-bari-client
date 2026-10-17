import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { PageLoader } from '../components/loader'
import { useAuth } from '../context/AuthContext'
import { USER_ROLES } from '../utils/userRole'

function RoleRoute({
  allowedRole,
  unauthorizedPath,
}) {
  const location = useLocation()

  const {
    currentUser,
    userRole,
    authLoading,
    roleLoading,
  } = useAuth()

  if (authLoading) {
    return (
      <PageLoader label="Checking your account" />
    )
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

  /*
   * Role loading should now finish immediately.
   * This remains as a safety guard.
   */
  if (roleLoading || !userRole) {
    return (
      <PageLoader label="Checking account access" />
    )
  }

  if (userRole !== allowedRole) {
    return (
      <Navigate
        to={unauthorizedPath}
        replace
        state={{
          from: location,
          reason: 'unauthorized-role',
        }}
      />
    )
  }

  return <Outlet />
}

export function AdminRoute() {
  return (
    <RoleRoute
      allowedRole={USER_ROLES.ADMIN}
      unauthorizedPath="/dashboard"
    />
  )
}

export function UserRoute() {
  return (
    <RoleRoute
      allowedRole={USER_ROLES.USER}
      unauthorizedPath="/admin"
    />
  )
}
