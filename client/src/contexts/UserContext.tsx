import { createContext, useContext, useState } from 'react';

export type UserProps = {
  id: string;
  name: string;
  email: string;
};

interface UserContextProps {
  user: UserProps;
  setUser: (user: UserProps) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContextProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserProps>({} as UserProps);

  const handleUserLoginRequest = (email: string) => {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    }).then((response) =>
      response
        .json()
        .then((data) => setUser(data))
        .catch((err) => console.log(err))
    );
  };

  const userMock = {
    id: 'asd2asd',
    name: 'Jane Doe',
    email: 'jonedoe@mail.com',
  };

  const contextValue = {
    user: userMock,
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
