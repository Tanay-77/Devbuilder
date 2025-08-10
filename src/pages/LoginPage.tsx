import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Code2, ArrowLeft } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginSuccess = () => {
    // Redirect to the page they were trying to access, or dashboard
    const from = location.state?.from?.pathname || '/dashboard';
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <header className="p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">DevBuilder</span>
          </Link>
          
          <Link
            to="/"
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <LoginForm onSuccess={handleLoginSuccess} />
      </div>

      <footer className="p-6 text-center text-gray-500 text-sm">
        <p>&copy; 2024 DevBuilder. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;