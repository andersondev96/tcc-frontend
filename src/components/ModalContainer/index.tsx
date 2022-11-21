import { ReactNode } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Modal from "react-modal";

interface IModalContainerProps {
  title: string;
  isOpen: boolean;
  onRequestClose: () => void;
  children: ReactNode;
}

export const ModalContainer: React.FC<IModalContainerProps> = ({
  title,
  isOpen,
  onRequestClose,
  children
}) => {

  Modal.setAppElement('#root');

  const currentStyles = {
    content: {
      width: '900px',
      height: '620px',
      margin: 'auto',
      padding: '0',
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={currentStyles}
    >
      <div className="fixed h-12 w-[56.15rem] bg-indigo-600 px-[3.125rem] py-[0.625rem] flex flex-row items-center justify-between">
        <span className="font-inter font-medium text-xl text-gray-200">{title}</span>
        <AiOutlineCloseCircle size={24} color="#FBF8F8" className="cursor-pointer" onClick={onRequestClose} />
      </div>
      {children}

    </Modal>
  )
}