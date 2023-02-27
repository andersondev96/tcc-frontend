import { ReactNode } from "react";
import { AiOutlineClose } from "react-icons/ai";
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
            maxHeight: '620px',
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
            <div className="fixed h-12 w-[56.15rem] bg-gray-800 px-14 py-3 flex flex-row items-center justify-between over">
                <span className="font-inter font-medium text-xl text-gray-200">{title}</span>
                <AiOutlineClose size={24} color="#FBF8F8" className="cursor-pointer" onClick={onRequestClose} />
            </div>
            {children}

        </Modal>
    )
}