import { KeyboardEvent } from 'react';
import Coffee1 from '../../../assets/coffee-img1.jpg';
import { useAuth } from "../../../contexts/AuthContext";
import { Message } from "../../../pages/client/components/Message";


interface MessageChatProps {
    chatData: ChatDataResponse[];
    handleSendMessage: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
}

interface MessageData {
    id: string;
    name: string;
    text: string;
    chatroom_id: string;
    connection_id: string;
    socket_id: string;
    created_at: string;
    updated_at: string;
}
interface ChatDataResponse {
    message: MessageData;
    connection: string;
}

export const MessageChat: React.FC<MessageChatProps> = ({ chatData, handleSendMessage }) => {

    const { user } = useAuth();

    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-row items-center gap-4 mb-4 user_logged">
                    <img
                        className="rounded-full h-8 w-8"
                        src={`http://localhost:3333/avatar/${user.avatar}`}
                    />
                    <span className="font-semibold">{user.name}</span>
                </div>

                {
                    chatData && chatData.length > 0 && (
                        <div className="flex flex-col">
                            <div className="flex flex-col gap-9 p-7 max-h-96 border border-gray-400 rounded overflow-auto">

                                {
                                    chatData.map((chat) => (
                                        <Message
                                            key={chat.message.id}
                                            userAvatar={Coffee1}
                                            message={chat.message.text}
                                        />
                                    ))
                                }


                            </div>

                            <div className="flex flex-row items-center justify-between">
                                <textarea
                                    className="w-full h-14 p-4 pr-16 rounded resize-none bg-gray-100 border-none text-gray-800"
                                    placeholder="Digite a sua mensagem aqui"
                                    onKeyPress={handleSendMessage}
                                />
                            </div>
                        </div>
                    )
                }
            </div>

        </>
    )
}