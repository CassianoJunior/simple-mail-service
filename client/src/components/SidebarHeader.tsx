interface SidebarHeaderProps {
  icon: React.ReactNode;
  name: string | undefined;
  email: string | undefined;
}

const SidebarHeader = ({ icon, name, email }: SidebarHeaderProps) => {
  return (
    <div className="flex gap-2 items-center px-2 py-4">
      {icon}
      <div className="flex flex-col">
        <h2 className="font-inter font-semibold text-xs text-white">{name}</h2>
        <p className="font-inter font-thin text-xs text-white">{email}</p>
      </div>
    </div>
  );
};

export { SidebarHeader };
