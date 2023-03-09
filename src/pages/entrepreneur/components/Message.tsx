import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModalContainer } from "../../../components/ModalContainer";
import { ModalChat } from "../../../components/ModalChat";

interface MessageProps {
    img: string;
    name: string;
    last_message: string;
    dateTime_of_last_message: string;
    cont_messages_not_read: number;
    isActive?: boolean;
}

export const Message: React.FC<MessageProps> = ({
    img,
    name,
    last_message,
    dateTime_of_last_message,
    cont_messages_not_read,
    isActive = true,
}) => {
    const [modalChatIsOpen, setModalChatIsOpen] = useState(false);

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    function openModal() {
        isActive && setModalChatIsOpen(true);
    }

    function closeModal() {
        setModalChatIsOpen(false);
    }

    return (
        <div>
            <div
                className={classNames(
                    isActive ? 'border-indigo-300  hover:bg-gray-100 hover:bg-opacity-5 cursor-pointer' : 'border-gray-500 cursor-not-allowed',
                    'flex flex-row justify-between p-4 w-[18.25rem] sm:w-[58.313rem] h-[5.625rem] border-2 rounded'
                )}
                onClick={openModal}
            >
                <div className="flex flex-row items-center gap-8 sm:gap-16">
                    <img
                        src={img}
                        alt={img}
                        className={classNames(!isActive ? 'grayscale' : '', 'w-12 sm:w-14 h-9 sm:h-14 rounded-full object-fill')}
                    />

                    <div className="flex flex-col">
                        <span
                            className={classNames(isActive ? 'text-indigo-400' : 'text-gray-400', 'font-semibold text-sm sm:text-base')}
                        >
                            {name}
                        </span>
                        <p
                            className={classNames(!isActive ? 'text-gray-400' : '', 'font-light text-xs sm:text-sm mobile:leading-4')}
                        >
                            {last_message}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <p
                        className={classNames(!isActive ? 'text-gray-400' : '', 'leading-3 text-[0.625rem] sm:text-xs text-center')}
                    >
                        {dateTime_of_last_message}
                    </p>
                    {isActive && (
                        <span className="bg-blue-400 w-4 sm:w-6 h-4 sm:h-6 font-semibold sm:text-smtext-xs text-white text-center rounded-full">
                            {cont_messages_not_read}
                        </span>
                    )}
                </div>
            </div>
            <ModalContainer
                title="Júlia Duarte"
                isOpen={modalChatIsOpen}
                onRequestClose={closeModal}
            >
                <ModalChat />
            </ModalContainer>
        </div>
    );
};
