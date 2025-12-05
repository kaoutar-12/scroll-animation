import { motion } from "motion/react";
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
  const [buttonClass, setButtonClass] = React.useState<string>("");
  const getButtonClass = async () => {
    const baseClass = "save-button";
    if (selectedPost === 0) {
      await new Promise((resolve) => setTimeout(resolve, 450));
      return `${baseClass} save-button-bg-0`;
    }
    if (selectedPost === 1) {
      await new Promise((resolve) => setTimeout(resolve, 450));
      return `${baseClass} save-button-bg-1`;
    }
    await new Promise((resolve) => setTimeout(resolve, 450));
    return `${baseClass} save-button-bg-2`;
  };

  React.useEffect(() => {
    const fetchButtonClass = async () => {
      const cls = await getButtonClass();
      setButtonClass(cls);
    };
    fetchButtonClass();
  }, [selectedPost]);

  return (
    <div className="save-button-container">
      <motion.button
        className={buttonClass}
        onClick={onDownload}
        disabled={isDownloading}
        initial="initial"
        whileHover="hover"
        transition={{ duration: 0.35 }}
        style={{ position: "relative", overflow: "hidden" }} // needed
      >
        {/* OLD TEXT */}
        <motion.span
          variants={{
            initial: { y: 0, opacity: 1 },
            hover: { y: -30, opacity: 0 },
          }}
          style={{
            position: "absolute",
            left: "50px",
            top: "24px",
            transform: "translate(-50%, -50%)",
            whiteSpace: "nowrap",
            fontWeight: 600,
          }}
        >
          {isDownloading ? "Downloading..." : "Download"}
        </motion.span>

        {/* NEW TEXT */}
        <motion.span
          variants={{
            initial: { y: 30, opacity: 0 },
            hover: { y: 0, opacity: 1 },
          }}
          style={{
            position: "absolute",
            left: "50px",
            top: "24px",
            transform: "translate(-50%, -50%)",
            whiteSpace: "nowrap",
            fontWeight: 600,
          }}
        >
          Download
        </motion.span>

        {/* ICON */}
        <AiOutlineDownload
          size={28}
          style={{ marginBottom: "7px",
            position: "absolute",
            right: "25px",
            top: "30px",
            transform: "translateY(-50%)"
           }}
          className="download-icon"
        />
      </motion.button>
    </div>
  );
};

export default DownloadButton;
