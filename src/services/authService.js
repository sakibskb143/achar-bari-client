import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../config/firebase'

const googleProvider = new GoogleAuthProvider()

export async function registerWithEmail(
  name,
  email,
  password,
) {
  await setPersistence(
    auth,
    browserLocalPersistence,
  )

  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    )

  if (name.trim()) {
    await updateProfile(userCredential.user, {
      displayName: name.trim(),
    })
  }

  return userCredential.user
}

export async function loginWithEmail(
  email,
  password,
) {
  await setPersistence(
    auth,
    browserLocalPersistence,
  )

  const userCredential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password,
    )

  return userCredential.user
}

export async function loginWithGoogle() {
  await setPersistence(
    auth,
    browserLocalPersistence,
  )

  const userCredential = await signInWithPopup(
    auth,
    googleProvider,
  )

  return userCredential.user
}

export async function sendPasswordReset(email) {
  return sendPasswordResetEmail(auth, email)
}

export async function logoutUser() {
  return signOut(auth)
}

export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, callback)
}

export async function updateUserDisplayName(name) {
  if (!auth.currentUser) {
    throw new Error('No authenticated user found.')
  }

  await updateProfile(auth.currentUser, {
    displayName: name,
  })

  return auth.currentUser
}
