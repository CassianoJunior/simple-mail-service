import { FileText, Mail, Send, Subtitles, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useMailContext } from '../contexts/MailContext';
import {
  ParticipantsOnMessageProps,
  useUserContext,
} from '../contexts/UserContext';
import { ActionType, initialState } from '../reducers/WriteMailReducer';
import { api } from '../utils/axios';

interface WriteMailProps {
  participantOnMessage?: ParticipantsOnMessageProps;
}

const WriteMail = ({ participantOnMessage }: WriteMailProps) => {
  const { user, handleUserLoginRequest, getRecipients } = useUserContext();
  const { state, dispatch } = useMailContext();

  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const sendMessage = async (recipients: string[]) => {
    await api
      .post('/messages', {
        message: {
          subject,
          body,
        },
        from: user?.id,
        to: recipients,
      })
      .then((res) => {
        if (res.status === 201) {
          setRecipient('');
          setSubject('');
          setBody('');
          dispatch({ type: ActionType.NONE, payload: initialState.payload });
          handleUserLoginRequest(user?.email || '');

          toast.success('Message sent');
          return;
        } else {
          return toast.error('Something went wrong');
        }
      })
      .catch((err) => {
        return toast.error(err.response.data);
      });
  };

  const sendReplyMessage = async (recipients: string[]) => {
    await api
      .post('/replyMessage', {
        message: {
          subject,
          body,
        },
        from: user?.id,
        to: recipients,
        replyTo: participantOnMessage?.id,
      })
      .then((res) => {
        if (res.status === 201) {
          setRecipient('');
          setSubject('');
          setBody('');
          dispatch({ type: ActionType.NONE, payload: initialState.payload });
          handleUserLoginRequest(user?.email || '');

          toast.success('Message answered');
          return;
        } else {
          return toast.error('Something went wrong');
        }
      })
      .catch((err) => {
        return toast.error(err.response.data);
      });
  };

  const sendForwardedMessage = async (recipients: string[]) => {
    await api
      .post('/forwardMessage', {
        message: {
          subject,
          body,
        },
        from: user?.id,
        to: recipients,
        forwardToId: participantOnMessage?.id,
      })
      .then((res) => {
        if (res.status === 201) {
          setRecipient('');
          setSubject('');
          setBody('');
          dispatch({ type: ActionType.NONE, payload: initialState.payload });
          handleUserLoginRequest(user?.email || '');

          toast.success('Message forwarded');
          return;
        } else {
          return toast.error('Something went wrong');
        }
      })
      .catch((err) => {
        return toast.error(err.response.data);
      });
  };

  const handleSubmit = async (
    recipient: string,
    subject: string,
    body: string
  ) => {
    if (!recipient || !subject || !body) {
      return toast.warning('Please fill all fields');
    }

    const recipients = recipient.replaceAll(' ', '').split(',');

    if (state.type === ActionType.REPLYING && participantOnMessage) {
      sendReplyMessage(recipients);
    } else if (state.type === ActionType.FORWARDING) {
      sendForwardedMessage(recipients);
    } else if (state.type === ActionType.WRITING) {
      sendMessage(recipients);
    } else {
      return toast.error('Something went wrong in reducer');
    }
  };

  const handleClickCloseButton = () => {
    dispatch({ type: ActionType.NONE, payload: initialState.payload });
  };

  useEffect(() => {
    if (state.type === ActionType.REPLYING && participantOnMessage) {
      setRecipient(state.payload.recipients.join(', '));
      setSubject(`${state.payload.subject}`);
      setBody(`\n\n\n-------- Reply Message --------\n${state.payload.body}`);
    } else if (state.type === ActionType.FORWARDING && participantOnMessage) {
      setRecipient('');
      setSubject(`${state.payload.subject}`);
      setBody(`\n\n\n-------- Forward Message --------\n${state.payload.body}`);
    } else if (state.type === ActionType.WRITING) {
      setRecipient('');
      setSubject('');
      setBody('');
    }
  }, [state]);

  const getSectionTitle = (action: ActionType) => {
    switch (action) {
      case ActionType.REPLYING:
        return 'Reply email';
      case ActionType.FORWARDING:
        return 'Forward email';
      default:
        return 'Write new email';
    }
  };

  return (
    <div className="h-[36rem] w-[40rem] flex flex-col gap-4 bg-gray-600 rounded-xl absolute bottom-2 right-2 p-4">
      <header className="flex w-full items-center justify-center">
        <div className="absolute top-1 left-1 hover:cursor-pointer rounded-full p-2 hover:bg-zinc-500">
          <X
            size={24}
            strokeWidth={1.5}
            color="white"
            onClick={handleClickCloseButton}
          />
        </div>
        <h2 className="font-inter text-xl text-white text-semibold">
          {getSectionTitle(state.type)}
        </h2>
      </header>
      <div>
        <form className="flex flex-col gap-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail size={20} strokeWidth={1.5} color="#2DA4FF" />
            </div>
            <input
              type="text"
              className="border disabled:cursor-not-allowed text-sm rounded-lg block w-full pl-10 p-2.5 outline-none bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="recipient@email.com"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              disabled={state.type === ActionType.REPLYING}
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Subtitles size={20} strokeWidth={1.5} color="#2DA4FF" />
            </div>
            <input
              type="text"
              className="border text-sm rounded-lg block w-full pl-10 p-2.5 outline-none bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 top-3 left-0 flex pl-3 pointer-events-none">
              <FileText size={20} strokeWidth={1.5} color="#2DA4FF" />
            </div>
            <textarea
              className="border text-sm rounded-lg block w-full h-[20rem] pl-10 p-2.5 outline-none bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>

          <div className="relative">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(recipient, subject, body);
              }}
              className="flex items-center text-gray-300 gap-4 border-2 border-[#2DA4FF] max-w-fit rounded-lg py-2 px-6 absolute right-0 hover:bg-[#2DA4FF] transition-colors hover:text-white text-semibold"
            >
              <span>Send email</span>
              <Send size={20} strokeWidth={1.5} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { WriteMail };
