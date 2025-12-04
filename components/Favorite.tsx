"use client";
import React, { useState, useEffect, useRef } from "react";
import "@/styles/favorite.css";
import { TbLayoutBottombarExpand, TbTrash } from "react-icons/tb";
import Image from "next/image";
import { useFavorites } from "@/context/FavoriteContext";
import GeneratePost from "./GeneratePost";

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface MovieResult {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
}

interface BigCardsProps {
  cards: MovieResult[];
  onDelete: (id: number) => void;
  isValidate: boolean;
  setIsValidate: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CompactViewProps {
  toggleExpand: () => void;
  cards: MovieResult[];
  onDelete: (id: number) => void;
}

interface FavoriteProps {
  cards: (MovieResult | null)[];
  isValidate: boolean;
  setIsValidate: React.Dispatch<React.SetStateAction<boolean>>;
}

// ============================================
// EXPANDED VIEW COMPONENT
// Shows cards in larger format with flip animation
// ============================================

const ExpandedCardsView: React.FC<BigCardsProps> = ({
  cards,
  onDelete,
  isValidate,
  setIsValidate,
}) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const { setSelectedMovies } = useFavorites();

  // Toggle card selection (expands the card)
  const handleCardClick = (index: number) => {
    setSelectedCard(index === selectedCard ? null : index);
  };

  // Delete card and deselect if it was selected
  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // Prevent card click event
    onDelete(id);
    setSelectedMovies((prev) => {
      return prev.filter((movieId) => movieId !== id);
    });

    // Deselect if the deleted card was selected
    if (selectedCard !== null && cards[selectedCard]?.id === id) {
      setSelectedCard(null);
    }
  };

  const handleClick = (color: string) => {
    const body = document.body;

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
      //   const newSections = document.querySelectorAll(".bg-section");
      //   newSections.forEach((sec) => sec.remove());
      //   setRefresh((x) => !x);
    }, 1100);
  };

  return (
    <div className="list-wrapper-big">
      <div className="validate-container">
        <button
          onClick={() => {
            setTimeout(() => {
              handleClick("#ffeb7d");
            }, 200);
            setIsValidate(true);
          }}
          className="validate-button"
        >
          Validate
        </button>
      </div>

      {isValidate && (
        <div className="validation-container">
          <GeneratePost />
        </div>
      )}

      {/* Cards grid */}
      <div className="list-big">
        {cards.map((card, index) => {
          // Show empty placeholder if no card
          if (!card) {
            return (
              <div key={index} className="liked-big empty">
                <div className="empty-placeholder">+</div>
              </div>
            );
          }

          // Show movie card with flip effect
          return (
            <div
              key={index}
              className={`liked-big ${
                selectedCard === index ? "expanded" : ""
              }`}
              onClick={() => handleCardClick(index)}
            >
              <div className="card-inner-big">
                {/* Front of card - shows poster */}
                <div className="liked-big">
                  <div className="card-front-big">
                    <Image
                      src={
                        card.poster_path
                          ? `https://image.tmdb.org/t/p/w300${card.poster_path}`
                          : "/placeholder.png"
                      }
                      alt={card.title || card.name || "Movie"}
                      fill
                      sizes="(max-width: 768px) 100px, 150px"
                    />
                  </div>
                  <button
                    className="delete-big"
                    onClick={(e) => handleDelete(e, card.id)}
                  >
                    <TbTrash size={20} />
                  </button>
                </div>

                {/* Back of card - shows poster + delete button */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================
// COMPACT VIEW COMPONENT
// Shows cards in smaller format at bottom of screen
// ============================================

const CompactCardsView: React.FC<CompactViewProps> = ({
  toggleExpand,
  cards,
  onDelete,
}) => {
  const { setSelectedMovies } = useFavorites();
  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    onDelete(id);
    setSelectedMovies((prev) => {
      return prev.filter((movieId) => movieId !== id);
    });
  };

  return (
    <div className="list-wrapper">
      {/* Small cards row */}
      <div className="list-fav">
        {cards.map((card, index) =>
          card ? (
            <div key={index} className="liked">
              <div className="card-front" id={`front-${index}`}>
                <Image
                  src={
                    card.poster_path
                      ? `https://image.tmdb.org/t/p/w300${card.poster_path}`
                      : "/placeholder.png"
                  }
                  alt={card.title || card.name || "Movie"}
                  fill
                  sizes="70px"
                />
              </div>
              <button
                className="delete-small"
                onClick={(e) => handleDelete(e, card.id)}
              >
                <TbTrash size={20} />
              </button>
            </div>
          ) : (
            <div key={index} className="liked empty-small">
              <div className="empty-placeholder-small">+</div>
            </div>
          )
        )}
      </div>

      {/* Expand button */}
      <TbLayoutBottombarExpand className="expand" onClick={toggleExpand} />
    </div>
  );
};

// ============================================
// MAIN FAVORITE COMPONENT
// Manages the favorite list with expand/collapse functionality
// ============================================

const Favorite: React.FC<FavoriteProps> = ({
  cards,
  isValidate,
  setIsValidate,
}) => {
  const { removeMovie } = useFavorites();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const favoriteRef = useRef<HTMLDivElement>(null);

  // Toggle between compact and expanded views
  const toggleExpand = () => {
    if (!isExpanded) {
      // Expand: show immediately, then fade in content
      setIsExpanded(true);
      setTimeout(() => setIsVisible(true), 100);
    } else {
      // Collapse: fade out content, then hide
      setIsVisible(false);
      setTimeout(() => setIsExpanded(false), 400);
    }
  };

  // Handle movie deletion
  const handleDelete = (id: number) => {
    removeMovie(id);
  };

  // Close expanded view when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        favoriteRef.current &&
        !favoriteRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
        setTimeout(() => setIsExpanded(false), 400);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isValidate) {
    return (
      <div className="">
        <GeneratePost />
      </div>
    );
  }

  return (
    <div className="fav" ref={favoriteRef}>
      <div className={`favorite ${isExpanded ? "expanded" : ""}`}>
        <div className="col">
          {isExpanded ? (
            // EXPANDED VIEW: Shows larger cards with name input
            <div className={`empty-state ${isVisible ? "visible" : "hidden"}`}>
              <hr className="hr-expand" />

              {/* Input for naming the favorites list */}
              <div className="namelist">
                <input type="text" placeholder="NAME YOUR TOP" />
              </div>

              {/* Large cards grid */}
              <div className="content-wrapper">
                <ExpandedCardsView
                  cards={cards}
                  onDelete={handleDelete}
                  setIsValidate={setIsValidate}
                  isValidate={isValidate}
                />
              </div>
            </div>
          ) : (
            // COMPACT VIEW: Shows small cards at bottom
            <>
              <hr className="fav-hr" />
              <CompactCardsView
                toggleExpand={toggleExpand}
                cards={cards}
                onDelete={handleDelete}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorite;
