import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  connectFirestoreEmulator,
  enableNetwork,
  disableNetwork
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { UserProgress, User } from '../types';

// Connection retry logic
let connectionRetries = 0;
const MAX_RETRIES = 3;

// Helper function to handle Firestore connection issues
const handleFirestoreError = (error: any, operation: string) => {
  console.error(`Firestore ${operation} error:`, error);
  
  if (error.code === 'unavailable' || error.message.includes('ERR_BLOCKED_BY_CLIENT')) {
    console.warn('Firestore connection blocked or unavailable. This might be due to:');
    console.warn('1. Ad blocker blocking Firebase requests');
    console.warn('2. Network connectivity issues');
    console.warn('3. Firestore service temporarily unavailable');
    
    if (connectionRetries < MAX_RETRIES) {
      connectionRetries++;
      console.log(`Retrying connection (attempt ${connectionRetries}/${MAX_RETRIES})...`);
      return true; // Indicate retry should be attempted
    }
  }
  
  return false; // No retry
};

// Retry wrapper for Firestore operations
const withRetry = async <T>(operation: () => Promise<T>, operationName: string): Promise<T> => {
  try {
    const result = await operation();
    connectionRetries = 0; // Reset on success
    return result;
  } catch (error: any) {
    const shouldRetry = handleFirestoreError(error, operationName);
    
    if (shouldRetry) {
      // Wait a bit before retrying
      await new Promise(resolve => setTimeout(resolve, 1000 * connectionRetries));
      return await operation();
    }
    
    throw error;
  }
};

// User Progress Management
export const saveUserProgress = async (userId: string, progress: UserProgress): Promise<void> => {
  return withRetry(async () => {
    const progressRef = doc(db, 'userProgress', `${userId}_${progress.projectId}`);
    await setDoc(progressRef, {
      ...progress,
      updatedAt: serverTimestamp()
    }, { merge: true });
  }, 'saveUserProgress');
};

export const getUserProgress = async (userId: string, projectId: string): Promise<UserProgress | null> => {
  return withRetry(async () => {
    const progressRef = doc(db, 'userProgress', `${userId}_${projectId}`);
    const progressDoc = await getDoc(progressRef);
    
    if (progressDoc.exists()) {
      return progressDoc.data() as UserProgress;
    }
    
    return null;
  }, 'getUserProgress');
};

export const getAllUserProgress = async (userId: string): Promise<UserProgress[]> => {
  return withRetry(async () => {
    const progressQuery = query(
      collection(db, 'userProgress'),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(progressQuery);
    return querySnapshot.docs.map(doc => doc.data() as UserProgress);
  }, 'getAllUserProgress');
};

// Update step completion with better error handling and offline support
export const updateStepCompletion = async (
  userId: string, 
  projectId: string, 
  stepId: string,
  code: { html: string; css: string; javascript: string }
): Promise<void> => {
  return withRetry(async () => {
    console.log('Updating step completion:', { userId, projectId, stepId });
    
    const progressRef = doc(db, 'userProgress', `${userId}_${projectId}`);
    
    // First, try to get existing progress
    let currentProgress: UserProgress | null = null;
    try {
      const progressDoc = await getDoc(progressRef);
      if (progressDoc.exists()) {
        currentProgress = progressDoc.data() as UserProgress;
      }
    } catch (error) {
      console.warn('Could not fetch existing progress, creating new:', error);
    }
    
    if (currentProgress) {
      // Update existing progress
      const updatedCompletedSteps = [...currentProgress.completedSteps];
      
      if (!updatedCompletedSteps.includes(stepId)) {
        updatedCompletedSteps.push(stepId);
      }
      
      const updatedProgress = {
        ...currentProgress,
        completedSteps: updatedCompletedSteps,
        currentStep: Math.max(currentProgress.currentStep, updatedCompletedSteps.length),
        lastActivity: new Date().toISOString(),
        updatedAt: serverTimestamp()
      };
      
      await setDoc(progressRef, updatedProgress, { merge: true });
      
      // Save the code for this step (non-blocking)
      saveStepCode(userId, projectId, stepId, code).catch(error => {
        console.warn('Failed to save step code:', error);
      });
      
      // Update user's total steps completed (non-blocking)
      updateUserStats(userId, updatedCompletedSteps.length).catch(error => {
        console.warn('Failed to update user stats:', error);
      });
    } else {
      // Create new progress entry
      const newProgress: UserProgress = {
        userId,
        projectId,
        currentStep: 1,
        completedSteps: [stepId],
        startedAt: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        isCompleted: false
      };
      
      await setDoc(progressRef, {
        ...newProgress,
        updatedAt: serverTimestamp()
      });
      
      // Save code and stats (non-blocking)
      saveStepCode(userId, projectId, stepId, code).catch(error => {
        console.warn('Failed to save step code:', error);
      });
      updateUserStats(userId, 1).catch(error => {
        console.warn('Failed to update user stats:', error);
      });
    }
    
    console.log('Step completion updated successfully');
  }, 'updateStepCompletion');
};

// Save user's code for a specific step
export const saveStepCode = async (
  userId: string,
  projectId: string,
  stepId: string,
  code: { html: string; css: string; javascript: string }
): Promise<void> => {
  return withRetry(async () => {
    const codeRef = doc(db, 'userCode', `${userId}_${projectId}_${stepId}`);
    await setDoc(codeRef, {
      userId,
      projectId,
      stepId,
      code,
      savedAt: serverTimestamp()
    });
  }, 'saveStepCode');
};

// Get user's saved code for a specific step
export const getStepCode = async (
  userId: string,
  projectId: string,
  stepId: string
): Promise<{ html: string; css: string; javascript: string } | null> => {
  return withRetry(async () => {
    const codeRef = doc(db, 'userCode', `${userId}_${projectId}_${stepId}`);
    const codeDoc = await getDoc(codeRef);
    
    if (codeDoc.exists()) {
      return codeDoc.data().code;
    }
    
    return null;
  }, 'getStepCode');
};

// Update user statistics with better error handling
export const updateUserStats = async (userId: string, totalStepsCompleted: number): Promise<void> => {
  return withRetry(async () => {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      totalStepsCompleted,
      updatedAt: serverTimestamp()
    }, { merge: true });
  }, 'updateUserStats');
};

// Mark project as completed
export const markProjectCompleted = async (userId: string, projectId: string): Promise<void> => {
  return withRetry(async () => {
    const progressRef = doc(db, 'userProgress', `${userId}_${projectId}`);
    await setDoc(progressRef, {
      isCompleted: true,
      completedAt: new Date().toISOString(),
      updatedAt: serverTimestamp()
    }, { merge: true });
    
    // Add to user's completed projects
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      completedProjects: arrayUnion(projectId),
      updatedAt: serverTimestamp()
    }, { merge: true });
  }, 'markProjectCompleted');
};

// Get user achievements
export const getUserAchievements = async (userId: string): Promise<string[]> => {
  return withRetry(async () => {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data().achievements || [];
    }
    
    return [];
  }, 'getUserAchievements');
};

// Add achievement to user
export const addUserAchievement = async (userId: string, achievementId: string): Promise<void> => {
  return withRetry(async () => {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      achievements: arrayUnion(achievementId),
      updatedAt: serverTimestamp()
    }, { merge: true });
  }, 'addUserAchievement');
};

// Save user settings
export const saveUserSettings = async (userId: string, settings: Record<string, any>): Promise<void> => {
  return withRetry(async () => {
    const settingsRef = doc(db, 'userSettings', userId);
    await setDoc(settingsRef, {
      ...settings,
      updatedAt: serverTimestamp()
    }, { merge: true });
  }, 'saveUserSettings');
};

// Get user settings
export const getUserSettings = async (userId: string): Promise<Record<string, any> | null> => {
  return withRetry(async () => {
    const settingsRef = doc(db, 'userSettings', userId);
    const settingsDoc = await getDoc(settingsRef);
    
    if (settingsDoc.exists()) {
      return settingsDoc.data();
    }
    
    return null;
  }, 'getUserSettings');
};

// Connection health check
export const checkFirestoreConnection = async (): Promise<boolean> => {
  try {
    // Try a simple read operation
    const testRef = doc(db, 'test', 'connection');
    await getDoc(testRef);
    console.log('✅ Firestore connection healthy');
    return true;
  } catch (error) {
    console.warn('⚠️ Firestore connection issue:', error);
    return false;
  }
};

// Initialize connection check on module load
if (typeof window !== 'undefined') {
  // Check connection after a short delay
  setTimeout(() => {
    checkFirestoreConnection().then(isHealthy => {
      if (!isHealthy) {
        console.warn('🔧 Firestore connection issues detected. Please check:');
        console.warn('1. Disable ad blockers for this site');
        console.warn('2. Check your internet connection');
        console.warn('3. Try refreshing the page');
      }
    });
  }, 2000);
}