import React from 'react';
import { Movie } from '../types';
import MovieCard from './MovieCard';
import LoadingSpinner from './LoadingSpinner';

interface MovieGridProps {
  movies: Movie[];
  isLoading?: boolean;
  title?: string;
  showAddToWatchlist?: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({ 
  movies, 
  isLoading = false, 
  title,
  showAddToWatchlist = true 
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-dark-400 text-lg">No movies found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {title && (
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            showAddToWatchlist={showAddToWatchlist}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;