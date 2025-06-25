"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; // Import ScrollToPlugin
import "@/styles/slider.css";
import Card from "./Card";

// Register ScrollTrigger and ScrollToPlugin
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface smallPartsProps {
  smallParts: string[];
}

const Tst: React.FC<smallPartsProps> = ({ smallParts }) => {
  return (
    <>
      {smallParts.map((_, smallIndex) => (
        <li className="small-part" key={smallIndex}>
          <Card/>
        </li>
      ))}
    </>
  );
};

const Slider = () => {
  const bigParts = Array(5).fill(null);
  const smallParts = Array(25).fill(null);

  // Use refs to keep track of big parts for ScrollTrigger animations
  const bigPartRefs = useRef<Array<HTMLUListElement | null>>([]);

  useEffect(() => {
    // Infinite scroll logic for each big part
    bigPartRefs.current.forEach((bigPart) => {
      if (bigPart) {
        ScrollTrigger.create({
          trigger: bigPart,
          start: 0,
          end: "max",
          onLeave: () => {
            gsap.to(window, { scrollTo: 1, duration: 0 }); // Scroll to the start
            ScrollTrigger.update();
          },
          onLeaveBack: () => {
            gsap.to(window, {
              scrollTo: ScrollTrigger.maxScroll(window) - 1,
              duration: 0, // Instant scroll to the end
            });
            ScrollTrigger.update();
          },
        });

        // Animation for each small-part inside the big-part
        const smallParts = bigPart.querySelectorAll(".small-part");
        smallParts.forEach((part) => {
          gsap.to(part, {
            opacity: 1,
            repeat: -1,
            duration: 1,
            yoyo: true,
            ease: "none",
            scrollTrigger: {
              trigger: part,
              scrub: true,
            },
          });
        });
      }
    });
  }, []);

  return (
    <div className="container">
      {bigParts.map((_, bigIndex) => (
        <ul
          className={`big-part part${bigIndex + 1}`}
          key={bigIndex}
          ref={(el) => { bigPartRefs.current[bigIndex] = el; }}
        >
          <Tst smallParts={smallParts} />
          <Tst smallParts={smallParts} />
        </ul>
      ))}
      {/* Include the ScrollingMenu component here */}
    </div>
  );
};

export default Slider;
