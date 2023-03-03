import { ParticipantsOnMessage } from './ParticipantsOnMessages';

export interface User {
  id: string;
  name: string;
  email: string;
  messagesReceived: ParticipantsOnMessage[];
  messagesSent: ParticipantsOnMessage[];
  createdAt: Date;
  updatedAt: Date;
}
