import React from "react";
import MovieCard from "./MovieCard";

interface Card {
  id: number;
  poster_path?: string;
  title?: string;
  name?: string;
}

interface PostLayoutProps {
  cards: Card[];
  selectedPost: number;
  onSelectPost: (index: number) => void;
  refs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const PostLayout: React.FC<PostLayoutProps> = ({
  cards,
  selectedPost,
  onSelectPost,
  refs,
}) => {
  const renderPostTypeContainer = (
    containerClass: string,
    numberClass: string,
    index: number,
    refIndex: number
  ) => (
    <div
      ref={(el) => { refs.current[refIndex] = el; }}
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
            width={50}
            height={70}
          />
        ))}
      </div>

      <div className="short-line">
        {cards.slice(3, 7).map((card, idx) => (
          <MovieCard
            key={card?.id}
            card={card}
            index={idx + 3}
            numberClass={numberClass}
            width={40}
            height={60}
          />
        ))}
      </div>

      <div className="long-line">
        {cards.slice(7, 10).map((card, idx) => (
          <MovieCard
            key={card?.id}
            card={card}
            index={idx + 7}
            numberClass={numberClass}
            width={40}
            height={60}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="post-type-container">
      {renderPostTypeContainer("post-type-container-left", "number-left", 1, 0)}
      {renderPostTypeContainer("post-type-container-middle", "number-middle", 0, 1)}
      {renderPostTypeContainer("post-type-container-right", "number-right", 2, 2)}
    </div>
  );
};

export default PostLayout;