import { Movie, Genre, SearchFilters } from '../types';

class MovieService {
  private apiKey = 'demo_key'; // In a real app, this would be from environment variables
  private baseUrl = 'https://api.themoviedb.org/3';
  private imageBaseUrl = 'https://image.tmdb.org/t/p';

  // Mock data for demonstration
  private mockMovies: Movie[] = [
    {
      id: 550,
      title: "Fight Club",
      overview: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
      poster_path: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400",
      backdrop_path: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800",
      release_date: "1999-10-15",
      vote_average: 8.4,
      vote_count: 26280,
      genre_ids: [18, 53],
      runtime: 139,
      tagline: "Mischief. Mayhem. Soap."
    },
    {
      id: 680,
      title: "Pulp Fiction",
      overview: "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
      poster_path: "https://images.pexels.com/photos/7991226/pexels-photo-7991226.jpeg?auto=compress&cs=tinysrgb&w=400",
      backdrop_path: "https://images.pexels.com/photos/7991226/pexels-photo-7991226.jpeg?auto=compress&cs=tinysrgb&w=800",
      release_date: "1994-09-10",
      vote_average: 8.9,
      vote_count: 8670,
      genre_ids: [53, 80],
      runtime: 154,
      tagline: "Just because you are a character doesn't mean you have character."
    },
    {
      id: 155,
      title: "The Dark Knight",
      overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
      poster_path: "https://images.pexels.com/photos/7991461/pexels-photo-7991461.jpeg?auto=compress&cs=tinysrgb&w=400",
      backdrop_path: "https://images.pexels.com/photos/7991461/pexels-photo-7991461.jpeg?auto=compress&cs=tinysrgb&w=800",
      release_date: "2008-07-16",
      vote_average: 9.0,
      vote_count: 12269,
      genre_ids: [28, 80, 18],
      runtime: 152,
      tagline: "Welcome to a world without rules."
    },
    {
      id: 13,
      title: "Forrest Gump",
      overview: "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.",
      poster_path: "https://images.pexels.com/photos/7991335/pexels-photo-7991335.jpeg?auto=compress&cs=tinysrgb&w=400",
      backdrop_path: "https://images.pexels.com/photos/7991335/pexels-photo-7991335.jpeg?auto=compress&cs=tinysrgb&w=800",
      release_date: "1994-06-23",
      vote_average: 8.5,
      vote_count: 7927,
      genre_ids: [35, 18, 10749],
      runtime: 142,
      tagline: "The world will never be the same once you've seen it through the eyes of Forrest Gump."
    },
    {
      id: 238,
      title: "The Godfather",
      overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
      poster_path: "https://images.pexels.com/photos/7991117/pexels-photo-7991117.jpeg?auto=compress&cs=tinysrgb&w=400",
      backdrop_path: "https://images.pexels.com/photos/7991117/pexels-photo-7991117.jpeg?auto=compress&cs=tinysrgb&w=800",
      release_date: "1972-03-14",
      vote_average: 9.2,
      vote_count: 6024,
      genre_ids: [18, 80],
      runtime: 175,
      tagline: "An offer you can't refuse."
    },
    {
      id: 424,
      title: "Schindler's List",
      overview: "The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis while they worked as slaves in his factory during World War II.",
      poster_path: "https://images.pexels.com/photos/7991654/pexels-photo-7991654.jpeg?auto=compress&cs=tinysrgb&w=400",
      backdrop_path: "https://images.pexels.com/photos/7991654/pexels-photo-7991654.jpeg?auto=compress&cs=tinysrgb&w=800",
      release_date: "1993-11-30",
      vote_average: 8.9,
      vote_count: 4436,
      genre_ids: [18, 36, 10752],
      runtime: 195,
      tagline: "Whoever saves one life, saves the world entire."
    }
  ];

  private mockGenres: Genre[] = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" }
  ];

  async getPopularMovies(): Promise<Movie[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return this.mockMovies;
  }

  async getTrendingMovies(): Promise<Movie[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return this.mockMovies.slice(0, 4);
  }

  async getMovieById(id: number): Promise<Movie | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const movie = this.mockMovies.find(m => m.id === id);
    if (movie) {
      // Add additional details for movie page
      return {
        ...movie,
        genres: movie.genre_ids.map(genreId => 
          this.mockGenres.find(g => g.id === genreId)!
        ).filter(Boolean),
        cast: [
          {
            id: 1,
            name: "Brad Pitt",
            character: "Tyler Durden",
            profile_path: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
            order: 0
          },
          {
            id: 2,
            name: "Edward Norton",
            character: "The Narrator",
            profile_path: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150",
            order: 1
          }
        ],
        similar: this.mockMovies.filter(m => m.id !== id).slice(0, 6)
      };
    }
    return null;
  }

  async searchMovies(filters: SearchFilters): Promise<Movie[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    let results = [...this.mockMovies];
    
    // Filter by query
    if (filters.query) {
      results = results.filter(movie =>
        movie.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        movie.overview.toLowerCase().includes(filters.query.toLowerCase())
      );
    }
    
    // Filter by year
    if (filters.year) {
      results = results.filter(movie =>
        movie.release_date.startsWith(filters.year)
      );
    }
    
    // Sort results
    results.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (filters.sortBy) {
        case 'rating':
          aValue = a.vote_average;
          bValue = b.vote_average;
          break;
        case 'release_date':
          aValue = new Date(a.release_date);
          bValue = new Date(b.release_date);
          break;
        case 'title':
          aValue = a.title;
          bValue = b.title;
          break;
        default:
          aValue = a.vote_count;
          bValue = b.vote_count;
      }
      
      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });
    
    return results;
  }

  async getGenres(): Promise<Genre[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.mockGenres;
  }

  getImageUrl(path: string, size: string = 'w500'): string {
    if (path.startsWith('https://')) {
      return path;
    }
    return `${this.imageBaseUrl}/${size}${path}`;
  }
}

export const movieService = new MovieService();