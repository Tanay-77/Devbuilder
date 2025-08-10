import React from 'react';
import { Calendar, Award, Code, Github, ExternalLink, RefreshCw, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../hooks/useProgress';
import { projects } from '../data/projects';

const ProfilePage: React.FC = () => {
  const { user, createFreshProfile } = useAuth();
  const { progress, isLoading } = useProgress();
  
  const completedProjects = progress.filter(p => p.isCompleted);
  const totalStepsCompleted = progress.reduce((acc, p) => acc + p.completedSteps.length, 0);

  const achievements = [
    { title: 'First Steps', description: 'Completed your first project step', unlocked: totalStepsCompleted > 0 },
    { title: 'Project Starter', description: 'Completed your first project', unlocked: completedProjects.length > 0 },
    { title: 'Code Warrior', description: 'Completed 10 project steps', unlocked: totalStepsCompleted >= 10 },
    { title: 'Master Builder', description: 'Completed 5 projects', unlocked: completedProjects.length >= 5 }
  ];

  if (!user || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 px-8 py-12 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-4 w-8 h-8 bg-yellow-300 rounded-full animate-bounce"></div>
            <div className="absolute top-8 right-8 w-6 h-6 bg-pink-300 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 left-1/4 w-4 h-4 bg-blue-300 rounded-full animate-ping"></div>
            <div className="absolute bottom-8 right-1/3 w-5 h-5 bg-green-300 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          </div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-24 w-24 rounded-full border-4 border-white shadow-xl bg-white p-1"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white">
                  <Sparkles className="h-4 w-4 text-yellow-800" />
                </div>
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold drop-shadow-lg">{user.name}</h1>
                <p className="text-purple-100 mb-2">{user.email}</p>
                <div className="flex items-center text-purple-100">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Joined {new Date(user.joinedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={createFreshProfile}
              className="flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/30 hover:scale-105 transform"
              title="Generate New Cartoon Avatar"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              New Avatar
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {completedProjects.length}
              </div>
              <p className="text-blue-800 font-medium">Projects Completed</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {totalStepsCompleted}
              </div>
              <p className="text-green-800 font-medium">Steps Completed</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {achievements.filter(a => a.unlocked).length}
              </div>
              <p className="text-purple-800 font-medium">Achievements Unlocked</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <Award className="h-6 w-6 text-yellow-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Achievements</h2>
          </div>
          
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  achievement.unlocked
                    ? 'border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-md'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-medium ${
                      achievement.unlocked ? 'text-yellow-800' : 'text-gray-500'
                    }`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-sm ${
                      achievement.unlocked ? 'text-yellow-700' : 'text-gray-400'
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                  <div className={`p-2 rounded-full ${
                    achievement.unlocked ? 'bg-yellow-200' : 'bg-gray-200'
                  }`}>
                    <Award className={`h-4 w-4 ${
                      achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'
                    }`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <Code className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Portfolio</h2>
          </div>
          
          {completedProjects.length > 0 ? (
            <div className="space-y-4">
              {completedProjects.map((progressItem) => {
                const project = projects.find(p => p.id === progressItem.projectId);
                if (!project) return null;
                
                return (
                  <div key={progressItem.projectId} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Completed {new Date(progressItem.lastActivity).toLocaleDateString()}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors">
                          <Github className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors">
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fresh Start!</h3>
              <p className="text-gray-500 mb-4">No completed projects yet.</p>
              <p className="text-sm text-gray-400">
                Complete projects to build your portfolio and showcase your skills.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;