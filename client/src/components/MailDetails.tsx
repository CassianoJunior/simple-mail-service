import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Forward, Reply, Trash2, User } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { SectionTitle } from '../App';
import { MessageProps, useUserContext } from '../contexts/UserContext';
interface MailDetailsProps {
  message: MessageProps;
  activeSection: SectionTitle;
  setSelectedMessage: (message: MessageProps | undefined) => void;
}

const MailDetails = ({
  message,
  activeSection,
  setSelectedMessage,
}: MailDetailsProps) => {
  const { user, handleUserLoginRequest } = useUserContext();

  const getParticipant = (message: MessageProps) => {
    const participant = message.participants.find(
      (participant) => message.id === participant.messageId
    );

    return participant;
  };

  const handleReply = () => {};

  const handleForward = () => {};

  const handleDelete = async (message: MessageProps) => {
    const participant = getParticipant(message);

    if (!participant) return;

    const response = await fetch(
      `http://localhost:3000/messages?id=${participant.id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 202) {
      toast.success('Message deleted');
      setSelectedMessage(undefined);
      return handleUserLoginRequest(user?.email || '');
    }

    return toast.error('Something went wrong');
  };

  return (
    <div className="h-screen text-white bg-zinc-700">
      <div className="flex flex-col justify-between w-full h-24 p-4">
        <div className="w-full justify-center items-center flex gap-4">
          <div
            title="Reply"
            className="p-2 hover:bg-gray-600 hover:cursor-pointer rounded-full flex items-center justify-center"
          >
            <Reply color="#2DA4FF" strokeWidth={1.5} size={24} />
          </div>
          <div
            title="Forward"
            className="p-2 hover:bg-gray-600 hover:cursor-pointer rounded-full flex items-center justify-center"
          >
            <Forward color="#2DA4FF" strokeWidth={1.5} size={24} />
          </div>
          <ConfirmDeleteModal handleDelete={handleDelete} message={message} />
        </div>
        <div className="flex gap-2 w-full border-b-[1px] border-zinc-500">
          <User color="#9ca3af" size={24} strokeWidth={1.5} />
          <div className="flex flex-col w-full gap-1">
            <div className="flex justify-between items-center w-full">
              <p className="text-sm font-semibold">
                {getParticipant(message)?.sender.name}
              </p>
              <p className="text-xs">
                {moment(message.createdAt).format('MMM D, YYYY h:mm A')}
              </p>
            </div>
            <p className="text-sm">{message.subject}</p>
            <p className="text-xs mb-4">
              To:{' '}
              <span className="text-gray-400">
                {activeSection === 'Inbox'
                  ? user?.email
                  : getParticipant(message)?.recipient.email}
              </span>
            </p>
          </div>
        </div>
        <div className="text-md text-white py-4 px-6">{message.body}</div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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
        <AlertDialog.Content className="bg-[white] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] fixed -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[500px] animate-[contentShow_150ms_cubic-bezier(0.16,1,0.3,1)] p-6 rounded-md left-1/2 top-1/2">
          <AlertDialog.Title className="text-lg font-semibold">
            Are you sure you want to delete this message?
          </AlertDialog.Title>
          <AlertDialog.Description className="py-4">
            This action cannot be undone.
          </AlertDialog.Description>
          <div className="flex gap-4 w-full flex-end">
            <AlertDialog.Cancel>
              <div
                onClick={() => setOpen(false)}
                className="bg-zinc-500 hover:bg-zinc-600 text-white font-semibold py-2 px-4 rounded"
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
  );
};

export { MailDetails };
