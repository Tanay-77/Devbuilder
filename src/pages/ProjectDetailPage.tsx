import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, Play, CheckCircle, Lock } from 'lucide-react';
import { projects } from '../data/projects';
import { useProgress } from '../hooks/useProgress';

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { getProjectProgress, isLoading } = useProgress();

  const project = projects.find(p => p.id === projectId);

  // Safe access to progress
  const progress = projectId ? getProjectProgress(projectId) : undefined;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card-retro p-8 text-center">
          <h2 className="text-2xl font-black text-black mb-4">Project not found</h2>
          <Link to="/projects" className="btn-retro-primary">Back to Projects</Link>
        </div>
      </div>
    );
  }

  const difficultyColors = {
    Beginner: 'bg-green-100 text-black border-2 border-black',
    Intermediate: 'bg-retro-yellow text-black border-2 border-black',
    Advanced: 'bg-red-100 text-black border-2 border-black'
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/projects"
        className="inline-flex items-center text-black font-bold hover:text-gray-700 mb-6 group transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Projects
      </Link>

      <div className="card-retro p-0 overflow-hidden">
        <div className="relative border-b-2 border-black">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-4 right-4">
            <span className={`px-4 py-2 text-sm font-bold uppercase tracking-wider shadow-hard ${difficultyColors[project.difficulty]}`}>
              {project.difficulty}
            </span>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight">
              {project.title}
            </h1>
            <p className="text-xl text-gray-800 font-medium leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10 p-6 bg-retro-white border-2 border-black shadow-hard-sm">
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-black mr-3" />
              <div>
                <span className="block text-xs font-bold uppercase text-gray-500">Estimated Time</span>
                <span className="text-lg font-black text-black">{project.estimatedTime}</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="h-10 w-10 flex items-center justify-center bg-black text-white font-black rounded-sm mr-3">
                {project.steps.length}
              </span>
              <div>
                <span className="block text-xs font-bold uppercase text-gray-500">Total Steps</span>
                <span className="text-lg font-black text-black">Interactive Tasks</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-white border-2 border-black text-black text-xs font-bold shadow-hard-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-black text-black mb-6 uppercase tracking-tight flex items-center">
              Project Steps
              <span className="ml-4 h-1 flex-grow bg-black"></span>
            </h2>
            <div className="space-y-4">
              {project.steps.map((step, index) => {
                const stepNumber = index + 1;
                const isCompleted = progress?.completedSteps.includes(step.id) || false;
                const isUnlocked = stepNumber === 1 || (progress?.completedSteps.length || 0) >= stepNumber - 1;

                return (
                  <div
                    key={step.id}
                    className={`p-6 border-2 transition-all duration-200 ${isCompleted
                        ? 'border-black bg-green-50 shadow-hard-sm'
                        : isUnlocked
                          ? 'border-black bg-white shadow-hard hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard-lg'
                          : 'border-gray-300 bg-gray-50 opacity-70'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`flex items-center justify-center w-10 h-10 border-2 border-black shadow-hard-sm transition-colors ${isCompleted
                            ? 'bg-green-400 text-black'
                            : isUnlocked
                              ? 'bg-retro-yellow text-black'
                              : 'bg-gray-200 text-gray-500 border-gray-400 shadow-none'
                          }`}>
                          {isCompleted ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : isUnlocked ? (
                            <span className="font-black text-lg">{stepNumber}</span>
                          ) : (
                            <Lock className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <h3 className={`font-black text-lg ${isUnlocked ? 'text-black' : 'text-gray-500'}`}>
                            {step.title}
                          </h3>
                          <p className={`text-sm font-medium ${isUnlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                            {step.description}
                          </p>
                        </div>
                      </div>
                      {isUnlocked && (
                        <Link
                          to={`/editor/${project.id}/${stepNumber}`}
                          className={`btn-retro-secondary px-4 py-2 text-sm ${isCompleted ? 'bg-green-100' : ''}`}
                        >
                          {isCompleted ? 'Review' : 'Start'}
                          <Play className="ml-2 h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center pt-6 border-t-2 border-black">
            <Link
              to={`/editor/${project.id}/1`}
              className="btn-retro-primary text-lg px-8 py-4"
            >
              {progress && progress.completedSteps.length > 0 ? 'Continue Project' : 'Start Project'}
              <Play className="ml-3 h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;