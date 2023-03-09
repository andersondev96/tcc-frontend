import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const TableRowBody: React.FC<Props> = ({
  children
}) => {
  return (
    <tr className="bg-black bg-opacity-5 rounded cursor-pointer hover:bg-opacity-10">
      {children}
    </tr>
  );
}