import { useState } from "react";
import { AssessmentsStars } from "./AssessmentsStars";
import { ModalContainer } from "../../../components/ModalContainer";
import Coffee1 from "../../../assets/coffee-img1.jpg";

import { AiFillHeart } from "react-icons/ai";
import { ModalService } from "./ModalService";

interface CardProps {
    service_id: string;
    image: string;
    product: string;
    description: string;
    stars: number;
    price: string;
}

export const Card: React.FC<CardProps> = ({ service_id, image, product, description, stars, price }) => {
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
            <img src={image} alt={product} className="h-20 w-20 rounded-l" />
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
                        <span className="font-montserrat font-semibold mb-1 text-sm sm:text-lg">{product}</span>
                    </div>
                    <AssessmentsStars stars={stars} />
                    <span className="font-inter font-semibold text-xs sm:text-sm mt-2 text-amber-900">{price}</span>
                </div>
            </div>

            <ModalContainer
                title="Café simples"
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >

                <ModalService
                    service_id={service_id}
                    service={product}
                    description={description}
                    stars={stars}
                    image={image}
                    price={price}
                />

            </ModalContainer>
        </div>
    )
}