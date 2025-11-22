"use client";
import Slider from "@/components/Slider";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Favorite from "@/components/Favorite";
import { useFavorites } from "@/context/FavoriteContext";
import { useMovieContext } from "@/context/MovieContext";
import SearchPage from "@/components/Search";
import { MovieResult } from "@/next-types";

export default function Home() {
  const { addMovieToFavorites, cards, removeMovie } = useFavorites();
  const { data, getData } = useMovieContext();
  const [isValidate, setIsValidate] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedMovies, setSelectedMovies] = useState<number[]>([]);
  const handleCardClick = (movie: MovieResult) => {
    setSelectedMovies((prev) => {
      if (prev.includes(movie.id)) {
        removeMovie(movie.id);
        return prev.filter((id) => id !== movie.id);
      }
      if (prev.length >= 10) return prev;

      addMovieToFavorites(movie);
      return [...prev, movie.id];
    });
  };

  useEffect(() => {
    getData(1);
  }, [getData]);

  return (
    <div className="home">
      {!isValidate && !isSearchOpen && (
        <Navbar setIsSearchOpen={setIsSearchOpen} />
      )}

      <div className="layout-wrapper">
        <div className="layout-content">
          {isSearchOpen && <SearchPage setIsSearchOpen={setIsSearchOpen} />}
          {!isValidate && !isSearchOpen && (
            <Slider
              data={data}
              onCardClick={handleCardClick}
              selectedMovies={selectedMovies}
            />
          )}
        </div>
        <Favorite
          isValidate={isValidate}
          setIsValidate={setIsValidate}
          cards={cards}
        />
      </div>
    </div>
  );
}
