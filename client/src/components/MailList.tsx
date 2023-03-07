import { MailPlus } from 'lucide-react';
import {
  MessageProps,
  ParticipantsOnMessageProps,
  UserProps,
} from '../contexts/UserContext';
import { MailCard } from './MailCard';
import { NewMail } from './NewMail';

interface MailListProps {
  sectionTitle: string;
  selectedMessage: MessageProps | undefined;
  user: UserProps;
  unreadMessages: number;
  handleClickMessage: (id: string) => void;
  isWritingMail: boolean;
  toggleWritingMail: () => void;
}

const MailList = ({
  sectionTitle,
  selectedMessage,
  handleClickMessage,
  user,
  unreadMessages,
  toggleWritingMail,
  isWritingMail,
}: MailListProps) => {
  const getMessages = (
    participantsOnMessages: ParticipantsOnMessageProps[]
  ) => {
    const messages = participantsOnMessages.map((participantOnMessage) => {
      const message = participantOnMessage.message;
      message.participants = participantsOnMessages;
      message.isRead = participantOnMessage.isRead;

      return message;
    });

    return messages;
  };

  const messages =
    sectionTitle === 'Inbox'
      ? getMessages(user.messagesReceived)
      : getMessages(user.messagesSent);

  return (
    <div className="h-screen py-2 px-4 bg-zinc-700 border-l-[1px] border-r-[1px] border-zinc-900">
      <header className="mb-4 flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-lg text-white font-thin">{sectionTitle}</h2>
          <p className="text-xs text-gray-400">
            {messages.length} messages
            {sectionTitle === 'Inbox' ? `, ${unreadMessages} unread` : ''}
          </p>
        </div>
        <button
          onClick={toggleWritingMail}
          className="items-center gap-2 bg-[#2761CA] rounded-full h-10 w-auto max-w-[2.5rem] p-2 transition-all duration-200 overflow-hidden hover:max-w-[10rem] hover:flex"
        >
          <MailPlus strokeWidth={1.5} size={24} color="white" />
          <span className="text-sm text-white">Write email</span>
        </button>
      </header>
      <div className="flex flex-col gap-2">
        {messages
          .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1))
          .map((message) => (
            <MailCard
              key={message.id}
              message={message}
              sectionTitleActive={sectionTitle}
              isSelected={selectedMessage?.id === message.id}
              onClick={() => handleClickMessage(message.id)}
            />
          ))}
      </div>

      {isWritingMail && <NewMail toggleWritingMail={toggleWritingMail} />}
    </div>
  );
};

export { MailList };
