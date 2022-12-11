import { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-3 bg-indigo-400 w-40 h-12 rounded ${
        disabled
          ? "cursor-not-allowed bg-gray-400 text-gray-300"
          : "hover:brightness-90 transition-opacity"
      }`}
    >
      {children}
    </button>
  );
};
