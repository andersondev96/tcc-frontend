import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const TableHead: React.FC<Props> = ({
  children
}) => {
  return (
    <thead className="font-semibold  bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
      {children}
    </thead>
  )
}