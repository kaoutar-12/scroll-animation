

"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@/styles/slider.css";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

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
  const smallParts = Array(20).fill(null);

  // Use refs to keep track of big parts for ScrollTrigger animations
  const bigPartRefs = useRef<Array<HTMLUListElement | null>>([]);

  useEffect(() => {
    // Infinite scroll logic for each big part
    bigPartRefs.current.forEach((bigPart, index) => {
      if (bigPart) {
        ScrollTrigger.create({
          trigger: bigPart,
          start: 0,
          end: "max",
          onLeave: (self) => {
            self.scroll(1); // Scroll back to the top
            ScrollTrigger.update();
          },
          onLeaveBack: (self) => {
            self.scroll(ScrollTrigger.maxScroll(window) - 1); // Scroll back to the bottom
            ScrollTrigger.update();
          }
        });

        // Animation for each small-part inside the big-part
        const smallParts = bigPart.querySelectorAll(".small-part");
        smallParts.forEach((part) => {
          gsap.to(part, {
            opacity: 1,
            repeat: 1,
            yoyo: true,
            ease: "none",
            scrollTrigger: {
              trigger: part,

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
        className={`big-part part${bigIndex + 1}` }
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
