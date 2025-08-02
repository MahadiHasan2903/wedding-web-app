import React from "react";
import api from "@/lib/api";
import dynamic from "next/dynamic";
import { getServerSessionData } from "@/lib/config/auth";
import { getQueryParam } from "@/lib/utils/helpers";

const ConversationList = dynamic(
  () => import("@/lib/features/dashboard/user/conversation/ConversationList"),
  { ssr: false }
);

const ConversationDetails = dynamic(
  () =>
    import("@/lib/features/dashboard/user/conversation/ConversationDetails"),
  { ssr: false }
);

interface PropsType {
  searchParams: { [key: string]: string | string[] | undefined };
}

const MessagePage = async ({ searchParams }: PropsType) => {
  const { accessToken } = await getServerSessionData();

  // Get the current page number as string, then parse to number with fallback
  const page = Number(getQueryParam(searchParams, "page", 1));
  const pageSize = Number(getQueryParam(searchParams, "pageSize", 20));

  const allMyConversationData = await api.conversation.getMyAllConversation(
    accessToken,
    page,
    pageSize
  );

  return (
    <div className="w-full h-full flex lg:gap-[25px] items-start py-0 lg:pt-[45px]">
      <ConversationList allMyConversationData={allMyConversationData} />
      <div className="w-full h-full flex items-center justify-center bg-white rounded-[10px]">
        No conversation found
      </div>
    </div>
  );
};

export default MessagePage;
