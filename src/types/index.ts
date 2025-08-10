export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  technologies: string[];
  estimatedTime: string;
  thumbnail: string;
  steps: ProjectStep[];
  tags: string[];
}

export interface ProjectStep {
  id: string;
  title: string;
  description: string;
  instructions: string;
  startingCode: {
    html: string;
    css: string;
    javascript: string;
  };
  expectedOutput: string;
  validationRules: string[];
  isCompleted: boolean;
  isUnlocked: boolean;
}

export interface UserProgress {
  userId: string;
  projectId: string;
  currentStep: number;
  completedSteps: string[];
  startedAt: string;
  lastActivity: string;
  isCompleted: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinedAt: string;
  completedProjects: string[];
  totalStepsCompleted: number;
}