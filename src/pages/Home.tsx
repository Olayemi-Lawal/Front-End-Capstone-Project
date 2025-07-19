// src/services/movieService.ts
export const Home = () => {
  return (
    <div>Welcome to Home</div>
  );
};


import { Genre, Movie } from '../types';

/**
 * Service for interacting with the movie API (TMDB proxy/backend).
 */
class MovieService {
  private readonly apiKey = import.meta.env.VITE_TMDB_API_KEY;
  private readonly baseUrl = 'https://capstone-back-end-1-bbvp.onrender.com/api/movies';

  /**
   * Fetch movies filtered by rating and release year.
   * @param rating Minimum average rating (e.g., 7)
   * @param year Release year (e.g., 2022)
   */
  async getFilteredMovies(rating: number, year: number): Promise<Movie[]> {
    try {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&vote_average.gte=${rating}&primary_release_year=${year}&language=en-US`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch filtered movies');

      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching filtered movies:', error);
      return [];
    }
  }

  /**
   * Fetch list of genres from the backend proxy.
   */
  async getGenres(): Promise<Genre[]> {
    try {
      const url = `${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}&language=en-US`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch genres');

      const data = await response.json();
      return data.genres;
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw error;
    }
  }

  /**
   * Fetch trending movies from the backend.
   */
  async getTrendingMovies(): Promise<Movie[]> {
    try {
      const response = await fetch(`${this.baseUrl}/trending`);
      if (!response.ok) throw new Error('Failed to fetch trending movies');

      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw error;
    }
  }

  /**
   * Fetch popular movies from the backend.
   */
  async getPopularMovies(): Promise<Movie[]> {
    try {
      const url = `${this.baseUrl}/popular?api_key=${this.apiKey}&language=en-US`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch popular movies');

      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  }

  // You can extend this service with more methods:
  // getMovieById(id: string), searchMovies(query: string), etc.
}

export const movieService = new MovieService();


