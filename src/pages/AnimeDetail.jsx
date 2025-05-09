import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AnimeCard from '../components/AnimeCard';
export default function AnimeDetail() {
  const { name } = useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const token = localStorage.getItem('authToken');
      const params = new URLSearchParams({ page: 1, per_page: 10, search: name });
      const res = await fetch(`http://127.0.0.1:5000/capstone/v1/api/anime?${params}`, {
        headers: { 'Authorization': token, 'accept': 'application/json' },
      });
      const data = await res.json();
      setAnime(data.animes.movies);
    };
    fetchDetail();
  }, [name]);

  if (!anime) return <div className="p-8 text-center">Loading...</div>;
  console.log(anime)
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{anime[0].Name}</h2>
      <img
        src={anime[0]['Image URL']}
        alt={anime[0].Name}
        className="w-full h-64 object-cover mb-4 rounded-lg"
      />
      <p className="mb-2"><strong>Synopsis:</strong> {anime[0].Synopsis}</p>
      <p className="mb-2"><strong>Genres:</strong> {anime[0].Genres}</p>
      <p className="mb-2"><strong>Score:</strong> {anime[0].Score}</p>
      {/* Add more fields as needed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {anime.map((a) => (
          <AnimeCard key={a.anime_id} anime={a} />
        ))}
      </div>
    </div>
  );
}