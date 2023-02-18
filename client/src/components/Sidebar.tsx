import { Inbox, Send, User } from 'lucide-react';
import { useCallback, useState } from 'react';
import { SidebarButton } from './SidebarButton';
import { SidebarHeader } from './SidebarHeader';

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState<'inbox' | 'sent'>('inbox');

  const handleClickInbox = useCallback(() => {
    setActiveSection('inbox');
  }, [activeSection]);

  const handleClickSent = useCallback(() => {
    setActiveSection('sent');
  }, [activeSection]);

  return (
    <div className="h-screen bg-zinc-900 shadow-[0,_4px,_30px,_rgba(0,_0,_0,_0.1)] bg-opacity-40 backdrop-blur-sm flex flex-col gap-1">
      <SidebarHeader
        icon={<User color="#2DA4FF" strokeWidth={1.5} size={24} />}
        name="Cassino Junior"
      />
      <SidebarButton
        title="Inbox"
        Icon={<Inbox color="#2DA4FF" strokeWidth={1.5} size={16} />}
        active={activeSection === 'inbox'}
        bagdeCount={3}
        onClick={handleClickInbox}
      />
      <SidebarButton
        title="Sent"
        Icon={<Send color="#2DA4FF" strokeWidth={1.5} size={16} />}
        active={activeSection === 'sent'}
        onClick={handleClickSent}
      />
    </div>
  );
};

export { Sidebar };
