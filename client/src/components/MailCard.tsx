import moment from 'moment';
import { useEffect, useState } from 'react';
import { MessageProps, useUserContext } from '../contexts/UserContext';

interface MailCardProps extends React.HTMLAttributes<HTMLDivElement> {
  message: MessageProps;
  sectionTitleActive: string;
  isSelected: boolean;
}

const MailCard = ({
  message,
  sectionTitleActive,
  isSelected,
  ...rest
}: MailCardProps) => {
  const { user } = useUserContext();
  const [recipientName, setRecipientName] = useState<string>('');

  const getRecipientName = async (id: string) => {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setRecipientName(data.name);
  };

  useEffect(() => {
    // getRecipientName(message.recipientId);
  }, []);

  return (
    <div
      {...rest}
      className={`px-2 
    ${isSelected ? 'bg-[#2761CA]' : ''}
    rounded-lg shadow-md relative`}
    >
      <div
        className={`flex flex-col justify-between w-full h-[5.5rem] p-4
        ${isSelected ? '' : 'border-b-2 border-zinc-500'}`}
      >
        <div className="flex justify-between">
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-white font-semibold">
                {sectionTitleActive === 'Inbox'
                  ? user.name
                  : `To: ${recipientName}`}
              </h3>
              <p className="text-[0.65rem] text-gray-400">
                {moment(message.createdAt).format('MMM D, YYYY h:mm A')}
              </p>
            </div>
            <p className="text-xs text-white">{message.subject}</p>
          </div>
        </div>
        <p className="text-xs text-gray-400 max-w-[40ch] whitespace-nowrap overflow-hidden text-ellipsis">
          {message.body}
        </p>
      </div>
      {!message.isRead && sectionTitleActive !== 'Sent' && (
        <div className="bg-[#3B82F7] h-2 w-2 rounded-full absolute top-6 left-2" />
      )}
    </div>
  );
};

export { MailCard };
