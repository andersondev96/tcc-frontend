import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
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

export const EditProposal: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [proposal, setProposal] = useState<Proposal>({} as Proposal);
    const [budget, setBudget] = useState<BudgetData>({} as BudgetData);
    const { proposal_id } = useParams();
    const formRef = useRef<FormHandles>(null);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`proposals/${proposal_id}`).then(response => setProposal(response.data));

        api.get(`proposals/budget/${proposal_id}`).then(response => {
            const data = response.data;
            const date = new Date(data.delivery_date);
            date.setUTCHours(date.getUTCHours() - 3);
            const formattedDate = date.toISOString().substring(0, 10);
            data.delivery_date = formattedDate;
            setBudget(data);
        });

        console.log(budget);

    }, [proposal_id, setBudget]);

    const handleSelectFiles = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            const selectedFile = event.target.files && event.target.files[0];

            if (selectedFile) {
                setFile(selectedFile);
            }

        }, [setFile]);



    const handleSubmit = useCallback(
        async (data: BudgetData) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    description: Yup.string().required("Campo obrigatório"),
                    delivery_date: Yup.date().typeError("Campo deve ser no formato data").required("Campo obrigatório"),
                    amount: Yup.number().typeError("Campo deve possuir um valor número").required("Campo obrigatório"),
                    installments: Yup.number().required("Campo obrigatório"),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                const updateBudget = {
                    description: data.description,
                    delivery_date: data.delivery_date,
                    amount: data.amount,
                    installments: data.installments
                }

                await api.put(`budgets/${budget.id}`, updateBudget);

                if (file) {
                    const formData = new FormData();
                    formData.append('budget', file);

                    await api.patch(`budgets/${budget.id}`, formData);
                }

                toast.success("Orçamento atualizado com sucesso!");

                navigate(`/admin/budget`);
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);

                    formRef.current?.setErrors(errors);

                    return;
                }

                toast.error("Error ao atualizar o orçamento");
            }
        }, [proposal_id, budget, navigate, file]);
    return (
        <div className="flex flex-row">
            <SideBar pageActive="orcamentos" />
            <div className="flex flex-col w-full sm:ml-64 p-16 sm:p-8">
                <PreviousPageButton />
                <div className="flex flex-col items-start sm:items-center py-6 sm:py-8">
                    <h1 className="font-montserrat font-medium text-lg sm:text-2xl">
                        Editar proposta
                    </h1>
                </div>
                <Form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initialData={budget}
                    className="flex flex-col px-16">
                    <div className="flex flex-col gap-8">
                        <span className="font-montserrat font-medium text-sm sm:text-lg">
                            Preencha os campos abaixo:
                        </span>
                        <div className="flex flex-col gap-2">
                            <TextArea
                                name="description"
                                label="Descrição sobre a proposta oferecida"
                                placeholder="Escreva aqui a descrição da proposta oferecida"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="files"
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Adicionar anexos
                            </label>
                            <input
                                className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none"
                                name="files"
                                type="file"
                                id="files"
                                multiple
                                accept="image/*,.txt,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                                onChange={handleSelectFiles}
                            />
                            <div>
                                {budget.files && budget.files.map(file => (
                                    <div key={file}>
                                        <p className="text-sm text-blue-700">{file}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3">
                            <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
                                <Input
                                    name="delivery_date"
                                    label="Data de entrega do serviço"
                                    type="date"
                                />
                            </div>

                            <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
                                <Input
                                    name="amount"
                                    label="Valor total do serviço"
                                />
                            </div>

                            <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
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

                        <button className="flex items-center justify-center mt-4 w-48 h-12 bg-blue-600 rounded hover:brightness-90 duration-300 transition-opacity">
                            <span className="font-medium text-gray-100">
                                Salvar alterações
                            </span>
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
};
