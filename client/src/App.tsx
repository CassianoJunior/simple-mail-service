import { MailOpen } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { MailDetails } from './components/MailDetails';
import { MailList, MessageProps } from './components/MailList';
import { Sidebar } from './components/Sidebar';
import { useUserContext } from './contexts/UserContext';

export type SectionTitle = 'Inbox' | 'Sent';

const App = () => {
  const [activeSection, setActiveSection] = useState<SectionTitle>('Inbox');
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<
    MessageProps | undefined
  >(undefined);

  const { user } = useUserContext();
  console.log(user.id);

  const handleDataFeched = useCallback(async () => {
    const response = await fetch(
      `http://localhost:3000/userMessages/${user.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const messages = await response.json();
    setMessages(messages);
  }, [setMessages]);

  useEffect(() => {
    handleDataFeched();
  }, []);

  const handleClickInboxSection = useCallback(() => {
    setActiveSection('Inbox');
  }, [activeSection]);

  const handleClickSentSection = useCallback(() => {
    setActiveSection('Sent');
  }, [activeSection]);

  const handleClickMessage = async (id: string) => {
    const message = messages.find((message) => message.id === id);
    setSelectedMessage(message);

    const response = await fetch(`http://localhost:3000/messages/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...message,
        isRead: true,
      }),
    });

    const updatedMessage: MessageProps[] = await response.json();
    console.log(updatedMessage.find((message) => message.id === id));
  };

  const countUnreadMessages = (messages: MessageProps[]) => {
    const unreadMessages = messages.filter(
      (message) => !message.isRead && message.recipientId === user.id
    );
    return unreadMessages.length;
  };

  return (
    <div className="grid grid-cols-[3fr_5fr_12fr]">
      <Sidebar
        activeSection={activeSection}
        handleClickInboxSection={handleClickInboxSection}
        handleClickSentSection={handleClickSentSection}
        unreadMessages={countUnreadMessages(messages)}
      />
      <MailList
        sectionTitle={activeSection}
        messages={messages}
        selectedMessage={selectedMessage}
        unreadMessages={countUnreadMessages(messages)}
        handleClickMessage={handleClickMessage}
        user={user}
      />
      {selectedMessage ? (
        <MailDetails message={selectedMessage} activeSection={activeSection} />
      ) : (
        <div className="h-screen flex flex-col gap-4 items-center justify-center text-gray-400 bg-zinc-700">
          <MailOpen color="#9ca3af" size={96} strokeWidth={0.8} />
          <p className="text-2xl max-w-[22ch] text-center ">
            Select an email to expand it and see its details
          </p>
        </div>
      )}
    </div>
  );
};

export { App };
