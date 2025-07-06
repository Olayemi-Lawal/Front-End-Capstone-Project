import React, { useState, useEffect } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { Movie } from '../types';
import { movieService } from '../services/movieService';
import { useAuth } from '../context/AuthContext';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';

const Watchlist: React.FC = () => {
  const { user, isAuthenticated, removeFromWatchlist } = useAuth();
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWatchlistMovies = async () => {
      if (!isAuthenticated || !user?.watchlist.length) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const moviePromises = user.watchlist.map(id => movieService.getMovieById(id));
        const movies = await Promise.all(moviePromises);
        setWatchlistMovies(movies.filter(Boolean) as Movie[]);
      } catch (error) {
        console.error('Failed to load watchlist:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWatchlistMovies();
  }, [user?.watchlist, isAuthenticated]);

  const handleRemoveFromWatchlist = (movieId: number) => {
    removeFromWatchlist(movieId);
    setWatchlistMovies(prev => prev.filter(movie => movie.id !== movieId));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-16 w-16 text-dark-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Sign in to view your watchlist</h2>
          <p className="text-dark-400">Keep track of movies you want to watch</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 mb-8 animate-fade-in">
          <Heart className="h-8 w-8 text-red-500" />
          <h1 className="text-3xl font-bold text-white">My Watchlist</h1>
          <span className="bg-dark-800 text-dark-300 text-sm px-3 py-1 rounded-full">
            {watchlistMovies.length} movie{watchlistMovies.length !== 1 ? 's' : ''}
          </span>
        </div>

        {watchlistMovies.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <Heart className="h-16 w-16 text-dark-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Your watchlist is empty</h2>
            <p className="text-dark-400 mb-6">
              Add movies to your watchlist to keep track of what you want to watch
            </p>
          </div>
        ) : (
          <div className="animate-slide-up">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {watchlistMovies.map((movie) => (
                <div key={movie.id} className="movie-card group relative">
                  <div className="relative overflow-hidden">
                    <img
                      src={movie.poster_path}
                      alt={movie.title}
                      className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute top-2 right-2">
                        <button
                          onClick={() => handleRemoveFromWatchlist(movie.id)}
                          className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
                          title="Remove from watchlist"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-semibold text-white text-sm line-clamp-2 mb-1">
                          {movie.title}
                        </h3>
                        <p className="text-dark-300 text-xs">
                          {new Date(movie.release_date).getFullYear()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-white text-sm mb-1 line-clamp-2">
                      {movie.title}
                    </h3>
                    <p className="text-dark-400 text-xs">
                      {new Date(movie.release_date).getFullYear()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;