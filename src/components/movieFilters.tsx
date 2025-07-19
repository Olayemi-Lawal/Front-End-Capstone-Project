
import React, { useState } from 'react';

interface FilterProps {
  onApplyFilters: (filters: { rating: number; year: number }) => void;
}

const MovieFilters: React.FC<FilterProps> = ({ onApplyFilters }) => {
  const [rating, setRating] = useState(7);
  const [year, setYear] = useState(2022);

  const handleApply = () => {
    onApplyFilters({ rating, year });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-white mb-1">Minimum Rating</label>
        <input
          type="number"
          min={1}
          max={10}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border border-gray-300 rounded px-3 py-2 w-full bg-dark-700 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white mb-1">Release Year</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border border-gray-300 rounded px-3 py-2 w-full bg-dark-700 text-white"
        />
      </div>
      <div className="flex items-end">
        <button
          onClick={handleApply}
          className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded font-semibold"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default MovieFilters;

