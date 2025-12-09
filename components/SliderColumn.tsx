// SliderColumn.tsx
"use client";

import React from "react";
import Card from "./Card";
import { MovieResult } from "@/next-types";
import { FaCheck } from "react-icons/fa";

type SliderColumnProps = {
  column: MovieResult[];
  colIndex: number;
  onCardClick: (movie: MovieResult) => void;
  onRef: (el: HTMLUListElement | null) => void;
  selectedMovies: number[];
};

const columnOffsets = [-100, -60, -150, -30, -200];

const SliderColumn: React.FC<SliderColumnProps> = ({
  column,
  colIndex,
  onCardClick,
  onRef,
  selectedMovies,
}) => {
  return (
    <ul
      className="column"
      ref={onRef}
      style={{
        transform: `translateY(${columnOffsets[colIndex]}px)`,
      }}
    >
      <div className="column-content">
        {Array(5)
          .fill(column)
          .flat()
          .map((movie, i) => (
            <li key={`${movie.id}-${i}`} className="small-part">
              <div
                className={`movie-card ${
                  selectedMovies.includes(movie.id)
                    ? "selected-card animate-in"
                    : "animate-out"
                }`}
              >
                {selectedMovies.includes(movie.id) && (
                  <div className="checkmark">
                    <FaCheck />
                  </div>
                )}

                <Card movie={movie} onCardClick={onCardClick} />
              </div>
            </li>
          ))}
      </div>
    </ul>
  );
};

export default SliderColumn;
