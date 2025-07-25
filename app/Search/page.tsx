"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import "@/styles/search.css";

export type SearchResult = {
  id: number;
  title: string;
  poster_path: string;
};

const TOTAL_PAGES_TO_FETCH = 1;
const LOOP_COUNT = 20;

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [initialMovies, setInitialMovies] = useState<SearchResult[]>([]);

  useEffect(() => {
    const fetchInitialMovies = async () => {
      try {
        const responses = await Promise.all(
          Array.from({ length: TOTAL_PAGES_TO_FETCH }, (_, i) =>
            axios.get("https://api.themoviedb.org/3/movie/popular", {
              params: { page: i + 1 },
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
              },
            })
          )
        );
        const movies = responses.flatMap((res) => res.data.results || []);
        setInitialMovies(movies);
      } catch (err) {
        console.error("Error fetching popular movies:", err);
      }
    };
    fetchInitialMovies();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim()) {
        fetchSearchResults(query);
      } else {
        setResults([]);
      }
    }, 500);
    return () => clearTimeout(delay);
  }, [query]);

  const fetchSearchResults = async (searchTerm: string) => {
    try {
      const responses = await Promise.all(
        Array.from({ length: TOTAL_PAGES_TO_FETCH }, (_, i) =>
          axios.get("https://api.themoviedb.org/3/search/movie", {
            params: { query: searchTerm, page: i + 1 },
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
            },
          })
        )
      );
      const movies = responses.flatMap((res) => res.data.results || []);
      setResults(movies);
    } catch (err) {
      console.error("Error searching movies:", err);
    }
  };

  const isSearching = query.trim().length > 0;
  const moviesToDisplay = isSearching
    ? results
    : Array.from({ length: LOOP_COUNT }, () => initialMovies).flat();

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

      <div className={`search-container ${!isSearching ? "scrolling" : ""}`}>
        {moviesToDisplay.length > 0 ? (
          moviesToDisplay.map((movie, index) => (
            <div key={`${movie.id}-${index}`} className="movie-card">
              <Image
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/placeholder.png"
                }
                alt={movie.title}
                fill
              />
            </div>
          ))
        ) : (
          <p className="no-results">
            {isSearching ? "No search results found." : "Loading movies..."}
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
