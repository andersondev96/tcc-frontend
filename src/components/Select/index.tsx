import { ReactNode } from "react";

interface SelectProps {
  name: string;
  label: string;
  children: ReactNode;
}

export const Select: React.FC<SelectProps> = ({ name, label, children }) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        className="font-montserrat font-medium text-white"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue="default"
        className="h-[2.75rem] px-[1.25rem] rounded border-none outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        {children}
      </select>
    </div>
  );
}