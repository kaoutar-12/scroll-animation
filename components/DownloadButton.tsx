import React from "react";
import { AiOutlineDownload } from "react-icons/ai";

interface DownloadButtonProps {
  selectedPost: number;
  onDownload?: () => void;
  isDownloading?: boolean;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  selectedPost,
  onDownload,
  isDownloading = false,
}) => {
  const getButtonClass = () => {
    const baseClass = "save-button";
    if (selectedPost === 0) return `${baseClass} save-button-bg-0`;
    if (selectedPost === 1) return `${baseClass} save-button-bg-1`;
    return `${baseClass} save-button-bg-2`;
  };

  return (
    <div className="save-button-container">
      <button 
        className={getButtonClass()} 
        onClick={onDownload}
        disabled={isDownloading}
      >
        {isDownloading ? "Downloading..." : "Download"}
        <AiOutlineDownload size={28} style={{ marginBottom: "7px" }} />
      </button>
    </div>
  );
};

export default DownloadButton;