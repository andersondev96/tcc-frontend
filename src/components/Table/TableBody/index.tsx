import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const TableBody: React.FC<Props> = ({
  children
}) => {
  return (
    <tbody>
      {children}
    </tbody>
  )
}