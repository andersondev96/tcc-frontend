import { useState } from "react";
import { ModalContainer } from "../../../components/ModalContainer";
import { AssessmentsStars } from "./AssessmentsStars";

import { AiFillHeart } from "react-icons/ai";
import { ModalService } from "./ModalService";


interface ServiceProps {
    id: string;
    name: string;
    category: string;
    description: string;
    stars: number;
    image_url: string;
    price: number;
}

interface CardProps {
    service: ServiceProps;
}

export const Card: React.FC<CardProps> = ({ service }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    const [displayHeart, setDisplayHeart] = useState(false);
    const [like, setLike] = useState(false);

    return (
        <div
            className="flex flex-row items-center sm:w-80 w-64  h-20 bg-gray-300  rounded"
            onMouseOver={!like ? () => setDisplayHeart(true) : () => { }}
            onMouseLeave={!like ? () => setDisplayHeart(false) : () => { }}
        >
            <img
                src={service.image_url ||
                    "https://images.unsplash.com/photo-1600456899121-68eda5705257?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1557&q=80"}
                alt={service.name}
                className="h-20 w-20 rounded-l"
            />
            <div className="flex flex-col">
                <div className="absolute flex flex-row ml-36 sm:ml-52 mt-3">
                    {displayHeart ? (
                        <AiFillHeart
                            size={16}
                            onClick={() => setLike(!like)}
                            className="cursor-pointer"
                            color={`${like ? '#D0103F' : '#FFFFFF'}`}
                        />
                    ) : ''}
                </div>

                <div className="flex flex-col justify-center py-2 px-3  w-full cursor-pointer" onClick={openModal}>
                    <div className="flex flex-row justify-between">
                        <span className="font-montserrat font-semibold mb-1 text-sm sm:text-lg">{service.name}</span>
                    </div>
                    <AssessmentsStars stars={service.stars} />
                    <span className="font-inter font-semibold text-xs sm:text-sm mt-2 text-amber-900">
                        {service.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                </div>
            </div>

            <ModalContainer
                title={service.name}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >

                <ModalService service={service} />

            </ModalContainer>
        </div>
    )
}