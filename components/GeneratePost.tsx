"use client";
import React, { useRef } from "react";
import { useFavorites } from "@/context/FavoriteContext";
import "@/styles/generate-post.css";
import { toPng } from "html-to-image";
import TypeSelector from "@/components/TypeSelector";
import StoryLayout from "@/components/StoryLayout";
import PostLayout from "@/components/PostLayout";
import DownloadButton from "@/components/DownloadButton";

const Page = () => {
  const { cards } = useFavorites();
  const [selectedPost, setSelectedPost] = React.useState<number>(2);
  const [typePost, setTypePost] = React.useState<string>("story");
  const [isDownloading, setIsDownloading] = React.useState<boolean>(false);

  // Refs for the downloadable containers
  const storyRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const postRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      // Get the appropriate ref based on current type and selected post
      let targetElement: HTMLDivElement | null = null;

      if (typePost === "story") {
        // Map selectedPost index to ref array (1->0, 0->1, 2->2)
        const refIndex = selectedPost === 1 ? 0 : selectedPost === 0 ? 1 : 2;
        targetElement = storyRefs.current[refIndex];
      } else if (typePost === "post") {
        const refIndex = selectedPost === 1 ? 0 : selectedPost === 0 ? 1 : 2;
        targetElement = postRefs.current[refIndex];
      }

      if (!targetElement) {
        console.error("No element found to download");
        return;
      }

      // Convert to PNG
      const dataUrl = await toPng(targetElement, {
        quality: 1,
        pixelRatio: 2, // Higher quality
        cacheBust: true,
      });

      // Create download link
      const link = document.createElement("a");
      link.download = `${typePost}-${selectedPost}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error downloading image:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className={`generate-post-page bg-${selectedPost}`}>
      <TypeSelector selectedPost={selectedPost} onTypeChange={setTypePost} />

      {typePost === "story" && (
        <StoryLayout
          cards={cards}
          selectedPost={selectedPost}
          onSelectPost={setSelectedPost}
          refs={storyRefs}
        />
      )}

      {typePost === "post" && (
        <PostLayout
          cards={cards}
          selectedPost={selectedPost}
          onSelectPost={setSelectedPost}
          refs={postRefs}
        />
      )}

    

      <DownloadButton
        selectedPost={selectedPost}
        onDownload={handleDownload}
        isDownloading={isDownloading}
      />
    </div>
  );
};

export default Page;
