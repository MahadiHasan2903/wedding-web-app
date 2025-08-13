"use client";

import { useEffect, useState } from "react";

export const useVideoThumbnail = (videoUrl: string) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    const generateThumbnail = async () => {
      const video = document.createElement("video");
      video.crossOrigin = "anonymous";
      video.src = videoUrl;
      video.muted = true;
      video.playsInline = true;

      const canvas = document.createElement("canvas");

      const handleLoadedMetadata = () => {
        video.currentTime = 1;
      };

      const handleSeeked = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL("image/png");
          setThumbnail(dataUrl);
        }
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.addEventListener("seeked", handleSeeked);

      // Start loading the video
      video.load();

      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.removeEventListener("seeked", handleSeeked);
      };
    };

    generateThumbnail();
  }, [videoUrl]);

  return thumbnail;
};
