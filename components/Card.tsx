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
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              loading="lazy"
              fill
              sizes="(max-width: 480px) 26vw, (max-width: 768px) 28vw, (max-width: 1024px) 30vw, 18vw"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <Image
              src={"/placeholder.png"}
              alt={movie.title}
              loading="lazy"
              fill
              style={{ objectFit: "cover" }}
            />
          )}
        </div>

        {/* Back */}
        <div className="card-back">
          <Image
            src={"/card-back.png"}
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
