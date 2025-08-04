"use client";

import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { ImageWithFallback } from "@/lib/components/image";
import { emoji, voice, attachment } from "@/lib/components/image/icons";

interface PropsType {
  handleSendMessage: (message: string) => void;
}

const ChatInputBox = ({ handleSendMessage }: PropsType) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) {
      return;
    }
    handleSendMessage(message);
    setMessage("");
  };

  return (
    <div className="w-full px-[18px] flex items-center justify-between gap-[18px]">
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
  );
};

export default ChatInputBox;
