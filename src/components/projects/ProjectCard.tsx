import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const difficultyColors = {
    Beginner: 'bg-green-100 text-black border-2 border-black',
    Intermediate: 'bg-retro-yellow text-black border-2 border-black',
    Advanced: 'bg-red-100 text-black border-2 border-black'
  };

  return (
    <div className="card-retro p-0 overflow-hidden hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-hard-lg transition-all duration-200 group flex flex-col h-full">
      <div className="relative h-48 flex-shrink-0 border-b-2 border-black">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-hard-sm ${difficultyColors[project.difficulty]}`}>
            {project.difficulty}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-black text-black mb-3 uppercase tracking-wide leading-tight group-hover:text-gray-700 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-800 mb-6 line-clamp-2 font-medium flex-grow">
          {project.description}
        </p>

        <div className="flex items-center justify-between mb-4 pt-4 border-t-2 border-gray-100">
          <div className="flex items-center text-sm font-bold text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            {project.estimatedTime}
          </div>
          <div className="text-sm font-bold text-gray-600">
            {project.steps.length} steps
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-white border-2 border-black text-black text-xs font-bold shadow-hard-sm"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 text-xs font-bold text-gray-500">+{project.technologies.length - 3}</span>
          )}
        </div>

        <div className="mt-auto">
          <Link
            to={`/projects/${project.id}`}
            className="w-full btn-retro-primary justify-center text-sm"
          >
            Start Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;