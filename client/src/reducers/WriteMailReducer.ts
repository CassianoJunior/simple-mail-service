import { useReducer } from 'react';

const enum ActionType {
  REPLYING = 'replying',
  FORWARDING = 'forwarding',
  WRITING = 'writing',
  NONE = 'none',
}

export type ReducerPayload = {
  recipients: string[];
  subject: string;
  body: string;
};

export type ReducerAction = {
  type: ActionType;
  payload: ReducerPayload;
};

const initialState = {
  type: ActionType.NONE,
  payload: {} as ReducerPayload,
};

const WriteEmailReducer = (
  state: typeof initialState,
  action: ReducerAction
): typeof initialState => {
  switch (action.type) {
    case ActionType.REPLYING: {
      return {
        ...state,
        type: action.type,
        payload: action.payload,
      };
    }
    case ActionType.FORWARDING: {
      return {
        ...state,
        type: action.type,
        payload: action.payload,
      };
    }
    case ActionType.WRITING: {
      return {
        ...state,
        type: action.type,
        payload: action.payload,
      };
    }
    case ActionType.NONE: {
      return {
        ...state,
        type: action.type,
        payload: {} as ReducerPayload,
      };
    }
    default:
      return state;
  }
};

const useWriteEmailReducer = () => {
  const [state, dispatch] = useReducer(WriteEmailReducer, initialState);
  return { state, dispatch };
};

export { useWriteEmailReducer, ActionType, initialState };
