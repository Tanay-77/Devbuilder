import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import GoogleSignInButton from './GoogleSignInButton';

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, clearError } = useAuth();

  // Clear error when component unmounts or inputs change
  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [email, password, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!email || !password) {
      return;
    }

    const success = await login(email, password);
    if (success) {
      onSuccess();
    }
  };

  const handleGoogleSuccess = () => {
    onSuccess();
  };

  // Auto-fill demo credentials for easy testing
  const fillDemoCredentials = () => {
    setEmail('alex@example.com');
    setPassword('password123');
    clearError();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="card-retro">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-black mb-2 tracking-tight uppercase">Welcome Back</h2>
          <p className="text-gray-800 font-bold">Sign in to continue your journey</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-black shadow-hard-sm flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0" />
            <span className="text-red-700 text-sm font-bold">{error}</span>
          </div>
        )}

        {/* Google Sign In Button */}
        <div className="mb-6">
          <GoogleSignInButton onSuccess={handleGoogleSuccess} disabled={isLoading} />
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-dashed border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-gray-600 font-bold uppercase tracking-wide">Or with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-black uppercase tracking-wide mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-black rounded-none font-bold placeholder-gray-400 focus:outline-none focus:shadow-hard-sm transition-all"
                placeholder="Enter your email"
                disabled={isLoading}
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold text-black uppercase tracking-wide mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border-2 border-black rounded-none font-bold placeholder-gray-400 focus:outline-none focus:shadow-hard-sm transition-all"
                placeholder="Enter your password"
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black border-2 border-transparent hover:border-black p-0.5 rounded-none transition-all"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !email || !password}
            className="w-full btn-retro-primary justify-center text-lg py-3"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center border-t-2 border-black pt-6">
          <p className="text-gray-800 font-medium">
            Don't have an account?{' '}
            <Link to="/signup" className="text-black font-black hover:text-gray-600 underline decoration-2 decoration-retro-yellow underline-offset-2 hover:decoration-black transition-all">
              Sign up here
            </Link>
          </p>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border-2 border-black shadow-hard-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-black font-black uppercase">Demo Credentials:</p>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-xs bg-black text-white px-2 py-1 font-bold border-2 border-transparent hover:bg-retro-yellow hover:text-black hover:border-black transition-all shadow-sm"
            >
              Auto-fill
            </button>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-800 font-medium">
              <strong className="text-black">Email:</strong> alex@example.com
            </p>
            <p className="text-sm text-gray-800 font-medium">
              <strong className="text-black">Password:</strong> password123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;