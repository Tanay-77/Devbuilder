// Firebase Setup Verification Utility
// Run this to verify your Firebase setup is working correctly

import { auth, db } from '../config/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

export const verifyFirebaseSetup = async (): Promise<{
  auth: boolean;
  firestore: boolean;
  errors: string[];
}> => {
  const results = {
    auth: false,
    firestore: false,
    errors: [] as string[]
  };

  // Test Firebase Auth
  try {
    if (auth) {
      results.auth = true;
      console.log('✅ Firebase Auth initialized successfully');
    } else {
      results.errors.push('Firebase Auth not initialized');
    }
  } catch (error) {
    results.errors.push(`Firebase Auth error: ${error}`);
  }

  // Test Firestore
  try {
    if (db) {
      // Try to write and read a test document
      const testCollection = collection(db, 'test');
      const testDoc = await addDoc(testCollection, {
        test: true,
        timestamp: new Date()
      });
      
      // Try to read it back
      const snapshot = await getDocs(testCollection);
      const found = snapshot.docs.find(doc => doc.id === testDoc.id);
      
      if (found) {
        results.firestore = true;
        console.log('✅ Firestore read/write test successful');
        
        // Clean up test document
        await deleteDoc(doc(db, 'test', testDoc.id));
        console.log('✅ Test document cleaned up');
      } else {
        results.errors.push('Firestore read test failed');
      }
    } else {
      results.errors.push('Firestore not initialized');
    }
  } catch (error: any) {
    results.errors.push(`Firestore error: ${error.message}`);
  }

  return results;
};

// Domain verification utility
export const verifyDomainSetup = (): {
  currentDomain: string;
  isLocalhost: boolean;
  isNetlify: boolean;
  recommendations: string[];
} => {
  const currentDomain = window.location.hostname;
  const isLocalhost = currentDomain === 'localhost' || currentDomain === '127.0.0.1';
  const isNetlify = currentDomain.includes('netlify.app');
  
  const recommendations = [];
  
  if (!isLocalhost && !isNetlify) {
    recommendations.push(`Add "${currentDomain}" to Firebase authorized domains`);
  }
  
  if (window.location.protocol !== 'https:' && !isLocalhost) {
    recommendations.push('Use HTTPS for production domains');
  }
  
  return {
    currentDomain,
    isLocalhost,
    isNetlify,
    recommendations
  };
};

// Run setup verification in development
if (import.meta.env.DEV) {
  console.log('🔍 Running Firebase setup verification...');
  
  verifyFirebaseSetup().then(results => {
    console.log('📊 Firebase Setup Results:', results);
    
    if (results.auth && results.firestore) {
      console.log('🎉 Firebase setup is working correctly!');
    } else {
      console.warn('⚠️ Firebase setup issues detected:', results.errors);
    }
  });
  
  const domainInfo = verifyDomainSetup();
  console.log('🌐 Domain Setup Info:', domainInfo);
  
  if (domainInfo.recommendations.length > 0) {
    console.warn('📝 Domain Setup Recommendations:', domainInfo.recommendations);
  }
}