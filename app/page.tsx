"use client";
import Slider from "@/components/Slider";
import { useEffect } from "react";
import { useFavorites } from "@/context/FavoriteContext";
import { useMovieContext } from "@/context/MovieContext";

export default function Home() {
  const { addMovieToFavorites } = useFavorites();
  const { data, getData } = useMovieContext();

  useEffect(() => {
    getData(1);
  }, [getData]);

  return (
    <div className="home">
      <Slider data={data} onCardClick={addMovieToFavorites} />
    </div>
  );
}
