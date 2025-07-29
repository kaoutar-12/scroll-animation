"use client";
import React, { useState, useEffect, useRef } from "react";
import "@/styles/favorite.css";
import { TbLayoutBottombarExpand } from "react-icons/tb";
import { MovieResult } from "./Slider";
import Image from "next/image";

interface BigCardsProps {
  cards: MovieResult[];
}
const BigCards: React.FC<BigCardsProps> = ({ cards }) => {
  console.log("BigCards rendered with cards:", cards);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setSelectedCard(index === selectedCard ? null : index); // Toggle expansion
  };

  const handleDotClick = (index: number) => {
    setSelectedCard(index); // Select the card linked to the dot
  };

  return (
    <div className="list-wrapper-big">
      <div className="dots">
        {cards.map((_, index) => (
          <div
            key={index}
            className={`dot ${selectedCard === index ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>

      <div className="list-big">
        {cards.map((card, index) => {
          console.log("Rendering card:", card);
          return (
            <div
              key={index}
              className={`liked-big ${
                selectedCard === index ? "expanded" : ""
              }`}
              onClick={() => handleCardClick(index)}
            >
              <div
                className="card-front-big"
                style={{ position: "relative", width: "100%", height: "100%" }}
                id={`front-${index + 1}`}
              >
                <Image
                  src={
                    card
                      ? `https://image.tmdb.org/t/p/w300${card.poster_path}`
                      : "/placeholder.png"
                  }
                  alt={`Card ${index + 1}`}
                  loading="lazy"
                  fill
                />
              </div>
              <div className="card-back-big">{index + 1}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const One: React.FC<{ toggleExpand: () => void }> = ({ toggleExpand }) => {
  const likedItems = Array(7).fill(null);

  return (
    <div className="list-wrapper">
      <div className="list-fav">
        {likedItems.map((_, index) => (
          <div key={index} className="liked">
            <div className="card-front" id={`front-${index}`}></div>
            <div className="card-back"> {index + 1}</div>
          </div>
        ))}
      </div>
      <TbLayoutBottombarExpand className="expand" onClick={toggleExpand} />
    </div>
  );
};

interface FavoriteProps {
  cards: any[];
}
const Favorite: React.FC<FavoriteProps> = ({ cards }) => {
  const likedItemsCount = 7;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Controls visibility for smooth transitions
  const favoriteRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => {
    if (!isExpanded) {
      setIsExpanded(true); // Show div with expansion animation
      setTimeout(() => setIsVisible(true), 100); // Delay to allow CSS transition
    } else {
      setIsVisible(false); // Start hide animation
      setTimeout(() => setIsExpanded(false), 400); // Remove from DOM after transition
    }
  };

  // Handle click outside the component to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        favoriteRef.current &&
        !favoriteRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false); // Start hide animation
        setTimeout(() => setIsExpanded(false), 400); // Remove after the animation
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fav" ref={favoriteRef}>
      <div className="text">YOU HAVE {likedItemsCount} CHOICES</div>
      <div className={`favorite ${isExpanded ? "expanded" : ""}`}>
        <div className="col">
          {isExpanded ? (
            <div className={`empty-state ${isVisible ? "visible" : "hidden"}`}>
              {/* Add more content here inside the expanded div */}
              <hr className="hr-expand" />
              <div className="namelist">
                <input type="text" placeholder="NAME YOUR TOP" />
              </div>
              <div className="content-wrapper">
                <BigCards cards={cards} />
              </div>
              <div className="validate">VALIDATE</div>
            </div>
          ) : (
            <>
              <hr className="fav-hr" />
              <One toggleExpand={toggleExpand} /> {/* Pass props to One */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorite;
