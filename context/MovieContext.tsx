// context/MovieContext.tsx
"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import axios from "axios";
import { MovieApiResponse, MovieResult } from "@/next-types";
import { columns, moviesPerColumn, totalMovies } from "@/hooks/useSliderAnimation";


interface MovieContextType {
  data: MovieResult[][];
  isLoading: boolean;
  loadMovies: () => Promise<void>;
  getData: (total: number) => Promise<void>;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [data, setData] = useState<MovieResult[][]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = useCallback(async (start: number) => {
    try {
      const totalPagesToFetch = Math.ceil(totalMovies / 20);

      const requests = Array.from({ length: totalPagesToFetch }, (_, i) =>
        axios.get<MovieApiResponse>(
          `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${
            i + start
          }`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
            },
          }
        )
      );

      const responses = await Promise.all(requests);
      const allMovies = responses.flatMap((res) => res.data.results);

      const columnsData = Array.from({ length: columns }, (_, i) =>
        allMovies.slice(i * moviesPerColumn, (i + 1) * moviesPerColumn)
      );

      setData(columnsData);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }, []);

  const loadMovies = useCallback(async () => {
    setIsLoading(true);
    try {
      const newCount = Math.floor(Math.random() * (200 - 51 + 1)) + 51;
      await getData(newCount);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setTimeout(() => setIsLoading(true), 10000); // Simulate loading delay
    }
  }, [getData]);

  // Load movies when refreshCount changes

  const value = {
    data,
    isLoading,
    loadMovies,
    getData,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};
