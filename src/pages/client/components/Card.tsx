import { useCallback, useEffect, useState } from "react";
import { ModalContainer } from "../../../components/ModalContainer";
import { AssessmentsStars } from "./AssessmentsStars";

import classNames from "classnames";
import { AiFillHeart } from "react-icons/ai";
import api from "../../../services/api";
import { ModalService } from "./ModalService";


interface ServiceProps {
    id: string;
    name: string;
    category: string;
    description: string;
    stars: number;
    favorites: number;
    image_url: string;
    price: number;
    highlight_service: boolean;
    company_id: string;
}

interface CardProps {
    service: ServiceProps;
    highlight?: boolean;
}

export const Card: React.FC<CardProps> = ({ service, highlight = false }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [displayHeart, setDisplayHeart] = useState(false);
    const [serviceFavorited, setServiceFavorited] = useState(false);

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    const handleFavoriteService = useCallback(async () => {
        if (!serviceFavorited) {
            await api.patch(`/services/favorites/${service.id}`);
            setServiceFavorited(true);
        } else {
            await api.patch(`/services/favorites/unfavorite/${service.id}`);
            setServiceFavorited(false);
        }
    }, [service.id, setServiceFavorited, serviceFavorited]);

    const verifyServiceIsFavorited = useCallback(() => {
        if (service.id) {
            api.get(`users/favorite/${service.id}`).then((response) => {
                if (response.data.length > 0) {
                    setServiceFavorited(true);
                }
            })
        }
    }, [service.id, setServiceFavorited]);

    useEffect(() => {
        verifyServiceIsFavorited();
    }, [verifyServiceIsFavorited]);


    return (
        <div
            className={classNames(highlight ? " from-pink-500 via-red-500 to-yellow-500" : "from-gray-500 to-gray-300", "bg-gradient-to-r w-[18.45rem] rounded-md p-1")}
            onMouseOver={!serviceFavorited ? () => setDisplayHeart(true) : () => { }}
            onMouseLeave={!serviceFavorited ? () => setDisplayHeart(false) : () => { }}
        >
            <div className="flex flex-row items-center w-72 h-20 bg-gray-100  rounded">
                <img
                    src={service.image_url ||
                        "https://images.unsplash.com/photo-1600456899121-68eda5705257?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1557&q=80"}
                    alt={service.name}
                    className="h-20 w-20 rounded-l"
                />
                <div className="flex flex-col">
                    <div className="absolute flex flex-row mt-3 ml-44">
                        {displayHeart || serviceFavorited ? (
                            <AiFillHeart
                                size={16}
                                onClick={handleFavoriteService}
                                className="cursor-pointer"
                                color={`${serviceFavorited || service.favorites >= 0 ? '#D0103F' : '#FFFFFF'}`}
                            />
                        ) : ''}
                    </div>

                    <div className="flex flex-col justify-center py-2 px-3  w-full cursor-pointer" onClick={openModal}>
                        <div className="flex flex-row justify-between">
                            <span className="font-montserrat font-semibold mb-1 text-sm sm:text-base">{service.name}</span>
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

                    <ModalService serviceData={service} />

                </ModalContainer>
            </div>
        </div>
    )
}