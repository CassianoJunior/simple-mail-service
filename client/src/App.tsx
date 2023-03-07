import { MailOpen } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { MailDetails } from './components/MailDetails';
import { MailList } from './components/MailList';
import { Sidebar } from './components/Sidebar';
import { MessageProps, useUserContext } from './contexts/UserContext';

export type SectionTitle = 'Inbox' | 'Sent';

const App = () => {
  const [activeSection, setActiveSection] = useState<SectionTitle>('Inbox');
  const [isWritingMail, setIsWritingMail] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<
    MessageProps | undefined
  >(undefined);

  const { user, handleUserLoginRequest, messages } = useUserContext();

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

    const participant = user?.messagesReceived.find((participantOnMessage) => {
      return participantOnMessage.messageId === id;
    });

    if (participant && message) {
      await fetch(`http://localhost:3000/readMessage?id=${participant.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      message.isRead = true;
      participant.isRead = true;
    }
  };

  const toggleWritingMail = useCallback(() => {
    setIsWritingMail((state) => !state);
  }, [isWritingMail]);

  const countUnreadMessages = (messages: MessageProps[]) => {
    const unreadMessages = messages.filter((message) => !message.isRead);

    return unreadMessages.length;
  };

  return user ? (
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
        toggleWritingMail={toggleWritingMail}
        isWritingMail={isWritingMail}
        user={user}
      />
      {selectedMessage ? (
        <MailDetails
          message={selectedMessage}
          setSelectedMessage={setSelectedMessage}
          activeSection={activeSection}
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
  ) : (
    <div>Loading</div>
  );
};

export { App };
