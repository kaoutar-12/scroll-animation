"use client";
import Slider, {
  columns,
  MovieApiResponse,
  MovieResult,
  moviesPerColumn,
  totalMovies,
} from "@/components/Slider";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useFavorites } from "@/context/FavoriteContext";
import { useMovieContext } from "@/context/MovieContext";

export default function Home() {
  const { addMovieToFavorites } = useFavorites();
  const { data, getData } = useMovieContext();
  
   useEffect(() => {
    getData(1);
  },[getData]);

  return (
    <div className="home">
      <Slider data={data} onCardClick={addMovieToFavorites} />
    </div>
  );
}
