import React, { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import { projects } from '../../data/projects';
import ProjectCard from './ProjectCard';

const ProjectLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTechnology, setSelectedTechnology] = useState('All');

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const technologies = ['All', 'HTML', 'CSS', 'JavaScript', 'API'];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || project.difficulty === selectedDifficulty;
    const matchesTechnology = selectedTechnology === 'All' || project.technologies.includes(selectedTechnology);
    
    return matchesSearch && matchesDifficulty && matchesTechnology;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Library</h1>
        <p className="text-gray-600 text-lg">
          Choose from our curated collection of real-world projects designed to level up your development skills.
        </p>
      </div>

      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>

          <select
            value={selectedTechnology}
            onChange={(e) => setSelectedTechnology(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {technologies.map(tech => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedDifficulty('All');
              setSelectedTechnology('All');
            }}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectLibrary;