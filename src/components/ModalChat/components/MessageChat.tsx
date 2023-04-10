import { FiSend } from "react-icons/fi";
import UserAvatar from '../../../assets/avatar.jpg';
import Coffee1 from '../../../assets/coffee-img1.jpg';
import { Message } from "../../../pages/client/components/Message";

interface ConnectionsData {
    id: string;
    socket_id: string;
    createdAt: Date;
    user: {
        id: string;
        name: string;
        email: string;
        avatar: string;
    }
    user_id: string;
}
interface MessageChatProps {
    connections: ConnectionsData[] | undefined;
}

export const MessageChat: React.FC<MessageChatProps> = ({ connections }) => {

    return (
        <>
            <div className="flex flex-row">
                <div className="flex flex-col justify-between w-1/4 bg-gray-50 border-r border-gray-600 rounded">
                    <div id="users" className="m-3">
                        <div className="bg-green w-4"></div>
                        <ul className="flex flex-col gap-8">
                            {connections && connections.map(connection => (
                                <li
                                    className="flex flex-row items-center gap-4"
                                    id={`user_${connection.id}`}
                                    key={connection.id}
                                >
                                    <img
                                        className="rounded-full w-12"
                                        src="https://avatars.githubusercontent.com/u/20424197?v=4"
                                    />
                                    <span className="font-semibold">{connection.user.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="w-12 m-3">
                        <div className="flex flex-row items-center gap-4 user_logged">
                            <img
                                className="rounded-full"
                                src="https://avatars.githubusercontent.com/u/20424197?v=4"
                            />
                            <span className="font-semibold">Danilo</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-3/4">
                    <div className="flex flex-col gap-9 p-7 border border-gray-400 rounded overflow-auto">

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
                            className="w-[48.75rem] h-14 p-4 pr-16 rounded resize-none bg-gray-100 border-none text-gray-800"
                            placeholder="Digite a sua mensagem aqui"
                        />
                        <button className="flex absolute ml-24">
                            <FiSend size={24} color="#08A358" />
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}