"use client";
import React from "react";
import "../styles/navbar.css";
import { CgSearch } from "react-icons/cg";

const Navbar = () => {
  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.trim();

    if (!query) return;

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${encodeURIComponent(
          query
        )}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
          },
        }
      );

      const data = await response.json();
      console.log("Search results:", data.results); // You can pass this to state or props
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <span>CineVerse</span>
      </div>
      <div className="search">
        <div className="search-inside">
          <input type="text" placeholder="Search" onChange={handleSearch} />
          <CgSearch className="icon" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;