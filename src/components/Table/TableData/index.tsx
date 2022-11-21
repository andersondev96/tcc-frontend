import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const TableData: React.FC<Props> = ({
  children
}) => {
  return (
    <td 
      className="py-4 px-6 border-r border-gray-700 border-opacity-20 last:border-none"
    >
      {children}
    </td>
  );
}