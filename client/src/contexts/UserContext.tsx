import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useWriteEmailReducer } from '../reducers/WriteMailReducer';
import { api } from '../utils/axios';

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
  setUser: (user: UserProps | undefined) => void;
  handleUserLoginRequest: (email: string) => void;
  requestUserData: (email: string) => void;
  getRecipients: (message: MessageProps) => UserProps[];
  userExists: string | undefined;
  handleUserLogout: () => void;
  handleUserRegisterRequest: (username: string, email: string) => void;
}

const UserContextProvider = ({ children }: UserProviderProps) => {
  const { state, dispatch } = useWriteEmailReducer();
  const [userExists, setUserExists] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<UserProps | undefined>(undefined);
  const [messagesFormatted, setMessagesFormatted] =
    useState<MessageFormattedProps>({ messagesReceived: [], messagesSent: [] });

  const handleUserLoginRequest = async (email: string) => {
    await api
      .get(`/users?email=${email}`)
      .then((response) => {
        if (response.status === 200) {
          setUserExists(email);
        }
      })
      .catch((err) => {
        if (err.message === 'Network Error') {
          toast.error('Server connection error');
          setTimeout(() => {
            return toast.warn('Verify if the server is running');
          }, 1000);

          return;
        }

        return toast.error(err.response.data);
      });
  };

  const handleUserRegisterRequest = async (username: string, email: string) => {
    await api
      .post('/users', {
        name: username,
        email,
      })
      .then((response) => {
        if (response.status === 201) {
          setUserExists(email);
        }
      })
      .catch((err) => {
        return toast.error(err.response.data);
      });
  };

  const requestUserData = async (email: string) => {
    await api
      .get(`/users?email=${email}`)
      .then((response) => {
        window.localStorage.setItem('user-email', `${userExists}`);
        setUser(response.data);
        formatUserMessages(response.data);
      })
      .catch((err) => {
        return toast.error(err.response.data);
      });
  };

  const formatUserMessages = (user: UserProps) => {
    const messagesSentWithoutDeleted = user.messagesSent.filter(
      (participant) => participant.senderDeleted === false
    );

    const messagesSentWithoutDuplicates = [] as ParticipantsOnMessageProps[];

    messagesSentWithoutDeleted.forEach((participant) => {
      if (
        !messagesSentWithoutDuplicates.find(
          ({ message }) => message.id === participant.message.id
        )
      ) {
        messagesSentWithoutDuplicates.push(participant);
      }
    });

    const messagesReceived = user.messagesReceived.filter(
      (participant) => participant.recipientDeleted === false
    );

    setMessagesFormatted({
      messagesSent: messagesSentWithoutDuplicates,
      messagesReceived,
    });
  };

  const getRecipients = (message: MessageProps) => {
    const recipients = message.participants.map((participant) => {
      return participant.recipient;
    });

    return recipients;
  };

  const handleUserLogout = () => {
    setUser(undefined);
    setMessagesFormatted({ messagesReceived: [], messagesSent: [] });
    setUserExists(undefined);
    window.localStorage.removeItem('user-email');
  };

  const contextValue = {
    user,
    messages: messagesFormatted,
    setUser,
    handleUserLoginRequest,
    getRecipients,
    state,
    dispatch,
    userExists,
    requestUserData,
    handleUserLogout,
    handleUserRegisterRequest,
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
