import { Inbox, LogOut, Send, User } from 'lucide-react';
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
  const { user, setUser, handleUserLogout } = useUserContext();

  return (
    <div className="h-screen px-2 bg-zinc-900 shadow-[0,_4px,_30px,_rgba(0,_0,_0,_0.1)] bg-opacity-40 backdrop-blur-md flex flex-col justify-between pb-6">
      <div className="flex flex-col gap-1">
        <SidebarHeader
          icon={<User color="#2DA4FF" strokeWidth={1.5} size={24} />}
          name={user?.name}
          email={user?.email}
        />
        <SidebarButton
          title="Inbox"
          leftIcon={<Inbox color="#2DA4FF" strokeWidth={1.5} size={16} />}
          active={activeSection === 'Inbox'}
          bagdeCount={unreadMessages}
          onClick={handleClickInboxSection}
        />
        <SidebarButton
          title="Sent"
          leftIcon={<Send color="#2DA4FF" strokeWidth={1.5} size={16} />}
          active={activeSection === 'Sent'}
          onClick={handleClickSentSection}
        />
      </div>
      <SidebarButton
        title="Log out"
        rightIcon={<LogOut color="#2DA4FF" strokeWidth={1.5} size={16} />}
        onClick={handleUserLogout}
        active={false}
      />
    </div>
  );
};

export { Sidebar };
