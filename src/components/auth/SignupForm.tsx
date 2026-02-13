import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import GoogleSignInButton from './GoogleSignInButton';

interface SignupFormProps {
  onSuccess: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { signup, isLoading, error, clearError } = useAuth();

  // Clear error when component unmounts or inputs change
  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [formData, clearError]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) {
      return;
    }

    const success = await signup(formData.name, formData.email, formData.password);
    if (success) {
      onSuccess();
    }
  };

  const handleGoogleSuccess = () => {
    onSuccess();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: '' };
    if (password.length < 6) return { strength: 1, label: 'Weak' };
    if (password.length < 10) return { strength: 2, label: 'Medium' };
    return { strength: 3, label: 'Strong' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="card-retro">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-black mb-2 tracking-tight uppercase">Create Account</h2>
          <p className="text-gray-800 font-bold">Start your coding journey today</p>
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
            <label htmlFor="name" className="block text-sm font-bold text-black uppercase tracking-wide mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-none font-bold placeholder-gray-400 focus:outline-none focus:shadow-hard-sm transition-all ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-black focus:border-black'
                  }`}
                placeholder="Enter your full name"
                disabled={isLoading}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 font-bold flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-bold text-black uppercase tracking-wide mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-none font-bold placeholder-gray-400 focus:outline-none focus:shadow-hard-sm transition-all ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-black focus:border-black'
                  }`}
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 font-bold flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.email}
              </p>
            )}
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
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full pl-10 pr-12 py-3 border-2 rounded-none font-bold placeholder-gray-400 focus:outline-none focus:shadow-hard-sm transition-all ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-black focus:border-black'
                  }`}
                placeholder="Create a password"
                disabled={isLoading}
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

            {formData.password && (
              <div className="mt-3">
                <div className="flex items-center space-x-2 border-2 border-black p-1 bg-white">
                  <div className="flex-1 bg-gray-200 h-2 relative">
                    <div
                      className={`h-full border-r-2 border-black transition-all duration-300 ${passwordStrength.strength === 1 ? 'bg-red-500 w-1/3' :
                          passwordStrength.strength === 2 ? 'bg-retro-yellow w-2/3' :
                            passwordStrength.strength === 3 ? 'bg-green-500 w-full' : 'w-0'
                        }`}
                    />
                  </div>
                  <span className={`text-xs font-black uppercase px-2 ${passwordStrength.strength === 1 ? 'text-red-600' :
                      passwordStrength.strength === 2 ? 'text-yellow-600' :
                        passwordStrength.strength === 3 ? 'text-green-600' : 'text-gray-500'
                    }`}>
                    {passwordStrength.label}
                  </span>
                </div>
              </div>
            )}

            {errors.password && (
              <p className="mt-1 text-sm text-red-600 font-bold flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-bold text-black uppercase tracking-wide mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={`w-full pl-10 pr-12 py-3 border-2 rounded-none font-bold placeholder-gray-400 focus:outline-none focus:shadow-hard-sm transition-all ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-black focus:border-black'
                  }`}
                placeholder="Confirm your password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black border-2 border-transparent hover:border-black p-0.5 rounded-none transition-all"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {formData.confirmPassword && formData.password === formData.confirmPassword && (
              <p className="mt-1 text-sm text-green-600 font-bold flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Passwords match
              </p>
            )}

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600 font-bold flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-retro-primary justify-center text-lg py-3"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center border-t-2 border-black pt-6">
          <p className="text-gray-800 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-black font-black hover:text-gray-600 underline decoration-2 decoration-retro-yellow underline-offset-2 hover:decoration-black transition-all">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;