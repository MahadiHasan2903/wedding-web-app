"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AlertModal } from "@/lib/components/modal";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { avatar, dots } from "@/lib/components/image/icons";
import { Conversation } from "@/lib/types/chat/conversation.types";
import { updateBlockUnblockStatusAction } from "@/lib/action/user/userInteraction.action";

// Translations
const translations: Record<string, Record<string, string>> = {
  en: {
    activeNow: "Active Now",
    blockProfile: "Block Profile",
    blockUser: "Block User",
    block: "Block",
    blockUserConfirmation: "Are you sure you want to block this user",
    userAvatarAlt: "user avatar",
    menuIconAlt: "menu icon",
  },
  fr: {
    activeNow: "Actif maintenant",
    blockProfile: "Bloquer le profil",
    blockUser: "Bloquer l'utilisateur",
    block: "Bloquer",
    blockUserConfirmation: "Êtes-vous sûr de vouloir bloquer cet utilisateur",
    userAvatarAlt: "avatar de l'utilisateur",
    menuIconAlt: "icône du menu",
  },
  es: {
    activeNow: "Activo ahora",
    blockProfile: "Bloquear perfil",
    blockUser: "Bloquear usuario",
    block: "Bloquear",
    blockUserConfirmation:
      "¿Estás seguro de que deseas bloquear a este usuario?",
    userAvatarAlt: "avatar del usuario",
    menuIconAlt: "icono del menú",
  },
};

interface PropsType {
  isOtherUserOnline: boolean;
  isBlockedByOtherUser: boolean;
  conversationDetails: Conversation;
}

const ConversationHeader = ({
  isOtherUserOnline,
  conversationDetails,
  isBlockedByOtherUser,
}: PropsType) => {
  const { language } = useLanguageStore();
  const t = translations[language];

  const router = useRouter();
  const { data: session } = useSession();
  const loggedInUserId = session?.user?.data?.id;
  const isCurrentUserSender = conversationDetails.senderId === loggedInUserId;
  const otherUser = isCurrentUserSender
    ? conversationDetails.receiver
    : conversationDetails.sender;

  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Function to handle blocking the user
  const handleBlockUser = async () => {
    if (!otherUser || !loggedInUserId) {
      return;
    }

    setLoading(true);

    const requestPayload = {
      blockedUserId: otherUser.id,
      status: "block",
    };

    const blockUserResponse = await updateBlockUnblockStatusAction(
      requestPayload
    );

    toast(blockUserResponse.message, {
      type: blockUserResponse.status ? "success" : "error",
    });

    if (blockUserResponse.status) {
      setMenuOpen(false);
      setOpenModal(false);
      router.push("/conversations");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="w-full border-b-[3px] border-light pt-[16px]">
      <div className="w-full relative flex items-center justify-between pb-[14px] px-[18px]">
        <div className="w-1/2 gap-2 flex items-center">
          <div className="relative w-[35px] h-[35px] flex items-center justify-center">
            <div className="relative w-[35px] h-[35px] rounded-full overflow-hidden border border-black">
              <ImageWithFallback
                src={otherUser?.profilePicture?.url}
                fallBackImage={avatar}
                alt={t.userAvatarAlt}
                fill
                className="object-cover"
              />
            </div>
            {isOtherUserOnline && (
              <div className="absolute w-[35px] h-[35px] rounded-full z-50 bg-transparent border-[2px] border-[#1BEA1B]" />
            )}
          </div>

          <div className="flex flex-col items-start">
            <p className="text-[14px] font-medium text-primary">
              {otherUser?.firstName} {otherUser?.lastName}
            </p>
            {isOtherUserOnline && (
              <p className="text-[10px] font-normal">{t.activeNow}</p>
            )}
          </div>
        </div>

        {/* Dots Icon */}
        <div ref={menuRef} className="w-1/2 flex justify-end relative">
          <ImageWithFallback
            src={dots}
            width={18}
            height={5}
            alt={t.menuIconAlt}
            className={`${
              isBlockedByOtherUser ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => {
              if (!isBlockedByOtherUser) {
                setMenuOpen((prev) => !prev);
              }
            }}
          />

          {/* Dropdown menu */}
          {menuOpen && (
            <div className="absolute top-6 right-[-8px] bg-white shadow-lg border border-light py-[10px] px-[25px] rounded-[5px]">
              <div className="absolute shadow-lg w-2 h-2 bg-white border-t border-l border-light rotate-45 top-[-5px] right-3 z-0" />
              <CommonButton
                onClick={() => setOpenModal(true)}
                label={t.blockProfile}
                className="text-[14px]"
              />
            </div>
          )}
        </div>
      </div>
      {openModal && (
        <AlertModal
          open={openModal}
          setOpen={setOpenModal}
          handleConfirm={handleBlockUser}
          title={t.blockUser}
          loading={loading}
          confirmButtonText={t.block}
          description={t.blockUserConfirmation}
        />
      )}
    </div>
  );
};

export default ConversationHeader;
