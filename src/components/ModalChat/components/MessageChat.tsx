import { KeyboardEvent } from 'react';
import AvatarImg from "../../../assets/user.png";
import { Message } from "../../../pages/client/components/Message";


interface MessageChatProps {
    chatData: ChatDataResponse[];
    handleSendMessage: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
    connectionData: ConnectionsData;
    userLogged: User;
    handleDeleteRoom: (connectionData: ConnectionsData) => void;
}

interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

interface MessageData {
    id: string;
    name: string;
    text: string;
    chatroom_id: string;
    connection_id: string;
    socket_id: string;
    connection: ConnectionsData;
    createdAt: string;
    updatedAt: string;
}

interface ConnectionsData {
    id: string;
    socket_id: string;
    createdAt: Date;
    user: User;
    user_id: string;
}
interface ChatDataResponse {
    message: MessageData;
    connection: string;
}

export const MessageChat: React.FC<MessageChatProps> = ({ chatData, handleSendMessage, connectionData, userLogged, handleDeleteRoom }) => {

    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-row items-center justify-between gap-4 mb-4 user_logged">
                    <div className="flex flex-row items-center gap-2">
                        <img
                            className="rounded-full h-8 w-8"
                            src={connectionData.user && connectionData.user.avatar
                                ? connectionData.user.avatar
                                : AvatarImg
                            }
                        />
                        <span className="font-semibold">{connectionData.user.name}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-medium text-sm text-red-800 hover:cursor-pointer">Encerrar bate-papo</span>
                    </div>
                </div>



                <div className="flex flex-col">
                    {
                        <div className="flex flex-col gap-9 p-7 max-h-96 border border-gray-400 rounded overflow-auto">

                            {
                                chatData && chatData.length > 0 && chatData.map((chat) => (
                                    <>
                                        <Message
                                            key={`message-${chat.message.id}`}
                                            userAvatar={
                                                chat.message.connection.user.avatar
                                                    ? chat.message.connection.user.avatar
                                                    : AvatarImg
                                            }
                                            message={chat.message.text}
                                            dateMessage={chat.message.createdAt}
                                            activeUser={chat.message.connection.user.email === userLogged.email}
                                        />
                                    </>
                                ))}
                        </div>

                    }


                    <div className="flex flex-row items-center justify-between">
                        <textarea
                            className="w-full h-14 p-4 pr-16 rounded resize-none bg-gray-100 border-none text-gray-800"
                            placeholder="Digite a sua mensagem aqui"
                            onKeyDown={handleSendMessage}
                        />
                    </div>
                </div>


            </div>

        </>
    )
}