"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "@/styles/search.css";
import Image from "next/image";

export type SearchResult = {
  id: number;
  title: string;
  poster_path: string;
};

const TOTAL_PAGES_TO_FETCH = 3;

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const fetchMovies = async (searchTerm: string) => {
    if (!searchTerm) return;

    try {
      const requests = Array.from({ length: TOTAL_PAGES_TO_FETCH }, (_, i) =>
        axios.get("https://api.themoviedb.org/3/search/movie", {
          params: {
            query: searchTerm,

            page: i + 1,
          },
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
          },
        })
      );

      const responses = await Promise.all(requests);
      const allResults = responses.flatMap((res) => res.data.results || []);

      setResults(allResults);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchMovies(query);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="search-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="search-container">
        {results.length > 0 ? (
          results.map((movie) => (
            <div key={movie.id} className="movie-card">
              <Image
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : "/placeholder.png"
                }
                alt={movie.title || "movie poster"}
                width={200}
                height={300}
              />
              <h4>{movie.title}</h4>
            </div>
          ))
        ) : (
          <p className="no-results">
            No results yet. Try searching for a movie.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
