export interface ParticipantsOnMessage {
  id: string;
  senderId: string;
  recipientId: string;
  messageId: string;
  isRead: boolean;
  senderDeleted: boolean;
  recipientDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
