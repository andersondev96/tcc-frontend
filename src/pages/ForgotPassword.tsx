import { useCallback, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Form/Input";
import api from "../services/api";
import getValidationErrors from "../utils/getValidateErrors";
import { PreviousPageButton } from "./client/components/PreviousPageButton";

export const ForgotPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = useCallback(
        async (email: string) => {
            try {
                formRef.current?.setErrors({});
                setIsLoading(true);

                const schema = Yup.object().shape({
                    email: Yup.string()
                        .email("Digite um e-mail válido")
                        .required("E-mail obrigatório"),
                });

                await schema.validate(email, {
                    abortEarly: false,
                });

                const response = await api.post("password/forgot", email);

                if (response.status === 200) {
                    toast.success("Alteração de senha solicitada com sucesso, por favor verifique o seu e-mail");
                }

                navigate("/login");


            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);

                    formRef.current?.setErrors(errors);
                    setIsLoading(false);

                    return;
                }

                toast.error("Erro ao solicitar recuperação da senha");
            } finally {
                setIsLoading(false);
            }
        }, [toast, navigate]);

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className="bg-gray-100">
            <ToastContainer />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="flex items-center mb-4">
                    <PreviousPageButton />
                </div>
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-xl">
                            Recuperar a senha
                        </h1>
                        <Form
                            className="space-y-4 md:space-y-6"
                            ref={formRef}
                            onSubmit={handleSubmit}
                        >

                            <div>
                                <Input
                                    name="email"
                                    label="E-mail"
                                    placeholder="Digite o seu e-mail"
                                />
                            </div>

                            <button
                                type="submit"
                                className={classNames(isLoading ? "bg-blue-400 text-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-400",
                                    "text-white w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center")}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Aguarde...' : 'Recuperar senha'}
                            </button>


                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};
