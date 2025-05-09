import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AnimeCard({ anime }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/anime/${encodeURIComponent(anime.Name)}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl shadow-md cursor-pointer overflow-hidden hover:shadow-lg transition"
    >
      <img
        src={anime['Image URL']}
        alt={anime.Name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold truncate">{anime.Name}</h3>
        <p className="text-gray-600 text-sm truncate">{anime.Genres}</p>
      </div>
    </div>
  );
}