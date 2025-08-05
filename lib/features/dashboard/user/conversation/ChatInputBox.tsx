"use client";

import React, { useRef, useState, useEffect } from "react";
import { IoMdSend } from "react-icons/io";
import { ImageWithFallback } from "@/lib/components/image";
import { emoji, voice, attachment } from "@/lib/components/image/icons";
import { Message } from "@/lib/types/conversation/message.types";
import { SessionUser, User } from "@/lib/types/user/user.types";
import { RxCross1 } from "react-icons/rx";

interface PropsType {
  loggedInUser?: SessionUser;
  otherUser?: User;
  handleSendMessage: (message: string, replayToMessageId?: string) => void;
  replayToMessage: Message | null;
  setReplayToMessage: (message: Message | null) => void;
}

const ChatInputBox = ({
  loggedInUser,
  otherUser,
  replayToMessage,
  setReplayToMessage,
  handleSendMessage,
}: PropsType) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input field when replying to a message
  useEffect(() => {
    if (replayToMessage && inputRef.current) {
      inputRef.current.focus();
    }
  }, [replayToMessage]);

  // Function to handle sending the message
  const handleSend = () => {
    if (!message.trim()) {
      return;
    }

    handleSendMessage(message, replayToMessage?.id);
    setMessage("");
    setReplayToMessage(null);
  };

  return (
    <div className="w-full flex flex-col items-start gap-3 border-t border-light p-2">
      {replayToMessage && (
        <div className="w-full flex flex-col gap-2 px-[18px]">
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

          <div className="text-[12px] lg:text-[14px] text-secondary">
            {replayToMessage.message.originalText}
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
          <ImageWithFallback
            src={voice}
            width={30}
            height={30}
            alt="voice"
            className="cursor-pointer"
          />
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
                handleSend();
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
          onClick={handleSend}
        />
      </div>
    </div>
  );
};

export default ChatInputBox;
