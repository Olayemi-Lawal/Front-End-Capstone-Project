export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  genres?: Genre[];
  runtime?: number;
  tagline?: string;
  production_companies?: ProductionCompany[];
  cast?: CastMember[];
  videos?: Video[];
  similar?: Movie[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  watchlist: number[];
  ratings: Record<number, number>;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface SearchFilters {
  query: string;
  genre: string;
  year: string;
  sortBy: 'popularity' | 'rating' | 'release_date' | 'title';
  sortOrder: 'asc' | 'desc';
}