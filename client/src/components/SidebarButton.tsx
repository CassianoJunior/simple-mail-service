interface SidebarButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  title: string;
  active: boolean;
  bagdeCount?: number;
}

const SidebarButton = ({
  leftIcon,
  rightIcon,
  title,
  active,
  bagdeCount,
  ...rest
}: SidebarButtonProps) => {
  return (
    <button
      {...rest}
      className={`${
        active ? 'bg-zinc-700 bg-opacity-20' : ''
      } flex items-center relative w-full px-4 py-2 text-left text-white rounded-md hover:bg-zinc-700 hover:bg-opacity-20 outline-none focus:ring-2 `}
    >
      {leftIcon && <div className="mr-2">{leftIcon}</div>}
      <h2 className="font-inter font-semibold text-sm">{title}</h2>
      {rightIcon && <div className="ml-auto">{rightIcon}</div>}
      {bagdeCount && (
        <div className="flex items-center justify-center absolute right-2 h-4 px-2 text-xs text-white bg-zinc-700 bg-opacity-40 rounded-full">
          {new Intl.NumberFormat().format(bagdeCount)}
        </div>
      )}
    </button>
  );
};

export { SidebarButton };
