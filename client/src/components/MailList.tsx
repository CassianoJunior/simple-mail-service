import { MailPlus } from 'lucide-react';
import { useMailContext } from '../contexts/MailContext';
import {
  ParticipantsOnMessageProps,
  useUserContext,
} from '../contexts/UserContext';
import { ActionType } from '../reducers/WriteMailReducer';
import { MailCard } from './MailCard';

interface MailListProps {
  sectionTitle: string;
  selectedMessage: ParticipantsOnMessageProps | undefined;
  unreadMessages?: number;
  handleClickMessage: (id: string) => void;
}

const MailList = ({
  sectionTitle,
  selectedMessage,
  handleClickMessage,
  unreadMessages,
}: MailListProps) => {
  const { messages: messagesFormmated } = useUserContext();
  const { dispatch } = useMailContext();

  const messages =
    sectionTitle === 'Inbox'
      ? messagesFormmated.messagesReceived
      : messagesFormmated.messagesSent;

  const handleNewMail = () => {
    dispatch({
      type: ActionType.WRITING,
      payload: { body: '', subject: '', recipients: [] },
    });
  };

  return (
    <div className="h-screen py-2 px-4 bg-zinc-700 border-l-[1px] border-r-[1px] border-zinc-900 pb-20">
      <header className="mb-4 flex items-center justify-between bg-zinc-700">
        <div className="flex flex-col">
          <h2 className="text-lg text-white font-thin">{sectionTitle}</h2>
          <p className="text-xs text-gray-400">
            {messages.length} messages
            {sectionTitle === 'Inbox'
              ? `${!!unreadMessages ? `, ${unreadMessages} unread` : ''}`
              : ''}
          </p>
        </div>
        <button
          onClick={handleNewMail}
          className="items-center gap-2 bg-[#2761CA] rounded-full h-10 w-auto max-w-[2.5rem] p-2 transition-all duration-200 overflow-hidden hover:max-w-[10rem] hover:flex"
        >
          <MailPlus strokeWidth={1.5} size={24} color="white" />
          <span className="text-sm text-white">Write email</span>
        </button>
      </header>
      <div className="flex flex-col gap-2 px-2 max-h-full overflow-y-scroll scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-track-transparent scrollbar-thin scrollbar-thumb-zinc-600">
        {messages
          .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1))
          .map((message) => (
            <MailCard
              key={message.id}
              participantOnMessage={message}
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
