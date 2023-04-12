import { KeyboardEvent, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { ContactsChat } from "./components/ContactsChat";
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
    const [chatMessageActive, setChatMessageActive] = useState(false);
    const [message, setMessage] = useState("");
    let idChatRoom = "";

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
            console.log(response);
            idChatRoom = response.room.id;

            setChatMessageActive(true);

            const messagesData = response.messages.map((message: MessageData) => {
                return {
                    message,
                    connection: message.connection_id
                };
            });


            setChatData((prevChatData) => [...prevChatData, ...messagesData]);

        })
    }, [setChatMessageActive]);

    const handleSendMessage = useCallback((event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();

            const messageToSend = event.currentTarget.value;

            if (messageToSend.trim() !== "") {
                setMessage(messageToSend);

                event.currentTarget.value = "";

                const data = {
                    message: messageToSend,
                    idChatRoom
                };

                console.log(data);

                socket.emit("message", data);

                socket.on("message", (data: ChatDataResponse) => {
                    if (data.message.chatroom_id === idChatRoom) {
                        const newMessage: MessageData = {
                            id: data.message.id,
                            name: data.message.name,
                            text: data.message.text,
                            chatroom_id: data.message.chatroom_id,
                            connection_id: data.message.connection_id,
                            socket_id: data.message.socket_id,
                            created_at: data.message.created_at,
                            updated_at: data.message.updated_at,
                        };
                        setChatData((prevChatData) => [...prevChatData, { message: newMessage, connection: data.connection }]);
                    }
                })

            }

        }
    }, [setMessage, setChatData]);




    return (
        <div className="flex flex-col h-full justify-between px-12 py-16">
            {
                !isConnected ? (
                    <WelcomeChat handleSubmit={handleFormSubmit} isLoading={isLoading} />
                ) : (
                    chatMessageActive ? (
                        <MessageChat
                            chatData={chatData}
                            handleSendMessage={handleSendMessage}
                        />
                    ) : (
                        <ContactsChat
                            connections={connectionsUser}
                            handleLoadingMessage={handleLoadingMessage}
                        />
                    )


                )
            }
        </div>
    );
}