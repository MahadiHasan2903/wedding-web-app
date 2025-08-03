import React, { useRef, useEffect, useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import { ImageWithFallback } from "@/lib/components/image";
import { Message } from "@/lib/types/conversation/message.types";
import { avatar as defaultAvatar } from "@/lib/components/image/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Conversation } from "@/lib/types/conversation/conversation.types";

interface PropsType {
  conversationDetails: Conversation;
  allMessageData: {
    allMessages: Message[];
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
  };
}

const AllMessages = ({ conversationDetails, allMessageData }: PropsType) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const { currentPage, itemsPerPage, totalItems } =
    allMessageData.paginationInfo;
  const loggedInUserId = session?.user?.data?.id;
  const loggedInUserAvatar = session?.user?.data?.profilePicture?.url;

  const isCurrentUserSender = conversationDetails.senderId === loggedInUserId;
  const otherUser = useMemo(
    () =>
      isCurrentUserSender
        ? conversationDetails.receiver
        : conversationDetails.sender,
    [isCurrentUserSender, conversationDetails]
  );
  const otherUserAvatar = otherUser?.profilePicture?.url;

  // Memoize URL search params object for stable reference
  const memoizedSearchParams = useMemo(() => {
    return new URLSearchParams(searchParams.toString());
  }, [searchParams]);

  // Generate URL with given messagePageSize
  const getUrlWithSearchParams = useCallback(
    (messagePageSize: number) => {
      const params = new URLSearchParams(memoizedSearchParams.toString());
      params.set("messagePageNumber", currentPage.toString());
      params.set("messagePageSize", messagePageSize.toString());
      return `${pathname}?${params.toString()}`;
    },
    [memoizedSearchParams, currentPage, pathname]
  );

  // Sync URL params on mount only if missing or different (prevent redundant updates)
  useEffect(() => {
    const messagePageNumber = searchParams.get("messagePageNumber");
    const messagePageSize = searchParams.get("messagePageSize");

    if (
      messagePageNumber !== currentPage.toString() ||
      messagePageSize !== itemsPerPage.toString()
    ) {
      router.replace(getUrlWithSearchParams(itemsPerPage));
    }
    // Only want to run on mount or when these values change
  }, [searchParams, currentPage, itemsPerPage, getUrlWithSearchParams, router]);

  // Intersection observer callback to load more messages
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

    return () => {
      observer.disconnect();
    };
  }, [itemsPerPage, router, totalItems, getUrlWithSearchParams]);

  // Show messages based on messagePageSize from URL or default itemsPerPage
  const messagePageSize = Number(
    searchParams.get("messagePageSize") || itemsPerPage
  );
  const messagesToShow = useMemo(
    () => allMessageData.allMessages.slice(0, messagePageSize).reverse(),
    [allMessageData.allMessages, messagePageSize]
  );

  return (
    <div
      ref={scrollContainerRef}
      className="w-full h-full px-[18px] py-4 overflow-y-auto flex flex-col gap-6 md:gap-3"
    >
      {/* Sentinel element for infinite scroll */}
      <div ref={sentinelRef} className="w-full h-[1px]" />
      {messagesToShow.map((message, index, array) => {
        const isSentByLoggedInUser = message.senderId === loggedInUserId;
        const avatarSrc = isSentByLoggedInUser
          ? loggedInUserAvatar
          : otherUserAvatar;

        // Only show avatar if this is the first message in a group
        const isFirstInGroup =
          index === 0 || array[index - 1].senderId !== message.senderId;

        return (
          <div
            key={message.id}
            className={`flex items-end gap-2 ${
              isSentByLoggedInUser ? "justify-end" : "justify-start"
            }`}
          >
            {/* Avatar (only for first message in group) */}
            {!isSentByLoggedInUser && isFirstInGroup && (
              <div className="w-[32px] h-[32px] relative rounded-full overflow-hidden border border-gray-300">
                <ImageWithFallback
                  src={avatarSrc}
                  fallBackImage={defaultAvatar}
                  alt="user avatar"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Placeholder for alignment if avatar not shown */}
            {!isSentByLoggedInUser && !isFirstInGroup && (
              <div className="w-[32px] h-[32px]" />
            )}

            {/* Message bubble */}
            <div
              className={`max-w-[70%] md:max-w-[50%] px-4 py-2 rounded-lg text-sm ${
                isSentByLoggedInUser
                  ? "bg-primary text-white rounded-br-none"
                  : "bg-light text-black rounded-bl-none"
              }`}
            >
              {message.message?.originalText || "[No message text]"}
            </div>

            {/* Avatar for logged-in user (only once per group) */}
            {isSentByLoggedInUser && isFirstInGroup && (
              <div className="w-[32px] h-[32px] relative rounded-full overflow-hidden border border-gray-300">
                <ImageWithFallback
                  src={avatarSrc}
                  fallBackImage={defaultAvatar}
                  alt="user avatar"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Placeholder for alignment if avatar not shown */}
            {isSentByLoggedInUser && !isFirstInGroup && (
              <div className="w-[32px] h-[32px]" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AllMessages;
