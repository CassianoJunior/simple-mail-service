import { ParticipantsOnMessage } from './ParticipantsOnMessages';

export interface Message {
  id: string;
  body: string;
  subject: string;
  participants: ParticipantsOnMessage[];
  createdAt: Date;
  updatedAt: Date;
}
