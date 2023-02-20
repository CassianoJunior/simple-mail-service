import { UserProps } from '../contexts/UserContext';
import { MailCard } from './MailCard';

interface MailListProps {
  sectionTitle: string;
  messages: MessageProps[];
  selectedMessage: MessageProps | undefined;
  user: UserProps;
  unreadMessages: number;
  handleClickMessage: (id: string) => void;
}

export type MessageProps = {
  id: string;
  senderId: string;
  recipientId: string;
  subject: string;
  body: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

const MailList = ({
  sectionTitle,
  messages,
  selectedMessage,
  handleClickMessage,
  user,
  unreadMessages,
}: MailListProps) => {
  return (
    <div className="h-screen py-2 px-4 bg-zinc-700 border-l-[1px] border-r-[1px] border-zinc-900">
      <header className="mb-4">
        <h2 className="text-lg text-white font-thin">{sectionTitle}</h2>
        <p className="text-xs text-gray-400">
          {messages.length} messages, {unreadMessages} unread
        </p>
      </header>
      <div className="flex flex-col gap-2">
        {messages
          .filter((message) =>
            sectionTitle === 'Inbox'
              ? message.recipientId === user.id
              : message.senderId === user.id
          )
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
    </div>
  );
};

export { MailList };
