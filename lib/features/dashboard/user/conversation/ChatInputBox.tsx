"use client";

import React, { useRef, useState, useEffect } from "react";
import { IoMdSend } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { ImageWithFallback } from "@/lib/components/image";
import { SessionUser, User } from "@/lib/types/user/user.types";
import { Message } from "@/lib/types/chat/message.types";
import { emoji, voice, attachment } from "@/lib/components/image/icons";

interface PropsType {
  otherUser?: User;
  loggedInUser?: SessionUser;
  updatedMessage: Message | null;
  replayToMessage: Message | null;
  setUpdatedMessage: (message: Message | null) => void;
  setReplayToMessage: (message: Message | null) => void;
  handleEditMessage: (messageId: string, text: string) => void;
  handleSendMessage: (message: string, replayToMessageId?: string) => void;
}

const ChatInputBox = ({
  otherUser,
  loggedInUser,
  updatedMessage,
  replayToMessage,
  handleSendMessage,
  handleEditMessage,
  setUpdatedMessage,
  setReplayToMessage,
}: PropsType) => {
  // If editing, start with the original message text, else empty
  const [message, setMessage] = useState(
    updatedMessage?.message.originalText || ""
  );
  const inputRef = useRef<HTMLInputElement>(null);

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
    if ((replayToMessage || updatedMessage) && inputRef.current) {
      inputRef.current.focus();
    }
  }, [replayToMessage, updatedMessage]);

  // Handle send or edit message logic
  const handleSendOrEdit = () => {
    if (!message.trim()) {
      return;
    }

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
        (replayToMessage || updatedMessage) && "bg-gray border-t border-light"
      } w-full flex flex-col items-start gap-3 p-2 py-[16px]`}
    >
      {replayToMessage && (
        <div className="w-full flex flex-col gap-2 px-[18px] bg-black/10 py-3 rounded-[5px]">
          <div className="w-full flex items-center justify-between">
            <div className="text-[12px] lg:text-[14px] text-primary font-semibold">
              Replying to{" "}
              {replayToMessage.senderId === loggedInUser?.id
                ? `yourself`
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
              Edit Message
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

      <div className="w-full flex items-center justify-between gap-[18px]  px-[18px]">
        <div className="flex items-center gap-1">
          <ImageWithFallback
            src={attachment}
            width={30}
            height={30}
            alt="attachment"
            className="cursor-pointer"
          />
          {/* <ImageWithFallback
            src={voice}
            width={30}
            height={30}
            alt="voice"
            className="cursor-pointer"
          /> */}
        </div>
        <div className="w-full relative">
          <input
            ref={inputRef}
            name="message"
            type="text"
            value={message}
            placeholder="Type here..."
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
    </div>
  );
};

export default ChatInputBox;
