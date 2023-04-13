import AvatarImg from "../../../assets/user.png";
import { SideBar } from "../../../components/Sidebar";
import { useAuth } from "../../../contexts/AuthContext";
import { Message } from "../components/Message";

import { useCallback, useEffect, useState } from "react";

import { io } from "socket.io-client";

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


export const ChatEntrepreneur: React.FC = () => {
    const { user } = useAuth();
    const [connectionsUser, setConnectionsUser] = useState<ConnectionsData[]>([]);
    const [userConected, setUserConected] = useState(false);

    const handleUserIsConected = useCallback((user: { email: string }) => {
        const isConected = connectionsUser.find((connection) => (
            connection.user.email === user.email ? true : false
        ));
        setUserConected(!!isConected);
    }, [setUserConected]);

    useEffect(() => {
        const socket = io("http://localhost:3333");

        socket.on("connect", () => {
            console.log(socket.id);
        });

        socket.emit("get_connections", (connections: ConnectionsData[]) => {

            setConnectionsUser(connections);
        });

        handleUserIsConected({ email: user.email });


    }, [setConnectionsUser, handleUserIsConected, userConected]);

    return (
        <div className="flex flex-row">
            <SideBar pageActive="chat" />
            <div className="flex flex-col w-full sm:ml-64">
                <div className="flex flex-col items-center py-6 sm:py-12">
                    <h1 className="font-montserrat font-medium text-2xl">
                        Chat
                    </h1>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex flex-col mt-2">
                        <span className="font-montserrat font-semibold text-lg">
                            Contatos recentes
                        </span>
                        <div className="mt-4 flex flex-col gap-3">
                            {
                                connectionsUser && connectionsUser.map((connection) => (
                                    connection.user.email !== user.email && (
                                        <Message
                                            key={connection.id}
                                            img={connection.user.avatar ?
                                                `http://localhost:3333/avatar/${connection.user.avatar}` :
                                                AvatarImg}
                                            name={connection.user.name}
                                            isConnected={userConected}
                                        />
                                    )
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
