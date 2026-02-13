import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, db } from '../config/firebase';
import { User } from '../types';

// Generate random cartoon-style avatar
const generateRandomCartoonAvatar = (): string => {
  const avatarStyles = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=',
    'https://api.dicebear.com/7.x/big-smile/svg?seed=',
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=',
    'https://api.dicebear.com/7.x/bottts/svg?seed=',
    'https://api.dicebear.com/7.x/personas/svg?seed=',
  ];

  const seeds = [
    'happy', 'cheerful', 'playful', 'whimsical', 'colorful', 'bright',
    'joyful', 'vibrant', 'animated', 'cartoon', 'fun', 'silly',
    'bouncy', 'energetic', 'magical', 'fantasy', 'rainbow', 'sparkle',
    'bubbly', 'giggly', 'quirky', 'zany', 'peppy', 'lively'
  ];

  const randomStyle = avatarStyles[Math.floor(Math.random() * avatarStyles.length)];
  const randomSeed = seeds[Math.floor(Math.random() * seeds.length)] + Math.floor(Math.random() * 1000);

  return `${randomStyle}${randomSeed}`;
};

// Convert Firebase user to our User type
const convertFirebaseUser = async (firebaseUser: FirebaseUser): Promise<User> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    const userData = userDoc.data();

    return {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || userData?.name || 'User',
      email: firebaseUser.email || '',
      avatar: firebaseUser.photoURL || userData?.avatar || generateRandomCartoonAvatar(),
      joinedAt: userData?.joinedAt || new Date().toISOString().split('T')[0],
      completedProjects: userData?.completedProjects || [],
      totalStepsCompleted: userData?.totalStepsCompleted || 0
    };
  } catch (error) {
    console.error('Error converting Firebase user:', error);
    // Return basic user data if Firestore fails
    return {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || 'User',
      email: firebaseUser.email || '',
      avatar: firebaseUser.photoURL || generateRandomCartoonAvatar(),
      joinedAt: new Date().toISOString().split('T')[0],
      completedProjects: [],
      totalStepsCompleted: 0
    };
  }
};

// Save user data to Firestore
const saveUserToFirestore = async (user: User) => {
  try {
    await setDoc(doc(db, 'users', user.id), {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      joinedAt: user.joinedAt,
      completedProjects: user.completedProjects,
      totalStepsCompleted: user.totalStepsCompleted,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving user to Firestore:', error);
    // Don't throw error - authentication can still work without Firestore
  }
};

// Detect if we're on mobile or if popups might be blocked
const shouldUseRedirect = (): boolean => {
  // Check if we're on mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Check if we're in an iframe (popups often blocked)
  const isInIframe = window.self !== window.top;

  // Check if we're on a domain that might have popup issues
  const isNetlify = window.location.hostname.includes('netlify.app');

  return isMobile || isInIframe || isNetlify;
};

// Google Sign In with fallback to redirect
export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    console.log('🚀 Starting Google sign-in...');
    console.log('📱 Should use redirect:', shouldUseRedirect());

    // Check if auth is properly initialized
    if (!auth) {
      throw new Error('Firebase auth not initialized');
    }

    if (!googleProvider) {
      throw new Error('Google provider not configured');
    }

    let result;

    // Try popup first, fallback to redirect if it fails
    try {
      console.log('🪟 Attempting popup sign-in...');
      result = await signInWithPopup(auth, googleProvider);
      console.log('✅ Popup sign-in successful:', result.user.email);
    } catch (popupError: any) {
      console.log('❌ Popup failed:', popupError.code, popupError.message);

      // If popup was blocked or closed, try redirect
      if (popupError.code === 'auth/popup-blocked' ||
        popupError.code === 'auth/popup-closed-by-user' ||
        popupError.code === 'auth/cancelled-popup-request') {

        console.log('🔄 Falling back to redirect sign-in...');
        await signInWithRedirect(auth, googleProvider);

        // The redirect will reload the page, so we won't reach this point
        // The result will be handled by getRedirectResult in the auth state listener
        return null;
      } else {
        // Re-throw other errors
        throw popupError;
      }
    }

    const firebaseUser = result.user;

    // Convert to our User type
    const user = await convertFirebaseUser(firebaseUser);
    console.log('👤 User converted:', user);

    // Save to Firestore (non-blocking)
    saveUserToFirestore(user).catch(error => {
      console.warn('⚠️ Failed to save user to Firestore:', error);
    });

    return user;
  } catch (error: any) {
    console.error('❌ Google sign in error:', error);
    console.error('🔍 Error details:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });

    // Handle specific error cases with more helpful messages
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in was cancelled. Please try again.');
    } else if (error.code === 'auth/popup-blocked') {
      throw new Error('Pop-up was blocked by your browser. Please allow pop-ups for this site and try again.');
    } else if (error.code === 'auth/network-request-failed') {
      throw new Error('Network error. Please check your internet connection and try again.');
    } else if (error.code === 'auth/unauthorized-domain') {
      throw new Error(`This domain (${window.location.hostname}) is not authorized for Google sign-in. Please add it to your Firebase authorized domains.`);
    } else if (error.code === 'auth/operation-not-allowed') {
      throw new Error('Google sign-in is not enabled in Firebase. Please contact support.');
    } else if (error.code === 'auth/invalid-api-key') {
      throw new Error('Invalid Firebase API key. Please check your configuration.');
    } else if (error.code === 'auth/app-not-authorized') {
      throw new Error('This app is not authorized to use Firebase Authentication. Please check your configuration.');
    } else {
      throw new Error(`Google sign-in failed: ${error.message || 'Unknown error'}`);
    }
  }
};

// Check for redirect result on app load
export const handleRedirectResult = async (): Promise<User | null> => {
  try {
    console.log('🔍 Checking for redirect result...');
    const result = await getRedirectResult(auth);

    if (result) {
      console.log('✅ Redirect sign-in successful:', result.user.email);
      const user = await convertFirebaseUser(result.user);

      // Save to Firestore (non-blocking)
      saveUserToFirestore(user).catch(error => {
        console.warn('⚠️ Failed to save user to Firestore:', error);
      });

      return user;
    }

    return null;
  } catch (error: any) {
    console.error('❌ Redirect result error:', error);
    throw new Error(`Redirect sign-in failed: ${error.message}`);
  }
};

// Email/Password Sign In
export const signInWithEmail = async (email: string, password: string): Promise<User | null> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return await convertFirebaseUser(result.user);
  } catch (error: any) {
    console.error('Email sign in error:', error);

    // Auto-create demo accounts if they don't exist
    if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
      if (email === 'alex@example.com' && password === 'password123') {
        console.log('✨ Auto-creating demo account for Alex...');
        return await signUpWithEmail('Alex Demo', email, password);
      }
      if (email === 'demo@example.com' && password === 'demo123') {
        console.log('✨ Auto-creating demo account...');
        return await signUpWithEmail('Demo User', email, password);
      }
    }

    // Handle standard errors
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
      throw new Error('Invalid email or password.');
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('Too many failed attempts. Please try again later.');
    } else if (error.code === 'auth/user-disabled') {
      throw new Error('This account has been disabled. Please contact support.');
    } else {
      throw new Error('Failed to sign in. Please try again.');
    }
  }
};

// Email/Password Sign Up
export const signUpWithEmail = async (name: string, email: string, password: string): Promise<User | null> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // Update the user's display name
    await updateProfile(result.user, {
      displayName: name,
      photoURL: generateRandomCartoonAvatar()
    });

    const user = await convertFirebaseUser(result.user);

    // Save to Firestore (non-blocking)
    saveUserToFirestore(user).catch(error => {
      console.warn('Failed to save user to Firestore:', error);
    });

    return user;
  } catch (error: any) {
    console.error('Email sign up error:', error);

    if (error.code === 'auth/email-already-in-use') {
      throw new Error('An account with this email already exists.');
    } else if (error.code === 'auth/weak-password') {
      throw new Error('Password is too weak. Please choose a stronger password.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Invalid email address.');
    } else {
      throw new Error('Failed to create account. Please try again.');
    }
  }
};

// Sign Out
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Sign out error:', error);
    throw new Error('Failed to sign out. Please try again.');
  }
};

// Auth State Observer with redirect result handling
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  // Check for redirect result first
  handleRedirectResult()
    .then(user => {
      if (user) {
        callback(user);
      }
    })
    .catch(error => {
      console.error('Error handling redirect result:', error);
    });

  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      try {
        const user = await convertFirebaseUser(firebaseUser);
        callback(user);
      } catch (error) {
        console.error('Error converting Firebase user:', error);
        callback(null);
      }
    } else {
      callback(null);
    }
  });
};

// Update user avatar
export const updateUserAvatar = async (userId: string): Promise<string> => {
  try {
    const newAvatar = generateRandomCartoonAvatar();

    // Update in Firestore
    await setDoc(doc(db, 'users', userId), {
      avatar: newAvatar,
      updatedAt: serverTimestamp()
    }, { merge: true });

    // Update Firebase Auth profile if current user
    if (auth.currentUser && auth.currentUser.uid === userId) {
      await updateProfile(auth.currentUser, {
        photoURL: newAvatar
      });
    }

    return newAvatar;
  } catch (error) {
    console.error('Error updating avatar:', error);
    throw new Error('Failed to update avatar. Please try again.');
  }
};