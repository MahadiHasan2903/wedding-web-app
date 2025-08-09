import React, {
  useRef,
  useMemo,
  Dispatch,
  useState,
  useEffect,
  useCallback,
  SetStateAction,
} from "react";
import MessageItem from "./MessageItem";
import { Message } from "@/lib/types/chat/message.types";
import { useSocket } from "@/lib/providers/SocketProvider";
import { ImageWithFallback } from "@/lib/components/image";
import { User, SessionUser } from "@/lib/types/user/user.types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import conversationPlaceholder from "@/public/images/common/conversation-placeholder.svg";

interface PropsType {
  messages: Message[];
  paginationInfo: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  };
  otherUser?: User;
  loggedInUser?: SessionUser;
  conversationId: string;
  setMessages: Dispatch<SetStateAction<Message[]>>;
  setAttachments: Dispatch<SetStateAction<File[]>>;
  setReplayToMessage: (message: Message | null) => void;
  setUpdatedMessage: (message: Message | null) => void;
}

const AllMessages = ({
  messages,
  otherUser,
  setMessages,
  loggedInUser,
  setAttachments,
  conversationId,
  paginationInfo,
  setUpdatedMessage,
  setReplayToMessage,
}: PropsType) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { socket, isConnected } = useSocket();
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [openMenuMessageId, setOpenMenuMessageId] = useState<string | null>(
    null
  );
  const [translatedLanguages, setTranslatedLanguages] = useState<{
    [messageId: string]: "en" | "es" | "fr" | null;
  }>({});

  // Get pagination info from props
  const { currentPage, itemsPerPage, totalItems } = paginationInfo;

  // Function to get the URL with updated search parameters
  const getUrlWithSearchParams = useCallback(
    (messagePageSize: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("messagePageNumber", currentPage.toString());
      params.set("messagePageSize", messagePageSize.toString());
      return `${pathname}?${params.toString()}`;
    },
    [searchParams, currentPage, pathname]
  );

  // Handle translation for messages
  const handleTranslation = (messageId: string, lang: "en" | "es" | "fr") => {
    setTranslatedLanguages((prev) => ({
      ...prev,
      [messageId]: lang,
    }));
  };

  // Update the URL with search parameters when currentPage or itemsPerPage changes
  useEffect(() => {
    const messagePageNumber = searchParams.get("messagePageNumber");
    const messagePageSize = searchParams.get("messagePageSize");

    if (
      messagePageNumber !== currentPage.toString() ||
      messagePageSize !== itemsPerPage.toString()
    ) {
      router.replace(getUrlWithSearchParams(itemsPerPage));
    }
  }, [searchParams, currentPage, itemsPerPage, getUrlWithSearchParams, router]);

  // Intersection Observer to load more messages when the sentinel is visible
  useEffect(() => {
    if (!sentinelRef.current || !scrollContainerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const urlParams = new URLSearchParams(window.location.search);
            const currentPageSize = Number(
              urlParams.get("messagePageSize") || itemsPerPage
            );
            const newPageSize = currentPageSize + 20;
            if (newPageSize <= totalItems) {
              router.replace(getUrlWithSearchParams(newPageSize));
            }
          }
        });
      },
      {
        root: scrollContainerRef.current,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [itemsPerPage, router, totalItems, getUrlWithSearchParams]);

  // Get the message page size from search params or use itemsPerPage as default
  const messagePageSize = Number(
    searchParams.get("messagePageSize") || itemsPerPage
  );

  // Sort messages by creation date
  const sortedMessages = useMemo(() => {
    return [...messages].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [messages]);

  // Get the messages to show based on the current page size
  const messagesToShow = useMemo(() => {
    const startIndex = Math.max(sortedMessages.length - messagePageSize, 0);
    return sortedMessages.slice(startIndex);
  }, [sortedMessages, messagePageSize]);

  // Scroll to bottom on initial load
  useEffect(() => {
    if (!scrollContainerRef.current) {
      return;
    }
    const container = scrollContainerRef.current;
    container.scrollTop = container.scrollHeight;
  }, [messagesToShow]);

  // Listen for message deletion toggled events from the socket
  useEffect(() => {
    if (!socket || !isConnected) {
      return;
    }

    const handleMessageDeletionToggled = (updatedMessage: Message) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === updatedMessage.id ? { ...msg, ...updatedMessage } : msg
        )
      );
    };

    socket.on("messageDeletionToggled", handleMessageDeletionToggled);

    return () => {
      socket.off("messageDeletionToggled", handleMessageDeletionToggled);
    };
  }, [socket, setMessages]);

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openMenuMessageId !== null &&
        !(event.target as HTMLElement).closest("[data-menu]")
      ) {
        setOpenMenuMessageId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuMessageId]);

  // Handle message deletion
  const handleDeleteMessage = (messageId: string) => {
    if (!isConnected) {
      return;
    }
    socket?.emit("toggleMessageDeletion", {
      messageId,
      isDeleted: true,
    });

    setOpenMenuMessageId(null);
  };

  return (
    <div
      ref={scrollContainerRef}
      className="w-full h-full px-[18px] py-4 overflow-y-auto flex flex-col gap-6 md:gap-3"
    >
      <div ref={sentinelRef} className="w-full h-[1px]" />
      {messagesToShow.length > 0 ? (
        messagesToShow.map((message, index, array) => (
          <MessageItem
            key={message.id}
            message={message}
            index={index}
            array={array}
            otherUser={otherUser}
            loggedInUser={loggedInUser}
            conversationId={conversationId}
            setAttachments={setAttachments}
            openMenuMessageId={openMenuMessageId}
            handleTranslation={handleTranslation}
            setUpdatedMessage={setUpdatedMessage}
            setReplayToMessage={setReplayToMessage}
            handleDeleteMessage={handleDeleteMessage}
            setOpenMenuMessageId={setOpenMenuMessageId}
            translatedLanguage={translatedLanguages[message.id] || null}
          />
        ))
      ) : (
        <div className="w-full h-full hidden md:flex flex-col items-center justify-center bg-white rounded-0 lg:rounded-[10px]">
          <div className="relative overflow-hidden w-[220px] h-[220px]">
            <ImageWithFallback
              src={conversationPlaceholder}
              fill
              alt="placeholder"
              className="rounded-full object-contain"
            />
          </div>
          <p className="w-full max-w-[240px] text-[14px] font-semibold text-center text-[#292D32]">
            No messages in this conversation
          </p>
        </div>
      )}
    </div>
  );
};

export default AllMessages;
