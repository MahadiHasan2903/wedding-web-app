"use client";

import React, {
  useRef,
  useState,
  Dispatch,
  useEffect,
  SetStateAction,
} from "react";
import { IoMdSend } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { FaPlayCircle } from "react-icons/fa";
import { Message } from "@/lib/types/chat/message.types";
import { ImageWithFallback } from "@/lib/components/image";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { SessionUser, User } from "@/lib/types/user/user.types";
import { emoji, attachment } from "@/lib/components/image/icons";

// Translations
const translations: Record<string, Record<string, string>> = {
  en: {
    replyingTo: "Replying to",
    yourself: "yourself",
    editMessage: "Edit Message",
    uploadingAttachments: "Uploading Attachments.....",
    uploadAttachments: "Upload Attachments",
    blockedMessage: "You are blocked by the user. You cannot send messages.",
    typeHere: "Type here...",
  },
  fr: {
    replyingTo: "Répondre à",
    yourself: "vous-même",
    editMessage: "Modifier le message",
    uploadingAttachments: "Téléchargement des pièces jointes.....",
    uploadAttachments: "Télécharger les pièces jointes",
    blockedMessage:
      "Vous êtes bloqué par l'utilisateur. Vous ne pouvez pas envoyer de messages.",
    typeHere: "Tapez ici...",
  },
  es: {
    replyingTo: "Respondiendo a",
    yourself: "usted mismo",
    editMessage: "Editar mensaje",
    uploadingAttachments: "Subiendo archivos.....",
    uploadAttachments: "Subir archivos",
    blockedMessage:
      "Has sido bloqueado por el usuario. No puedes enviar mensajes.",
    typeHere: "Escribe aquí...",
  },
};

interface PropsType {
  loading: boolean;
  otherUser?: User;
  attachments: File[];
  loggedInUser?: SessionUser;
  isBlockedByOtherUser: boolean;
  updatedMessage: Message | null;
  replayToMessage: Message | null;
  setAttachments: Dispatch<SetStateAction<File[]>>;
  setUpdatedMessage: (message: Message | null) => void;
  setReplayToMessage: (message: Message | null) => void;
  handleEditMessage: (messageId: string, text: string) => void;
  handleSendMessage: (message: string, replayToMessageId?: string) => void;
}

const ChatInputBox = ({
  loading,
  otherUser,
  attachments,
  loggedInUser,
  setAttachments,
  updatedMessage,
  replayToMessage,
  handleSendMessage,
  handleEditMessage,
  setUpdatedMessage,
  setReplayToMessage,
  isBlockedByOtherUser,
}: PropsType) => {
  const { language } = useLanguageStore();
  const t = translations[language];

  // If editing, start with the original message text, else empty
  const [message, setMessage] = useState(
    updatedMessage?.message.originalText || ""
  );
  const messageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    const selectedFiles = Array.from(files);
    const allowedTypes = ["image/", "video/"];

    const filteredFiles = selectedFiles.filter((file) =>
      allowedTypes.some((type) => file.type.startsWith(type))
    );
    setUpdatedMessage(null);
    setReplayToMessage(null);
    setAttachments(filteredFiles);
  };

  // Focus input when editing or replying and update message state accordingly
  useEffect(() => {
    if (updatedMessage) {
      setMessage(updatedMessage.message.originalText);
    } else {
      setMessage("");
    }
  }, [updatedMessage]);

  // Focus input when replying to a message or editing an existing message
  useEffect(() => {
    if ((replayToMessage || updatedMessage) && messageInputRef.current) {
      messageInputRef.current.focus();
    }
  }, [replayToMessage, updatedMessage]);

  // Handle send or edit message logic
  const handleSendOrEdit = () => {
    if (updatedMessage) {
      // Edit existing message
      handleEditMessage(updatedMessage.id, message);
      setUpdatedMessage(null);
    } else {
      // Send new message, optionally replying to a message
      handleSendMessage(message, replayToMessage?.id);
      setReplayToMessage(null);
    }

    setMessage("");
  };

  return (
    <div
      className={`${
        (replayToMessage || updatedMessage || attachments.length > 0) &&
        "bg-gray border-t border-light"
      } w-full flex flex-col items-start gap-3 p-2 py-[16px]`}
    >
      {replayToMessage && (
        <div className="w-full flex flex-col gap-2 px-[18px] bg-black/10 py-3 rounded-[5px]">
          <div className="w-full flex items-center justify-between">
            <div className="text-[12px] lg:text-[14px] text-primary font-semibold">
              {t.replyingTo}{" "}
              {replayToMessage.senderId === loggedInUser?.id
                ? t.yourself
                : `${otherUser?.firstName} ${otherUser?.lastName}`}
            </div>

            <RxCross1
              size={20}
              className="text-red cursor-pointer"
              onClick={() => setReplayToMessage(null)}
            />
          </div>

          <div className="text-[12px] lg:text-[14px] text-[#292D32]">
            {replayToMessage.message.originalText}
          </div>
        </div>
      )}

      {updatedMessage && (
        <div className="w-full flex flex-col gap-2 px-[18px] bg-black/10 py-3 rounded-[5px]">
          <div className="w-full flex items-center justify-between">
            <div className="text-[12px] lg:text-[14px] text-primary font-semibold">
              {t.editMessage}
            </div>

            <RxCross1
              size={20}
              className="text-red cursor-pointer"
              onClick={() => setUpdatedMessage(null)}
            />
          </div>

          <div className="text-[12px] lg:text-[14px] text-[#292D32]">
            {/* Show live editing text here instead of original */}
            {message}
          </div>
        </div>
      )}
      <div className="w-full flex flex-wrap gap-2">
        {attachments.length > 0 && (
          <div className="w-full flex flex-col gap-2 px-[18px] bg-black/10 py-3 rounded-[5px]">
            <div className="w-full flex items-center justify-between">
              <div className={`text-sm font-semibold ${loading && "italic"}`}>
                {loading ? t.uploadingAttachments : t.uploadAttachments}
              </div>
              {!loading && (
                <RxCross1
                  size={20}
                  className="text-red cursor-pointer"
                  onClick={() => setAttachments([])}
                />
              )}
            </div>

            <div className="w-full flex flex-wrap gap-2">
              {attachments.map((file, idx) => {
                const previewUrl = URL.createObjectURL(file);
                const isVideo = file.type.startsWith("video");

                return (
                  <div
                    key={idx}
                    className="relative w-[50px] h-[50px] rounded-sm overflow-hidden border border-primary"
                  >
                    {isVideo ? (
                      <div className="w-full h-full relative">
                        <video
                          src={previewUrl}
                          className="object-cover w-full h-full"
                          muted
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <FaPlayCircle className="text-white text-2xl" />
                        </div>
                      </div>
                    ) : (
                      <ImageWithFallback
                        src={previewUrl}
                        alt={file.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {isBlockedByOtherUser ? (
        <div className="w-full flex items-center justify-center text-red font-bold">
          {t.blockedMessage}
        </div>
      ) : (
        <div className="w-full flex items-center justify-between gap-[18px]  px-[18px]">
          <div className="flex items-center gap-1">
            <ImageWithFallback
              src={attachment}
              width={30}
              height={30}
              alt="attachment"
              className="cursor-pointer"
              onClick={handleAttachmentClick}
            />

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              hidden
              onChange={handleFileChange}
            />
          </div>
          <div className="w-full relative">
            <input
              ref={messageInputRef}
              name="message"
              type="text"
              value={message}
              placeholder={t.typeHere}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendOrEdit();
                }
              }}
              className="w-full text-[12px] lg:text-[14px] p-[14px] bg-light rounded-full outline-none pr-12"
            />

            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xl">
              <ImageWithFallback
                src={emoji}
                width={30}
                height={30}
                alt="emoji"
                className="cursor-pointer"
              />
            </div>
          </div>
          <IoMdSend
            size={25}
            className="text-primary cursor-pointer"
            onClick={handleSendOrEdit}
          />
        </div>
      )}
    </div>
  );
};

export default ChatInputBox;
