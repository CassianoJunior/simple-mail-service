interface SidebarButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  Icon: React.ReactNode;
  title: string;
  active: boolean;
}

const SidebarButton = ({
  Icon,
  title,
  active,
  ...rest
}: SidebarButtonProps) => {
  return (
    <button
      {...rest}
      className={`${
        active ? 'bg-zinc-700 bg-opacity-20' : ''
      } flex items-center w-full px-4 py-2 text-left text-white rounded-md hover:bg-zinc-700 hover:bg-opacity-20  `}
    >
      <div className="mr-2">{Icon}</div>
      <h2 className="font-inter font-semibold text-sm">{title}</h2>
    </button>
  );
};

export { SidebarButton };
