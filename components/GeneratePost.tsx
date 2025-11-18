"use client";
import React from "react";
import { useFavorites } from "@/context/FavoriteContext";
import "@/styles/generate-post.css";
import Image from "next/image";

const Page = () => {
  const { cards } = useFavorites();

  return (
    <div className="generate-post-page">
      <div className="posts-container">
        <div className="post-container-left">
          {/* first line (3 items) */}
          <div className="long-line">
            {cards.slice(0, 3).map((card, index) => (
              <div key={card?.id} className="post">
                <div className="number-left">{index + 1}</div>
                <Image
                  src={
                    card?.poster_path
                      ? `https://image.tmdb.org/t/p/w500${card.poster_path}`
                      : "/placeholder.png"
                  }
                  alt={card?.title || card?.name || "No Title"}
                  width={60}
                  height={90}
                />
              </div>
            ))}
          </div>

          {/* second line (2 items) */}
          <div className="short-line">
            {cards.slice(3, 5).map((card, index) => (
              <div key={card?.id} className="post">
                <div className="number-left">{index + 1 + 3}</div>
                <Image
                  src={
                    card?.poster_path
                      ? `https://image.tmdb.org/t/p/w500${card.poster_path}`
                      : "/placeholder.png"
                  }
                  alt={card?.title || card?.name || "No Title"}
                  width={60}
                  height={90}
                />
              </div>
            ))}
          </div>

          {/* third line (3 items) */}
          <div className="long-line">
            {cards.slice(5, 8).map((card, index) => (
              <div key={card?.id} className="post">
                <span className="number-left">{index + 1 + 5}</span>
                <Image
                  src={
                    card?.poster_path
                      ? `https://image.tmdb.org/t/p/w500${card.poster_path}`
                      : "/placeholder.png"
                  }
                  alt={card?.title || card?.name || "No Title"}
                  width={60}
                  height={90}
                />
              </div>
            ))}
          </div>

          {/* fourth line (2 items) */}
          <div className="short-line">
            {cards.slice(8, 10).map((card, index) => (
              <div key={card?.id} className="post">
                <span className="number-left">{index + 1 + 8}</span>
                <Image
                  src={
                    card?.poster_path
                      ? `https://image.tmdb.org/t/p/w500${card.poster_path}`
                      : "/placeholder.png"
                  }
                  alt={card?.title || card?.name || "No Title"}
                  width={60}
                  height={90}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="post-container-middle">
          {/* first line (3 items) */}
          <div className="long-line">
            {cards.slice(0, 3).map((card, index) => (
              <div key={card?.id} className="post">
                <div className="number-middle">{index + 1}</div>
                <Image
                  src={
                    card?.poster_path
                      ? `https://image.tmdb.org/t/p/w500${card.poster_path}`
                      : "/placeholder.png"
                  }
                  alt={card?.title || card?.name || "No Title"}
                  width={60}
                  height={90}
                />
              </div>
            ))}
          </div>

          {/* second line (2 items) */}
          <div className="short-line">
            {cards.slice(3, 5).map((card, index) => (
              <div key={card?.id} className="post">
                <div className="number-middle">{index + 1 + 3}</div>
                <Image
                  src={
                    card?.poster_path
                      ? `https://image.tmdb.org/t/p/w500${card.poster_path}`
                      : "/placeholder.png"
                  }
                  alt={card?.title || card?.name || "No Title"}
                  width={60}
                  height={90}
                />
              </div>
            ))}
          </div>

          {/* third line (3 items) */}
          <div className="long-line">
            {cards.slice(5, 8).map((card, index) => (
              <div key={card?.id} className="post">
                <span className="number-middle">{index + 1 + 5}</span>
                <Image
                  src={
                    card?.poster_path
                      ? `https://image.tmdb.org/t/p/w500${card.poster_path}`
                      : "/placeholder.png"
                  }
                  alt={card?.title || card?.name || "No Title"}
                  width={60}
                  height={90}
                />
              </div>
            ))}
          </div>

          {/* fourth line (2 items) */}
          <div className="short-line">
            {cards.slice(8, 10).map((card, index) => (
              <div key={card?.id} className="post">
                <span className="number-middle">{index + 1 + 8}</span>
                <Image
                  src={
                    card?.poster_path
                      ? `https://image.tmdb.org/t/p/w500${card.poster_path}`
                      : "/placeholder.png"
                  }
                  alt={card?.title || card?.name || "No Title"}
                  width={60}
                  height={90}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="post-container-right">
          {/* first line (3 items) */}
          <div className="long-line">
            {cards.slice(0, 3).map((card, index) => (
              <div key={card?.id} className="post">
                <div className="number-right">{index + 1}</div>
                <Image
                  src={
                    card?.poster_path
                      ? `https://image.tmdb.org/t/p/w500${card.poster_path}`
                      : "/placeholder.png"
                  }
                  alt={card?.title || card?.name || "No Title"}
                  width={60}
                  height={90}
                />
              </div>
            ))}
          </div>

          {/* second line (2 items) */}
          <div className="short-line">
            {cards.slice(3, 5).map((card, index) => (
              <div key={card?.id} className="post">
                <div className="number-right">{index + 1 + 3}</div>
                <Image
                  src={
                    card?.poster_path
                      ? `https://image.tmdb.org/t/p/w500${card.poster_path}`
                      : "/placeholder.png"
                  }
                  alt={card?.title || card?.name || "No Title"}
                  width={60}
                  height={90}
                />
              </div>
            ))}
          </div>

          {/* third line (3 items) */}
          <div className="long-line">
            {cards.slice(5, 8).map((card, index) => (
              <div key={card?.id} className="post">
                <span className="number-right">{index + 1 + 5}</span>
                <Image
                  src={
                    card?.poster_path
                      ? `https://image.tmdb.org/t/p/w500${card.poster_path}`
                      : "/placeholder.png"
                  }
                  alt={card?.title || card?.name || "No Title"}
                  width={60}
                  height={90}
                />
              </div>
            ))}
          </div>

          {/* fourth line (2 items) */}
          <div className="short-line">
            {cards.slice(8, 10).map((card, index) => (
              <div key={card?.id} className="post">
                <span className="number-right">{index + 1 + 8}</span>
                <Image
                  src={
                    card?.poster_path
                      ? `https://image.tmdb.org/t/p/w500${card.poster_path}`
                      : "/placeholder.png"
                  }
                  alt={card?.title || card?.name || "No Title"}
                  width={60}
                  height={90}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
