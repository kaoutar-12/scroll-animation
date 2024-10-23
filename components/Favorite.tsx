import React from "react";
import "@/styles/favorite.css";
import { TbLayoutBottombarExpand } from "react-icons/tb";

type Props = {};

const One = () => {
  const likedItems = Array(7).fill(null); // Create an array with 6 items
  return (
    <div className="list-wrapper">
      <div className="list">
        {likedItems.map((_, index) => (
          <div key={index} className="liked">
            <div className="card-front" id="front-${index}"></div>
            <div className="card-back"></div>
          </div>
        ))}
      </div>
      <TbLayoutBottombarExpand className="expand" />
    </div>
  );
};

const Favorite = (props: Props) => {
  const likedItemsCount = 7;
  return (
    <div className="fav">
      <div className="text">YOU HAVE {likedItemsCount} CHOICES</div>
      <div className="favorite">
        <div className="col">
          <hr />
          <One />
        </div>
      </div>
    </div>
  );
};

export default Favorite;
