import { User } from 'lucide-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { SectionTitle } from '../App';
import { UserProps, useUserContext } from '../contexts/UserContext';
import { MessageProps } from './MailList';

interface MailDetailsProps {
  message: MessageProps;
  activeSection: SectionTitle;
}

const MailDetails = ({ message, activeSection }: MailDetailsProps) => {
  const [sender, setSender] = useState<UserProps>();
  const [recipient, setRecipient] = useState<UserProps>();

  const { user } = useUserContext();

  const fetchSender = async () => {
    const response = await fetch(
      `http://localhost:3000/users/${message.senderId}`
    );
    const data = await response.json();
    setSender(data);
  };

  const fetchRecipient = async () => {
    const response = await fetch(
      `http://localhost:3000/users/${message.recipientId}`
    );
    const data = await response.json();
    setRecipient(data);
  };

  useEffect(() => {
    fetchSender();
    fetchRecipient();
  }, []);

  return (
    <div className="h-screen text-white bg-zinc-700">
      <div className="flex flex-col justify-between w-full h-24 p-4">
        <div className="flex gap-2 w-full border-b-[1px] border-zinc-500">
          <User color="#9ca3af" size={24} strokeWidth={1.5} />
          <div className="flex flex-col w-full gap-1">
            <div className="flex justify-between items-center w-full">
              <p className="text-sm font-semibold">{sender?.name}</p>
              <p className="text-xs">
                {moment(message.createdAt).format('MMM D, YYYY h:mm A')}
              </p>
            </div>
            <p className="text-sm">{message.subject}</p>
            <p className="text-xs mb-4">
              To:{' '}
              <span className="text-gray-400">
                {activeSection === 'Inbox' ? user.email : recipient?.email}
              </span>
            </p>
          </div>
        </div>
        <div className="text-md text-white py-4 px-6">{message.body}</div>
      </div>
    </div>
  );
};

export { MailDetails };
