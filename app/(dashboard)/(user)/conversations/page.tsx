import React from "react";
import api from "@/lib/api";
import dynamic from "next/dynamic";
import { getQueryParam } from "@/lib/utils/helpers";
import { getServerSessionData } from "@/lib/config/auth";
import { ImageWithFallback } from "@/lib/components/image";
import conversationPlaceholder from "@/public/images/common/conversation-placeholder.svg";

const ConversationList = dynamic(
  () => import("@/lib/features/dashboard/user/conversation/ConversationList"),
  { ssr: false }
);
const ConversationPlaceholder = dynamic(
  () =>
    import(
      "@/lib/features/dashboard/user/conversation/ConversationPlaceholder"
    ),
  { ssr: false }
);

interface PropsType {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ConversationListPage = async ({ searchParams }: PropsType) => {
  const { accessToken } = await getServerSessionData();

  // Get the current page number as string, then parse to number with fallback
  const page = Number(getQueryParam(searchParams, "page", 1));
  const pageSize = Number(getQueryParam(searchParams, "pageSize", 50));

  const allMyConversationData = await api.conversation.getMyAllConversation(
    accessToken,
    page,
    pageSize
  );

  return (
    <div className="w-full h-full flex md:gap-[25px] items-start py-0 lg:pt-[45px]">
      <div className="w-full md:max-w-[300px] h-full">
        <ConversationList allMyConversationData={allMyConversationData} />
      </div>
      <div className="w-full h-full hidden md:flex flex-col items-center justify-center bg-white rounded-0 lg:rounded-[10px]">
        <div className="relative overflow-hidden w-[220px] h-[220px]">
          <ImageWithFallback
            src={conversationPlaceholder}
            fill
            alt="placeholder"
            className="rounded-full object-contain"
          />
        </div>
        <ConversationPlaceholder />
      </div>
    </div>
  );
};

export default ConversationListPage;
