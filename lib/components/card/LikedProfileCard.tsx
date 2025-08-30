"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { User } from "@/lib/types/user/user.types";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { hasActiveVipMembership } from "@/lib/utils/helpers";
import vipRing2 from "@/public/images/common/vip-ring-2.png";
import { calculateAgeFromDOB } from "@/lib/utils/date/dateUtils";
import { sendMessage, whiteHeart } from "@/lib/components/image/icons";
import userPlaceholder from "@/public/images/common/user-placeholder.png";
import { createConversationAction } from "@/lib/action/chat/conversation.action";

interface LikedProfileCardProps {
  user: User;
}

// translations object
const translations: Record<string, Record<string, string>> = {
  en: {
    liked: "Liked",
    sendMessage: "Send Message",
    processing: "Processing...",
    ageUnknown: "Age Unknown",
    nA: "N/A",
  },
  fr: {
    liked: "Aimé",
    sendMessage: "Envoyer un message",
    processing: "Traitement...",
    ageUnknown: "Âge inconnu",
    nA: "N/A",
  },
  es: {
    liked: "Me gusta",
    sendMessage: "Enviar mensaje",
    processing: "Procesando...",
    ageUnknown: "Edad desconocida",
    nA: "N/A",
  },
};

const LikedProfileCard = ({ user }: LikedProfileCardProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { language } = useLanguageStore();
  const t = translations[language];
  const [loading, setLoading] = useState(false);

  // Determine if the user is a VIP or not
  const isVipUser = hasActiveVipMembership(user);

  // Function to redirect user based on token
  const handleRedirection = () => {
    router.push(`/liked-profiles/${user.id}`);
  };

  //Function to create a conversation
  const handleSendMessage = async (receiverId: string) => {
    if (!session?.user?.data?.id || !receiverId) {
      toast.error("You must be logged in to send a message.");
      return;
    }

    const senderId = session.user.data.id;
    setLoading(true);

    const payload = {
      senderId,
      receiverId,
    };

    const createConversationResponse = await createConversationAction(payload);

    toast(createConversationResponse.message, {
      type: createConversationResponse.status ? "success" : "error",
    });

    if (createConversationResponse.status && createConversationResponse.data) {
      router.push(`/conversations/${createConversationResponse.data.id}`);
    }

    setLoading(false);
  };

  return (
    <div
      onClick={handleRedirection}
      className={`w-[160px] sm:w-[180px] lg:w-[240px] cursor-pointer h-auto sm:h-[250px] lg:h-[350px] flex flex-col items-center rounded-[10px] py-[8px] lg:py-[25px] ${
        isVipUser ? "bg-vip-gradient" : "bg-white"
      }`}
    >
      <div className="w-[90px] lg:w-[150px] h-[90px] lg:h-[160px] relative flex items-center justify-center">
        <div className="w-[80px] lg:w-[145px] h-[80px] lg:h-[145px] relative overflow-hidden">
          <ImageWithFallback
            fill
            alt="user"
            src={user.profilePicture?.url}
            fallBackImage={userPlaceholder}
            className="rounded-full object-cover"
          />
        </div>

        {isVipUser && (
          <div className="absolute w-[90px] lg:w-[150px] h-[90px] lg:h-[160px] top-[2px] lg:top-[-3px] z-10">
            <ImageWithFallback
              src={vipRing2}
              fill
              alt="VIP Ring"
              className="rounded-full object-contain"
            />
          </div>
        )}
      </div>

      <div
        className={`${
          isVipUser ? "bg-gold-gradient" : "bg-transparent"
        } w-full flex flex-col py-1 items-center gap-[8px] mb-[8px] lg:mb-[25px]`}
      >
        <h2 className="text-[14px] lg:text-[20px] font-medium">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-[12px] lg:text-[14px] font-medium">
          {user.dateOfBirth
            ? `${calculateAgeFromDOB(user.dateOfBirth)} Years Old`
            : t.ageUnknown}
          , {user.gender ?? t.nA}
        </p>
      </div>

      <div className="w-full flex items-center justify-center gap-2 lg:gap-[15px]">
        <CommonButton
          label={t.liked}
          className={`${
            isVipUser
              ? "btn-gold-gradient border-none"
              : "bg-red border border-primaryBorder text-white"
          } w-fit flex items-center gap-[5px] text-[10px] font-normal p-[8px] lg:p-[10px] rounded-full`}
          labelStyle="hidden lg:block"
          startIcon={
            <ImageWithFallback
              src={whiteHeart}
              width={13}
              height={12}
              alt="red-heart"
            />
          }
        />
        <CommonButton
          label={loading ? t.processing : t.sendMessage}
          disabled={loading}
          onClick={() => handleSendMessage(user.id)}
          className={`${
            isVipUser
              ? "btn-gold-gradient border-none"
              : "bg-transparent border border-primaryBorder text-black"
          } w-fit flex items-center gap-[5px] text-[10px] font-normal p-[8px] lg:p-[10px] rounded-full`}
          startIcon={
            <ImageWithFallback
              src={sendMessage}
              width={13}
              height={12}
              alt="send-message"
            />
          }
        />
      </div>
    </div>
  );
};

export default LikedProfileCard;
