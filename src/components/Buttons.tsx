import { ReactNode } from "react";

export const _BaseBtn = ({
  children,
  type,
  action,
  disabled,
}: {
  children: ReactNode;
  action?: () => void;
  disabled?: boolean;
  type: "primary" | "secondary" | "ghost";
}) => {
  const baseClases =
    "px-4 py-2 tracking-wide  font-bold  rounded focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-4";

  const typeClasses = {
    primary:
      "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500 text-white",
    secondary: "bg-bgColor hover:bg-gray-300 text-textColor",
    ghost: "bg-transparent hover:bg-gray-300 text-textColor",
  };

  const classes = `${baseClases} ${typeClasses[type]}`;

  const handleClick = () => {
    if (action) {
      action();
    }
  };

  return (
    <button disabled={disabled} onClick={handleClick} className={classes}>
      {children}
    </button>
  );
};
