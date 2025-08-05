import { RiTranslate } from "react-icons/ri";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import { avatar, dots } from "@/lib/components/image/icons";
import { User, SessionUser } from "@/lib/types/user/user.types";
import { Message } from "@/lib/types/conversation/message.types";
import { formatRelativeTimeLong } from "@/lib/utils/date/dateUtils";

interface Props {
  index: number;
  array: Message[];
  otherUser?: User;
  message: Message;
  loggedInUser?: SessionUser;
  openMenuMessageId: string | null;
  translatedLanguage: "en" | "es" | "fr" | null;
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
  openMenuMessageId,
  handleTranslation,
  setUpdatedMessage,
  setReplayToMessage,
  translatedLanguage,
  handleDeleteMessage,
  setOpenMenuMessageId,
}: Props) => {
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

      <div className="max-w-[50%]">
        {message.isDeleted ? (
          <div className="cursor-not-allowed bg-gray px-4 py-2 rounded-full border border-primaryBorder italic text-sm">
            Message deleted
          </div>
        ) : (
          <div
            className={`${
              isSentByLoggedInUser ? "items-end" : "items-start"
            } w-full flex flex-col gap-1`}
          >
            <div
              className={`${
                isSentByLoggedInUser ? "flex flex-row-reverse" : "flex flex-row"
              } items-center gap-2`}
            >
              <div
                className={`w-fit flex flex-col gap-3 items-start px-3 pt-3 pb-2 rounded-lg text-sm ${
                  isSentByLoggedInUser
                    ? "bg-primary text-white rounded-br-none"
                    : "bg-light text-black rounded-bl-none"
                }`}
              >
                {message.repliedToMessage?.message?.originalText && (
                  <div className="flex flex-col gap-1 p-2 bg-black/20 rounded-[5px]">
                    <p className="text-[13px] font-medium">
                      {message.repliedToMessage.senderId === loggedInUser?.id
                        ? "You"
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

                  <div className="flex items-center gap-1 italic">
                    <RiTranslate />
                    <p className="font-bold text-[10px]">
                      Translate to{" "}
                      <span
                        className="underline cursor-pointer"
                        onClick={() => handleTranslation(message.id, "en")}
                      >
                        English
                      </span>{" "}
                      /{" "}
                      <span
                        className="underline cursor-pointer"
                        onClick={() => handleTranslation(message.id, "es")}
                      >
                        Spanish
                      </span>{" "}
                      /{" "}
                      <span
                        className="underline cursor-pointer"
                        onClick={() => handleTranslation(message.id, "fr")}
                      >
                        French
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <ImageWithFallback
                  src={dots}
                  width={12}
                  height={5}
                  alt="dots"
                  className="cursor-pointer rotate-90"
                  onClick={() =>
                    setOpenMenuMessageId(
                      openMenuMessageId === message.id ? null : message.id
                    )
                  }
                />
                {openMenuMessageId === message.id && (
                  <div
                    data-menu
                    className={`${
                      !isSentByLoggedInUser ? "left-[-30px]" : "right-[-30px]"
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
                          {Date.now() - new Date(message.createdAt).getTime() <
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
                            onClick={() => handleDeleteMessage(message.id)}
                          />
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
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
    </div>
  );
};

export default MessageItem;
