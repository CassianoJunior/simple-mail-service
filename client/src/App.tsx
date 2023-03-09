import { MailOpen } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { MailDetails } from './components/MailDetails';
import { MailList } from './components/MailList';
import { Sidebar } from './components/Sidebar';
import { WriteMail } from './components/WriteMail';
import { useMailContext } from './contexts/MailContext';
import {
  ParticipantsOnMessageProps,
  useUserContext,
} from './contexts/UserContext';
import { ActionType } from './reducers/WriteMailReducer';
import { api } from './utils/axios';

export type SectionTitle = 'Inbox' | 'Sent';

const App = () => {
  const [activeSection, setActiveSection] = useState<SectionTitle>('Inbox');
  const [selectedMessage, setSelectedMessage] = useState<
    ParticipantsOnMessageProps | undefined
  >(undefined);

  const { user, handleUserLoginRequest, messages } = useUserContext();
  const { state } = useMailContext();

  useEffect(() => {
    handleUserLoginRequest('cassiano@mail.com');
  }, []);

  const handleClickInboxSection = useCallback(() => {
    setActiveSection('Inbox');
    setSelectedMessage(undefined);
  }, [activeSection]);

  const handleClickSentSection = useCallback(() => {
    setActiveSection('Sent');
    setSelectedMessage(undefined);
  }, [activeSection]);

  const handleClickMessage = async (id: string) => {
    const allMessages = [
      ...messages.messagesReceived,
      ...messages.messagesSent,
    ];
    const message = allMessages.find((message) => message.id === id);
    setSelectedMessage(message);

    if (message?.isRead) return;

    if (message) {
      await api.put(`/readMessage?id=${message.id}`);
      message.isRead = true;
    }
  };

  const countUnreadMessages = (messages: ParticipantsOnMessageProps[]) => {
    const unreadMessages = messages.filter((message) => !message.isRead);

    return unreadMessages.length === 0 ? undefined : unreadMessages.length;
  };

  return user ? (
    <>
      <div className="grid grid-cols-[3fr_5fr_12fr]">
        <Sidebar
          activeSection={activeSection}
          handleClickInboxSection={handleClickInboxSection}
          handleClickSentSection={handleClickSentSection}
          unreadMessages={countUnreadMessages(messages.messagesReceived)}
        />
        <MailList
          sectionTitle={activeSection}
          selectedMessage={selectedMessage}
          unreadMessages={countUnreadMessages(messages.messagesReceived)}
          handleClickMessage={handleClickMessage}
        />
        {selectedMessage ? (
          <MailDetails
            participantOnMessage={selectedMessage}
            setSelectedMessage={setSelectedMessage}
          />
        ) : (
          <div className="h-screen flex flex-col gap-4 items-center justify-center text-gray-400 bg-zinc-700">
            <MailOpen color="#9ca3af" size={96} strokeWidth={0.8} />
            <p className="text-2xl max-w-[22ch] text-center ">
              Select an email to expand it and see its details
            </p>
          </div>
        )}
      </div>
      {state.type !== ActionType.NONE && (
        <WriteMail participantOnMessage={selectedMessage} />
      )}
    </>
  ) : (
    <div>Loading</div>
  );
};

export { App };
