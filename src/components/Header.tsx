import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, User, LogOut, Film, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="glass sticky top-0 z-50 border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-white hover:text-primary-400 transition-colors"
          >
            <Film className="h-8 w-8 text-primary-500" />
            <span className="text-xl font-bold">MovieHub</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pr-12"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-400 hover:text-primary-500 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-primary-400' 
                  : 'text-dark-300 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/discover"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/discover' 
                  ? 'text-primary-400' 
                  : 'text-dark-300 hover:text-white'
              }`}
            >
              Discover
            </Link>
            {isAuthenticated && (
              <Link
                to="/watchlist"
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/watchlist' 
                    ? 'text-primary-400' 
                    : 'text-dark-300 hover:text-white'
                }`}
              >
                Watchlist
              </Link>
            )}
            
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-dark-300 hover:text-white transition-colors">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full border border-dark-600"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                  <span className="text-sm font-medium">{user?.name}</span>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 glass rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-dark-300 hover:text-white hover:bg-dark-700 transition-colors"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <Link
                      to="/watchlist"
                      className="flex items-center px-4 py-2 text-sm text-dark-300 hover:text-white hover:bg-dark-700 transition-colors"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Watchlist
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-dark-300 hover:text-white hover:bg-dark-700 transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-dark-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm py-2 px-4"
                >
                  Sign up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-dark-300 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pr-12"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-400 hover:text-primary-500 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden glass border-t border-dark-700 animate-slide-up">
          <div className="px-4 py-4 space-y-4">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block text-dark-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="/discover"
              onClick={() => setIsMenuOpen(false)}
              className="block text-dark-300 hover:text-white transition-colors"
            >
              Discover
            </Link>
            {isAuthenticated && (
              <Link
                to="/watchlist"
                onClick={() => setIsMenuOpen(false)}
                className="block text-dark-300 hover:text-white transition-colors"
              >
                Watchlist
              </Link>
            )}
            
            {isAuthenticated ? (
              <div className="pt-4 border-t border-dark-700">
                <div className="flex items-center space-x-3 mb-4">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-10 w-10 rounded-full border border-dark-600"
                    />
                  ) : (
                    <User className="h-8 w-8 text-dark-400" />
                  )}
                  <div>
                    <p className="font-medium text-white">{user?.name}</p>
                    <p className="text-sm text-dark-400">{user?.email}</p>
                  </div>
                </div>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-dark-300 hover:text-white transition-colors mb-2"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block text-dark-300 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-dark-700 space-y-4">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-dark-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-primary inline-block text-center"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;