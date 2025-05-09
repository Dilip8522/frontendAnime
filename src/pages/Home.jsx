import React, { useState, useEffect } from 'react';
import AnimeCard from '../components/AnimeCard';

export default function Home() {
  const [animes, setAnimes] = useState([]);
  const [search, setSearch] = useState('naruto');
  const [page, setPage] = useState(1);
  const perPage = 10;

  const fetchAnimes = async (query) => {
    const token = localStorage.getItem('authToken');
    const params = new URLSearchParams({ page, per_page: perPage, search: query });
    const res = await fetch(`http://127.0.0.1:5000/capstone/v1/api/anime?${params}`, {
      headers: { 'Authorization': token, 'accept': 'application/json' },
    });
    const data = await res.json();
    setAnimes(data.animes.movies);
  };

  useEffect(() => { fetchAnimes(search); }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchAnimes(search);
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSearch} className="mb-4 flex">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search anime..."
          className="w-full p-2 border rounded-l-lg focus:outline-none"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 rounded-r-lg">
          Search
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {animes.map((a) => (
          <AnimeCard key={a.anime_id} anime={a} />
        ))}
      </div>
      {/* TODO: pagination controls */}
    </div>
  );
}