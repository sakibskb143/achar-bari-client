import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../config/firebase.init";

const googleProvider = new GoogleAuthProvider();

// Register with email and password
export async function registerWithEmail(name, email, password) {
  await setPersistence(auth, browserLocalPersistence);

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  if (name.trim()) {
    await updateProfile(userCredential.user, {
      displayName: name.trim(),
    });
  }

  return userCredential.user;
}

// Login with email and password
export async function loginWithEmail(email, password) {
  await setPersistence(auth, browserLocalPersistence);

  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;
}

// Login with Google
export async function loginWithGoogle() {
  await setPersistence(auth, browserLocalPersistence);

  const userCredential = await signInWithPopup(auth, googleProvider);

  return userCredential.user;
}

// Send password reset email
export async function sendPasswordReset(email) {
  return sendPasswordResetEmail(auth, email);
}

// Logout
export async function logoutUser() {
  return signOut(auth);
}

// Listen for authentication changes
export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, callback);
}

// Update the current user's display name
export async function updateUserDisplayName(name) {
  if (!auth.currentUser) {
    throw new Error("No authenticated user found.");
  }

  await updateProfile(auth.currentUser, {
    displayName: name.trim(),
  });

  return auth.currentUser;
}