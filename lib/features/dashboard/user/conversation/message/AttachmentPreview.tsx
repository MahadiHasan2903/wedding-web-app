"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { ImDownload } from "react-icons/im";
import { AlertModal } from "@/lib/components/modal";
import { Media } from "@/lib/types/common/common.types";
import { RiCollapseDiagonalLine } from "react-icons/ri";
import { ImageWithFallback } from "@/lib/components/image";
import { useSocket } from "@/lib/providers/SocketProvider";

interface PropsType {
  open: boolean;
  attachment: Media;
  messageId: string;
  isSentByLoggedInUser: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AttachmentPreview = ({
  open,
  setOpen,
  messageId,
  attachment,
  isSentByLoggedInUser,
}: PropsType) => {
  const { socket, isConnected } = useSocket();
  const [openAlertModal, setOpenAlertModal] = useState(false);

  // Function to handle the deletion of a attachment
  const handleDeleteAttachment = () => {
    if (!isConnected) {
      return;
    }
    socket?.emit("deleteAttachment", {
      attachmentId: attachment.id,
      messageId: messageId,
    });
    setOpenAlertModal(false);
    setOpen(false);
  };

  // Function to handle the download of the attachment
  const handleDownload = async () => {
    try {
      const response = await fetch(attachment.url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = attachment.originalName || "attachment";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      toast.error("Failed to download attachment");
      console.error("Download error:", error);
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 z-[99] flex h-full w-full items-center justify-center bg-black/60 px-4 py-5">
      <div
        className=" w-full max-w-[750px] rounded-[10px] bg-white p-[16px] sm:p-[24px] flex flex-col items-center justify-center gap-[16px] md:gap-[24px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex items-center justify-end gap-3 right-3 top-3">
          {isSentByLoggedInUser && (
            <MdDelete
              size={20}
              className="text-red cursor-pointer"
              onClick={() => setOpenAlertModal(true)}
            />
          )}

          <ImDownload
            size={20}
            className="text-secondary cursor-pointer"
            onClick={handleDownload}
          />

          <RiCollapseDiagonalLine
            size={20}
            className="text-primary cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>
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
      {openAlertModal && (
        <AlertModal
          open={openAlertModal}
          setOpen={setOpenAlertModal}
          handleConfirm={handleDeleteAttachment}
          title="Remove Attachment"
          description="Are you sure you want to permanently delete this attachment"
        />
      )}
    </div>
  );
};

export default AttachmentPreview;
