import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useCallback, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

import { Input } from "../components/Form/Input";
import { useAuth } from "../contexts/AuthContext";
import { useAuthGoogle } from "../contexts/AuthContextWithGoogle";
import getValidationErrors from "../utils/getValidateErrors";

interface SignInFormData {
    email: string;
    password: string;
}

interface LocationState {
    path?: string;
}

export const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const { signInWithGoogle } = useAuthGoogle();
    const { signIn } = useAuth();

    const handleGoogleSignIn = useCallback(async () => {
        try {
            await signInWithGoogle();
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }, [signInWithGoogle, navigate]);

    const handleSubmit = useCallback(
        async (data: SignInFormData) => {
            try {
                formRef.current?.setErrors({});
                setIsLoading(true);

                const schema = Yup.object().shape({
                    email: Yup.string()
                        .email("Digite um e-mail válido")
                        .required("E-mail obrigatório"),
                    password: Yup.string()
                        .required()
                        .min(8, "A senha deve possuir no mínimo 8 dígitos"),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await signIn({
                    email: data.email,
                    password: data.password,
                });

                navigate("/");
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);

                    formRef.current?.setErrors(errors);
                    setIsLoading(false);

                    return;
                }

                toast.error("Error ao autenticar, verifique as suas credenciais e tente novamente!");
            } finally {
                setIsLoading(false);
            }
        },
        [signIn, toast, navigate]
    );

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className="bg-gray-100">
            <ToastContainer />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-xl">
                            Faça login com a sua conta
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
                            <div>
                                <Input
                                    name="password"
                                    label="Senha"
                                    type="password"
                                    placeholder="Digite a sua senha"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <Link
                                            to="/forgot-password"
                                            className="text-sm font-medium text-blue-600 hover:underline"
                                        >
                                            Esqueceu a senha?
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className={classNames(isLoading ? 'bg-blue-400 text-gray-600 cursor-not-allowed' : 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-400', "w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center")}
                            >
                                {isLoading ? 'Aguarde...' : 'Entrar'}
                            </button>
                            <p className="text-sm font-light text-gray-500">
                                Não possui uma conta?
                                <Link
                                    to="/register"
                                    className="font-medium text-blue-400 hover:underline"
                                >
                                    {" "}
                                    Criar conta
                                </Link>
                            </p>
                            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                                <p className="text-center font-semibold text-gray-400 text-sm mx-4 mb-0">
                                    OU
                                </p>
                            </div>
                            <button
                                className="px-7 py-3 text-black font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                                type="button"
                                onClick={handleGoogleSignIn}
                            >
                                <FcGoogle size={24} />
                                <span className="ml-2">Entrar com Google</span>
                            </button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};
