import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown } from 'lucide-react';
import { Movie, SearchFilters } from '../types';
import { movieService } from '../services/movieService';
import MovieGrid from '../components/MovieGrid';

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState<SearchFilters>({
    query: searchParams.get('q') || '',
    genre: '',
    year: '',
    sortBy: 'popularity',
    sortOrder: 'desc'
  });

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setFilters(prev => ({ ...prev, query }));
    }
  }, [searchParams]);

  useEffect(() => {
    const searchMovies = async () => {
      if (!filters.query && !filters.genre && !filters.year) {
        setMovies([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await movieService.searchMovies(filters);
        setMovies(results);
      } catch (error) {
        console.error('Search failed:', error);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchMovies, 300);
    return () => clearTimeout(debounceTimer);
  }, [filters]);

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filters.query.trim()) {
      setSearchParams({ q: filters.query.trim() });
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-white mb-4">
            {filters.query ? `Search results for "${filters.query}"` : 'Search Movies'}
          </h1>
          
          <form onSubmit={handleSearchSubmit} className="mb-6">
            <input
              type="text"
              placeholder="Search for movies..."
              value={filters.query}
              onChange={(e) => handleFilterChange('query', e.target.value)}
              className="input-field w-full max-w-2xl"
            />
          </form>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
            <ChevronDown 
              className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} 
            />
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="glass rounded-lg p-6 mb-8 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Year
                </label>
                <select
                  value={filters.year}
                  onChange={(e) => handleFilterChange('year', e.target.value)}
                  className="input-field"
                >
                  <option value="">All years</option>
                  {years.map(year => (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Sort by
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value as any)}
                  className="input-field"
                >
                  <option value="popularity">Popularity</option>
                  <option value="rating">Rating</option>
                  <option value="release_date">Release Date</option>
                  <option value="title">Title</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Order
                </label>
                <select
                  value={filters.sortOrder}
                  onChange={(e) => handleFilterChange('sortOrder', e.target.value as any)}
                  className="input-field"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="animate-slide-up">
          {isLoading ? (
            <MovieGrid movies={[]} isLoading={true} />
          ) : movies.length > 0 ? (
            <>
              <p className="text-dark-400 mb-6">
                Found {movies.length} movie{movies.length !== 1 ? 's' : ''}
              </p>
              <MovieGrid movies={movies} />
            </>
          ) : filters.query || filters.genre || filters.year ? (
            <div className="text-center py-12">
              <p className="text-dark-400 text-lg mb-4">No movies found</p>
              <p className="text-dark-500">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-dark-400 text-lg">Enter a search term to find movies</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;