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
    isLoading?: boolean;
}

export const WelcomeChat: React.FC<Props> = ({ handleSubmit, isLoading = false }) => {
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
                    <Input id="telephone" name="telephone" label="Telefone" type="phone" mask="phone" />
                </div>

                <div>
                    <button type="submit" className="flex flex-row items-center gap-14 w-full h-12 rounded p-2 bg-blue-500 hover:brightness-90 duration-300 transition-all">
                        {
                            isLoading ? (
                                <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0012 20c2.35 0 4.477-.81 6.142-2.415l-1.714-1.43C15.373 16.628 14 14.69 14 12c0-1.69.464-3.253 1.272-4.572l1.714 1.43A7.963 7.963 0 0020 12c0 2.122-.83 4.059-2.415 5.657l1.714 1.43C19.537 17.122 22 14.31 22 12h-4zm-1.857-2.415C17.636 13.372 18 12.19 18 11c0-2.122-.83-4.059-2.415-5.657l-1.714 1.43C16.627 8.878 18 10.81 18 13c0 1.69-.464 3.253-1.272 4.572l1.714 1.43z"></path>
                                </svg>
                            ) : (
                                <>
                                    <ChatIcon className="w-8 text-white" />
                                    <span className="font-semibold text-lg text-white">Iniciar o chat</span>
                                </>
                            )
                        }


                    </button>
                </div>


            </Form>
        </div>
    )
}