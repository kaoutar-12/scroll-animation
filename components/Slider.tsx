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
  name: string;
};

export type MovieApiResponse = {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
};

export const columns = 5;
export const moviesPerColumn = 10;
export const totalMovies = columns * moviesPerColumn;

const Slider = ({
  clicked,
  data,
  isTyping,
}: {
  clicked: boolean;
  data: MovieResult[][];
  isTyping: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (clicked) {
      // Reset scroll values when entering clicked state
      scrollYRef.current = 0;
      yRef.current = 0;
      oldScrollYRef.current = 0;

      // Clear all GSAP transforms
      menuRef.current.forEach((menu) => {
        const items = menu.querySelectorAll<HTMLElement>(
          ".small-part, .small-part-clicked"
        );
        items.forEach((item) => {
          gsap.set(item, { clearProps: "transform" });
        });
      });
    }
  }, [clicked]);

  const lerp = (v0: number, v1: number, t: number) => v0 * (1 - t) + v1 * t;

  const dispose = (menu: HTMLUListElement, scroll: number) => {
    const items = menu.querySelectorAll<HTMLElement>(
      ".small-part, .small-part-clicked"
    );

    if (clicked) {
      // Clear all transforms in clicked state
      items.forEach((item) => {
        gsap.set(item, { clearProps: "transform" });
      });
    } else {
      const itemHeight = itemHeightRef.current;
      const wrapHeight = wrapHeightRef.current;

      gsap.set(items, {
        y: (i: number) => i * itemHeight + scroll,
        modifiers: {
          y: (y: string) => {
            const val = parseFloat(y);
            const wrapped = gsap.utils.wrap(
              -itemHeight,
              wrapHeight - itemHeight,
              val
            );
            return `${wrapped}px`;
          },
        },
      });
    }
  };
  useEffect(() => {
    if (!containerRef.current) return;

    const cols = containerRef.current.querySelectorAll(
      "ul.column, ul.column-clicked"
    );
    menuRef.current = Array.from(cols) as HTMLUListElement[];

    if (!clicked) {
      const scroll = scrollYRef.current;
      menuRef.current.forEach((menu) => dispose(menu, scroll));
    }
  }, [data, clicked]);

  const handleWheel = (e: WheelEvent) => {
    scrollYRef.current -= e.deltaY;
  };

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
    scrollYRef.current += delta * 2.5;
    touchStartRef.current = clientY;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    menuRef.current.forEach((menu) => menu.classList.remove("is-dragging"));
  };

  const handleResize = () => {
    if (!menuRef.current.length) return;
    const firstMenu = menuRef.current[0];
    const items = firstMenu.querySelectorAll(".small-part");
    if (!items.length) return;

    itemHeightRef.current = (items[0] as HTMLElement).clientHeight;
    wrapHeightRef.current = items.length * itemHeightRef.current;
  };

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

    if (!clicked) {
      container.addEventListener("wheel", handleWheel, { passive: true });
      animationFrameId.current = requestAnimationFrame(render);

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
    }
    window.addEventListener("resize", handleResize);

    if (!clicked) {
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
          <div className="column-content">
            {Array(5)
              .fill(column)
              .flat()
              .map((movie, i) => (
                <li
                  key={`${movie.id}-${i}`}
                  className={`${
                    isTyping
                      ? "typing"
                      : clicked
                      ? "small-part-clicked"
                      : "small-part"
                  }`}
                >
                  <div className="card-container">
                    <Card movie={movie} />
                  </div>
                </li>
              ))}
          </div>
        </ul>
      ))}
    </div>
  );
};

export default Slider;
