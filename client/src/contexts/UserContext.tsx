import { createContext, useContext, useState } from 'react';

export type ParticipantsOnMessageProps = {
  id: string;
  senderId: string;
  recipientId: string;
  messageId: string;
  createdAt: string;
  updatedAt: string;
};

export type MessageProps = {
  id: string;
  subject: string;
  body: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  participants: ParticipantsOnMessageProps[];
};

export type UserProps = {
  id: string;
  name: string;
  email: string;
  messagesSent: ParticipantsOnMessageProps[];
  messagesReceived: ParticipantsOnMessageProps[];
};

interface UserContextProps {
  user: UserProps;
  setUser: (user: UserProps) => void;
  handleUserLoginRequest: (email: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContextProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserProps>({} as UserProps);

  const handleUserLoginRequest = (email: string) => {
    fetch(`http://localhost:3000/users?email=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) =>
      response
        .json()
        .then((data) => setUser(data))
        .catch((err) => console.log(err))
    );
  };

  const contextValue = {
    user,
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
