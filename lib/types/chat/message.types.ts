import { Media } from "../common/common.types";

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  message: {
    originalText: string;
    sourceLanguage: string;
    translationEn: string;
    translationFr: string;
    translationEs: string;
  };
  messageType: string;
  status: string;
  readAt: string | null;
  repliedToMessage: Message | null;
  repliedToMessageId?: string;
  attachments: Media[] | null;
  isDeleted: boolean;
  isInappropriate: boolean;
  createdAt: string;
  updatedAt: string;
}
