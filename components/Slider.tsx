"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "@/styles/slider.css";
import Card from "./Card";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export type MovieResult = {
  id: number;
  title: string;
  poster_path: string;
};

export type MovieApiResponse = {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
};

const columns = 5;
const rowsPerColumn = 87;
const totalItems = columns * rowsPerColumn; // 125

const Slider = () => {
  const [data, setData] = useState<MovieResult[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const getData = async () => {
    try {
      const response = await axios.get<MovieApiResponse>(
        "https://api.themoviedb.org/3/trending/all/day?language=en-US",
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
          },
        }
      );
      // Fill in data if fewer than needed
      const repeated = Array.from({ length: totalItems }, (_, i) => {
        return response.data.results[i % response.data.results.length];
      });
      setData(repeated);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!data.length) return;

    const scrollEl = window;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: () => {
        const max = ScrollTrigger.maxScroll(scrollEl);
        const y = window.scrollY;

        if (y >= max - 1) {
          gsap.to(scrollEl, { scrollTo: max / 2 + 1, duration: 0 });
        } else if (y <= 0) {
          gsap.to(scrollEl, { scrollTo: max / 2 - 1, duration: 0 });
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [data]);

  // Split movies into columns
  const columnsData = Array.from({ length: columns }, (_, colIndex) =>
    data.slice(colIndex * rowsPerColumn, (colIndex + 1) * rowsPerColumn)
  );

  return (
    <div className="container" ref={containerRef}>
      {columnsData.map((column, colIndex) => (
        <ul key={colIndex} className="column">
          {column.map((movie) => (
            <li key={movie.id} className="small-part">
              <Card movie={movie} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default Slider;
