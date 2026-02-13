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
      <div className="mb-12">
        <h1 className="text-4xl font-black text-black mb-4 tracking-tight">Project Library</h1>
        <p className="text-gray-800 text-xl font-medium max-w-2xl">
          Choose from our curated collection of real-world projects designed to level up your development skills.
        </p>
      </div>

      <div className="mb-12 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black h-5 w-5" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-black rounded-none shadow-hard focus:ring-0 focus:shadow-hard-lg transition-all font-bold placeholder-gray-500"
          />
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2 mr-2">
            <Filter className="h-5 w-5 text-black" />
            <span className="text-base font-bold text-black">Filters:</span>
          </div>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-2 border-2 border-black rounded-none text-sm font-bold shadow-hard focus:ring-0 focus:shadow-hard-sm cursor-pointer"
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>

          <select
            value={selectedTechnology}
            onChange={(e) => setSelectedTechnology(e.target.value)}
            className="px-4 py-2 border-2 border-black rounded-none text-sm font-bold shadow-hard focus:ring-0 focus:shadow-hard-sm cursor-pointer"
          >
            {technologies.map(tech => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 card-retro border-dashed">
          <p className="text-gray-800 text-lg font-bold">No projects found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedDifficulty('All');
              setSelectedTechnology('All');
            }}
            className="mt-4 text-black underline font-black hover:text-gray-600 decoration-2 underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectLibrary;