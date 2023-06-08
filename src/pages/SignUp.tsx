import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useCallback, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

import { Input } from "../components/Form/Input";
import { useAuthGoogle } from "../contexts/AuthContextWithGoogle";
import api from "../services/api";
import getValidationErrors from "../utils/getValidateErrors";
import { PreviousPageButton } from "./client/components/PreviousPageButton";

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
    isEntrepreneur: boolean;
}

export const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { user, signInWithGoogle } = useAuthGoogle();

    const [selectedType, setSelectedType] = useState("");

    const handleSelectObjectiveOption = useCallback((value: string) => {
        setSelectedType(String(value));

    }, [setSelectedType]);

    async function handleGoogleSignIn() {
        try {
            await signInWithGoogle();
            console.log(user);

            if (user) {
                console.log(user.email);
                const response = await api.get("users/email", {
                    params: {
                        email: user.email
                    }
                });

                if (!response.data) {
                    const data: SignUpFormData = {
                        name: user.name,
                        email: user.email,
                        password: uuidv4(),
                        isEntrepreneur: false,
                    }

                    await api.post("/users", data);

                }

                navigate("/");

            }
        } catch (err) {
            console.log(err);
        }

    }

    const handleSubmit = useCallback(
        async (data: SignUpFormData) => {
            try {
                formRef.current?.setErrors({});
                setIsLoading(true);

                const schema = Yup.object().shape({
                    name: Yup.string().required("Nome obrigatório"),
                    email: Yup.string()
                        .email("Digite um e-mail válido")
                        .required("E-mail obrigatório")
                        .test("email", "E-mail já está sendo utilizado", async (value) => {
                            const response = await api.get(`/users/email?email=${value}`);
                            if (response.data) {
                                return false;
                            }
                            return true;
                        }),
                    password: Yup.string()
                        .required()
                        .min(8, "A senha deve possuir no mínimo 8 dígitos"),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                if (selectedType === "venda") {
                    data.isEntrepreneur = true;
                }

                await api.post("/users", data);

                navigate("/login");

                toast.success("Usuário cadastrado com sucesso");
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);

                    formRef.current?.setErrors(errors);
                    const errorMessage = err.inner[0].message;

                    setIsLoading(false);

                    return;
                }
                toast.error("Erro ao cadastrar usuário");
            } finally {
                setIsLoading(false);
            }
        },
        [navigate, toast, selectedType]
    );

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className="bg-gray-100">
            <ToastContainer />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="flex items-center mb-4 mt-16">
                    <PreviousPageButton />
                </div>
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-xl">
                            Registre-se
                        </h1>
                        <Form
                            className="space-y-4 md:space-y-6"
                            ref={formRef}
                            onSubmit={handleSubmit}
                        >

                            <div>
                                <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Qual o seu objetivo?
                                </span>
                                <div className="flex items-center gap-4 mb-4">
                                    <div>
                                        <input
                                            id="compra"
                                            type="radio"
                                            value=""
                                            name="type"
                                            onChange={() => handleSelectObjectiveOption('compra')}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                        />
                                        <label
                                            htmlFor="compra"
                                            className="ml-2 text-sm font-medium text-gray-800"
                                        >
                                            Compra
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            id="venda"
                                            type="radio"
                                            value=""
                                            name="type"
                                            onChange={() => handleSelectObjectiveOption('venda')}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                        />
                                        <label
                                            htmlFor="venda"
                                            className="ml-2 text-sm font-medium text-gray-800"
                                        >
                                            Venda
                                        </label>
                                    </div>

                                </div>
                            </div>

                            <div>
                                <Input
                                    name="name"
                                    label="Nome"
                                    placeholder="Digite o seu nome"
                                />
                            </div>
                            <div>
                                <Input
                                    name="email"
                                    label="E-mail"
                                    type="email"
                                    placeholder="Digite um e-mail"
                                />
                            </div>
                            <div>
                                <Input
                                    name="password"
                                    label="Senha"
                                    type="password"
                                    placeholder="Digite uma senha"
                                />
                            </div>
                            <button type="submit" className={classNames(isLoading ? "bg-blue-400 text-gray-600 cursor-not-allowed" : "text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-400", "w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center")}>
                                {isLoading ? "Aguarde..." : "Cadastrar"}
                            </button>
                            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                                <p className="text-center font-semibold text-gray-400 text-sm mx-4 mb-0">OU</p>
                            </div>
                            <button
                                className="px-7 py-3 text-black font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                                type="button"
                                onClick={handleGoogleSignIn}

                            >
                                <FcGoogle size={24} />
                                <span className="ml-2">Registrar com Google</span>
                            </button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};
