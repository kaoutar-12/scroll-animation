import React from 'react';
import "@/styles/favorite.css";

type Props = {}

const Favorite = (props: Props) => {
  const likedItems = Array(6).fill(null); // Create an array with 6 items

  return (
    <div className="fav">
      {likedItems.map((_, index) => (
        <div key={index} className="liked">
          <div className="card-front" id="front-${index}">Front {index + 1}</div>
          <div className="card-back">Back {index + 1}</div>
        </div>
      ))}
    </div>
  );
}

export default Favorite;
