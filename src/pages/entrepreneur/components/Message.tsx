import React, { useState } from "react";
import { ModalChat } from "../../../components/ModalChat";
import { ModalContainer } from "../../../components/ModalContainer";

interface MessageProps {
    img: string;
    name: string;
    isConnected: boolean;

}

export const Message: React.FC<MessageProps> = ({
    img,
    name,
    isConnected,
}) => {
    const [modalChatIsOpen, setModalChatIsOpen] = useState(false);

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    function openModal() {
        setModalChatIsOpen(true);
    }

    function closeModal() {
        setModalChatIsOpen(false);
    }

    return (
        <div>
            <div
                className="border-indigo-300  hover:bg-gray-100 hover:bg-opacity-5 cursor-pointer flex flex-row justify-between p-4 w-[18.25rem] sm:w-[58.313rem] h-[5.625rem] border-2 rounded"

                onClick={openModal}
            >
                <div className="flex flex-row items-center gap-8 sm:gap-16">
                    <img
                        src={img}
                        alt={img}
                        className={classNames('w-12 sm:w-14 h-9 sm:h-14 rounded-full object-fill')}
                    />

                    <div className="flex flex-col">
                        <span
                            className="text-indigo-400' : 'text-gray-400', 'font-semibold text-sm sm:text-base"
                        >
                            {name}
                        </span>
                    </div>
                </div>
            </div>
            <ModalContainer
                title="Júlia Duarte"
                isOpen={modalChatIsOpen}
                onRequestClose={closeModal}
            >
                <ModalChat userIsConected={isConnected} />
            </ModalContainer>
        </div>
    );
};
