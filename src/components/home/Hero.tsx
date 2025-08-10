import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Zap, Target, ExternalLink } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Hero: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Built with Bolt.new Badge */}
      <div className="absolute top-6 right-6 z-10">
        <a
          href="https://bolt.new"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:text-blue-600 hover:border-blue-300 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-sm flex items-center justify-center">
              <Zap className="h-3 w-3 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
              Built with Bolt.new
            </span>
            <ExternalLink className="h-3 w-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Learn by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Building
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Master web development through hands-on projects. No theory, no tutorials—just 
            real-world building with step-by-step guidance and instant validation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            {isAuthenticated ? (
              <>
                <Link
                  to="/projects"
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Browse Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-all duration-200"
                >
                  View Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Start Building
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-all duration-200"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Step-by-Step</h3>
              <p className="text-gray-600">
                Break down complex projects into manageable steps. Progress unlocks as you complete each task.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Coding</h3>
              <p className="text-gray-600">
                Write code in our interactive editor and see your changes instantly with live preview.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real Projects</h3>
              <p className="text-gray-600">
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