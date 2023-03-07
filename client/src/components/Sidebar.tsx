import { Inbox, Send, User } from 'lucide-react';
import { SectionTitle } from '../App';
import { useUserContext } from '../contexts/UserContext';
import { SidebarButton } from './SidebarButton';
import { SidebarHeader } from './SidebarHeader';

interface SidebarProps {
  activeSection: SectionTitle;
  unreadMessages?: number;
  handleClickInboxSection: () => void;
  handleClickSentSection: () => void;
}

const Sidebar = ({
  activeSection,
  unreadMessages,
  handleClickInboxSection,
  handleClickSentSection,
}: SidebarProps) => {
  const { user } = useUserContext();

  return (
    <div className="h-screen px-2 bg-zinc-900 shadow-[0,_4px,_30px,_rgba(0,_0,_0,_0.1)] bg-opacity-40 backdrop-blur-md flex flex-col gap-1">
      <SidebarHeader
        icon={<User color="#2DA4FF" strokeWidth={1.5} size={24} />}
        name={user?.name}
        email={user?.email}
      />
      <SidebarButton
        title="Inbox"
        Icon={<Inbox color="#2DA4FF" strokeWidth={1.5} size={16} />}
        active={activeSection === 'Inbox'}
        bagdeCount={unreadMessages}
        onClick={handleClickInboxSection}
      />
      <SidebarButton
        title="Sent"
        Icon={<Send color="#2DA4FF" strokeWidth={1.5} size={16} />}
        active={activeSection === 'Sent'}
        onClick={handleClickSentSection}
      />
    </div>
  );
};

export { Sidebar };
