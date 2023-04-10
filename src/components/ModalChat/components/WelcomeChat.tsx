import { ChatIcon } from '@heroicons/react/solid';
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useRef } from "react";
import { useAuth } from '../../../contexts/AuthContext';
import { Input } from "../../Form/Input";

interface FormData {
    name: string;
    email: string;
    telephone: string;
}
interface Props {
    handleSubmit: (data: FormData) => void;
}

export const WelcomeChat: React.FC<Props> = ({ handleSubmit }) => {
    const formRef = useRef<FormHandles>(null);

    const { user } = useAuth();

    return (
        <div className="flex flex-col items-center mt-12 justify-center">
            <Form
                className="space-y-4 md:space-y-6"
                ref={formRef}
                onSubmit={handleSubmit}
                initialData={user}
            >
                <div>
                    <Input id="name" name="name" label="Nome" />
                </div>

                <div>
                    <Input id="email" name="email" label="E-mail" type="email" />
                </div>

                <div>
                    <Input id="telephone" name="telephone" label="Telefone" type="phone" />
                </div>

                <div>
                    <button type="submit" className="flex flex-row items-center gap-14 w-full h-12 rounded p-2 bg-blue-500 hover:brightness-90 duration-300 transition-all">
                        <ChatIcon className="w-8 text-white" />
                        <span className="font-semibold text-lg text-white">Iniciar o chat</span>
                    </button>
                </div>


            </Form>
        </div>
    )
}