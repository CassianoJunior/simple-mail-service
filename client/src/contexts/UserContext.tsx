import { createContext, useContext, useState } from 'react';
import { useWriteEmailReducer } from '../reducers/WriteMailReducer';

export type ParticipantsOnMessageProps = {
  id: string;
  senderId: string;
  recipientId: string;
  messageId: string;
  message: MessageProps;
  sender: UserProps;
  recipient: UserProps;
  isRead: boolean;
  senderDeleted: boolean;
  recipientDeleted: boolean;
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
  messagesSent: ParticipantsOnMessageProps[];
  messagesReceived: ParticipantsOnMessageProps[];
}

interface UserContextProps {
  user: UserProps | undefined;
  messages: MessageFormattedProps;
  setUser: (user: UserProps) => void;
  handleUserLoginRequest: (email: string) => void;
  getRecipients: (message: MessageProps) => UserProps[];
}

const UserContextProvider = ({ children }: UserProviderProps) => {
  const { state, dispatch } = useWriteEmailReducer();
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
    const messagesSent = user.messagesSent.filter(
      (participant) => participant.senderDeleted === false
    );
    const messagesReceived = user.messagesReceived.filter(
      (participant) => participant.recipientDeleted === false
    );

    setMessagesFormatted({ messagesSent, messagesReceived });
  };

  const getRecipients = (message: MessageProps) => {
    const recipients = message.participants.map((participant) => {
      return participant.recipient;
    });

    return recipients;
  };

  const contextValue = {
    user,
    messages: messagesFormatted,
    setUser,
    handleUserLoginRequest,
    getRecipients,
    state,
    dispatch,
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
