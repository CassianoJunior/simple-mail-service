import moment from 'moment';
import {
  ParticipantsOnMessageProps,
  useUserContext,
} from '../contexts/UserContext';

interface MailCardProps extends React.HTMLAttributes<HTMLDivElement> {
  participantOnMessage: ParticipantsOnMessageProps;
  sectionTitleActive: string;
  isSelected: boolean;
}

const MailCard = ({
  participantOnMessage,
  sectionTitleActive,
  isSelected,
  ...rest
}: MailCardProps) => {
  const { getRecipients } = useUserContext();

  return (
    <div
      {...rest}
      className={`px-2 
    ${isSelected ? 'bg-[#2761CA]' : ''}
    rounded-lg shadow-xl relative
    ${
      participantOnMessage.isRead &&
      !isSelected &&
      sectionTitleActive !== 'Sent' &&
      'opacity-80'
    }`}
    >
      <div
        className={`flex flex-col justify-between w-full h-[5.5rem] p-4
        ${
          isSelected
            ? ''
            : `${
                !participantOnMessage.isRead && sectionTitleActive !== 'Sent'
                  ? 'border-b-2 border-[#3B82F7]'
                  : 'border-b-2 border-zinc-500'
              }`
        }`}
      >
        <div className="flex justify-between">
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-white max-w-[20ch] whitespace-nowrap overflow-hidden text-ellipsis">
                {sectionTitleActive === 'Inbox' ? (
                  <p
                    className={`${
                      participantOnMessage.isRead &&
                      !isSelected &&
                      'text-gray-400'
                    }`}
                  >
                    {participantOnMessage.sender.name}
                  </p>
                ) : (
                  <p>
                    To:{' '}
                    <span className="font-semibold">
                      {getRecipients(participantOnMessage.message)
                        .map((recipient) => recipient.name)
                        .join(', ')}
                    </span>
                  </p>
                )}
              </h3>
              <p className="text-[0.65rem] text-gray-400">
                {moment(participantOnMessage.message.createdAt).format(
                  'MMM D, YYYY h:mm A'
                )}
              </p>
            </div>
            <p
              className={`text-xs ${
                participantOnMessage.isRead &&
                !isSelected &&
                sectionTitleActive !== 'Sent'
                  ? 'text-gray-400'
                  : 'text-white'
              }`}
            >
              {participantOnMessage.message.subject}
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-400 max-w-[40ch] whitespace-nowrap overflow-hidden text-ellipsis">
          {participantOnMessage.message.body}
        </p>
      </div>
      {!participantOnMessage.isRead && sectionTitleActive !== 'Sent' && (
        <div className="bg-[#3B82F7] h-2 w-2 rounded-full absolute top-6 left-2" />
      )}
    </div>
  );
};

export { MailCard };
