import React, {
  useRef,
  useMemo,
  Dispatch,
  useState,
  useEffect,
  useCallback,
  SetStateAction,
} from "react";
import { CommonButton } from "@/lib/components/buttons";
import { useSocket } from "@/lib/providers/SocketProvider";
import { ImageWithFallback } from "@/lib/components/image";
import { User, SessionUser } from "@/lib/types/user/user.types";
import { Message } from "@/lib/types/conversation/message.types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { avatar as defaultAvatar, dots } from "@/lib/components/image/icons";
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
  setMessages: Dispatch<SetStateAction<Message[]>>;
  setReplayToMessage: (message: Message | null) => void;
  setUpdatedMessage: (message: Message | null) => void;
}

const AllMessages = ({
  messages,
  otherUser,
  setMessages,
  loggedInUser,
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
        messagesToShow.map((message, index, array) => {
          const isSentByLoggedInUser = message.senderId === loggedInUser?.id;
          const isFirstInGroup =
            index === 0 || array[index - 1].senderId !== message.senderId;
          const avatarSrc = isSentByLoggedInUser
            ? loggedInUser?.profilePicture?.url
            : otherUser?.profilePicture?.url;

          return (
            <div
              key={message.id}
              className={`flex items-end gap-2 ${
                isSentByLoggedInUser ? "justify-end" : "justify-start"
              }`}
            >
              {!isSentByLoggedInUser && (
                <div className="w-[32px] h-[32px]">
                  {isFirstInGroup && (
                    <div className="relative w-full h-full rounded-full overflow-hidden border border-gray-300">
                      <ImageWithFallback
                        src={avatarSrc}
                        fallBackImage={defaultAvatar}
                        alt="user avatar"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="max-w-[50%]">
                {message.isDeleted ? (
                  <div className="cursor-not-allowed bg-gray px-4 py-2 rounded-full border border-primaryBorder italic text-sm">
                    Message deleted
                  </div>
                ) : (
                  <div
                    className={`${
                      isSentByLoggedInUser
                        ? "flex flex-row-reverse"
                        : "flex flex-row"
                    } items-center gap-2`}
                  >
                    <div
                      className={`w-fit flex flex-col gap-2 items-start px-3 pt-3 pb-2 rounded-lg text-sm ${
                        isSentByLoggedInUser
                          ? "bg-primary text-white rounded-br-none"
                          : "bg-light text-black rounded-bl-none"
                      }`}
                    >
                      {message.repliedToMessage?.message?.originalText && (
                        <div className="flex flex-col gap-1 p-2 bg-black/20 rounded-[5px]">
                          <p className="text-[13px] font-medium">
                            {message.repliedToMessage.senderId ===
                            loggedInUser?.id
                              ? "You"
                              : `${otherUser?.firstName} ${otherUser?.lastName}`}
                          </p>
                          <p className="text-[12px] font-normal">
                            {message.repliedToMessage.message.originalText}
                          </p>
                        </div>
                      )}

                      <p className="text-[14px] font-normal">
                        {message.message?.originalText || ""}
                      </p>
                    </div>
                    <div className="relative">
                      <ImageWithFallback
                        src={dots}
                        width={12}
                        height={5}
                        alt="dots"
                        className="cursor-pointer rotate-90"
                        onClick={() =>
                          setOpenMenuMessageId((prev) =>
                            prev === message.id ? null : message.id
                          )
                        }
                      />
                      {openMenuMessageId === message.id && (
                        <div
                          data-menu
                          className={`${
                            !isSentByLoggedInUser
                              ? "left-[-30px]"
                              : "right-[-30px]"
                          } w-[150px] absolute top-6 bg-white shadow-lg border border-light p-2 rounded-[5px] z-10`}
                        >
                          <div
                            className={`${
                              !isSentByLoggedInUser ? "left-8" : "right-8"
                            } absolute shadow-lg w-3 h-3 bg-white border-t border-l border-light rotate-45 top-[-7px] z-0`}
                          />
                          <div className="w-full flex flex-col items-start text-[14px]">
                            <CommonButton
                              label="Replay"
                              className="w-full text-left hover:bg-light px-[14px] py-[10px] rounded-[5px]"
                              onClick={() => {
                                setUpdatedMessage(null);
                                setReplayToMessage(message);
                                setOpenMenuMessageId(null);
                              }}
                            />
                            {!isSentByLoggedInUser && (
                              <CommonButton
                                label="Report"
                                className="w-full text-left hover:bg-light px-[14px] py-[10px] rounded-[5px]"
                                onClick={() => setOpenMenuMessageId(null)}
                              />
                            )}
                            {isSentByLoggedInUser && (
                              <>
                                {isSentByLoggedInUser &&
                                  Date.now() -
                                    new Date(message.createdAt).getTime() <
                                    5 * 60 * 1000 && (
                                    <CommonButton
                                      label="Edit"
                                      className="w-full text-left hover:bg-light px-[14px] py-[10px] rounded-[5px]"
                                      onClick={() => {
                                        setReplayToMessage(null);
                                        setUpdatedMessage(message);
                                        setOpenMenuMessageId(null);
                                      }}
                                    />
                                  )}

                                <CommonButton
                                  label="Delete"
                                  className="w-full text-left hover:bg-light px-[14px] py-[10px] rounded-[5px]"
                                  onClick={() =>
                                    handleDeleteMessage(message.id)
                                  }
                                />
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {isSentByLoggedInUser && (
                <div className="w-[32px] h-[32px]">
                  {isFirstInGroup && (
                    <div className="relative w-full h-full rounded-full overflow-hidden border border-gray-300">
                      <ImageWithFallback
                        src={avatarSrc}
                        fallBackImage={defaultAvatar}
                        alt="user avatar"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })
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
