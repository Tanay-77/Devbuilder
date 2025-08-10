import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag, ArrowRight } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[project.difficulty]}`}>
            {project.difficulty}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            {project.estimatedTime}
          </div>
          <div className="text-sm text-gray-500">
            {project.steps.length} steps
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 text-xs text-gray-600"
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
        
        <Link
          to={`/projects/${project.id}`}
          className="inline-flex items-center w-full justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors group"
        >
          Start Project
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;