import { useCallback, useState } from "react";
import { io } from "socket.io-client";
import { MessageChat } from "./components/MessageChat";
import { WelcomeChat } from "./components/WelcomeChat";

interface FormData {
    name: string;
    email: string;
    telephone: string;
}

export const ModalChat: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [isConnected, setIsConnected] = useState(false);

    const socket = io("http://localhost:3333");

    socket.on("connect", () => {
        console.log(socket.id);
    });

    socket.emit("start", {
        telephone,
        email
    });

    socket.on("start-response", (data) => {
        if (data.success) {
            setIsConnected(true);
        }
    })

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
                    <MessageChat />
                )
            }
        </div>
    );
}