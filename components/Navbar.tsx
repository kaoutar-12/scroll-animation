"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/navbar.css";
import { CgSearch } from "react-icons/cg";
import { MovieApiResponse, MovieResult } from "./Slider";

const Navbar = ({
  setClicked,
  setSearchData,
  data,
  setIsTyping,
}: {
  setClicked: (val: boolean) => void;
  setSearchData: (data: MovieResult[][]) => void;
  data: MovieResult[][];
  setIsTyping: (val: boolean) => void;
}) => {
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleClick = () => setClicked(true);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim() === "") {
        setSearchData(data); // restore default data if input is empty
        return;
      }

      const getSearchData = async () => {
        setIsSearching(true);
        try {
          // Use the search endpoint instead of trending
          const response = await axios.get<MovieApiResponse>(
            `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${encodeURIComponent(
              search
            )}`,
            {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
              },
            }
          );

          // Get search results
          const searchResults = response.data.results || [];

          console.log("Search results:", searchResults);

          // Filter by name or title (movies from search only have title)
          const filteredMovies = searchResults.filter(
            (movie) =>
              movie.title?.toLowerCase().includes(search.toLowerCase()) ||
              movie.name?.toLowerCase().includes(search.toLowerCase())
          );

          // Convert to column format (4 columns for clicked state)
          const columnsData = Array.from({ length: 4 }, (_, i) => {
            const start = Math.floor(filteredMovies.length / 4) * i;
            const end =
              i === 3
                ? filteredMovies.length
                : Math.floor(filteredMovies.length / 4) * (i + 1);
            return filteredMovies.slice(start, end);
          });

          setSearchData(columnsData);
        } catch (error) {
          console.error("Search error:", error);
          setSearchData([]); // Set empty array on error
        } finally {
          setIsSearching(false);
        }
      };

      getSearchData();
    }, 500); // debounce 500ms

    return () => clearTimeout(delayDebounce);
  }, [search, data, setSearchData]);

  return (
    <nav className="navbar">
      <div className="logo">
        <span>CineVerse</span>
      </div>
      <div className="search">
        <div className="search-inside">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              setIsTyping(value.trim() !== "");
            }}
            onClick={handleClick}
          />
          <CgSearch className="icon" />
          {isSearching && <div className="search-spinner"></div>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
