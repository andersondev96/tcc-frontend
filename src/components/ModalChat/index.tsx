import { useCallback, useEffect, useState } from "react";
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

export const ModalChat: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [connectionsUser, setConnectionsUser] = useState<ConnectionsData[]>([]);

    const socket = io("http://localhost:3333");



    useEffect(() => {

        socket.on("connect", () => {
            console.log(socket.id);
        });

        socket.emit("start", {
            telephone,
            email
        });

        socket.on("start-response", (data) => {
            console.log(data);
            if (data.success) {
                setIsConnected(true);
            }
        })

        socket.emit("get_connections", (connections: ConnectionsData[]) => {

            setConnectionsUser(connections);
        });
    }, [socket, setIsConnected, setConnectionsUser]);

    const handleFormSubmit = useCallback((data: FormData) => {
        setName(data.name);
        setEmail(data.email);
        setTelephone(data.telephone);

        console.log(data);
    }, [setName, setEmail, setTelephone]);



    return (
        <div className="flex flex-col h-full justify-between px-12 py-16">
            {
                !isConnected ? (
                    <WelcomeChat handleSubmit={handleFormSubmit} />
                ) : (
                    <MessageChat connections={connectionsUser} />
                )
            }
        </div>
    );
}