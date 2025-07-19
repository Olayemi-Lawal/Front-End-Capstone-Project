// src/services/movieService.ts
import { Genre, Movie } from '../types'; // Ensure Movie type is defined in your types

class MovieService {
  private apiKey = import.meta.env.VITE_TMDB_API_KEY; // For Vite projects
  private baseUrl = 'https://capstone-back-end-1-bbvp.onrender.com/api/movies';

  // Fetch genres from backend TMDB proxy
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

  // Fetch trending movies
  async getTrendingMovies(): Promise<Movie[]> {
    try {
      const response = await fetch(`${this.baseUrl}/trending`);
      if (!response.ok) {
        throw new Error('Failed to fetch trending movies');
      }
      const data = await response.json();
      return data.results; // assuming { results: [...] }
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw error;
    }
  }

  // Fetch popular movies
  async getPopularMovies(): Promise<Movie[]> {
    try {
      const response = await fetch(`${this.baseUrl}/popular?api_key=${this.apiKey}&language=en-US`);
      if (!response.ok) {
        throw new Error('Failed to fetch popular movies');
      }
      const data = await response.json();
      return data.results; // assuming { results: [...] }
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  }

  // More methods like getMovieById(), searchMovies(), etc. can go here...
}

export const movieService = new MovieService();


