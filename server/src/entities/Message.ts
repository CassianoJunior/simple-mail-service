import { ParticipantsOnMessage } from './ParticipantsOnMessages';

export interface Message {
  id: string;
  body: string;
  subject: string;
  createdAt: Date;
  updatedAt: Date;

  participants?: ParticipantsOnMessage[];
}
