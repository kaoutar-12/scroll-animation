"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";
import "@/styles/slider.css";
import Card from "./Card";

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
const moviesPerColumn = 25;
const totalMovies = columns * moviesPerColumn; // 125

const Slider = ({ clicked }: { clicked: boolean }) => {
  const [data, setData] = useState<MovieResult[][]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Refs for scroll and animation variables
  const menuRef = useRef<HTMLUListElement[]>([]);
  const scrollYRef = useRef(0);
  const yRef = useRef(0);
  const oldScrollYRef = useRef(0);
  const scrollSpeedRef = useRef(0);
  const isDraggingRef = useRef(false);
  const touchStartRef = useRef(0);
  const itemHeightRef = useRef(0);
  const wrapHeightRef = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  // Fetch movies
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

  // Setup refs for each column ul
  useEffect(() => {
    if (!containerRef.current) return;
    const cols = containerRef.current.querySelectorAll("ul.column");
    menuRef.current = Array.from(cols) as HTMLUListElement[];
  }, [data, clicked]);

  // Helper lerp function
  const lerp = (v0: number, v1: number, t: number) => v0 * (1 - t) + v1 * t;

  // Dispose function to position items and wrap scroll
  const dispose = (menu: HTMLUListElement, scroll: number) => {
    const items = menu.querySelectorAll(".small-part");
    const itemHeight = itemHeightRef.current;
    const wrapHeight = wrapHeightRef.current;

    gsap.set(items, {
      y: (i: number) => i * itemHeight + scroll,
      modifiers: {
        y: (y: string) => {
          const val = parseFloat(y);
          if (clicked) return `0px`;
          else {
            const wrapped = gsap.utils.wrap(
              -itemHeight,
              wrapHeight - itemHeight,
              val
            );
            return `${wrapped}px`;
          }
        },
      },
    });
  };

  // Wheel handler
  const handleWheel = (e: WheelEvent) => {
    scrollYRef.current -= e.deltaY;
  };

  // Touch / mouse drag handlers
  const handleTouchStart = (e: TouchEvent | MouseEvent) => {
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    touchStartRef.current = clientY;
    isDraggingRef.current = true;
    menuRef.current.forEach((menu) => menu.classList.add("is-dragging"));
  };

  const handleTouchMove = (e: TouchEvent | MouseEvent) => {
    if (!isDraggingRef.current) return;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const delta = clientY - touchStartRef.current;
    scrollYRef.current += delta * 2.5; // multiplier for scroll speed
    touchStartRef.current = clientY;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    menuRef.current.forEach((menu) => menu.classList.remove("is-dragging"));
  };

  // Resize handler
  const handleResize = () => {
    if (!menuRef.current.length) return;
    const firstMenu = menuRef.current[0];
    const items = firstMenu.querySelectorAll(".small-part");
    if (items.length === 0) return;

    itemHeightRef.current = (items[0] as HTMLElement).clientHeight;
    wrapHeightRef.current = items.length * itemHeightRef.current;
  };

  // Animation render loop
  const render = () => {
    animationFrameId.current = requestAnimationFrame(render);

    yRef.current = lerp(yRef.current, scrollYRef.current, 0.1);
    menuRef.current.forEach((menu) => dispose(menu, yRef.current));

    scrollSpeedRef.current = yRef.current - oldScrollYRef.current;
    oldScrollYRef.current = yRef.current;
  };

  useEffect(() => {
    if (!menuRef.current.length) return;

    handleResize();
    scrollYRef.current = 0;
    yRef.current = 0;
    oldScrollYRef.current = 0;

    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: true });

    menuRef.current.forEach((menu) => {
      menu.addEventListener("touchstart", handleTouchStart);
      menu.addEventListener("touchmove", handleTouchMove);
      menu.addEventListener("touchend", handleTouchEnd);
      menu.addEventListener("mousedown", handleTouchStart);
      menu.addEventListener("mousemove", handleTouchMove);
      menu.addEventListener("mouseup", handleTouchEnd);
      menu.addEventListener("mouseleave", handleTouchEnd);
      menu.addEventListener("selectstart", (e) => e.preventDefault());
    });

    window.addEventListener("resize", handleResize);

    // Start animation loop only if clicked is false (control infinite scroll)
    
  if (!clicked) {
    // Start infinite scroll only when clicked === false
    animationFrameId.current = requestAnimationFrame(render);
  }
    return () => {
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current);

      container.removeEventListener("wheel", handleWheel);

      menuRef.current.forEach((menu) => {
        menu.removeEventListener("touchstart", handleTouchStart);
        menu.removeEventListener("touchmove", handleTouchMove);
        menu.removeEventListener("touchend", handleTouchEnd);
        menu.removeEventListener("mousedown", handleTouchStart);
        menu.removeEventListener("mousemove", handleTouchMove);
        menu.removeEventListener("mouseup", handleTouchEnd);
        menu.removeEventListener("mouseleave", handleTouchEnd);
        menu.removeEventListener("selectstart", (e) => e.preventDefault());
      });

      window.removeEventListener("resize", handleResize);
    };
  }, [data, clicked]);

  return (
    <div
      className={clicked ? "container-clicked" : "container"}
      ref={containerRef}
    >
      {data.slice(0, clicked ? 4 : 5).map((column, colIndex) => (
        <ul
          key={colIndex}
          className={clicked ? "column-clicked" : "column"}
          ref={(el) => {
            if (el) menuRef.current[colIndex] = el;
          }}
        >
          {/* Render the movies */}
          {Array(5)
            .fill(column)
            .flat()
            .map((movie, i) => (
              <li
                key={`${movie.id}-${i}`}
                className={clicked ? "small-part-clicked" : "small-part"}
              >
                <Card movie={movie} />
              </li>
            ))}
        </ul>
      ))}
    </div>
  );
};

export default Slider;
