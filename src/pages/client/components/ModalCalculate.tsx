import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../services/api";

interface ModalCalculateProps {
    company_id: string;
    close_modal: () => void;
}

export const ModalCalculate: React.FC<ModalCalculateProps> = ({
    company_id,
    close_modal
}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        time: '',
        objective: '',
        description: ''
    });

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
    }

    function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
    }


    const handleSubmit = useCallback(async (event: FormEvent) => {
        event.preventDefault();
        const { time, objective, description } = formData;

        const response = await api.post(`proposals/${company_id}`, {
            time,
            objective,
            description
        });

        if (response.status === 201) {
            toast.success("Proposta enviada!");

            close_modal();
        }

    }, [formData]);


    return (
        <div className="flex flex-col px-14 py-24">
            <p className="font-inter font-medium text-sm">
                Esta é uma área especial para que o cliente envie propostas para o  empreendedor.
                Caso você se interessou em um serviço ou produto, mas deseja ser mais específico,
                deseja mais quantidades, encomendas com alterações, propor um desconto entre outros detalhes,
                escreva aqui o que deseja e o empreendedor receberá e irá retornar uma proposta para você.
            </p>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 mt-8">

                    <div className="flex flex-row gap-4 w-full justify-between">
                        <div className="flex flex-col w-1/4 gap-2">
                            <label htmlFor="time" className="font-montserrat font-semibold text-sm text-indigo-600 outline-0 focus:border-indigo-600">
                                Prazo esperado
                            </label>
                            <input
                                name="time"
                                type="date"
                                onChange={handleInputChange}
                                className="h-10 p-2 bg-gray-300 rounded border-none font-montserrat font-light text-sm"
                            />

                        </div>

                        <div className="flex flex-col w-3/4 gap-2">
                            <label htmlFor="objective" className="font-montserrat font-semibold text-sm text-indigo-600 outline-0 focus:border-indigo-600">
                                Objetivo do serviço
                            </label>
                            <input
                                name="objective"
                                onChange={handleInputChange}
                                className="h-10 p-2 bg-gray-300 rounded border-none font-montserrat font-light text-sm"
                            />

                        </div>
                    </div>

                    <div className="flex flex-col mt-4 gap-2">
                        <label htmlFor="description" className="font-montserrat font-semibold text-sm text-indigo-600 outline-0 focus:border-indigo-600">
                            Informe detalhadamente sobre o serviço
                        </label>
                        <textarea
                            name="description"
                            placeholder="Escreva o objetivo do serviço"
                            onChange={handleTextAreaChange}
                            className="h-28 p-2 bg-gray-300 rounded border-none outline-0 resize-none font-montserrat font-light text-sm" />
                    </div>

                </div>
                <button
                    className="mt-11 w-36 h-10 bg-blue-500 rounded font-montserrat font-medium  text-white text-sm hover:brightness-90"
                >
                    Enviar solicitação
                </button>
            </form>
        </div>
    )
}