import { KeyboardEvent, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { useAuth } from "../../contexts/AuthContext";
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
    connection: ConnectionsData;
    createdAt: string;
    updatedAt: string;
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

interface ModalChatProps {
    userIsConected?: boolean;
}


export const ModalChat: React.FC<ModalChatProps> = ({ userIsConected }) => {
    const { user } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [connectionsUser, setConnectionsUser] = useState<ConnectionsData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [chatData, setChatData] = useState<ChatDataResponse[]>([]);
    const [chatMessageActive, setChatMessageActive] = useState(false);
    const [message, setMessage] = useState("");
    const [connection, setConnection] = useState<ConnectionsData>({} as ConnectionsData);
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

    const handleLoadingMessage = useCallback((connectionData: ConnectionsData) => {

        const idUser = connectionData.id;

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

            setConnection(connectionData);

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
                            connection: data.message.connection,
                            createdAt: data.message.createdAt,
                            updatedAt: data.message.updatedAt,
                        };
                        setChatData((prevChatData) => [...prevChatData, { message: newMessage, connection: data.connection }]);
                    }
                })

            }

        }
    }, [setMessage, setChatData]);

    const handleDeleteRoom = useCallback(async () => {
        socket.disconnect();
        setChatMessageActive(false);
    }, [chatMessageActive]);


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
                            connectionData={connection}
                            userLogged={user}
                            handleDeleteRoom={handleDeleteRoom}
                        />
                    ) : (
                        <ContactsChat
                            connections={connectionsUser}
                            handleLoadingMessage={handleLoadingMessage}
                            userLogged={user}
                        />
                    )


                )
            }
        </div>
    );
}