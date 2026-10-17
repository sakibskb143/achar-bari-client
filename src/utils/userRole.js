import { getIdTokenResult } from 'firebase/auth'
import { auth } from '../config/firebase'

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
}

const TEMPORARY_ADMIN_EMAILS = [
  'admin@acharbari.com',
]

function normalizeEmail(email = '') {
  return email.trim().toLowerCase()
}

export function getTemporaryRoleFromEmail(user) {
  const currentEmail = normalizeEmail(user?.email)

  const isTemporaryAdmin =
    TEMPORARY_ADMIN_EMAILS.some(
      (adminEmail) =>
        normalizeEmail(adminEmail) === currentEmail,
    )

  return isTemporaryAdmin
    ? USER_ROLES.ADMIN
    : USER_ROLES.USER
}

export async function getAuthenticatedUserRole(user) {
  if (!user) {
    return null
  }

  /*
   * First use the temporary development role.
   * This makes admin@acharbari.com work immediately
   * without waiting for Firebase custom claims.
   */
  const temporaryRole =
    getTemporaryRoleFromEmail(user)

  /*
   * Try to read the secure Firebase custom claim.
   * If it fails or does not exist, use the temporary role.
   */
  try {
    const tokenResult = await Promise.race([
      getIdTokenResult(user, true),

      new Promise((resolve) => {
        setTimeout(() => {
          resolve(null)
        }, 3000)
      }),
    ])

    const tokenRole = tokenResult?.claims?.role

    if (
      tokenRole === USER_ROLES.ADMIN ||
      tokenRole === USER_ROLES.USER
    ) {
      return tokenRole
    }
  } catch (error) {
    console.warn(
      'Firebase role claim could not be loaded. Using fallback role.',
      error,
    )
  }

  return temporaryRole
}

export async function getCurrentAuthenticatedUserRole() {
  return getAuthenticatedUserRole(auth.currentUser)
}

export function getDashboardPathForRole(role) {
  return role === USER_ROLES.ADMIN
    ? '/admin'
    : '/dashboard'
}
