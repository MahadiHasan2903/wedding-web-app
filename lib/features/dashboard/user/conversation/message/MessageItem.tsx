"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { RiTranslate } from "react-icons/ri";
import MessageAttachment from "./MessageAttachment";
import ReportMessageForm from "./ReportMessageForm";
import { CommonButton } from "@/lib/components/buttons";
import { Message } from "@/lib/types/chat/message.types";
import { ImageWithFallback } from "@/lib/components/image";
import { avatar, dots } from "@/lib/components/image/icons";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { User, SessionUser } from "@/lib/types/user/user.types";
import { formatRelativeTimeLong } from "@/lib/utils/date/dateUtils";

// Translations
const translations: Record<string, Record<string, string>> = {
  en: {
    messageDeleted: "Message deleted",
    reply: "Reply",
    report: "Report",
    edit: "Edit",
    delete: "Delete",
    translateTo: "Translate to",
    you: "You",
    english: "English",
    spanish: "Spanish",
    french: "French",
  },
  fr: {
    messageDeleted: "Message supprimé",
    reply: "Répondre",
    report: "Signaler",
    edit: "Modifier",
    delete: "Supprimer",
    translateTo: "Traduire en",
    you: "Vous",
    english: "Anglais",
    spanish: "Espagnol",
    french: "Français",
  },
  es: {
    messageDeleted: "Mensaje eliminado",
    reply: "Responder",
    report: "Reportar",
    edit: "Editar",
    delete: "Eliminar",
    translateTo: "Traducir a",
    you: "Tú",
    english: "Inglés",
    spanish: "Español",
    french: "Francés",
  },
};

interface Props {
  index: number;
  array: Message[];
  otherUser?: User;
  message: Message;
  conversationId: string;
  loggedInUser?: SessionUser;
  isBlockedByOtherUser: boolean;
  openMenuMessageId: string | null;
  translatedLanguage: "en" | "es" | "fr" | null;
  setAttachments: Dispatch<SetStateAction<File[]>>;
  handleDeleteMessage: (messageId: string) => void;
  setOpenMenuMessageId: (id: string | null) => void;
  setUpdatedMessage: (message: Message | null) => void;
  setReplayToMessage: (message: Message | null) => void;
  handleTranslation: (messageId: string, lang: "en" | "es" | "fr") => void;
}

const MessageItem = ({
  array,
  index,
  message,
  otherUser,
  loggedInUser,
  conversationId,
  setAttachments,
  openMenuMessageId,
  handleTranslation,
  setUpdatedMessage,
  setReplayToMessage,
  translatedLanguage,
  handleDeleteMessage,
  isBlockedByOtherUser,
  setOpenMenuMessageId,
}: Props) => {
  const [openReportModal, setOpenReportModal] = useState(false);
  const { language } = useLanguageStore();
  const t = translations[language];

  const isSentByLoggedInUser = message.senderId === loggedInUser?.id;
  const isFirstInGroup =
    index === 0 || array[index - 1].senderId !== message.senderId;
  const avatarSrc = isSentByLoggedInUser
    ? loggedInUser?.profilePicture?.url
    : otherUser?.profilePicture?.url;

  return (
    <div
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
                fallBackImage={avatar}
                alt="user avatar"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      )}

      <div className="max-w-[60%] lg:max-w-[50%]">
        {message.isDeleted ||
        (message.message === null &&
          message.attachments &&
          message.attachments.length <= 0) ? (
          <div className="cursor-not-allowed bg-gray px-4 py-2 rounded-full border border-primaryBorder italic text-sm">
            {t.messageDeleted}
          </div>
        ) : (
          <div
            className={`${
              isSentByLoggedInUser ? "flex flex-row-reverse" : "flex flex-row"
            } items-center gap-2`}
          >
            <div
              className={`${
                isSentByLoggedInUser ? "items-end" : "items-start"
              } w-full flex flex-col gap-1`}
            >
              <div
                className={`w-full flex items-start gap-1 flex-wrap ${
                  isSentByLoggedInUser ? "justify-end" : "justify-start"
                }`}
              >
                {message.attachments &&
                  message.attachments.length > 0 &&
                  message.attachments.map((attachment, index) => {
                    return (
                      <MessageAttachment
                        key={index}
                        attachment={attachment}
                        messageId={message.id}
                        isSentByLoggedInUser={isSentByLoggedInUser}
                      />
                    );
                  })}
              </div>
              <div>
                {message.message && (
                  <div
                    className={`w-fit flex flex-col gap-3 items-start px-3 pt-3 pb-2 rounded-lg text-sm ${
                      isSentByLoggedInUser
                        ? "bg-primary text-white rounded-br-none"
                        : "bg-light text-black rounded-bl-none"
                    }`}
                  >
                    {message.repliedToMessage?.message?.originalText && (
                      <div className="w-full flex flex-col gap-1 p-2 bg-black/20 rounded-[5px]">
                        <p className="text-[13px] font-medium">
                          {message.repliedToMessage.senderId ===
                          loggedInUser?.id
                            ? t.you
                            : `${otherUser?.firstName} ${otherUser?.lastName}`}
                        </p>
                        <p className="text-[12px] font-normal">
                          {message.repliedToMessage.message.originalText}
                        </p>
                      </div>
                    )}

                    <div className="w-full flex flex-col items-start gap-3">
                      <p className="text-[14px] font-normal">
                        {translatedLanguage === "en" &&
                        message.message.translationEn
                          ? message.message.translationEn
                          : translatedLanguage === "es" &&
                            message.message.translationEs
                          ? message.message.translationEs
                          : translatedLanguage === "fr" &&
                            message.message.translationFr
                          ? message.message.translationFr
                          : message.message.originalText}
                      </p>

                      <div className="flex items-start gap-1 italic">
                        <RiTranslate className="mt-1" />
                        <p className="font-bold text-[10px]">
                          {t.translateTo}{" "}
                          <span
                            className="underline cursor-pointer"
                            onClick={() => handleTranslation(message.id, "en")}
                          >
                            {t.english}
                          </span>{" "}
                          /{" "}
                          <span
                            className="underline cursor-pointer"
                            onClick={() => handleTranslation(message.id, "es")}
                          >
                            {t.spanish}
                          </span>{" "}
                          /{" "}
                          <span
                            className="underline cursor-pointer"
                            onClick={() => handleTranslation(message.id, "fr")}
                          >
                            {t.french}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <p
                className={`${
                  isSentByLoggedInUser ? "mr-3" : "ml-3"
                } text-[10px] font-normal`}
              >
                <span className="capitalize">{message.status}</span>{" "}
                {formatRelativeTimeLong(message.createdAt)}
              </p>
            </div>
            <div className="relative">
              <ImageWithFallback
                src={dots}
                width={12}
                height={5}
                alt="dots"
                className={`${
                  isBlockedByOtherUser ? "cursor-not-allowed" : "cursor-pointer"
                } rotate-90`}
                onClick={() => {
                  if (!isBlockedByOtherUser) {
                    setOpenMenuMessageId(
                      openMenuMessageId === message.id ? null : message.id
                    );
                  }
                }}
              />
              {openMenuMessageId === message.id && (
                <div
                  data-menu
                  className={`${
                    !isSentByLoggedInUser ? "left-[-30px]" : "right-[-30px]"
                  } w-[100px] md:w-[150px] absolute top-6 bg-white shadow-lg border border-light p-2 rounded-[5px] z-10`}
                >
                  <div
                    className={`${
                      !isSentByLoggedInUser ? "left-8" : "right-8"
                    } absolute shadow-lg w-3 h-3 bg-white border-t border-l border-light rotate-45 top-[-7px] z-0`}
                  />
                  <div className="w-full flex flex-col items-start text-[14px]">
                    <CommonButton
                      label={t.reply}
                      className="w-full text-left hover:bg-light px-[14px] py-[10px] rounded-[5px]"
                      onClick={() => {
                        setUpdatedMessage(null);
                        setAttachments([]);
                        setReplayToMessage(message);
                        setOpenMenuMessageId(null);
                      }}
                    />
                    {!isSentByLoggedInUser && (
                      <CommonButton
                        label={t.report}
                        className="w-full text-left hover:bg-light px-[14px] py-[10px] rounded-[5px]"
                        onClick={() => {
                          setUpdatedMessage(null);
                          setAttachments([]);
                          setOpenMenuMessageId(null);
                          setOpenReportModal(true);
                        }}
                      />
                    )}
                    {isSentByLoggedInUser && (
                      <>
                        {Date.now() - new Date(message.createdAt).getTime() <
                          5 * 60 * 1000 && (
                          <CommonButton
                            label={t.edit}
                            className="w-full text-left hover:bg-light px-[14px] py-[10px] rounded-[5px]"
                            onClick={() => {
                              setReplayToMessage(null);
                              setAttachments([]);
                              setUpdatedMessage(message);
                              setOpenMenuMessageId(null);
                            }}
                          />
                        )}
                        <CommonButton
                          label={t.delete}
                          className="w-full text-left hover:bg-light px-[14px] py-[10px] rounded-[5px]"
                          onClick={() => {
                            setAttachments([]);
                            setReplayToMessage(null);
                            setUpdatedMessage(null);
                            handleDeleteMessage(message.id);
                          }}
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
                fallBackImage={avatar}
                alt="user avatar"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      )}

      {openReportModal && (
        <ReportMessageForm
          open={openReportModal}
          messageId={message.id}
          senderId={message.senderId}
          setOpen={setOpenReportModal}
          conversationId={conversationId}
          receiverId={message.receiverId}
        />
      )}
    </div>
  );
};

export default MessageItem;
