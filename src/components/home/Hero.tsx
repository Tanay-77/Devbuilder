import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Zap, Target, ExternalLink } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Hero: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative overflow-hidden bg-retro-white">
      {/* Built with Bolt.new Badge - Styled Retro */}
      <div className="absolute top-6 right-6 z-10">
        <a
          href="https://bolt.new"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center px-4 py-2 bg-white border-2 border-black rounded-none text-sm font-bold text-black shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all duration-200"
        >
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-retro-yellow border border-black flex items-center justify-center">
              <Zap className="h-3 w-3 text-black" />
            </div>
            <span className="font-bold">
              Built with Bolt.new
            </span>
            <ExternalLink className="h-3 w-3 text-black group-hover:text-gray-600 transition-colors" />
          </div>
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-black text-black mb-8 tracking-tighter">
            Learn by{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Building</span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-retro-yellow -z-0"></span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Master web development through hands-on projects. No theory, no tutorials—just
            real-world building with step-by-step guidance and instant validation.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            {isAuthenticated ? (
              <>
                <Link
                  to="/projects"
                  className="btn-retro-primary"
                >
                  Browse Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/dashboard"
                  className="btn-retro-secondary"
                >
                  View Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="btn-retro-primary"
                >
                  Start Building
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/login"
                  className="btn-retro-secondary"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="card-retro text-left hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard-lg transition-all duration-200">
              <div className="h-12 w-12 bg-retro-yellow border-2 border-black flex items-center justify-center mb-4 shadow-hard-sm">
                <Code className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-black text-black mb-2 uppercase tracking-wide">Step-by-Step</h3>
              <p className="text-gray-800 font-medium">
                Break down complex projects into manageable steps. Progress unlocks as you complete each task.
              </p>
            </div>

            <div className="card-retro text-left hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard-lg transition-all duration-200">
              <div className="h-12 w-12 bg-blue-200 border-2 border-black flex items-center justify-center mb-4 shadow-hard-sm">
                <Zap className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-black text-black mb-2 uppercase tracking-wide">Live Coding</h3>
              <p className="text-gray-800 font-medium">
                Write code in our interactive editor and see your changes instantly with live preview.
              </p>
            </div>

            <div className="card-retro text-left hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard-lg transition-all duration-200">
              <div className="h-12 w-12 bg-green-200 border-2 border-black flex items-center justify-center mb-4 shadow-hard-sm">
                <Target className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-black text-black mb-2 uppercase tracking-wide">Real Projects</h3>
              <p className="text-gray-800 font-medium">
                Build portfolio-worthy projects that demonstrate your skills to potential employers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;