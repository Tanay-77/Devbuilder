import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Code2, User, BookOpen, BarChart3, LogOut, Settings, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navigation = [
    { name: 'Projects', href: '/projects', icon: BookOpen },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Profile', href: '/profile', icon: User }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">DevBuilder</span>
          </Link>

          {isAuthenticated ? (
            <>
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>

              {/* User Menu */}
              <div className="flex items-center space-x-4">
                {/* Mobile menu button */}
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                >
                  {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>

                {/* User avatar and menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="h-8 w-8 rounded-full object-cover ring-2 ring-blue-500 ring-offset-2"
                    />
                    <span className="hidden sm:block text-sm font-medium text-gray-700">
                      {user?.name}
                    </span>
                  </button>

                  {/* Dropdown menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Your Profile
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Navigation */}
              {showMobileMenu && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
                  <nav className="px-4 py-2 space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setShowMobileMenu(false)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive(item.href)
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
              )}
            </>
          ) : (
            /* Not authenticated - show login/signup buttons */
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;