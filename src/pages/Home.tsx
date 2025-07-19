import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, TrendingUp, Star, ChevronRight } from 'lucide-react';
import { Movie } from '../types';
import { movieService } from '../services/movieService';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';

interface Genre {
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [trending, popular, genreData] = await Promise.all([
          movieService.getTrendingMovies(),
          movieService.getPopularMovies(),
          movieService.getGenres(),
        ]);

        setTrendingMovies(trending);
        setPopularMovies(popular);
        setGenres(genreData || []);
        setFeaturedMovie(trending[0] || popular[0] || null);
      } catch (error) {
        console.error('Failed to load movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {featuredMovie && (
        <section className="relative h-screen flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${featuredMovie.backdrop_path})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {featuredMovie.title}
              </h1>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-white font-medium">
                    {featuredMovie.vote_average?.toFixed(1)}
                  </span>
                </div>
                <span className="text-dark-300">
                  {new Date(featuredMovie.release_date).getFullYear()}
                </span>
                {featuredMovie.runtime && (
                  <span className="text-dark-300">
                    {featuredMovie.runtime} min
                  </span>
                )}
              </div>

              <p className="text-lg text-dark-300 mb-8 leading-relaxed">
                {featuredMovie.overview}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={`/movie/${featuredMovie.id}`} className="btn-primary flex items-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>Watch Now</span>
                </Link>
                <Link to={`/movie/${featuredMovie.id}`} className="btn-secondary flex items-center space-x-2">
                  <span>More Info</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Genres & Movie Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Genres */}
        {genres.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-white mb-4">Genres</h2>
            <ul className="flex flex-wrap gap-2 text-dark-100">
              {genres.map((genre) => (
                <li key={genre.id} className="px-3 py-1 bg-dark-700 rounded-full text-sm">
                  {genre.name}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Trending Movies */}
        <section className="animate-slide-up">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-primary-500" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">Trending Now</h2>
            </div>
            <Link to="/discover" className="text-primary-400 hover:text-primary-300 flex items-center space-x-1">
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {trendingMovies.slice(0, 8).map((movie) => (
              <div key={movie.id} className="movie-card group">
                <Link to={`/movie/${movie.id}`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={movie.poster_path}
                      alt={movie.title}
                      className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center space-x-1 mb-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-white">
                            {movie.vote_average?.toFixed(1)}
                          </span>
                        </div>
                        <h3 className="font-semibold text-white text-sm line-clamp-2">{movie.title}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Movies */}
        <section className="animate-slide-up">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Popular Movies</h2>
            <Link to="/discover" className="text-primary-400 hover:text-primary-300 flex items-center space-x-1">
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <MovieGrid movies={popularMovies.slice(0, 12)} />
        </section>
      </div>
    </div>
  );
};

export default Home;
