import { FiSend } from "react-icons/fi";
import UserAvatar from '../../../assets/avatar.jpg';
import Coffee1 from '../../../assets/coffee-img1.jpg';
import { Message } from "../../../pages/client/components/Message";

export const MessageChat: React.FC = () => {

    return (
        <>
            <div className="flex flex-col gap-9 mt-5 p-7 w-[48.75rem] max-h-96 border border-gray-400 rounded overflow-auto">

                <Message
                    send="business"
                    userAvatar={Coffee1}
                    message="Olá, em que posso ajudar?"
                />

                <Message
                    send="client"
                    userAvatar={UserAvatar}
                    message="Gostaria de saber informações de um certo serviço que vocês oferecem para os clientes."
                />

                <Message
                    send="business"
                    userAvatar={Coffee1}
                    message="Entendi, você já conhece os nossos serviços?"
                />

                <Message
                    send="client"
                    userAvatar={UserAvatar}
                    message="Conheço sim"
                />

            </div>

            <div className="flex flex-row items-center justify-between">
                <textarea
                    className="w-[48.75rem] h-16 p-4 pr-16 rounded resize-none bg-gray-200 border-none text-gray-800"
                    placeholder="Digite a sua mensagem aqui"
                />
                <button className="flex absolute ml-[45.75rem]">
                    <FiSend size={24} color="#08A358" />
                </button>
            </div>
        </>
    )
}