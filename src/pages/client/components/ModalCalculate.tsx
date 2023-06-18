import { addDays, format, parse } from "date-fns";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DayPickerInput } from "../../../components/Form/DayPickerInput";
import { Tooltip } from "../../../components/Tooltip";
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
    const [isLoading, setIsLoading] = useState(false);
    const [dateValue, setDateValue] = useState<string>('');
    const [formData, setFormData] = useState({
        objective: '',
        description: '',
        telephone: '',
    });

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
    }

    function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleKeyUp = useCallback((event: FormEvent<HTMLInputElement>) => {

        event.currentTarget.maxLength = 14;
        let value = event.currentTarget.value;
        value = value.replace(/\D/g, "");

        if (value.length <= 10) {
            value = value.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
        } else if (value.length === 11) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
        }

        event.currentTarget.value = value;
        return event;
    }, []);


    const handleSubmit = useCallback(async (event: FormEvent) => {
        try {
            event.preventDefault();

            setIsLoading(true);

            const { objective, description, telephone } = formData;


            if (dateValue !== "" && formData.objective !== "" && formData.description !== "") {


                const parsedDate = parse(dateValue, 'dd/MM/yyyy', new Date());
                const formattedDate = format(addDays(parsedDate, 1), 'yyyy-MM-dd');

                const response = await api.post(`proposals/${company_id}`, {
                    time: formattedDate,
                    objective,
                    description,
                    telephone
                });

                if (response.status === 201) {
                    toast.success("Proposta enviada!");

                    close_modal();
                }
            } else {
                toast.error("Erro! Preencha todos os campos corretamente!");
            }


        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }

    }, [formData, setIsLoading, toast]);


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
                        <div className="flex flex-col w-3/4 gap-2">

                            <DayPickerInput
                                name="time"
                                label="Prazo esperado"
                                selectedDate={new Date()}
                                dateValue={dateValue}
                                setDateValue={setDateValue}
                            />

                        </div>

                        <div className="flex flex-col w-3/4">
                            <div className="flex flex-row gap-1 items-center">
                                <label htmlFor="objective" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Objetivo do serviço
                                </label>
                                <Tooltip
                                    idElement="tooltip-objective"
                                    text="Escreva de forma simples o objetivo do serviço"
                                />
                            </div>
                            <input
                                name="objective"
                                onChange={handleInputChange}
                                className="py-3 px-4 mb-2 font-medium text-gray-600 bg-gray-200 border rounded-sm"
                            />

                        </div>
                    </div>

                    <div className="flex flex-col mt-4 gap-2">
                        <div className="flex flex-row gap-1 items-center">
                            <label htmlFor="description" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Informe detalhadamente sobre o serviço
                            </label>
                            <Tooltip
                                idElement="tooltip-details"
                                text="Forneça todos os detalhes necessários para o empreendedor elaborar o orçamento"
                            />
                        </div>
                        <textarea
                            name="description"
                            placeholder="Escreva o objetivo do serviço"
                            onChange={handleTextAreaChange}
                            className="h-28 p-2 bg-gray-200 rounded border-none outline-0 resize-none font-medium text-gray-600" />
                    </div>

                    <div className="mt-4">
                        <div className="flex flex-col w-1/4">
                            <div className="flex flex-row gap-1 items-center">
                                <label htmlFor="objective" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Telefone para contato
                                </label>
                            </div>
                            <input
                                name="telephone"
                                onChange={handleInputChange}
                                onKeyUp={handleKeyUp}
                                placeholder="(XX)XXXXX-XXXX"
                                className="py-3 px-4 mb-2 font-medium text-gray-600 bg-gray-200 border rounded-sm"
                            />

                        </div>
                    </div>

                </div>

                {
                    isLoading ? (
                        <button disabled
                            className="mt-11 w-36 h-10 bg-blue-400 rounded font-montserrat font-medium cursor-not-allowed text-white text-sm hover:brightness-90"
                        >
                            Enviando...
                        </button>
                    ) : (
                        <button
                            className="mt-11 w-36 h-10 bg-blue-500 rounded font-montserrat font-medium  text-white text-sm hover:brightness-90"
                        >
                            Enviar solicitação
                        </button>
                    )
                }

            </form>
        </div>
    )
}