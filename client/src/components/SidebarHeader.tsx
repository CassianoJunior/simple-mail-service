interface SidebarHeaderProps {
  icon: React.ReactNode;
  name: string;
}

const SidebarHeader = ({ icon, name }: SidebarHeaderProps) => {
  return (
    <div className="flex gap-2 items-center px-2 py-4">
      {icon}
      <h2 className="font-inter font-semibold text-sm text-white">{name}</h2>
    </div>
  );
};

export { SidebarHeader };
