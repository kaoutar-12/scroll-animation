'use client';
import React, { useState } from "react";
import "@/styles/favorite.css";
import { TbLayoutBottombarExpand } from "react-icons/tb";

type Props = {
  isExpanded: boolean;
  toggleExpand: () => void;
};

const One: React.FC<Props> = ({ toggleExpand }) => {
  const likedItems = Array(7).fill(null); 

  return (
    <div className="list-wrapper">
      <div className="list">
        {likedItems.map((_, index) => (
          <div key={index} className="liked">
            <div className="card-front" id={`front-${index}`}></div>
            <div className="card-back"></div>
          </div>
        ))}
      </div>
      <TbLayoutBottombarExpand className="expand" onClick={toggleExpand} />
    </div>
  );
};

const Favorite = () => {
  const likedItemsCount = 7;
  const [isExpanded, setIsExpanded] = useState(false); 

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev); 
  };

  return (
    <div className="fav">
      <div className="text">YOU HAVE {likedItemsCount} CHOICES</div>
      <div className={`favorite ${isExpanded ? "expanded" : ""}`}>
        <div className="col">
          {isExpanded ? (
            // Render an empty div if expanded
            <div className="empty-state"></div>
          ) : (
            <>
              <hr />
              <One toggleExpand={toggleExpand} /> {/* Pass props to One */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorite;
