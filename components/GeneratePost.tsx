"use client";
import React from "react";
import { useFavorites } from "@/context/FavoriteContext";
import "@/styles/generate-post.css";
import Image from "next/image";
import { AiOutlineDownload } from "react-icons/ai";

const Page = () => {
  const { cards } = useFavorites();
  const [selectedPost, setSelectedPost] = React.useState<number>(2);
  const [typePost, setTypePost] = React.useState<string>("story");

  return (
    <div className={`generate-post-page bg-${selectedPost}`}>
      <div className="choises-container">
        <button
          onClick={() => setTypePost("story")}
          className={
            selectedPost === 0
              ? "button-bg-0"
              : selectedPost === 1
              ? "button-bg-1"
              : "button-bg-2"
          }
        >
          Story
        </button>
        <button
          onClick={() => setTypePost("post")}
          className={
            selectedPost === 0
              ? "button-bg-0"
              : selectedPost === 1
              ? "button-bg-1"
              : "button-bg-2"
          }
        >
          Post
        </button>
        <button
          onClick={() => setTypePost("carousel")}
          className={
            selectedPost === 0
              ? "button-bg-0"
              : selectedPost === 1
              ? "button-bg-1"
              : "button-bg-2"
          }
        >
          Carousel
        </button>
      </div>
      {typePost === "story" && (
        <div className="posts-container">
          <div
            className={`post-container-left ${
              selectedPost === 1 ? "selected" : ""
            }`}
            onClick={() => setSelectedPost(1)}
          >
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

          <div
            className={`post-container-middle ${
              selectedPost === 0 ? "selected" : ""
            }`}
            onClick={() => setSelectedPost(0)}
          >
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
          <div
            className={`post-container-right ${
              selectedPost === 2 ? "selected" : ""
            }`}
            onClick={() => setSelectedPost(2)}
          >
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
      )}

      {typePost == "post" && (
        <div className="post-type-container">
          {/* LEFT */}
          <div
            className={`post-type-container-left ${
              selectedPost === 1 ? "selected" : ""
            }`}
            onClick={() => setSelectedPost(1)}
          >
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
                    width={50}
                    height={70}
                  />
                </div>
              ))}
            </div>

            <div className="short-line">
              {cards.slice(3, 7).map((card, index) => (
                <div key={card?.id} className="post">
                  <div className="number-left">{index + 1 + 3}</div>
                  <Image
                    src={
                      card?.poster_path
                        ? `https://image.tmdb.org/t/p/w500${card.poster_path}`
                        : "/placeholder.png"
                    }
                    alt={card?.title || card?.name || "No Title"}
                    width={40}
                    height={60}
                  />
                </div>
              ))}
            </div>

            <div className="long-line">
              {cards.slice(7, 10).map((card, index) => (
                <div key={card?.id} className="post">
                  <span className="number-left">{index + 1 + 5}</span>
                  <Image
                    src={
                      card?.poster_path
                        ? `https://image.tmdb.org/t/p/w500${card.poster_path}`
                        : "/placeholder.png"
                    }
                    alt={card?.title || card?.name || "No Title"}
                    width={40}
                    height={60}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* MIDDLE */}
          <div
            className={`post-type-container-middle ${
              selectedPost === 0 ? "selected" : ""
            }`}
            onClick={() => setSelectedPost(0)}
          >
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
                    width={50}
                    height={70}
                  />
                </div>
              ))}
            </div>

            <div className="short-line">
              {cards.slice(3, 7).map((card, index) => (
                <div key={card?.id} className="post">
                  <div className="number-middle">{index + 1 + 3}</div>
                  <Image
                    src={
                      card?.poster_path
                        ? `https://image.tmdb.org/t/p/w500${card.poster_path}`
                        : "/placeholder.png"
                    }
                    alt={card?.title || card?.name || "No Title"}
                    width={40}
                    height={60}
                  />
                </div>
              ))}
            </div>

            <div className="long-line">
              {cards.slice(7, 10).map((card, index) => (
                <div key={card?.id} className="post">
                  <span className="number-middle">{index + 1 + 5}</span>
                  <Image
                    src={
                      card?.poster_path
                        ? `https://image.tmdb.org/t/p/w500${card.poster_path}`
                        : "/placeholder.png"
                    }
                    alt={card?.title || card?.name || "No Title"}
                    width={40}
                    height={60}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div
            className={`post-type-container-right ${
              selectedPost === 2 ? "selected" : ""
            }`}
            onClick={() => setSelectedPost(2)}
          >
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
                    width={50}
                    height={70}
                  />
                </div>
              ))}
            </div>

            <div className="short-line">
              {cards.slice(3, 7).map((card, index) => (
                <div key={card?.id} className="post">
                  <div className="number-right">{index + 1 + 3}</div>
                  <Image
                    src={
                      card?.poster_path
                        ? `https://image.tmdb.org/t/p/w500${card.poster_path}`
                        : "/placeholder.png"
                    }
                    alt={card?.title || card?.name || "No Title"}
                    width={40}
                    height={60}
                  />
                </div>
              ))}
            </div>

            <div className="long-line">
              {cards.slice(7, 10).map((card, index) => (
                <div key={card?.id} className="post">
                  <span className="number-right">{index + 1 + 5}</span>
                  <Image
                    src={
                      card?.poster_path
                        ? `https://image.tmdb.org/t/p/w500${card.poster_path}`
                        : "/placeholder.png"
                    }
                    alt={card?.title || card?.name || "No Title"}
                    width={40}
                    height={60}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {typePost == "carousel" && <div>hello carousel</div>}

      <div className="save-button-container">
        <button
          className={`save-button ${
            selectedPost === 0
              ? "button-bg-0"
              : selectedPost === 1
              ? "button-bg-1"
              : "button-bg-2"
          }`}
        >
          Download
          <AiOutlineDownload size={28} style={{ marginBottom: "7px" }} />
        </button>
      </div>
    </div>
  );
};

export default Page;
