import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Forward, Reply, Trash2, User } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useMailContext } from '../contexts/MailContext';
import {
  MessageProps,
  ParticipantsOnMessageProps,
  useUserContext,
} from '../contexts/UserContext';
import { ActionType } from '../reducers/WriteMailReducer';
import { api } from '../utils/axios';
interface MailDetailsProps {
  participantOnMessage: ParticipantsOnMessageProps;
  setSelectedMessage: (message: ParticipantsOnMessageProps | undefined) => void;
}

const MailDetails = ({
  participantOnMessage,
  setSelectedMessage,
}: MailDetailsProps) => {
  const { user, requestUserData, getRecipients } = useUserContext();

  const { dispatch } = useMailContext();

  const handleReplyMessage = () => {
    const recipientsWithoutMe = getRecipients(
      participantOnMessage.message
    ).filter((recipient) => recipient.email !== user?.email);

    const recipientsWithSender = [
      participantOnMessage.sender,
      ...recipientsWithoutMe,
    ];

    const recipients = recipientsWithSender.map((recipient) => recipient.email);

    dispatch({
      type: ActionType.REPLYING,
      payload: {
        subject: `Re: ${participantOnMessage.message.subject}`,
        recipients,
        body: `On ${moment(participantOnMessage.message.createdAt).format(
          'MMM D, YYYY h:mm A'
        )}, ${participantOnMessage.sender.name} <${
          participantOnMessage.sender.email
        }> wrote:\n ${participantOnMessage.message.body}`,
      },
    });
  };

  const handleForward = () => {
    dispatch({
      type: ActionType.FORWARDING,
      payload: {
        subject: `Fwd: ${participantOnMessage.message.subject}`,
        recipients: [],
        body: `On ${moment(participantOnMessage.message.createdAt).format(
          'MMM D, YYYY h:mm A'
        )}, ${participantOnMessage.sender.name} <${
          participantOnMessage.sender.email
        }> wrote:\n ${participantOnMessage.message.body}`,
      },
    });
  };

  const handleDelete = async () => {
    const who =
      participantOnMessage.senderId === user?.id ? 'sender' : 'recipient';

    const response = await api.delete(
      `/messages?id=${participantOnMessage.id}&who=${who}`
    );

    if (response.status === 204) {
      toast.success('Message deleted');
      setSelectedMessage(undefined);
      return requestUserData(user?.email as string);
    }

    return toast.error('Something went wrong');
  };

  return (
    <div className="h-screen text-white bg-zinc-700">
      <div className="flex flex-col justify-between w-full h-24 p-4">
        <div className="w-full justify-center items-center flex gap-4">
          <div
            onClick={handleReplyMessage}
            title="Reply"
            className="p-2 hover:bg-gray-600 hover:cursor-pointer rounded-full flex items-center justify-center"
          >
            <Reply color="#2DA4FF" strokeWidth={1.5} size={24} />
          </div>
          <div
            onClick={handleForward}
            title="Forward"
            className="p-2 hover:bg-gray-600 hover:cursor-pointer rounded-full flex items-center justify-center"
          >
            <Forward color="#2DA4FF" strokeWidth={1.5} size={24} />
          </div>
          <ConfirmDeleteModal
            handleDelete={handleDelete}
            message={participantOnMessage.message}
          />
        </div>
        <div className="flex gap-2 w-full border-b-[1px] border-zinc-500">
          <User color="#9ca3af" size={24} strokeWidth={1.5} />
          <div className="flex flex-col w-full gap-1">
            <div className="flex justify-between items-center w-full">
              <p className="text-sm font-semibold">
                {`By: ${participantOnMessage.sender.name}`}
                <span className="font-normal text-gray-400">{` | <${participantOnMessage.sender.email}>`}</span>
              </p>
              <p className="text-xs">
                {moment(participantOnMessage.message.createdAt).format(
                  'MMM D, YYYY h:mm A'
                )}
              </p>
            </div>
            <p className="text-sm">{participantOnMessage.message.subject}</p>
            <p className="text-xs mb-4">
              To:{' '}
              <span className="text-gray-400">
                {getRecipients(participantOnMessage.message)
                  .map((recipient) => recipient.email)
                  .join(', ')}
              </span>
            </p>
          </div>
        </div>
        <div className="text-md text-white py-4 px-6 whitespace-pre-line">
          {participantOnMessage.message.body}
        </div>
      </div>
    </div>
  );
};

interface ConfirmDeleteModalProps {
  handleDelete: (message: MessageProps) => void;
  message: MessageProps;
}

const ConfirmDeleteModal = ({
  handleDelete,
  message,
}: ConfirmDeleteModalProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Trigger>
          <div
            title="Delete"
            className="p-2 hover:bg-gray-600 rounded-full flex items-center justify-center"
          >
            <Trash2 color="#2DA4FF" strokeWidth={1.5} size={24} />
          </div>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="inset-0 fixed animate-[overlayShow_150ms_cubic-bezier(0.16,1,0.3,1)]" />
          <AlertDialog.Content className="bg-zinc-600 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] fixed -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[500px] animate-[contentShow_150ms_cubic-bezier(0.16,1,0.3,1)] p-6 rounded-md left-1/2 top-1/2">
            <AlertDialog.Title className="text-lg font-semibold text-white">
              Are you sure you want to delete this message?
            </AlertDialog.Title>
            <AlertDialog.Description className="py-4 text-white">
              This action cannot be undone.
            </AlertDialog.Description>
            <div className="flex gap-4 w-full flex-end">
              <AlertDialog.Cancel>
                <div
                  onClick={() => setOpen(false)}
                  className="bg-zinc-500 hover:bg-zinc-700 text-white font-semibold py-2 px-4 rounded"
                >
                  Cancel
                </div>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <div
                  onClick={() => handleDelete(message)}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Delete
                </div>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export { MailDetails };
