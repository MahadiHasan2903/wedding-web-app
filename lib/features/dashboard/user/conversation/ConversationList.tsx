"use client";

import React, {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useState,
} from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { avatar } from "@/lib/components/image/icons";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import { formatRelativeTimeShort } from "@/lib/utils/date/dateUtils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Conversation } from "@/lib/types/conversation/conversation.types";
import { useSocket } from "@/lib/providers/SocketProvider";

interface PropsType {
  allMyConversationData: {
    allConversations: Conversation[];
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
  conversationId?: string;
}

const ConversationList = ({
  allMyConversationData,
  conversationId,
}: PropsType) => {
  const { socket } = useSocket();
  const { data: session } = useSession();
  const userId = session?.user?.data?.id;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<Record<string, boolean>>({});

  const { currentPage, itemsPerPage, totalItems } =
    allMyConversationData.paginationInfo;

  // Memoize searchParams for stable dependencies
  const memoizedSearchParams = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  );

  // Memoized function to build URL with pageSize param
  const getUrlWithSearchParams = useCallback(
    (pageSize: number) => {
      const params = new URLSearchParams(memoizedSearchParams.toString());
      params.set("page", currentPage.toString());
      params.set("pageSize", pageSize.toString());
      return `${pathname}?${params.toString()}`;
    },
    [memoizedSearchParams, currentPage, pathname]
  );

  // Check which user is online
  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleUserStatusChanged = ({
      userId,
      isOnline,
    }: {
      userId: string;
      isOnline: boolean;
    }) => {
      setOnlineUsers((prev) => ({ ...prev, [userId]: isOnline }));
    };

    socket.on("userStatusChanged", handleUserStatusChanged);

    return () => {
      socket.off("userStatusChanged", handleUserStatusChanged);
    };
  }, [socket]);

  // Sync URL params if missing or out of sync, avoiding redundant router.replace calls
  useEffect(() => {
    const page = searchParams.get("page");
    const pageSize = searchParams.get("pageSize");

    if (
      page !== currentPage.toString() ||
      pageSize !== itemsPerPage.toString()
    ) {
      router.replace(getUrlWithSearchParams(itemsPerPage));
    }
  }, [searchParams, currentPage, itemsPerPage, getUrlWithSearchParams, router]);

  // Intersection Observer for infinite scrolling
  useEffect(() => {
    if (!sentinelRef.current || !scrollContainerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const urlParams = new URLSearchParams(window.location.search);
            const currentPageSize = Number(
              urlParams.get("pageSize") || itemsPerPage
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

  // Memoize conversations to show based on pageSize
  const pageSize = Number(searchParams.get("pageSize") || itemsPerPage);
  const conversationsToShow = useMemo(
    () => allMyConversationData.allConversations.slice(0, pageSize),
    [allMyConversationData.allConversations, pageSize]
  );

  return (
    <div
      ref={scrollContainerRef}
      className="w-full h-full overflow-y-auto max-w-full md:max-w-[300px] rounded-0 lg:rounded-[10px] bg-white py-[16px]"
    >
      <div className="w-full px-[18px]">
        <CommonButton
          label="Inbox"
          className="w-full bg-primary text-white font-semibold px-[14px] py-[10px] text-[14px] rounded-[5px] mb-4 "
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        {allMyConversationData.allConversations.length === 0 ? (
          <p className="text-sm text-center">No conversations found</p>
        ) : (
          conversationsToShow.map((conversation) => {
            const isCurrentUserSender = conversation.senderId === userId;
            const otherUser = isCurrentUserSender
              ? conversation.receiver
              : conversation.sender;

            const isOtherUserOnline = onlineUsers[otherUser?.id ?? ""] ?? false;

            return (
              <Link
                href={`/conversations/${conversation.id}`}
                key={conversation.id}
                className={`w-full flex items-center gap-3 p-2 transition cursor-pointer hover:bg-light px-[18px] ${
                  conversation.id === conversationId ? "bg-light" : ""
                }`}
              >
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className="w-[45px] h-[45px] relative rounded-full overflow-hidden border border-black">
                    <ImageWithFallback
                      src={otherUser?.profilePicture?.url}
                      fallBackImage={avatar}
                      alt="user"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {isOtherUserOnline && (
                    <div className="absolute w-12 h-12 rounded-full z-50 bg-transparent border-[2px] border-[#1BEA1B]" />
                  )}
                </div>

                <div className="w-full flex flex-col items-start gap-1 overflow-hidden">
                  <p className="text-[14px] font-medium text-primary">
                    {otherUser?.firstName ?? "Unknown User"}
                  </p>
                  {conversation.lastMessageId && conversation.lastMessage && (
                    <div className="w-full flex items-center justify-between">
                      <p className="text-[12px] font-normal truncate">
                        {conversation.senderId === userId && <span>You: </span>}
                        {conversation.lastMessage}
                      </p>
                      <p className="text-[12px] font-normal">
                        {formatRelativeTimeShort(conversation.updatedAt)}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            );
          })
        )}

        {/* Sentinel element to observe for infinite scroll */}
        <div ref={sentinelRef} className="w-full h-[1px]" />
      </div>
    </div>
  );
};

export default ConversationList;
