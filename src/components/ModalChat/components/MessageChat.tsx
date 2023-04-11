import { useEffect } from "react";
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
    handleLoadingMessage: (idUser: string) => void;
    chatData: ChatDataResponse[];
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

interface RoomData {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

interface ChatData {
    room: RoomData;
    messages: MessageData[];
}

interface ChatDataResponse {
    message: MessageData;
    connection: string;
}

export const MessageChat: React.FC<MessageChatProps> = ({ connections, handleLoadingMessage, chatData }) => {

    useEffect(() => {
        console.log(chatData);
    }, [chatData]);

    return (
        <>
            <div className="flex flex-row">
                <div className="flex flex-col justify-between w-1/4 bg-gray-50 border-r border-gray-600 rounded">
                    <div id="users" className="m-3">
                        <div className="bg-green w-4"></div>
                        <ul className="flex flex-col gap-8">
                            {connections && connections.map(connection => (
                                <li
                                    className="flex flex-row items-center gap-4 p-1.5 hover:bg-gray-200 duration-300 transition-all cursor-pointer"
                                    id={`user_${connection.id}`}
                                    key={connection.id}
                                    onClick={() => handleLoadingMessage(connection.id)}
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

                {
                    chatData && chatData.length > 0 && (
                        <div className="flex flex-col w-3/4">
                            <div className="flex flex-col gap-9 p-7 border border-gray-400 rounded overflow-auto">

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
                                    className="w-[48.75rem] h-14 p-4 pr-16 rounded resize-none bg-gray-100 border-none text-gray-800"
                                    placeholder="Digite a sua mensagem aqui"
                                />
                            </div>
                        </div>
                    )
                }
            </div>

        </>
    )
}