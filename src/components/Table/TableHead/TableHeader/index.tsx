import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const TableHeader: React.FC<Props> = ({
  children
}) => {
  return (
    <th scope="col" className="py-3 px-6 border-r border-gray-700 border-opacity-20 last:border-none">
      {children}
    </th>
  );
}