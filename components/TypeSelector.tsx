import React from "react";

interface TypeSelectorProps {
  selectedPost: number;
  onTypeChange: (type: string) => void;
}

const TypeSelector: React.FC<TypeSelectorProps> = ({
  selectedPost,
  onTypeChange,
}) => {
  const getButtonClass = () => {
    if (selectedPost === 0) return "button-bg-0";
    if (selectedPost === 1) return "button-bg-1";
    return "button-bg-2";
  };

  const buttonClass = getButtonClass();

  return (
    <div className="choises-container">
      <button onClick={() => onTypeChange("story")} className={buttonClass}>
        Story
      </button>
      <button onClick={() => onTypeChange("post")} className={buttonClass}>
        Post
      </button>
      <button onClick={() => onTypeChange("carousel")} className={buttonClass}>
        Carousel
      </button>
    </div>
  );
};

export default TypeSelector;
