import { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-3 bg-indigo-400 w-40 h-12 rounded hover:brightness-90 transition-opacity"
    >
      {children}
    </button>
  );
}