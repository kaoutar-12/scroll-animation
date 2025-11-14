"use client";
import React from "react";
import "@/styles/generate-post.css";
import { useFavorites } from "@/context/FavoriteContext";

const Page = () => {
  const { cards } = useFavorites();
  console.log(cards);
  return (
    <div className="generate-post-page">
      <div className="posts-container">
        <div className="post-container">
          <div className="parent">
            <div className="div1"></div> <div className="div2">2</div>
            <div className="div3">3</div> <div className="div4">4</div>
            <div className="div5">5</div> <div className="div6">6</div>
            <div className="div7">7</div> <div className="div8">8</div>
            <div className="div9">9</div> <div className="div10">10</div>
          </div>
        </div>
        {/* <div className="post-container"></div> <div className="post-container"></div> */}
      </div>
    </div>
  );
};
export default Page;
