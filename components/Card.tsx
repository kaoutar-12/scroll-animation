import React from "react";
import Image from "next/image";
import "../styles/card.css";
import { useMovieContext } from "@/context/MovieContext";
import { MovieResult } from "@/next-types";

interface CardProps {
  movie: MovieResult;
  onCardClick?: (movie: MovieResult) => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({ movie, onCardClick, className }) => {
  const { isLoading } = useMovieContext();

  return (
    <div
      className={`card ${isLoading ? "loading" : ""} ${className}`}
      onClick={() => onCardClick && onCardClick(movie)}
    >
      <div className="card-inner">
        {/* Front */}
        <div className="card-front">
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
        </div>

        {/* Back */}
        <div className="card-back">
          <Image
            src={"/card-back.png"} // replace with your back image
            alt="back"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
