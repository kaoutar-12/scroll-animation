// useSliderInteractions.ts
import { useRef, useCallback } from "react";

export const useSliderInteractions = (scrollYRef: React.MutableRefObject<number>) => {
  const isDraggingRef = useRef(false);
  const touchStartRef = useRef(0);

  const handleWheel = useCallback((e: WheelEvent) => {
    scrollYRef.current -= e.deltaY * 0.5;
  }, [scrollYRef]);

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
  }, [scrollYRef]);

  const handleTouchEnd = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    document.body.classList.remove("dragging");
  }, []);

  return {
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};