import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Project, UserProgress } from '../../types';

interface ProgressCardProps {
  project: Project;
  progress: UserProgress;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ project, progress }) => {
  const completionPercentage = (progress.completedSteps.length / project.steps.length) * 100;
  const lastActivityDate = new Date(progress.lastActivity).toLocaleDateString();

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600">
              {progress.completedSteps.length} of {project.steps.length} steps completed
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(completionPercentage)}%
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            Last active: {lastActivityDate}
          </div>
          {progress.isCompleted && (
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              Completed
            </div>
          )}
        </div>

        <Link
          to={`/editor/${project.id}/${progress.currentStep}`}
          className="inline-flex items-center w-full justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          {progress.isCompleted ? 'Review Project' : 'Continue'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default ProgressCard;