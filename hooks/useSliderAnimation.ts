// useSliderAnimation.ts
import { useRef, useCallback } from "react";
import { gsap } from "gsap";

export const columns = 5;
export const moviesPerColumn = 10;
export const totalMovies = columns * moviesPerColumn;
export const scrollSpeeds = [1.3, 1, 1.4, 1, 1.2];

export const useSliderAnimation = () => {
  const scrollYRef = useRef(0);
  const yRef = useRef(0);
  const oldScrollYRef = useRef(0);
  const itemHeightRef = useRef(0);
  const wrapHeightRef = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const scrollSpeedRef = useRef(0);

  const lerp = useCallback(
    (v0: number, v1: number, t: number) => v0 * (1 - t) + v1 * t,
    []
  );

  const dispose = useCallback(
    (menu: HTMLUListElement, scroll: number, index: number) => {
      const items = menu.querySelectorAll<HTMLElement>(".small-part");
      const itemHeight = itemHeightRef.current;
      const wrapHeight = wrapHeightRef.current;
      const speed = scrollSpeeds[index] || 1;

      gsap.set(items, {
        y: (i: number) => i * itemHeight + scroll * speed,
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
    },
    []
  );

  const initGrid = useCallback(
    (menuRefs: HTMLUListElement[]) => {
      if (!menuRefs.length) return;
      const firstMenu = menuRefs[0];
      const items = firstMenu.querySelectorAll(".small-part");
      if (!items.length) return;

      const firstItem = items[0] as HTMLElement;
      itemHeightRef.current = firstItem.clientHeight + 20;
      wrapHeightRef.current = items.length * itemHeightRef.current;

      scrollYRef.current = 0;
      yRef.current = 0;
      oldScrollYRef.current = 0;

      menuRefs.forEach((menu, index) =>
        dispose(menu, scrollYRef.current, index)
      );
    },
    [dispose]
  );

  const render = useCallback(
    (menuRefs: HTMLUListElement[]) => {
      animationFrameId.current = requestAnimationFrame(() =>
        render(menuRefs)
      );

      yRef.current = lerp(yRef.current, scrollYRef.current, 0.1);

      menuRefs.forEach((menu, index) => {
        dispose(menu, yRef.current, index);
      });

      scrollSpeedRef.current = yRef.current - oldScrollYRef.current;
      oldScrollYRef.current = yRef.current;
    },
    [lerp, dispose]
  );

  const cleanup = useCallback(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
  }, []);

  return {
    scrollYRef,
    initGrid,
    render,
    cleanup,
  };
};