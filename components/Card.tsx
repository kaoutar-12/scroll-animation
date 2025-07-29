import React from "react";
import { MovieResult } from "./Slider";
import Image from "next/image";
import "../styles/card.css";
interface CardProps {
  movie: MovieResult;
  onCardClick?: (movie: MovieResult) => void; // Optional click handler
}

const Card: React.FC<CardProps> = ({ movie, onCardClick }) => {
  return (
    <div className="card" onClick={() => onCardClick && onCardClick(movie)}>
      {movie.poster_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          loading="lazy"
          width={350}
          height={500}
          
        />
      ) : (
        <Image
          src={"/placeholder.png"}
          alt={movie.title}
          loading="lazy"
          fill
         
        />
      )}
      {/* <h3>{movie.title}</h3> */}
    </div>
  );
};

export default Card;
