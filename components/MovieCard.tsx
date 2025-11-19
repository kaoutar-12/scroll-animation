/* eslint-disable @next/next/no-img-element */
import React from "react";

interface MovieCardProps {
  card: {
    id: number;
    poster_path?: string;
    title?: string;
    name?: string;
  };
  index: number;
  numberClass: string;
  width: number;
  height: number;
}

const MovieCard: React.FC<MovieCardProps> = ({
  card,
  index,
  numberClass,
  width,
  height,
}) => {
  return (
    <div key={card?.id} className="post">
      <div className={numberClass}>{index + 1}</div>
      <img
        src={
          card?.poster_path
            ? `https://image.tmdb.org/t/p/w500${card.poster_path}`
            : "/placeholder.png"
        }
        alt={card?.title || card?.name || "No Title"}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default MovieCard;
