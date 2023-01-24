import { useCallback, useRef } from "react";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineCamera } from "react-icons/ai";
import getValidationErrors from "../../../utils/getValidateErrors";
import { PreviousPageButton } from "../components/PreviousPageButton";
import { NavBar } from "../../../components/NavBar/NavBar";
import { useAuth } from "../../../contexts/AuthContext";
import { Input } from "../../../components/Form/Input";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

interface ProfileFormData {
    name: string;
    email: string;
    old_password: string;
    password: string;
    avatar?: string;
}

export const EditProfile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const navigate = useNavigate();

    const { user, updateUser } = useAuth();

    const handleSubmit = useCallback(
        async (data: ProfileFormData) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório'),
                    email: Yup.string()
                        .email("Digite um e-mail válido")
                        .required("E-mail obrigatório"),
                    old_password: Yup.string(),
                    password: Yup.string().when("old_password", {
                        is: (val: string) => !!val.length,
                        then: Yup.string()
                            .min(8, "A senha deve ter no mínimo 8 digitos")
                            .required("Informe a sua nova senha"),
                        otherwise: Yup.string()
                    })
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                const { name, email, old_password, password, avatar } = data;

                const formData = {
                    name,
                    email,
                    ...(old_password ? {
                        password
                    } : {}),
                };

                const response = await api.put("/users", formData);

                navigate('/admin/business')
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);

                    formRef.current?.setErrors(errors);

                    return;
                }

                toast.error("Error ao editar usuário, tente novamente!");

            }
        }, []);
    return (
        <div>
            <ToastContainer />
            <NavBar />

            <div className="flex flex-col p-12">
                <PreviousPageButton />

                <div className="flex flex-col py-[2.15rem] mobile:py-[1.75rem]">
                    <h1 className="font-montserrat font-bold text-center text-2xl">Editar perfil</h1>

                    <Form
                        className="flex flex-col items-center mt-8 mobile:mt-12"
                        ref={formRef}
                        onSubmit={handleSubmit}
                        initialData={{
                            name: user.name,
                            email: user.email,
                        }}
                    >

                        <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Foto de perfil
                        </span>
                        <label
                            htmlFor="dropzone-file"
                            className="flex flex-col justify-center items-center w-36 h-36 bg-gray-200 rounded-full border-2 mobile:w-36 mobile:h-36 border-gray-400 cursor-pointer hover:bg-gray-400 transition-colors duration-300">
                            <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                <AiOutlineCamera size={24} className="text-gray-600" />
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" accept="image/*" />
                        </label>

                        <div className="flex flex-wrap -mx-3 mb-6 mt-4">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <Input
                                    name="name"
                                    label="Nome"
                                    placeholder="Digite o seu nome"
                                />
                            </div>

                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <Input
                                    name="email"
                                    label="E-mail"
                                    placeholder="Digite o seu e-mail"
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <Input
                                    name="old_password"
                                    label="Senha atual"
                                    type="password"
                                    placeholder="Digite sua senha atual"
                                />
                            </div>

                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <Input
                                    name="password"
                                    label="Nova senha"
                                    type="password"
                                    placeholder="Digite a sua nova senha"
                                />
                            </div>
                        </div>

                        <button type="submit" className=" text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Salvar alterações
                        </button>
                    </Form>


                </div>
            </div>
        </div>
    );
}