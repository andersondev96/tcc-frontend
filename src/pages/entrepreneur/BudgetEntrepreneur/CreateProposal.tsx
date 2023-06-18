import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { addDays, format, parse } from "date-fns";
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { DayPickerInput } from "../../../components/Form/DayPickerInput";
import { Input } from "../../../components/Form/Input";
import { TextArea } from "../../../components/Form/TextArea";
import { SideBar } from "../../../components/Sidebar";
import api from "../../../services/api";
import getValidationErrors from "../../../utils/getValidateErrors";
import { PreviousPageButton } from "../../client/components/PreviousPageButton";

interface BudgetData {
    id: string;
    description: string;
    files: string[];
    delivery_date: Date;
    amount: number;
    installments: number;
}

interface Proposal {
    id: string;
    objective: string;
    time: string;
    description: string;
    status: string;
    customer_id: string;
    company_id: string;
    createdAt: string;
    customer: {
        id: string;
        user_id: string;
        telephone: string;
        status: string;
        user: {
            id: string;
            name: string;
            email: string;
        }
    }
}

export const CreateProposal: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [proposal, setProposal] = useState<Proposal>({} as Proposal);
    const [selectedFiles, setSelectedFiles] = useState(new FormData());
    const [dateValue, setDateValue] = useState('');
    const { proposal_id } = useParams();
    const formRef = useRef<FormHandles>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    useEffect(() => {
        try {
            api.get(`proposals/${proposal_id}`).then(response => setProposal(response.data));
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, [setLoading]);

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    const handleFileUpload = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            const selectedFile = event.target.files && event.target.files[0];

            if (selectedFile) {
                setFile(selectedFile);
                setFileName(selectedFile["name"]);
            }
        }, [setFile, setFileName]);

    const handleSubmit = useCallback(
        async (data: BudgetData) => {
            try {
                formRef.current?.setErrors({});
                setLoadingSubmit(true);

                const schema = Yup.object().shape({
                    description: Yup.string().required("Campo obrigatório"),
                    amount: Yup.number().typeError("Campo deve possuir um valor número").required("Campo obrigatório"),
                    installments: Yup.number().required("Campo obrigatório"),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                const parsedDate = parse(dateValue, 'dd/MM/yyyy', new Date());
                const formattedDate = format(addDays(parsedDate, 1), 'yyyy-MM-dd');

                const budget = {
                    description: data.description,
                    delivery_date: formattedDate,
                    amount: data.amount,
                    installments: data.installments
                }

                const response = await api.post(`budgets/${proposal_id}`, budget);

                if (file) {
                    const formData = new FormData();
                    formData.append('budget', file);

                    await api.patch(`budgets/${response.data.id}`, formData);
                }

                toast.success("Orçamento criado com sucesso!");

                navigate(`/admin/budget/details/${proposal_id}`);
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);

                    formRef.current?.setErrors(errors);
                    setLoadingSubmit(false);

                    return;
                }

                toast.error("Error ao criar o orçamento");
            } finally {
                setLoadingSubmit(false);
            }
        }, [proposal_id, selectedFiles, navigate, file, dateValue]);
    return (
        <div className="flex flex-row">
            <SideBar pageActive="orcamentos" />

            <div className="flex flex-col w-full sm:ml-64 p-16 sm:p-8">
                <PreviousPageButton />


                <>
                    {
                        loading ? (
                            <p className="mt-8 text-sm text-gray-400">Carregando...</p>
                        ) : (
                            <div>
                                <div className="flex flex-col items-start sm:items-center py-6 sm:py-8">
                                    <h1 className="font-montserrat font-medium text-lg sm:text-2xl">
                                        Criar proposta
                                    </h1>
                                </div>
                                <Form
                                    ref={formRef}
                                    onSubmit={handleSubmit}
                                    className="flex flex-col sm:px-16">
                                    <div className="flex flex-col gap-8">
                                        <span className="font-montserrat font-medium text-sm sm:text-lg">
                                            Preencha os campos abaixo:
                                        </span>
                                        <div className="flex flex-col gap-2">
                                            <TextArea
                                                name="description"
                                                label="Descrição sobre a proposta oferecida"
                                                placeholder="Escreva aqui a descrição da proposta oferecida"
                                                idTooltip="tooltip-description-proposal"
                                                tooltipText="Forneça as principais informações sobre a proposta oferecida ao cliente"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label
                                                htmlFor="files"
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                Adicionar anexo
                                            </label>
                                            <label htmlFor="files">
                                                <div className="flex items-center justify-between rounded w-48 h-12 p-3 bg-indigo-500 cursor-pointer hover:opacity-90 transition-opacity duration-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                                    </svg>
                                                    <span className="text-white">Adicionar arquivo</span>
                                                </div>
                                                <input
                                                    className="hidden"
                                                    name="files"
                                                    type="file"
                                                    id="files"
                                                    accept="image/*,.txt,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                                                    onChange={handleFileUpload}
                                                />
                                            </label>
                                            <div>
                                                {fileName && (
                                                    <div>
                                                        <p className="text-sm text-gray-700">{fileName}</p>
                                                    </div>
                                                )}
                                            </div>
                                            <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                Arquivos aceitos: .jpg, jpeg, png, txt, pdf, doc, docx, xls, xlsx, ppt, pptx, .zip, .rar
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap -mx-3">
                                            <div className="sm:w-2/5 px-3 mb-6 sm:mb-0">
                                                <DayPickerInput
                                                    name="delivery_date"
                                                    label="Data de entrega do serviço"
                                                    selectedDate={new Date()}
                                                    dateValue={dateValue}
                                                    setDateValue={setDateValue}
                                                />
                                            </div>

                                            <div className="sm:w-2/5 px-3 mb-6 sm:mb-0">
                                                <Input
                                                    name="amount"
                                                    mask="currency"
                                                    prefix="R$"
                                                    label="Valor total do serviço"
                                                />
                                            </div>

                                            <div className="sm:w-1/5 px-3 mb-6 sm:mb-0">
                                                <Input
                                                    name="installments"
                                                    label="Número de parcelas"
                                                    type="number"
                                                    defaultValue={1}
                                                    min={1}
                                                    max={100}
                                                />
                                            </div>
                                        </div>

                                        <button className={classNames(loadingSubmit ? "bg-blue-200 cursor-not-allowed" : " bg-blue-600 rounded hover:brightness-90 duration-300 transition-opacity",
                                            "flex items-center justify-center mt-4 w-48 h-12")}>
                                            <span className="font-medium text-gray-100">
                                                {loadingSubmit ? 'Salvando...' : 'Salvar alterações'}
                                            </span>
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        )
                    }
                </>



            </div>
        </div>
    );
};
