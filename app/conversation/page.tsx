"use client";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export default function Home() {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:8080", {
      query: {
        userId: "3c71e634-1123-47a9-9748-30b1f38d0024",
      },
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      console.log("🟢 Connected to WebSocket server");
    });

    socketRef.current.on("newMessage", (data) => {
      console.log("📩 New message received:", data);
    });

    socketRef.current.on("messageEdited", (data) => {
      console.log("✏️ Message edited:", data);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socketRef.current?.emit("sendMessage", {
      senderId: "3c71e634-1123-47a9-9748-30b1f38d0024",
      receiverId: "1b1d12f3-36bb-4ac4-9f06-d3291ba3955c",
      conversationId: "3a1e41da-5ad8-4880-9859-0ed968c876db",
      message: "Hello from frontend!",
      replyToMessageId: "4ed1ebed-07bf-412b-8a77-58b24cd941d2", //optional
    });
  };

  const editMessage = () => {
    socketRef.current?.emit("editMessage", {
      messageId: "9d3499ff-151b-46e7-bae8-9dceceb46619",
      updatedMessage: "This message has been edited!",
      senderId: "3c71e634-1123-47a9-9748-30b1f38d0024",
      receiverId: "1b1d12f3-36bb-4ac4-9f06-d3291ba3955c",
    });
  };

  return (
    <div className="m-6 flex items-center gap-4">
      <button
        onClick={sendMessage}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg"
      >
        Send Message
      </button>
      <button
        onClick={editMessage}
        className="px-6 py-2 bg-yellow-500 text-text rounded-lg"
      >
        Edit Message
      </button>
    </div>
  );
}
