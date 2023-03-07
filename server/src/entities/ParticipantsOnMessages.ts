import { Message } from './Message';
import { User } from './User';

export interface ParticipantsOnMessage {
  id: string;
  senderId: string;
  recipientId: string;
  messageId: string;
  isRead: boolean;
  senderDeleted: boolean;
  recipientDeleted: boolean;
  replyToId?: string;
  sender?: User;
  recipient?: User;
  message?: Message;
  createdAt: Date;
  updatedAt: Date;
}
