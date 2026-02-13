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
    <div className="min-h-screen bg-retro-white flex flex-col font-sans">
      <header className="p-6 border-b-2 border-black bg-white">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-retro-yellow border-2 border-black rounded-none shadow-hard-sm group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none transition-all">
              <Code2 className="h-6 w-6 text-black" />
            </div>
            <span className="text-2xl font-black text-black tracking-tight">DevBuilder</span>
          </Link>

          <Link
            to="/"
            className="flex items-center text-black font-bold hover:text-gray-600 transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <LoginForm onSuccess={handleLoginSuccess} />
      </div>

      <footer className="p-6 text-center text-gray-800 font-bold text-sm border-t-2 border-black bg-white">
        <p>&copy; 2024 DevBuilder. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;