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
    <header className="bg-white border-b-2 border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-retro-yellow border-2 border-black rounded-none shadow-hard-sm group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none transition-all">
              <Code2 className="h-6 w-6 text-black" />
            </div>
            <span className="text-xl font-black text-black tracking-tight">DevBuilder</span>
          </Link>

          {isAuthenticated ? (
            <>
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-none text-sm font-bold border-2 transition-all ${isActive(item.href)
                        ? 'text-black bg-retro-yellow border-black shadow-hard-sm'
                        : 'text-gray-600 border-transparent hover:text-black hover:border-black hover:bg-white hover:shadow-hard-sm'
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
                  className="md:hidden p-2 rounded-md text-gray-600 hover:text-black hover:bg-retro-yellow border-2 border-transparent hover:border-black transition-all"
                >
                  {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>

                {/* User avatar and menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-1 rounded-full hover:bg-retro-yellow transition-colors border-2 border-transparent hover:border-black"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="h-8 w-8 rounded-full object-cover ring-2 ring-black"
                    />
                    <span className="hidden sm:block text-sm font-bold text-black">
                      {user?.name}
                    </span>
                  </button>

                  {/* Dropdown menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-none border-2 border-black shadow-hard py-1 z-50">
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center px-4 py-2 text-sm font-bold text-gray-700 hover:bg-retro-yellow hover:text-black"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Your Profile
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center px-4 py-2 text-sm font-bold text-gray-700 hover:bg-retro-yellow hover:text-black"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                      <hr className="my-1 border-black" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 hover:text-red-700"
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
                <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b-2 border-black shadow-hard">
                  <nav className="px-4 py-2 space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setShowMobileMenu(false)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-none text-sm font-bold border-2 transition-all ${isActive(item.href)
                            ? 'text-black bg-retro-yellow border-black shadow-hard-sm'
                            : 'text-gray-600 border-transparent hover:text-black hover:border-black hover:bg-white hover:shadow-hard-sm'
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
                className="text-black font-bold hover:text-gray-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center px-4 py-2 bg-retro-yellow text-black font-bold border-2 border-black shadow-hard-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all duration-200"
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