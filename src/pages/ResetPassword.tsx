import { useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";



import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { Input } from "../components/Form/Input";
import api from "../services/api";
import getValidationErrors from "../utils/getValidateErrors";

interface ResetPasswordFormData {
    password: string;
    confirmPassword: string;
}

export const ResetPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = useCallback(
        async (data: ResetPasswordFormData) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    password: Yup.string()
                        .required()
                        .min(8, "A senha deve possuir no mínimo 8 dígitos"),
                    confirmPassword: Yup.string().oneOf(
                        [Yup.ref('password'), undefined],
                        'Senhas não correspondem'
                    ),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                const { password } = data;

                const token = location.search.replace('?token=', '');

                if (!token) {
                    toast.error("Token inválido");
                    return;
                }

                const response = await api.post(`/password/reset?token=${token}`, {
                    password
                });

                if (response.status === 200) {
                    toast.success("Sua senha foi alterada com sucesso!");
                    navigate("/login");
                }


            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);

                    formRef.current?.setErrors(errors);

                    return;
                }

                toast.error("Error ao autenticar, tente novamente!");
            }
        }, [toast, navigate]);

    return (
        <div className="bg-gray-100">
            <ToastContainer />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-xl">
                            Nova Senha
                        </h1>
                        <Form
                            className="space-y-4 md:space-y-6"
                            ref={formRef}
                            onSubmit={handleSubmit}
                        >

                            <div>
                                <Input
                                    name="password"
                                    label="Nova senha"
                                    type="password"
                                    placeholder="Digite a sua nova senha"
                                />
                            </div>

                            <div>
                                <Input
                                    name="confirmPassword"
                                    label="Confirmar senha"
                                    type="password"
                                    placeholder="Digite a senha novamente"
                                />
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Alterar Senha
                            </button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};
