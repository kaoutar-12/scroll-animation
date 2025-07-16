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
const moviesPerColumn = 10;
const totalMovies = columns * moviesPerColumn; // 500

const Slider = ({ clicked }: { clicked: boolean }) => {
  const [data, setData] = useState<MovieResult[][]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const getData = async () => {
    try {
      const totalPagesToFetch = Math.ceil(totalMovies / 20); // TMDb returns 20 per page
      const requests = Array.from({ length: totalPagesToFetch }, (_, i) =>
        axios.get<MovieApiResponse>(
          `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${
            i + 1
          }`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
            },
          }
        )
      );

      const responses = await Promise.all(requests);
      const allMovies = responses.flatMap((res) => res.data.results);

      // Slice into 5 columns of 100 movies each
      const columnsData = Array.from({ length: columns }, (_, i) =>
        allMovies.slice(i * moviesPerColumn, (i + 1) * moviesPerColumn)
      );

      setData(columnsData);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!data.length) return;

    const triggers: ScrollTrigger[] = [];
    const columns = containerRef.current?.querySelectorAll(".column");
    if (!columns) return;

    columns.forEach((col) => {
      const colHeight = col.scrollHeight;
      // Duplicate content for seamless loop
      col.innerHTML += col.innerHTML;

      triggers.push(
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: `+=${colHeight}`,
          scrub: true,
          onUpdate: (self) => {
            let scrollY = self.scroll();

            if (scrollY > colHeight) {
              scrollY = scrollY % colHeight;
              gsap.to(window, { scrollTo: scrollY, duration: 0 });
            }

            gsap.to(col, {
              y: -scrollY,
              ease: "none",
              overwrite: true,
            });
          },
        })
      );
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [data]);

  return (
    <div
      className={clicked ? "container-clicked" : "container"}
      ref={containerRef}
    >
      {data.map((column, colIndex) => (
        <ul key={colIndex} className={clicked ? "column-clicked" : "column"}>
          {Array(10)
            .fill(column)
            .flat()
            .map((movie, i) => (
              <li key={`${movie.id}-${i}`} className="small-part">
                <Card movie={movie} />
              </li>
            ))}
        </ul>
      ))}
    </div>
  );
};

export default Slider;
