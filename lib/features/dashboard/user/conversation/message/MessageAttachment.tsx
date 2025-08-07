import { Dispatch, SetStateAction, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import AttachmentPreview from "./AttachmentPreview";
import { Media } from "@/lib/types/common/common.types";
import { ImageWithFallback } from "@/lib/components/image";
import { useVideoThumbnail } from "@/lib/hooks/useVideoThumbnail";

interface PropsType {
  isSentByLoggedInUser: boolean;
  attachment: Media;
  messageId: string;
}

const MessageAttachment = ({
  isSentByLoggedInUser,
  attachment,
  messageId,
}: PropsType) => {
  if (!attachment) {
    return;
  }

  const [open, setOpen] = useState(false);
  const isVideo = attachment.mimetype?.startsWith("video") ?? false;
  const thumbnail = useVideoThumbnail(attachment.url);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="relative w-[90px] h-[90px] border border-primary rounded-lg overflow-hidden flex items-center justify-center"
      >
        {isVideo ? (
          thumbnail ? (
            <div className="w-full relative h-full cursor-pointer">
              <ImageWithFallback
                src={thumbnail}
                fill
                alt={`Thumbnail of ${attachment.originalName}`}
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <FaPlayCircle className="text-white text-3xl" />
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <FaPlayCircle className="text-white text-3xl" />
            </div>
          )
        ) : (
          <ImageWithFallback
            src={attachment.url}
            fill
            alt={attachment.originalName}
            className="object-cover cursor-pointer"
          />
        )}
      </div>
      {open && (
        <AttachmentPreview
          open={open}
          setOpen={setOpen}
          attachment={attachment}
          messageId={messageId}
          isSentByLoggedInUser={isSentByLoggedInUser}
        />
      )}
    </>
  );
};

export default MessageAttachment;
