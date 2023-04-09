import { ChatIcon } from '@heroicons/react/solid';
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { FormEvent, useCallback, useRef } from "react";
import { useAuth } from '../../../contexts/AuthContext';
import { Input } from "../../Form/Input";

export const WelcomeChat: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { user } = useAuth();

    const handleSubmit = useCallback((event: FormEvent) => {
        event.preventDefault();
        console.log(event);
    }, []);

    return (
        <div className="flex flex-col items-center mt-12 justify-center">
            <Form
                className="space-y-4 md:space-y-6"
                ref={formRef}
                onSubmit={handleSubmit}
                initialData={user}
            >
                <div>
                    <Input name="name" label="Nome" />
                </div>

                <div>
                    <Input name="email" label="E-mail" type="email" />
                </div>

                <div>
                    <Input name="telephone" label="Telefone" type="phone" />
                </div>

                <div>
                    <button type="button" className="flex flex-row items-center gap-14 w-full h-12 rounded p-2 bg-blue-500 hover:brightness-90 duration-300 transition-all">
                        <ChatIcon className="w-8 text-white" />
                        <span className="font-semibold text-lg text-white">Iniciar o chat</span>
                    </button>
                </div>


            </Form>
        </div>
    )
}