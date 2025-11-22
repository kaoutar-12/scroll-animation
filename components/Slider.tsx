"use client";

import React, { useEffect, useRef } from "react";
import "@/styles/slider.css";
import { MovieResult } from "@/next-types";
import { useSliderAnimation } from "@/hooks/useSliderAnimation";
import { useSliderInteractions } from "@/hooks/useSliderInteractions";
import SliderColumn from "./SliderColumn";

type SliderProps = {
  data: MovieResult[][];
  onCardClick: (movie: MovieResult) => void;
  selectedMovies: number[];
};

const Slider: React.FC<SliderProps> = ({ data, onCardClick, selectedMovies }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement[]>([]);

  const { scrollYRef, initGrid, render, cleanup } = useSliderAnimation();
  const { handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd } =
    useSliderInteractions(scrollYRef);

  useEffect(() => {
    initGrid(menuRef.current);
  }, [data, initGrid]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("mousedown", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("mousemove", handleTouchMove);
    window.addEventListener("mouseup", handleTouchEnd);

    render(menuRef.current);

    const resizeObserver = new ResizeObserver(() => initGrid(menuRef.current));
    resizeObserver.observe(container);

    return () => {
      cleanup();
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("mousedown", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("mousemove", handleTouchMove);
      window.removeEventListener("mouseup", handleTouchEnd);
      resizeObserver.disconnect();
    };
  }, [
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    render,
    initGrid,
    cleanup,
  ]);

  return (
    <div className="container" ref={containerRef}>
      {data.map((column, colIndex) => (
        <SliderColumn
          key={colIndex}
          column={column}
          colIndex={colIndex}
          onCardClick={onCardClick}
          selectedMovies={selectedMovies}
          onRef={(el) => {
            if (el) menuRef.current[colIndex] = el;
          }}
        />
      ))}
    </div>
  );
};

export default Slider;
