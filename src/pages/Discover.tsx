import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';
import { Movie } from '../types';
import { movieService } from '../services/movieService';
import MovieGrid from '../components/MovieGrid';

const Discover: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoading(true);
        const popularMovies = await movieService.getPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.error('Failed to load movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, []);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 mb-8 animate-fade-in">
          <Compass className="h-8 w-8 text-primary-500" />
          <h1 className="text-3xl font-bold text-white">Discover Movies</h1>
        </div>

        <div className="animate-slide-up">
          <MovieGrid
            movies={movies}
            isLoading={isLoading}
            title="Popular Movies"
          />
        </div>
      </div>
    </div>
  );
};

export default Discover;