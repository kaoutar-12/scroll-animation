"use client";
import Slider from "@/components/Slider";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Favorite from "@/components/Favorite";
import { useFavorites } from "@/context/FavoriteContext";
import { useMovieContext } from "@/context/MovieContext";

export default function Home() {
  const { addMovieToFavorites, cards } = useFavorites();
  const { data, getData } = useMovieContext();
  const [isValidate, setIsValidate] = useState(false);

  useEffect(() => {
    getData(1);
  }, [getData]);

  return (
    <div className="home">
      {!isValidate && <Navbar />}

      <div className="layout-wrapper">
        <div className="layout-content">
          {!isValidate && (
            <Slider data={data} onCardClick={addMovieToFavorites} />
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
