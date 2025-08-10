import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, Clock, Award, RefreshCw, Sparkles } from 'lucide-react';
import { projects } from '../data/projects';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../hooks/useProgress';
import { triggerSuccessSparkle } from '../utils/confetti';
import ProgressCard from '../components/dashboard/ProgressCard';

const DashboardPage: React.FC = () => {
  const { user, createFreshProfile } = useAuth();
  const { progress, isLoading } = useProgress();
  
  const activeProjects = progress.filter(p => !p.isCompleted);
  const completedProjects = progress.filter(p => p.isCompleted);
  const totalStepsCompleted = progress.reduce((acc, p) => acc + p.completedSteps.length, 0);

  const stats = [
    {
      label: 'Active Projects',
      value: activeProjects.length,
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100'
    },
    {
      label: 'Completed Projects',
      value: completedProjects.length,
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100'
    },
    {
      label: 'Steps Completed',
      value: totalStepsCompleted,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100'
    },
    {
      label: 'Total Projects',
      value: projects.length,
      icon: BarChart3,
      color: 'text-orange-600',
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100'
    }
  ];

  const handleNewAvatar = async () => {
    await createFreshProfile();
    // Trigger a small celebration for the new avatar
    setTimeout(async () => {
      await triggerSuccessSparkle();
    }, 300);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {user?.avatar && (
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-12 w-12 rounded-full border-2 border-purple-200 shadow-lg bg-white p-0.5"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="h-2 w-2 text-yellow-800" />
                </div>
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600">
                Track your progress and continue building amazing projects.
              </p>
            </div>
          </div>
          
          {/* Fresh Profile Button for Demo */}
          <button
            onClick={handleNewAvatar}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-lg hover:from-purple-200 hover:to-pink-200 transition-all duration-300 border border-purple-200 hover:scale-105 transform shadow-md"
            title="Generate New Cartoon Avatar"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            New Avatar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bgColor} mr-4`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Active Projects</h2>
            <Link
              to="/projects"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Browse all projects
            </Link>
          </div>
          
          {activeProjects.length > 0 ? (
            <div className="space-y-4">
              {activeProjects.map((progress) => {
                const project = projects.find(p => p.id === progress.projectId);
                if (!project) return null;
                return (
                  <ProgressCard
                    key={progress.projectId}
                    project={project}
                    progress={progress}
                  />
                );
              })}
            </div>
          ) : (
            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-lg p-8 text-center border border-purple-100 relative overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-4 left-4 w-4 h-4 bg-blue-300 rounded-full animate-bounce"></div>
                <div className="absolute top-8 right-8 w-3 h-3 bg-pink-300 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 left-1/4 w-2 h-2 bg-purple-300 rounded-full animate-ping"></div>
                <div className="absolute bottom-8 right-1/3 w-3 h-3 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Start Learning?</h3>
                <p className="text-gray-600 mb-6">
                  No active projects yet. Choose from our curated collection of hands-on projects to begin your coding journey.
                </p>
                <Link
                  to="/projects"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Award className="h-5 w-5 mr-2" />
                  Start Your First Project
                </Link>
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            {progress.length > 0 ? (
              <div className="space-y-4">
                {progress.slice(0, 5).map((progressItem, index) => {
                  const project = projects.find(p => p.id === progressItem.projectId);
                  if (!project) return null;
                  
                  return (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {project.title}
                        </p>
                        <p className="text-xs text-gray-600">
                          Last active: {new Date(progressItem.lastActivity).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {progressItem.completedSteps.length}/{project.steps.length} steps
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Fresh Start!</h3>
                <p className="text-sm text-gray-600 mb-4">
                  No activity yet. Start your first project to see your progress here.
                </p>
                <Link
                  to="/projects"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Browse Projects →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;