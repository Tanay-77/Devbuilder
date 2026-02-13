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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="card-retro p-0 overflow-hidden mb-12">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-12 relative overflow-hidden border-b-2 border-black">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-4 w-8 h-8 bg-yellow-300 rounded-full animate-bounce border-2 border-black"></div>
            <div className="absolute top-8 right-8 w-6 h-6 bg-pink-300 rounded-full animate-pulse border-2 border-black"></div>
            <div className="absolute bottom-4 left-1/4 w-4 h-4 bg-blue-300 rounded-full animate-ping border border-black"></div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-24 w-24 rounded-full border-4 border-black shadow-hard bg-white p-1"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-retro-yellow rounded-full flex items-center justify-center border-2 border-black shadow-hard-sm">
                  <Sparkles className="h-4 w-4 text-black" />
                </div>
              </div>
              <div className="text-white">
                <h1 className="text-4xl font-black drop-shadow-md text-white tracking-tight">{user.name}</h1>
                <p className="text-purple-100 font-bold mb-2 text-lg">{user.email}</p>
                <div className="flex items-center text-purple-100 font-bold">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Joined {new Date(user.joinedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={createFreshProfile}
              className="flex items-center px-4 py-2 bg-white/20 text-white font-bold rounded-lg hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border-2 border-white/50 hover:border-white shadow-lg hover:scale-105 transform"
              title="Generate New Cartoon Avatar"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              New Avatar
            </button>
          </div>
        </div>

        <div className="p-8 bg-retro-white">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-100 border-2 border-black shadow-hard-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard transition-all">
              <div className="text-4xl font-black text-black mb-2">
                {completedProjects.length}
              </div>
              <p className="text-blue-800 font-bold uppercase tracking-wide text-sm">Projects Completed</p>
            </div>
            <div className="text-center p-6 bg-green-100 border-2 border-black shadow-hard-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard transition-all">
              <div className="text-4xl font-black text-black mb-2">
                {totalStepsCompleted}
              </div>
              <p className="text-green-800 font-bold uppercase tracking-wide text-sm">Steps Completed</p>
            </div>
            <div className="text-center p-6 bg-purple-100 border-2 border-black shadow-hard-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard transition-all">
              <div className="text-4xl font-black text-black mb-2">
                {achievements.filter(a => a.unlocked).length}
              </div>
              <p className="text-purple-800 font-bold uppercase tracking-wide text-sm">Achievements Unlocked</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card-retro p-6">
          <div className="flex items-center mb-6 border-b-2 border-black pb-4">
            <Award className="h-6 w-6 text-black mr-2" />
            <h2 className="text-2xl font-black text-black uppercase tracking-tight">Achievements</h2>
          </div>

          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 border-2 transition-all duration-300 ${achievement.unlocked
                  ? 'border-black bg-retro-yellow shadow-hard-sm'
                  : 'border-gray-300 bg-gray-50'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-black ${achievement.unlocked ? 'text-black' : 'text-gray-500'
                      }`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-sm font-medium ${achievement.unlocked ? 'text-gray-800' : 'text-gray-400'
                      }`}>
                      {achievement.description}
                    </p>
                  </div>
                  <div className={`p-2 border-2 ${achievement.unlocked ? 'bg-white border-black text-black shadow-sm' : 'bg-gray-200 border-gray-300 text-gray-400'
                    }`}>
                    <Award className="h-5 w-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-retro p-6">
          <div className="flex items-center mb-6 border-b-2 border-black pb-4">
            <Code className="h-6 w-6 text-black mr-2" />
            <h2 className="text-2xl font-black text-black uppercase tracking-tight">Portfolio</h2>
          </div>

          {completedProjects.length > 0 ? (
            <div className="space-y-4">
              {completedProjects.map((progressItem) => {
                const project = projects.find(p => p.id === progressItem.projectId);
                if (!project) return null;

                return (
                  <div key={progressItem.projectId} className="border-2 border-black bg-white p-4 shadow-hard-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard transition-all">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-black text-black mb-1 text-lg">
                          {project.title}
                        </h3>
                        <p className="text-sm font-bold text-gray-600 mb-3">
                          Completed {new Date(progressItem.lastActivity).toLocaleDateString()}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-retro-white border border-black text-black text-xs font-bold"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-black hover:bg-retro-yellow border-2 border-transparent hover:border-black transition-all">
                          <Github className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-black hover:bg-retro-yellow border-2 border-transparent hover:border-black transition-all">
                          <ExternalLink className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-gray-300 bg-gray-50">
              <div className="w-16 h-16 bg-blue-100 border-2 border-black flex items-center justify-center mx-auto mb-4 shadow-hard-sm">
                <Code className="h-8 w-8 text-black" />
              </div>
              <h3 className="font-black text-black mb-2 text-lg">Fresh Start!</h3>
              <p className="text-gray-800 font-medium mb-4">No completed projects yet.</p>
              <div className="flex justify-center">
                <span className="inline-block px-4 py-2 bg-retro-yellow border-2 border-black text-xs font-bold uppercase tracking-wider shadow-hard-sm">
                  Start Building
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;