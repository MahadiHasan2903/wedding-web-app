import { User } from "../user/user.types";

export interface Conversation {
  id: string;
  senderId: string;
  receiverId: string;
  sender?: User;
  receiver?: User;
  lastMessageId: string | null;
  lastMessage: string | null;
  createdAt: string;
  updatedAt: string;
}
