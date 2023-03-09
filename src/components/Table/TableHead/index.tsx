import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export const TableHead: React.FC<Props> = ({
    children
}) => {
    return (
        <thead className="font-semibold text-gray-700  bg-gray-200">
            {children}
        </thead>
    )
}