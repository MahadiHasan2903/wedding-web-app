"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Media } from "@/lib/types/common/common.types";
import { ImageWithFallback } from "@/lib/components/image";
import { MdDelete } from "react-icons/md";
import { RiCollapseDiagonalLine } from "react-icons/ri";
import { AlertModal } from "@/lib/components/modal";
import { deleteMessageAttachmentAction } from "@/lib/action/chat/message.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface PropsType {
  open: boolean;
  attachment: Media;
  isSentByLoggedInUser: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setDeletedAttachments?: Dispatch<SetStateAction<string[]>>;
}

const AttachmentPreview = ({
  open,
  setOpen,
  attachment,
  isSentByLoggedInUser,
  setDeletedAttachments,
}: PropsType) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);

  // Function to handle the deletion of a attachment
  const handleDeleteAttachment = async () => {
    if (!attachment || !setDeletedAttachments || !isSentByLoggedInUser) {
      return;
    }

    setLoading(true);
    const deleteAttachmentResponse = await deleteMessageAttachmentAction(
      attachment.id
    );

    toast(deleteAttachmentResponse.message, {
      type: deleteAttachmentResponse.status ? "success" : "error",
    });

    if (deleteAttachmentResponse.status) {
      setDeletedAttachments((prev) => [...prev, attachment.id]);
      setOpenAlertModal(false);
      setOpen(false);
      router.refresh();
    }
    setLoading(false);
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
          loading={loading}
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
