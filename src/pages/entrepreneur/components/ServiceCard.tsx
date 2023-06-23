import { useCallback, useEffect, useState } from "react";

import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api from "../../../services/api";
import { DeleteModal } from "./DeleteModal";

Modal.setAppElement('#root');

interface ServiceData {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image_url: string;
}

interface ServiceProps {
    data: ServiceData;
    setServices: React.Dispatch<React.SetStateAction<ServiceData[]>>;
}


export const ServiceCard: React.FC<ServiceProps> = ({ data, setServices }) => {
    const navigate = useNavigate();
    const [service, setService] = useState<ServiceData>({} as ServiceData);
    const [mouseEnter, setMouseEnter] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);

    useEffect(() => {
        api.get(`/services/${data.id}`).then(response => setService(response.data));
    }, []);

    function openModal() {
        setIsOpenModal(true);
    }

    function closeModal() {
        setIsOpenModal(false);
    }

    const handleDeleteProduct = useCallback(() => {
        api.delete(`/services/${service.id}`).then(() => {
            setServices((prevServices) =>
                prevServices.filter((service) => service.id !== data.id)
            );
            closeModal();
            toast.info("Serviço removido com sucesso!");
        });

    }, [data.id, setServices, closeModal]);

    const currentStyles = {
        content: {
            width: "400px",
            height: "300px",
            margin: "auto",
            marginLeft: "450px",
            borderRadius: "4px",
            padding: "0",
            background: "#FFFFFF",
        },
    };

    return (
        <div className="flex flex-col w-48">
            <ToastContainer />
            <div
                className="flex items-end h-48 cursor-pointer hover:opacity-90 duration-150"
                onClick={() => navigate(`/admin/services/${service.id}`)}
                onMouseEnter={() => setMouseEnter(true)}
                onMouseLeave={() => setMouseEnter(false)}
            >
                {
                    service.image_url ? (
                        <img
                            src={service.image_url}
                            alt={service.name}
                            className="absolute w-48 h-48 border-4 border-gray-600 rounded object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center absolute w-48 h-48 border-4 border-gray-600 rounded bg-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>

                        </div>
                    )
                }

                {mouseEnter && (
                    <div className="flex flex-col justify-center gap-2 p-2 absolute w-48 bg-gray-300 bg-opacity-60 transition ease-in-out delay-150 hover:-translate-y-1">
                        <div className="flex flex-col justify-between gap-2">
                            <span className="font-montserrat mt-2 font-semibold text-sm leading-none">
                                {service.name}
                            </span>
                            <p className="font-inter font-light text-xs leading-none">
                                {service.category?.substring(0, 50)}
                            </p>
                        </div>
                        <span className="font-inter font-semibold text-sm text-red-800">
                            {service.price && service.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                    </div>
                )}
            </div>
            <div className="flex flex-row justify-between px-2 mt-2">
                <button className="flex flex-row items-center gap-2 text-green-500 font-montserrat font-medium text-sm hover:text-green-600  transition-colors duration-300">
                    <FiEdit2 />
                    <Link to={`/admin/services/edit/${service.id}`}>
                        <span>Editar</span>
                    </Link>
                </button>
                <button
                    className="flex flex-row items-center gap-2 text-red-500 font-montserrat font-medium text-sm hover:text-red-600  transition-colors duration-300"
                    onClick={openModal}
                >
                    <AiOutlineDelete />
                    <span>Excluir</span>
                </button>
            </div>

            <Modal
                isOpen={isOpenModal}
                onRequestClose={closeModal}
                style={currentStyles}
            >
                <DeleteModal name={service.name} removeProduct={handleDeleteProduct} onCancel={closeModal} />
            </Modal>
        </div>
    );
};
