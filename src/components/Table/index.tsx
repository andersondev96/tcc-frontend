import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Table: React.FC<Props> = ({ children }) => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded">
      <table className="w-full font-montserrat text-sm text-left text-black dark:text-gray-400 border-separate border-spacing-y-2 ">
        {children}
      </table>
    </div>
  );
};
