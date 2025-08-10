import { useState, useEffect } from 'react';
import { UserProgress } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { 
  getAllUserProgress, 
  updateStepCompletion, 
  getUserProgress,
  markProjectCompleted 
} from '../services/firestoreService';

export const useProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load user progress from Firestore
  useEffect(() => {
    const loadProgress = async () => {
      if (!user) {
        setProgress([]);
        setIsLoading(false);
        return;
      }

      try {
        const userProgress = await getAllUserProgress(user.id);
        setProgress(userProgress);
      } catch (error) {
        console.error('Error loading user progress:', error);
        setProgress([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProgress();
  }, [user]);

  const updateProgress = async (
    projectId: string, 
    stepId: string,
    code: { html: string; css: string; javascript: string }
  ) => {
    if (!user) return;

    try {
      await updateStepCompletion(user.id, projectId, stepId, code);
      
      // Refresh progress from Firestore
      const updatedProgress = await getAllUserProgress(user.id);
      setProgress(updatedProgress);
    } catch (error) {
      console.error('Error updating progress:', error);
      throw error;
    }
  };

  const getProjectProgress = (projectId: string): UserProgress | undefined => {
    return progress.find(p => p.projectId === projectId);
  };

  const completeProject = async (projectId: string) => {
    if (!user) return;

    try {
      await markProjectCompleted(user.id, projectId);
      
      // Refresh progress from Firestore
      const updatedProgress = await getAllUserProgress(user.id);
      setProgress(updatedProgress);
    } catch (error) {
      console.error('Error completing project:', error);
      throw error;
    }
  };

  return {
    progress,
    updateProgress,
    getProjectProgress,
    completeProject,
    isLoading
  };
};