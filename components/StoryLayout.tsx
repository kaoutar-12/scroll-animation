import React from "react";
import MovieCard from "./MovieCard";

interface Card {
  id: number;
  poster_path?: string;
  title?: string;
  name?: string;
}

interface StoryLayoutProps {
  cards: Card[];
  selectedPost: number;
  onSelectPost: (index: number) => void;
  refs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const StoryLayout: React.FC<StoryLayoutProps> = ({
  cards,
  selectedPost,
  onSelectPost,
  refs,
}) => {
    console.log("Rendering StoryLayout with cards:", cards);
  const renderPostContainer = (
    containerClass: string,
    numberClass: string,
    index: number,
    refIndex: number
  ) => (
    <div
      ref={(el) => (refs.current[refIndex] = el)}
      className={`${containerClass} ${selectedPost === index ? "selected" : ""}`}
      onClick={() => onSelectPost(index)}
    >
      <div className="long-line">
        {cards.slice(0, 3).map((card, idx) => (
          <MovieCard
            key={card?.id}
            card={card}
            index={idx}
            numberClass={numberClass}
            width={60}
            height={90}
          />
        ))}
      </div>

      <div className="short-line">
        {cards.slice(3, 5).map((card, idx) => (
          <MovieCard
            key={card?.id}
            card={card}
            index={idx + 3}
            numberClass={numberClass}
            width={60}
            height={90}
          />
        ))}
      </div>

      <div className="long-line">
        {cards.slice(5, 8).map((card, idx) => (
          <MovieCard
            key={card?.id}
            card={card}
            index={idx + 5}
            numberClass={numberClass}
            width={60}
            height={90}
          />
        ))}
      </div>

      <div className="short-line">
        {cards.slice(8, 10).map((card, idx) => (
          <MovieCard
            key={card?.id}
            card={card}
            index={idx + 8}
            numberClass={numberClass}
            width={60}
            height={90}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="posts-container">
      {renderPostContainer("post-container-left", "number-left", 1, 0)}
      {renderPostContainer("post-container-middle", "number-middle", 0, 1)}
      {renderPostContainer("post-container-right", "number-right", 2, 2)}
    </div>
  );
};

export default StoryLayout;