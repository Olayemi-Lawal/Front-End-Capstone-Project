import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Calendar, Clock, Star, Heart, Play, Users } from 'lucide-react';
import { Movie } from '../types';
import { movieService } from '../services/movieService';
import { useAuth } from '../context/AuthContext';
import MovieGrid from '../components/MovieGrid';
import StarRating from '../components/StarRating';
import LoadingSpinner from '../components/LoadingSpinner';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { user, isAuthenticated, addToWatchlist, removeFromWatchlist, rateMovie } = useAuth();
  
  const movieId = parseInt(id || '0');
  const isInWatchlist = user?.watchlist.includes(movieId) || false;
  const userRating = user?.ratings[movieId] || 0;

  useEffect(() => {
    const loadMovie = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const movieData = await movieService.getMovieById(movieId);
        
        if (!movieData) {
          setError('Movie not found');
          return;
        }
        
        setMovie(movieData);
      } catch (error) {
        console.error('Failed to load movie:', error);
        setError('Failed to load movie details');
      } finally {
        setIsLoading(false);
      }
    };

    loadMovie();
  }, [id, movieId]);

  const handleWatchlistToggle = () => {
    if (!isAuthenticated || !movie) return;
    
    if (isInWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie.id);
    }
  };

  const handleRating = (rating: number) => {
    if (!isAuthenticated || !movie) return;
    rateMovie(movie.id, rating);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !movie) {
    return <Navigate to="/404" replace />;
  }

  const releaseYear = new Date(movie.release_date).getFullYear();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${movie.backdrop_path})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Poster */}
            <div className="lg:col-span-1 flex justify-center">
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="w-80 rounded-xl shadow-2xl animate-scale-in"
              />
            </div>

            {/* Movie Info */}
            <div className="lg:col-span-2 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-xl text-primary-400 mb-6 italic">
                  "{movie.tagline}"
                </p>
              )}

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-white font-medium text-lg">
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="text-dark-400">
                    ({movie.vote_count.toLocaleString()} votes)
                  </span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Calendar className="h-5 w-5 text-dark-400" />
                  <span className="text-white">{releaseYear}</span>
                </div>
                
                {movie.runtime && (
                  <div className="flex items-center space-x-1">
                    <Clock className="h-5 w-5 text-dark-400" />
                    <span className="text-white">{movie.runtime} min</span>
                  </div>
                )}
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-dark-800 text-white px-3 py-1 rounded-full text-sm border border-dark-600"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-lg text-dark-200 mb-8 leading-relaxed max-w-3xl">
                {movie.overview}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="btn-primary flex items-center justify-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>Watch Now</span>
                </button>
                
                {isAuthenticated && (
                  <button
                    onClick={handleWatchlistToggle}
                    className={`btn-secondary flex items-center justify-center space-x-2 ${
                      isInWatchlist ? 'bg-red-600 hover:bg-red-700 border-red-600' : ''
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isInWatchlist ? 'fill-current' : ''}`} />
                    <span>{isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}</span>
                  </button>
                )}
              </div>

              {/* User Rating */}
              {isAuthenticated && (
                <div className="mb-8">
                  <h3 className="text-white font-medium mb-2">Rate this movie:</h3>
                  <StarRating
                    rating={userRating}
                    onRatingChange={handleRating}
                    size="large"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Cast */}
        {movie.cast && movie.cast.length > 0 && (
          <section className="animate-slide-up">
            <div className="flex items-center space-x-3 mb-8">
              <Users className="h-6 w-6 text-primary-500" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">Cast</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {movie.cast.slice(0, 6).map((actor) => (
                <div key={actor.id} className="text-center">
                  <img
                    src={actor.profile_path || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'}
                    alt={actor.name}
                    className="w-full h-40 object-cover rounded-lg mb-2"
                  />
                  <h3 className="text-white font-medium text-sm">{actor.name}</h3>
                  <p className="text-dark-400 text-xs">{actor.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Similar Movies */}
        {movie.similar && movie.similar.length > 0 && (
          <section className="animate-slide-up">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              More Like This
            </h2>
            <MovieGrid movies={movie.similar} />
          </section>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;