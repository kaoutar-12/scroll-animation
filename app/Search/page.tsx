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
  const [initialMovies, setInitialMovies] = useState<SearchResult[]>([]);

  const fetchInitialMovies = async () => {
    try {
      const requests = Array.from({ length: TOTAL_PAGES_TO_FETCH }, (_, i) =>
        axios.get("https://api.themoviedb.org/3/movie/popular", {
          params: { page: i + 1 },
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
          },
        })
      );

      const responses = await Promise.all(requests);
      const allResults = responses.flatMap((res) => res.data.results || []);
      setInitialMovies(allResults);
    } catch (err) {
      console.error("Error fetching initial movies:", err);
    }
  };

  const fetchMovies = async (searchTerm: string) => {
    if (!searchTerm) return;

    try {
      const requests = Array.from({ length: TOTAL_PAGES_TO_FETCH }, (_, i) =>
        axios.get("https://api.themoviedb.org/3/search/movie", {
          params: { query: searchTerm, page: i + 1 },
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
          },
        })
      );

      const responses = await Promise.all(requests);
      const allResults = responses.flatMap((res) => res.data.results || []);
      setResults(allResults);
    } catch (err) {
      console.error("Error fetching search results:", err);
    }
  };

  useEffect(() => {
    fetchInitialMovies();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        fetchMovies(query);
      } else {
        setResults([]); // Clear results to show initial movies again
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const moviesToShow = query.trim() ? results : initialMovies;

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
        {moviesToShow.length > 0 ? (
          moviesToShow.map((movie) => (
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
