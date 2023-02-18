import { Inbox, Send } from 'lucide-react';
import { useCallback, useState } from 'react';
import { SidebarButton } from './SidebarButton';

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState<'inbox' | 'sent'>('inbox');

  const handleClickInbox = useCallback(() => {
    setActiveSection('inbox');
  }, [activeSection]);

  const handleClickSent = useCallback(() => {
    setActiveSection('sent');
  }, [activeSection]);

  return (
    <div className="h-screen bg-zinc-700 bg-opacity-30 backdrop-blur-md flex flex-col gap-1">
      <SidebarButton
        title="Inbox"
        Icon={<Inbox color="#2DA4FF" strokeWidth={1.5} size={16} />}
        active={activeSection === 'inbox'}
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
