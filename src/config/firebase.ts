import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfqzEJJVtW0uorOpCnTuNGKFWS9vc3Xyw",
  authDomain: "devbuilder-50574.firebaseapp.com",
  projectId: "devbuilder-50574",
  storageBucket: "devbuilder-50574.firebasestorage.app",
  messagingSenderId: "685128249230",
  appId: "1:685128249230:web:991f104ddc494f053dbedf",
  measurementId: "G-6X0GL122FX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Google Auth Provider with enhanced configuration
export const googleProvider = new GoogleAuthProvider();

// Configure Google provider settings for better UX and compatibility
googleProvider.addScope('email');
googleProvider.addScope('profile');

// Enhanced custom parameters for better reliability
googleProvider.setCustomParameters({
  prompt: 'select_account',
  access_type: 'offline',
  include_granted_scopes: 'true',
  // Force fresh authentication to avoid cached issues
  login_hint: '',
  hd: '' // Remove any domain restrictions
});

// Debug logging with more details
console.log('🔥 Firebase initialized with config:', {
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  environment: import.meta.env.MODE
});

console.log('🌐 Current domain info:', {
  hostname: window.location.hostname,
  origin: window.location.origin,
  protocol: window.location.protocol,
  port: window.location.port
});

// Check if we're in development and log additional info
if (import.meta.env.DEV) {
  console.log('🔧 Development mode detected');
  console.log('📋 Authorized domains should include:');
  console.log('  - localhost');
  console.log('  - 127.0.0.1');
  console.log('  - your-netlify-domain.netlify.app');
  console.log('  - musical-granita-722382.netlify.app');
}

export default app;