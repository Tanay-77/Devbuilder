import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, Play, CheckCircle, Lock } from 'lucide-react';
import { projects } from '../data/projects';
import { useProgress } from '../hooks/useProgress';

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { getProjectProgress, isLoading } = useProgress();
  
  const project = projects.find(p => p.id === projectId);
  const progress = getProjectProgress(projectId || '');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p>Project not found</p>
      </div>
    );
  }

  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-red-100 text-red-800'
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/projects"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Projects
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-64 object-cover"
        />
        
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {project.title}
              </h1>
              <p className="text-lg text-gray-600">
                {project.description}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[project.difficulty]}`}>
              {project.difficulty}
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-600">{project.estimatedTime}</span>
            </div>
            <div className="text-gray-600">
              {project.steps.length} Steps
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-blue-50 text-blue-600 text-sm rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Steps</h2>
            <div className="space-y-4">
              {project.steps.map((step, index) => {
                const stepNumber = index + 1;
                const isCompleted = progress?.completedSteps.includes(step.id) || false;
                const isUnlocked = stepNumber === 1 || (progress?.completedSteps.length || 0) >= stepNumber - 1;
                
                return (
                  <div
                    key={step.id}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      isCompleted
                        ? 'border-green-200 bg-green-50'
                        : isUnlocked
                        ? 'border-blue-200 bg-blue-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
                          isCompleted
                            ? 'bg-green-500 text-white'
                            : isUnlocked
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-300 text-gray-500'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : isUnlocked ? (
                            stepNumber
                          ) : (
                            <Lock className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {step.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {step.description}
                          </p>
                        </div>
                      </div>
                      {isUnlocked && (
                        <Link
                          to={`/editor/${project.id}/${stepNumber}`}
                          className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                        >
                          {isCompleted ? 'Review' : 'Start'}
                          <Play className="ml-1 h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center">
            <Link
              to={`/editor/${project.id}/1`}
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              {progress ? 'Continue Project' : 'Start Project'}
              <Play className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;