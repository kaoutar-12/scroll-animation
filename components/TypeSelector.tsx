import React from "react";

interface TypeSelectorProps {
  selectedPost: number;
  onTypeChange: (type: string) => void;
  typePost: string;
}

const TypeSelector: React.FC<TypeSelectorProps> = ({
  selectedPost,
  onTypeChange,
  typePost,
}) => {
  const [buttonColor, setButtonColor] = React.useState<string[]>([]);
  const [buttonClass, setButtonClass] = React.useState<string>("");
  const getButtonClass = async () => {
    if (selectedPost === 0) {
      await new Promise((resolve) => setTimeout(resolve, 700));
      return "type-button-bg-0";
    }
    if (selectedPost === 1) {
      await new Promise((resolve) => setTimeout(resolve, 700));
      return "type-button-bg-1";
    }
    await new Promise((resolve) => setTimeout(resolve, 700));
    return "type-button-bg-2";
  };

  const getButtonColor = async () => {
    if (selectedPost === 0) {
      await new Promise((resolve) => setTimeout(resolve, 700));
      return ["#870014", "#ffeb7d", "#870014"];
    }
    if (selectedPost === 1) {
      await new Promise((resolve) => setTimeout(resolve, 700));
      return ["#ffeb7d", "#870014", "#ffeb7d"];
    }
    await new Promise((resolve) => setTimeout(resolve, 700));
    return ["#9cd1f5", "#5a003c", "#9cd1f5"];
  };

  React.useEffect(() => {
    const fetchButtonColor = async () => {
      const colors = await getButtonColor();
      setButtonColor(colors);
    };
    const fetchButtonClass = async () => {
      const cls = await getButtonClass();
      setButtonClass(cls);
    };
    fetchButtonClass();
    fetchButtonColor();
  }, [selectedPost]);
  return (
    <div className="choises-container">
      <button
        onClick={() => onTypeChange("story")}
        className={buttonClass}
        style={
          typePost === "story"
            ? {
                backgroundColor: buttonColor[0],
                color: buttonColor[1],
                borderColor: buttonColor[2],
              }
            : {}
        }
      >
        Story
      </button>
      <button
        onClick={() => onTypeChange("post")}
        className={buttonClass}
        style={
          typePost === "post"
            ? {
                backgroundColor: buttonColor[0],
                color: buttonColor[1],
                borderColor: buttonColor[2],
              }
            : {}
        }
      >
        Post
      </button>
    </div>
  );
};

export default TypeSelector;
