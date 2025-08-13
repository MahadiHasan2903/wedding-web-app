import React from "react";
import api from "@/lib/api";
import dynamic from "next/dynamic";
import { getQueryParam } from "@/lib/utils/helpers";
import { getServerSessionData } from "@/lib/config/auth";

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
  params: {
    conversationId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ConversationDetailsPage = async ({ params, searchParams }: PropsType) => {
  const { accessToken, data } = await getServerSessionData();

  // Get the current page number as string, then parse to number with fallback
  const page = Number(getQueryParam(searchParams, "page", 1));
  const pageSize = Number(getQueryParam(searchParams, "pageSize", 50));

  // Get the current page number as string, then parse to number with fallback
  const messagePageNumber = Number(
    getQueryParam(searchParams, "messagePageNumber", 1)
  );
  const messagePageSize = Number(
    getQueryParam(searchParams, "messagePageSize", 200)
  );

  const allMyConversationData = await api.conversation.getMyAllConversation(
    accessToken,
    page,
    pageSize
  );

  const allMessageData = await api.message.getMessagesByConversationId(
    params.conversationId,
    accessToken,
    messagePageNumber,
    messagePageSize
  );

  const conversationDetails = await api.conversation.getConversationDetails(
    params.conversationId,
    accessToken
  );

  const otherUser =
    conversationDetails.senderId === data.id
      ? conversationDetails.receiver
      : conversationDetails.sender;

  if (!otherUser?.id) {
    throw new Error("Other user not found in conversation");
  }

  const getOtherUserDetails = await api.users.getUserDetails(
    otherUser.id,
    accessToken
  );

  const isBlockedByOtherUser =
    getOtherUserDetails.blockedUsers?.some((user) => user === data.id) ?? false;

  return (
    <div className="w-full h-full flex md:gap-[25px] items-start py-0 lg:pt-[45px]">
      <div className="w-full md:max-w-[300px] h-full hidden md:block">
        <ConversationList
          allMyConversationData={allMyConversationData}
          conversationId={params.conversationId}
        />
      </div>
      <ConversationDetails
        allMessageData={allMessageData}
        conversationDetails={conversationDetails}
        isBlockedByOtherUser={isBlockedByOtherUser}
      />
    </div>
  );
};

export default ConversationDetailsPage;
