import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const TableRowHead: React.FC<Props> = ({
  children
}) => {
  return (
    <tr className="bg-black bg-opacity-5 rounded cursor-pointer">
      {children}
    </tr>
  );
}