"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "@/styles/slider.css";
import Navbar from "../components/Navbar";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollToPlugin);

interface smallPartsProps {
  smallParts: string[];
}

const Tst: React.FC<smallPartsProps> = ({ smallParts }) => {
  return (
    <>
      {smallParts.map((_, smallIndex) => (
        <li className="small-part" key={smallIndex}></li>
      ))}
    </>
  );
};

const Slider = () => {
  const bigParts = Array(4).fill(null);
  const smallParts = Array(10).fill(null); // 10 items in each row

  // Refs to track big parts
  const bigPartRefs = useRef<Array<HTMLUListElement | null>>([]);
  
  // Scroll variables
  let menuHeight = 0;
  let itemHeight = 0;
  let wrapHeight = 0;
  let scrollY = 0;
  let oldScrollY = 0;
  let y = 0;
  let scrollSpeed = 0;

  const lerp = (v0, v1, t) => v0 * (1 - t) + v1 * t;

  const dispose = (scroll) => {
    gsap.set(bigPartRefs.current, {
      y: (i) => i * itemHeight + scroll,
      modifiers: {
        y: (y) => {
          const s = gsap.utils.wrap(-itemHeight, wrapHeight - itemHeight, parseInt(y));
          return `${s}px`;
        }
      }
    });
  };

  const render = () => {
    requestAnimationFrame(render);
    y = lerp(y, scrollY, 0.1);
    dispose(y);

    scrollSpeed = y - oldScrollY;
    oldScrollY = y;

    gsap.to(bigPartRefs.current, {
      scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * 0.005,
      rotate: scrollSpeed * 0.2,
      stagger: 0.1
    });
  };

  const handleMouseWheel = (e) => {
    scrollY -= e.deltaY;
  };

  let touchStart = 0;
  let touchY = 0;
  let isDragging = false;

  const handleTouchStart = (e) => {
    touchStart = e.clientY || e.touches[0].clientY;
    isDragging = true;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    touchY = e.clientY || e.touches[0].clientY;
    scrollY += (touchY - touchStart) * 2.5;
    touchStart = touchY;
  };

  const handleTouchEnd = () => {
    isDragging = false;
  };

  useEffect(() => {
    const updateDimensions = () => {
      menuHeight = window.innerHeight;
      itemHeight = bigPartRefs.current[0].clientHeight;
      wrapHeight = bigParts.length * itemHeight;
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('mousewheel', handleMouseWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('mousedown', handleTouchStart);
    window.addEventListener('mousemove', handleTouchMove);
    window.addEventListener('mouseleave', handleTouchEnd);
    window.addEventListener('mouseup', handleTouchEnd);
    window.addEventListener('selectstart', () => false);

    render();

    return () => {
      window.removeEventListener('mousewheel', handleMouseWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('mousedown', handleTouchStart);
      window.removeEventListener('mousemove', handleTouchMove);
      window.removeEventListener('mouseleave', handleTouchEnd);
      window.removeEventListener('mouseup', handleTouchEnd);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <div className="container">
      {bigParts.map((_, bigIndex) => (
        <ul
          className={`big-part part${bigIndex + 1}`}
          key={bigIndex}
          ref={(el) => (bigPartRefs.current[bigIndex] = el)}
        >
          <Tst smallParts={smallParts} />
        </ul>
      ))}
    </div>
  );
};

export default Slider;
