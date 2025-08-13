import { User } from "../user/user.types";
import { Message } from "./message.types";

export interface Conversation {
  id: string;
  senderId: string;
  receiverId: string;
  sender?: User;
  receiver?: User;
  lastMessageId: string | null;
  lastMessage: Message | null;
  createdAt: string;
  updatedAt: string;
}
