"use client";
import React, { use, useEffect, useRef } from "react";
import { useFavorites } from "@/context/FavoriteContext";
import "@/styles/generate-post.css";
import { toPng } from "html-to-image";
import TypeSelector from "@/components/TypeSelector";
import StoryLayout from "@/components/StoryLayout";
import PostLayout from "@/components/PostLayout";
import DownloadButton from "@/components/DownloadButton";
import AnimatedBackground from "./AnimatedBackground";
import "@/styles/AnimatedBackground.css";

const Page = () => {
  const { cards } = useFavorites();
  const [selectedPost, setSelectedPost] = React.useState<number>(0);
  const [typePost, setTypePost] = React.useState<string>("story");
  const [isDownloading, setIsDownloading] = React.useState<boolean>(false);
  const [_, setRefresh] = React.useState<boolean>(false);

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

  useEffect(() => {
    return () => {
      document.body.style.backgroundColor = "#5a003c";
    };
  }, []);

  const handleClick = (color: string) => {
    const body = document.body;

    // Remove old sections
    const oldSections = document.querySelectorAll(".bg-section");
    oldSections.forEach((sec) => sec.remove());

    // Create 3 sections with stagger animation
    for (let i = 1; i <= 3; i++) {
      const section = document.createElement("div");
      section.className = `bg-section bg-section-${i}`;
      section.style.backgroundColor = color;
      body.appendChild(section);

      setTimeout(() => {
        section.classList.add("active");
      }, 10 + i * 50);
    }

    // After animation, set body bg and remove sections
    setTimeout(() => {
      body.style.backgroundColor = color;
      //   const newSections = document.querySelectorAll(".bg-section");
      //   newSections.forEach((sec) => sec.remove());
      //   setRefresh((x) => !x);
    }, 1100);
  };

  const handleSelectPost = (index: number) => {
    setSelectedPost(index);
    // Trigger background animation based on selected post
    const colors = ["#ffeb7d", "#870014", "#5a003c"];
    handleClick(colors[index] || "#ffeb7d");
  }

  return (
    <div className={`generate-post-page `}>
      {/* <AnimatedBackground /> */}
      <TypeSelector selectedPost={selectedPost} onTypeChange={setTypePost} />

      {typePost === "story" && (
        <StoryLayout
          cards={cards}
          selectedPost={selectedPost}
          onSelectPost={handleSelectPost}
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
