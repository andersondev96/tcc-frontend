import { useState } from "react";

import CoffeeImg1 from "../../../assets/coffee-img1.jpg";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { DeleteModal } from "./DeleteModal";
import Modal from "react-modal";

interface ServiceProps {
    name: string;
    description?: string;
    price: number;
    category?: string;
}


export const ServiceCard: React.FC<ServiceProps> = ({
    name,
    description,
    price,
    category
}) => {
    const navigate = useNavigate();
    const [mouseEnter, setMouseEnter] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);

    function openModal() {
        setIsOpenModal(true);
    }

    function closeModal() {
        setIsOpenModal(false);
    }

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
            <div
                className="h-48"
                onClick={() => navigate("/admin/services/show")}
                onMouseEnter={() => setMouseEnter(true)}
                onMouseLeave={() => setMouseEnter(false)}
            >
                <img
                    src={CoffeeImg1}
                    alt="Coffee Image"
                    className="absolute w-48 h-48 border-4 border-gray-600 rounded"
                />
                {mouseEnter && (
                    <div className="flex flex-col justify-center gap-2 p-2 absolute w-48 h-16 mt-32 bg-gray-300 bg-opacity-60 transition ease-in-out delay-150 hover:-translate-y-1">
                        <div className="flex flex-col justify-between">
                            <span className="font-montserrat font-semibold text-sm">
                                {name}
                            </span>
                            <p className="font-inter font-light text-xs">
                                {category}
                            </p>
                        </div>
                        <span className="font-inter font-semibold text-sm text-red-800">
                            {price}
                        </span>
                    </div>
                )}
            </div>
            <div className="flex flex-row justify-between px-2 mt-2">
                <button className="flex flex-row items-center gap-2 text-green-500 font-montserrat font-medium text-sm hover:text-green-600  transition-colors duration-300">
                    <FiEdit2 />
                    <Link to="/admin/create">
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
                <DeleteModal />
            </Modal>
        </div>
    );
};
