"use client";
import React, { useState, useEffect, useRef } from "react";
import "@/styles/favorite.css";
import { TbLayoutBottombarExpand, TbTrash } from "react-icons/tb";
import { MovieResult } from "./Slider";
import Image from "next/image";
import { useFavorites } from "@/context/FavoriteContext";

interface BigCardsProps {
  cards: MovieResult[];
  onDelete: (id: number) => void;
}
const BigCards: React.FC<BigCardsProps> = ({ cards, onDelete }) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setSelectedCard(index === selectedCard ? null : index);
  };

  const handleDotClick = (index: number) => {
    setSelectedCard(index);
  };

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    onDelete(id);
    if (selectedCard !== null && cards[selectedCard]?.id === id) {
      setSelectedCard(null);
    }
  };

  return (
    <div className="list-wrapper-big">
      <div className="validate-container">
        <div className="dots">
          {cards.filter(Boolean).map((_, index) => (
            <div
              key={index}
              className={`dot ${selectedCard === index ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
            ></div>
          ))}
        </div>

        <div>
          <button className="validate-button">Validate</button>
        </div>
      </div>

      <div className="list-big">
        {cards.map((card, index) => {
          if (!card) return (
            <div key={index} className="liked-big empty">
              <div className="empty-placeholder">+</div>
            </div>
          );
          
          return (
            <div
              key={index}
              className={`liked-big ${
                selectedCard === index ? "expanded" : ""
              }`}
              onClick={() => handleCardClick(index)}
            >
              <div className="card-inner-big">
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
                <div className="card-back-big">
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
                  <button 
                    className="delete-button"
                    onClick={(e) => handleDelete(e, card.id)}
                  >
                    <TbTrash size={24} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface OneProps {
  toggleExpand: () => void;
  cards: MovieResult[];
  onDelete: (id: number) => void;
}

const One: React.FC<OneProps> = ({ toggleExpand, cards, onDelete }) => {
  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <div className="list-wrapper">
      <div className="list-fav">
        {cards.map((card, index) => (
          card && (
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
                <button 
                  className="delete-button-small"
                  onClick={(e) => handleDelete(e, card.id)}
                >
                  <TbTrash size={16} />
                </button>
              </div>
            </div>
          )
        ))}
      </div>
      <TbLayoutBottombarExpand className="expand" onClick={toggleExpand} />
    </div>
  );
};

interface FavoriteProps {
  cards: (MovieResult | null)[];
}
const Favorite: React.FC<FavoriteProps> = ({ cards }) => {
  const { removeMovie } = useFavorites();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const favoriteRef = useRef<HTMLDivElement>(null);

  const nonNullCards = cards.filter(Boolean).length;
  
  const toggleExpand = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      setTimeout(() => setIsVisible(true), 100);
    } else {
      setIsVisible(false);
      setTimeout(() => setIsExpanded(false), 400);
    }
  };

  const handleDelete = (id: number) => {
    removeMovie(id);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (favoriteRef.current && !favoriteRef.current.contains(event.target as Node)) {
        setIsVisible(false);
        setTimeout(() => setIsExpanded(false), 400);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fav" ref={favoriteRef}>
      <div className="text">YOU HAVE {nonNullCards} CHOICES</div>
      <div className={`favorite ${isExpanded ? "expanded" : ""}`}>
        <div className="col">
          {isExpanded ? (
            <div className={`empty-state ${isVisible ? "visible" : "hidden"}`}>
              <hr className="hr-expand" />
              <div className="namelist">
                <input type="text" placeholder="NAME YOUR TOP" />
              </div>
              <div className="content-wrapper">
                <BigCards cards={cards} onDelete={handleDelete} />
              </div>
            </div>
          ) : (
            <>
              <hr className="fav-hr" />
              <One 
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