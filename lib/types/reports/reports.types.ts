import { Message } from "postcss";

export interface Report {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  messageId: Message;
  type: string;
  description: string;
  status: string;
  actionTaken: string;
  createdAt: string;
  updatedAt: string;
}
