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
} from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setCurrentUser(user)
      setAuthLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    authLoading,
    isAuthenticated: Boolean(currentUser),
    registerWithEmail,
    loginWithEmail,
    loginWithGoogle,
    sendPasswordReset,
    logoutUser,
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
