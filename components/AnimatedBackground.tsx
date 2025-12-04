import React, { useState } from "react";
import "@/styles/AnimatedBackground.css";

interface ColorBoxProps {
  label: string;
  color: string;
  className: string;
}

const colors: ColorBoxProps[] = [
  { label: "Purple", color: "#667eea", className: "box1" },
  { label: "Pink", color: "#f5576c", className: "box2" },
  { label: "Cyan", color: "#00f2fe", className: "box3" },
];

export default function AnimatedBackground() {
  const [_, setRefresh] = useState(false); // just to re-render when needed

  const handleClick = (color: string) => {
    const body = document.body;
    body.style.backgroundColor = "red";

    // Remove old sections
    const oldSections = document.querySelectorAll(".bg-section");
    oldSections.forEach((sec) => sec.remove());

    // Create 3 sections with stagger animation
    for (let i = 1; i <= 3; i++) {
      const section = document.createElement("div");
      section.className = `bg-section bg-section-${i}`;
      section.style.backgroundColor = color;
      body.appendChild(section);

      setTimeout(() => {
        section.classList.add("active");
      }, 10 + i * 50);
    }

    // After animation, set body bg and remove sections
    setTimeout(() => {
      body.style.backgroundColor = color;
      const newSections = document.querySelectorAll(".bg-section");
      newSections.forEach((sec) => sec.remove());
      setRefresh((x) => !x);
    }, 1100);
  };

  return (
    <div className="animated-wrapper">
      {/* {colors.map((box) => (
        <div
          key={box.label}
          className={`color-box ${box.className}`}
          onClick={() => handleClick(box.color)}
        >
          {box.label}
        </div>
      ))} */}
    </div>
  );
}
