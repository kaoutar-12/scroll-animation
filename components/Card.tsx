import React from "react";
import { MovieResult } from "./Slider";
import Image from "next/image";
interface CardProps {
  movie: MovieResult;
}

const Card: React.FC<CardProps> = ({ movie }) => {
  return (
    <div className="card">
      <Image
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        loading="lazy"
        width={300}
        height={450}
      />
      {/* <h3>{movie.title}</h3> */}

    </div>
  );
};

export default Card;
