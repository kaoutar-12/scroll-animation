"use client";

import { MovieResult } from "@/next-types";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

type FavoritesContextType = {
  cards: (MovieResult | null)[];
  addMovieToFavorites: (movie: MovieResult) => void;
  removeMovie: (id: number) => void;
  clearFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<(MovieResult | null)[]>(
    Array(10).fill(null)
  );

  const addMovieToFavorites = useCallback((movie: MovieResult) => {
    setCards((prev) => {
      // Prevent duplicates
      const exists = prev.some((card) => card?.id === movie.id);
      if (exists) return prev;

      // Find first empty slot
      const firstEmptyIndex = prev.findIndex((card) => card === null);
      if (firstEmptyIndex === -1) return prev;

      const newCards = [...prev];
      newCards[firstEmptyIndex] = movie;
      return newCards;
    });
  }, []);

  const removeMovie = useCallback((id: number) => {
    setCards((prev) => {
      // Step 1: Remove the movie (filter it out)
      const filtered = prev.filter((card) => card?.id !== id);

      // Step 2: Shift movies and maintain size 10
      const newCards = [...filtered];

      // Fill the remaining slots with null
      while (newCards.length < 10) {
        newCards.push(null);
      }

      // If more than 10, trim extras (normally won't happen)
      return newCards.slice(0, 10);
    });
  }, []);

  const clearFavorites = useCallback(() => {
    setCards(Array(10).fill(null));
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        cards,
        addMovieToFavorites,
        removeMovie,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
