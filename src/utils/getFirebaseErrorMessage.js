const errorMessages = {
  'auth/email-already-in-use':
    'An account already exists with this email address.',
  'auth/invalid-email':
    'Please enter a valid email address.',
  'auth/invalid-credential':
    'The email or password is incorrect.',
  'auth/user-not-found':
    'No account was found with this email address.',
  'auth/wrong-password':
    'The email or password is incorrect.',
  'auth/weak-password':
    'The password must be at least six characters long.',
  'auth/popup-closed-by-user':
    'The Google sign-in window was closed before completion.',
  'auth/popup-blocked':
    'Your browser blocked the Google sign-in popup.',
  'auth/too-many-requests':
    'Too many attempts were made. Please try again later.',
  'auth/network-request-failed':
    'A network error occurred. Check your internet connection.',
}

export function getFirebaseErrorMessage(error) {
  if (!error) {
    return 'An unexpected authentication error occurred.'
  }

  return (
    errorMessages[error.code] ||
    'Authentication failed. Please try again.'
  )
}
