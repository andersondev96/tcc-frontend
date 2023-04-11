import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { MessageChat } from "./components/MessageChat";
import { WelcomeChat } from "./components/WelcomeChat";

interface FormData {
    name: string;
    email: string;
    telephone: string;
}

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


export const ModalChat: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [connectionsUser, setConnectionsUser] = useState<ConnectionsData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [chatData, setChatData] = useState<ChatDataResponse[]>([]);

    const socket = io("http://localhost:3333");

    useEffect(() => {

        socket.on("connect", () => {
            console.log(socket.id);
        });

        socket.emit("get_connections", (connections: ConnectionsData[]) => {

            setConnectionsUser(connections);
        });
    }, [setConnectionsUser]);

    const handleFormSubmit = useCallback(async (data: FormData) => {
        setIsLoading(true);

        try {
            setName(data.name);
            setEmail(data.email);
            setTelephone(data.telephone);

            socket.emit("start", {
                telephone: data.telephone,
                email: data.email
            });

            socket.on("start-response", (data) => {
                if (data.success) {
                    setIsConnected(true);
                } else {
                    toast.error(data.error);
                }
            });

        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }, [setName, setEmail, setTelephone, setIsConnected, setIsLoading]);

    const handleLoadingMessage = useCallback((idUser: string) => {

        socket.emit("start_chat", { idUser }, (response: ChatData) => {
            const idChatRoom = response.room.id;

            const messagesData = response.messages.map((message: MessageData) => {
                return {
                    message,
                    connection: message.connection_id
                };
            });


            setChatData((prevChatData) => [...prevChatData, ...messagesData]);

        })
    }, []);


    return (
        <div className="flex flex-col h-full justify-between px-12 py-16">
            {
                !isConnected ? (
                    <WelcomeChat handleSubmit={handleFormSubmit} isLoading={isLoading} />
                ) : (
                    <MessageChat
                        connections={connectionsUser}
                        handleLoadingMessage={handleLoadingMessage}
                        chatData={chatData}
                    />
                )
            }
        </div>
    );
}