import React, { useEffect, useState } from 'react';
import { movieService } from '../services/movieService';
import { Genre } from '../types';

interface MovieCategoriesProps {
  onSelectGenre: (genreId: number) => void;
}

const MovieCategories: React.FC<MovieCategoriesProps> = ({ onSelectGenre }) => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const fetchedGenres = await movieService.getGenres();
        setGenres(fetchedGenres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onSelectGenre(genre.id)}
          className="px-4 py-2 rounded-full bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium transition"
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default MovieCategories;

