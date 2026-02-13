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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {user?.avatar && (
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-16 w-16 rounded-full border-2 border-black shadow-hard bg-white p-1"
                />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-retro-yellow border-2 border-black flex items-center justify-center shadow-hard-sm">
                  <Sparkles className="h-3 w-3 text-black" />
                </div>
              </div>
            )}
            <div>
              <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-800 text-lg font-medium">
                Track your progress and continue building amazing projects.
              </p>
            </div>
          </div>

          {/* Fresh Profile Button for Demo */}
          <button
            onClick={handleNewAvatar}
            className="flex items-center px-4 py-2 bg-white text-black font-bold border-2 border-black shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all"
            title="Generate New Cartoon Avatar"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            New Avatar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="card-retro p-6 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard-lg transition-all duration-200">
            <div className="flex items-center">
              <div className={`p-3 border-2 border-black shadow-hard-sm mr-4 ${stat.bgColor.replace('bg-gradient-to-br', 'bg')}`}>
                <stat.icon className={`h-6 w-6 text-black`} />
              </div>
              <div>
                <p className="text-3xl font-black text-black">{stat.value}</p>
                <p className="text-sm font-bold text-gray-600 uppercase tracking-wide">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-black uppercase tracking-tight">Active Projects</h2>
            <Link
              to="/projects"
              className="text-black hover:text-gray-600 text-sm font-black underline decoration-2 underline-offset-4"
            >
              Browse all projects
            </Link>
          </div>

          {activeProjects.length > 0 ? (
            <div className="space-y-6">
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
            <div className="card-retro bg-retro-white border-dashed text-center py-12">
              <div className="w-16 h-16 bg-retro-yellow border-2 border-black flex items-center justify-center mx-auto mb-6 shadow-hard-sm">
                <Clock className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-black text-black mb-2 uppercase">Ready to Start Learning?</h3>
              <p className="text-gray-800 mb-8 font-medium max-w-md mx-auto">
                No active projects yet. Choose from our curated collection of hands-on projects to begin your coding journey.
              </p>
              <Link
                to="/projects"
                className="btn-retro-primary"
              >
                <Award className="h-5 w-5 mr-2" />
                Start Your First Project
              </Link>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-black text-black mb-6 uppercase tracking-tight">Recent Activity</h2>
          <div className="card-retro p-6">
            {progress.length > 0 ? (
              <div className="space-y-4">
                {progress.slice(0, 5).map((progressItem, index) => {
                  const project = projects.find(p => p.id === progressItem.projectId);
                  if (!project) return null;

                  return (
                    <div key={index} className="flex items-center justify-between py-3 border-b-2 border-gray-100 last:border-0">
                      <div>
                        <p className="text-base font-bold text-black">
                          {project.title}
                        </p>
                        <p className="text-xs font-bold text-gray-500">
                          Last active: {new Date(progressItem.lastActivity).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-sm font-black text-black bg-retro-yellow px-2 py-1 border-2 border-black shadow-hard-sm">
                        {progressItem.completedSteps.length}/{project.steps.length} steps
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-green-100 border-2 border-black flex items-center justify-center mx-auto mb-4 shadow-hard-sm">
                  <TrendingUp className="h-6 w-6 text-black" />
                </div>
                <h3 className="font-black text-black mb-2 uppercase">Fresh Start!</h3>
                <p className="text-sm font-bold text-gray-600 mb-6">
                  No activity yet. Start your first project to see your progress here.
                </p>
                <Link
                  to="/projects"
                  className="text-black hover:text-gray-600 text-sm font-black underline decoration-2 underline-offset-4"
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