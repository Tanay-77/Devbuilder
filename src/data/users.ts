import { UserProgress } from '../types';

// Initialize with empty progress for fresh user experience
export const userProgress: UserProgress[] = [];

// Helper function to reset user progress
export const resetUserProgress = (): UserProgress[] => {
  localStorage.removeItem('devbuilder_progress');
  return [];
};

// Helper function to initialize default dashboard settings
export const initializeDefaultSettings = () => {
  const defaultSettings = {
    theme: 'light',
    notifications: true,
    autoSave: true,
    language: 'en',
    dashboardLayout: 'grid',
    showWelcomeMessage: true,
    emailUpdates: false
  };
  
  localStorage.setItem('devbuilder_settings', JSON.stringify(defaultSettings));
  return defaultSettings;
};