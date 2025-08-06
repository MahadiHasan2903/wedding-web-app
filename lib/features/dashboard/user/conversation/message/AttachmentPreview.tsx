"use client";

import React from "react";
import { Media } from "@/lib/types/common/common.types";
import { ImageWithFallback } from "@/lib/components/image";

interface PropsType {
  open: boolean;
  attachment: Media;
  onClose: () => void;
}

const AttachmentPreview = ({ open, attachment, onClose }: PropsType) => {
  if (!open) return null;

  return (
    <div
      className="fixed left-0 top-0 z-[99] flex h-full w-full items-center justify-center bg-black/60 px-4 py-5"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[800px] rounded-[10px] bg-white p-[16px] sm:p-[32px] flex flex-col items-center justify-center gap-[16px] md:gap-[24px]"
        onClick={(e) => e.stopPropagation()}
      >
        {attachment.mimetype.startsWith("video") ? (
          <div className="relative w-full max-w-[700px] h-[250px] sm:h-[400px] overflow-hidden">
            <video
              src={attachment.url}
              controls
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="relative w-full max-w-[700px] h-[250px] sm:h-[400px] overflow-hidden">
            <ImageWithFallback
              fill
              src={attachment.url}
              alt={attachment.originalName}
              className="object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AttachmentPreview;
