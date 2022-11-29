import { ChangeEvent, ReactNode } from "react";

interface SelectProps {
  name: string;
  label: string;
  children: ReactNode;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: React.FC<SelectProps> = ({
  name,
  label,
  children,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        className="font-montserrat font-medium text-sm text-white"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="h-[2.5rem] px-[1.5rem] rounded border-none outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-montserrat font-medium text-sm"
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
    </div>
  );
};
