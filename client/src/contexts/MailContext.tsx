import { createContext, useContext } from 'react';
import {
  initialState,
  ReducerAction,
  useWriteEmailReducer,
} from '../reducers/WriteMailReducer';

interface MailContextProps {
  state: typeof initialState;
  dispatch: React.Dispatch<ReducerAction>;
}

const MailContext = createContext<MailContextProps | undefined>(undefined);

interface MailContextProviderProps {
  children: React.ReactNode;
}

const MailContextProvider = ({ children }: MailContextProviderProps) => {
  const { state, dispatch } = useWriteEmailReducer();

  const contextValue = {
    state,
    dispatch,
  };

  return (
    <MailContext.Provider value={contextValue}>{children}</MailContext.Provider>
  );
};

const useMailContext = () => {
  const context = useContext(MailContext);

  if (!context) {
    throw new Error('useMailContext must be used within a MailContextProvider');
  }

  return context;
};

export { useMailContext, MailContextProvider };
