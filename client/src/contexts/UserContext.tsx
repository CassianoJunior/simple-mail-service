import { createContext, useContext, useState } from 'react';

export type ParticipantsOnMessageProps = {
  id: string;
  senderId: string;
  recipientId: string;
  messageId: string;
  message: MessageProps;
  sender: UserProps;
  recipient: UserProps;
  isRead: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type MessageProps = {
  id: string;
  subject: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  isRead: boolean;
  participants: ParticipantsOnMessageProps[];
};

export type UserProps = {
  id: string;
  name: string;
  email: string;
  messagesSent: ParticipantsOnMessageProps[];
  messagesReceived: ParticipantsOnMessageProps[];
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

interface MessageFormattedProps {
  messagesSent: MessageProps[];
  messagesReceived: MessageProps[];
}

interface UserContextProps {
  user: UserProps | undefined;
  messages: MessageFormattedProps;
  setUser: (user: UserProps) => void;
  handleUserLoginRequest: (email: string) => void;
}

const UserContextProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserProps | undefined>(undefined);
  const [messagesFormatted, setMessagesFormatted] =
    useState<MessageFormattedProps>({ messagesReceived: [], messagesSent: [] });

  const handleUserLoginRequest = (email: string) => {
    fetch(`http://localhost:3000/users?email=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) =>
      response
        .json()
        .then((data) => {
          setUser(data);
          formatUserMessages(data);
        })
        .catch((err) => console.log(err))
    );
  };

  const formatUserMessages = (user: UserProps) => {
    const messagesSent = user.messagesSent.map((message) => message.message);
    const messagesReceived = user.messagesReceived.map(
      (message) => message.message
    );

    setMessagesFormatted({ messagesSent, messagesReceived });
  };

  const contextValue = {
    user,
    messages: messagesFormatted,
    setUser,
    handleUserLoginRequest,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);

  if (typeof context === 'undefined') {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return context;
};

export { UserContextProvider, useUserContext };
