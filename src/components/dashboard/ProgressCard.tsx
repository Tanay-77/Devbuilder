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
    <div className="card-retro p-6 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-black text-black mb-1 uppercase tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm font-bold text-gray-600">
            {progress.completedSteps.length} of {project.steps.length} steps completed
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-black">
            {Math.round(completionPercentage)}%
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="w-full bg-white border-2 border-black h-4 shadow-hard-sm">
          <div
            className="bg-retro-yellow h-full border-r-2 border-black transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center text-sm font-bold text-gray-600">
          <Clock className="h-4 w-4 mr-2" />
          Last active: {lastActivityDate}
        </div>
        {progress.isCompleted && (
          <div className="flex items-center text-sm font-black text-green-700 bg-green-100 px-2 py-1 border-2 border-green-800 shadow-hard-sm">
            <CheckCircle className="h-4 w-4 mr-1" />
            Completed
          </div>
        )}
      </div>

      <Link
        to={`/editor/${project.id}/${progress.currentStep}`}
        className="btn-retro-primary w-full justify-center"
      >
        {progress.isCompleted ? 'Review Project' : 'Continue'}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
};

export default ProgressCard;