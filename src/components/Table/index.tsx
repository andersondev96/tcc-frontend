import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export const Table: React.FC<Props> = ({ children }) => {
    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded">
            <table className="w-full text-sm text-left text-gray-800 border-separate border-spacing-y-2 ">
                {children}
            </table>
        </div>
    );
};
