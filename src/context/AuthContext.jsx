import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  loginWithEmail,
  loginWithGoogle,
  logoutUser,
  registerWithEmail,
  sendPasswordReset,
  subscribeToAuthChanges,
  updateUserDisplayName,
} from '../services/authService'
import {
  getAuthenticatedUserRole,
  USER_ROLES,
} from '../utils/userRole'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [roleLoading, setRoleLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const unsubscribe = subscribeToAuthChanges(
      async (user) => {
        if (!isMounted) {
          return
        }

        setCurrentUser(user)

        if (!user) {
          setUserRole(null)
          setRoleLoading(false)
          setAuthLoading(false)
          return
        }

        /*
         * Resolve a safe temporary role immediately.
         * This prevents admin@acharbari.com from buffering.
         */
        const normalizedEmail = user.email
          ?.trim()
          .toLowerCase()

        const immediateRole =
          normalizedEmail === 'admin@acharbari.com'
            ? USER_ROLES.ADMIN
            : USER_ROLES.USER

        setUserRole(immediateRole)
        setRoleLoading(false)
        setAuthLoading(false)

        /*
         * Try to replace the temporary role with the
         * secure Firebase custom claim.
         */
        try {
          const secureRole =
            await getAuthenticatedUserRole(user)

          if (!isMounted) {
            return
          }

          setUserRole(secureRole || immediateRole)
        } catch (error) {
          console.warn(
            'Role refresh failed. Keeping fallback role.',
            error,
          )

          if (isMounted) {
            setUserRole(immediateRole)
          }
        }
      },
    )

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [])

  const updateUserProfile = async (name) => {
    const updatedUser =
      await updateUserDisplayName(name)

    setCurrentUser({
      ...updatedUser,
    })

    return updatedUser
  }

  const value = {
    currentUser,
    userRole,
    authLoading,
    roleLoading,
    isAuthenticated: Boolean(currentUser),
    isAdmin: userRole === USER_ROLES.ADMIN,
    isRegularUser: userRole === USER_ROLES.USER,
    registerWithEmail,
    loginWithEmail,
    loginWithGoogle,
    sendPasswordReset,
    logoutUser,
    updateUserProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuth must be used inside an AuthProvider',
    )
  }

  return context
}
