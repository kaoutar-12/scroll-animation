"use client";

import React, { useEffect, useRef, useCallback } from "react";
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
export const moviesPerColumn = 20;
export const totalMovies = columns * moviesPerColumn;

const Slider = ({ data }: { data: MovieResult[][] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement[]>([]);
  
  // Animation refs
  const scrollYRef = useRef(0);
  const yRef = useRef(0);
  const oldScrollYRef = useRef(0);
  const isDraggingRef = useRef(false);
  const touchStartRef = useRef(0);
  const itemHeightRef = useRef(0);
  const wrapHeightRef = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const scrollSpeedRef = useRef(0);

  // Animation helpers
  const lerp = useCallback((v0: number, v1: number, t: number) => 
    v0 * (1 - t) + v1 * t, []);

  const dispose = useCallback((menu: HTMLUListElement, scroll: number) => {
    const items = menu.querySelectorAll<HTMLElement>(".small-part");
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
  }, []);

  // Initialize grid and measurements
  const initGrid = useCallback(() => {
    if (!containerRef.current || !menuRef.current.length) return;
    
    const firstMenu = menuRef.current[0];
    const items = firstMenu.querySelectorAll(".small-part");
    if (!items.length) return;

    const firstItem = items[0] as HTMLElement;
    itemHeightRef.current = firstItem.clientHeight + 20; // Include padding
    wrapHeightRef.current = items.length * itemHeightRef.current;
    
    scrollYRef.current = 0;
    yRef.current = 0;
    oldScrollYRef.current = 0;
    
    menuRef.current.forEach((menu) => dispose(menu, scrollYRef.current));
  }, [dispose]);

  // Animation render loop
  const render = useCallback(() => {
    animationFrameId.current = requestAnimationFrame(render);
    
    yRef.current = lerp(yRef.current, scrollYRef.current, 0.1);
    menuRef.current.forEach((menu) => dispose(menu, yRef.current));
    
    scrollSpeedRef.current = yRef.current - oldScrollYRef.current;
    oldScrollYRef.current = yRef.current;
  }, [lerp, dispose]);

  // Event handlers
  const handleWheel = useCallback((e: WheelEvent) => {
    scrollYRef.current -= e.deltaY * 0.5;
  }, []);

  const handleTouchStart = useCallback((e: TouchEvent | MouseEvent) => {
    isDraggingRef.current = true;
    document.body.classList.add("dragging");
    touchStartRef.current = "touches" in e ? e.touches[0].clientY : e.clientY;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent | MouseEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const delta = clientY - touchStartRef.current;
    scrollYRef.current += delta * 2.5;
    touchStartRef.current = clientY;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    document.body.classList.remove("dragging");
  }, []);

  // Effect hooks
  useEffect(() => {
    initGrid();
  }, [data, initGrid]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Event listeners
    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("mousedown", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("mousemove", handleTouchMove);
    window.addEventListener("mouseup", handleTouchEnd);

    // Start animation loop
    animationFrameId.current = requestAnimationFrame(render);
    
    // Resize observer
    const resizeObserver = new ResizeObserver(initGrid);
    resizeObserver.observe(container);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      
      // Cleanup events
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("mousedown", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("mousemove", handleTouchMove);
      window.removeEventListener("mouseup", handleTouchEnd);
      
      resizeObserver.disconnect();
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd, render, initGrid]);

  return (
    <div className="container" ref={containerRef}>
      {data.map((column, colIndex) => (
        <ul
          key={colIndex}
          className="column"
          ref={(el) => el && (menuRef.current[colIndex] = el)}
          style={{ transform: `translateY(${[-100, -60, -150, -30, -200][colIndex]}px)` }}
        >
          <div className="column-content">
            {Array(5)
              .fill(column)
              .flat()
              .map((movie, i) => (
                <li key={`${movie.id}-${i}`} className="small-part">
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