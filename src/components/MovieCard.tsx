import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Plus } from 'lucide-react';
import { Movie } from '../types';
import { useAuth } from '../context/AuthContext';

interface MovieCardProps {
  movie: Movie;
  showAddToWatchlist?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, showAddToWatchlist = true }) => {
  const { user, isAuthenticated, addToWatchlist, removeFromWatchlist } = useAuth();
  
  const isInWatchlist = user?.watchlist.includes(movie.id) || false;
  const userRating = user?.ratings[movie.id];

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) return;
    
    if (isInWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie.id);
    }
  };

  const releaseYear = new Date(movie.release_date).getFullYear();

  return (
    <div className="movie-card group animate-fade-in">
      <Link to={`/movie/${movie.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-white">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
                
                {showAddToWatchlist && isAuthenticated && (
                  <button
                    onClick={handleWatchlistToggle}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      isInWatchlist
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-white/20 hover:bg-white/30 text-white'
                    }`}
                  >
                    {isInWatchlist ? (
                      <Heart className="h-4 w-4 fill-current" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>
              
              <h3 className="font-semibold text-white text-sm line-clamp-2 mb-1">
                {movie.title}
              </h3>
              <p className="text-dark-300 text-xs">{releaseYear}</p>
            </div>
          </div>

          {/* User Rating Badge */}
          {userRating && (
            <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {userRating}/5
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-white text-sm mb-1 line-clamp-2">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between text-xs text-dark-400">
            <span>{releaseYear}</span>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;