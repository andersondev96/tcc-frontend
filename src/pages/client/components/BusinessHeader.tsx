
import { useState } from 'react';
import { AiOutlineCalculator, AiOutlineMail, AiOutlineWhatsApp } from 'react-icons/ai';
import { BiWorld } from 'react-icons/bi';
import { MdOutlineChatBubbleOutline } from 'react-icons/md';
import CoffeeImg from '../../../assets/coffee2.jpg';
import { AssessmentsStars } from './AssessmentsStars';

import { ModalContainer } from "../../../components/ModalContainer";
import { ModalCalculate } from './ModalCalculate';
import { ModalChat } from './ModalChat';

export const BusinessHeader: React.FC = () => {
    const [modalCalculeIsOpen, setModalCalculateIsOpen] = useState(false);
    const [modalChatIsOpen, setModalChatIsOpen] = useState(false);

    function openModalCalculate() {
        setModalCalculateIsOpen(true);
    }

    function closeModalCalculate() {
        setModalCalculateIsOpen(false);
    }

    function openModalChat() {
        setModalChatIsOpen(true);
    }

    function closeModalChat() {
        setModalChatIsOpen(false);
    }

    return (
        <div className="w-full border-b-2 border-gray-500">
            <div className="flex flex-row mobile:flex-col gap-12 px-16 py-8 mobile:py-4">
                <div className="flex flex-row">
                    <img
                        src={CoffeeImg}
                        alt="Coffee"
                        className="h-[6.25rem] w-[6.25rem] mobile:h-[3.125rem] mobile:w-[3.125rem] object-fill rounded-full"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex flex-row items-center justify-between">
                        <span className="font-inter font-bold text-[1.475rem] mobile:text-mobile text-gray-700">Singhtglass Coffe</span>
                        <span className="w-[4.75rem] h-[2.125rem] bg-green-500 flex items-center justify-center rounded-full font-inter font-semibold text-sm text-white">
                            Aberto
                        </span>
                        {/* <span className="w-[3.75rem] h-[1.125rem] bg-red-500 flex items-center justify-center rounded-full font-inter font-semibold text-[0.625rem] text-white">
              Fechado
            </span> */}
                    </div>

                    <div className="flex flex-col">
                        <span className="font-inter text-sm">Cafeteria em São Francisco - CA</span>
                        <div className="flex flex-row mt-2 gap-4">
                            <div className="flex flex-row items-center gap-[0.25rem]">
                                <AssessmentsStars stars={3} />
                            </div>
                            <span
                                className="font-inter font-semibold text-sm text-gray-700"
                            >
                                3.0
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-row items-center gap-[1.25rem] mobile:gap-2 mt-4">
                        <BiWorld size={24}
                            color="#4072F3"
                            className="hover:brightness-90 transition-colors mobile:w-6"
                        />

                        <AiOutlineMail
                            size={24}
                            color="#547DE5"
                            className="hover:brightness-90 transition-colors mobile:w-6"
                        />

                        <AiOutlineWhatsApp
                            size={24}
                            color="#1EBF1B"
                            className="hover:brightness-90 transition-colors mobile:w-6"
                        />

                        <MdOutlineChatBubbleOutline
                            size={24}
                            color="#EB1B2E"
                            className="hover:brightness-90 transition-colors cursor-pointer mobile:w-6"
                            onClick={openModalChat}
                        />

                        <AiOutlineCalculator
                            size={24}
                            color="#28267C"
                            className="hover:brightness-90 transition-colors cursor-pointer mobile:w-6"
                            onClick={openModalCalculate}
                        />
                    </div>
                </div>
            </div>

            <ModalContainer
                title="Solicitar orçamento"
                isOpen={modalCalculeIsOpen}
                onRequestClose={closeModalCalculate}
            >
                <ModalCalculate />
            </ModalContainer>

            <ModalContainer
                title="Singhtglass Coffee"
                isOpen={modalChatIsOpen}
                onRequestClose={closeModalChat}
            >
                <ModalChat />
            </ModalContainer>
        </div>
    )
} 