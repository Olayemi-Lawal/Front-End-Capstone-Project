// src/services/movieService.ts
import { Genre, Movie } from '../types';

class MovieService {
  private apiKey = import.meta.env.VITE_TMDB_API_KEY; // Vite-specific
  private baseUrl = 'https://capstone-back-end-1-bbvp.onrender.com/api/movies';

  // ✅ Corrected method for filtered movies
  async getFilteredMovies(rating: number, year: number): Promise<Movie[]> {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&vote_average.gte=${rating}&primary_release_year=${year}&language=en-US`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch filtered movies');
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching filtered movies:', error);
      return [];
    }
  }

  async getGenres(): Promise<Genre[]> {
    try {
      const response = await fetch(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}&language=en-US`);
      if (!response.ok) {
        throw new Error('Failed to fetch genres');
      }
      const data = await response.json();
      return data.genres;
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw error;
    }
  }

  async getTrendingMovies(): Promise<Movie[]> {
    try {
      const response = await fetch(`${this.baseUrl}/trending`);
      if (!response.ok) {
        throw new Error('Failed to fetch trending movies');
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw error;
    }
  }

  async getPopularMovies(): Promise<Movie[]> {
    try {
      const response = await fetch(`${this.baseUrl}/popular?api_key=${this.apiKey}&language=en-US`);
      if (!response.ok) {
        throw new Error('Failed to fetch popular movies');
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  }

  // Add other methods (getMovieById, searchMovies, etc.) here as needed
}

export const movieService = new MovieService();



